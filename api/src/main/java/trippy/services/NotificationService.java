package trippy.services;

import trippy.domain.entities.Notification;
import trippy.domain.entities.Trip;
import trippy.domain.entities.User;

public interface NotificationService {

    /**
     * Saves a notification to the database.
     *
     * @param notification {@link Notification} the notification that's to be saved.
     * @return {@link Notification} the notification after saving it.
     */
    Notification saveNotification(Notification notification);

    /**
     * Fetches {@link Notification} from the database.
     *
     * @param id {@code long} of the {@link Notification}.
     * @return {@link Notification}
     */
    Notification getNotificationById(long id);

    /**
     * Deletes {@link Notification} from the database.
     *
     * @param notification {@link Notification} that's to be removed.
     */
    void deleteNotification(Notification notification);

    /**
     * Creates a {@link Notification} signaling that a {@link User} has
     * been approved to join a {@link Trip}.
     *
     * @param trip {@link Trip} to which the {@link User} has applied.
     * @return {@link Notification}
     */
    Notification createTripApprovedNotification(Trip trip);

    /**
     * Creates a {@link Notification} signaling that a {@link User} has
     * been denied from joining a {@link Trip}.
     *
     * @param trip {@link Trip} to which the {@link User} has applied.
     * @return {@link Notification}
     */
    Notification createTripDeniedNotification(Trip trip);
}
