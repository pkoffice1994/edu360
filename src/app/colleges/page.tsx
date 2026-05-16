"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Star, Globe, Phone, MessageCircle, Search, GraduationCap, TrendingUp, Award, ChevronDown, ChevronUp, IndianRupee, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const COLLEGES = [
  // ── KOTA COACHING ──
  {
    id: 101, name: "Allen Career Institute", city: "Kota", state: "Rajasthan", type: "Coaching (JEE/NEET)", rank: "#1 India Coaching",
    rating: 5.0, estd: "1988", fee: "\u20b91.5L\u20132L/yr", cutoff: "Entrance Test (ALLEN TALLENTEX)",
    avgPackage: "IIT/AIIMS", highestPackage: "JEE AIR 1 multiple times", students: "1 Lakh+",
    website: "https://www.allen.ac.in",
    howToApply: "Register at allen.ac.in or visit Kota campus. TALLENTEX exam for scholarship. Courses: JEE Main+Advanced, NEET, Pre-Foundation (Class 6-10). Hostels available nearby.",
    highlights: ["JEE AIR 1 produced multiple times", "1 Lakh+ students per year", "Best NEET results", "Pan India centers"],
    courses: ["JEE Main + Advanced", "NEET UG", "Pre-Foundation (6-10)", "KVPY", "Olympiad"],
    facilities: ["Study Material", "Test Series", "Doubt Sessions", "Online Classes", "Hostel tie-ups"],
    contact: "9214233303",
  },
  {
    id: 102, name: "Resonance Eduventures", city: "Kota", state: "Rajasthan", type: "Coaching (JEE/NEET)", rank: "#2 Kota",
    rating: 4.9, estd: "2001", fee: "\u20b91.2L\u20131.8L/yr", cutoff: "ResoSAT Entrance",
    avgPackage: "IIT/NIT", highestPackage: "JEE AIR Top 10", students: "50,000+",
    website: "https://www.resonance.ac.in",
    howToApply: "Apply via resonance.ac.in. ResoSAT for scholarship. Courses for JEE, NEET, Commerce, Law. Multiple batches based on performance. Early bird discount available.",
    highlights: ["20+ years in Kota", "Strong JEE results", "Commerce & Law coaching also", "Good study material"],
    courses: ["JEE Main + Advanced", "NEET UG", "Commerce (CA/CS)", "CLAT", "KVPY"],
    facilities: ["AC Classrooms", "Library", "Test Series", "Online Portal", "Parent App"],
    contact: "9356506506",
  },
  {
    id: 103, name: "Vibrant Academy", city: "Kota", state: "Rajasthan", type: "Coaching (JEE)", rank: "#3 Kota",
    rating: 4.8, estd: "2012", fee: "\u20b91L\u20131.5L/yr", cutoff: "Open + Merit Test",
    avgPackage: "IIT/NIT", highestPackage: "JEE AIR Top 100", students: "15,000+",
    website: "https://www.vibrantacademy.com",
    howToApply: "Register at vibrantacademy.com. Merit-based scholarship available. Smaller batch size — personal attention. Located in Vigyan Nagar, Kota.",
    highlights: ["Personal attention", "Smaller batches", "Good JEE results", "Experienced faculty"],
    courses: ["JEE Main + Advanced", "NEET UG", "Foundation (8-10)"],
    facilities: ["AC Classrooms", "Study Room", "Test Series", "Doubt Counter"],
    contact: "9116777776",
  },
  {
    id: 104, name: "Motion Education (IIT-JEE)", city: "Kota", state: "Rajasthan", type: "Coaching (JEE/NEET)", rank: "Top 5 Kota",
    rating: 4.7, estd: "2007", fee: "\u20b990K\u20131.4L/yr", cutoff: "Entrance Test",
    avgPackage: "NIT/IIIT", highestPackage: "JEE AIR Top 200", students: "20,000+",
    website: "https://www.motion.ac.in",
    howToApply: "Apply at motion.ac.in. Motion STROKE scholarship exam. Affordable fees compared to Allen/Resonance. Good for students on budget.",
    highlights: ["Affordable fees", "Good NIT results", "Online + Offline", "Strong test series"],
    courses: ["JEE Main + Advanced", "NEET UG", "Foundation", "NTSE/Olympiad"],
    facilities: ["AC Classes", "Online Portal", "Test Series", "Study Material"],
    contact: "9001899588",
  },
  // ── PAN INDIA COLLEGES ──
  {
    id: 1, name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", type: "Engineering", rank: "#3 NIRF India",
    rating: 5.0, estd: "1958", fee: "₹2.5L/yr", cutoff: "JEE Advanced — Top 100 rank",
    avgPackage: "₹25 LPA", highestPackage: "₹2.3 Cr (International)", students: "10,000+",
    website: "https://www.iitb.ac.in",
    howToApply: "Clear JEE Advanced. Registration on JoSAA portal (josaa.nic.in) after results. CSE cutoff: ~100 rank. Fill choices in order of preference. Counselling rounds in June-July.",
    highlights: ["QS World Rank: 118", "Best placement in India", "Nobel laureate faculty", "150+ startups from campus"],
    courses: ["B.Tech CSE", "B.Tech EE", "B.Tech Mechanical", "Dual Degree", "M.Tech", "MBA (SJMSOM)", "PhD"],
    facilities: ["Research Labs", "Innovation Centre", "Hospital", "Stadium", "Auditorium"],
    contact: "9876541001",
  },
  {
    id: 2, name: "IIT Delhi", city: "New Delhi", state: "Delhi", type: "Engineering", rank: "#2 NIRF India",
    rating: 5.0, estd: "1961", fee: "₹2.5L/yr", cutoff: "JEE Advanced — Top 200 rank",
    avgPackage: "₹22 LPA", highestPackage: "₹1.8 Cr", students: "8,500+",
    website: "https://www.iitd.ac.in",
    howToApply: "JEE Advanced qualification required. JoSAA counselling. CSE: ~200 rank. Apply online at josaa.nic.in after June results. Documents: JEE scorecard, 12th marksheet, category certificate.",
    highlights: ["#2 NIRF Engineering", "Delhi location advantage", "Strong alumni network (DAIC)", "Industry connections"],
    courses: ["B.Tech CSE", "B.Tech ECE", "B.Tech Civil", "M.Tech", "MBA", "PhD", "B.Des"],
    facilities: ["IIT Delhi Hospital", "Olympic Pool", "Research Park", "National Science Academy"],
    contact: "9876541002",
  },
  {
    id: 3, name: "AIIMS Delhi", city: "New Delhi", state: "Delhi", type: "Medical", rank: "#1 Medical India",
    rating: 5.0, estd: "1956", fee: "₹1,500/yr", cutoff: "NEET — Top 50 rank",
    avgPackage: "₹12 LPA", highestPackage: "₹80 LPA (USA/UK)", students: "1,500+",
    website: "https://www.aiims.edu",
    howToApply: "NEET UG top 50 rank required. Counselling via MCC (mcc.nic.in). MBBS: 100 seats. Fee is almost free. Documents: NEET scorecard, 12th marksheet, income certificate for SC/ST.",
    highlights: ["Best hospital in Asia", "Govt pays all fees (₹1,500/yr only)", "Research opportunities", "PG & super-specialty options"],
    courses: ["MBBS (5.5 yrs)", "B.Sc Nursing", "B.Sc Paramedical", "MD/MS", "DM/MCh", "PhD"],
    facilities: ["2,000-bed hospital", "Research Labs", "Trauma Centre", "Burns Unit", "Library"],
    contact: "9876541003",
  },
  {
    id: 4, name: "IIM Ahmedabad", city: "Ahmedabad", state: "Gujarat", type: "Management", rank: "#1 Management India",
    rating: 5.0, estd: "1961", fee: "₹25L (2-yr)", cutoff: "CAT — 99+ percentile",
    avgPackage: "₹35 LPA", highestPackage: "₹1.5 Cr", students: "1,200+",
    website: "https://www.iima.ac.in",
    howToApply: "CAT 99+ percentile. Shortlisting based on CAT score, academics, work experience. WAT (Written Ability Test) + PI (Personal Interview) in Feb-March. Apply via pgpat.iima.ac.in.",
    highlights: ["#1 B-School Asia (FT)", "3-year average work-ex preferred", "Case study method", "IIM-A alumni run 30% of Fortune 500 India"],
    courses: ["PGP (MBA)", "PGP-FABM", "ePGP (Executive MBA)", "PGPX", "PhD"],
    facilities: ["Louis Kahn Plaza", "IMDC", "Library", "Sports Complex", "Guest House"],
    contact: "9876541004",
  },
  {
    id: 5, name: "BITS Pilani", city: "Pilani", state: "Rajasthan", type: "Engineering", rank: "#22 NIRF",
    rating: 4.8, estd: "1964", fee: "₹5L/yr", cutoff: "BITSAT — 360+ (CSE)",
    avgPackage: "₹16 LPA", highestPackage: "₹1.2 Cr", students: "14,000+",
    website: "https://www.bits-pilani.ac.in",
    howToApply: "Appear for BITSAT in May. Apply via bitsadmission.com. CSE: 380+ needed. Dual degree options available. No JEE required — own entrance exam. Pilani, Goa, Hyderabad, Dubai campuses.",
    highlights: ["Industry-oriented curriculum", "Practice School internships", "Best private engineering college", "4 campuses"],
    courses: ["B.E. CSE", "B.E. EEE", "B.Pharm", "M.Sc.", "Dual Degree (B.E.+M.Sc.)", "M.E.", "MBA"],
    facilities: ["BITS Innovation Hub", "Hospital", "Desert Sports Club", "Auditorium"],
    contact: "9876541005",
  },
  {
    id: 6, name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", type: "Engineering", rank: "#8 NIRF Engineering",
    rating: 4.7, estd: "1964", fee: "₹1.5L/yr", cutoff: "JEE Main — 97 percentile (CSE)",
    avgPackage: "₹12 LPA", highestPackage: "₹80 LPA", students: "9,000+",
    website: "https://www.nitt.edu",
    howToApply: "JEE Main score. JoSAA counselling via josaa.nic.in. Home state quota available. CSE cutoff: 97%ile. Apply within JoSAA round 1-6. SC/ST relaxation available.",
    highlights: ["Best NIT in India", "Strong placement record", "Fully residential campus", "Central Govt funding"],
    courses: ["B.Tech 8 branches", "M.Tech", "MCA", "MBA", "PhD"],
    facilities: ["Modern Labs", "Indoor Stadium", "Guest House", "Hospital", "Hostels for all"],
    contact: "9876541006",
  },
  {
    id: 7, name: "IIM Bangalore", city: "Bangalore", state: "Karnataka", type: "Management", rank: "#2 Management India",
    rating: 5.0, estd: "1973", fee: "₹23L (2-yr)", cutoff: "CAT — 98+ percentile",
    avgPackage: "₹34 LPA", highestPackage: "₹1.1 Cr", students: "1,100+",
    website: "https://www.iimb.ac.in",
    howToApply: "CAT 98+ percentile. Essay + WAT + PI rounds in Feb-March. Work experience preferred (avg 3 years). Apply at iimb.ac.in/admissions. Start profile building 1 year early.",
    highlights: ["Silicon Valley of India location", "Entrepreneurship & tech focus", "NSRCEL incubator", "IIMB alumni in every major company"],
    courses: ["PGP (MBA 2yr)", "PGPEM (3yr PT)", "EPGP (Executive)", "PhD", "Certificate Programs"],
    facilities: ["NSRCEL", "Library", "Sports Complex", "Guest House", "Cafeteria"],
    contact: "9876541007",
  },
  {
    id: 8, name: "JIPMER Puducherry", city: "Puducherry", state: "Puducherry", type: "Medical", rank: "#2 Medical India",
    rating: 4.9, estd: "1823", fee: "₹2,000/yr", cutoff: "NEET — Top 200 rank",
    avgPackage: "₹10 LPA", highestPackage: "₹50 LPA", students: "800+",
    website: "https://www.jipmer.edu.in",
    howToApply: "NEET top 200 needed. Counselling via MCC (mcc.nic.in). 50 seats MBBS. Pondicherry domicile gets 85% seats. Very low fees (Govt institution). Apply separately for JIPMER PG.",
    highlights: ["Central Govt Institute", "Oldest medical college", "200-year heritage", "Research hospital"],
    courses: ["MBBS", "B.Sc Nursing", "MD/MS", "DM/MCh", "PhD", "Paramedical courses"],
    facilities: ["1,600-bed hospital", "Research Block", "Simulation Centre", "Library"],
    contact: "9876541008",
  },
  {
    id: 9, name: "St. Stephen's College", city: "New Delhi", state: "Delhi", type: "Arts / Science", rank: "#1 Arts College India",
    rating: 4.7, estd: "1881", fee: "₹30K/yr", cutoff: "CUET 95%+ (English, History, Eco)",
    avgPackage: "₹8 LPA", highestPackage: "₹60 LPA (Civil Services)", students: "2,000+",
    website: "https://www.ststephens.edu",
    howToApply: "CUET UG score required. Christian minority college — 50% seats for Christians, 50% open. Apply via DU Admission portal (admission.uod.ac.in) + College form. Interview for most courses.",
    highlights: ["142-year old institution", "UPSC toppers every year", "100% placement assistance", "PM Modi, MJ Akbar alumni"],
    courses: ["B.A. (Hons) English/History/Eco/Philosophy", "B.Sc (Hons) Physics/Chemistry/Maths", "M.A.", "M.Sc."],
    facilities: ["Heritage Campus", "Library", "Tennis Courts", "Chapel", "Cafeteria"],
    contact: "9876541009",
  },
  {
    id: 10, name: "NLU Bangalore (NLSIU)", city: "Bangalore", state: "Karnataka", type: "Law", rank: "#1 Law College India",
    rating: 4.8, estd: "1987", fee: "₹2.5L/yr", cutoff: "CLAT — 100+ (out of 120)",
    avgPackage: "₹12 LPA", highestPackage: "₹1.2 Cr (International firms)", students: "600+",
    website: "https://www.nls.ac.in",
    howToApply: "CLAT score required. Apply via consortiumofnlus.ac.in. BA LLB (5yr) or LLB (3yr after graduation). Cutoff: CLAT 100+ score. Results in December, counselling in January.",
    highlights: ["#1 Law school India", "Top law firms recruit directly", "Moot court champion", "Research publications"],
    courses: ["BA LLB (5yr)", "LLM", "PhD in Law"],
    facilities: ["Moot Court Hall", "Law Library", "Research Centre", "Guest Faculty from Supreme Court"],
    contact: "9876541010",
  },
  {
    id: 11, name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", type: "Engineering", rank: "#1 NIRF India",
    rating: 5.0, estd: "1959", fee: "₹2.5L/yr", cutoff: "JEE Advanced — Top 300 rank",
    avgPackage: "₹21 LPA", highestPackage: "₹2.1 Cr (International)", students: "9,000+",
    website: "https://www.iitm.ac.in",
    howToApply: "JEE Advanced qualification. JoSAA counselling at josaa.nic.in. #1 NIRF ranked institution. CSE: ~300 rank. Research Park on campus for startups. Apply by July.",
    highlights: ["#1 NIRF 7 years running", "Best research output", "IIT Madras Research Park", "Strong global alumni"],
    courses: ["B.Tech (11 branches)", "Dual Degree", "M.Tech", "MBA", "M.Sc.", "PhD", "BS (4-yr)"],
    facilities: ["Research Park", "T-Hub", "Deer Park (Wildlife inside campus!)", "Stadium", "Hospitals"],
    contact: "9876541011",
  },
  {
    id: 12, name: "Lady Shri Ram College", city: "New Delhi", state: "Delhi", type: "Arts", rank: "#1 Women's College India",
    rating: 4.8, estd: "1956", fee: "₹25K/yr", cutoff: "CUET 95%+",
    avgPackage: "₹7 LPA", highestPackage: "₹45 LPA", students: "3,000+",
    website: "https://lsr.edu.in",
    howToApply: "CUET UG score. DU Admission portal (admission.uod.ac.in). Women only college. Economics, English, History very competitive. Registration: May-June.",
    highlights: ["Women's empowerment focus", "UPSC & CAT toppers", "Best DU college for humanities", "Sheila Dikshit, Barkha Dutt alumni"],
    courses: ["B.A. (Hons) Economics/English/History/Psychology", "B.Com (Hons)", "B.Sc Statistics", "M.A."],
    facilities: ["Modern Campus", "Library", "Sports", "Auditorium", "Cafeteria"],
    contact: "9876541012",
  },
];

