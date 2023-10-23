// interface for the Patients object to prevent any or any[] type

export default interface Patients {
  id: number;
  name: string;
  species: string;
  age: string;
  sickness: string;
  created_at: string;
  updated_at: string | null;
  token: string;
};