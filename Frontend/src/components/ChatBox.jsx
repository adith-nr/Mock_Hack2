"use client"

import { useState, useRef, useEffect } from "react"

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to PlantScan! 🌱 How can I help you take care of your crops today?" },
  ])
  const [input, setInput] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const sendToBackend = async (text, image) => {
    const formData = new FormData()
    if (text) formData.append("prompt", text)
    if (image) formData.append("image", image)

    try {
      const response = await fetch("http://localhost:3000/api/prompt/diseaseQuery", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      
      if (response.ok) {
        console.log("Sent to LLM successfully")
      }
      const data = await response.json()
      console.log(data)

      setMessages((msgs) => [
        ...msgs.slice(0, -1), // Remove loading message
        { sender: "bot", text: data.solution || "Thank you for your message. Our team will help you soon!" },
      ])
    } catch (error) {
      console.log(error)
      setMessages((msgs) => [
        ...msgs.slice(0, -1), // Remove loading message
        { sender: "bot", text: "Error sending data to backend. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input && !imageFile) return

    // Show user message
    setMessages((msgs) => [
      ...msgs,
      {
        sender: "user",
        text: input ? input : "",
        image: imagePreview ? imagePreview : null,
      },
    ])

    setInput("")
    setImageFile(null)
    setImagePreview(null)

    // Show loading animation
    setIsLoading(true)
    setMessages((msgs) => [...msgs, { sender: "bot", loading: true }])

    await sendToBackend(input, imageFile)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImageFile(null)
    setImagePreview(null)
  }

  // Loading animation component
  const LoadingDots = () => (
    <div className="flex space-x-1 mt-2">
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.32s]"></span>
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.16s]"></span>
      <span className="block w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-4xl h-[80vh] overflow-hidden border border-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-t-2xl">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">🤖</span>
          Plant Disease Assistant
        </h2>
        <p className="text-green-100 text-sm mt-1">Upload a photo or describe your plant's condition</p>
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
              {/* Show image on top, text below */}
              {msg.image && (
                <img
                  src={msg.image || "/placeholder.svg"}
                  alt="User upload"
                  className="mb-3 max-w-[200px] max-h-[200px] rounded-lg object-cover"
                />
              )}
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
        encType="multipart/form-data"
      >
        {/* Image preview */}
        {imagePreview && (
          <div className="relative mb-4 flex justify-center group">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Preview"
              className="max-w-[300px] max-h-[300px] rounded-xl border-2 border-green-200 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-xl" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-end space-x-3">
          <label className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-200"
            placeholder="Describe your plant's condition or ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            disabled={(!input && !imageFile) || isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
