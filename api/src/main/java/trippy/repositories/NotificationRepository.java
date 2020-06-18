package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {


}
