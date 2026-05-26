import { Send } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Salom! Men sizning DentTish AI yordamchisiman. Bugun tabassumingiz uchun qanday yordam bera olaman?",
      timestamp: 'Bugun',
      icon: '🏠',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        text: input,
      }
      setMessages([...messages, userMessage])

      // Simulate AI response
      setTimeout(() => {
        const aiMessage = {
          id: messages.length + 2,
          type: 'ai',
          text: 'Mening pastki o\'ng molar tishimda sovuq suv ichganda o\'tkir og\'riq bor.',
        }
        setMessages((prev) => [...prev, aiMessage])
      }, 500)

      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {/* AI Chat Header */}
        <div className="bg-white p-4 text-center border-b">
          <p className="text-sm text-gray-600">Bugun</p>
          <h2 className="text-lg font-bold mt-2">
            Salom! Men sizning DentTish AI yordamchisiman. Bugun tabassumingiz uchun qanday yordam bera olaman?
          </h2>
        </div>

        {/* Messages */}
        <div className="space-y-4 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-blue-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tips */}
        <div className="p-4 space-y-2">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <span>🔍</span> SIMPTOMLARNI TEKSHIRISH
            </h3>
            <p className="text-sm text-gray-600 mb-4">
               Bemorning sovuq suv ichganda o'tkir og'riq bor. Buning sababi nima bo'lishi mumkin?
            </p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-3 text-sm">Sizga yordam berish uchun:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>Tishingiz og'risa, shifokorga murojaat qiling</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>Og'riqning muddati va kuchini kuzating</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>O'zingizni qanday his qilayotganingizni ayting</span>
              </li>
            </ul>
          </div>

          {/* Symptoms Info */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              ⚠️ OG'IRLIK BELGILARI
            </h3>
            <p className="text-sm text-gray-600 font-semibold mb-2">Ushbu alomatlar bo'lsa darhol stomatologga murojaat qiling:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Og'riq 2 kundan ko'proq davom etsa</li>
              <li>• Kuchli og'riq bo'lsa, uni e'tiborsiz qoldirmang</li>
              <li>• Shish, qattiq og'riq yoki qon ketish bo'lsa</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Xabar yozing..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 outline-none text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-primary text-white rounded-full p-3 flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
