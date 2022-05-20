import {Sex} from "../enums/sex.enum";

export interface UserInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  sex: Sex;
  dateOfBirth: Date;
  height: number;
}
