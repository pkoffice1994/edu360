"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, User, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const COURSES = ["Engineering (JEE)", "Medical (NEET)", "MBA (CAT)", "Law (CLAT)", "Study Abroad", "Government Jobs", "Other"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "Other"];
const CITIES = ["Delhi / NCR", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Jaipur", "Other"];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", course: "", board: "", marks: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Name, email and phone number are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", city: "", course: "", board: "", marks: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">📝 Free Registration</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Register for Free Counseling</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Fill in your details — an expert counselor will call you within 24 hours</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Registration form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="shadow-xl border-0">
              <CardContent className="p-6 space-y-4">
                {success ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-600 mb-2">Registration Successful! 🎉</h3>
                    <p className="text-muted-foreground mb-4">Our counselor will contact you within 24 hours.</p>
                    <Button onClick={() => setSuccess(false)} variant="outline">Register Another Student</Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Full Name *</label>
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Phone Number *</label>
                        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">Email Address *</label>
                      <Input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" type="email" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">City</label>
                        <select name="city" value={form.city} onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select city</option>
                          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Board</label>
                        <select name="board" value={form.board} onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select board</option>
                          {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Course Interest</label>
                        <select name="course" value={form.course} onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select course</option>
                          {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Marks / Percentage</label>
                        <Input name="marks" value={form.marks} onChange={handleChange} placeholder="e.g. 85%" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">Message (Optional)</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Any specific question or requirement..."
                        className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    {error && <p className="text-red-500 text-xs bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg">{error}</p>}
                    <Button onClick={handleSubmit} disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white h-11">
                      {loading ? "Registering..." : <><Send className="w-4 h-4 mr-2" />Register for Free Counseling</>}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">✅ 100% Free · No spam · Callback within 24 hours</p>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div>
              <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
              <p className="text-muted-foreground">Speak directly with expert counselors for admission guidance, scholarships and career planning.</p>
            </div>
            {[
              { icon: Phone, label: "Phone / WhatsApp", value: "+91 98765 43210", color: "text-green-600 bg-green-50" },
              { icon: Mail, label: "Email", value: "help@eduguide360.in", color: "text-blue-600 bg-blue-50" },
              { icon: MapPin, label: "Office", value: "Connaught Place, New Delhi — 110001", color: "text-orange-600 bg-orange-50" },
              { icon: Clock, label: "Working Hours", value: "Mon–Sat: 9 AM – 8 PM · AI Counselor: 24/7", color: "text-purple-600 bg-purple-50" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold">Join Our Student Community</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">After registering, you will be part of our student community and receive personalized guidance, updates and opportunities.</p>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs"><BookOpen className="w-3 h-3 mr-1" />50,000+ Students</Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Always Free</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
