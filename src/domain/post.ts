abstract class Post {
  public id?: string;
  public userId: string;
  public title: string;
  public whatsApp: string;
  public instagram: string;
  public createdAt: Date;
  public images: string[] = [];

  constructor(
    userId: string,
    title: string,
    whatsApp: string,
    instagram: string
  ) {
    this.userId = userId;
    this.title = title;
    this.whatsApp = whatsApp;
    this.instagram = instagram;
    this.createdAt = new Date();
  }
}

export class Hosp extends Post {
  public bedrooms: number;
  public bathroom: number;
  public vacancy: number;
  public serviceArea: boolean;
  public kitchen: boolean;
  public description: string;

  constructor(
    userId: string,
    title: string,
    bedrooms: number,
    bathroom: number,
    vacancy: number,
    serviceArea: boolean,
    kitchen: boolean,
    description: string,
    whatsApp: string,
    instagram: string
  ) {
    super(userId, title, whatsApp, instagram);
    this.bedrooms = bedrooms;
    this.bathroom = bathroom;
    this.vacancy = vacancy;
    this.serviceArea = serviceArea;
    this.kitchen = kitchen;
    this.description = description;
  }
}

export class Food extends Post {
  public type: string;
  public wifi: boolean;
  public delivery: boolean;
  public parking: boolean;
  public description: string;

  constructor(
    userId: string,
    title: string,
    type: string,
    wifi: boolean,
    delivery: boolean,
    parking: boolean,
    description: string,
    whatsApp: string,
    instagram: string
  ) {
    super(userId, title, whatsApp, instagram);

    this.type = type;
    this.wifi = wifi;
    this.delivery = delivery;
    this.parking = parking;
    this.description = description;
  }
}

export class Event extends Post {
  public date: Date;
  public local: string;
  public description: string;

  constructor(
    userId: string,
    title: string,
    date: Date,
    local: string,
    description: string,
    whatsApp: string,
    instagram: string
  ) {
    super(userId, title, whatsApp, instagram);

    this.date = date;
    this.local = local;
    this.description = description;
  }
}
