package capstone.backend.service;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.repo.JournalEntryRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JournalEntryService {

    private final JournalEntryRepo journalEntryRepo;

    public JournalEntryService(JournalEntryRepo journalEntryRepo) {
        this.journalEntryRepo = journalEntryRepo;
    }

    protected Optional<JournalEntry> findJournalEntryByQuoteAndTopic(String quote, String topic) {
        return journalEntryRepo.findJournalEntryByQuoteAndTopic(quote, topic);
    }

    public List<JournalEntryDto> findAllJournalEntries() {
        return journalEntryRepo
                .findAll()
                .stream()
                .map(JournalEntryDto::fromEntity)
                .toList();
    }

    public JournalEntryDto createJournalEntry(JournalEntryDto journalEntryDto) {
        Optional<JournalEntry> possibleExistingEntry = findJournalEntryByQuoteAndTopic(journalEntryDto.quote(), journalEntryDto.topic());
        JournalEntry createdJournalEntry = possibleExistingEntry
                .orElseGet(() -> journalEntryRepo.save(journalEntryDto.toEntity()));
        /*
         * orElse vs orElseGet
         * orElse is eager evaluation - first computed, then the Optional object is null-checked
         * This was why the save operation on Repo was always executed !!
         * orElseGet is lazy evaluation - computed after the Optional object is null-checked
         * */
        return JournalEntryDto.fromEntity(createdJournalEntry);
    }
}
