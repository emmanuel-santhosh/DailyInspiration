package capstone.backend.controller;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.repo.JournalEntryRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc

class JournalEntryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JournalEntryRepo testJERepo;

    ObjectMapper objectMapper = new ObjectMapper();

    private final String baseURI = "/api/myjournal";

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void findAllJournalEntries_shouldReturnEmptyList_whenRepoIsEmpty() throws Exception {
        // Given
        String expectedJson = objectMapper.writeValueAsString(List.of());
        // When
        mockMvc.perform(MockMvcRequestBuilders.get(baseURI))
        // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content()
                        .json(expectedJson));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void findAllJournalEntries_shouldReturnListWithOneJournalEntryDto_whenRepoHasOneJournalEntry() throws Exception {
        // Given
        JournalEntry testEntry =
                JournalEntry.builder()
                .quote("q1")
                .topic("t1")
                .build();
        testJERepo.save(testEntry);
        // The Get method returns a list of DTOs, not Entities !!!
        JournalEntryDto testJEDto = JournalEntryDto.fromEntity(testEntry);
        String expectedJson = objectMapper.writeValueAsString(List.of(testJEDto));

        // When
        mockMvc.perform(MockMvcRequestBuilders.get(baseURI))
        // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content()
                        .json(expectedJson));
    }
}