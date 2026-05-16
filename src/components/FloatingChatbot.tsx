"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Trash2, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME: Message = {
  id: "init",
  role: "assistant",
  content: `Hi! I'm your EduGuide360 AI Counselor 👋

I can help you with:
🎓 Schools & Colleges — IIT, IIM, AIIMS, NIT
📚 Entrance Exams — JEE, NEET, CAT, UPSC
✈️ Study Abroad — USA, UK, Canada, Germany
💰 Scholarships — Fulbright, Chevening, DAAD
💼 Jobs & Career guidance
🏠 PG, Hostel & Accommodation

Ask me anything!`,
};

const QUICK_Q = [
  "JEE preparation tips",
  "NEET coaching",
  "USA scholarship",
  "After 12th options",
  "Government jobs",
  "Study in Germany",
];

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-1.5" />;
    const bold = (s: string) =>
      s.split(/\*\*(.*?)\*\*/g).map((p, j) =>
        j % 2 === 1 ? <strong key={j}>{p}</strong> : p
      );
    if (line.startsWith("• ") || line.startsWith("- "))
      return <div key={i} className="flex gap-1.5"><span className="text-emerald-500 mt-0.5">•</span><span>{bold(line.slice(2))}</span></div>;
    return <p key={i}>{bold(line)}</p>;
  });
}

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) { endRef.current?.scrollIntoView({ behavior: "smooth" }); setUnread(0); }
  }, [messages, loading, open]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages(p => [...p, userMsg]);
    setLoading(true);
    try {
      const history = messages.slice(-4).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      const reply = data.message || "Please try again.";
      setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: "assistant", content: reply }]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMessages(p => [...p, { id: (Date.now() + 1).toString(), role: "assistant", content: "Connection issue. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[360px] sm:w-[380px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            style={{ height: 520 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm leading-none">EduGuide AI</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-white/75 text-[10px]">Online 24/7</span>
                </div>
              </div>
              <button onClick={() => setMinimized(true)} className="text-white/70 hover:text-white p-1"><Minimize2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => setMessages([WELCOME])} className="text-white/70 hover:text-white p-1" title="Clear"><Trash2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1"><X className="w-4 h-4" /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-950/50 text-sm">
              {messages.map(m => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${m.role === "assistant" ? "bg-emerald-100 dark:bg-emerald-900" : "bg-emerald-500"}`}>
                    {m.role === "assistant" ? <Bot className="w-3.5 h-3.5 text-emerald-600" /> : <User className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className={`max-w-[82%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-500 text-white rounded-tr-sm"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-700 rounded-tl-sm"
                  }`}>
                    {m.role === "assistant" ? renderText(m.content) : m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-emerald-600" /></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl rounded-tl-sm px-3 py-2.5 border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-1" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 typing-dot-3" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick questions */}
            <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-2 pt-2 pb-0 shrink-0">
              <div className="flex gap-1.5 overflow-x-auto pb-2">
                {QUICK_Q.map(q => (
                  <button key={q} onClick={() => send(q)} disabled={loading}
                    className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 hover:bg-emerald-100 transition-colors whitespace-nowrap disabled:opacity-40">
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pb-3">
                <Input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Ask anything..." className="flex-1 h-9 text-xs" disabled={loading} />
                <Button onClick={() => send()} disabled={!input.trim() || loading}
                  className="h-9 w-9 p-0 bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-40 shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Minimized bar */}
        {open && minimized && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full px-4 py-2.5 flex items-center gap-2.5 shadow-xl cursor-pointer"
            onClick={() => setMinimized(false)}>
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">EduGuide AI</span>
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <X className="w-3.5 h-3.5 ml-1 opacity-70 hover:opacity-100" onClick={e => { e.stopPropagation(); setOpen(false); setMinimized(false); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setOpen(true); setMinimized(false); setUnread(0); }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
        </motion.button>
      )}
    </div>
  );
}
