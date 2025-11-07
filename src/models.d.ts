interface Entity {
  id: number;
}

interface Customer {
  avatarurl?: string;
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
}

interface CustomerEntity extends Entity, Customer {}

interface Training {
  date: Date;
  duration: number;
  activity: string;
}

interface TrainingEntity extends Entity, Training {
  customer: CustomerEntity;
}
