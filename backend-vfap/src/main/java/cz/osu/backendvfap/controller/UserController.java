package cz.osu.backendvfap.controller;

import cz.osu.backendvfap.JwtUtil;
import cz.osu.backendvfap.model.Auth;
import cz.osu.backendvfap.model.User;
import cz.osu.backendvfap.model.UserInfo;
import cz.osu.backendvfap.repository.UserInfoRepository;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class UserController {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    @PostMapping("/register")
    @ResponseBody
    public void registerUser(@RequestBody User user, HttpServletResponse response) {
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            this.userRepository.save(user);
            this.userInfoRepository.save(new UserInfo(user));
        }
    }

    @PostMapping("/login")
    public String generateToken(@RequestBody Auth auth) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(auth.getUsername(), auth.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Invalid username/password");
        }
        return jwtUtil.generateToken(auth.getUsername());
    }
}
