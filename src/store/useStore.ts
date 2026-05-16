import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface StoreState {
  activeSection: string;
  setActiveSection: (section: string) => void;

  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;

  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  selectedCountry: string;
  setSelectedCountry: (country: string) => void;

  selectedMentorFilter: string;
  setSelectedMentorFilter: (filter: string) => void;

  selectedAccommodationType: string;
  setSelectedAccommodationType: (type: string) => void;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeSection: "home",
  setActiveSection: (section) => set({ activeSection: section }),

  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearChatMessages: () => set({ chatMessages: [] }),

  isChatOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  selectedCountry: "all",
  setSelectedCountry: (country) => set({ selectedCountry: country }),

  selectedMentorFilter: "all",
  setSelectedMentorFilter: (filter) => set({ selectedMentorFilter: filter }),

  selectedAccommodationType: "all",
  setSelectedAccommodationType: (type) =>
    set({ selectedAccommodationType: type }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
