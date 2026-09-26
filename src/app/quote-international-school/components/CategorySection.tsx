"use client";

import type { ReactNode } from "react";
import { useCategory, type CategoryId } from "../CategoryContext";

export default function CategorySection({ id, children }: { id: CategoryId; children: ReactNode }) {
  const { active } = useCategory();
  const visible = active === "all" || active === id;
  return <div className={visible ? "" : "hidden"}>{children}</div>;
}
