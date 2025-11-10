
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ChevronsUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

const heroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
const introImage = PlaceHolderImages.find(p => p.id === 'about-intro');
const drManpreetImage = PlaceHolderImages.find(p => p.id === 'dr-manpreet');
const mrsMeetuImage = PlaceHolderImages.find(p => p.id === 'mrs-meetu');

const ourServices = [
    "Supported Living Services – tailored for individuals who value their independence but need structured, compassionate support to thrive.",
    "Domiciliary (Home) Care Services – for those who prefer the comfort of care delivered at home, with personalised plans that promote autonomy, safety, and well-being."
];

const ourMission = [
    "Safe, Effective, and Personalised",
    "Delivered by skilled, trained, and compassionate staff",
    "Backed by clinical oversight, ongoing supervision, and strong governance"
];

const whyChooseUs = [
    "Regulated and CQC-compliant",
    "Clinical governance under a qualified GP",
    "Continuous staff training and development",
    "Focus on well-being, independence, and choice",
    "Transparent, responsive, and inclusive care model"
];

const drManpreetQualifications = [
    "General Practitioner",
    "MBBS, MRCGP, PgDip (Dermatology), MD (Anaesthesia)",
    "Facilitator Trainer tier 2 - Oliver McGowan",
    "Diploma in Leadership for health and social care and children and young people's services",
    "Diploma (Advanced) in Challenging Behaviour"
];

const mrsMeetuQualifications = [
    "Facilitator Trainer tier 2 - Oliver McGowan",
    "Diploma in Leadership for health and social care and children and young people's services",
    "Diploma (Advanced) in Challenging Behaviour"
];


export default function AboutPage() {
  const [isDrOpen, setIsDrOpen] = useState(false);
  const [isMrsOpen, setIsMrsOpen] = useState(false);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="A compassionate team"
            fill
            priority
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline text-primary-foreground">
            About Symbolic Care
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90">
            Compassion, Professionalism, and a Deep Respect for Dignity and Independence.
          </p>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    {introImage && (
                        <Image
                            src={introImage.imageUrl}
                            alt="A team driven by compassion"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg object-cover w-full h-auto"
                            data-ai-hint={introImage.imageHint}
                        />
                    )}
                </div>
                <div className="prose lg:prose-lg max-w-none">
                    <h2 className="font-headline text-3xl font-bold">Our Foundation</h2>
                    <p className="text-muted-foreground">
                        At Symbolic Care Group Ltd, we are more than just a care provider — we are a team driven by compassion, professionalism, and a deep respect for the dignity and independence of every individual we support.
                    </p>
                </div>
            </section>
            
            <section className="text-center">
                <h2 className="font-headline text-3xl font-bold">Our Leadership</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Collapsible asChild open={isDrOpen} onOpenChange={setIsDrOpen}>
                        <Card className="text-left flex flex-col">
                            <CardHeader>
                                {drManpreetImage && (
                                    <Image
                                        src={drManpreetImage.imageUrl}
                                        alt="Dr. Manpreet Singh"
                                        width={120}
                                        height={120}
                                        className="rounded-full shadow-lg mx-auto mb-4 border-4 border-primary"
                                        data-ai-hint={drManpreetImage.imageHint}
                                    />
                                )}
                                <CardTitle className="text-center font-headline text-2xl">Dr. Manpreet Singh</CardTitle>
                                <p className="text-center text-muted-foreground font-semibold">Nominated Individual (CQC)</p>
                            </CardHeader>
                            <CardContent className="prose max-w-none text-muted-foreground flex-grow">
                                <h3 className="font-headline text-xl font-bold">Qualifications</h3>
                                <ul className="text-sm">
                                    {drManpreetQualifications.map((q, i) => <li key={i}>{q}</li>)}
                                </ul>
                                <CollapsibleContent className="mt-4 prose-p:mt-2">
                                   <h3 className="font-headline text-xl font-bold">Leadership Rooted in Healthcare</h3>
                                   <p>Our organisation is proudly led by Dr. Manpreet Singh, a practicing General Practitioner (GP) and our Nominated Individual under the Care Quality Commission (CQC). Dr. Singh brings clinical insight, safeguarding knowledge, and a proactive, person-centred approach to service governance — ensuring all care is safe, effective, and evidence-based.</p>
                                </CollapsibleContent>
                            </CardContent>
                             <div className="p-6 pt-0 mt-auto">
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="w-full">
                                        {isDrOpen ? 'Read Less' : 'Read More'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </Card>
                    </Collapsible>
                    <Collapsible asChild open={isMrsOpen} onOpenChange={setIsMrsOpen}>
                         <Card className="text-left flex flex-col">
                            <CardHeader>
                                {mrsMeetuImage && (
                                    <Image
                                        src={mrsMeetuImage.imageUrl}
                                        alt="Mrs. Meetu Madaan"
                                        width={120}
                                        height={120}
                                        className="rounded-full shadow-lg mx-auto mb-4 border-4 border-primary"
                                        data-ai-hint={mrsMeetuImage.imageHint}
                                    />
                                )}
                                <CardTitle className="text-center font-headline text-2xl">Mrs. Meetu Madaan</CardTitle>
                                 <p className="text-center text-muted-foreground font-semibold">Registered Manager</p>
                            </CardHeader>
                            <CardContent className="prose max-w-none text-muted-foreground flex-grow">
                               <h3 className="font-headline text-xl font-bold">Qualifications</h3>
                                <ul className="text-sm">
                                    {mrsMeetuQualifications.map((q, i) => <li key={i}>{q}</li>)}
                                </ul>
                                <CollapsibleContent className="mt-4 prose-p:mt-2">
                                   <h3 className="font-headline text-xl font-bold">Experienced & Empowering Management</h3>
                                   <p>Our Registered Manager, Mrs. Meetu Madaan, is a seasoned leader with a background in healthcare training and business development. Her experience in delivering regulated training across health and social care sectors ensures our team is well-equipped, highly trained, and continually improving. Her passion for quality care and empowerment lies at the heart of every decision we make.</p>
                                </CollapsibleContent>
                            </CardContent>
                             <div className="p-6 pt-0 mt-auto">
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" className="w-full">
                                        {isMrsOpen ? 'Read Less' : 'Read More'}
                                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </Card>
                    </Collapsible>
                </div>
            </section>

             <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <h3 className="font-headline text-xl font-bold mb-4">Our Services</h3>
                        <ul className="space-y-2">
                           {ourServices.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                         <p className="mt-4 text-sm text-muted-foreground">We specialise in supporting people with a wide range of needs, including learning disabilities, mental health conditions, autism, older adult care, and physical disabilities.</p>
                    </div>
                     <div className="bg-card p-6 rounded-lg shadow-sm">
                        <h3 className="font-headline text-xl font-bold mb-4">Our Mission</h3>
                        <ul className="space-y-2">
                           {ourMission.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="bg-card p-6 rounded-lg shadow-sm">
                        <h3 className="font-headline text-xl font-bold mb-4">Why Choose Us?</h3>
                        <ul className="space-y-2">
                           {whyChooseUs.map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

             <section>
                <h2 className="font-headline text-3xl font-bold text-center">Our Location</h2>
                <p className="text-muted-foreground text-center mt-4 mb-8">Visit us at our office in Essex.</p>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border">
                    <Link href="https://www.google.com/maps/search/?api=1&query=51.75339,0.46237" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="https://picsum.photos/seed/map/1600/900"
                            alt="Map of Essex office"
                            width={1600}
                            height={900}
                            className="w-full h-full object-cover cursor-pointer"
                            data-ai-hint="map essex"
                        />
                    </Link>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
}
