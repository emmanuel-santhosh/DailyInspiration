package capstone.backend.controller;

import capstone.backend.dto.JournalEntryRequestDto;
import capstone.backend.dto.JournalEntryResponseDto;
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
    public List<JournalEntryResponseDto> findAllJournalEntries() {
        return journalEntryService.findAllJournalEntries();
    }

    @PostMapping
    public ResponseEntity<JournalEntryResponseDto> createJournalEntry(@RequestBody JournalEntryRequestDto journalEntryRequestDto) {
        JournalEntryResponseDto createdDto = journalEntryService.createJournalEntry(journalEntryRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDto);
    }

    @PutMapping
    @RequestMapping("/{id}")
    public ResponseEntity<JournalEntryResponseDto> updateJournalEntry(
            @PathVariable Long id,
            @RequestBody JournalEntryRequestDto journalEntryRequestDto) {
        JournalEntryResponseDto updatedJournalEntry = journalEntryService.updateJournalEntry(id, journalEntryRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedJournalEntry);
    }
}
