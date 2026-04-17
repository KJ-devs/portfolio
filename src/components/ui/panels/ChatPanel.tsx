'use client'

import { useEffect, useRef, useState } from 'react'

import { getResponse } from '@/lib/chatbot'
import { translations } from '@/lib/i18n'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

interface Message {
  role: 'bot' | 'user'
  text: string
}

export function ChatPanel() {
  const language = usePortfolioStore((s) => s.language)
  const t = translations[language]
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: t.chat_initial,
    },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { role: 'user', text }
    const botMsg: Message = { role: 'bot', text: getResponse(text, language) }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') send()
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400/60">
        {t.chat_badge}
      </p>

      {/* Messages */}
      <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === 'user' ? 'bg-amber-500/20 text-amber-100' : 'bg-white/5 text-white/80'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.chat_placeholder}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-amber-500/40 focus:bg-white/8"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400 transition-colors hover:bg-amber-500/20 disabled:opacity-30"
        >
          ↵
        </button>
      </div>
    </div>
  )
}
