"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, MapPin, IndianRupee, Clock, ArrowRight, Code, Landmark, Stethoscope, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURED_JOBS = [
  { title: "Software Engineer", company: "TCS", location: "Bangalore", salary: "₹4–8 LPA", type: "IT / Software", deadline: "30 Jun 2025", icon: Code, color: "from-blue-500 to-indigo-600", urgent: true },
  { title: "SSC CGL 2025", company: "Staff Selection Commission", location: "All India", salary: "₹4–10 LPA", type: "Government", deadline: "15 Jul 2025", icon: Landmark, color: "from-orange-500 to-amber-600", urgent: true },
  { title: "IBPS PO 2025", company: "Banking Personnel Institute", location: "All India", salary: "₹6–8 LPA", type: "Banking", deadline: "20 Aug 2025", icon: Landmark, color: "from-green-500 to-emerald-600", urgent: false },
  { title: "AIIMS Junior Resident", company: "AIIMS Delhi", location: "New Delhi", salary: "₹95,000/mo", type: "Medical", deadline: "10 Jul 2025", icon: Stethoscope, color: "from-red-500 to-rose-600", urgent: false },
  { title: "Full Stack Developer", company: "Infosys", location: "Hyderabad / Pune", salary: "₹5–12 LPA", type: "IT / Software", deadline: "Rolling", icon: Code, color: "from-purple-500 to-violet-600", urgent: false },
  { title: "RRB NTPC 2025", company: "Railway Recruitment Board", location: "All India", salary: "₹2–4 LPA", type: "Government", deadline: "Coming Soon", icon: GraduationCap, color: "from-cyan-500 to-blue-600", urgent: true },
];

const STATS = [
  { value: "35,000+", label: "RRB Vacancies", color: "text-blue-600" },
  { value: "20,000+", label: "SSC Posts", color: "text-orange-600" },
  { value: "8,000+", label: "Banking Jobs", color: "text-emerald-600" },
  { value: "5,000+", label: "IT Openings", color: "text-purple-600" },
];

export default function JobsSection() {
  const router = useRouter();
  return (
    <section id="jobs" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">💼 Jobs & Careers</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Top Job Opportunities in India</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Government, IT, Medical, Banking — click any job card to view full details</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STATS.map(s => (
            <div key={s.label} className="bg-muted rounded-2xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Featured job cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FEATURED_JOBS.map((job, i) => (
            <motion.div key={job.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Card onClick={() => router.push("/jobs")}
                className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group relative">
                {job.urgent && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10">URGENT</div>}
                <div className={`h-20 bg-gradient-to-r ${job.color} flex items-center gap-4 px-5`}>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <job.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <p className="font-bold text-sm leading-tight">{job.title}</p>
                    <p className="text-white/80 text-xs">{job.company}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />{job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <IndianRupee className="w-3 h-3" />{job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <Clock className="w-3 h-3" />Deadline: {job.deadline}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs flex-1 justify-center py-1">{job.type}</Badge>
                    <Button size="sm" className="flex-1 h-7 text-xs bg-blue-500 hover:bg-blue-600 text-white gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button onClick={() => router.push("/jobs")} size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-10 gap-2">
            <Briefcase className="w-5 h-5" />View All Jobs — 100+ Openings
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
