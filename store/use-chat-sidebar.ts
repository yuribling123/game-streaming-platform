/* access and modify sidebar state */

import { create } from "zustand";

// manage the state of sidebar:  methods to expand and collapse it
export enum ChatVariant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY"
  }
  

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void;
  }
  

  export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
  }));