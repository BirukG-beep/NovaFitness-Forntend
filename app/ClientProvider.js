"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        <Toaster position="top-right" richColors closeButton duration={4000} />
      </ThemeProvider>
    </Provider>
  );
}