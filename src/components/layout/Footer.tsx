
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import { navLinks } from "@/lib/data";
import { Accreditations } from "@/components/home/Accreditations";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        {/* Accreditations section added to footer */}
        <Accreditations />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 ml-4">
          <div className="md:col-span-1 ml-4">
            <Logo />
            <p className="mt-4 text-sm text-secondary-foreground/80">
              A reliable and ethical GP-led care provider in Essex.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-bold tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-bold tracking-wider uppercase">Support</h3>
             <ul className="mt-4 space-y-2">
              {navLinks.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
               <li>
                  <Link
                    href="/admin/login"
                    className="text-sm transition-colors hover:text-primary"
                  >
                    Admin
                  </Link>
                </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="font-bold tracking-wider uppercase">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm">
              <p>72 Patching Hall Lane, Chelmsford CM1 4DB</p>
              <p>Email: info@symboliccaregroup.org.uk</p>
              <p>Phone: <span className="font-bold">01245922249</span></p>
              <p>Mobile: <span className="font-bold">+44 7353992009</span></p>
            </div>
          </div>
        </div>

        <div className="mt-8 ml-4 border-t border-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-secondary-foreground/80 ml-4">
            &copy; {new Date().getFullYear()} Symbolic Care. All rights reserved.
          </p>
           <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <a href="https://www.facebook.com/profile.php?id=61583065907393" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#1877F2"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.35c0 .732.593 1.325 1.325 1.325h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="https://www.instagram.com/symboliccaregroup/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><defs><radialGradient id="ig-grad" cx="0.3" cy="1.2" r="1.1"><stop offset="0" stopColor="#F58529"/><stop offset="0.4" stopColor="#DD2A7B"/><stop offset="0.9" stopColor="#8134AF"/></radialGradient></defs><path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/symbolic-care-group-uk/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
