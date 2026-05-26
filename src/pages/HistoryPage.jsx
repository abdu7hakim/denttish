import { Smile, FileText, Clock, Activity } from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Page Title */}
        <div className="bg-white p-4 border-b">
          <h1 className="text-2xl font-bold">Sizning tarixingiz</h1>
          <p className="text-gray-600 text-sm">Barcha tish davolash tarixi, rentgen nurlari va natijalar bir joyda</p>
        </div>

        {/* Teeth Map */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Activity size={20} /> Tish xaritasi
          </h2>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-4">Ma'lumot uchun og'riqni qo'shimcha ko'ring.</p>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="grid grid-cols-4 gap-2">
                {Array(16).fill(0).map((_, idx) => (
                  <div key={idx} className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs font-bold text-gray-400">
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* X-rays */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <FileText size={20} /> Oxirgi rentgen nurlari
          </h2>
          <div className="space-y-3">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=xray1"
                alt="Panoramic X-ray"
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <p className="font-bold text-sm">Panoramik</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/shapes/svg?seed=xray2"
                alt="Bite-wing X-ray"
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <p className="font-bold text-sm">Bite-wing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment History */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Clock size={20} /> Davolash tarixi
          </h2>
          <div className="space-y-3">
            {[
              {
                title: 'Kompleks ko\'rik',
                date: '12-oktabr, 2023',
                desc: "To'liq og'iz karies diagnostikasi va tish tozalash amallari. Panoramik va bite-wing rentgenlar olindi.",
              },
              {
                title: 'Tishlarni oqartirish',
                date: '5-aprel, 2023',
                desc: 'Klinik sharoitida professional oqartirish muolajasi. 2 ton yorqinlikni oshirdi.',
              },
              {
                title: 'Donolik tishini olish',
                date: '20-noyabr, 2022',
                desc: 'Pastki o\'ng jag\'dagi impaktlangan donolik tishining jarrohlik yo\'li bilan olib tashlandi. Asoratsiz bitdi.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4">
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
