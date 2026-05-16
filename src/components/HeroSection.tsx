"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, GraduationCap, Globe, BookOpen, Briefcase, Sparkles, Users, MapPin, Clock, Building2, Award, X, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Real verified Indian institutes ──────────────────────────────────────
const SEARCH_DATA = [
  // ── Kota Coaching ──
  { name: "Allen Career Institute", type: "Coaching", city: "Kota", info: "JEE/NEET — India's #1 Coaching", href: "/colleges" },
  { name: "Resonance Eduventures", type: "Coaching", city: "Kota", info: "JEE/NEET — Top Kota Coaching", href: "/colleges" },
  { name: "Vibrant Academy", type: "Coaching", city: "Kota", info: "JEE — Vigyan Nagar Kota", href: "/colleges" },
  { name: "Motion Education", type: "Coaching", city: "Kota", info: "JEE/NEET — Affordable Kota", href: "/colleges" },
  { name: "Aakash Institute", type: "Coaching", city: "Pan India", info: "NEET/JEE — 200+ centers", href: "/colleges" },
  { name: "FIITJEE", type: "Coaching", city: "Pan India", info: "JEE — Delhi HQ", href: "/colleges" },
  { name: "Narayana Institute", type: "Coaching", city: "Hyderabad", info: "JEE/NEET Coaching", href: "/colleges" },
  { name: "Career Point", type: "Coaching", city: "Kota", info: "JEE/NEET — Kota", href: "/colleges" },
  // ── Kota Schools ──
  { name: "St. Paul's Senior Secondary School", type: "School", city: "Kota", info: "CBSE — Est. 1985", href: "/schools" },
  { name: "St. Joseph's Co-ed School", type: "School", city: "Kota", info: "CBSE — Kota", href: "/schools" },
  { name: "Kendriya Vidyalaya Kota", type: "School", city: "Kota", info: "CBSE — Government School", href: "/schools" },
  { name: "Jawahar Navodaya Vidyalaya", type: "School", city: "Kota", info: "CBSE — Free Residential School", href: "/schools" },
  { name: "St. Xavier's School Kota", type: "School", city: "Kota", info: "CBSE — Kota", href: "/schools" },
  // ── IITs ──
  { name: "IIT Bombay", type: "IIT", city: "Mumbai", info: "JEE Advanced — #3 NIRF", href: "/colleges" },
  { name: "IIT Delhi", type: "IIT", city: "New Delhi", info: "JEE Advanced — #2 NIRF", href: "/colleges" },
  { name: "IIT Madras", type: "IIT", city: "Chennai", info: "JEE Advanced — #1 NIRF", href: "/colleges" },
  { name: "IIT Kanpur", type: "IIT", city: "Kanpur", info: "JEE Advanced — Top IIT", href: "/colleges" },
  { name: "IIT Kharagpur", type: "IIT", city: "Kharagpur", info: "JEE Advanced — Oldest IIT", href: "/colleges" },
  { name: "IIT Roorkee", type: "IIT", city: "Roorkee", info: "JEE Advanced — Top IIT", href: "/colleges" },
  { name: "IIT Hyderabad", type: "IIT", city: "Hyderabad", info: "JEE Advanced", href: "/colleges" },
  { name: "IIT Guwahati", type: "IIT", city: "Guwahati", info: "JEE Advanced", href: "/colleges" },
  // ── NITs ──
  { name: "NIT Trichy", type: "NIT", city: "Trichy", info: "JEE Main — #8 NIRF", href: "/colleges" },
  { name: "NIT Surathkal", type: "NIT", city: "Karnataka", info: "JEE Main — Top NIT", href: "/colleges" },
  { name: "NIT Warangal", type: "NIT", city: "Warangal", info: "JEE Main — Top NIT", href: "/colleges" },
  { name: "NIT Calicut", type: "NIT", city: "Calicut", info: "JEE Main — South India NIT", href: "/colleges" },
  { name: "MNIT Jaipur", type: "NIT", city: "Jaipur", info: "JEE Main — Rajasthan NIT", href: "/colleges" },
  // ── Medical ──
  { name: "AIIMS Delhi", type: "Medical College", city: "New Delhi", info: "NEET — #1 Medical India", href: "/colleges" },
  { name: "AIIMS Jodhpur", type: "Medical College", city: "Jodhpur", info: "NEET — Rajasthan AIIMS", href: "/colleges" },
  { name: "JIPMER Puducherry", type: "Medical College", city: "Puducherry", info: "NEET — #2 Medical", href: "/colleges" },
  { name: "Maulana Azad Medical College", type: "Medical College", city: "New Delhi", info: "NEET — Top Delhi Medical", href: "/colleges" },
  { name: "SMS Medical College", type: "Medical College", city: "Jaipur", info: "NEET — Rajasthan Govt Medical", href: "/colleges" },
  { name: "RNT Medical College", type: "Medical College", city: "Udaipur", info: "NEET — Rajasthan Medical", href: "/colleges" },
  // ── IIMs ──
  { name: "IIM Ahmedabad", type: "IIM", city: "Ahmedabad", info: "CAT 99%ile — #1 MBA India", href: "/colleges" },
  { name: "IIM Bangalore", type: "IIM", city: "Bangalore", info: "CAT 98%ile — #2 MBA India", href: "/colleges" },
  { name: "IIM Calcutta", type: "IIM", city: "Kolkata", info: "CAT 98%ile — #3 MBA India", href: "/colleges" },
  { name: "IIM Lucknow", type: "IIM", city: "Lucknow", info: "CAT 97%ile — Top IIM", href: "/colleges" },
  { name: "IIM Udaipur", type: "IIM", city: "Udaipur", info: "CAT 95%ile — Rajasthan IIM", href: "/colleges" },
  // ── Delhi Schools ──
  { name: "Delhi Public School RK Puram", type: "School", city: "New Delhi", info: "CBSE — #1 Delhi School", href: "/schools" },
  { name: "The Doon School", type: "School", city: "Dehradun", info: "CBSE — #1 Boarding India", href: "/schools" },
  { name: "Sanskriti School Delhi", type: "School", city: "New Delhi", info: "CBSE — Top Delhi School", href: "/schools" },
  { name: "Modern School Barakhamba", type: "School", city: "New Delhi", info: "CBSE — Heritage Delhi School", href: "/schools" },
  { name: "Vasant Valley School", type: "School", city: "New Delhi", info: "CBSE — Top Delhi School", href: "/schools" },
  // ── Mumbai Schools ──
  { name: "Cathedral & John Connon School", type: "School", city: "Mumbai", info: "ICSE — #1 Mumbai", href: "/schools" },
  { name: "Dhirubhai Ambani International School", type: "School", city: "Mumbai", info: "IB — Top Mumbai", href: "/schools" },
  { name: "Bombay Scottish School", type: "School", city: "Mumbai", info: "ICSE — Heritage Mumbai", href: "/schools" },
  // ── Universities ──
  { name: "University of Delhi", type: "University", city: "New Delhi", info: "CUET — #11 NIRF", href: "/universities" },
  { name: "JNU New Delhi", type: "University", city: "New Delhi", info: "CUET PG — #2 NIRF", href: "/universities" },
  { name: "BHU Varanasi", type: "University", city: "Varanasi", info: "CUET — #5 NIRF", href: "/universities" },
  { name: "Kota University", type: "University", city: "Kota", info: "State University — Rajasthan", href: "/universities" },
  { name: "University of Rajasthan", type: "University", city: "Jaipur", info: "State University — #27 NIRF", href: "/universities" },
  { name: "RTU Kota", type: "University", city: "Kota", info: "Technical University — Rajasthan", href: "/universities" },
  { name: "Mumbai University", type: "University", city: "Mumbai", info: "State University — #15 NIRF", href: "/universities" },
  { name: "Anna University", type: "University", city: "Chennai", info: "Technical University — #8 NIRF", href: "/universities" },
  { name: "Jadavpur University", type: "University", city: "Kolkata", info: "State University — #7 NIRF", href: "/universities" },
  // ── Study Abroad ──
  { name: "MIT Massachusetts", type: "Abroad", city: "USA", info: "#1 World — GRE + TOEFL", href: "/abroad" },
  { name: "Stanford University", type: "Abroad", city: "USA", info: "#5 World — GRE + TOEFL", href: "/abroad" },
  { name: "University of Oxford", type: "Abroad", city: "UK", info: "#3 World — IELTS 7.5+", href: "/abroad" },
  { name: "University of Cambridge", type: "Abroad", city: "UK", info: "#2 World — IELTS 7.5+", href: "/abroad" },
  { name: "University of Toronto", type: "Abroad", city: "Canada", info: "IELTS 6.5+ — PR friendly", href: "/abroad" },
  { name: "TU Munich", type: "Abroad", city: "Germany", info: "Nearly FREE — IELTS 6.5+", href: "/abroad" },
  // ── Jobs ──
  { name: "SSC CGL 2025", type: "Job", city: "All India", info: "Government — ₹4-10 LPA", href: "/jobs" },
  { name: "IBPS PO 2025", type: "Job", city: "All India", info: "Banking — ₹6-8 LPA", href: "/jobs" },
  { name: "RRB NTPC 2025", type: "Job", city: "All India", info: "Railway — ₹2-4 LPA", href: "/jobs" },
  { name: "TCS Software Engineer", type: "Job", city: "Bangalore", info: "IT — ₹4-8 LPA Fresher", href: "/jobs" },
];

