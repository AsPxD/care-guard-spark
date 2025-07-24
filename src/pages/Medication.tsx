import { useState } from 'react';
import { Plus, Clock, Edit, Trash2, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Medication {
  id: number;
  name: string;
  dose: string;
  times: string[];
  reminderEnabled: boolean;
  notes?: string;
}

export default function Medication() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: 'Keppra (Levetiracetam)',
      dose: '250mg',
      times: ['08:00', '20:00'],
      reminderEnabled: true,
      notes: 'Take with food'
    },
    {
      id: 2,
      name: 'Vitamin D3',
      dose: '400 IU',
      times: ['08:00'],
      reminderEnabled: false,
      notes: 'Daily supplement'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    times: [''],
    reminderEnabled: true,
    notes: ''
  });

  const toggleReminder = (id: number) => {
    setMedications(meds => 
      meds.map(med => 
        med.id === id ? { ...med, reminderEnabled: !med.reminderEnabled } : med
      )
    );
  };

  const deleteMedication = (id: number) => {
    setMedications(meds => meds.filter(med => med.id !== id));
  };

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      times: [...formData.times, '']
    });
  };

  const updateTimeSlot = (index: number, time: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = time;
    setFormData({ ...formData, times: newTimes });
  };

  const removeTimeSlot = (index: number) => {
    setFormData({
      ...formData,
      times: formData.times.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = () => {
    const newMed: Medication = {
      id: Date.now(),
      name: formData.name,
      dose: formData.dose,
      times: formData.times.filter(time => time !== ''),
      reminderEnabled: formData.reminderEnabled,
      notes: formData.notes
    };

    if (editingMed) {
      setMedications(meds => 
        meds.map(med => med.id === editingMed.id ? { ...newMed, id: editingMed.id } : med)
      );
    } else {
      setMedications(meds => [...meds, newMed]);
    }

    setFormData({ name: '', dose: '', times: [''], reminderEnabled: true, notes: '' });
    setShowAddForm(false);
    setEditingMed(null);
  };

  const startEdit = (med: Medication) => {
    setFormData({
      name: med.name,
      dose: med.dose,
      times: med.times,
      reminderEnabled: med.reminderEnabled,
      notes: med.notes || ''
    });
    setEditingMed(med);
    setShowAddForm(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Medications</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Med
          </Button>
        </div>

        {/* Today's Schedule */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <p className="font-medium">08:00 - Keppra 250mg</p>
                    <p className="text-sm text-muted-foreground">✓ Taken</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <p className="font-medium">20:00 - Keppra 250mg</p>
                    <p className="text-sm text-muted-foreground">Due in 3 hours</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Mark Taken
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medication List */}
        <div className="space-y-4">
          {medications.map((med) => (
            <Card key={med.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{med.name}</h3>
                    <p className="text-muted-foreground">{med.dose}</p>
                    {med.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{med.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReminder(med.id)}
                    >
                      {med.reminderEnabled ? (
                        <Bell className="h-4 w-4 text-primary" />
                      ) : (
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(med)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMedication(med.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {med.times.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-accent rounded-md text-sm"
                    >
                      <Clock className="h-3 w-3" />
                      {time}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingMed ? 'Edit Medication' : 'Add Medication'}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Medication Name</Label>
                <Input
                  placeholder="e.g., Keppra (Levetiracetam)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Dose</Label>
                <Input
                  placeholder="e.g., 250mg"
                  value={formData.dose}
                  onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Times</Label>
                {formData.times.map((time, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => updateTimeSlot(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.times.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addTimeSlot} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Input
                  placeholder="e.g., Take with food"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Reminders</Label>
                <Switch
                  checked={formData.reminderEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, reminderEnabled: checked })}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMed(null);
                    setFormData({ name: '', dose: '', times: [''], reminderEnabled: true, notes: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  {editingMed ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}