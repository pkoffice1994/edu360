"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Star, Phone, MessageCircle, Search, Clock, CheckCircle, Users, Briefcase, GraduationCap, Award, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const MENTORS = [
  // Kota Mentors
  {
    id: 1, name: "Rahul Sharma", role: "IIT Delhi CSE — JEE AIR 234", company: "Software Engineer at Google",
    city: "Kota → Delhi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bg: "from-emerald-500 to-teal-600", rating: 4.9, sessions: 145, students: "400+ guided",
    speciality: "JEE Advanced · IIT Life · FAANG", available: "Mon, Wed, Fri", time: "7 PM – 9 PM IST",
    freeSlot: "30-min free intro call",
    tags: ["JEE Advanced", "IIT Delhi", "Kota Topper", "Google Interview", "FAANG"],
    about: "Kota mein Allen se padha, JEE Advanced AIR 234 aaya. Ab Google mein SWE hoon. 400+ Kota students ko guide kiya hai IIT mein. Specialise in JEE strategy aur tech career.",
    achievements: ["JEE Advanced AIR 234", "IIT Delhi CSE", "Google L5 Engineer", "Allen Kota Topper"],
    contact: "9876549001", whatsapp: "9876549001",
  },
  {
    id: 2, name: "Priya Agarwal", role: "AIIMS Delhi MBBS — NEET AIR 45", company: "Senior Resident AIIMS",
    city: "Kota → Delhi", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    bg: "from-red-500 to-rose-600", rating: 4.9, sessions: 120, students: "300+ guided",
    speciality: "NEET · AIIMS · Medical Career", available: "Tue, Thu, Sat", time: "6 PM – 8 PM IST",
    freeSlot: "20-min free consultation",
    tags: ["NEET Strategy", "AIIMS Delhi", "Kota NEET Topper", "Biology Tips", "PG Medical"],
    about: "Kota mein Allen se NEET padha, AIR 45 aaya. AIIMS Delhi mein MBBS aur MD kar rahi hoon. Kota se 300+ students ko NEET guide kiya.",
    achievements: ["NEET AIR 45", "AIIMS Delhi MBBS", "Allen Kota Alumni", "300+ NEET selections"],
    contact: "9876549002", whatsapp: "9876549002",
  },
  {
    id: 3, name: "Vikash Meena", role: "IIT Bombay Mechanical — AIR 512", company: "BHEL PSU Engineer",
    city: "Kota → Mumbai", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    bg: "from-blue-500 to-indigo-600", rating: 4.7, sessions: 88, students: "200+ guided",
    speciality: "JEE · IIT Bombay · PSU Jobs", available: "Weekends", time: "10 AM – 12 PM IST",
    freeSlot: "Free JEE strategy call",
    tags: ["JEE Main", "IIT Bombay", "GATE", "PSU BHEL", "Kota Alumni"],
    about: "Resonance Kota se padha, JEE AIR 512. IIT Bombay Mechanical se GATE qualify karke BHEL join kiya. Kota aur Pan India students guide karta hoon.",
    achievements: ["JEE AIR 512", "IIT Bombay", "GATE qualified", "BHEL PSU"],
    contact: "9876549003", whatsapp: "9876549003",
  },
  // Pan India Mentors
  {
    id: 4, name: "Anjali Gupta", role: "IIM Ahmedabad MBA — CAT 99.4%ile", company: "McKinsey Consultant",
    city: "Ahmedabad", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bg: "from-purple-500 to-violet-600", rating: 4.9, sessions: 95, students: "250+ guided",
    speciality: "CAT · IIM · Consulting Career", available: "Sat & Sun", time: "10 AM – 1 PM IST",
    freeSlot: "Free profile review session",
    tags: ["CAT 99%ile", "IIM Ahmedabad", "MBA SOP", "McKinsey", "Consulting"],
    about: "CAT 99.4 percentile aur IIM Ahmedabad MBA. Ab McKinsey consultant hoon. 250+ students ki IIM journey guide ki.",
    achievements: ["CAT 99.4 percentile", "IIM Ahmedabad MBA", "McKinsey Associate", "250+ IIM admissions"],
    contact: "9876549004", whatsapp: "9876549004",
  },
  {
    id: 5, name: "Manish Kumar", role: "UPSC CSE AIR 38 — IAS Officer", company: "District Collector, MP",
    city: "Bhopal", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bg: "from-orange-500 to-amber-600", rating: 4.9, sessions: 130, students: "350+ guided",
    speciality: "UPSC · IAS · Civil Services", available: "Sat & Sun", time: "5 PM – 7 PM IST",
    freeSlot: "Free UPSC strategy call",
    tags: ["UPSC Mains", "IAS Journey", "Essay Writing", "Optional Subject", "Interview Prep"],
    about: "UPSC CSE AIR 38 doosre attempt mein. District Collector hoon MP mein. 350+ UPSC aspirants guide kiye.",
    achievements: ["UPSC CSE AIR 38", "IAS Officer 2021", "2nd attempt", "350+ aspirants guided"],
    contact: "9876549005", whatsapp: "9876549005",
  },
  {
    id: 6, name: "Siddharth Nair", role: "MS MIT USA — GRE 335", company: "Tesla Engineer, California",
    city: "Mumbai → USA", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    bg: "from-cyan-500 to-blue-600", rating: 4.9, sessions: 105, students: "280+ guided",
    speciality: "Study Abroad · GRE · MS USA", available: "Weekends (IST morning)", time: "9 AM – 11 AM IST",
    freeSlot: "Free application review",
    tags: ["GRE 335", "MIT Admit", "Study USA", "SOP Writing", "Tesla/FAANG"],
    about: "GRE 335 karke MIT mein 60% scholarship pe MS kiya. Ab Tesla mein engineer hoon California mein. 280+ Indian students ko US university admit dilaya.",
    achievements: ["GRE 335/340", "MIT MS Admit (60% scholarship)", "Tesla Engineer", "280+ US admits"],
    contact: "9876549006", whatsapp: "9876549006",
  },
  {
    id: 7, name: "Deepika Rajput", role: "NLU Delhi LLB — CLAT AIR 8", company: "Supreme Court Advocate",
    city: "New Delhi", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    bg: "from-rose-500 to-pink-600", rating: 4.8, sessions: 75, students: "180+ guided",
    speciality: "CLAT · NLU · Law Career", available: "Mon–Fri", time: "8 PM – 10 PM IST",
    freeSlot: "Free CLAT guidance session",
    tags: ["CLAT AIR 8", "NLU Delhi", "Supreme Court", "Legal Career", "Moot Court"],
    about: "CLAT AIR 8 se NLU Delhi mein padhi. Ab Supreme Court mein advocate hoon. 180+ students ki CLAT aur NLU journey guide ki.",
    achievements: ["CLAT AIR 8", "NLU Delhi LLB", "Supreme Court Advocate", "National Moot Court Winner"],
    contact: "9876549007", whatsapp: "9876549007",
  },
  {
    id: 8, name: "Amit Bansal", role: "CA — ICAI 1st Attempt AIR 12", company: "Manager at Deloitte India",
    city: "New Delhi", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    bg: "from-teal-500 to-emerald-600", rating: 4.8, sessions: 80, students: "200+ guided",
    speciality: "CA · Articleship · Big4", available: "Mon, Wed, Fri", time: "9 PM – 10:30 PM IST",
    freeSlot: "Free CA roadmap session",
    tags: ["CA Foundation", "CA Intermediate", "CA Final", "Big4", "ICAI AIR"],
    about: "CA first attempt mein ICAI AIR 12. Deloitte mein Manager hoon. 200+ CA aspirants guide kiye.",
    achievements: ["CA 1st attempt", "ICAI AIR 12", "Deloitte Manager", "200+ CA selections"],
    contact: "9876549008", whatsapp: "9876549008",
  },
];

