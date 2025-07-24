import { Home, BookOpen, Pill, AlertCircle, MessageCircle, BarChart3, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BookOpen, label: 'Diary', path: '/diary' },
  { icon: Pill, label: 'Meds', path: '/medication' },
  { icon: AlertCircle, label: 'SOS', path: '/emergency' },
  { icon: MessageCircle, label: 'Chat', path: '/chat' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: GraduationCap, label: 'Learn', path: '/education' },
];

export default function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-7 h-16">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center text-xs transition-colors',
                'hover:bg-muted',
                isActive
                  ? 'text-primary bg-secondary'
                  : 'text-muted-foreground'
              )
            }
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}