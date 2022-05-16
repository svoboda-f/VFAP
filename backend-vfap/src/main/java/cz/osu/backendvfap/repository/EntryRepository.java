package cz.osu.backendvfap.repository;

import cz.osu.backendvfap.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepository extends JpaRepository<Entry, Integer> {
}
