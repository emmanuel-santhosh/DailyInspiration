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
                .orElseThrow(() -> new JournalEntryNotFoundException("Journal Entry with id: " + id + " not found !"));

        possibleExistingEntry.setQuote(journalEntryRequestDto.quote());
        possibleExistingEntry.setTopic(journalEntryRequestDto.topic());

        return JournalEntryResponseDto.fromEntity(possibleExistingEntry);
    }
}
