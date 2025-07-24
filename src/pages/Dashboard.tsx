import { Link } from 'react-router-dom';
import { BookOpen, Pill, AlertCircle, MessageCircle, BarChart3, GraduationCap, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const quickAccessTiles = [
  {
    title: 'Seizure Diary',
    subtitle: 'Track episodes',
    icon: BookOpen,
    path: '/diary',
    color: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Medication',
    subtitle: 'Manage meds',
    icon: Pill,
    path: '/medication',
    color: 'bg-success text-success-foreground',
  },
  {
    title: 'Emergency',
    subtitle: 'SOS Help',
    icon: AlertCircle,
    path: '/emergency',
    color: 'bg-destructive text-destructive-foreground',
  },
  {
    title: 'Reports',
    subtitle: 'View insights',
    icon: BarChart3,
    path: '/reports',
    color: 'bg-accent text-accent-foreground',
  },
  {
    title: 'Doctor Chat',
    subtitle: 'Connect now',
    icon: MessageCircle,
    path: '/chat',
    color: 'bg-secondary text-secondary-foreground',
  },
  {
    title: 'Education',
    subtitle: 'Learn more',
    icon: GraduationCap,
    path: '/education',
    color: 'bg-muted text-muted-foreground',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-b-3xl mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Care Guard</h1>
            <p className="text-primary-foreground/80">Keeping your child safe</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">0</div>
              <div className="text-xs text-primary-foreground/80">This Week</div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">98%</div>
              <div className="text-xs text-primary-foreground/80">Med Adherence</div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">5</div>
              <div className="text-xs text-primary-foreground/80">Days Safe</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickAccessTiles.map((tile) => (
            <Link key={tile.path} to={tile.path}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${tile.color} flex items-center justify-center mb-3`}>
                    <tile.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{tile.title}</h3>
                  <p className="text-muted-foreground text-sm">{tile.subtitle}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Activity</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <p className="text-sm">Medication reminder completed</p>
            </CardContent>
          </Card>
          
          <Card className="mt-3">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
              <p className="text-sm">New education article available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}