package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.User;
import cz.osu.backendvfap.model.UserInfo;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/get-users")
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @PostMapping("/{userId}/set-info")
    public void setUsersInfo(@PathVariable int userId, @RequestBody UserInfo userInfo) {
        User user = this.userRepository.findById(userId).get();
        user.setUserInfo(userInfo);
        this.userRepository.save(user);
    }
}
