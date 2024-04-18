import { auth, getUserProfileByID, signIn } from "@/hook/firebase";
import { User } from "@/types/user/userProfile.type";
import { create } from "zustand";

type AuthStore = {
  currentUserProfile: User | null;
  currentUser: any | null | false;
  isShowLoader: boolean;
  LoaderWords: any;
  login: any;
  showLoaderWords: any;
  hideLoaderWords: any;
  setLoaderWords: any;

  setCurrentUser: any;
  logout: any;
};

const AuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  currentUserProfile: null,
  isShowLoader: false,
  LoaderWords: [],
  setLoaderWords: (words: any) => {
    set({ LoaderWords: words });
  },
  showLoaderWords: () => {
    set({ isShowLoader: true });
  },
  hideLoaderWords: () => {
    set({ isShowLoader: false });
  },
  setCurrentUser: (user: any, profile: any) => {
    set({ currentUser: user, currentUserProfile: profile });
  },
  login: async (data: { email: string; password: string }) => {
    try {
      const userCredential = await signIn(data);
      const userProfile = await getUserProfileByID(userCredential.user.uid);
      set({
        currentUser: userCredential.user,
        currentUserProfile: userProfile,
      });
    } catch (error: any) {
      throw error;
    }
  },
  logout: async () => {
    // logout in firebase
    await auth.signOut();
    set({ currentUser: null });
  },
}));
export default AuthStore;
