"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, GraduationCap, DollarSign, Clock, Award, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COUNTRIES = [
  { name: "USA 🇺🇸", topUnis: ["MIT", "Stanford", "Harvard", "UC Berkeley"], avgCost: "$40,000–60,000/yr", scholarship: "Fulbright, Merit Aid", visa: "F-1 Visa", exam: "GRE/GMAT + TOEFL/IELTS", intake: "Sep & Jan", popular: ["Computer Science", "MBA", "Engineering"] },
  { name: "UK 🇬🇧", topUnis: ["Oxford", "Cambridge", "Imperial", "UCL"], avgCost: "£15,000–35,000/yr", scholarship: "Chevening, Commonwealth", visa: "Student Visa", exam: "IELTS 6.5+", intake: "September", popular: ["Law", "Finance", "Medicine"] },
  { name: "Canada 🇨🇦", topUnis: ["U of Toronto", "McGill", "UBC", "Waterloo"], avgCost: "CAD 20,000–40,000/yr", scholarship: "Vanier CGS, Merit Awards", visa: "Study Permit", exam: "IELTS 6.5+", intake: "Sep & Jan", popular: ["IT", "Engineering", "MBA"] },
  { name: "Australia 🇦🇺", topUnis: ["Melbourne", "Sydney", "UNSW", "ANU"], avgCost: "AUD 25,000–45,000/yr", scholarship: "Australia Awards, Merit", visa: "Subclass 500", exam: "IELTS 6.5+", intake: "Feb & July", popular: ["Nursing", "IT", "Engineering"] },
  { name: "Germany 🇩🇪", topUnis: ["TU Munich", "LMU Munich", "Heidelberg", "KIT"], avgCost: "€0–3,000/yr (Low fees!)", scholarship: "DAAD, Erasmus+", visa: "National Student Visa", exam: "German B2 / IELTS", intake: "Oct & April", popular: ["Engineering", "Research", "Computer Science"] },
  { name: "New Zealand 🇳🇿", topUnis: ["Auckland", "Otago", "Victoria", "Canterbury"], avgCost: "NZD 22,000–35,000/yr", scholarship: "NZ Excellence Scholarship", visa: "Student Visa", exam: "IELTS 6.0+", intake: "Mar & July", popular: ["Agriculture", "IT", "Tourism Management"] },
];

const PROCESS_STEPS = [
  { step: "1", title: "Choose Your Country & Course", desc: "Research based on your career goals, budget and preferred lifestyle" },
  { step: "2", title: "Prepare Language Tests", desc: "IELTS, TOEFL, GRE or GMAT — allow 3–6 months of preparation" },
  { step: "3", title: "Apply to Universities", desc: "Prepare a strong SOP, 2–3 LORs and official transcripts" },
  { step: "4", title: "Apply for Scholarships", desc: "Government and university scholarships — apply early, deadlines vary" },
  { step: "5", title: "Visa Application", desc: "After receiving I-20/CAS letter, apply for your student visa" },
  { step: "6", title: "Fly & Begin Your Journey", desc: "Complete pre-departure checklist and book accommodation" },
];

export default function StudyAbroadSection() {
  const [selected, setSelected] = useState(0);
  const country = COUNTRIES[selected];
  const scrollToCounselor = () => document.getElementById("counselor")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="study-abroad" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">✈️ Study Abroad</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Study Abroad — Turn Your Dream Into Reality</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore 6 top study destinations, top universities, scholarships and step-by-step guidance</p>
        </motion.div>

        {/* Country selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {COUNTRIES.map((c, i) => (
            <button key={c.name} onClick={() => setSelected(i)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                selected === i ? "bg-blue-500 text-white shadow-lg" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-border hover:border-blue-300"
              }`}>{c.name}</button>
          ))}
        </div>

        <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-8 mb-14">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
              <p className="opacity-80 text-sm">Complete study destination overview</p>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Top Universities</p>
                <div className="flex flex-wrap gap-2">{country.topUnis.map(u => <Badge key={u} variant="outline" className="text-xs">{u}</Badge>)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-3">
                  <DollarSign className="w-4 h-4 text-blue-600 mb-1" />
                  <p className="text-xs font-semibold">Average Cost / Year</p>
                  <p className="text-xs text-muted-foreground">{country.avgCost}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3">
                  <Award className="w-4 h-4 text-emerald-600 mb-1" />
                  <p className="text-xs font-semibold">Scholarships</p>
                  <p className="text-xs text-muted-foreground">{country.scholarship}</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3">
                  <Clock className="w-4 h-4 text-orange-600 mb-1" />
                  <p className="text-xs font-semibold">Intake Months</p>
                  <p className="text-xs text-muted-foreground">{country.intake}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-3">
                  <GraduationCap className="w-4 h-4 text-purple-600 mb-1" />
                  <p className="text-xs font-semibold">Exams Required</p>
                  <p className="text-xs text-muted-foreground">{country.exam}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Popular Courses</p>
                <div className="flex gap-2">{country.popular.map(p => <Badge key={p} className="bg-blue-100 text-blue-700 border-0 text-xs">{p}</Badge>)}</div>
              </div>
              <Button onClick={scrollToCounselor} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                Get Free Counseling for {country.name.split(" ")[0]} <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <div>
            <h3 className="font-bold text-xl mb-6">Application Process — Step by Step</h3>
            <div className="space-y-4">
              {PROCESS_STEPS.map((s, i) => (
                <motion.div key={s.step} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                  <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-3 border border-border">
                    <p className="font-semibold text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/abroad">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-10">
              <Globe className="w-4 h-4 mr-2" />View All Universities — Fees, Scholarships, Rankings
            </Button>
          </Link>
          <Button onClick={scrollToCounselor} size="lg" variant="outline" className="px-8 border-blue-300 text-blue-600 hover:bg-blue-50">
            Free Study Abroad Counseling
          </Button>
        </div>
      </div>
    </section>
  );
}
