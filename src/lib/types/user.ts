import { ITask } from "./task";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tasks?: ITask[];
}
