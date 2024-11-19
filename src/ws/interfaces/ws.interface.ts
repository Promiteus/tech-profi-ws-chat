export interface User {
    userId: string
    userName: string
    socketId: string
}

export interface Message {
    user: User
    fromUser: User
    message: string
    roomName: string
}

