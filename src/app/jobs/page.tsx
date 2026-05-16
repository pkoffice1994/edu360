"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Search, MapPin, IndianRupee, Clock, Phone, MessageCircle, Briefcase, Code, Landmark, Stethoscope, GraduationCap, Building, TrendingUp, Scale, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ALL_JOBS = [
  // IT/Software
  { id: 1, title: "Software Engineer", company: "TCS", location: "Bangalore / Mumbai / Chennai", salary: "₹4–8 LPA", type: "IT / Software", experience: "Fresher", deadline: "30 Jun 2025", urgent: true, icon: Code, color: "bg-blue-500", contact: "9876541101", description: "Join TCS as a Software Engineer. Work on cutting-edge technology projects. Training provided for freshers. Technologies: Java, Python, .NET, Cloud.", eligibility: "B.Tech/B.E. in any stream. 60% throughout academics. No active backlogs.", howToApply: "Apply via TCS NextStep portal (nextstep.tcs.com). Register → Apply for National Qualifier Test (NQT) → Interview.", },
  { id: 2, title: "Full Stack Developer", company: "Infosys", location: "Hyderabad / Pune / Bangalore", salary: "₹5–12 LPA", type: "IT / Software", experience: "0–2 years", deadline: "Rolling", urgent: false, icon: Code, color: "bg-indigo-500", contact: "9876541102", description: "Infosys hiring Full Stack Developers for enterprise projects. React + Node.js + AWS stack.", eligibility: "B.Tech CS/IT preferred. Knowledge of React, Node.js, SQL. CGPA 7.0+.", howToApply: "Apply via Infosys careers page (infosys.com/careers). InfyTQ platform shortlists candidates. Written test + 2 technical interviews.", },
  { id: 3, title: "Data Analyst", company: "Wipro", location: "Bangalore / Mumbai", salary: "₹4–9 LPA", type: "IT / Software", experience: "0–2 years", deadline: "Rolling", urgent: false, icon: TrendingUp, color: "bg-purple-500", contact: "9876541103", description: "Wipro hiring Data Analysts. Work with Excel, SQL, Python, Tableau. Business intelligence projects.", eligibility: "Any graduation with statistics/maths background. Python and SQL knowledge.", howToApply: "Apply via Wipro careers (wipro.com/careers). NLTH test → Technical interview → HR round.", },
  { id: 4, title: "Cloud Engineer (AWS)", company: "HCL Technologies", location: "Noida / Hyderabad", salary: "₹5–10 LPA", type: "IT / Software", experience: "0–2 years", deadline: "15 Jul 2025", urgent: false, icon: Code, color: "bg-cyan-500", contact: "9876541104", description: "HCL hiring AWS Cloud Engineers. Design and manage cloud infrastructure.", eligibility: "B.Tech preferred. AWS certification is a plus. Knowledge of Linux, networking.", howToApply: "Apply at hcltech.com/careers. Technical test + 2 rounds of interview.", },
  // Government
  { id: 5, title: "SSC CGL 2025", company: "Staff Selection Commission", location: "All India", salary: "₹25,000–1,00,000/mo", type: "Government", experience: "Any Graduate", deadline: "15 Jul 2025", urgent: true, icon: Landmark, color: "bg-orange-500", contact: "9876541105", description: "SSC CGL for Group B & C posts: Inspector, Assistant Section Officer, Auditor, Tax Assistant. Central Government job with job security and perks.", eligibility: "Bachelor's degree in any subject. Age 18–32 years. Indian citizen.", howToApply: "Apply via ssc.nic.in. Online application → Tier 1 (Computer Based) → Tier 2 → Document Verification.", },
  { id: 6, title: "UPSC NDA 2025", company: "Union Public Service Commission", location: "All India (Training: Pune)", salary: "₹15,600–39,100/mo + allowances", type: "Government", experience: "10+2 (Science PCM)", deadline: "25 Jun 2025", urgent: true, icon: Landmark, color: "bg-green-500", contact: "9876541106", description: "National Defence Academy entry for Indian Army, Navy, Air Force. Prestigious military career.", eligibility: "10+2 with PCM. Age 16.5–19.5 years. Male/Female. Physical fitness required.", howToApply: "Apply at upsc.gov.in. Written test (Maths + GK) → SSB Interview (5 days) → Medical.", },
  { id: 7, title: "RRB NTPC 2025", company: "Railway Recruitment Board", location: "All India (Zone-wise)", salary: "₹19,900–35,400/mo", type: "Government", experience: "Graduate / 12th pass", deadline: "Coming Soon", urgent: true, icon: Landmark, color: "bg-red-500", contact: "9876541107", description: "RRB NTPC for Junior Clerk, Station Master, Commercial Apprentice, Junior Account Assistant. Indian Railways — permanent government job.", eligibility: "Graduate or 12th pass depending on post. Age 18–33 years.", howToApply: "Apply via indianrailways.gov.in or RRB zonal sites. CBT 1 → CBT 2 → Skill Test → Document Verification.", },
  { id: 8, title: "PGT Computer Science", company: "Navodaya Vidyalaya Samiti", location: "All India", salary: "₹44,900–1,42,400/mo", type: "Government", experience: "B.Tech + B.Ed", deadline: "5 Aug 2025", urgent: false, icon: GraduationCap, color: "bg-teal-500", contact: "9876541108", description: "Teach Computer Science at Jawahar Navodaya Vidyalayas across India. Prestigious teaching position with 7th pay commission salary.", eligibility: "B.Tech CS/IT + B.Ed. Age limit: 40 years.", howToApply: "Apply at navodaya.gov.in. Written exam + Demo class + Interview.", },
  // Banking
  { id: 9, title: "IBPS PO 2025", company: "Institute of Banking Personnel", location: "All India (19 Nationalised Banks)", salary: "₹23,700–42,020/mo", type: "Banking", experience: "Any Graduate", deadline: "20 Aug 2025", urgent: false, icon: Landmark, color: "bg-yellow-500", contact: "9876541109", description: "Probationary Officer in nationalized banks: BOB, Canara, PNB, Union Bank etc. Excellent career growth and job security.", eligibility: "Graduation in any subject. Age 20–30 years. Computer knowledge mandatory.", howToApply: "Apply via ibps.in. Prelims (Reasoning + Quantitative + English) → Mains → Interview.", },
  { id: 10, title: "SBI PO 2025", company: "State Bank of India", location: "All India", salary: "₹27,620–50,030/mo", type: "Banking", experience: "Any Graduate", deadline: "Sep 2025", urgent: false, icon: Landmark, color: "bg-blue-600", contact: "9876541110", description: "SBI Probationary Officer — India's largest bank. Excellent perks, housing allowance, medical benefits.", eligibility: "Any graduation. Age 21–30 years.", howToApply: "Apply at sbi.co.in/careers. Prelims → Mains → Group Exercise + Interview.", },
  // Medical
  { id: 11, title: "Junior Resident Doctor", company: "AIIMS Delhi", location: "New Delhi", salary: "₹95,000/mo", type: "Medical", experience: "MBBS", deadline: "10 Jul 2025", urgent: false, icon: Stethoscope, color: "bg-red-600", contact: "9876541111", description: "Junior Resident position at AIIMS Delhi — India's best hospital. Excellent training and research opportunities.", eligibility: "MBBS from recognized institution. Internship completed. AIIMS preference for own graduates.", howToApply: "Apply at aiims.edu. Written test in clinical subjects + Interview. Selection based on merit.", },
  { id: 12, title: "Staff Nurse (ESIC)", company: "ESIC Hospitals", location: "Multiple Cities across India", salary: "₹35,400–1,12,400/mo", type: "Medical", experience: "GNM / B.Sc Nursing", deadline: "Jul 2025", urgent: false, icon: Stethoscope, color: "bg-pink-500", contact: "9876541112", description: "Staff Nurse positions at ESIC hospitals across India. Government job with 7th Pay Commission benefits.", eligibility: "GNM or B.Sc Nursing. Registered Nurse & Midwife. Age 18–30 years.", howToApply: "Apply via esic.nic.in. Written exam + Skill test.", },
  // Engineering/PSU
  { id: 13, title: "Civil Engineer (NHPC)", company: "NHPC Limited", location: "Multiple States (Hydro Projects)", salary: "₹40,000–1,60,000/mo", type: "Engineering", experience: "B.Tech Civil", deadline: "30 Jun 2025", urgent: false, icon: Building, color: "bg-orange-600", contact: "9876541113", description: "NHPC Limited PSU hiring Civil Engineers for hydropower projects. Excellent PSU salary + GATE score valid.", eligibility: "B.Tech Civil Engineering with 60%+. GATE score preferred.", howToApply: "Apply via nhpcindia.com. GATE score shortlisting → Technical Interview → Medical.", },
  { id: 14, title: "Graduate Engineer Trainee", company: "ONGC", location: "Multiple Locations", salary: "₹60,000–80,000/mo", type: "Engineering", experience: "B.Tech (All branches)", deadline: "Aug 2025", urgent: false, icon: Building, color: "bg-amber-500", contact: "9876541114", description: "ONGC GET for Mechanical, Civil, Electrical, Chemical, Petroleum Engineering. Top PSU in India.", eligibility: "B.Tech with 60%+. GATE score required.", howToApply: "Apply at ongcindia.com. GATE score → Written test → Personal Interview → Medical.", },
  // Law
  { id: 15, title: "Junior Court Advocate", company: "Delhi District Courts", location: "New Delhi", salary: "₹3–6 LPA", type: "Law", experience: "LLB / BA LLB", deadline: "Rolling", urgent: false, icon: Scale, color: "bg-gray-600", contact: "9876541115", description: "Practice as junior advocate in Delhi courts. Excellent learning opportunity under senior advocates.", eligibility: "LLB / BA LLB from recognized college. Enrolled with Bar Council of India.", howToApply: "Enroll with Bar Council of India (barcouncilofindia.org). Find a senior advocate for junior position. No written exam — networking based.", },
];

