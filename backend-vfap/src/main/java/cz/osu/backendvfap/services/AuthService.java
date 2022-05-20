package cz.osu.backendvfap.services;

import cz.osu.backendvfap.model.User;
import cz.osu.backendvfap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = this.userRepository.findByUsername(auth.getName());
        return user.getId();
    }
}
