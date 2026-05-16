"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Star, Globe, Phone, MessageCircle, Search, Building2, Users, BookOpen, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const UNIVERSITIES = [
  // ── RAJASTHAN UNIVERSITIES ──
  {
    id: 101, name: "University of Rajasthan", city: "Jaipur", state: "Rajasthan", rank: "#27 NIRF",
    rating: 4.3, estd: "1947", students: "4 Lakh+", colleges: "300+ Colleges", fee: "\u20b910K\u201350K/yr",
    website: "https://www.uniraj.ac.in", type: "State University",
    howToApply: "Apply at uniraj.ac.in. Direct admission for BA/BSc/BCom. RPET for engineering. Merit-based admissions. Registration in May-June. Pink City Jaipur campus.",
    highlights: ["Rajasthan\'s top university", "300+ affiliated colleges", "Pink City Jaipur", "Strong in Arts & Law"],
    topColleges: ["University College of Law", "SMS Medical College", "Rajasthan College", "Commerce College"],
    courses: ["BA/BSc/BCom", "LLB", "MBA", "MA", "BEd", "PhD"],
    contact: "9414180100",
  },
  {
    id: 102, name: "Kota University (UOK)", city: "Kota", state: "Rajasthan", rank: "State University",
    rating: 4.2, estd: "2003", students: "1 Lakh+", colleges: "150+ Colleges", fee: "\u20b98K\u201330K/yr",
    website: "https://www.uok.ac.in", type: "State University",
    howToApply: "Apply at uok.ac.in. Direct admissions for BA/BSc/BCom. Engineering via REAP counselling. Registration in June-July. Kota city advantage for coaching students.",
    highlights: ["Kota city university", "Affordable education", "Near coaching institutes", "150+ colleges"],
    topColleges: ["Government College Kota", "Engineering College Kota", "Commerce College Kota"],
    courses: ["BA/BSc/BCom", "BCA", "BBA", "MA", "MSc", "LLB", "PhD"],
    contact: "9414001234",
  },
  {
    id: 103, name: "MNIT Jaipur", city: "Jaipur", state: "Rajasthan", rank: "#52 NIRF",
    rating: 4.5, estd: "1963", students: "5,000+", colleges: "NIT Institute", fee: "\u20b91.5L/yr",
    website: "https://www.mnit.ac.in", type: "Central University (NIT)",
    howToApply: "JEE Main score required. JoSAA counselling at josaa.nic.in. CSE cutoff: ~93 percentile. Good placement record. Rajasthan state quota seats available.",
    highlights: ["Top NIT in Rajasthan", "Central Govt funding", "Good placements", "IIT-like facilities"],
    topColleges: ["CSE Department", "ECE Department", "Mechanical", "Civil Engineering"],
    courses: ["BTech (8 branches)", "MTech", "MBA", "PhD"],
    contact: "9414000001",
  },
  {
    id: 104, name: "Rajasthan Technical University (RTU)", city: "Kota", state: "Rajasthan", rank: "State Technical University",
    rating: 4.1, estd: "2006", students: "2 Lakh+", colleges: "400+ Engineering Colleges", fee: "\u20b940K\u20131L/yr",
    website: "https://www.rtu.ac.in", type: "State University",
    howToApply: "REAP counselling (reapraj.nic.in) for engineering admissions. JEE Main score used for merit. 400+ affiliated engineering colleges across Rajasthan. Registration in July-August.",
    highlights: ["All Rajasthan engineering colleges", "REAP counselling", "Kota headquarters", "Affordable engineering"],
    topColleges: ["Government Engineering College Kota", "MBM Jodhpur", "JECRC Jaipur", "Poornima Jaipur"],
    courses: ["BTech (all branches)", "MTech", "MBA", "MCA"],
    contact: "9414002345",
  },
  // ── PAN INDIA UNIVERSITIES ──
  {
    id: 1, name: "University of Delhi", city: "New Delhi", state: "Delhi", rank: "#11 NIRF",
    rating: 4.7, estd: "1922", students: "3 Lakh+", colleges: "91 Colleges", fee: "₹15K–1L/yr",
    website: "https://www.du.ac.in", type: "Central University",
    howToApply: "Apply via CUET UG (for UG) or admission.uod.ac.in. CUET score mandatory since 2022. Registration: May-June. Merit list released in July. Confirm admission by paying fees online. Documents: CUET scorecard, 12th marksheet, Aadhar.",
    highlights: ["100+ years of excellence", "87 departments", "Oxford of the East", "Alumni: PM, CJI, Nobel laureates"],
    topColleges: ["St. Stephen's", "Lady Shri Ram", "Hindu College", "Miranda House", "Ramjas College"],
    courses: ["B.A. (Hons)", "B.Sc (Hons)", "B.Com (Hons)", "B.Tech", "M.A.", "M.Sc.", "MBA", "PhD"],
    contact: "9876545001",
  },
  {
    id: 2, name: "Jawaharlal Nehru University (JNU)", city: "New Delhi", state: "Delhi", rank: "#2 NIRF University",
    rating: 4.8, estd: "1969", students: "8,500", colleges: "Residential (10 Schools)", fee: "₹3K–10K/yr",
    website: "https://www.jnu.ac.in", type: "Central University",
    howToApply: "CUET PG for PG admissions. PhD: written test + interview. Application on jnuonline.jnu.ac.in. Extremely affordable fees. Very competitive — 50,000 apply for 2,000 seats.",
    highlights: ["#2 NIRF University India", "Research powerhouse", "Most affordable elite education", "Fully residential campus"],
    topColleges: ["School of International Studies", "School of Social Sciences", "SLL&CS", "School of Life Sciences"],
    courses: ["M.A. (all humanities)", "M.Sc.", "MCA", "MBA", "PhD (all disciplines)"],
    contact: "9876545002",
  },
  {
    id: 3, name: "Mumbai University", city: "Mumbai", state: "Maharashtra", rank: "#15 NIRF",
    rating: 4.5, estd: "1857", students: "7 Lakh+", colleges: "800+ Colleges", fee: "₹20K–2L/yr",
    website: "https://mu.ac.in", type: "State University",
    howToApply: "Apply via individual affiliated colleges. Mumbai CET / MHT-CET for engineering. CUET for central quota. Contact preferred college directly. Admission: June-August.",
    highlights: ["167 years old", "Largest university in world by enrollment", "Strong industry connections", "Mumbai advantage"],
    topColleges: ["St. Xavier's College", "VJTI", "Elphinstone College", "HR College", "Ruia College"],
    courses: ["B.A., B.Sc., B.Com", "B.Tech (via MHT-CET)", "LLB", "M.A.", "MBA", "PhD"],
    contact: "9876545003",
  },
  {
    id: 4, name: "Anna University", city: "Chennai", state: "Tamil Nadu", rank: "#8 NIRF Engineering",
    rating: 4.6, estd: "1978", students: "2 Lakh+", colleges: "550+ Colleges", fee: "₹40K–1L/yr",
    website: "https://www.annauniv.edu", type: "State University",
    howToApply: "TNEA counselling (tneaonline.org) for B.E./B.Tech. JEE Main for 7.5% quota. Apply online: June-July. Merit based on 12th marks. Cut-off varies by college and branch.",
    highlights: ["Best engineering university TN", "NAAC A++ accredited", "Strong industry MoUs", "Anna University main campus: 180 acres"],
    topColleges: ["CEG Chennai", "MIT Chennai", "SAP Chennai", "ACT Chennai"],
    courses: ["B.E./B.Tech (32 branches)", "M.E./M.Tech", "MBA", "MCA", "PhD"],
    contact: "9876545004",
  },
  {
    id: 5, name: "Banaras Hindu University (BHU)", city: "Varanasi", state: "Uttar Pradesh", rank: "#5 NIRF University",
    rating: 4.6, estd: "1916", students: "30,000+", colleges: "140+ Units", fee: "₹10K–60K/yr",
    website: "https://www.bhu.ac.in", type: "Central University",
    howToApply: "CUET UG/PG for admissions. BHU entrance for some courses. Apply via bhuonline.in. One of the largest campuses in Asia (1,300 acres). Strong in Sciences and Humanities.",
    highlights: ["5th NIRF ranking", "Largest residential university Asia", "1,300-acre campus (a city!)", "Asia's largest university campus"],
    topColleges: ["IIT BHU (Engineering)", "IMS BHU (Medical)", "Faculty of Arts", "Faculty of Science"],
    courses: ["B.A., B.Sc., B.Com", "B.Tech (via JEE — IIT BHU)", "MBBS (via NEET)", "M.A.", "PhD"],
    contact: "9876545005",
  },
  {
    id: 6, name: "Jadavpur University", city: "Kolkata", state: "West Bengal", rank: "#7 NIRF University",
    rating: 4.7, estd: "1955", students: "8,500+", colleges: "Faculty-based", fee: "₹5K–30K/yr",
    website: "https://jadavpuruniversity.in", type: "State University",
    howToApply: "B.E./B.Tech via WB JEE (wbjeeb.nic.in). Arts & Science via JU entrance test. Very affordable — one of India's cheapest top universities. Apply June-July.",
    highlights: ["#7 NIRF nationally", "West Bengal's best university", "Strong in Engineering & Arts", "Extremely affordable"],
    topColleges: ["Faculty of Engineering", "Faculty of Arts", "Faculty of Science", "Faculty of Law"],
    courses: ["B.E./B.Tech (12 branches)", "B.A./B.Sc.", "M.E./M.Tech", "M.A./M.Sc.", "PhD"],
    contact: "9876545006",
  },
  {
    id: 7, name: "Pune University (SPPU)", city: "Pune", state: "Maharashtra", rank: "#16 NIRF",
    rating: 4.5, estd: "1949", students: "6 Lakh+", colleges: "800+ Colleges", fee: "₹15K–1L/yr",
    website: "https://www.unipune.ac.in", type: "State University",
    howToApply: "MHT-CET for engineering. Direct admission for arts/commerce. Contact affiliated college. Pune has 800+ colleges across disciplines. Applications: May-July.",
    highlights: ["Oxford of the East (Pune)", "Best IT city university", "Global company placements", "Vibrant student life"],
    topColleges: ["COEP Pune", "Fergusson College", "Symbiosis (autonomous)", "MIT Pune"],
    courses: ["B.E./B.Tech", "B.A./B.Sc./B.Com", "MBA", "M.Tech", "LLB", "PhD"],
    contact: "9876545007",
  },
  {
    id: 8, name: "Aligarh Muslim University (AMU)", city: "Aligarh", state: "Uttar Pradesh", rank: "#9 NIRF University",
    rating: 4.5, estd: "1875", students: "30,000+", colleges: "Residential", fee: "₹10K–50K/yr",
    website: "https://www.amu.ac.in", type: "Central University",
    howToApply: "AMU entrance test for most courses. NEET for MBBS. JEE for B.Tech (Zakir Husain College of Engg). Apply at amu.ac.in. Minority institution — 50% seats for Muslims.",
    highlights: ["149-year old institution", "Minority central university", "Strong in Medicine & Law", "550-acre campus"],
    topColleges: ["Zakir Husain College of Engg", "JNMC (Medical)", "Faculty of Law", "Faculty of Arts"],
    courses: ["MBBS", "B.Tech", "B.A./B.Sc./B.Com", "LLB", "MBA", "PhD"],
    contact: "9876545008",
  },
  {
    id: 9, name: "Osmania University", city: "Hyderabad", state: "Telangana", rank: "#18 NIRF",
    rating: 4.4, estd: "1918", students: "2 Lakh+", colleges: "400+ Colleges", fee: "₹15K–80K/yr",
    website: "https://www.osmania.ac.in", type: "State University",
    howToApply: "EAMCET for engineering. OU entrance for PG. Apply via official website June-July. Good for Telugu-medium students. Hyderabad IT city benefit.",
    highlights: ["105 years of history", "Heritage campus architecture", "Hyderabad IT advantage", "Strong alumni network"],
    topColleges: ["UCE Hyderabad", "University College of Arts", "Nizam's College", "UCOHS"],
    courses: ["B.E./B.Tech", "B.A./B.Sc./B.Com", "MBBS (affiliated)", "M.A.", "MBA", "PhD"],
    contact: "9876545009",
  },
  {
    id: 10, name: "Calcutta University", city: "Kolkata", state: "West Bengal", rank: "#12 NIRF",
    rating: 4.4, estd: "1857", students: "5 Lakh+", colleges: "150+ Colleges", fee: "₹5K–50K/yr",
    website: "https://www.caluniv.ac.in", type: "State University",
    howToApply: "Admission via colleges. Merit-based for arts/science/commerce. WBJEE for engineering colleges. Apply through college portals. 167-year old institution.",
    highlights: ["Oldest university East Asia", "Nobel laureates alumni (Amartya Sen)", "Strong humanities", "167 years of excellence"],
    topColleges: ["Presidency University", "Scottish Church College", "Bethune College", "St. Xavier's Kolkata"],
    courses: ["B.A./B.Sc./B.Com", "B.Tech (affiliated)", "LLB", "M.A./M.Sc.", "PhD"],
    contact: "9876545010",
  },
  {
    id: 11, name: "Hyderabad University (UoH)", city: "Hyderabad", state: "Telangana", rank: "#6 NIRF University",
    rating: 4.6, estd: "1974", students: "5,000+", colleges: "Residential", fee: "₹5K–20K/yr",
    website: "https://uohyd.ac.in", type: "Central University",
    howToApply: "CUET PG for most PG programs. PhD via UoH entrance + interview. Very affordable. Apply at uohyd.ac.in. Fully residential campus (2,300 acres).",
    highlights: ["#6 NIRF nationally", "Affordable elite education", "Beautiful 2,300-acre campus", "Research focus — Dalit scholar Rohith Vemula's university"],
    topColleges: ["School of Chemistry", "School of Physics", "School of Life Sciences", "School of Humanities"],
    courses: ["M.A./M.Sc. (Science, Humanities)", "M.Tech", "MCA", "MBA", "PhD"],
    contact: "9876545011",
  },
  {
    id: 12, name: "Rajasthan University", city: "Jaipur", state: "Rajasthan", rank: "#27 NIRF",
    rating: 4.3, estd: "1947", students: "4 Lakh+", colleges: "300+ Colleges", fee: "₹10K–50K/yr",
    website: "https://www.uniraj.ac.in", type: "State University",
    howToApply: "Direct admission for most UG programs. REET/RPSC for teaching courses. Apply at uniraj.ac.in. Jaipur Pink City advantage. Strong in Arts and Commerce.",
    highlights: ["Rajasthan's top university", "Pink City Jaipur campus", "Strong in Law & Arts", "Affordable education"],
    topColleges: ["University College of Law", "SMS Medical College (affiliated)", "Faculty of Science"],
    courses: ["B.A./B.Sc./B.Com", "LLB", "MBA", "M.A.", "B.Ed.", "PhD"],
    contact: "9876545012",
  },
];

