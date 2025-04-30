import { useEffect, useState } from "react";
import { Notification } from "../../types/Notification";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock fetching from backend
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        message: "You have a new message from Alice.",
        isRead: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        message: "Your donation has been received!",
        isRead: true,
        createdAt: new Date(Date.now() - 86400000),
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <main className="notifications">
      <section className="notifications-container">
        <header className="notifications-header">
          <h2 className="notifications-title">Notifications</h2>
          <button className="mark-read-button" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </header>

        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications available.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${
                  notification.isRead ? "read" : "unread"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <p className="notification-message">{notification.message}</p>
                <time className="notification-time">
                  {notification.createdAt.toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Notifications;