const CATEGORIES = ["All", "IT / Software", "Government", "Banking", "Medical", "Engineering", "Law"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = ALL_JOBS.filter(j =>
    (cat === "All" || j.type === cat) &&
    (!search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase()))
  );

  const CAT_COLOR: Record<string, string> = {
    "IT / Software": "bg-blue-100 text-blue-700", Government: "bg-orange-100 text-orange-700",
    Banking: "bg-yellow-100 text-yellow-700", Medical: "bg-red-100 text-red-700",
    Engineering: "bg-indigo-100 text-indigo-700", Law: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back to Home</Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><Briefcase className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Jobs & Career Opportunities</h1>
              <p className="text-white/80 text-sm mt-0.5">Government · IT · Banking · Medical · Engineering — Salaries, Eligibility, How to Apply</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{ALL_JOBS.length} Jobs Listed</Badge>
            <Badge className="bg-white/20 text-white border-white/30">6 Categories</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Call & WhatsApp Support</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search job title, company or city..." className="pl-9" />
          </div>
          <Button variant="outline" onClick={() => setShowFilter(!showFilter)} className="gap-2">
            <Filter className="w-4 h-4" />Filter
          </Button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${cat === c ? "bg-blue-500 text-white shadow" : "bg-muted text-muted-foreground hover:bg-blue-50 hover:text-blue-700"}`}>
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Job cards */}
        <div className="space-y-4">
          {filtered.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Main row */}
                  <div className="p-5 flex flex-col sm:flex-row gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${job.color} flex items-center justify-center shrink-0`}>
                      <job.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                        {job.urgent && <Badge className="bg-red-100 text-red-600 border-0 text-xs">🔥 Urgent</Badge>}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-medium"><IndianRupee className="w-3.5 h-3.5" />{job.salary}</span>
                        <span className="flex items-center gap-1 text-red-500"><Clock className="w-3.5 h-3.5" />Deadline: {job.deadline}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`border-0 text-xs ${CAT_COLOR[job.type] || "bg-gray-100"}`}>{job.type}</Badge>
                        <Badge variant="outline" className="text-xs">Eligibility: {job.experience}</Badge>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <a href={`tel:${job.contact}`}>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white gap-1.5 w-full">
                          <Phone className="w-3.5 h-3.5" />Call
                        </Button>
                      </a>
                      <a href={`https://wa.me/91${job.contact}?text=Hello, I want details about ${encodeURIComponent(job.title)} at ${encodeURIComponent(job.company)}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="border-green-400 text-green-600 hover:bg-green-50 gap-1.5 w-full">
                          <MessageCircle className="w-3.5 h-3.5" />WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Expand */}
                  <button onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium">
                    {expanded === job.id ? <><ChevronUp className="w-4 h-4" />Hide Details</> : <><ChevronDown className="w-4 h-4" />View Description · Eligibility · How to Apply</>}
                  </button>

                  {expanded === job.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/30">
                      <div className="grid sm:grid-cols-3 gap-5">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">📋 Job Description</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{job.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">✅ Eligibility</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{job.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">📝 How to Apply</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">{job.howToApply}</p>
                          <div className="flex gap-2">
                            <a href={`tel:${job.contact}`}>
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-8 text-xs gap-1"><Phone className="w-3 h-3" />Call</Button>
                            </a>
                            <a href={`https://wa.me/91${job.contact}?text=Job enquiry: ${encodeURIComponent(job.title)}`} target="_blank" rel="noreferrer">
                              <Button size="sm" variant="outline" className="border-green-400 text-green-600 h-8 text-xs gap-1"><MessageCircle className="w-3 h-3" />WhatsApp</Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No jobs found. Try clearing your search or changing the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
