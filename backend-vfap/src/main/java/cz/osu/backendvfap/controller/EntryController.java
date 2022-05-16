package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.Entry;
import cz.osu.backendvfap.repository.EntryRepository;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EntryController {
    @Autowired
    private EntryRepository entryRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}/entries")
    public List<Entry> getEntries(@PathVariable int userId) {
        return userRepository.findById(userId).get().getUserInfo().getEntries();
    }

    @PostMapping("/{userId}/entries/new")
    public void newEntry(@PathVariable int userId, @RequestBody Entry entry) {
        this.userRepository.findById(userId).get().getUserInfo().getEntries().add(entry);
        this.entryRepository.save(entry);
    }

    @DeleteMapping("/{userId}/entries/delete/{entryId}")
    public String deleteEntry(@PathVariable("userId") int userId, @PathVariable("entryId") int entryId) {
        Entry entry = this.entryRepository.getById(entryId);
        this.userRepository.getById(userId).getUserInfo().getEntries().remove(entry);
        this.entryRepository.save(entry);
        return "Záznam byl smazán";
    }
}