const SPECIALITIES = ["All", "JEE / IIT", "NEET / Medical", "CAT / MBA", "UPSC / IAS", "Study Abroad", "Law / CLAT", "CA / Finance"];
const CITIES_FILTER = ["All", "Kota", "Delhi", "Mumbai", "Jaipur", "Bangalore", "Hyderabad"];

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("All");
  const [cityF, setCityF] = useState("All");
  const [selected, setSelected] = useState<typeof MENTORS[0] | null>(null);

  const filtered = MENTORS.filter(m =>
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.speciality.toLowerCase().includes(search.toLowerCase())) &&
    (spec === "All" || m.speciality.toLowerCase().includes(spec.split(" ")[0].toLowerCase()) || m.tags.some(t => t.toLowerCase().includes(spec.split(" ")[0].toLowerCase()))) &&
    (cityF === "All" || m.city.toLowerCase().includes(cityF.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&h=400&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back to Home</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Expert Mentors</h1>
              <p className="text-white/80 text-sm">IITians · Doctors · IAS Officers · Kota Toppers — Book Free Sessions</p>
            </div>
          </div>
          {/* Mentor avatars preview */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex -space-x-3">
              {MENTORS.slice(0, 5).map(m => (
                <img key={m.id} src={m.img} alt={m.name}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="text-white/90 text-sm ml-2">
              <span className="font-bold">{MENTORS.length} Expert Mentors</span> · Free intro sessions available
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">Kota Toppers ⭐</Badge>
            <Badge className="bg-white/20 text-white border-white/30">IIT/AIIMS Alumni</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Free Sessions</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Call & WhatsApp</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mentor or speciality..." className="pl-9" />
          </div>
          <select value={cityF} onChange={e => setCityF(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {CITIES_FILTER.map(c => <option key={c}>{c === "Kota" ? "⭐ Kota" : c}</option>)}
          </select>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {SPECIALITIES.map(s => (
            <button key={s} onClick={() => setSpec(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${spec === s ? "bg-purple-500 text-white shadow" : "bg-muted text-muted-foreground hover:bg-purple-50"}`}>
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} mentors found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                {/* Real photo header */}
                <div className={`h-32 bg-gradient-to-r ${m.bg} relative overflow-hidden`}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-white/80 text-xs flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{m.city}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-current" />{m.rating}
                  </div>
                </div>

                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-xs font-medium text-purple-600 mb-1">{m.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{m.company}</p>

                  {/* Availability */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-2.5 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <Clock className="w-3 h-3" />{m.available}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.time}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-purple-600">
                      <CheckCircle className="w-3 h-3" />{m.freeSlot}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {m.tags.slice(0, 3).map(t => <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">{t}</Badge>)}
                  </div>

                  <div className="mt-auto space-y-2">
                    <Button onClick={() => setSelected(m)} size="sm"
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white h-8 text-xs">
                      View Profile & Book Session
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <a href={`tel:${m.contact}`}>
                        <Button size="sm" variant="outline" className="w-full h-7 text-xs gap-1 border-blue-300 text-blue-600 hover:bg-blue-50">
                          <Phone className="w-3 h-3" />Call
                        </Button>
                      </a>
                      <a href={`https://wa.me/91${m.whatsapp}?text=Hi ${m.name}, I want to book a mentoring session with you from EduGuide360.`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="w-full h-7 text-xs gap-1 border-green-400 text-green-600 hover:bg-green-50">
                          <MessageCircle className="w-3 h-3" />WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-4"
            onClick={e => e.stopPropagation()}>
            {/* Photo header */}
            <div className="relative h-40 overflow-hidden">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`} />
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-white bg-black/30 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/50">×</button>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-xl">{selected.name}</h3>
                <p className="text-white/80 text-sm">{selected.company}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-white/70">
                  <Star className="w-3 h-3 fill-white" />{selected.rating} · {selected.sessions} sessions · {selected.students}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-purple-500" />About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.about}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-1.5"><Award className="w-4 h-4 text-yellow-500" />Achievements</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selected.achievements.map(a => (
                    <div key={a} className="flex items-center gap-1.5 text-xs bg-muted rounded-lg px-2.5 py-2">
                      <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />{a}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3.5">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" />Availability</h4>
                <p className="text-sm"><span className="font-medium">Days:</span> <span className="text-muted-foreground">{selected.available}</span></p>
                <p className="text-sm"><span className="font-medium">Time:</span> <span className="text-muted-foreground">{selected.time}</span></p>
                <p className="flex items-center gap-1 text-purple-600 font-medium text-sm mt-1"><CheckCircle className="w-3.5 h-3.5" />{selected.freeSlot}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
              </div>
              <div className="flex gap-3 pt-1">
                <a href={`tel:${selected.contact}`} className="flex-1">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2"><Phone className="w-4 h-4" />Call Now</Button>
                </a>
                <a href={`https://wa.me/91${selected.whatsapp}?text=Hi ${selected.name}! I want to book a ${selected.freeSlot} from EduGuide360.`} target="_blank" rel="noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-2"><MessageCircle className="w-4 h-4" />WhatsApp</Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
