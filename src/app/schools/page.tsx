"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Star, Globe, Phone, MessageCircle, Search, ExternalLink, BookOpen, Award, Users, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SCHOOLS = [
  // ── KOTA SCHOOLS ──
  {
    id: 101, name: "Allen Career Institute School", city: "Kota", state: "Rajasthan",
    board: "CBSE", type: "Day School", rating: 4.9, rank: "#1 Kota",
    estd: "2005", fee: "\u20b955K\u201370K/yr", students: "3,000+",
    website: "https://www.allen.ac.in",
    howToApply: "Apply online via Allen website. Entrance test for Class 6-10. Forms in March-April. Documents: Previous marksheets, birth certificate, Aadhar. Integrated school+coaching program available.",
    highlights: ["Allen affiliated", "JEE/NEET focus from school", "Expert faculty", "Regular mock tests"],
    affiliation: "CBSE", facilities: ["Science Labs", "Computer Lab", "Library", "Sports Ground", "Study Hall"],
    contact: "9414197777",
  },
  {
    id: 102, name: "Resonance School", city: "Kota", state: "Rajasthan",
    board: "CBSE", type: "Day School", rating: 4.8, rank: "#2 Kota",
    estd: "2008", fee: "\u20b950K\u201365K/yr", students: "2,500+",
    website: "https://www.resonance.ac.in",
    howToApply: "Apply via Resonance website. ResoSAT entrance exam for scholarships. Class 6-10 admissions open April-May. Integrated school+coaching program available.",
    highlights: ["Resonance coaching integrated", "Merit scholarships", "Excellent board results", "IIT/NEET focused"],
    affiliation: "CBSE", facilities: ["Labs", "Library", "Computer Room", "Study Hall", "Cafeteria"],
    contact: "9356506506",
  },
  {
    id: 103, name: "Vibrant Academy School", city: "Kota", state: "Rajasthan",
    board: "CBSE", type: "Day School", rating: 4.7, rank: "#3 Kota",
    estd: "2010", fee: "\u20b945K\u201360K/yr", students: "1,800+",
    website: "https://www.vibrantacademy.com",
    howToApply: "Register online or visit Vigyan Nagar campus. Entrance test for merit scholarship. Open admissions Class 5-11. Integrated coaching available.",
    highlights: ["Vibrant integration", "Personal attention", "Good board results", "Affordable fees"],
    affiliation: "CBSE", facilities: ["Labs", "Library", "Sports", "Smart Classes"],
    contact: "9116777776",
  },
  {
    id: 104, name: "St. Paul\'s Senior Secondary School", city: "Kota", state: "Rajasthan",
    board: "CBSE", type: "Day School", rating: 4.6, rank: "#4 Kota",
    estd: "1985", fee: "\u20b930K\u201345K/yr", students: "2,000+",
    website: "https://www.stpaulskota.com",
    howToApply: "Apply at school office. Forms in January-February. Admission based on previous marks. Nursery to Class 12. Affordable quality education in Kota.",
    highlights: ["40 years experience", "Affordable fees", "Strong English medium", "Good sports"],
    affiliation: "CBSE", facilities: ["Playground", "Library", "Labs", "Computer Room"],
    contact: "9414180001",
  },
  // ── PAN INDIA ──
  {
    id: 1, name: "Delhi Public School, R.K. Puram", city: "New Delhi", state: "Delhi",
    board: "CBSE", type: "Day School", rating: 4.8, rank: "#1 Delhi",
    estd: "1959", fee: "₹1.5L–2L/yr", students: "4,500+",
    website: "https://www.dpsr kpuram.com",
    howToApply: "Apply online via DPS website. Entrance test for Gr 1-9. Nursery admission through lottery. Documents: Birth certificate, address proof, previous marksheets.",
    highlights: ["CBSE curriculum", "IIT & NEET toppers every year", "Sports & cultural facilities", "Smart classrooms"],
    affiliation: "CBSE (Affiliation No. 2700011)",
    facilities: ["Swimming Pool", "Science Labs", "Computer Lab", "Library", "Auditorium", "Sports Ground"],
    contact: "9876543210",
  },
  {
    id: 2, name: "The Doon School", city: "Dehradun", state: "Uttarakhand",
    board: "CBSE", type: "Boarding School", rating: 4.9, rank: "#1 Boarding India",
    estd: "1935", fee: "₹12L–15L/yr", students: "500",
    website: "https://www.doonschool.com",
    howToApply: "Register online by November. Entrance test (English, Maths, Reasoning) in December. Interview in January. Admission for Grade 7 & 8 only. Very competitive — 2,000+ applicants for 100 seats.",
    highlights: ["Alumni: PMs, CEOs, Nobel laureates", "Cambridge IGCSE + CBSE", "World-class boarding facilities", "125 acres campus"],
    affiliation: "CBSE + Cambridge International",
    facilities: ["Olympic Pool", "Golf Course", "Theatre", "Labs", "Horse Riding", "Music Academy"],
    contact: "9876543211",
  },
  {
    id: 3, name: "Cathedral & John Connon School", city: "Mumbai", state: "Maharashtra",
    board: "ICSE", type: "Day School", rating: 4.8, rank: "#1 Mumbai",
    estd: "1860", fee: "₹2L–3L/yr", students: "1,800+",
    website: "https://www.cathedral-school.com",
    howToApply: "Registration opens in October for Junior KG. Admission test + parent interview. For senior classes, based on merit and seat availability. Birth certificate + residence proof required.",
    highlights: ["164 years of excellence", "ICSE & ISC curriculum", "Strong alumni network", "Arts & cultural focus"],
    affiliation: "CISCE (ICSE Board)",
    facilities: ["Basketball Courts", "Music Room", "Art Studio", "Computer Lab", "Library"],
    contact: "9876543212",
  },
  {
    id: 4, name: "Frank Anthony Public School", city: "Bangalore", state: "Karnataka",
    board: "CBSE", type: "Day School", rating: 4.7, rank: "#3 Bangalore",
    estd: "1967", fee: "₹70K–90K/yr", students: "3,200+",
    website: "https://www.faps.in",
    howToApply: "Online registration January-February. LKG admission through draw of lots. Classes 1-9 through entrance test. Documents: Aadhar card, birth certificate, marksheets.",
    highlights: ["Affordable quality education", "Strong academics", "Good sports facilities", "CBSE top results"],
    affiliation: "CBSE (Affiliation No. 830024)",
    facilities: ["Playground", "Library", "Labs", "Computer Lab", "Activity Rooms"],
    contact: "9876543213",
  },
  {
    id: 5, name: "La Martiniere College", city: "Kolkata", state: "West Bengal",
    board: "ICSE", type: "Day School", rating: 4.8, rank: "#1 Kolkata",
    estd: "1836", fee: "₹80K–1L/yr", students: "2,000+",
    website: "https://www.lamartiniere.org",
    howToApply: "Admission form available from school office. Test for all classes. Historical institution — very high competition. Annual registration in November-December.",
    highlights: ["188 years old institution", "Heritage building (monument)", "ICSE top results", "Strong alumni base"],
    affiliation: "CISCE (ICSE Board)",
    facilities: ["Cricket Ground", "Basketball Court", "Chapel", "Museum", "Library"],
    contact: "9876543214",
  },
  {
    id: 6, name: "Mayo College", city: "Ajmer", state: "Rajasthan",
    board: "CBSE", type: "Boarding School", rating: 4.8, rank: "#2 Boarding India",
    estd: "1875", fee: "₹10L–12L/yr", students: "450",
    website: "https://www.mayocollege.com",
    howToApply: "Online application from June-August. Entrance test in September (English, Maths, GK). Interview in October. Admission for Gr 5 onwards. Only boys school.",
    highlights: ["Royal heritage school", "149 years of history", "IIT & NDA alumni", "250-acre campus"],
    affiliation: "CBSE",
    facilities: ["Polo Ground", "Olympic Pool", "Golf Course", "Cricket Stadium", "Shooting Range"],
    contact: "9876543215",
  },
  {
    id: 7, name: "Scindia School", city: "Gwalior", state: "Madhya Pradesh",
    board: "CBSE", type: "Boarding School", rating: 4.7, rank: "#3 Boarding India",
    estd: "1897", fee: "₹8L–10L/yr", students: "600",
    website: "https://www.scindia.edu.in",
    howToApply: "Registration opens in August. Entrance test (English, Maths, Science) in October-November. Personal interview. Only boys. Grades 5 to 12.",
    highlights: ["Historic fort campus", "Alumni: Bollywood stars, politicians", "CBSE board", "Leadership focus"],
    affiliation: "CBSE",
    facilities: ["Fort Campus", "Museum", "Pool", "Cricket", "NCC", "Music"],
    contact: "9876543216",
  },
  {
    id: 8, name: "The Shri Ram School, Aravali", city: "Gurugram", state: "Haryana",
    board: "CBSE", type: "Day School", rating: 4.7, rank: "#2 NCR Region",
    estd: "1988", fee: "₹1.8L–2.2L/yr", students: "2,800+",
    website: "https://www.tsrs.org",
    howToApply: "Online registration via school portal in November. Pre-Primary (age 3-4): Interaction with child and parents. Senior classes: Written test + interview. Merit-based.",
    highlights: ["Modern pedagogy", "Excellent JEE/NEET results", "Eco-friendly campus", "Activity-based learning"],
    affiliation: "CBSE",
    facilities: ["Swimming Pool", "Tennis Courts", "Art Gallery", "Innovation Lab", "Amphitheatre"],
    contact: "9876543217",
  },
  {
    id: 9, name: "Kendriya Vidyalaya, Lodhi Road", city: "New Delhi", state: "Delhi",
    board: "CBSE", type: "Day School", rating: 4.5, rank: "Top KV India",
    estd: "1965", fee: "₹600–1,200/yr", students: "3,000+",
    website: "https://kvsangathan.nic.in",
    howToApply: "Online registration via KVS portal (kvsonlineadmission.kvs.gov.in) in January. Class 1: Lottery system. Priorities: Central Govt employees, Ex-servicemen, others. Absolutely affordable.",
    highlights: ["Affordable Government school", "Pan-India transfers allowed", "Strong board results", "Nationwide network of 1,200+ KVs"],
    affiliation: "CBSE — KV Sangathan",
    facilities: ["Labs", "Library", "Playground", "Smart Classes", "Computer Room"],
    contact: "9876543218",
  },
  {
    id: 10, name: "Birla High School", city: "Kolkata", state: "West Bengal",
    board: "ICSE", type: "Day School", rating: 4.5, rank: "#2 Kolkata",
    estd: "1953", fee: "₹60K–80K/yr", students: "2,500+",
    website: "https://www.birlahighschool.com",
    howToApply: "Admission notice in local newspapers. Registration from school office. Written test for Classes 1-9. Class 11 based on ICSE board marks. Documents: marksheets, TC, birth certificate.",
    highlights: ["Birla Group institution", "Strong ICSE results", "Affordable fees", "Good sports program"],
    affiliation: "CISCE (ICSE Board)",
    facilities: ["Football Ground", "Basketball Court", "Library", "Labs", "Computer Room"],
    contact: "9876543219",
  },
  {
    id: 11, name: "St. Mary's School", city: "Mumbai", state: "Maharashtra",
    board: "ICSE", type: "Day School", rating: 4.6, rank: "#2 Mumbai",
    estd: "1864", fee: "₹1.2L–1.5L/yr", students: "1,600+",
    website: "https://www.stmarysschoolmumbai.com",
    howToApply: "Admission in Junior KG through draw. Sr KG and above through test. Registration in November. Christian minority institution — priority to Christian students.",
    highlights: ["160 years old school", "Strong academic tradition", "Mumbai's heritage school", "ISC board"],
    affiliation: "CISCE (ICSE/ISC)",
    facilities: ["Basketball", "Library", "Labs", "Chapel", "Music Room"],
    contact: "9876543220",
  },
  {
    id: 12, name: "Sardar Patel Vidyalaya", city: "New Delhi", state: "Delhi",
    board: "CBSE", type: "Day School", rating: 4.6, rank: "#3 Delhi",
    estd: "1958", fee: "₹40K–60K/yr", students: "3,500+",
    website: "https://www.sardarpatelvidyalaya.org",
    howToApply: "Annual registration in January. Admission through merit and lottery. Run by Sardar Patel Vidyalaya Trust. Affordable quality education in heart of Delhi.",
    highlights: ["Affordable Delhi school", "Strong CBSE board results", "Central Delhi location", "Co-curricular focus"],
    affiliation: "CBSE",
    facilities: ["Playground", "Labs", "Library", "Smart Classes", "Activity Rooms"],
    contact: "9876543221",
  },
];

