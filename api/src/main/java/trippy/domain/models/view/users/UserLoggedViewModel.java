package trippy.domain.models.view.users;

import trippy.domain.models.view.notifications.NotificationUserLoggedViewModel;

import java.util.Set;

public class UserLoggedViewModel {

    private String username;
    private String id;
    private Set<NotificationUserLoggedViewModel> notifications;

    public UserLoggedViewModel() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<NotificationUserLoggedViewModel> getNotifications() {
        return notifications;
    }

    public void setNotifications(Set<NotificationUserLoggedViewModel> notifications) {
        this.notifications = notifications;
    }
}
