export interface ITour {
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  type: string;
  locationId: string;
  date?: string;
}

export interface IToursResponse {
  tours: ITour[];
}
