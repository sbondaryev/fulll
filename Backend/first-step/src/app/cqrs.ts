/*
 * A simple implementation of CQRS
 */
interface Event {}

interface Handler {
  execute(payload: Event): unknown;
}

class Bus<E extends Event, H extends Handler> {
  private handlers: { event: string; handler: H }[] = [];

  register(event: string, handler: H): Bus<E, H> {
    this.handlers.push({ event, handler });
    return this;
  }

  execute(event: E) {
    const handlerItem = this.handlers.find(
      (handler) => handler.event == event.constructor.name,
    );
    if (!handlerItem) {
      throw Error(`No handler found for type: ${event.constructor.name}`);
    }
    return handlerItem.handler.execute(event);
  }
}

export interface CommandHandler extends Handler {}
export interface Command extends Event {}
export const commandBus = new Bus<Command, CommandHandler>();

export interface QueryHandler extends Handler {}
export interface Query extends Event {}
export const queryBus = new Bus<Query, QueryHandler>();
