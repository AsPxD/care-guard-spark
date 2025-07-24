import { Play, BookOpen, Clock, Star, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const articles = [
  {
    id: 1,
    title: "Understanding Childhood Epilepsy",
    description: "A comprehensive guide to understanding seizures in children, their causes, and treatment options.",
    readTime: "8 min read",
    category: "Basics",
    rating: 4.8,
    thumbnail: "/placeholder-article1.jpg"
  },
  {
    id: 2,
    title: "Seizure First Aid: What Every Parent Should Know",
    description: "Essential first aid steps and safety measures for when your child has a seizure.",
    readTime: "5 min read",
    category: "Safety",
    rating: 4.9,
    thumbnail: "/placeholder-article2.jpg"
  },
  {
    id: 3,
    title: "Medication Management for Children",
    description: "Tips for ensuring consistent medication schedules and managing side effects.",
    readTime: "6 min read",
    category: "Treatment",
    rating: 4.7,
    thumbnail: "/placeholder-article3.jpg"
  },
  {
    id: 4,
    title: "School and Seizures: Advocacy Guide",
    description: "How to work with schools to ensure your child's safety and educational success.",
    readTime: "10 min read",
    category: "Education",
    rating: 4.6,
    thumbnail: "/placeholder-article4.jpg"
  }
];

const videos = [
  {
    id: 1,
    title: "Seizure Recognition Training",
    description: "Learn to identify different types of seizures and when to seek help.",
    duration: "12:30",
    category: "Training",
    thumbnail: "/placeholder-video1.jpg"
  },
  {
    id: 2,
    title: "Creating a Seizure Action Plan",
    description: "Step-by-step guide to creating an emergency action plan for your child.",
    duration: "8:45",
    category: "Planning",
    thumbnail: "/placeholder-video2.jpg"
  },
  {
    id: 3,
    title: "Emotional Support for Families",
    description: "Coping strategies and support resources for families affected by epilepsy.",
    duration: "15:20",
    category: "Support",
    thumbnail: "/placeholder-video3.jpg"
  }
];

const categories = ["All", "Basics", "Safety", "Treatment", "Education", "Support"];

export default function Education() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Education Center</h1>
          <p className="text-muted-foreground">Learn about epilepsy, treatment, and support</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="whitespace-nowrap cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Section */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium">Featured</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Emergency Response Workshop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our live workshop on seizure emergency response. Learn life-saving techniques from medical professionals.
            </p>
            <Button size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Register Now
            </Button>
          </CardContent>
        </Card>

        {/* Articles Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Articles</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning fill-current" />
                          <span className="text-xs text-muted-foreground">{article.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{article.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                        <Button size="sm" variant="outline">
                          Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <div className="space-y-4">
            {videos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center relative">
                      <Play className="h-8 w-8 text-primary" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {video.category}
                      </Badge>
                      <h3 className="font-semibold text-sm mb-1">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {video.description}
                      </p>
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-2" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-sm">Glossary</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <ExternalLink className="h-6 w-6 mb-2" />
              <span className="text-sm">External Links</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Star className="h-6 w-6 mb-2" />
              <span className="text-sm">FAQ</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
              <Clock className="h-6 w-6 mb-2" />
              <span className="text-sm">Updates</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}