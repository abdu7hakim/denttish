import { Menu, ClipboardList } from 'lucide-react'

export default function Header() {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
            <ClipboardList size={18} />
          </div>
          <span className="font-bold text-lg text-primary">DentTish</span>
        </div>
        <button className="p-2">
          <Menu size={24} />
        </button>
      </div>
    </div>
  )
}
