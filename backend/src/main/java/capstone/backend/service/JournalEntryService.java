package capstone.backend.service;

import capstone.backend.dto.JournalEntryRequestDto;
import capstone.backend.dto.JournalEntryResponseDto;
import capstone.backend.entity.JournalEntry;
import capstone.backend.exception.JournalEntryNotFoundException;
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

    // Reusable exception messages
    private static final String JOURNAL_ENTRY_WITH_ID = "Journal Entry with id: ";
    private static final String NOT_FOUND = " not found !";

    protected Optional<JournalEntry> findJournalEntryByQuoteAndTopic(String quote, String topic) {
        return journalEntryRepo.findJournalEntryByQuoteAndTopic(quote.strip(), topic.strip());
    }

    public List<JournalEntryResponseDto> findAllJournalEntries() {
        return journalEntryRepo
                .findAll()
                .stream()
                .map(JournalEntryResponseDto::fromEntity)
                .toList();
    }

    public JournalEntryResponseDto createJournalEntry(JournalEntryRequestDto journalEntryRequestDto) {
        Optional<JournalEntry> possibleExistingEntry = findJournalEntryByQuoteAndTopic(journalEntryRequestDto.quote(), journalEntryRequestDto.topic());
        JournalEntry createdJournalEntry = possibleExistingEntry
                .orElseGet(() -> journalEntryRepo.save(journalEntryRequestDto.toEntity()));
        /*
         * orElse vs orElseGet
         * orElse is eager evaluation - first computed, then the Optional object is null-checked
         * This was why the save operation on Repo was always executed !!
         * orElseGet is lazy evaluation - computed after the Optional object is null-checked
         * */
        return JournalEntryResponseDto.fromEntity(createdJournalEntry);
    }

    public JournalEntryResponseDto updateJournalEntry(
            Long id,
            JournalEntryRequestDto journalEntryRequestDto) throws JournalEntryNotFoundException {
        JournalEntry possibleExistingEntry = journalEntryRepo.findById(id)
                .orElseThrow(() -> new JournalEntryNotFoundException(JOURNAL_ENTRY_WITH_ID + id + NOT_FOUND));

        possibleExistingEntry.setQuote(journalEntryRequestDto.quote());
        possibleExistingEntry.setTopic(journalEntryRequestDto.topic());
        journalEntryRepo.save(possibleExistingEntry);

        return JournalEntryResponseDto.fromEntity(possibleExistingEntry);
    }

    public String deleteJournalEntry(Long id) throws JournalEntryNotFoundException {
        JournalEntry possibleExistingEntry = journalEntryRepo.findById(id)
                .orElseThrow(() -> new JournalEntryNotFoundException(JOURNAL_ENTRY_WITH_ID + id + NOT_FOUND));

        journalEntryRepo.delete(possibleExistingEntry);

        return JOURNAL_ENTRY_WITH_ID + id + " deleted.";
    }
}
