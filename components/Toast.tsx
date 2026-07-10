"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const icons: Record<Toast["type"], string> = {
    success: "✓",
    info: "ℹ",
    warning: "⚠",
    error: "✕",
  };

  const colors: Record<Toast["type"], string> = {
    success: "border-emerald-500/50 bg-emerald-950/90",
    info: "border-brand-500/50 bg-brand-950/90",
    warning: "border-amber-500/50 bg-amber-950/90",
    error: "border-red-500/50 bg-red-950/90",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-slide-up flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-xl ${colors[toast.type]}`}
          >
            <span className="font-bold">{icons[toast.type]}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
