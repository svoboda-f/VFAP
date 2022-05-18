package cz.osu.backendvfap.model;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.LinkedHashMap;
import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    @Column(unique = true)
    private String username;
    @NotNull
    private String password;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private UserInfo userInfo;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.userInfo = new UserInfo();
        this.userInfo.setUser(this);
    }

    public Map<String, Object> getUser() {
        Map<String, Object> ret = new LinkedHashMap<>();
        ret.put("id", this.id);
        ret.put("username", this.username);
        return ret;
    }
}
