"use client";
import Link from "next/link";
import { GraduationCap, Phone, Mail, MapPin, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">EduGuide<span className="text-emerald-400">360</span></span>
            </div>
            <p className="text-sm text-gray-400 mb-4">India&apos;s #1 student guidance platform. From IIT to IIM, India to Abroad — we guide every step.</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Home", "home"], ["Education", "education"], ["Study Abroad", "study-abroad"], ["AI Counselor", "counselor"], ["Jobs", "jobs"], ["Contact", "contact"]].map(([label, id]) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="text-gray-400 hover:text-emerald-400 transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
              <li><Link href="/accommodation" className="text-gray-400 hover:text-emerald-400 transition-colors">Accommodation</Link></li>
            </ul>
          </div>

          {/* Exams */}
          <div>
            <h4 className="font-semibold text-white mb-4">Entrance Exams</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["JEE Main & Advanced", "NEET UG", "CAT / MAT", "CLAT", "GATE", "UPSC CSE", "SSC CGL", "CUET"].map(e => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4 text-emerald-500" />+91 98765 43210</li>
              <li className="flex items-center gap-2 text-gray-400"><Mail className="w-4 h-4 text-emerald-500" />help@eduguide360.in</li>
              <li className="flex items-start gap-2 text-gray-400"><MapPin className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />Connaught Place, New Delhi — 110001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 EduGuide360. All rights reserved.</p>
          <p>Built for Indian Students with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
