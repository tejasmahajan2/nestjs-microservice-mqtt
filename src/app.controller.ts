import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log("sum triggered!");
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
    return "200"
  }

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
    console.log("user_created triggered!", data);
  }

}
