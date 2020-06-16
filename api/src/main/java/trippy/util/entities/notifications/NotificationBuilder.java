package trippy.util.entities.notifications;

import trippy.domain.entities.Notification;
import trippy.domain.entities.enums.NotificationAction;

import java.time.LocalDateTime;
import java.util.MissingFormatArgumentException;

public class NotificationBuilder {

    private String title;
    private NotificationAction notificationAction;
    private String value;

    public NotificationBuilder() {
    }

    public NotificationBuilder setTitle(String title) {
        this.title = title;

        return this;
    }

    public NotificationBuilder setNotificationAction(NotificationAction notificationAction) {
        this.notificationAction = notificationAction;

        return this;
    }

    public NotificationBuilder setValue(String value) {
        this.value = value;

        return this;
    }

    public Notification build() {
        if (this.title == null) {
            throw new IllegalArgumentException("Title is required.");
        }

        Notification notification = new Notification();

        notification.setCreatedAt(LocalDateTime.now());
        notification.setAction(this.notificationAction);
        notification.setTitle(this.title);
        notification.setValue(this.value);

        return notification;
    }
}
