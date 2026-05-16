"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  { name: "Arjun Sharma", college: "IIT Delhi — B.Tech CSE", city: "Delhi", rating: 5, image: "👨‍🎓", text: "EduGuide360 helped me crack JEE Advanced with a rank of 847. The AI counselor gave me a personalized study plan and connected me with mentors who had been through the same journey. Absolutely life-changing." },
  { name: "Priya Nair", college: "AIIMS Delhi — MBBS", city: "Kerala", rating: 5, image: "👩‍⚕️", text: "I was confused between NEET and studying abroad. The counselors here explained everything clearly — from NEET cutoffs to MBBS in Russia and Ukraine. I cleared NEET with 685 marks and got into AIIMS!" },
  { name: "Rahul Gupta", college: "IIM Ahmedabad — MBA", city: "Lucknow", rating: 5, image: "👨‍💼", text: "After 3 years of work experience, I wanted to do an MBA. EduGuide360 helped me prepare for CAT, write a strong SOP, and guided me through the IIM interview process. Scored 99.2 percentile in CAT!" },
  { name: "Ananya Singh", college: "University of Toronto — MS CS", city: "Pune", rating: 5, image: "👩‍💻", text: "Study abroad was a dream I thought was too expensive. The counselors showed me scholarships and financial aid options I didn't know existed. Got a 60% scholarship at University of Toronto!" },
  { name: "Vikram Patel", college: "NIT Surathkal — B.Tech", city: "Gujarat", rating: 5, image: "👨‍🔬", text: "I was scoring 85 percentile in JEE and felt hopeless about top colleges. The mentors here guided me to focus on NIT, helped me choose the right branch, and I got CSE at NIT Surathkal!" },
  { name: "Shreya Reddy", college: "Delhi University — BA Economics", city: "Hyderabad", rating: 5, image: "👩‍🎓", text: "The AI counselor answered all my questions about DU admissions at midnight before my CUET exam! Got into Lady Shri Ram College for Economics. The guidance was precise and very helpful." },
];

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-4">⭐ Success Stories</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Students Who Made It</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real students, real results — from IIT to IIM, India to Abroad</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-emerald-500 mb-4 opacity-60" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-3xl">{t.image}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-emerald-600">{t.college}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === page ? "bg-emerald-500 w-5" : "bg-gray-300"}`} />
            ))}
          </div>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50,000+", label: "Students Guided" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "2,000+", label: "IIT / NIT Selections" },
            { value: "500+", label: "Study Abroad Placements" },
          ].map(stat => (
            <div key={stat.label} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-5 text-center border border-emerald-100 dark:border-emerald-900">
              <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
