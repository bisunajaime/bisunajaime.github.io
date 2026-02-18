import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Events() {
  return (
    <section id="events" className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4">Events</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Speaking engagements and events I've participated in
        </p>
        
        <Tabs defaultValue="hosted" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="hosted">Hosted & Spoke At</TabsTrigger>
            <TabsTrigger value="attended">Attended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hosted">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.events.hosted.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <ImageWithFallback
                      src={event.cover_img}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  {event.url_to_event && (
                    <CardContent>
                      <Button size="sm" variant="outline" className="gap-2" asChild>
                        <a href={event.url_to_event} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          View Event
                        </a>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="attended">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.events.attended.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                    <ImageWithFallback
                      src={event.cover_img}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  {event.url_to_event && (
                    <CardContent>
                      <Button size="sm" variant="outline" className="gap-2" asChild>
                        <a href={event.url_to_event} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          View Event
                        </a>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
