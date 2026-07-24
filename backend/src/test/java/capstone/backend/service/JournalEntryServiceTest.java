package capstone.backend.service;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.repo.JournalEntryRepo;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class JournalEntryServiceTest {

    @Test
    void findAllJournalEntries_shouldReturnEmptyList_whenRepoIsEmpty() {
        // Given
        JournalEntryRepo testJERepo = mock(JournalEntryRepo.class);
        List<JournalEntry> repoResponse = List.of();
        when(testJERepo.findAll()).thenReturn(repoResponse);

        JournalEntryService testJEService = new JournalEntryService(testJERepo);
        List<JournalEntryDto> expectedTestResult = List.of();
        /*
         * fromEntity is not mocked in this case it isn't invoked
         * */
        // When
        List<JournalEntryDto> actualTestResult = testJEService.findAllJournalEntries();
        // Then
        assertThat(actualTestResult).isEqualTo(expectedTestResult);
    }

    @Test
    void findAllJournalEntries_shouldReturnListOfJournalEntryDto_whenRepoNotEmpty() {
        // Given
        String quote1 = "q1";
        String topic1 = "t1";
        JournalEntry testEntry1 = JournalEntry.builder().quote(quote1).topic(topic1).build();

        String quote2 = "q2";
        String topic2 = "t2";
        JournalEntry testEntry2 = JournalEntry.builder().quote(quote2).topic(topic2).build();

        List<JournalEntry> repoResponse = List.of(testEntry1, testEntry2);
        JournalEntryRepo testJERepo = mock(JournalEntryRepo.class);
        when(testJERepo.findAll()).thenReturn(repoResponse);

        JournalEntryService testJEService = new JournalEntryService(testJERepo);

        /*
         * Strictly speaking, fromEntity has been tested separately and is therefore not needed.
         * However, if a function such as UUID generator or any other with non-deterministic output is to be
         * tested, this is the way.
         * */
        try (MockedStatic<JournalEntryDto> mockedJEDto = mockStatic(JournalEntryDto.class)) {
            JournalEntryDto testEntryDto1 = new JournalEntryDto(quote1, topic1);
            JournalEntryDto testEntryDto2 = new JournalEntryDto(quote2, topic2);
            // When
            mockedJEDto.when(() -> JournalEntryDto.fromEntity(testEntry1)).thenReturn(testEntryDto1);
            mockedJEDto.when(() -> JournalEntryDto.fromEntity(testEntry2)).thenReturn(testEntryDto2);
            List<JournalEntryDto> actualTestResult = testJEService.findAllJournalEntries();
            // Then
            assertThat(actualTestResult).isEqualTo(List.of
                    (new JournalEntryDto(quote1, topic1),
                            new JournalEntryDto(quote2, topic2)));
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
                    assertThat(actualResult).isInstanceOf(JournalEntry.class);
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
        JournalEntryDto testDto = new JournalEntryDto(testQuote, testTopic);
        JournalEntry testEntry = JournalEntry.builder()
                .quote(testQuote)
                .topic(testTopic)
                .build();

        /*
         * To verify the functions under "Then" are called exactly the specified
         * number of times
         * */
        int expectednoOfFunctionCalls = 1;

        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        // This line mocks no matching JournalEntry present
        when(testRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.empty());
        when(testRepo.save(testDto.toEntity())).thenReturn(testEntry);
        JournalEntryService testService = new JournalEntryService(testRepo);

        // When
        JournalEntryDto actualResult = testService.createJournalEntry(testDto);

        // Then
        assertThat(actualResult).isEqualTo(testDto);
        verify(testRepo, times(expectednoOfFunctionCalls)).findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        verify(testRepo, times(expectednoOfFunctionCalls)).save(testDto.toEntity());
    }

    @Test
    void createJournalEntry_shouldReturnExistingDto_whenMatchingJournalEntryPresent() {
        // Given
        String testQuote = "q1";
        String testTopic = "t1";
        JournalEntryDto testDto = new JournalEntryDto(testQuote, testTopic);
        JournalEntry testEntry = JournalEntry.builder()
                .quote(testQuote)
                .topic(testTopic)
                .build();

        JournalEntryRepo testRepo = mock(JournalEntryRepo.class);
        // This line mocks matching JournalEntry present
        when(testRepo.findJournalEntryByQuoteAndTopic(testQuote, testTopic)).thenReturn(Optional.ofNullable(testEntry));
        JournalEntryService testService = new JournalEntryService(testRepo);

        // When
        JournalEntryDto actualResult = testService.createJournalEntry(testDto);

        // Then
        assertThat(actualResult).isEqualTo(testDto);
        // verify(mock) is identical to verify(mock, times(1))
        verify(testRepo).findJournalEntryByQuoteAndTopic(testQuote, testTopic);
        verify(testRepo, never()).save(testDto.toEntity());
    }
}