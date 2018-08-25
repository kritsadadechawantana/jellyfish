export class Item {
    constructor(
      public id: number,
      public name: string,
      public slot: string,
      public isBorrow: boolean,
      public createAt: Date
    ) { }
  }
  