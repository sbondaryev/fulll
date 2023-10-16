import { Test } from '@nestjs/testing';
import { QueryBus, CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '../../src/app/commands';
import { QueryHandlers } from '../../src/app/queries';
import { BeforeAll } from '@cucumber/cucumber';
import { Repositories } from '../../src/infra';

export let commandBus: CommandBus;
export let queryBus: QueryBus;

BeforeAll(async function () {
  const moduleRef = await Test.createTestingModule({
    imports: [CqrsModule],
    providers: [...Repositories, ...CommandHandlers, ...QueryHandlers],
  }).compile();
  const app = moduleRef.createNestApplication();
  await app.init();

  commandBus = moduleRef.get<CommandBus>(CommandBus);
  queryBus = moduleRef.get<QueryBus>(QueryBus);
});
