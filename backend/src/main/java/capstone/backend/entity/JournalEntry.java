package capstone.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Objects;

@Entity
@Table(name = "journal_entries")
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String quote;
    @Column(nullable = false, length = 50)
    private String topic;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        JournalEntry that = (JournalEntry) o;
        return Objects.equals(getQuote(), that.getQuote()) && Objects.equals(getTopic(), that.getTopic());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getQuote(), getTopic());
    }

    @Override
    public String toString() {
        return "JournalEntry{" +
                "topic='" + topic + '\'' +
                ", quote='" + quote + '\'' +
                '}';
    }
}
