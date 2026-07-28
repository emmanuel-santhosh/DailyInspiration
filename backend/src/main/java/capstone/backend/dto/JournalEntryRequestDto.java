package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;

public record JournalEntryRequestDto(String quote,
                                     String topic) {

    public JournalEntry toEntity() {
        return JournalEntry
                .builder()
                .quote(this.quote())
                .topic(this.topic())
                .build();
    }
}
