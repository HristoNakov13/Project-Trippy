package trippy.services;

import trippy.domain.entities.Notification;
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
}
