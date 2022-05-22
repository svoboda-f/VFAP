package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.Entry;
import cz.osu.backendvfap.repository.EntryRepository;
import cz.osu.backendvfap.repository.UserRepository;
import cz.osu.backendvfap.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
@RequestMapping("/entries")
public class EntryController {
    @Autowired
    private EntryRepository entryRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;

    @GetMapping()
    public List<Entry> getEntries() {
        long id = this.authService.getCurrentUserId();
        return userRepository.getById(id).getUserInfo().getEntries();
    }

    @PostMapping()
    public Entry newEntry(@RequestBody Entry entry) {
        long id = this.authService.getCurrentUserId();
        this.userRepository.getById(id).getUserInfo().getEntries().add(entry);
        this.entryRepository.save(entry);
        return entry;
    }

    @DeleteMapping("/delete/{entryId}")
    public void deleteEntry(@PathVariable("entryId") long entryId) {
        Entry entry = this.entryRepository.getById(entryId);
        long id = this.authService.getCurrentUserId();
        this.userRepository.getById(id).getUserInfo().getEntries().remove(entry);
        this.entryRepository.save(entry);
    }
}
