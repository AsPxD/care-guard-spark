import { BarChart3, TrendingDown, Calendar, Pill, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Reports() {
  const seizureData = [
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 1 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 1 },
    { month: 'Jun', count: 2 },
  ];

  const medicationAdherence = [
    { week: 'Week 1', percentage: 100 },
    { week: 'Week 2', percentage: 95 },
    { week: 'Week 3', percentage: 100 },
    { week: 'Week 4', percentage: 90 },
  ];

  const stats = {
    totalSeizures: 9,
    avgPerMonth: 1.5,
    longestFreeStreak: 28,
    medicationAdherence: 96.3
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <Select defaultValue="6months">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalSeizures}</div>
              <div className="text-sm text-muted-foreground">Total Episodes</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{stats.longestFreeStreak}</div>
              <div className="text-sm text-muted-foreground">Days Seizure-Free</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground">{stats.avgPerMonth}</div>
              <div className="text-sm text-muted-foreground">Avg Per Month</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{stats.medicationAdherence}%</div>
              <div className="text-sm text-muted-foreground">Med Adherence</div>
            </CardContent>
          </Card>
        </div>

        {/* Seizure Frequency Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Seizure Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {seizureData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{data.month}</div>
                  <div className="flex-1 bg-muted rounded-full h-6 relative">
                    <div
                      className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.max((data.count / 5) * 100, 10)}%` }}
                    >
                      {data.count > 0 && (
                        <span className="text-xs text-primary-foreground font-medium">
                          {data.count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-success" />
              <span>33% decrease from last period</span>
            </div>
          </CardContent>
        </Card>

        {/* Medication Adherence */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Medication Adherence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medicationAdherence.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{data.week}</div>
                  <div className="flex-1 bg-muted rounded-full h-6 relative">
                    <div
                      className="bg-success h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${data.percentage}%` }}
                    >
                      <span className="text-xs text-success-foreground font-medium">
                        {data.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Triggers Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Common Triggers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Sleep deprivation</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Unknown</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Stress</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Missed medication</span>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Export Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              Export PDF Report
            </Button>
            <Button variant="outline" className="w-full">
              Share with Doctor
            </Button>
            <Button variant="outline" className="w-full">
              Email Summary
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}