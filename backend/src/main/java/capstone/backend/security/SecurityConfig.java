package capstone.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value(value = "${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain myOauthFilterChain(HttpSecurity http) {
        http
                .csrf(CsrfConfigurer::spa)
                .authorizeHttpRequests(a -> a
                        .requestMatchers(HttpMethod.GET, "/api/auth/gh/me").authenticated()
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().permitAll())
                .logout(l -> l.logoutSuccessUrl(appUrl))
                .exceptionHandling(e ->
                        e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o
                        .defaultSuccessUrl(appUrl));
        return http.build();
    }
}
