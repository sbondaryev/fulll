import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateFleetCLI,
  RegisterVehicleCLI,
  LocalizeVehicleCLI,
} from './app.command';
import { CommandHandlers } from './app/commands';
import { QueryHandlers } from './app/queries';
import { Repositories } from './infra';

@Module({
  imports: [CqrsModule],
  providers: [
    ...Repositories,
    ...CommandHandlers,
    ...QueryHandlers,
    CreateFleetCLI,
    RegisterVehicleCLI,
    LocalizeVehicleCLI,
  ],
})
export class AppModule {}
