import React, { useState, useRef, useEffect } from "react";

const SchemesBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to Scheme Assistant! 🌱 Ask about any government scheme or support for your crops." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function formatSchemesMessage(schemesObj) {
    if (!schemesObj || typeof schemesObj !== "object") return "No relevant schemes found or Expand your query.";
    return Object.entries(schemesObj)
      .slice(0, 3) 
      .map(([scheme, details]) => {
        return (
          `\u2022 ${scheme}\n` +
          Object.entries(details)
            .map(([k, v]) => `   - ${k}: ${v}`)
            .join("\n")
        );
      })
      .join("\n\n");
  }

  const sendToBackend = async (text) => {
    try {
      const response = await fetch("http://localhost:3000/api/prompt/schemeQuery", {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt: text}),
      });
      if (response.ok) {
        console.log("Sent to LLM successfully");
      }
      const data = await response.json();
      console.log(data.message)
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "bot", text: formatSchemesMessage(data.message) || "Thank you for your message. Our team will help you soon!" },
      ]);
    } 
    catch (error) {
      setMessages((msgs) => [
        ...msgs.slice(0, -1),
        { sender: "bot", text: "Error sending data to backend. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input },
    ]);
    setInput("");
    setIsLoading(true);
    setMessages((msgs) => [...msgs, { sender: "bot", loading: true }]);
    await sendToBackend(input);
  };

  // Loading animation component
  const LoadingDots = () => (
    <div className="flex space-x-1 mt-2">
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.32s]"></span>
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.16s]"></span>
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-4xl h-[80vh] overflow-hidden border border-green-100 justify-center mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-t-2xl">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">📄</span>
            Scheme Assistant
          </h2>
          <p className="text-green-100 text-sm mt-1">Ask about government schemes, eligibility, benefits, and more.</p>
        </div>
        {/* Chat display */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-6 py-4 rounded-2xl max-w-xs lg:max-w-md shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                } flex flex-col`}
              >
                {msg.loading ? (
                  <div className="flex items-center">
                    <span className="mr-2">Analyzing...</span>
                    <LoadingDots />
                  </div>
                ) : (
                  msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area */}
        <form
          onSubmit={handleSend}
          className="p-6 bg-white border-t border-gray-200 rounded-b-2xl"
        >
          <div className="flex items-end space-x-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-200"
              placeholder="Ask about a scheme, eligibility, benefits, etc..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input || isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemesBox;