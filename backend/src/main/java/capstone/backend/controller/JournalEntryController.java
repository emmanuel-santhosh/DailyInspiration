package capstone.backend.controller;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.service.JournalEntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/myjournal")
public class JournalEntryController {

    private final JournalEntryService journalEntryService;

    public JournalEntryController(JournalEntryService journalEntryService) {
        this.journalEntryService = journalEntryService;
    }

    @GetMapping
    public List<JournalEntryDto> findAllJournalEntries() {
        return journalEntryService.findAllJournalEntries();
    }

    @PostMapping
    public ResponseEntity<JournalEntryDto> createJournalEntry(@RequestBody JournalEntryDto journalEntryDto){
        JournalEntryDto createdDto = journalEntryService.createJournalEntry(journalEntryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDto);
    }
}
