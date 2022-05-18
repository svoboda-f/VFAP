package cz.osu.backendvfap.repository;

import cz.osu.backendvfap.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
