export class Item {
    constructor(
      public id: string,
      public name: string,
      public slot: string,
      public isBorrow: boolean,
      public createAt: Date
    ) { }
  }

  export class BorrowInfo {
    constructor(
      public id: string,
      public name: string,
      public slot: string,
      public itemId: string,
      public owner: string,
      public approver : string
    ) { }
  }
  