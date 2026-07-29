package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JournalEntryRequestDtoTest {

    @Test
    void toEntity_shouldReturnEntityWithDtoAttributes_AttributesAreNonEmpty_idShouldNotExist() {
        // Given
        String testEntryQuote = "Life is good !";
        String testEntryTopic = "Hope";
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testEntryQuote, testEntryTopic);

        // When
        JournalEntry actualEntry = testDto.toEntity();

        // Then
        assertThat(actualEntry.getQuote()).isEqualTo(testDto.quote());
        assertThat(actualEntry.getTopic()).isEqualTo(testDto.topic());
        assertThat(actualEntry.getId()).isNull();
        /*
        * id should not exist because it is created when being stored to database,
        * NOT when converting from DTO
        * */
    }

    @Test
    void toEntity_shouldReturnEntityWithDtoAttributes_AttributesAreEmptyOrNull_idShouldNotExist() {
        // Given
        String testEntryQuote = "";
        String testEntryTopic = null;
        JournalEntryRequestDto testDto = new JournalEntryRequestDto(testEntryQuote, testEntryTopic);

        // When
        JournalEntry actualEntry = testDto.toEntity();

        // Then
        assertThat(actualEntry.getQuote()).isEqualTo(testDto.quote());
        assertThat(actualEntry.getTopic()).isEqualTo(testDto.topic());
        assertThat(actualEntry.getId()).isNull();
    }
}