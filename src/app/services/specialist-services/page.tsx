
import Image from 'next/image';
import { services, supportResources } from "@/lib/data";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { icons } from "lucide-react";
import Link from 'next/link';

export default function SpecialistServicesPage() {
  const service = services.find(s => s.slug === 'specialist-services');
  const heroImage = PlaceHolderImages.find(p => p.id === 'service-specialist-care');

  const specialistCategories = supportResources.filter(
    (category) =>
      category.category !== 'Government & Training Guidance' &&
      category.category !== 'Useful Emergency / Urgent Contacts'
  );

  if (!service) return null;

  return (
    <div>
        <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
            {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={service.title}
                fill
                priority
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
            />
            )}
            <div className="absolute inset-0 bg-primary/80" />
            <div className="relative z-10 max-w-4xl px-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline text-primary-foreground">
                {service.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/90">
                {service.description}
            </p>
            </div>
        </section>

        <div className="container py-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl font-bold">We’re getting ready to offer a range of specialist care services to support people with different needs. Soon, Symbolic Care Group will provide:</h2>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {specialistCategories.map((category) => {
                    const LucideIcon = category.icon ? icons[category.icon as keyof typeof icons] : null;
                    const slug = category.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <Card key={category.category} className="flex flex-col h-full overflow-hidden transition-all duration-300 border-2 border-transparent">
                            <CardHeader className="flex flex-col items-center text-center p-6">
                                {LucideIcon && (
                                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4 transition-transform duration-300">
                                    <LucideIcon className="h-10 w-10" />
                                </div>
                                )}
                                <CardTitle className="font-headline text-2xl">{category.category}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow text-center px-6 pb-6">
                                <p className="text-muted-foreground">
                                    {category.links[0]?.description || `Find resources and support for ${category.category.toLowerCase()}.`}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>
  );
}
