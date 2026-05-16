"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, GraduationCap, MapPin, BookOpen, Search, Download,
  Trash2, Eye, BarChart3, TrendingUp, Clock, Mail, Phone,
  ChevronLeft, Lock, LogOut, RefreshCw, Filter
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  course: string;
  board: string;
  marks: string;
  message: string;
  registeredAt: string;
}

const ADMIN_PASSWORD = "admin123";
const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "analytics">("overview");

  useEffect(() => {
    const saved = localStorage.getItem("edu_admin_auth");
    if (saved === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchStudents();
  }, [authed]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data.students || []);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      localStorage.setItem("edu_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Try: admin123");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    localStorage.removeItem("edu_admin_auth");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student record?")) return;
    try {
      await fetch(`/api/students/${id}`, { method: "DELETE" });
      setStudents(prev => prev.filter(s => s.id !== id));
      if (selectedStudent?.id === id) setSelectedStudent(null);
    } catch {
      alert("Failed to delete.");
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "City", "Course", "Board", "Marks", "Registered At"];
    const rows = students.map(s => [s.name, s.email, s.phone, s.city, s.course, s.board, s.marks, new Date(s.registeredAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "students.csv"; a.click();
  };

  // Filters
  const allCourses = ["All", ...Array.from(new Set(students.map(s => s.course).filter(Boolean)))];
  const allCities = ["All", ...Array.from(new Set(students.map(s => s.city).filter(Boolean)))];

  const filtered = students.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchCourse = courseFilter === "All" || s.course === courseFilter;
    const matchCity = cityFilter === "All" || s.city === cityFilter;
    return matchSearch && matchCourse && matchCity;
  });

  // Analytics data
  const courseData = allCourses.filter(c => c !== "All").map(course => ({
    name: course.split(" ")[0],
    count: students.filter(s => s.course === course).length,
  })).sort((a, b) => b.count - a.count).slice(0, 6);

  const cityData = allCities.filter(c => c !== "All").map(city => ({
    name: city.split("/")[0],
    value: students.filter(s => s.city === city).length,
  })).sort((a, b) => b.value - a.value).slice(0, 6);

  const recentStudents = [...students].sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()).slice(0, 5);

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">EduGuide360 — Student Management</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Admin Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Enter password" className="h-11" />
            </div>
            {authError && <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{authError}</p>}
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white h-11">
              Login to Dashboard
            </Button>
            <p className="text-xs text-center text-gray-400">Default password: <code className="bg-gray-100 px-1 rounded">admin123</code></p>
          </div>
          <div className="mt-6 pt-4 border-t text-center">
            <Link href="/" className="text-sm text-emerald-600 hover:underline flex items-center justify-center gap-1">
              <ChevronLeft className="w-4 h-4" />Back to Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 hidden lg:flex flex-col">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">EduGuide360</p>
              <p className="text-[10px] text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "students", icon: Users, label: "Students" },
            { id: "analytics", icon: TrendingUp, label: "Analytics" },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as "overview" | "students" | "analytics")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <Link href="/" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />Visit Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-bold text-lg">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "students" && "Student Records"}
              {activeTab === "analytics" && "Analytics"}
            </h1>
            <p className="text-xs text-gray-400">{students.length} total students registered</p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={fetchStudents} className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" />Refresh
            </Button>
            <Button size="sm" onClick={exportCSV} className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white">
              <Download className="w-3.5 h-3.5" />Export CSV
            </Button>
            <button onClick={handleLogout} className="lg:hidden text-gray-400 hover:text-red-500 transition-colors p-1">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-6">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Total Students", value: students.length, color: "bg-blue-50 text-blue-600", trend: "+12% this week" },
                  { icon: MapPin, label: "Cities Covered", value: new Set(students.map(s => s.city).filter(Boolean)).size, color: "bg-emerald-50 text-emerald-600", trend: "Across India" },
                  { icon: BookOpen, label: "Courses Tracked", value: new Set(students.map(s => s.course).filter(Boolean)).size, color: "bg-orange-50 text-orange-600", trend: "Different fields" },
                  { icon: Clock, label: "This Week", value: students.filter(s => {
                    const d = new Date(s.registeredAt);
                    const now = new Date();
                    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
                  }).length, color: "bg-purple-50 text-purple-600", trend: "New registrations" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card>
                      <CardContent className="p-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{stat.trend}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Recent registrations */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recent Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="flex items-center justify-center py-8 text-gray-400 text-sm">Loading...</div>
                    ) : recentStudents.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-sm">No students registered yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {recentStudents.map(s => (
                          <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{s.name}</p>
                              <p className="text-xs text-gray-400 truncate">{s.course || "—"} · {s.city || "—"}</p>
                            </div>
                            <p className="text-xs text-gray-400 shrink-0">{new Date(s.registeredAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setActiveTab("students")}>
                      View All Students
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Registrations by Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {courseData.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-sm">No data yet.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={courseData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === "students" && (
            <div className="space-y-5">
              {/* Search + filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, email or phone..." className="pl-9 h-10" />
                </div>
                <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm min-w-[160px]">
                  {allCourses.map(c => <option key={c} value={c}>Course: {c}</option>)}
                </select>
                <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm min-w-[160px]">
                  {allCities.map(c => <option key={c} value={c}>City: {c}</option>)}
                </select>
              </div>

              <p className="text-sm text-gray-500">{filtered.length} student{filtered.length !== 1 ? "s" : ""} found</p>

              {/* Table (desktop) */}
              <Card className="hidden md:block overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Student</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Contact</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Course</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">City</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Board</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Registered</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {loading ? (
                        <tr><td colSpan={7} className="text-center py-10 text-gray-400">Loading students...</td></tr>
                      ) : filtered.length === 0 ? (
                        <tr><td colSpan={7} className="text-center py-10 text-gray-400">No students found.</td></tr>
                      ) : filtered.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {s.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{s.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="flex items-center gap-1 text-xs text-gray-600"><Mail className="w-3 h-3" />{s.email}</span>
                              <span className="flex items-center gap-1 text-xs text-gray-600"><Phone className="w-3 h-3" />{s.phone}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {s.course ? <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">{s.course}</Badge> : <span className="text-gray-400">—</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{s.city || "—"}</td>
                          <td className="px-4 py-3 text-gray-600">{s.board || "—"}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">
                            {new Date(s.registeredAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1.5">
                              <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setSelectedStudent(s)} title="View">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-500 hover:bg-red-50 hover:border-red-200" onClick={() => handleDelete(s.id)} title="Delete">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Cards (mobile) */}
              <div className="md:hidden space-y-3">
                {filtered.map(s => (
                  <Card key={s.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold shrink-0">
                            {s.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{s.name}</p>
                            <p className="text-xs text-gray-500">{s.city} · {s.course}</p>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => setSelectedStudent(s)}><Eye className="w-3.5 h-3.5" /></Button>
                          <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-500" onClick={() => handleDelete(s.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <p>📧 {s.email}</p>
                        <p>📱 {s.phone}</p>
                        <p>📅 {new Date(s.registeredAt).toLocaleDateString("en-IN")}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="text-base">Students by Course</CardTitle></CardHeader>
                  <CardContent>
                    {courseData.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-sm">No data available.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={courseData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 10 }} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle className="text-base">Students by City</CardTitle></CardHeader>
                  <CardContent>
                    {cityData.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 text-sm">No data available.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie data={cityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                            {cityData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Summary table */}
              <Card>
                <CardHeader><CardTitle className="text-base">Course-wise Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {courseData.map((c, i) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-32 truncate">{c.name}</span>
                        <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${(c.count / students.length) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                        </div>
                        <span className="text-sm text-gray-500 w-8 text-right">{c.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Student detail modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStudent(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 rounded-t-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-lg">
                {selectedStudent.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-white">
                <h3 className="font-bold text-lg">{selectedStudent.name}</h3>
                <p className="text-white/80 text-sm">Registered {new Date(selectedStudent.registeredAt).toLocaleDateString("en-IN")}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-white/70 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { icon: Mail, label: "Email", value: selectedStudent.email },
                { icon: Phone, label: "Phone", value: selectedStudent.phone },
                { icon: MapPin, label: "City", value: selectedStudent.city || "Not specified" },
                { icon: BookOpen, label: "Course", value: selectedStudent.course || "Not specified" },
                { icon: GraduationCap, label: "Board", value: selectedStudent.board || "Not specified" },
                { icon: TrendingUp, label: "Marks", value: selectedStudent.marks || "Not specified" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <item.icon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
              {selectedStudent.message && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Message</p>
                  <p className="text-sm">{selectedStudent.message}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <a href={`mailto:${selectedStudent.email}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2"><Mail className="w-4 h-4" />Send Email</Button>
                </a>
                <a href={`tel:${selectedStudent.phone}`} className="flex-1">
                  <Button className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"><Phone className="w-4 h-4" />Call</Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
