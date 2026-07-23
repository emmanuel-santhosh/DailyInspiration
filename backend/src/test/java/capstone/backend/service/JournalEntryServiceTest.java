package capstone.backend.service;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.repo.JournalEntryRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
}