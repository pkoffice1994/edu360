"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Globe, Phone, MessageCircle, Search, DollarSign, Award, Clock, GraduationCap, TrendingUp, ChevronDown, ChevronUp, MapPin, Star, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const UNIVERSITIES = [
  // USA
  {
    id: 1, name: "Massachusetts Institute of Technology (MIT)", country: "USA 🇺🇸", city: "Cambridge, Massachusetts",
    rank: "#1 QS World 2025", rating: 5.0, tuition: "$57,986/yr", living: "$22,000/yr", total: "$80,000/yr",
    acceptance: "3.9%", intake: "September", exam: "GRE 330+ · TOEFL 100+ · IELTS 7.0+",
    scholarship: "MIT Fellowship (full funding for PhD), Need-based aid up to $80,000/yr",
    opportunities: "Apple, Google, SpaceX hire directly. Average MIT grad salary: $120,000/yr USA. Strong startup ecosystem (2,000+ MIT startups).",
    website: "https://www.mit.edu", howToApply: "Apply via MIT online portal by Jan 1. SOP (2 pages), 3 LORs, transcripts, GRE score, resume. For UG: SAT/ACT + essays. Extremely competitive.",
    topCourses: ["CS & AI", "Electrical Engineering", "Mechanical Engineering", "Physics", "Economics", "MBA (Sloan)"],
    contact: "9876548001",
  },
  {
    id: 2, name: "Stanford University", country: "USA 🇺🇸", city: "Stanford, California",
    rank: "#5 QS World 2025", rating: 5.0, tuition: "$56,169/yr", living: "$20,000/yr", total: "$76,000/yr",
    acceptance: "3.7%", intake: "September", exam: "GRE 328+ · TOEFL 100+",
    scholarship: "Knight-Hennessy Scholars (full funding), Need-based financial aid, Fellowships",
    opportunities: "Silicon Valley location. Google, Apple, Tesla HQ nearby. Average salary: $130,000/yr. Best for Entrepreneurship & VC.",
    website: "https://www.stanford.edu", howToApply: "Apply via Stanford portal by Dec 1 (Early) or Jan 5 (Regular). SOP, 3 LORs, GRE/GMAT, transcripts. For MBA (GSB): GMAT 740+ preferred.",
    topCourses: ["Computer Science", "MBA (GSB)", "Medicine", "Law", "Engineering", "Business Analytics"],
    contact: "9876548002",
  },
  {
    id: 3, name: "Harvard University", country: "USA 🇺🇸", city: "Cambridge, Massachusetts",
    rank: "#4 QS World 2025", rating: 5.0, tuition: "$54,768/yr", living: "$22,000/yr", total: "$77,000/yr",
    acceptance: "3.4%", intake: "September", exam: "GRE/GMAT · TOEFL 100+ · IELTS 7.5+",
    scholarship: "Harvard Financial Aid (up to full tuition for low income), Fellowships, Fulbright",
    opportunities: "Law, Medicine, Business powerhouse. Alumni: 8 US Presidents, 160 Nobel laureates. Average grad salary: $115,000/yr.",
    website: "https://www.harvard.edu", howToApply: "Online application by Jan 1. Strong SOP, excellent LORs, research experience preferred. For MBA (HBS): GMAT 730+ and 3+ years work experience.",
    topCourses: ["Law (JD)", "MBA (HBS)", "Medicine (HMS)", "Public Policy", "Economics", "Computer Science"],
    contact: "9876548003",
  },
  {
    id: 4, name: "University of California, Berkeley", country: "USA 🇺🇸", city: "Berkeley, California",
    rank: "#10 QS World 2025", rating: 4.9, tuition: "$31,026/yr (Int'l)", living: "$20,000/yr", total: "$51,000/yr",
    acceptance: "11%", intake: "August", exam: "GRE 318+ · TOEFL 90+",
    scholarship: "FLAS Fellowship, Block Grant, Research Assistantship (RA), Teaching Assistantship (TA — covers tuition)",
    opportunities: "Silicon Valley proximity. Google, Apple, Meta offices nearby. Strong CS & Engineering. Avg salary: $105,000/yr.",
    website: "https://www.berkeley.edu", howToApply: "Apply via UC Application (universityofcalifornia.edu) by Nov 30 for UG. Graduate applications by Dec-Jan. Public university — more affordable than private Ivies.",
    topCourses: ["Computer Science", "Electrical Engineering", "MBA (Haas)", "Law (Boalt)", "Data Science"],
    contact: "9876548004",
  },
  // UK
  {
    id: 5, name: "University of Oxford", country: "UK 🇬🇧", city: "Oxford, England",
    rank: "#3 QS World 2025", rating: 5.0, tuition: "£28,000–39,000/yr", living: "£14,000/yr", total: "£52,000/yr",
    acceptance: "16%", intake: "October", exam: "IELTS 7.5+ · TOEFL 110+",
    scholarship: "Chevening Scholarship (fully funded), Rhodes Scholarship, Clarendon Fund",
    opportunities: "Highest graduate salary in UK. Alumni: 30 PMs, 50+ Nobel laureates. Strong Law, PPE, Medicine. UK work visa: 2 years post-study.",
    website: "https://www.ox.ac.uk", howToApply: "Apply via UCAS (ucas.com) for UG by Oct 15. Graduate via Graduate Admissions portal by Nov-Jan. Personal statement, LORs, transcripts. Interview for most courses.",
    topCourses: ["PPE (Politics, Philosophy, Economics)", "Law", "Medicine", "Computer Science", "MBA (Said)"],
    contact: "9876548005",
  },
  {
    id: 6, name: "University of Cambridge", country: "UK 🇬🇧", city: "Cambridge, England",
    rank: "#2 QS World 2025", rating: 5.0, tuition: "£24,000–35,000/yr", living: "£12,000/yr", total: "£47,000/yr",
    acceptance: "18%", intake: "October", exam: "IELTS 7.5+ · A-levels or equivalent",
    scholarship: "Cambridge International Scholarship, Gates Cambridge (full funding), Commonwealth",
    opportunities: "Nobel laureates (121): Rutherford, Newton, Darwin studied here. Cambridge Biomedical Campus. Strong in Natural Sciences, Engineering, Law.",
    website: "https://www.cam.ac.uk", howToApply: "Apply via UCAS by Oct 15 for UG. Each college has its own character — choose carefully. GCSEs/A-levels or Indian board equivalent. Interview required.",
    topCourses: ["Natural Sciences", "Engineering", "Computer Science", "Law", "Economics", "MBA (Judge)"],
    contact: "9876548006",
  },
  {
    id: 7, name: "Imperial College London", country: "UK 🇬🇧", city: "London, England",
    rank: "#8 QS World 2025", rating: 4.9, tuition: "£30,000–40,000/yr", living: "£18,000/yr", total: "£58,000/yr",
    acceptance: "14%", intake: "October", exam: "IELTS 7.0+ · A-levels or equivalent",
    scholarship: "Imperial College Scholarship, Schroder Scholarship, President's PhD Scholarship",
    opportunities: "London location — financial hub. Top for STEM. NHS hospitals for medicine. Avg salary: £50,000/yr. Strong industry links with BP, AstraZeneca, Goldman Sachs.",
    website: "https://www.imperial.ac.uk", howToApply: "UCAS application by Jan 25. SOP, transcripts, LORs. Predominantly STEM — Engineering, Medicine, Business (Imperial College Business School). Very industry-focused.",
    topCourses: ["Medicine", "Electrical Engineering", "Computing", "Chemical Engineering", "MBA", "Data Science"],
    contact: "9876548007",
  },
  // Canada
  {
    id: 8, name: "University of Toronto", country: "Canada 🇨🇦", city: "Toronto, Ontario",
    rank: "#25 QS World 2025", rating: 4.8, tuition: "CAD 45,000/yr", living: "CAD 18,000/yr", total: "CAD 63,000/yr",
    acceptance: "43%", intake: "September & January", exam: "IELTS 6.5+ · TOEFL 100+",
    scholarship: "Lester B. Pearson Scholarship (full tuition), University of Toronto Scholars, Vanier CGS",
    opportunities: "PR pathway after study. Canadian Express Entry. Toronto tech hub — Shopify, Manulife HQ. Avg salary: CAD 70,000/yr. Easy to stay back in Canada.",
    website: "https://www.utoronto.ca", howToApply: "Apply via OUAC (ontariouniversitiesinfo.ca) by Jan 15. SOP, LORs, transcripts, English test scores. Relatively more accessible than US Ivies. PR friendly country.",
    topCourses: ["Computer Science", "Engineering", "MBA (Rotman)", "Medicine", "Law", "Data Science"],
    contact: "9876548008",
  },
  {
    id: 9, name: "University of British Columbia", country: "Canada 🇨🇦", city: "Vancouver, BC",
    rank: "#38 QS World 2025", rating: 4.7, tuition: "CAD 38,000/yr", living: "CAD 16,000/yr", total: "CAD 54,000/yr",
    acceptance: "45%", intake: "September & January", exam: "IELTS 6.5+ · TOEFL 90+",
    scholarship: "International Major Entrance Scholarship, UBC Graduate Fellowship, Killam Fellowship",
    opportunities: "Beautiful Vancouver campus. Strong in Forestry, Environmental Science, CS. PR pathway. Avg salary: CAD 65,000/yr. Amazon, Microsoft have Vancouver offices.",
    website: "https://www.ubc.ca", howToApply: "Apply via UBC portal by Jan 15. SOP, English test, LORs, transcripts. Forest Science, Medicine, Engineering top programs.",
    topCourses: ["Computer Science", "Engineering", "Medicine", "MBA (Sauder)", "Environmental Science"],
    contact: "9876548009",
  },
  // Australia
  {
    id: 10, name: "University of Melbourne", country: "Australia 🇦🇺", city: "Melbourne, Victoria",
    rank: "#33 QS World 2025", rating: 4.8, tuition: "AUD 45,000/yr", living: "AUD 20,000/yr", total: "AUD 65,000/yr",
    acceptance: "70%", intake: "February & July", exam: "IELTS 6.5+ · TOEFL 79+",
    scholarship: "Melbourne International Scholarship, Australia Awards, Graduate Research Scholarship",
    opportunities: "2-4 year Graduate visa post-study. Melbourne best livable city. Strong in Medical Research, Law, Engineering. Avg salary: AUD 75,000/yr.",
    website: "https://www.unimelb.edu.au", howToApply: "Apply via university portal directly. February intake (main) or July intake. IELTS mandatory. SOP + LORs for PG. Fairly straightforward process vs US/UK.",
    topCourses: ["Medicine", "Law", "Computer Science", "Engineering", "MBA", "Architecture"],
    contact: "9876548010",
  },
  // Germany
  {
    id: 11, name: "Technical University of Munich (TUM)", country: "Germany 🇩🇪", city: "Munich, Bavaria",
    rank: "#37 QS World 2025", rating: 4.9, tuition: "€0–500/semester", living: "€900/mo", total: "€12,000/yr",
    acceptance: "8%", intake: "October & April", exam: "IELTS 6.5 OR German B2/C1 · GRE optional",
    scholarship: "DAAD Scholarship (full funding), Deutschlandstipendium (€300/mo), TUM Family Fund",
    opportunities: "BMW, Siemens, Allianz HQ in Munich. Free/near-free education. Work permit easy. Average engineer salary: €55,000/yr. Blue Card for non-EU after graduation.",
    website: "https://www.tum.de", howToApply: "Apply via TUM portal (tum.de/en/studies/apply). Many programs in English. Motivation letter, transcripts, CV, language certificate. No tuition fees! Only semester contribution ~€150.",
    topCourses: ["Computer Science (English)", "Mechanical Engineering", "Electrical Engineering", "Data Science (English)", "MBA (TUM School)"],
    contact: "9876548011",
  },
  {
    id: 12, name: "Ludwig Maximilian University (LMU)", country: "Germany 🇩🇪", city: "Munich, Bavaria",
    rank: "#58 QS World 2025", rating: 4.8, tuition: "€0–500/semester", living: "€900/mo", total: "€11,500/yr",
    acceptance: "15%", intake: "October & April", exam: "German C1 (most programs) · IELTS 6.5 (English programs)",
    scholarship: "DAAD (full funding), Bayern Scholarship, Merit-based fellowships",
    opportunities: "Nobel laureates: 42. Germany's oldest university. Free education. Munich = Germany's Silicon Valley. Blue Card visa after graduation. Strong in Medicine & Science.",
    website: "https://www.lmu.de", howToApply: "Apply via uni-assist.de or LMU portal. German language required for most programs. English programs available for Master's. No tuition fees — only €150 semester fee.",
    topCourses: ["Medicine (MBBS equivalent)", "Computer Science", "Physics", "Economics", "Law (German law)"],
    contact: "9876548012",
  },
];

