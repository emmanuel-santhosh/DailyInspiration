package capstone.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class GhAuthControllerTest {

    private String apiBaseEndpoint = "/api/auth/gh";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getMe_shouldReturnString_whenUserLoggedIn() throws Exception {
        // Given
        String functionEndpoint = "/me";
        // When
        mockMvc.perform(MockMvcRequestBuilders.get(apiBaseEndpoint + functionEndpoint))
        // Then
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}