const TYPE_ICON: Record<string, string> = {
  School: "🏫", Coaching: "📚", IIT: "⚙️", NIT: "🏗️",
  "Medical College": "🏥", IIM: "💼", University: "🏛️",
  Abroad: "✈️", Job: "💼",
};

const TYPE_COLOR: Record<string, string> = {
  School: "bg-emerald-100 text-emerald-700",
  Coaching: "bg-yellow-100 text-yellow-700",
  IIT: "bg-blue-100 text-blue-700",
  NIT: "bg-indigo-100 text-indigo-700",
  "Medical College": "bg-red-100 text-red-700",
  IIM: "bg-purple-100 text-purple-700",
  University: "bg-orange-100 text-orange-700",
  Abroad: "bg-cyan-100 text-cyan-700",
  Job: "bg-pink-100 text-pink-700",
};

const CATEGORIES = [
  { label: "Schools", icon: BookOpen, href: "/schools" },
  { label: "Colleges", icon: GraduationCap, href: "/colleges" },
  { label: "Universities", icon: Building2, href: "/universities" },
  { label: "Study Abroad", icon: Globe, href: "/abroad" },
  { label: "Jobs", icon: Briefcase, href: "/jobs" },
  { label: "Mentors", icon: Users, href: "/mentors" },
];

