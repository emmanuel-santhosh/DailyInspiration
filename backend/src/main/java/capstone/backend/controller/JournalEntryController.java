package capstone.backend.controller;

import capstone.backend.dto.JournalEntryDto;
import capstone.backend.service.JournalEntryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
