package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.Entry;
import cz.osu.backendvfap.repository.EntryRepository;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entries")
public class EntryController {
    @Autowired
    private EntryRepository entryRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public List<Entry> getEntries(@PathVariable long userId) {
        return userRepository.getById(userId).getUserInfo().getEntries();
    }

    @PostMapping("/{userId}")
    public void newEntry(@PathVariable long userId, @RequestBody Entry entry) {
        this.userRepository.getById(userId).getUserInfo().getEntries().add(entry);
        this.entryRepository.save(entry);
    }

    @DeleteMapping("/{userId}/delete/{entryId}")
    public String deleteEntry(@PathVariable("userId") long userId, @PathVariable("entryId") long entryId) {
        Entry entry = this.entryRepository.getById(entryId);
        this.userRepository.getById(userId).getUserInfo().getEntries().remove(entry);
        this.entryRepository.save(entry);
        return "Záznam byl smazán";
    }
}
