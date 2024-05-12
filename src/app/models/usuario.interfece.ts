
export interface Usuario {
  id?: number;
  email: string;
  userName: string;
  password: string;
  isActive: boolean;
  sexo: string;
  createdDate:Date;
}
