"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type CategoryId =
  | "international-school"
  | "private-school"
  | "uk-school"
  | "school-progress"
  | "english-placement"
  | "reading";

interface CategoryContextValue {
  active: CategoryId | "all";
  setActive: (id: CategoryId | "all") => void;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  return <CategoryContext.Provider value={{ active, setActive }}>{children}</CategoryContext.Provider>;
}

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategory must be used within CategoryProvider");
  return ctx;
}
