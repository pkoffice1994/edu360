"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Star, BookOpen, Building2, Search, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SCHOOLS = [
  // Kota Schools
  { name: "Allen Career Institute School", city: "Kota", board: "CBSE", rating: 4.9, type: "Day School", fee: "₹60K/yr", rank: "#1 Kota", emoji: "🏆", bg: "from-emerald-500 to-teal-600", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=200&fit=crop" },
  { name: "Resonance School", city: "Kota", board: "CBSE", rating: 4.8, type: "Day School", fee: "₹55K/yr", rank: "#2 Kota", emoji: "🎯", bg: "from-blue-500 to-indigo-600", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop" },
  { name: "Vibrant Academy School", city: "Kota", board: "CBSE", rating: 4.7, type: "Day School", fee: "₹50K/yr", rank: "#3 Kota", emoji: "✨", bg: "from-purple-500 to-violet-600", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=200&fit=crop" },
  // Pan India
  { name: "Delhi Public School, R.K. Puram", city: "New Delhi", board: "CBSE", rating: 4.8, type: "Day School", fee: "₹1.5L/yr", rank: "#1 Delhi", emoji: "🏫", bg: "from-orange-500 to-amber-600", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=200&fit=crop" },
  { name: "The Doon School", city: "Dehradun", board: "CBSE", rating: 4.9, type: "Boarding", fee: "₹12L/yr", rank: "#1 Boarding", emoji: "🏰", bg: "from-rose-500 to-pink-600", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop" },
  { name: "Cathedral & John Connon", city: "Mumbai", board: "ICSE", rating: 4.8, type: "Day School", fee: "₹2.5L/yr", rank: "#1 Mumbai", emoji: "⛪", bg: "from-teal-500 to-cyan-600", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop" },
];

const COLLEGES = [
  // Kota Coaching — India's Best
  { name: "Allen Career Institute", city: "Kota", type: "Coaching (JEE/NEET)", rating: 5.0, cutoff: "Entrance Test", fee: "₹1.5L–2L/yr", rank: "#1 India Coaching", emoji: "🏆", bg: "from-emerald-500 to-teal-600", pkg: "IIT/AIIMS" },
  { name: "Resonance Eduventures", city: "Kota", type: "Coaching (JEE/NEET)", rating: 4.9, cutoff: "Entrance Test", fee: "₹1.2L–1.8L/yr", rank: "#2 Kota", emoji: "🎯", bg: "from-blue-500 to-indigo-600", pkg: "IIT/NIT" },
  { name: "Vibrant Academy", city: "Kota", type: "Coaching (JEE)", rating: 4.8, cutoff: "Entrance Test", fee: "₹1L–1.5L/yr", rank: "#3 Kota", emoji: "⚡", bg: "from-purple-500 to-violet-600", pkg: "IIT/NIT" },
  { name: "Motion IIT-JEE", city: "Kota", type: "Coaching (JEE/NEET)", rating: 4.8, cutoff: "Open Admission", fee: "₹90K–1.4L/yr", rank: "Top 5 Kota", emoji: "🚀", bg: "from-cyan-500 to-blue-600", pkg: "NIT/IIIT" },
  // Pan India Colleges
  { name: "IIT Bombay", city: "Mumbai", type: "Engineering", rating: 5.0, cutoff: "JEE Advanced", fee: "₹2.5L/yr", rank: "#3 NIRF", emoji: "⚙️", bg: "from-orange-500 to-amber-600", pkg: "₹25 LPA" },
  { name: "AIIMS Delhi", city: "New Delhi", type: "Medical", rating: 5.0, cutoff: "NEET Top 50", fee: "₹1,500/yr", rank: "#1 Medical", emoji: "🏥", bg: "from-red-500 to-rose-600", pkg: "₹12 LPA" },
];

const UNIVERSITIES = [
  // Rajasthan Universities
  { name: "University of Rajasthan", city: "Jaipur", ranking: "#27 NIRF", students: "4 Lakh+", fee: "₹10K–50K/yr", emoji: "🏛️", bg: "from-orange-500 to-amber-600", colleges: "300+", img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=200&fit=crop" },
  { name: "Kota University", city: "Kota", ranking: "State University", students: "1 Lakh+", fee: "₹8K–30K/yr", emoji: "🎓", bg: "from-emerald-500 to-teal-600", colleges: "150+", img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=200&fit=crop" },
  { name: "MNIT Jaipur", city: "Jaipur", ranking: "#52 NIRF", students: "5,000+", fee: "₹1.5L/yr", emoji: "⚙️", bg: "from-blue-500 to-indigo-600", colleges: "NIT", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop" },
  // Pan India
  { name: "University of Delhi", city: "New Delhi", ranking: "#11 NIRF", students: "3 Lakh+", fee: "₹15K–1L/yr", emoji: "🏛️", bg: "from-purple-500 to-violet-600", colleges: "91", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop" },
  { name: "JNU New Delhi", city: "New Delhi", ranking: "#2 NIRF", students: "8,500", fee: "₹3K–10K/yr", emoji: "🎓", bg: "from-rose-500 to-pink-600", colleges: "10 Schools", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop" },
  { name: "Mumbai University", city: "Mumbai", ranking: "#15 NIRF", students: "7 Lakh+", fee: "₹20K–2L/yr", emoji: "🌊", bg: "from-cyan-500 to-blue-600", colleges: "800+", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=200&fit=crop" },
];

const EXAMS = [
  { name: "JEE Main", field: "Engineering (NITs, IIITs)", date: "Jan & Apr 2025", seats: "1.5 Lakh+", color: "bg-blue-500", emoji: "⚙️" },
  { name: "JEE Advanced", field: "IIT Admission", date: "May 2025", seats: "17,000", color: "bg-indigo-500", emoji: "🏆" },
  { name: "NEET UG", field: "MBBS / BDS", date: "May 2025", seats: "1 Lakh+", color: "bg-red-500", emoji: "🏥" },
  { name: "CAT", field: "MBA — IIMs", date: "Nov 2025", seats: "5,000+", color: "bg-purple-500", emoji: "💼" },
  { name: "CUET UG", field: "Central Universities", date: "May–Jun 2025", seats: "10 Lakh+", color: "bg-emerald-500", emoji: "🎓" },
  { name: "CLAT", field: "Law — NLUs", date: "Dec 2025", seats: "2,500+", color: "bg-orange-500", emoji: "⚖️" },
  { name: "GATE", field: "Engineering PG / PSU", date: "Feb 2025", seats: "M.Tech + PSU", color: "bg-cyan-500", emoji: "🔬" },
  { name: "UPSC CSE", field: "IAS / IPS / IFS", date: "Jun 2025", seats: "1,000+", color: "bg-rose-500", emoji: "🏛️" },
];

const TABS = ["Schools", "Colleges", "Universities", "Entrance Exams"];
const PAGE_MAP = ["/schools", "/colleges", "/universities", null];

export default function EducationSection() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  const CITIES = ["All", "Kota", "Jaipur", "New Delhi", "Mumbai", "Bangalore", "Chennai"];
  const match = (name: string, city: string) =>
    (!search || name.toLowerCase().includes(search.toLowerCase())) &&
    (cityFilter === "All" || city === cityFilter);

  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">🎓 Indian Education</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Schools, Colleges &amp; Universities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Kota · Jaipur · Delhi · Mumbai — Pan India top institutions with full details</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {TABS.map((t, i) => (
            <button key={t} onClick={() => { setTab(i); setSearch(""); setCityFilter("All"); }}
              className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${tab === i ? "bg-emerald-500 text-white shadow-lg" : "bg-muted text-muted-foreground hover:bg-emerald-50 hover:text-emerald-700"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Search + City filter */}
        {tab !== 3 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${TABS[tab].toLowerCase()}...`} className="pl-9 h-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CITIES.map(c => (
                <button key={c} onClick={() => setCityFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${cityFilter === c ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground hover:bg-emerald-50"}`}>
                  {c === "Kota" ? "⭐ Kota" : c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCHOOLS */}
        {tab === 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SCHOOLS.filter(s => match(s.name, s.city)).map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card onClick={() => router.push("/schools")} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  {/* Real image */}
                  <div className="h-36 relative overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 border-0 text-xs">{s.rank}</Badge>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-blue-500 text-white border-0 text-xs">{s.board}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-sm mb-1 leading-tight">{s.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />{s.city} · {s.type}
                      <span className="ml-auto flex items-center gap-0.5 text-amber-500"><Star className="w-3 h-3 fill-current" />{s.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-emerald-600">{s.fee}</span>
                    </div>
                    <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-8 text-xs">
                      View Details & Apply <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* COLLEGES */}
        {tab === 1 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COLLEGES.filter(c => match(c.name, c.city)).map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card onClick={() => router.push("/colleges")} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className={`h-24 bg-gradient-to-r ${c.bg} flex items-center justify-between px-5`}>
                    <div className="text-white">
                      <p className="font-bold text-lg">{c.emoji} {c.name}</p>
                      <p className="text-white/80 text-xs">{c.city} · {c.type}</p>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">{c.rank}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-center">
                      <div className="bg-muted rounded-lg p-2">
                        <p className="font-bold text-emerald-600">{c.pkg}</p>
                        <p className="text-muted-foreground text-[10px]">Avg Pkg</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <p className="font-bold text-blue-600">{c.fee}</p>
                        <p className="text-muted-foreground text-[10px]">Fees/yr</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <p className="font-bold text-amber-500 flex items-center justify-center gap-0.5"><Star className="w-3 h-3 fill-current" />{c.rating}</p>
                        <p className="text-muted-foreground text-[10px]">Rating</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white h-8 text-xs">
                      View Details & Apply <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* UNIVERSITIES */}
        {tab === 2 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UNIVERSITIES.filter(u => match(u.name, u.city)).map((u, i) => (
              <motion.div key={u.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card onClick={() => router.push("/universities")} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="h-36 relative overflow-hidden">
                    <img src={u.img} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-800 border-0 text-xs">{u.ranking}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-sm mb-1">{u.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" />{u.city}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      <div className="text-center bg-muted rounded-lg p-1.5">
                        <p className="text-xs font-bold text-purple-600">{u.students}</p>
                        <p className="text-[10px] text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center bg-muted rounded-lg p-1.5">
                        <p className="text-xs font-bold text-emerald-600">{u.colleges}</p>
                        <p className="text-[10px] text-muted-foreground">Colleges</p>
                      </div>
                      <div className="text-center bg-muted rounded-lg p-1.5">
                        <p className="text-[10px] font-bold text-orange-600">{u.fee}</p>
                        <p className="text-[10px] text-muted-foreground">Fees/yr</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white h-8 text-xs">
                      Explore <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* EXAMS */}
        {tab === 3 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXAMS.map((exam, i) => (
              <motion.div key={exam.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className={`${exam.color} p-4 text-white`}>
                    <div className="text-3xl mb-1">{exam.emoji}</div>
                    <h3 className="font-bold">{exam.name}</h3>
                    <p className="text-white/80 text-xs">{exam.field}</p>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">📅 {exam.date}</p>
                    <p className="text-xs font-medium text-emerald-600 mb-3">🎓 {exam.seats} seats</p>
                    <Button size="sm" onClick={() => document.getElementById("counselor")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full h-7 text-xs bg-gray-800 hover:bg-gray-900 text-white">
                      Get Prep Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {PAGE_MAP[tab] && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
            <Link href={PAGE_MAP[tab]!}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 gap-2">
                {tab === 0 && <><BookOpen className="w-4 h-4" />View All Schools — Kota + Pan India</>}
                {tab === 1 && <><GraduationCap className="w-4 h-4" />View All Colleges — Kota Coaching + IITs</>}
                {tab === 2 && <><Building2 className="w-4 h-4" />View All Universities — Rajasthan + Pan India</>}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
