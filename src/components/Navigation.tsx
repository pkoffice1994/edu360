"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, Home, BookOpen, Globe, Briefcase, Building, Users, Phone, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/schools", label: "Schools", icon: BookOpen },
  { href: "/colleges", label: "Colleges", icon: GraduationCap },
  { href: "/universities", label: "Universities", icon: Building },
  { href: "/abroad", label: "Study Abroad", icon: Globe },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/mentors", label: "Mentors", icon: Users },
  { href: "/accommodation", label: "Stay", icon: Building },
  { href: "/#contact", label: "Contact", icon: Phone },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    if (href === "/#contact") {
      if (pathname !== "/") { window.location.href = href; return; }
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isDark = pathname === "/" && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isDark ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900 dark:text-white"}`}>
              EduGuide<span className="text-emerald-500">360</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              href.startsWith("/#") ? (
                <button key={href} onClick={() => handleClick(href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isDark ? "text-white/90 hover:text-white hover:bg-white/10" : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                  {label}
                </button>
              ) : (
                <Link key={href} href={href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    pathname === href
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : isDark ? "text-white/90 hover:text-white hover:bg-white/10" : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}>
                  {label}
                </Link>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className={`gap-1.5 ${isDark ? "border-white/40 text-white bg-transparent hover:bg-white/10" : ""}`}>
                <LayoutDashboard className="w-3.5 h-3.5" />Dashboard
              </Button>
            </Link>
            <Button onClick={() => { if (pathname !== "/") { window.location.href = "/#contact"; return; } document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 h-9 text-sm shadow">
              Free Counseling
            </Button>
          </div>

          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${isDark ? "text-white" : "text-gray-700"}`}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              href.startsWith("/#") ? (
                <button key={href} onClick={() => handleClick(href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm font-medium">
                  <Icon className="w-4 h-4 text-emerald-500" />{label}
                </button>
              ) : (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${pathname === href ? "bg-emerald-50 text-emerald-700" : "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-600"}`}>
                  <Icon className="w-4 h-4 text-emerald-500" />{label}
                </Link>
              )
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium">
              <LayoutDashboard className="w-4 h-4 text-blue-500" />Admin Dashboard
            </Link>
            <div className="pt-2 pb-1">
              <Button onClick={() => { setOpen(false); if (pathname !== "/") { window.location.href = "/#contact"; return; } document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Free Counseling
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
