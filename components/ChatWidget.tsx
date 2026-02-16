"use client";

import { useState, useRef, useEffect } from "react";

const MAX_MESSAGE_LENGTH = 2000;
const TYPING_DELAY_MS = 1200;
const TYPEWRITER_MS_PER_CHAR = 28;

type MessageRole = "agent" | "user";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isButton?: boolean;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<"welcome" | "question" | "details" | "sending" | "success" | "error">("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [typingMessage, setTypingMessage] = useState<{ full: string; displayed: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const onTypewriterDoneRef = useRef<(() => void) | null>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, step, showTypingIndicator, typingMessage]);

  const addMessage = (role: MessageRole, content: string, isButton = false) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${role}`, role, content, timestamp: new Date(), isButton },
    ]);
  };

  const queueAgentReply = (text: string, onDone?: () => void) => {
    onTypewriterDoneRef.current = onDone ?? null;
    setShowTypingIndicator(true);
    setTypingMessage(null);
    setTimeout(() => {
      setShowTypingIndicator(false);
      setTypingMessage({ full: text, displayed: "" });
    }, TYPING_DELAY_MS);
  };

  useEffect(() => {
    if (!typingMessage) return;
    if (typingMessage.displayed.length >= typingMessage.full.length) {
      addMessage("agent", typingMessage.full);
      setTypingMessage(null);
      onTypewriterDoneRef.current?.();
      onTypewriterDoneRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 50);
      return;
    }
    const t = setTimeout(() => {
      setTypingMessage((prev) => {
        if (!prev) return null;
        const next = prev.full.slice(0, prev.displayed.length + 1);
        return { full: prev.full, displayed: next };
      });
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [typingMessage]);

  const handleStartQuestion = () => {
    addMessage("user", "I have a question");
    setStep("question");
    queueAgentReply("Hi! Please enter your question in the box below and we'll get back to you.", () => {
      setStep("question");
      inputRef.current?.focus();
    });
  };

  const handleSendQuestion = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    setInputValue("");
    queueAgentReply("Thanks! You can add your name and email below so we can reply, or just send as is.", () => {
      setStep("details");
    });
  };

  const handleSubmitDetails = async () => {
    setErrorText("");
    setStep("sending");
    try {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === "user" && !m.isButton);
      const question = lastUserMsg?.content ?? "";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("success");
        setName("");
        setEmail("");
      } else {
        setStep("error");
        setErrorText(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStep("error");
      setErrorText("Failed to send. Please try again or call (561) 847-3797.");
    }
  };

  const handleSendAnother = () => {
    setMessages([]);
    setStep("welcome");
    setInputValue("");
    setErrorText("");
  };

  const showWelcomeButton = step === "welcome";
  const showQuestionInput = step === "question";
  const showDetailsForm = step === "details";
  const showSending = step === "sending";
  const showSuccess = step === "success";
  const showError = step === "error";

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex w-full max-w-sm flex-col rounded-2xl border border-gray-200 bg-white shadow-xl font-sans overflow-hidden"
          style={{ height: "min(560px, calc(100vh - 7rem))" }}
          role="dialog"
          aria-label="Chat"
        >
          {/* Header - teal */}
          <div className="flex shrink-0 flex-col bg-teal-600 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Back"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-base font-semibold">Contact Us</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-center text-xs text-white/90">
              We usually reply in a few minutes at this time of day.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50/80 p-4 space-y-4">
            {/* First message always visible so the conversation flows */}
            <div className="flex gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex flex-col max-w-[85%]">
                <div className="rounded-2xl rounded-tl-md bg-teal-100 px-4 py-2.5 text-sm text-gray-800 space-y-2">
                  <p>Let me know if you have any questions!</p>
                  {showWelcomeButton && (
                    <button
                      type="button"
                      onClick={handleStartQuestion}
                      className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      I have a question
                    </button>
                  )}
                </div>
                <span className="mt-1 text-xs text-gray-500">Florida Theranostics · {formatTime(new Date())}</span>
              </div>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.role === "agent" ? "flex gap-2" : "flex justify-end"}
              >
                {msg.role === "agent" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className={msg.role === "agent" ? "flex flex-col max-w-[85%]" : "flex flex-col items-end max-w-[85%]"}>
                  <div
                    className={
                      msg.role === "agent"
                        ? "rounded-2xl rounded-tl-md bg-teal-100 px-4 py-2.5 text-sm text-gray-800"
                        : "rounded-2xl rounded-tr-md bg-teal-600 px-4 py-2.5 text-sm text-white"
                    }
                  >
                    {msg.isButton ? (
                      <span className="font-medium">{msg.content}</span>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className={`mt-1 text-xs text-gray-500 ${msg.role === "user" ? "text-right" : ""}`}>
                    {msg.role === "agent" ? "Chatbot" : ""} · {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {showTypingIndicator && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-md bg-teal-100 px-4 py-3 text-sm text-gray-600">
                  <span className="inline-flex gap-1 items-center">
                    <span className="h-2 w-2 animate-typing-dot rounded-full bg-gray-500" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-typing-dot rounded-full bg-gray-500" style={{ animationDelay: "200ms" }} />
                    <span className="h-2 w-2 animate-typing-dot rounded-full bg-gray-500" style={{ animationDelay: "400ms" }} />
                  </span>
                </div>
              </div>
            )}

            {typingMessage && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col max-w-[85%]">
                  <div className="rounded-2xl rounded-tl-md bg-teal-100 px-4 py-2.5 text-sm text-gray-800">
                    {typingMessage.displayed}
                    <span className="animate-pulse">|</span>
                  </div>
                  <span className="mt-1 text-xs text-gray-500">Chatbot · {formatTime(new Date())}</span>
                </div>
              </div>
            )}

            {showDetailsForm && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col max-w-[85%] rounded-2xl rounded-tl-md bg-teal-100 px-4 py-3 text-sm text-gray-800 space-y-2">
                  <p>We just need some more information from you to proceed:</p>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 100))}
                    placeholder="Name"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.slice(0, 254))}
                    placeholder="Email (optional)"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={handleSubmitDetails}
                    className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Send message
                  </button>
                </div>
              </div>
            )}

            {showSending && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-md bg-teal-100 px-4 py-2.5 text-sm text-gray-600">
                  Sending…
                </div>
              </div>
            )}

            {showSuccess && (
              <div className="flex gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="rounded-2xl rounded-tl-md bg-teal-100 px-4 py-2.5 text-sm text-gray-800">
                    Thank you! Your message has been sent. We&apos;ll get back to you soon.
                  </div>
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className="mt-2 text-left text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}

            {showError && (
              <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {errorText}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          {!showDetailsForm && !showSuccess && !showSending && (showQuestionInput || showError) && (
            <div className="shrink-0 border-t border-gray-200 bg-white p-3">
              {showQuestionInput ? (
                <div className="flex gap-2">
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                    onKeyDown={(e) => e.key === "Enter" && handleSendQuestion()}
                    placeholder="Type your question..."
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={handleSendQuestion}
                    disabled={!inputValue.trim()}
                    className="shrink-0 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              ) : showError ? (
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Try again
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
}
