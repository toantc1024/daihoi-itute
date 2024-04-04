import { getUserProfileByID, signIn } from "@/config/firebase";
import { AuthStore } from "@/types/store/authStore.types";
import { User } from "@/types/user/userProfile.type";
import { AuthCredential } from "firebase/auth";
import { decl } from "postcss";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist<any>(
    (set) => ({
      currentUser: null,
      isLogging: false,
      login: async (data: { email: string; password: string }) => {
        set({
          isLogging: true,
        });
        const userCredential = await signIn(data);
        const userProfile = await getUserProfileByID(userCredential.user.uid);
        set({ currentUser: { userProfile, userCredential } });
        set({ isLogging: false });
      },
      logout: async () => {
        // logout in firebase
        set({ currentUser: null });
      },
    }),
    {
      storage: createJSONStorage(() => sessionStorage),
      name: "auth-storage",
    }
  )
);
export default useAuthStore;
