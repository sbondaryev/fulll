import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateFleetCLI,
  RegisterVehicleCLI,
  LocalizeVehicleCLI,
} from './app.command';
import { CommandHandlers } from './app/commands';
import { QueryHandlers } from './app/queries';

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    CreateFleetCLI,
    RegisterVehicleCLI,
    LocalizeVehicleCLI,
  ],
})
export class AppModule {}
