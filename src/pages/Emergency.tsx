import { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Emergency() {
  const [sosPressed, setSosPressed] = useState(false);
  const [location] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: "123 Main St, New York, NY 10001"
  });

  const handleSOS = () => {
    setSosPressed(true);
    // In a real app, this would trigger emergency services
    setTimeout(() => setSosPressed(false), 3000);
  };

  const emergencyContacts = [
    { name: '911 Emergency', number: '911', type: 'Emergency Services' },
    { name: 'Dr. Smith (Neurologist)', number: '(555) 123-4567', type: 'Doctor' },
    { name: 'Mom - Sarah', number: '(555) 987-6543', type: 'Family' },
    { name: 'Dad - Mike', number: '(555) 456-7890', type: 'Family' },
  ];

  const emergencyInstructions = [
    {
      title: "During a Seizure",
      steps: [
        "Stay calm and time the seizure",
        "Keep the child safe from injury",
        "Do NOT put anything in their mouth",
        "Turn them on their side if possible",
        "Clear the area of hard objects"
      ]
    },
    {
      title: "Call 911 If:",
      steps: [
        "Seizure lasts longer than 5 minutes",
        "Child has difficulty breathing",
        "Multiple seizures without recovery",
        "Injury occurs during seizure",
        "First-time seizure"
      ]
    },
    {
      title: "After the Seizure",
      steps: [
        "Stay with the child until fully alert",
        "Check for injuries",
        "Note the time and duration",
        "Comfort and reassure the child",
        "Record details in seizure diary"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Emergency</h1>
          <p className="text-muted-foreground">Quick access to help and guidance</p>
        </div>

        {/* SOS Button */}
        <div className="text-center mb-8">
          <Button
            size="lg"
            onClick={handleSOS}
            className={`w-40 h-40 rounded-full text-xl font-bold transition-all duration-300 ${
              sosPressed 
                ? 'bg-destructive/80 scale-110 shadow-2xl' 
                : 'bg-destructive hover:bg-destructive/90 hover:scale-105'
            } text-destructive-foreground`}
          >
            {sosPressed ? (
              <div className="flex flex-col items-center">
                <AlertTriangle className="h-8 w-8 mb-2" />
                <span>CALLING...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-2" />
                <span>SOS</span>
              </div>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {sosPressed ? 'Emergency services contacted' : 'Tap for immediate help'}
          </p>
        </div>

        {/* Location Display */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Lat: {location.lat}, Lng: {location.lng}
            </div>
            <div className="font-medium">{location.address}</div>
            <Button variant="outline" size="sm" className="mt-3">
              Share Location
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">{contact.type}</div>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Instructions */}
        <div className="space-y-4">
          {emergencyInstructions.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {index === 0 && <Heart className="h-5 w-5 text-primary" />}
                  {index === 1 && <AlertTriangle className="h-5 w-5 text-destructive" />}
                  {index === 2 && <Clock className="h-5 w-5 text-success" />}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Medical Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Child:</strong> Alex Johnson</div>
              <div><strong>Age:</strong> 7 years old</div>
              <div><strong>Condition:</strong> Epilepsy</div>
              <div><strong>Current Medication:</strong> Keppra 250mg twice daily</div>
              <div><strong>Allergies:</strong> None known</div>
              <div><strong>Doctor:</strong> Dr. Smith, Pediatric Neurology</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}