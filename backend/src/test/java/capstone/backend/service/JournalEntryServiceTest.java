package capstone.backend.service;

import capstone.backend.dto.JournalEntryRequestDto;
import capstone.backend.dto.JournalEntryResponseDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.exception.JournalEntryNotFoundException;
import capstone.backend.repo.JournalEntryRepo;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.*;

class JournalEntryServiceTest {

    @Test
    void findAllJournalEntries_shouldReturnEmptyList_whenRepoIsEmpty() {
        // Given
        JournalEntryRepo testJERepo = mock(JournalEntryRepo.class);
        List<JournalEntry> repoResponse = List.of();
        when(testJERepo.findAll()).thenReturn(repoResponse);

        JournalEntryService testJEService = new JournalEntryService(testJERepo);
        List<JournalEntryResponseDto> expectedTestResult = List.of();
        /*
         * fromEntity is not mocked in this case it isn't invoked
         * */
        // When
        List<JournalEntryResponseDto> actualTestResult = testJEService.findAllJournalEntries();
        // Then
        assertThat(actualTestResult).isEqualTo(expectedTestResult);
    }

    @Test
    void findAllJournalEntries_shouldReturnListOfJournalEntryDto_whenRepoNotEmpty() {
        // Given
        long id1 = 1L;
        String quote1 = "q1";
        String topic1 = "t1";
        JournalEntry testEntry1 = JournalEntry.builder().id(id1).quote(quote1).topic(topic1).build();

        long id2 = 2L;
        String quote2 = "q2";
        String topic2 = "t2";
        JournalEntry testEntry2 = JournalEntry.builder().id(id2).quote(quote2).topic(topic2).build();

        List<JournalEntry> repoResponse = List.of(testEntry1, testEntry2);
        JournalEntryRepo testJERepo = mock(JournalEntryRepo.class);
        when(testJERepo.findAll()).thenReturn(repoResponse);

        JournalEntryService testJEService = new JournalEntryService(testJERepo);

        /*
         * Strictly speaking, fromEntity has been tested separately and is therefore not needed.
         * However, if a function such as UUID generator or any other with non-deterministic output is to be
         * tested, this is the way.
         * */
        try (MockedStatic<JournalEntryResponseDto> mockedJEDto = mockStatic(JournalEntryResponseDto.class)) {
            JournalEntryResponseDto testEntryDto1 = new JournalEntryResponseDto(id1, quote1, topic1);
            JournalEntryResponseDto testEntryDto2 = new JournalEntryResponseDto(id2, quote2, topic2);
            // When
            mockedJEDto.when(() -> JournalEntryResponseDto.fromEntity(testEntry1)).thenReturn(testEntryDto1);
            mockedJEDto.when(() -> JournalEntryResponseDto.fromEntity(testEntry2)).thenReturn(testEntryDto2);
            List<JournalEntryResponseDto> actualTestResult = testJEService.findAllJournalEntries();
            // Then
            assertThat(actualTestResult).isEqualTo(List.of
                    (testEntryDto1,
                            testEntryDto2));
        }
    }

    @Test
    void findJournalEntryByQuoteAndTopic_shouldReturnEmpty_IfJournalEntryNotPresent() {
        // Given
        String testQuote = "q";
        String testTopic = "t1";
        JournalEntryRepo journalEntryRepo = mock(JournalEntryRepo.class);
        when(journalEntryRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.empty());

        JournalEntryService testService = new JournalEntryService(journalEntryRepo);
        // When
        Optional<JournalEntry> actualResult = testService.findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        // Then
        assertThat(actualResult).isEmpty();
    }

    @Test
    void findJournalEntryByQuoteAndTopic_shouldReturnJournalEntry_IfJournalEntryPresent() {
        // Given
        String dtoQuote = "q1";
        String dtoTopic = "t1";
        JournalEntry testEntry = JournalEntry.builder()
                .quote(dtoQuote)
                .topic(dtoTopic)
                .build();

        /*
         * Existing variables are "blindly" reused (without retyping) to reduce typing errors.
         * Although test variables are marked as redundant, they are used in function calls for readability
         * */
        String testQuote = dtoQuote;
        String testTopic = dtoTopic;
        JournalEntryRepo journalEntryRepo = mock(JournalEntryRepo.class);
        when(journalEntryRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.of(testEntry));

        JournalEntryService testService = new JournalEntryService(journalEntryRepo);
        // When
        Optional<JournalEntry> actualResult = testService.findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        // Then
        /*
         * Multiple attributes can be tested in one statement using
         * the below lambda
         * */

        assertThat(actualResult)
                .hasValueSatisfying(journalEntry -> {
                    assertThat(actualResult).get().isInstanceOf(JournalEntry.class);
                    assertThat(actualResult.get().getQuote()).isEqualTo(testQuote);
                    assertThat(actualResult.get().getTopic()).isEqualTo((testTopic));
                    assertThat(actualResult.get().getId()).isNull();
                });
    }

