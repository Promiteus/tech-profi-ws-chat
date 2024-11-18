import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server} from 'socket.io';
import {Message} from "./ws.interface";
import {Logger} from "@nestjs/common";

@WebSocketGateway({cors: {origin: '*'}})
export class WsGateway implements  OnGatewayConnection, OnGatewayDisconnect{

    @WebSocketServer() server: Server;//new Server<ServerToClientEvents, ClientToServerEvents>();
    private logger = new Logger('ChatGateway')

    @SubscribeMessage('chat')
    async handleChat(@MessageBody() payload: Message): Promise<Message> {
        if (payload.join && payload.user.socketId) {
           this.logger.log(`${payload.user.socketId} is joining ${payload.roomName}`);
           await this.server.in(payload.user.socketId).socketsJoin(payload.roomName);
           return;
        }

        this.logger.log(`payload: ${JSON.stringify(payload)}`);
        this.server.to(payload.roomName).emit('chat', payload);
        return payload;
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