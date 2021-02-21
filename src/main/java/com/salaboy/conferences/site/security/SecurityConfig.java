package com.salaboy.conferences.site.security;


import org.springframework.boot.actuate.autoconfigure.security.reactive.EndpointRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcReactiveOAuth2UserService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.ReactiveOAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.server.SecurityWebFilterChain;

import java.util.*;
import java.util.stream.Collectors;

@Profile("prod")
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        System.out.println("springSecurityFilterChain here!!!!!!!! ");
        return http.csrf().disable()
                .authorizeExchange()
                .pathMatchers(HttpMethod.GET, "/actuator/health").permitAll()
                .pathMatchers(HttpMethod.GET, "/actuator/info").permitAll()
                .pathMatchers(HttpMethod.GET, "/prometheus").permitAll()
                .pathMatchers("/backoffice**").hasRole("organizer").anyExchange().permitAll()
                .and()
                .oauth2Login()
                .and()
                .oauth2Client()
                .and()
                .build();
    }

    @Bean
    public ReactiveOAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        System.out.println("oidcUserService here!!!!!!!! ");
        final OidcReactiveOAuth2UserService delegate = new OidcReactiveOAuth2UserService();

        return (userRequest) -> {
            // Delegate to the default implementation for loading a user
            return delegate.loadUser(userRequest).map(user -> {
                System.out.println("User: " + user.toString());
                Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

                user.getAuthorities().forEach(authority -> {
                    if (authority instanceof OidcUserAuthority) {
                        OidcUserAuthority oidcUserAuthority = (OidcUserAuthority) authority;
                        mappedAuthorities.addAll(extractAuthorityFromClaims(oidcUserAuthority.getUserInfo().getClaims()));
                    }
                });

                return new DefaultOidcUser(mappedAuthorities, user.getIdToken(), user.getUserInfo());
            });
        };
    }

    public static List<GrantedAuthority> extractAuthorityFromClaims(Map<String, Object> claims) {
        List<GrantedAuthority> grantedAuthorities = mapRolesToGrantedAuthorities(getRolesFromClaims(claims));
        for(GrantedAuthority ga : grantedAuthorities){
            System.out.println("> GrantedAuthority: " + ga.getAuthority());
        }

        return grantedAuthorities;
    }

    @SuppressWarnings("unchecked")
    private static Collection<String> getRolesFromClaims(Map<String, Object> claims) {
        return (Collection<String>) claims.getOrDefault("groups",
                claims.getOrDefault("roles", new ArrayList<>()));
    }

    private static List<GrantedAuthority> mapRolesToGrantedAuthorities(Collection<String> roles) {
        return roles.stream()
                .map("ROLE_"::concat)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}
