package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.User;
import cz.osu.backendvfap.model.UserInfo;
import cz.osu.backendvfap.repository.UserInfoRepository;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    @PostMapping("/register")
    @ResponseBody
    public void registerUser(@RequestBody User user, HttpServletResponse response){
        if (this.userRepository.findUserByUsernameEquals(user.getUsername()) != null){
           response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            this.userRepository.save(user);
            this.userInfoRepository.save(new UserInfo(user));
        }
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User u = userRepository.findUserByUsernameEquals(user.getUsername());
        if(u == null) {
            return "Uživatel s takovým jménem neexistuje";
        }
        if(!u.getPassword().equals(user.getPassword())) {
            return "Špatné heslo";
        }
        return String.valueOf(u.getId());
    }
}
