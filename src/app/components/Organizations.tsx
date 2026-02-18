import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { portfolioData } from "../../data/portfolioData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Organizations() {
  return (
    <section id="organizations" className="min-h-screen px-4 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-4">Organizations</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Student organizations I've been part of
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {portfolioData.organizations.map((org, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
                <ImageWithFallback
                  src={org.cover_img}
                  alt={org.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{org.acronym}</CardTitle>
                    <CardDescription className="mt-1">
                      {org.name}
                    </CardDescription>
                  </div>
                  <span className="text-sm text-gray-500">{org.year}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{org.department}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
