package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Notification;
import trippy.repositories.NotificationRepository;
import trippy.services.NotificationService;

import javax.persistence.EntityNotFoundException;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification saveNotification(Notification notification) {
        return this.notificationRepository.saveAndFlush(notification);
    }

    public Notification getNotificationById(long id) {
        return this.notificationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notification does not exist."));
    }

    @Override
    public void deleteNotification(Notification notification) {
        this.notificationRepository.deleteById(notification.getId());
    }
}
