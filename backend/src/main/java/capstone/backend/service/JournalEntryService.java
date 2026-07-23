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

    public List<JournalEntryDto> findAllJournalEntries() {
        return journalEntryRepo
                .findAll()
                .stream()
                .map(JournalEntryDto::fromEntity)
                .toList();
    }

    public JournalEntryDto createJournalEntry(JournalEntryDto journalEntryDto){
        Optional<JournalEntry> possibleExistingEntry = journalEntryRepo.findJournalEntryByQuoteAndTopic(journalEntryDto.quote(), journalEntryDto.topic());
        JournalEntry createdJournalEntry = possibleExistingEntry
                        .orElse(journalEntryRepo.save(journalEntryDto.toEntity()));
        return JournalEntryDto.fromEntity(createdJournalEntry);
    }
}
