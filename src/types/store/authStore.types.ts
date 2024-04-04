import { AuthCredential } from "firebase/auth";
import { User } from "../user/userProfile.type";

export type UserData = {
  credential: AuthCredential;
  profile: User;
} | null;

export type AuthStore = {
  currentUser: UserData;
  setCurrentUser: (value: any) => void;
};
