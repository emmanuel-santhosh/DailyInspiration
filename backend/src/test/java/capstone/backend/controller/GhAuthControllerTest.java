package capstone.backend.controller;

import capstone.backend.DailyInspiration;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;

@SpringBootTest
@AutoConfigureMockMvc
class GhAuthControllerTest {

    private String apiBaseEndpoint = "/api/auth/gh";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    void getMe_shouldReturnString_whenUserLoggedIn() throws Exception {
        // Given
        String functionEndpoint = "/me";
        // When
        mockMvc.perform(MockMvcRequestBuilders.get(apiBaseEndpoint + functionEndpoint)
                        .with(oidcLogin()
                                .userInfoToken(token -> token
                                        .claim("login", "testUser"))))
        // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("testUser"));
    }
}