const COUNTRIES = ["All", "USA 🇺🇸", "UK 🇬🇧", "Canada 🇨🇦", "Australia 🇦🇺", "Germany 🇩🇪"];

export default function AbroadPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = UNIVERSITIES.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase())) &&
    (country === "All" || u.country.startsWith(country.split(" ")[0]))
  );

  const COUNTRY_COLORS: Record<string, string> = {
    "USA": "bg-blue-100 text-blue-700", "UK": "bg-red-100 text-red-700",
    "Canada": "bg-red-100 text-red-800", "Australia": "bg-yellow-100 text-yellow-700", "Germany": "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back to Home</Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><Globe className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Study Abroad — Top Universities</h1>
              <p className="text-white/80 text-sm mt-0.5">USA · UK · Canada · Australia · Germany — Fees, Scholarships, Rankings & Opportunities</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{UNIVERSITIES.length} Universities</Badge>
            <Badge className="bg-white/20 text-white border-white/30">5 Countries</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Scholarship Info</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Career Opportunities</Badge>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-200 dark:border-emerald-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 text-sm text-emerald-700 dark:text-emerald-300 justify-center">
          <span>✈️ <strong>Germany</strong>: Nearly FREE education (€0 tuition)</span>
          <span>🍁 <strong>Canada</strong>: Easy PR pathway after study</span>
          <span>🎓 <strong>UK</strong>: Chevening = Full scholarship</span>
          <span>🏆 <strong>USA</strong>: Fulbright scholarship available</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search university or city..." className="pl-9" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {COUNTRIES.map(c => (
              <button key={c} onClick={() => setCountry(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${country === c ? "bg-blue-500 text-white shadow" : "bg-muted text-muted-foreground hover:bg-blue-50 hover:text-blue-700"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5">{filtered.length} universities found</p>

        <div className="space-y-4">
          {filtered.map((u, i) => {
            const countryCode = u.country.split(" ")[0];
            return (
              <motion.div key={u.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-5 flex flex-col sm:flex-row gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shrink-0 text-3xl">
                        {u.country.split(" ")[1]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start gap-2 mb-1">
                          <h3 className="font-bold text-lg leading-tight">{u.name}</h3>
                          <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">{u.rank}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{u.city}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Intake: {u.intake}</span>
                          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{u.rating}/5</span>
                          <span className="text-xs text-red-500 font-medium">Acceptance: {u.acceptance}</span>
                        </div>

                        {/* Cost breakdown */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-2.5 text-center">
                            <p className="text-xs font-bold text-orange-600">{u.tuition}</p>
                            <p className="text-[10px] text-muted-foreground">Tuition/yr</p>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-2.5 text-center">
                            <p className="text-xs font-bold text-blue-600">{u.living}</p>
                            <p className="text-[10px] text-muted-foreground">Living/yr</p>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-2.5 text-center">
                            <p className="text-xs font-bold text-red-600">{u.total}</p>
                            <p className="text-[10px] text-muted-foreground">Total/yr</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={`border-0 text-xs ${COUNTRY_COLORS[countryCode] || "bg-gray-100 text-gray-600"}`}>{u.country}</Badge>
                          <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">📝 {u.exam.split(" · ")[0]}</Badge>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-2.5 text-xs text-emerald-700 dark:text-emerald-300">
                          <Award className="w-3 h-3 inline mr-1" /><strong>Scholarship:</strong> {u.scholarship}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <a href={`tel:${u.contact}`}><Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-1.5"><Phone className="w-3.5 h-3.5" />Call</Button></a>
                        <a href={`https://wa.me/91${u.contact}?text=Hello, I want info about ${encodeURIComponent(u.name)}`} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-1.5"><MessageCircle className="w-3.5 h-3.5" />WhatsApp</Button>
                        </a>
                        <a href={u.website} target="_blank" rel="noreferrer"><Button size="sm" variant="outline" className="w-full gap-1.5"><Globe className="w-3.5 h-3.5" />Website</Button></a>
                      </div>
                    </div>

                    <button onClick={() => setExpanded(expanded === u.id ? null : u.id)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 border-t border-gray-100 dark:border-gray-800 text-xs text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors font-medium">
                      {expanded === u.id ? <><ChevronUp className="w-4 h-4" />Hide Details</> : <><ChevronDown className="w-4 h-4" />How to Apply · Courses · Career Opportunities</>}
                    </button>

                    {expanded === u.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-gray-100 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/30">
                        <div className="grid sm:grid-cols-3 gap-5">
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-500" />How to Apply</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{u.howToApply}</p>
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-2 text-xs">
                              <strong>Exams needed:</strong><br />{u.exam}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-purple-500" />Top Courses</h4>
                            <div className="flex flex-wrap gap-1.5 mb-3">{u.topCourses.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}</div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-500" />Career Opportunities</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{u.opportunities}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-orange-500" />Scholarships</h4>
                            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{u.scholarship}</p>
                            <a href={u.website} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline block mb-3">{u.website}</a>
                            <div className="flex gap-2">
                              <a href={`tel:${u.contact}`}><Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white h-8 text-xs gap-1"><Phone className="w-3 h-3" />Call</Button></a>
                              <a href={`https://wa.me/91${u.contact}`} target="_blank" rel="noreferrer">
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
