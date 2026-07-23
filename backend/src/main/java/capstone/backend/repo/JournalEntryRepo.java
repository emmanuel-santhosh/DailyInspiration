package capstone.backend.repo;

import capstone.backend.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JournalEntryRepo extends JpaRepository<JournalEntry, Long> {
    Optional<JournalEntry> findJournalEntryByQuoteAndTopic(String quote, String topic);
}
