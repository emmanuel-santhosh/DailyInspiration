package capstone.backend.dto;

import capstone.backend.entity.JournalEntry;
import lombok.With;

@With
public record JournalEntryResponseDto(
        Long id,
        String quote,
        String topic) {
    /*
     * Adapter function to convert JournalEntry object from Repo
     * to appropriate Dto
     * */
    public static JournalEntryResponseDto fromEntity(JournalEntry entry) {
        return new JournalEntryResponseDto(entry.getId(), entry.getQuote(), entry.getTopic());
    }
}
