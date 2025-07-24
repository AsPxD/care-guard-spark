import { useState } from 'react';
import { Calendar, Clock, Camera, Plus, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const seizureTypes = [
  'Tonic-clonic (Grand mal)',
  'Absence (Petit mal)',
  'Myoclonic',
  'Atonic',
  'Focal aware',
  'Focal impaired awareness',
  'Other'
];

const commonTriggers = [
  'Sleep deprivation',
  'Stress',
  'Missed medication',
  'Fever',
  'Flashing lights',
  'Loud noises',
  'Unknown'
];

export default function SeizureDiary() {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    time: '',
    type: '',
    duration: '',
    triggers: '',
    notes: '',
  });

  const seizureEntries = [
    {
      id: 1,
      date: '2024-01-20',
      time: '14:30',
      type: 'Absence',
      duration: '45 seconds',
      triggers: 'Sleep deprivation',
      notes: 'Brief episode during quiet time'
    },
    {
      id: 2,
      date: '2024-01-18',
      time: '09:15',
      type: 'Focal aware',
      duration: '2 minutes',
      triggers: 'Unknown',
      notes: 'Child was playing when it started'
    }
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting:', { date, ...formData });
    setShowForm(false);
    // Reset form
    setDate(undefined);
    setFormData({ time: '', type: '', duration: '', triggers: '', notes: '' });
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Add Entry</h1>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label>Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Seizure Type */}
              <div className="space-y-2">
                <Label>Seizure Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seizure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {seizureTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  placeholder="e.g., 2 minutes 30 seconds"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              {/* Triggers */}
              <div className="space-y-2">
                <Label>Possible Triggers</Label>
                <Select value={formData.triggers} onValueChange={(value) => setFormData({ ...formData, triggers: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select possible trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonTriggers.map((trigger) => (
                      <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Describe what happened before, during, and after..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label>Upload Video (Optional)</Label>
                <Button variant="outline" className="w-full h-20 border-dashed">
                  <Camera className="h-6 w-6 mr-2" />
                  Tap to record or upload video
                </Button>
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Save Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Seizure Diary</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => setShowForm(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        {/* Timeline View */}
        <div className="space-y-4">
          {seizureEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{entry.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.date} at {entry.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{entry.duration}</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Trigger: </span>
                    <span className="text-muted-foreground">{entry.triggers}</span>
                  </div>
                  <div>
                    <span className="font-medium">Notes: </span>
                    <span className="text-muted-foreground">{entry.notes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {seizureEntries.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking seizure episodes to help your doctor understand patterns.
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}