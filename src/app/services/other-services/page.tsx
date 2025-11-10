
import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Users,
    BedDouble,
    HeartHandshake,
    Brain,
    Stethoscope,
    Briefcase,
    GraduationCap,
    HandHelping,
    ShoppingCart,
    Sofa,
    Building,
    Moon,
    Sparkles,
    CheckCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const otherServicesList: { name: string; icon: LucideIcon }[] = [
    { name: 'Support to Access the Community for Different Activities', icon: Users },
    { name: '24-hour support', icon: HandHelping },
    { name: 'Night Sleep', icon: BedDouble },
    { name: 'Live in care', icon: HeartHandshake },
    { name: 'Mental Health Support', icon: Stethoscope },
    { name: 'Respite Care', icon: Briefcase },
    { name: 'Dementia Support', icon: Brain },
    { name: 'Learning Disability', icon: GraduationCap },
    { name: 'End of Life care', icon: HeartHandshake },
    { name: 'Personal care', icon: HandHelping },
    { name: 'PA Support', icon: Users },
    { name: 'Overnight Care', icon: Moon },
    { name: 'Shopping', icon: ShoppingCart },
    { name: 'Companionship', icon: Sofa },
    { name: 'Sit in service', icon: Sofa },
    { name: 'Hospital Escort', icon: Building },
    { name: 'Night Awake', icon: Sparkles },
    { name: 'Cleaning', icon: CheckCircle },
];


export default function OtherServicesPage() {
    const service = services.find(s => s.slug === 'other-services');

    if (!service) return null;

    const heroImage = PlaceHolderImages.find(p => p.id === 'service-other-services');

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
                    We offer a wide variety of services to meet your unique needs.
                </p>
                </div>
            </section>
            <div className="container py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-headline text-3xl font-bold">Explore Our Additional Support</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore the types of support we can provide below.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherServicesList.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.name} className="flex items-center p-4 bg-card hover:bg-muted transition-colors">
                                <div className="p-3 bg-primary/10 rounded-lg mr-4">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-base font-semibold text-card-foreground">{item.name}</CardTitle>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center mt-5 mb-5">
                <a href="/contact">
                    <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-primary/90 transition-colors">
                        Enquire now
                    </button>
                </a>
            </div>
        </div>
    );
}
