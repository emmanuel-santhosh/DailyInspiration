package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;

public record JournalEntryDto(String quote,
                              String topic) {
    /*
    * Adapter function to convert JournalEntry object from Repo
    * to JournalEntry DTO
    * */
    public static JournalEntryDto fromEntity(JournalEntry entry) {
        return new JournalEntryDto(entry.getQuote(), entry.getTopic());
    }

    public JournalEntry toEntity() {
        return JournalEntry
                .builder()
                .quote(this.quote())
                .topic(this.topic())
                .build();
    }
}
