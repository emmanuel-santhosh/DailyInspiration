package capstone.backend.controller;

import capstone.backend.dto.JournalEntryRequestDto;
import capstone.backend.dto.JournalEntryResponseDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.exception.JournalEntryNotFoundException;
import capstone.backend.repo.JournalEntryRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;

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
        JournalEntryResponseDto testJEDto = JournalEntryResponseDto.fromEntity(testEntry);
        String expectedJson = objectMapper.writeValueAsString(List.of(testJEDto));

        // When
        mockMvc.perform(MockMvcRequestBuilders.get(baseURI))
                // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content()
                        .json(expectedJson));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void createJournalEntry_JournalEntryDoesNotExistInRepo_shouldReturnGivenDto_WithStatusCreated() throws Exception {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testQuote, testTopic);
        String testDtoAsJson = objectMapper.writeValueAsString(testDto);
        // When
        mockMvc.perform(MockMvcRequestBuilders.post(baseURI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testDtoAsJson))
                // Then
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(testDtoAsJson));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void createJournalEntry_JournalEntryExistsInRepo_shouldReturnGivenDto_WithStatusCreated() throws Exception {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testQuote, testTopic);
        /*
         * This line is the single difference to prev. test         *
         */
        testJERepo.save(testDto.toEntity());
        String testDtoAsJson = objectMapper.writeValueAsString(testDto);
        // When
        mockMvc.perform(MockMvcRequestBuilders.post(baseURI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testDtoAsJson))
                // Then
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(testDtoAsJson));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void updateJournalEntry_JournalEntryExistsInRepo_shouldReturnGivenDto_WithStatusCreated() throws Exception {
        // Given
        String oldQuote = "q1";
        String oldTopic = "t1";
        JournalEntry testEntry = JournalEntry.builder()
                .quote(oldQuote)
                .topic(oldTopic)
                .build();
        testJERepo.save(testEntry);
        Long entityId = testEntry.getId();

        String newQuote = "q2";
        String newTopic = "t2";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(newQuote, newTopic);
        String testDtoAsJson = objectMapper.writeValueAsString(testDto);

        /*
        JournalEntryResponseDto is built, in this case, directly from scratch for quick testing. In the actual service layer,
        the entity is first updated and then the response Dto is built.
         */
        JournalEntryResponseDto expectedResponseDto = new JournalEntryResponseDto(entityId, newQuote, newTopic);
        String expectedResponse = objectMapper.writeValueAsString(expectedResponseDto);

        String putEndpoint = "/" + entityId;

        // When
        mockMvc.perform(MockMvcRequestBuilders.put(baseURI + putEndpoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testDtoAsJson))
                // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void updateJournalEntry_JournalEntryDoesNotExistInRepo_shouldThrowException() throws Exception {
        // Given
        String newQuote = "q2";
        String newTopic = "t2";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(newQuote, newTopic);
        String testDtoAsJson = objectMapper.writeValueAsString(testDto);

        Long testId = 200L;
        String exceptionMessage = "Journal Entry with id: " + testId + " not found !";

        String putEndpoint = "/" + testId;

        // When
        mockMvc.perform(MockMvcRequestBuilders.put(baseURI + putEndpoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testDtoAsJson))
                // Then
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(result ->
                        assertThat(result.getResolvedException())
                                .isInstanceOf(JournalEntryNotFoundException.class))
                .andExpect(result ->
                        assertThat(exceptionMessage).isEqualTo(Objects.requireNonNull(result.getResolvedException()).getMessage()));
    }
}