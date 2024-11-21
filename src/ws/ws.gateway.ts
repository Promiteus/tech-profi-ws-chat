import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server} from 'socket.io';
import {Message} from "./interfaces/ws.interface";
import {Logger} from "@nestjs/common";
import {MongoChatMsgService} from "../mongo/mongo.chat.msg.service";

@WebSocketGateway({cors: {origin: '*'}})
export class WsGateway implements  OnGatewayConnection, OnGatewayDisconnect{
    constructor(private readonly mongoService: MongoChatMsgService) {
    }

    @WebSocketServer() server: Server;//new Server<ServerToClientEvents, ClientToServerEvents>();
    private logger = new Logger('ChatGateway')

    @SubscribeMessage('chat')
    async handleChat(@MessageBody() payload: Message): Promise<Message> {
        this.logger.log(`payload: ${JSON.stringify(payload)}`);
        this.server.to(payload.roomName).emit('chat', payload);

        await this.mongoService.create({
            fromUserId: payload?.user?.userId ?? null,
            userId: payload?.fromUser?.userId ?? null,
            message: payload.message,
            room: payload.roomName});
        return payload;
    }

    @SubscribeMessage('join')
    async joinRoom(@MessageBody() payload: Message): Promise<Message> {
        if (payload.user.socketId) {
            this.logger.log(`${payload.user.socketId} is joining ${payload.roomName}`);
            await this.server.in(payload.user.socketId).socketsJoin(payload.roomName);
        }
        return;
    }

    async handleConnection(client: any, ...args: any[]) {
        const { sockets } = this.server.sockets;

        this.logger.log(`Client id: ${client.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
    }

    async handleDisconnect(client: any) {
        this.logger.log(`Cliend id:${client.id} disconnected`);
    }
}