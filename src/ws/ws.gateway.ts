import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/api/ws',
  cors: {
    origin: '*',
  },
})
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketsGateway.name);
  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: any) {
    this.logger.verbose(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  notifyAdmin(ticketId: string) {
    this.server.emit('ticketCreated', { ticketId });
  }
}
