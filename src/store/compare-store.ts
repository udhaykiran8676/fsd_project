import { create } from "zustand";

interface CompareStore {
  colleges: string[];

  addCollege: (id: string) => void;

  removeCollege: (id: string) => void;
}

export const useCompareStore =
  create<CompareStore>((set) => ({
    colleges: [],

    addCollege: (id) =>
      set((state) => ({
        colleges: [
          ...state.colleges,
          id,
        ],
      })),

    removeCollege: (id) =>
      set((state) => ({
        colleges:
          state.colleges.filter(
            (c) => c !== id
          ),
      })),
  }));