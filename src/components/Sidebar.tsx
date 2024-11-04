import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Users, BookOpen, ClipboardCheck, BookMarked, MessageSquare, Link as LinkIcon, FileText } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Beranda', href: '/' },
    // { icon: Users, label: 'List Kontakan', href: '/contacts' },
    // { icon: ClipboardCheck, label: 'Asesment Internal', href: '/assessment' },
    // { icon: BookOpen, label: 'Kehadiran JM HS', href: '/attendance' },
    // { icon: BookMarked, label: 'Stifin', href: '#' },
    // { icon: MessageSquare, label: 'Mutabaah', href: '#' },
    // { icon: BookOpen, label: 'Panduan Halqah', href: '/guide' },
    { icon: FileText, label: 'Laporan Guru Cangkuang', href: '/report' },
    { icon: LinkIcon, label: 'Link WA Generator', href: '/whatsapp' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu Dakwah</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    active
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;