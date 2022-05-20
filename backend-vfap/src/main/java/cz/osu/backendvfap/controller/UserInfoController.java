package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.model.UserInfo;
import cz.osu.backendvfap.repository.UserInfoRepository;
import cz.osu.backendvfap.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/info")

public class UserInfoController {
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private AuthService authService;

    @GetMapping()
    public Map<String,Object> getUserInfo() {
        long id = this.authService.getCurrentUserId();
        return this.userInfoRepository.getById(id).getInfo();
//        return null;
    }

    @PostMapping()
    public void setUserInfo(@RequestBody UserInfo userInfo) {
        long id = this.authService.getCurrentUserId();
        UserInfo tmp = this.userInfoRepository.getById(id);
        tmp.setInfo(
                userInfo.getFirstName(),
                userInfo.getLastName(),
                userInfo.getDateOfBirth(),
                userInfo.getHeight()
        );
        this.userInfoRepository.save(tmp);
    }
}
