import { useState } from 'react';
import { Send, Phone, Video, Paperclip, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: string;
  type?: 'text' | 'image' | 'file';
}

export default function DoctorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Good morning! I reviewed Alex's latest seizure diary entries. The frequency seems to be stable.",
      sender: 'doctor',
      timestamp: '09:15',
    },
    {
      id: 2,
      text: "Thank you Dr. Smith. I was worried about the episode yesterday. It seemed different.",
      sender: 'user',
      timestamp: '09:18',
    },
    {
      id: 3,
      text: "Can you describe what was different about it? Duration, symptoms, or recovery time?",
      sender: 'doctor',
      timestamp: '09:20',
    },
    {
      id: 4,
      text: "It lasted about 2 minutes instead of the usual 45 seconds. Alex seemed more confused afterward.",
      sender: 'user',
      timestamp: '09:22',
    },
    {
      id: 5,
      text: "Thank you for that detail. Let's monitor this closely. Please continue with the current medication schedule and update the diary with any changes.",
      sender: 'doctor',
      timestamp: '09:25',
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-doctor.jpg" />
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Dr. Sarah Smith</h2>
            <p className="text-sm text-primary-foreground/80">Pediatric Neurologist</p>
            <p className="text-xs text-primary-foreground/70">Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex gap-2 max-w-[80%]">
              {message.sender === 'doctor' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">DS</AvatarFallback>
                </Avatar>
              )}
              <div>
                <Card
                  className={`p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </Card>
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 right-0 bg-background border-t p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}