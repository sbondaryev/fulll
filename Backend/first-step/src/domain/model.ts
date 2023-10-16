export class Model {
  constructor(protected readonly id: string) {}

  getId(): string {
    return this.id;
  }
}
