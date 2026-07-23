package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JournalEntryDtoTest {

    @Test
    void fromEntity_shouldReturnAttributesExceptId_forValidJournalEntry() {
        // Given
        String testEntryQuote = "Testing is fun !";
        String testEntryTopic = "Test";
        JournalEntry testEntry = JournalEntry
                .builder()
                .quote(testEntryQuote)
                .topic(testEntryTopic)
                .build();

        // When
        JournalEntryDto actualJEDto = JournalEntryDto.fromEntity(testEntry);

        // Then
        assertThat(actualJEDto.quote()).isEqualTo(testEntryQuote);
        assertThat(actualJEDto.topic()).isEqualTo(testEntryTopic);
        // Assert that actual is equal to expected

    }

    @Test
    void fromEntity_shouldReturnDtoWithNullOrEmptyAttributes_forJournalEntryWithNullOrEmptyAttributes() {
        // Given
        JournalEntry testEntry = JournalEntry
                .builder()
                .topic("")
                .build();

        // When
        JournalEntryDto actualJEDto = JournalEntryDto.fromEntity(testEntry);

        // Then
        assertThat(actualJEDto.quote()).isNull();
        assertThat(actualJEDto.topic()).isEmpty();
    }

}