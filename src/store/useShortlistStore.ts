import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShortlistItem {
  username: string;
  fullname: string;
  followers: number;
  picture: string;
  platform: string;
  is_verified: boolean;
}

interface ShortlistStore {
  shortlist: ShortlistItem[];
  addToShortlist: (profile: ShortlistItem) => void;
  removeFromShortlist: (username: string) => void;
  isInShortlist: (username: string) => boolean;
}

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      shortlist: [],

      addToShortlist: (profile) => {
        const already = get().shortlist.find(
          (p) => p.username === profile.username
        );
        if (!already) {
          set((state) => ({
            shortlist: [...state.shortlist, profile],
          }));
        }
      },

      removeFromShortlist: (username) => {
        set((state) => ({
          shortlist: state.shortlist.filter((p) => p.username !== username),
        }));
      },

      isInShortlist: (username) => {
        return get().shortlist.some((p) => p.username === username);
      },
    }),
    {
      name: "wobb-shortlist",
    }
  )
);
