
import { ContactForm } from './ContactForm';
import { Mail, Phone, MapPin, AlertTriangle, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supportResources } from '@/lib/data';
import Link from 'next/link';

export default function ContactPage() {
  const emergencyContacts = supportResources.find(r => r.category === 'Useful Emergency / Urgent Contacts');

  return (
    <div className="bg-background">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're here to help. Reach out to us with any questions or to schedule a consultation.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold font-headline">Get in Touch Directly</h2>
                    <p className="mt-2 text-muted-foreground">
                        Find our contact details below. We look forward to hearing from you.
                    </p>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">72 Patching Hall Lane, Chelmsford CM1 4DB</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email Us</h3>
                        <p className="text-muted-foreground">info@symboliccaregroup.org.uk</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Call Us (Landline)</h3>
                        <p className="font-bold text-primary">01245922249</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex-shrink-0">
                        <Smartphone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Mobile / WhatsApp</h3>
                        <p className="font-bold text-primary">+44 7353992009</p>
                    </div>
                </div>
            </div>
          <div className="bg-card p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold font-headline mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {emergencyContacts && (
          <div className="mt-20">
            <Card className="overflow-hidden bg-primary/10 border-primary">
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-headline text-primary">
                      <AlertTriangle className="h-7 w-7" />
                      {emergencyContacts.category}
                  </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                  <ul className="divide-y divide-primary/20 grid grid-cols-1 md:grid-cols-3">
                      {emergencyContacts.links.map(link => (
                          <li key={link.name} className="flex-grow">
                              <Link 
                                  href={link.url}
                                  target={link.url.startsWith('tel:') ? '_blank' : undefined}
                                  className="block p-6 hover:bg-primary/20 transition-colors h-full text-center"
                              >
                                  <p className="font-bold text-xl text-blue-900">{link.name}</p>
                                  <p className="text-blue-900/90 mt-1">{link.description}</p>
                              </Link>
                          </li>
                      ))}
                  </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
