# From Monolith to K8s :: API Gateway / FrontEnd

User facing component as it contains an API Gateway and the User Interface of the Conference Platform. 

## Build and Release

```
mvn package
```

```
docker build -t salaboy/fmtok8s-api-gateway:0.1.0
docker push salaboy/fmtok8s-api-gateway:0.1.0
```

```
cd charts/fmtok8s-api-gateway
helm package .
```

Copy tar to http://github.com/salaboy/helm and push