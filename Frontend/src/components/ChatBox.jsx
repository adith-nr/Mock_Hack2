import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to PlantScan! How can I help you take care of your crops today?" }
  ]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendToBackend = async (text, image) => {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("/api/plantscan", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: data.reply || "Thank you for your message. Our team will help you soon!" }
      ]);
    } catch (error) {
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: "Error sending data to backend." }
      ]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !imageFile) return;

    let newMessages = [...messages];
    // Add user message with text and/or image
    if (imageFile && imagePreview) {
      newMessages = [
        ...newMessages,
        { sender: "user", text: input.trim() ? input : undefined, image: imagePreview }
      ];
    } else if (input.trim()) {
      newMessages = [...newMessages, { sender: "user", text: input }];
    }
    setMessages(newMessages);

    // Send to backend
    await sendToBackend(input, imageFile);

    setInput("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-blue-500 rounded-xl shadow-lg z-20 flex flex-col justify-between items-center w-full max-w-[90vw] h-[80vh] overflow-hidden">
      {/* Chat display */}
      <div className="flex-1 w-full bg-white p-4 rounded-t-xl overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-200 text-blue-900"
                  : "bg-blue-100 text-blue-700"
              } flex flex-col items-center`}
            >
              {/* Show image on top, text below */}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="User upload"
                  className="mb-2 max-w-[180px] max-h-[180px] rounded"
                />
              )}
              {msg.text && (
                <div className="w-full text-left">{msg.text}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Typing area */}
      <form
        onSubmit={handleSend}
        className={`w-full flex flex-col items-center bg-blue-100 p-3 rounded-b-xl transition-all duration-200`}
        encType="multipart/form-data"
      >
        {/* Image preview above the input */}
        {imagePreview && (
          <div className="relative mb-2 flex justify-center w-full group">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-[350px] max-h-[350px] rounded-xl border"
              style={{ objectFit: "contain" }}
            />
            {/* Overlay for dimming on hover */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 max-w-[350px] max-h-[350px] w-full h-full rounded-xl bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 pointer-events-none" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 rounded-full p-2 shadow hover:bg-red-500 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center"
              style={{ zIndex: 2 }}
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="white"/>
                <path stroke="red" strokeWidth="2" strokeLinecap="round" d="M9 9l6 6m0-6l-6 6" />
              </svg>
            </button>
            <style>{`
              .group:hover button[type="button"] {
                opacity: 1 !important;
              }
              .group button[type="button"] {
                opacity: 0;
                transition: opacity 0.2s;
              }
            `}</style>
          </div>
        )}
        <div className="w-full flex items-center">
          <label className="mr-2 cursor-pointer bg-blue-200 hover:bg-blue-300 text-blue-700 px-3 py-2 rounded-lg transition flex items-center justify-center">
            {/* Plus icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;