const STATS = [
  { icon: Users, value: "50,000+", label: "Students Guided" },
  { icon: BookOpen, value: "5,000+", label: "Institutions" },
  { icon: MapPin, value: "28", label: "Indian States" },
  { icon: Clock, value: "24/7", label: "AI Support" },
];

const COUNSELOR_PHONE = "9876543210";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof SEARCH_DATA>([]);
  const [show, setShow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    if (val.length > 1) {
      const q = val.toLowerCase();
      const found = SEARCH_DATA.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.info.toLowerCase().includes(q)
      ).slice(0, 8);
      setResults(found);
      setShow(true);
    } else {
      setResults([]);
      setShow(false);
    }
  };

  const handleSelect = (item: typeof SEARCH_DATA[0]) => {
    setShow(false);
    setQuery("");
    router.push(item.href);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const found = SEARCH_DATA.find(d =>
      d.name.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q)
    );
    setQuery("");
    setShow(false);
    router.push(found ? found.href : "/colleges");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />India&apos;s #1 Student Guidance Platform
          </Badge>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Shape Your Future<br /><span className="text-emerald-300">Start Here</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">
          Search any school, college, university or coaching institute in India — click to view full details
        </motion.p>

        {/* ── Search bar ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8 relative" ref={wrapRef}>
          <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-visible">
            <Search className="w-5 h-5 text-gray-400 ml-5 shrink-0" />
            <input
              value={query}
              onChange={e => handleInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              onFocus={() => query.length > 1 && setShow(true)}
              placeholder="Search: Allen, IIT Delhi, AIIMS, Kota University..."
              className="flex-1 border-0 outline-none text-gray-700 placeholder:text-gray-400 h-14 text-base px-4 bg-transparent"
            />
            {query && (
              <button onClick={() => { setQuery(""); setResults([]); setShow(false); }} className="mr-2 text-gray-400 hover:text-gray-600 p-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={handleSearch}
              className="m-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 h-11 rounded-xl font-medium transition-all text-sm">
              Search
            </button>
          </div>

          {/* ── Dropdown results ── */}
          <AnimatePresence>
            {show && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

                {results.length > 0 ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs text-gray-400">{results.length} results found — click to open</p>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: 320 }}>
                      {results.map((item, i) => (
                        <button key={i} onClick={() => handleSelect(item)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors text-left border-b border-gray-50 last:border-0 group">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base ${TYPE_COLOR[item.type] || "bg-gray-100"}`}>
                            {TYPE_ICON[item.type] || "🏫"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                            <div className="flex items-center gap-1.5">
                              <Badge className={`border-0 text-[10px] px-1.5 py-0 ${TYPE_COLOR[item.type]}`}>{item.type}</Badge>
                              <span className="text-xs text-gray-400 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{item.city}</span>
                              <span className="text-xs text-gray-400">· {item.info}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  // ── Not found → Call for Assistance ──
                  <div className="p-5 text-center">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      &ldquo;<span className="text-emerald-600">{query}</span>&rdquo; not found in our database
                    </p>
                    <p className="text-xs text-gray-400 mb-4">Our counselors can help you find any institute in India!</p>
                    <div className="flex gap-3 justify-center">
                      <a href={`tel:${COUNSELOR_PHONE}`}>
                        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                          <Phone className="w-4 h-4" />Call for Assistance
                        </button>
                      </a>
                      <a href={`https://wa.me/91${COUNSELOR_PHONE}?text=Hello, I am looking for information about ${encodeURIComponent(query)}`} target="_blank" rel="noreferrer">
                        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                          <MessageCircle className="w-4 h-4" />WhatsApp
                        </button>
                      </a>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Or try our AI Counselor chatbot →</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-14">
          {CATEGORIES.map(({ label, icon: Icon, href }) => (
            <button key={label} onClick={() => router.push(href)}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-full border border-white/20 transition-all hover:scale-105 text-sm font-medium">
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-5 h-5 text-white/70 mb-1" />
              <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
              <span className="text-sm text-white/70">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L48 36C96 32 192 24 288 22C384 20 480 26 576 34C672 42 768 52 864 52C960 52 1056 44 1152 36C1248 28 1344 24 1392 22L1440 20V80H0V40Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
}
