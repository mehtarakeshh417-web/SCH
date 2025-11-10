import { pageData, services } from "@/lib/data";
import { ServiceCard } from "@/components/services/ServiceCard";

export default function ServicesPage() {
  return (
    <div className="container py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-headline text-4xl font-bold">{pageData.services.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{pageData.services.content}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
