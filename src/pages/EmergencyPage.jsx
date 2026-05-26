import { AlertCircle, Phone, Stethoscope, Plus } from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        {/* Emergency Alert */}
        <div className="bg-red-50 p-4 m-4 rounded-lg border border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-1" />
            <div>
              <h2 className="font-bold text-red-700 mb-1">Tish favqulodda holati</h2>
              <p className="text-sm text-red-600">
                Xotirjam bo'ling. Tez yordam uchun mutaxassislarimiz bilan bog'lanib, bizning xizmatimizdan foydalaning.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="p-4 space-y-3">
          {/* Stomatologist */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-2">
              <Phone size={24} className="text-red-500" />
              <h3 className="font-bold">Stomatologga qo'ng'iroq qilish</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
               Hozirda mutaxassislarimiz bilan bog'lanib, bizning xizmatimizdan foydalaning.
            </p>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold">
               QO'NG'IROQ QILISH
            </button>
          </div>

          {/* Dental Clinic */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope size={24} className="text-blue-500" />
              <h3 className="font-bold">Yaqin klinikasini topish</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Xaritada eng yaqin tez yordam beradigan klinikalarni toping
            </p>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold">
              KLINIKA TOPISH
            </button>
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3">Tez yordam ko'rsatmalari</h2>
          <div className="space-y-3">
            {[
              { title: 'Tushib qolgan tish', desc: "Tishni sutga solib qo'ying va darhol shifokorga murojaat qiling" },
              { title: 'Kuchli og\'riq', desc: "Tezda mutaxassislarimiz bilan bog'lanib, yordam oling" },
              { title: 'Singan/shikastlangan tish', desc: "Og'zingizni iliq suv bilan chaying va shifokorga murojaat qiling" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4">
                <div className="flex gap-3">
                  <Plus size={20} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3">Ilk yordam</h2>
          <div className="bg-white rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-sm mb-3">Quyidagi amallarni bajaring:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Og'zingizni iliq suv bilan chaying va yumshoq tish cho'tkasidan foydalaning</li>
              <li>✓ Shish va og'riqni kamaytirish uchun muzlatilgan kompress qo'llang</li>
              <li>✓ Og'riq qoldiruvchi vositalardan (ibuprofen yoki paracetamol) foydalaning</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
