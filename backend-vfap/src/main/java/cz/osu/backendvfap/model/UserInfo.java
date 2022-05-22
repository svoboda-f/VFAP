package cz.osu.backendvfap.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @MapsId
    private User user;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private int height;
    @OneToMany(targetEntity = Entry.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "userInfo_Entry_fk", referencedColumnName = "user_id")
    private List<Entry> entries;

    public UserInfo(User user) {
        this.entries = new ArrayList<>();
        this.user = user;
    }

    public void setInfo(String firstName, String lastName, LocalDate dateOfBirth, int height) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.height = height;
    }

    public Map<String, Object> getInfo() {
        Map<String, Object> ret = new LinkedHashMap<>();
        ret.put("username", this.user.getUsername());
        ret.put("firstName", this.firstName);
        ret.put("lastName", this.lastName);
        ret.put("dateOfBirth", this.dateOfBirth);
        ret.put("height", this.height);
        return ret;
    }
}
