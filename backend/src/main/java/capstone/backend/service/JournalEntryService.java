package capstone.backend.service;

import capstone.backend.repo.JournalEntryRepo;
import org.springframework.stereotype.Service;

@Service
public class JournalEntryService {

    private final JournalEntryRepo journalEntryRepo;

    public JournalEntryService(JournalEntryRepo journalEntryRepo) {
        this.journalEntryRepo = journalEntryRepo;
    }
}
