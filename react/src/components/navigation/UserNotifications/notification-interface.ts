interface Notification {
    id: number,
    title: string,
    action: string,
    value: string,
    destination: string,
    createdAt: Date,
    isRead: boolean,
}

export default Notification;