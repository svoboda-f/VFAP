package cz.osu.backendvfap.model;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @OneToOne(targetEntity = UserInfo.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "userinfo", referencedColumnName = "id")
    private UserInfo userInfo;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
