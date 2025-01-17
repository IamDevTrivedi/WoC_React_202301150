import React, { useState, useRef, useEffect, useContext } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { LoadingDots } from "../components/LoadingDots";
import { message } from 'antd';
import { AppContext } from "../Context/AppContext";

function Chat() {

  const [state, setState] = useState({
    messages: [],
    isLoading: false,
    input: "",
  });


  const [history, setHistory] = useState([]);


  const messagesEndRef = useRef(null);


  const { askRegularQuestion } = useContext(AppContext);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);


  const handleSend = async () => {

    if (!state.input.trim() || state.isLoading) return;

    const currentInput = state.input.trim();
    const currentHistory = [...history];


    const updatedHistory = [
      ...currentHistory,
      {
        role: "user",
        parts: [{ text: currentInput }]
      }
    ];


    const userMessage = {
      id: Date.now().toString(),
      content: currentInput,
      role: "user",
      timestamp: new Date(),
    };


    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
      isLoading: true,
    }));

    try {

      const response = await askRegularQuestion({
        question: currentInput,
        history,
      });


      setHistory([
        ...updatedHistory,
        {
          role: "model",
          parts: [{ text: response }]
        }
      ]);


      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response || "Sorry, I couldn't get that. Can you please try again?",
        role: "assistant",
        timestamp: new Date(),
      };


      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {

      message.error("Failed to get response. Please try again.");
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (

    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Fixed header with blur effect */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 backdrop-blur-md shadow-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo and title */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-bold shadow-lg">
              AI
            </div>
            <h1 className="text-xl font-bold text-neutral-100 tracking-wide">
              Ask AI
            </h1>
          </div>

          {/* Responsive subtitle */}
          <h2 className="hidden md:block text-sm font-medium text-neutral-400">
            Get answers, insights, and everything you need!
          </h2>
        </div>
      </header>

      {/* Scrollable chat area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-4">
          <div className="space-y-6">
            {/* Message list */}
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {/* Loading indicator */}
            {state.isLoading && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black">
                  <LoadingDots />
                </div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Fixed input area with blur effect */}
      <footer className="sticky bottom-0 border-t border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-6xl p-4">
          <ChatInput
            value={state.input}
            onChange={(value) => setState((prev) => ({ ...prev, input: value }))}
            onSend={handleSend}
            disabled={state.isLoading}
          />
        </div>
      </footer>
    </div>
  );
}

export default Chat;