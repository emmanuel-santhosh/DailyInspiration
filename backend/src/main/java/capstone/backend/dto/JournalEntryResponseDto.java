package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;

public record JournalEntryResponseDto(
        Long Id,
        String quote,
        String topic) {
    /*
     * Adapter function to convert JournalEntry object from Repo
     * to JournalEntry DTO
     * */
    public static JournalEntryResponseDto fromEntity(JournalEntry entry) {
        return new JournalEntryResponseDto(entry.getId(), entry.getQuote(), entry.getTopic());
    }
}