    @Test
    void createJournalEntry_shouldReturnGivenDto_whenNoMatchingJournalEntryPresent() {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryRequestDto testRequestDto = new JournalEntryRequestDto(testQuote, testTopic);

        long testId = 1L;
        JournalEntry testEntry = JournalEntry.builder()
                .id(testId)
                .quote(testQuote)
                .topic(testTopic)
                .build();

        JournalEntryResponseDto expectedResponseDto = new JournalEntryResponseDto(testId,
                testQuote,
                testTopic);

        /*
         * To verify the functions under "Then" are called exactly the specified
         * number of times
         * */
        int expectednoOfFunctionCalls = 1;

        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        // This line mocks no matching JournalEntry present
        when(testRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.empty());
        when(testRepo.save(testRequestDto.toEntity())).thenReturn(testEntry);
        JournalEntryService testService = new JournalEntryService(testRepo);

        // When
        JournalEntryResponseDto actualResponseDto = testService.createJournalEntry(testRequestDto);

        // Then
        assertThat(actualResponseDto).isEqualTo(expectedResponseDto);
        verify(testRepo, times(expectednoOfFunctionCalls)).findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        verify(testRepo, times(expectednoOfFunctionCalls)).save(testRequestDto.toEntity());
    }

    @Test
    void createJournalEntry_shouldReturnExistingDto_whenMatchingJournalEntryPresent() {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testQuote, testTopic);

        long testId = 1L;
        JournalEntry testEntry = JournalEntry.builder()
                .id(testId)
                .quote(testQuote)
                .topic(testTopic)
                .build();

        JournalEntryResponseDto expectedResponseDto = new JournalEntryResponseDto(testId,
                testQuote,
                testTopic);

        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        // This line mocks matching JournalEntry present
        when(testRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.ofNullable(testEntry));
        JournalEntryService testService = new JournalEntryService(testRepo);

        // When
        JournalEntryResponseDto actualResult = testService.createJournalEntry(testDto);

        // Then
        assertThat(actualResult).isEqualTo(expectedResponseDto);
        // verify(mock) is identical to verify(mock, times(1))
        verify(testRepo).findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        verify(testRepo, never()).save(testDto.toEntity());
    }

    @Test
    void updateJournalEntry_shouldReturnUpdatedJournalEntry_whenIdValid() {
        // Given
        String oldQuote = "q1";
        String oldTopic = "t1";
        long testId = 1L;
        JournalEntry testEntry = JournalEntry.builder()
                .id(testId)
                .quote(oldQuote)
                .topic(oldTopic)
                .build();

        String newQuote = "q2";
        String newTopic = "t2";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(newQuote, newTopic);

        JournalEntry updatedEntry = JournalEntry.builder()
                .id(testId)
                .quote(newQuote)
                .topic(newTopic)
                .build();

        JournalEntryResponseDto expectedResponse = JournalEntryResponseDto.fromEntity(updatedEntry);


        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        when(testRepo.findById(testId)).thenReturn(Optional.ofNullable(testEntry));
        JournalEntryService testService = new JournalEntryService(testRepo);

        // When
        JournalEntryResponseDto actualResponse = testService.updateJournalEntry(testId, testDto);

        // Then
        assertThat(actualResponse).isEqualTo(expectedResponse);
    }

    @Test
    void updateJournalEntry_shouldThrowException_whenIdInvalid() {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testQuote, testTopic);

        long testId = 1L;
        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        String exceptionMessage = "Journal Entry with id: " + testId + " not found !";
        when(testRepo.findById(testId)).thenThrow(new JournalEntryNotFoundException(exceptionMessage));

        JournalEntryService testService = new JournalEntryService(testRepo);

        // When & Then
        assertThatExceptionOfType(JournalEntryNotFoundException.class)
                .isThrownBy(() ->
                        testService.updateJournalEntry(testId, testDto))
                .withMessage(exceptionMessage);
    }
}