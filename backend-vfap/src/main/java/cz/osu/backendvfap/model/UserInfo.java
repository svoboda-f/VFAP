package cz.osu.backendvfap.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private int height;
    @OneToMany(targetEntity = Entry.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "userInfo_Entry_fk", referencedColumnName = "id")
    private List<Entry> entries;

    public UserInfo(String firstName, String lastName, LocalDate dateOfBirth, int height) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.height = height;
    }
}
