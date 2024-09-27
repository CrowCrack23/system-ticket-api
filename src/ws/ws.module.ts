import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './ws.gateway';

@Module({
  providers: [WebsocketsGateway],
})
export class WebsocketsGatewayModule {}
