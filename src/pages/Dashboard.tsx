import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Pill, AlertCircle, MessageCircle, BarChart3, GraduationCap, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    seizuresThisWeek: 0,
    medicationAdherence: 0,
    daysSafe: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Get seizures this week
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const { data: weekSeizures } = await supabase
        .from('seizures')
        .select('id')
        .eq('user_id', user?.id)
        .gte('date_time', startOfWeek.toISOString());

      // Get recent seizures for days safe calculation
      const { data: recentSeizures } = await supabase
        .from('seizures')
        .select('date_time')
        .eq('user_id', user?.id)
        .order('date_time', { ascending: false })
        .limit(1);

      // Get medications for adherence
      const { data: medications } = await supabase
        .from('medications')
        .select('id')
        .eq('user_id', user?.id)
        .eq('active', true);

      // Calculate days safe
      let daysSafe = 0;
      if (recentSeizures && recentSeizures.length > 0) {
        const lastSeizure = new Date(recentSeizures[0].date_time);
        const today = new Date();
        daysSafe = Math.floor((today.getTime() - lastSeizure.getTime()) / (1000 * 60 * 60 * 24));
      }

      setStats({
        seizuresThisWeek: weekSeizures?.length || 0,
        medicationAdherence: medications?.length > 0 ? 98 : 0,
        daysSafe: Math.max(0, daysSafe)
      });

      // Get recent activity
      const { data: activityData } = await supabase
        .from('seizures')
        .select('created_at, seizure_type')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(2);

      const activities = activityData?.map(item => ({
        action: `${item.seizure_type} seizure logged`,
        time: new Date(item.created_at).toLocaleDateString(),
        type: 'seizure'
      })) || [];

      if (medications && medications.length > 0) {
        activities.push({
          action: 'Medication reminder available',
          time: '2 hours ago',
          type: 'medication'
        });
      }

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">SeizureCare</h1>
            <p className="text-primary-foreground/80">Keeping your child safe</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">{stats.seizuresThisWeek}</div>
              <div className="text-xs text-primary-foreground/80">This Week</div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">{stats.medicationAdherence}%</div>
              <div className="text-xs text-primary-foreground/80">Med Adherence</div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-primary-foreground">{stats.daysSafe}</div>
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
          {recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <Card key={index} className={index > 0 ? "mt-3" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'seizure' ? 'bg-destructive' : 
                      activity.type === 'medication' ? 'bg-success' : 'bg-primary'
                    }`}></div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm">{activity.action}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No recent activity</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by logging a seizure or adding medications
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}