const TYPES_LIST = ["All", "Engineering", "Medical", "Management", "Arts / Science", "Arts", "Law"];
const STATES_LIST = ["All", "Delhi", "Maharashtra", "Gujarat", "Tamil Nadu", "Karnataka", "Rajasthan", "Puducherry"];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [state, setState] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = COLLEGES.filter(c =>
    (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())) &&
    (type === "All" || c.type === type) &&
    (state === "All" || c.state === state)
  );

  const TYPE_COLOR: Record<string, string> = {
    Engineering: "bg-blue-100 text-blue-700", Medical: "bg-red-100 text-red-700",
    Management: "bg-purple-100 text-purple-700", "Arts / Science": "bg-green-100 text-green-700",
    Law: "bg-orange-100 text-orange-700", Arts: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back to Home</Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><GraduationCap className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Top Colleges in India</h1>
              <p className="text-white/80 text-sm mt-0.5">IIT · IIM · AIIMS · NIT · NLU — Rankings, Fees, Cutoffs, Placements</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{COLLEGES.length} Colleges Listed</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Verified Cutoffs</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Placement Data</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search college or city..." className="pl-9" />
          </div>
          <select value={type} onChange={e => setType(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {TYPES_LIST.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={state} onChange={e => setState(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">
            {STATES_LIST.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} colleges found</p>

        <div className="space-y-4">
          {filtered.map((col, i) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center shrink-0 text-2xl">🎓</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-bold text-lg leading-tight">{col.name}</h3>
                        <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{col.rank}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{col.city}, {col.state}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{col.students}</span>
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{col.rating}/5</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`border-0 text-xs ${TYPE_COLOR[col.type] || "bg-gray-100 text-gray-700"}`}>{col.type}</Badge>
                        <Badge variant="outline" className="text-xs font-semibold text-emerald-600">{col.fee}</Badge>
                        <Badge className="bg-red-100 text-red-700 border-0 text-xs">{col.cutoff}</Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
                        <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-2 text-center">
                          <p className="font-bold text-green-700">{col.avgPackage}</p>
                          <p className="text-muted-foreground">Avg Package</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-2 text-center">
                          <p className="font-bold text-blue-700">{col.highestPackage}</p>
                          <p className="text-muted-foreground">Highest Package</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-2 text-center">
                          <p className="font-bold text-purple-700">Est. {col.estd}</p>
                          <p className="text-muted-foreground">Established</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {col.highlights.map(h => <span key={h} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{h}</span>)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <a href={`tel:${col.contact}`}><Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-1.5"><Phone className="w-3.5 h-3.5" />Call</Button></a>
                      <a href={`https://wa.me/91${col.contact}?text=Hello, I want admission info for ${encodeURIComponent(col.name)}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</Button>
                      </a>
                      <a href={col.website} target="_blank" rel="noreferrer"><Button size="sm" variant="outline" className="w-full gap-1.5"><Globe className="w-3.5 h-3.5" />Website</Button></a>
                    </div>
                  </div>
                  <button onClick={() => setExpanded(expanded === col.id ? null : col.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium">
                    {expanded === col.id ? <><ChevronUp className="w-4 h-4" />Hide Details</> : <><ChevronDown className="w-4 h-4" />How to Apply · Courses · Facilities</>}
                  </button>
                  {expanded === col.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/30">
                      <div className="grid sm:grid-cols-3 gap-5">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" />How to Apply</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{col.howToApply}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-blue-500" />Courses Offered</h4>
                          <div className="flex flex-wrap gap-1.5">{col.courses.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-500" />Facilities</h4>
                          <div className="flex flex-wrap gap-1.5 mb-3">{col.facilities.map(f => <Badge key={f} variant="outline" className="text-xs">{f}</Badge>)}</div>
                          <a href={col.website} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline block mb-3">{col.website}</a>
                          <div className="flex gap-2">
                            <a href={`tel:${col.contact}`}><Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white h-8 text-xs gap-1"><Phone className="w-3 h-3" />Call</Button></a>
                            <a href={`https://wa.me/91${col.contact}?text=Admission enquiry for ${encodeURIComponent(col.name)}`} target="_blank" rel="noreferrer">
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
      </div>
    </div>
  );
}
