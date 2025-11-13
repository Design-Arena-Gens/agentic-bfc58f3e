'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! It's great to chat with you. What would you like to talk about?"
    }

    if (message.includes('how are you')) {
      return "I'm doing great, thank you for asking! I'm here and ready to help. How are you doing?"
    }

    if (message.includes('your name') || message.includes('who are you')) {
      return "I'm an AI chatbot assistant designed to have conversations and help answer your questions. You can call me Bot!"
    }

    if (message.includes('help')) {
      return "I'm here to chat with you! You can ask me questions, have a conversation, or just say hello. What would you like to know?"
    }

    if (message.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`
    }

    if (message.includes('date')) {
      return `Today's date is ${new Date().toLocaleDateString()}.`
    }

    if (message.includes('weather')) {
      return "I don't have access to real-time weather data, but I hope it's nice where you are! You might want to check a weather service for accurate information."
    }

    if (message.includes('joke')) {
      const jokes = [
        "Why did the programmer quit his job? Because he didn't get arrays!",
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "What's a computer's favorite snack? Microchips!",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
      ]
      return jokes[Math.floor(Math.random() * jokes.length)]
    }

    if (message.includes('thanks') || message.includes('thank you')) {
      return "You're very welcome! I'm happy to help. Is there anything else you'd like to know?"
    }

    if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! It was nice chatting with you. Come back anytime!"
    }

    if (message.includes('love')) {
      return "That's a wonderful topic! Love is one of the most powerful emotions. Is there something specific about love you'd like to discuss?"
    }

    if (message.includes('favorite color')) {
      return "I think all colors are beautiful in their own way! But if I had to choose, I'd say I'm fond of blue - it's calming and reminds me of the sky and ocean."
    }

    const responses = [
      "That's interesting! Tell me more about that.",
      "I see what you mean. What else is on your mind?",
      "That's a great point! I'd love to hear more of your thoughts.",
      "Fascinating! How do you feel about that?",
      "I appreciate you sharing that. What made you think of that?",
      "That's something to think about. Do you have any other questions?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSend = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: messages.length,
      text: inputValue,
      sender: 'user'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 1,
        text: getBotResponse(inputValue),
        sender: 'bot'
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        AI Chatbot
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isTyping}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isTyping || inputValue.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  )
}
