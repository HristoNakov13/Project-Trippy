package trippy.domain.entities;

import trippy.domain.entities.enums.NotificationAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {


    private Long id;
    private String title;

    //action will be used for url redirection from notifications tab to the appropriate root (trip, user, etc)
    private NotificationAction action;

    //value is intended to be stored value of an id for instance of a trip a user joined
    private String value;
    private LocalDateTime createdAt;
    private boolean isRead;

    public Notification() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Enumerated(EnumType.ORDINAL)
    public NotificationAction getAction() {
        return action;
    }

    public void setAction(NotificationAction action) {
        this.action = action;
    }

    @Column(name = "created_at")
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Column(name = "is_read")
    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