const BOARDS = ["All", "CBSE", "ICSE", "CBSE + Cambridge"];
const TYPES = ["All", "Day School", "Boarding School"];
const STATES = ["All", "Delhi", "Maharashtra", "Karnataka", "West Bengal", "Uttarakhand", "Rajasthan", "Madhya Pradesh", "Haryana"];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [board, setBoard] = useState("All");
  const [type, setType] = useState("All");
  const [state, setState] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = SCHOOLS.filter(s => {
    const q = search.toLowerCase();
    return (
      (!search || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)) &&
      (board === "All" || s.board.includes(board)) &&
      (type === "All" || s.type === type) &&
      (state === "All" || s.state === state)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
            <ChevronLeft className="w-4 h-4" />Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Top Schools in India</h1>
              <p className="text-white/80 text-sm mt-0.5">CBSE · ICSE · Boarding · Day Schools — Rankings, Fees, How to Apply</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{SCHOOLS.length} Schools Listed</Badge>
            <Badge className="bg-white/20 text-white border-white/30">8 States</Badge>
            <Badge className="bg-white/20 text-white border-white/30">CBSE & ICSE</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Fees & Rankings</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search school or city..." className="pl-9" />
          </div>
          <select value={board} onChange={e => setBoard(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {BOARDS.map(b => <option key={b}>{b}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={state} onChange={e => setState(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} schools found</p>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((school, i) => (
            <motion.div key={school.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Top row */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shrink-0 text-2xl">🏫</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-bold text-lg leading-tight">{school.name}</h3>
                        <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{school.rank}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{school.city}, {school.state}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Est. {school.estd}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{school.students} students</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{school.rating}/5</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-blue-100 text-blue-700 border-0">{school.board}</Badge>
                        <Badge className="bg-emerald-100 text-emerald-700 border-0">{school.type}</Badge>
                        <Badge variant="outline" className="font-semibold text-emerald-600">{school.fee}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {school.highlights.map(h => <span key={h} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{h}</span>)}
                      </div>
                    </div>
                    {/* Right side actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      <a href={`tel:${school.contact}`}>
                        <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5">
                          <Phone className="w-3.5 h-3.5" />Call
                        </Button>
                      </a>
                      <a href={`https://wa.me/91${school.contact}?text=Hello, I want to know more about ${encodeURIComponent(school.name)}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />WhatsApp
                        </Button>
                      </a>
                      <a href={school.website} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="w-full gap-1.5">
                          <Globe className="w-3.5 h-3.5" />Website
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Expand button */}
                  <button onClick={() => setExpanded(expanded === school.id ? null : school.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium">
                    {expanded === school.id ? <><ChevronUp className="w-4 h-4" />Hide Details</> : <><ChevronDown className="w-4 h-4" />View Full Details — How to Apply, Facilities, Affiliation</>}
                  </button>

                  {/* Expanded details */}
                  {expanded === school.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/30">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-500" />How to Apply</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{school.howToApply}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-500" />Facilities</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {school.facilities.map(f => <Badge key={f} variant="outline" className="text-xs">{f}</Badge>)}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><ExternalLink className="w-4 h-4 text-purple-500" />Affiliation & Contact</h4>
                          <p className="text-xs text-muted-foreground mb-2">{school.affiliation}</p>
                          <a href={school.website} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mb-3">
                            <Globe className="w-3 h-3" />{school.website}
                          </a>
                          <div className="flex gap-2">
                            <a href={`tel:${school.contact}`}>
                              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 text-xs gap-1">
                                <Phone className="w-3 h-3" />Call Now
                              </Button>
                            </a>
                            <a href={`https://wa.me/91${school.contact}?text=Hello, I want admission info for ${encodeURIComponent(school.name)}`} target="_blank" rel="noreferrer">
                              <Button size="sm" variant="outline" className="border-green-400 text-green-600 h-8 text-xs gap-1">
                                <MessageCircle className="w-3 h-3" />WhatsApp
                              </Button>
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
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No schools found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
