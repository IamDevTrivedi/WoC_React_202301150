import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { LoadingDots } from "../components/LoadingDots";

// Simulated API response delay
const RESPONSE_DELAY = 1000;

// Example responses for demonstration
const EXAMPLE_RESPONSES = [
  "I'd be happy to help you with that!",
  "That's an interesting question. Let me explain...",
  "Here's what I think about that...",
  "Based on my understanding...",
];

function Chat() {
  const [state, setState] = useState({
    messages: [],
    isLoading: false,
    input: "",
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = async () => {
    if (!state.input.trim() || state.isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: state.input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
      isLoading: true,
    }));

    // Simulate API call
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content:
          EXAMPLE_RESPONSES[
            Math.floor(Math.random() * EXAMPLE_RESPONSES.length)
          ],
        role: "assistant",
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    }, RESPONSE_DELAY);
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 backdrop-blur-md shadow-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo/Title Section */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shadow-lg">
              AI
            </div>
            <h1 className="text-xl font-bold text-neutral-100 tracking-wide">
              Ask AI
            </h1>
          </div>

          {/* Subtitle Section */}
          <h2 className="hidden md:block text-sm font-medium text-neutral-400">
            Get answers, insights, and everything you need!
          </h2>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-4">
          <div className="space-y-6">
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {state.isLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black">
                  <LoadingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 border-t border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-6xl p-4">
          <ChatInput
            value={state.input}
            onChange={(value) =>
              setState((prev) => ({ ...prev, input: value }))
            }
            onSend={handleSend}
            disabled={state.isLoading}
          />
        </div>
      </footer>
    </div>
  );
}

export default Chat;
