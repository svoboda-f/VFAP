package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.UserInfo;
import cz.osu.backendvfap.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/info")
public class UserInfoController {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @GetMapping("/{userId}")
    public Map<String,Object> getUserInfo(@PathVariable long userId) {
        return this.userInfoRepository.getById(userId).getInfo();
    }

    @PostMapping("/{userId}")
    public void setUserInfo(@PathVariable long userId, @RequestBody UserInfo userInfo) {
        UserInfo tmp = this.userInfoRepository.getById(userId);
        tmp.setInfo(
                userInfo.getFirstName(),
                userInfo.getLastName(),
                userInfo.getDateOfBirth(),
                userInfo.getHeight()
        );
        this.userInfoRepository.save(tmp);
    }
}
