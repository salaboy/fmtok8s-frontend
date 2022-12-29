package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"dagger.io/dagger"
)

func main() {
	var err error
	ctx := context.Background()
	switch os.Args[1] {
	case "build":
		bc := buildContainer(ctx)
		_, err = bc.Directory("target").Export(ctx, "./target")
	case "publish-image":
		if len(os.Args) < 3 {
			err = fmt.Errorf("invalid number of arguments: expected image name")
			break
		}
		err = buildImage(ctx, os.Args[2])

	case "publish-chart":
		if len(os.Args) < 7 {
			err = fmt.Errorf("invalid number of arguments: expected token,chartsDir, owner, repository,branch ")
			break
		}
		err = publishChart(ctx, os.Args[2], os.Args[3], os.Args[4], os.Args[5], os.Args[6])

	case "service-pipeline-full":
		if len(os.Args) < 8 {
			err = fmt.Errorf("invalid number of arguments: expected imageName, token,chartsDir, owner, repository,branch ")
			break
		}

		err = buildImage(ctx, os.Args[2])
		if err != nil {
			break
		}
		err = publishChart(ctx, os.Args[3], os.Args[4], os.Args[5], os.Args[6], os.Args[7])

	case "update-yaml":
		if len(os.Args) < 4 {
			err = fmt.Errorf("invalid number of arguments: expected expression,filename")
			break
		}
		_, err = updateYAML(ctx, os.Args[2], os.Args[3])

	case "helm-package":
		err = helmPackage(ctx)

	default:
		log.Fatalln("invalid command specified")
	}

	if err != nil {
		panic(err)
	}
}

func publishChart(ctx context.Context, token, chartsDir, owner, repository, branch string) error {
	c := getDaggerClient(ctx)

	defer c.Close()

	ghPagesDir := c.Git("github.com/stefanprodan/helm-gh-pages", dagger.GitOpts{KeepGitDir: true}).
		Branch("master").Tree()

	hostDir := c.Host().Directory(".")

	_, err := c.Container().Build(ghPagesDir).
		WithMountedDirectory("/app", hostDir).
		WithWorkdir("/app").
		WithEnvVariable("GITHUB_ACTOR", os.Getenv("GITHUB_ACTOR")).
		WithExec([]string{
			token,
			chartsDir,
			"", // chartsUrl is blank since it's automatically populated by the action
			owner,
			repository,
			branch,
		}).ExitCode(ctx)

	return err
}

func buildImage(ctx context.Context, nameTag string) error {
	if len(nameTag) == 0 {
		return fmt.Errorf("image name required")
	}

	bc := buildContainer(ctx)
	// list of platforms to execute on
	platforms := []dagger.Platform{
		"linux/amd64", // a.k.a. x86_64
		"linux/arm64", // a.k.a. aarch64
	}

	c := getDaggerClient(ctx)

	defer c.Close()

	platformVariants := make([]*dagger.Container, 0, len(platforms))

	for _, platform := range platforms {
		// initialize this container with the platform
		ctr := c.Container(dagger.ContainerOpts{Platform: platform})

		platformVariants = append(platformVariants, ctr.Build(bc.Directory("/app")))

	}

	digest, err := c.Container().
		Publish(ctx, nameTag, dagger.ContainerPublishOpts{
			PlatformVariants: platformVariants,
		})
	if err == nil {
		fmt.Printf("Image pushed to %s\n", digest)
	}
	return err
}

func buildContainer(ctx context.Context) *dagger.Container {
	c := getDaggerClient(ctx)

	hostDir := c.Host().Directory(".", dagger.HostDirectoryOpts{
		// exclude target to avoid cache invalidation
		Exclude: []string{"target"},
	})

	// TODO this cache won't work in CI's were the docker
	// engine is ephemeral (i.e GHA). We should do optimizations
	// for those cases
	mvnCache := c.CacheVolume("mvn-cache")

	return c.Container().From("maven:3.8.6-eclipse-temurin-17").
		WithExec([]string{"apt", "update"}).
		// TODO what can we do to speed this up in a CI so we don't
		// have to pull the dependencies each time?
		WithMountedCache("/root/.m2", mvnCache).
		WithMountedDirectory("/app", hostDir).
		WithWorkdir("/app").
		WithExec([]string{"mvn", "package"})
}

func getDaggerClient(ctx context.Context) *dagger.Client {
	c, err := dagger.Connect(ctx, dagger.WithLogOutput(os.Stderr))
	if err != nil {
		panic(err)
	}

	return c
}

func updateYAML(ctx context.Context, expr, file string) (bool, error) {
	if isAnyEmpty(expr, file) {
		return false, fmt.Errorf("expression and file are required to update YAML")
	}

	c := getDaggerClient(ctx)
	defer c.Close()

	hostFile := c.Host().Directory(".").File(file)

	return c.Container().From("mikefarah/yq:4").
		WithUser("root"). // have to make this root or we'd get invalid permissions
		WithFile(file, hostFile).
		WithExec([]string{"-i", expr, file}). // runs in-place edit
		File(file).Export(ctx, file)
}

func isAnyEmpty(vals ...string) bool {
	for _, v := range vals {
		if len(v) == 0 {
			return true
		}
	}

	return false
}

func helmPackage(ctx context.Context) error {
	c := getDaggerClient(ctx)
	defer c.Close()

	chartDir := c.Host().Directory("helm")

	_, err := c.Container().From("thorstenhans/helm3").
		WithMountedDirectory("/tmp/helm", chartDir).
		WithEnvVariable("FOO", time.Now().String()).
		WithExec([]string{"package", "/tmp/helm/fmtok8s-frontend"}).
		Directory("/app").Export(ctx, "helm")
	return err
}
