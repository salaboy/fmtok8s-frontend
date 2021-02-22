package com.salaboy.conferences.site.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtAuthorityExtractor implements Converter<Jwt, Collection<GrantedAuthority>> {

    public JwtAuthorityExtractor() {
        // Bean extracting authority.
    }

    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        return extractAuthorityFromClaims(jwt.getClaims());
    }

    public static List<GrantedAuthority> extractAuthorityFromClaims(Map<String, Object> claims) {
        List<GrantedAuthority> grantedAuthorities = mapRolesToGrantedAuthorities(getRolesFromClaims(claims));
        for(GrantedAuthority ga : grantedAuthorities){
            System.out.println("> GrantedAuthority: " + ga.getAuthority());
        }

        return grantedAuthorities;
    }

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
