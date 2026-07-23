package capstone.backend.service;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.repo.JournalEntryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
