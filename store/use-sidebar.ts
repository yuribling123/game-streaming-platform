import { Sidebar } from "@/app/(browse)/_components/sidebar";
import { create } from "zustand";

// manage the state of sidebar:  methods to expand and collapse it

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void; 
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}));