export default function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [stateF, setStateF] = useState("All");
  const [typeF, setTypeF] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const states = ["All", "Delhi", "Maharashtra", "Tamil Nadu", "Uttar Pradesh", "West Bengal", "Telangana", "Rajasthan"];
  const types = ["All", "Central University", "State University"];

  const filtered = UNIVERSITIES.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase())) &&
    (stateF === "All" || u.state === stateF) &&
    (typeF === "All" || u.type === typeF)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back to Home</Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><Building2 className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Top Universities in India</h1>
              <p className="text-white/80 text-sm mt-0.5">Central & State Universities — Rankings, Courses, How to Apply</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{UNIVERSITIES.length} Universities</Badge>
            <Badge className="bg-white/20 text-white border-white/30">NIRF Rankings</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Central & State</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search university or city..." className="pl-9" />
          </div>
          <select value={stateF} onChange={e => setStateF(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {states.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={typeF} onChange={e => setTypeF(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} universities found</p>

        <div className="space-y-4">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-5 flex flex-col sm:flex-row gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shrink-0 text-2xl">🏛️</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-bold text-lg">{u.name}</h3>
                        <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{u.rank}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{u.city}, {u.state}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{u.students}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{u.colleges}</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{u.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">{u.type}</Badge>
                        <Badge variant="outline" className="font-semibold text-emerald-600 text-xs">{u.fee}</Badge>
                        <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">Est. {u.estd}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {u.highlights.map(h => <span key={h} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{h}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <a href={`tel:${u.contact}`}><Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white gap-1.5"><Phone className="w-3.5 h-3.5" />Call</Button></a>
                      <a href={`https://wa.me/91${u.contact}?text=Hello, I want info about ${encodeURIComponent(u.name)}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</Button>
                      </a>
                      <a href={u.website} target="_blank" rel="noreferrer"><Button size="sm" variant="outline" className="w-full gap-1.5"><Globe className="w-3.5 h-3.5" />Website</Button></a>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(expanded === u.id ? null : u.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium">
                    {expanded === u.id ? <><ChevronUp className="w-4 h-4" />Hide</> : <><ChevronDown className="w-4 h-4" />How to Apply · Top Colleges · Courses</>}
                  </button>
                  {expanded === u.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/30">
                      <div className="grid sm:grid-cols-3 gap-5">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-purple-500" />How to Apply</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{u.howToApply}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-500" />Top Colleges</h4>
                          <div className="flex flex-wrap gap-1.5">{u.topColleges.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-emerald-500" />Courses</h4>
                          <div className="flex flex-wrap gap-1.5 mb-3">{u.courses.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>
                          <div className="flex gap-2">
                            <a href={`tel:${u.contact}`}><Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white h-8 text-xs gap-1"><Phone className="w-3 h-3" />Call</Button></a>
                            <a href={`https://wa.me/91${u.contact}`} target="_blank" rel="noreferrer"><Button size="sm" variant="outline" className="border-green-400 text-green-600 h-8 text-xs gap-1"><MessageCircle className="w-3 h-3" />WhatsApp</Button></a>
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
      </div>
    </div>
  );
}
