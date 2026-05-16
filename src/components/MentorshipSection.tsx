"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, MessageSquare, ArrowRight, Users, MapPin, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MENTORS = [
  { name: "Rahul Sharma", role: "IIT Delhi CSE — JEE AIR 234", company: "Google SWE", city: "Kota → Delhi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face", bg: "from-emerald-500 to-teal-600", rating: 4.9, sessions: 145, tags: ["JEE Advanced", "IIT Delhi", "Kota Topper"], available: "Mon, Wed, Fri" },
  { name: "Priya Agarwal", role: "AIIMS Delhi MBBS — NEET AIR 45", company: "Senior Resident AIIMS", city: "Kota → Delhi", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face", bg: "from-red-500 to-rose-600", rating: 4.9, sessions: 120, tags: ["NEET Strategy", "AIIMS", "Kota Topper"], available: "Tue, Thu, Sat" },
  { name: "Anjali Gupta", role: "IIM Ahmedabad MBA — CAT 99.4%ile", company: "McKinsey Consultant", city: "Ahmedabad", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face", bg: "from-purple-500 to-violet-600", rating: 4.9, sessions: 95, tags: ["CAT 99%ile", "IIM A", "Consulting"], available: "Sat & Sun" },
  { name: "Manish Kumar", role: "UPSC CSE AIR 38 — IAS Officer", company: "District Collector", city: "Bhopal", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face", bg: "from-orange-500 to-amber-600", rating: 4.9, sessions: 130, tags: ["UPSC Mains", "IAS Journey", "Civil Services"], available: "Sat & Sun" },
  { name: "Siddharth Nair", role: "MS MIT USA — GRE 335", company: "Tesla Engineer, USA", city: "Mumbai → USA", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face", bg: "from-cyan-500 to-blue-600", rating: 4.9, sessions: 105, tags: ["GRE 335", "MIT Admit", "Study USA"], available: "Weekends" },
  { name: "Deepika Rajput", role: "NLU Delhi LLB — CLAT AIR 8", company: "Supreme Court Advocate", city: "New Delhi", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face", bg: "from-rose-500 to-pink-600", rating: 4.8, sessions: 75, tags: ["CLAT AIR 8", "NLU Delhi", "Law Career"], available: "Mon–Fri" },
];

export default function MentorshipSection() {
  const router = useRouter();
  return (
    <section id="mentorship" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4">👥 Mentorship</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Learn From Those Who&apos;ve Been There</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Kota toppers, IITians, doctors, IAS officers — click any card to see full profile & book session</p>
          {/* Avatar row */}
          <div className="flex justify-center mt-4">
            <div className="flex -space-x-3">
              {MENTORS.map(m => (
                <img key={m.name} src={m.img} alt={m.name} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow" />
              ))}
            </div>
            <p className="ml-3 text-sm text-muted-foreground self-center">8+ Expert Mentors available</p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {MENTORS.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Card onClick={() => router.push("/mentors")} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="h-28 relative overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${m.bg} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white">
                    <p className="font-bold text-sm">{m.name}</p>
                    <p className="text-white/80 text-xs flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{m.city}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-current" />{m.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-purple-600 mb-0.5">{m.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{m.company}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {m.tags.map(t => <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">{t}</Badge>)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />{m.sessions} sessions</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-500" />{m.available}</span>
                  </div>
                  <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white h-8 text-xs gap-1">
                    <MessageSquare className="w-3 h-3" />View Profile & Book
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={() => router.push("/mentors")} size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-10 gap-2">
            <Users className="w-5 h-5" />View All Mentors — Kota + Pan India
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
