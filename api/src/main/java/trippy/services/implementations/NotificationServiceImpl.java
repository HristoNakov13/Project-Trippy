package trippy.services.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trippy.domain.entities.Notification;
import trippy.domain.entities.Trip;
import trippy.domain.entities.enums.NotificationAction;
import trippy.repositories.NotificationRepository;
import trippy.services.NotificationService;
import trippy.services.TripService;
import trippy.util.entities.notifications.NotificationBuilder;

import javax.persistence.EntityNotFoundException;

import static trippy.util.constants.NotificationConstants.TRIP_APPROVAL;
import static trippy.util.constants.NotificationConstants.TRIP_DENIED;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationBuilder notificationBuilder;

    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationBuilder notificationBuilder) {
        this.notificationRepository = notificationRepository;
        this.notificationBuilder = notificationBuilder;
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

    @Override
    public Notification createTripApprovedNotification(Trip trip) {
        return this.notificationBuilder
                .setTitle(String.format(TRIP_APPROVAL,
                        trip.getFrom().getName(),
                        trip.getTo().getName()))
                .setNotificationAction(NotificationAction.TRIP_APPLICATION_RESULT)
                .setDestination(trip.getId())
                .build();
    }

    @Override
    public Notification createTripDeniedNotification(Trip trip) {
        return this.notificationBuilder
                .setTitle(String.format(TRIP_DENIED,
                        trip.getFrom().getName(),
                        trip.getTo().getName()))
                .setNotificationAction(NotificationAction.TRIP_APPLICATION_RESULT)
                .build();
    }
}
