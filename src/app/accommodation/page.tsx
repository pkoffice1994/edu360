"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Search, MapPin, Star, Filter, Phone, MessageCircle, Building, Users, IndianRupee, Bed, Shield, Wifi, Utensils, Dumbbell } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ALL_LISTINGS = [
  // ── KOTA ──────────────────────────────────────────────────────────
  { id: 1, name: "Allen Study Circle PG", city: "Kota", area: "Near Allen Career Institute, Talwandi", price: 7000, type: "Boys PG", rating: 4.8, amenities: ["WiFi", "Meals", "AC", "Study Room", "RO Water"], rooms: "Single / Double / Triple", deposit: "₹7,000", contact: "9876540001", verified: true, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop", desc: "Allen ke paas best PG. Daily meals, fast WiFi, 24/7 security. Study room available till midnight." },
  { id: 2, name: "Resonance Girls Hostel", city: "Kota", area: "Resonance Road, Dadabari", price: 7500, type: "Girls Hostel", rating: 4.9, amenities: ["WiFi", "Meals", "AC", "CCTV", "Warden"], rooms: "Double / Triple", deposit: "₹7,500", contact: "9876540002", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Resonance ke paas safe girls hostel. 24/7 warden, CCTV, hygienic food, study environment." },
  { id: 3, name: "Kota Coaching PG Boys", city: "Kota", area: "Vigyan Nagar, Near Vibrant Academy", price: 6000, type: "Boys PG", rating: 4.6, amenities: ["WiFi", "Meals", "RO Water", "Laundry"], rooms: "Triple / Quad", deposit: "₹6,000", contact: "9876540003", verified: true, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop", desc: "Budget-friendly PG for JEE/NEET students. Close to coaching institutes. Nutritious meals daily." },
  { id: 4, name: "Sunshine Boys Hostel", city: "Kota", area: "Kunhari, Kota", price: 5500, type: "Boys Hostel", rating: 4.5, amenities: ["WiFi", "Meals", "AC", "Library"], rooms: "Double / Triple", deposit: "₹5,500", contact: "9876540004", verified: false, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop", desc: "Affordable hostel with quiet study environment. Library facility. Close to all major coaching." },
  { id: 5, name: "Kota Smart PG Girls", city: "Kota", area: "Near ALLEN, Talwandi", price: 8000, type: "Girls PG", rating: 4.7, amenities: ["WiFi", "Meals", "AC", "Security", "CCTV"], rooms: "Single / Double", deposit: "₹8,000", contact: "9876540005", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Premium girls PG in Kota. AC rooms, healthy food, strict security. Best for girl students." },
  { id: 6, name: "IIT Dream Co-ed PG", city: "Kota", area: "Talwandi Main Road, Kota", price: 8500, type: "Co-ed PG", rating: 4.8, amenities: ["WiFi", "Meals", "AC", "Gym", "Study Hall"], rooms: "Single / Double", deposit: "₹9,000", contact: "9876540006", verified: true, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop", desc: "Best co-ed PG in Kota with gym and dedicated study hall. Allen/Resonance walking distance." },
  // ── JAIPUR ────────────────────────────────────────────────────────
  { id: 7, name: "Pink City Boys PG", city: "Jaipur", area: "Malviya Nagar, Near MNIT", price: 7000, type: "Boys PG", rating: 4.5, amenities: ["WiFi", "Meals", "AC", "Parking"], rooms: "Double / Triple", deposit: "₹7,000", contact: "9876540007", verified: true, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop", desc: "Near MNIT Jaipur. Good food, WiFi, AC. Easy connectivity to all colleges." },
  { id: 8, name: "Rajputana Girls Hostel", city: "Jaipur", area: "C-Scheme, Jaipur", price: 7500, type: "Girls Hostel", rating: 4.6, amenities: ["WiFi", "Meals", "Security", "Laundry"], rooms: "Single / Double", deposit: "₹7,500", contact: "9876540008", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Safe girls hostel in C-Scheme Jaipur. Good connectivity to colleges and coaching." },
  // ── DELHI/NCR ──────────────────────────────────────────────────────
  { id: 9, name: "Scholar Boys PG", city: "Delhi/NCR", area: "North Campus, Delhi University", price: 8000, type: "Boys PG", rating: 4.5, amenities: ["WiFi", "Meals", "AC", "Laundry"], rooms: "Single / Double / Triple", deposit: "₹8,000", contact: "9876540009", verified: true, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop", desc: "Near Delhi University North Campus. Metro connectivity. Good food and study environment." },
  { id: 10, name: "GirlsFirst DU Hostel", city: "Delhi/NCR", area: "Kamla Nagar, Near DU", price: 9000, type: "Girls Hostel", rating: 4.7, amenities: ["WiFi", "Meals", "AC", "CCTV", "Gym"], rooms: "Single / Double", deposit: "₹9,000", contact: "9876540010", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Best girls hostel near Delhi University. Safe, clean, hygienic. Metro 5 min walk." },
  // ── BANGALORE ──────────────────────────────────────────────────────
  { id: 11, name: "Sunrise Co-living", city: "Bangalore", area: "Koramangala, Bangalore", price: 11000, type: "Co-ed PG", rating: 4.8, amenities: ["WiFi", "Meals", "AC", "Gym", "Lounge"], rooms: "Single Room", deposit: "₹15,000", contact: "9876540011", verified: true, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop", desc: "Premium co-living in Koramangala. Near top IT companies. Fully furnished." },
  { id: 12, name: "Tech Girls PG", city: "Bangalore", area: "Electronic City, Bangalore", price: 7500, type: "Girls PG", rating: 4.5, amenities: ["WiFi", "Meals", "Security", "Shuttle"], rooms: "Double / Triple", deposit: "₹7,500", contact: "9876540012", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Near Electronic City IT hub. Shuttle service to tech parks. Safe for working girls." },
  // ── MUMBAI ──────────────────────────────────────────────────────────
  { id: 13, name: "Campus Living IIT Gate", city: "Mumbai", area: "Near IIT Bombay, Powai", price: 12000, type: "Co-ed PG", rating: 4.6, amenities: ["WiFi", "Meals", "AC", "Laundry", "Parking"], rooms: "Single / Double", deposit: "₹15,000", contact: "9876540013", verified: true, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=200&fit=crop", desc: "Walking distance from IIT Bombay gate. Good connectivity to Powai tech park." },
  // ── PUNE ────────────────────────────────────────────────────────────
  { id: 14, name: "Student Home Pune", city: "Pune", area: "Viman Nagar, Near Symbiosis", price: 7500, type: "Boys PG", rating: 4.4, amenities: ["WiFi", "Meals", "AC"], rooms: "Triple / Quad", deposit: "₹7,500", contact: "9876540014", verified: false, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=200&fit=crop", desc: "Near Symbiosis and other Pune colleges. Budget-friendly option for students." },
  // ── HYDERABAD ────────────────────────────────────────────────────────
  { id: 15, name: "HITEC Girls Hostel", city: "Hyderabad", area: "Madhapur, Near HITEC City", price: 8000, type: "Girls Hostel", rating: 4.5, amenities: ["WiFi", "Meals", "Security", "Gym"], rooms: "Double / Triple", deposit: "₹8,000", contact: "9876540015", verified: true, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop", desc: "Near HITEC City IT hub. Safe for working women and students." },
  { id: 16, name: "JNTU Boys PG", city: "Hyderabad", area: "Kukatpally, Near JNTU", price: 6500, type: "Boys PG", rating: 4.3, amenities: ["WiFi", "Meals", "AC", "RO Water"], rooms: "Double / Triple", deposit: "₹6,500", contact: "9876540016", verified: true, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop", desc: "Near JNTU and engineering colleges. Affordable with good facilities." },
];

const CITIES = ["All Cities", "Kota", "Jaipur", "Delhi/NCR", "Mumbai", "Bangalore", "Pune", "Hyderabad"];
const TYPES = ["All Types", "Boys PG", "Girls PG", "Girls Hostel", "Boys Hostel", "Co-ed PG"];
const AMENITY_FILTERS = ["WiFi", "Meals", "AC", "Gym", "Security", "Laundry", "Study Room"];

function AccommodationContent() {
  const searchParams = useSearchParams();
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [searchQ, setSearchQ] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selected, setSelected] = useState<typeof ALL_LISTINGS[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const city = searchParams.get("city");
    if (city && CITIES.includes(city)) setCityFilter(city);
  }, [searchParams]);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const filtered = ALL_LISTINGS.filter(l =>
    (cityFilter === "All Cities" || l.city === cityFilter) &&
    (typeFilter === "All Types" || l.type === typeFilter) &&
    l.price <= maxPrice &&
    (!searchQ || l.name.toLowerCase().includes(searchQ.toLowerCase()) || l.area.toLowerCase().includes(searchQ.toLowerCase())) &&
    (selectedAmenities.length === 0 || selectedAmenities.every(a => l.amenities.includes(a)))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1400&h=400&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"><ChevronLeft className="w-4 h-4" />Back</Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">🏠 Student Accommodation</h1>
          <p className="text-white/85">Kota · Jaipur · Delhi · Mumbai · Bangalore — PG, Hostel, Flat Share</p>
          <div className="flex gap-2 flex-wrap mt-4">
            <Badge className="bg-white/20 text-white border-white/30">{ALL_LISTINGS.length}+ Listings</Badge>
            <Badge className="bg-white/20 text-white border-white/30">⭐ Kota Special</Badge>
            <Badge className="bg-white/20 text-white border-white/30">8 Cities</Badge>
            <Badge className="bg-white/20 text-white border-white/30">Direct Call & WhatsApp</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + filter toggle */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search by name or area..." className="pl-9" />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="w-4 h-4" />Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-5 mb-5 grid sm:grid-cols-3 gap-5">
            <div>
              <p className="text-sm font-semibold mb-3">Max Price: ₹{maxPrice.toLocaleString()}/mo</p>
              <input type="range" min={3000} max={20000} step={500} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-orange-500" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹3,000</span><span>₹20,000</span></div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {AMENITY_FILTERS.map(a => (
                  <button key={a} onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedAmenities.includes(a) ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground hover:bg-orange-50"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Type</p>
              <div className="flex flex-col gap-1">
                {TYPES.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === t ? "bg-orange-100 text-orange-700" : "text-muted-foreground hover:bg-muted"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* City tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {CITIES.map(city => (
            <button key={city} onClick={() => setCityFilter(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${cityFilter === city ? "bg-orange-500 text-white shadow" : "bg-muted text-muted-foreground hover:bg-orange-50"}`}>
              {city === "Kota" ? "⭐ Kota" : city}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-5">{filtered.length} listings found</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden cursor-pointer h-full flex flex-col"
                  onClick={() => setSelected(item)}>
                  <div className="h-36 relative overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {item.verified && <Badge className="absolute top-2 left-2 bg-emerald-500 text-white border-0 text-[10px]">✓ Verified</Badge>}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />{item.rating}
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm leading-tight mb-1">{item.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{item.area}</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-0 text-[10px] w-fit mb-2">{item.type}</Badge>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.amenities.slice(0, 3).map(a => (
                        <Badge key={a} variant="outline" className="text-[10px] px-1 py-0">{a}</Badge>
                      ))}
                      {item.amenities.length > 3 && <Badge variant="outline" className="text-[10px] px-1 py-0">+{item.amenities.length - 3}</Badge>}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-emerald-600 font-bold text-base">₹{item.price.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">/mo</span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Bed className="w-3 h-3" />{item.rooms.split(" / ")[0]}</span>
                      </div>
                      <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white h-8 text-xs">
                        View Details & Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Building className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No listings found. Try adjusting filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setCityFilter("All Cities"); setTypeFilter("All Types"); setMaxPrice(15000); setSelectedAmenities([]); setSearchQ(""); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-40 overflow-hidden">
              <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {selected.verified && <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0">✓ Verified</Badge>}
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center">×</button>
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-lg">{selected.name}</h3>
                <p className="text-white/80 text-xs">{selected.area}</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{selected.desc}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted rounded-xl p-3">
                  <IndianRupee className="w-4 h-4 text-emerald-600 mb-1" />
                  <p className="text-xs text-muted-foreground">Monthly Rent</p>
                  <p className="font-bold text-emerald-600">₹{selected.price.toLocaleString()}/mo</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <Shield className="w-4 h-4 text-blue-600 mb-1" />
                  <p className="text-xs text-muted-foreground">Deposit</p>
                  <p className="font-bold">{selected.deposit}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <Bed className="w-4 h-4 text-purple-600 mb-1" />
                  <p className="text-xs text-muted-foreground">Room Options</p>
                  <p className="font-bold text-sm">{selected.rooms}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <Building className="w-4 h-4 text-orange-600 mb-1" />
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="font-bold text-sm">{selected.type}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selected.amenities.map(a => <Badge key={a} variant="outline" className="text-xs">{a}</Badge>)}
              </div>
              <div className="flex gap-3">
                <a href={`tel:${selected.contact}`} className="flex-1">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                    <Phone className="w-4 h-4" />Call Now
                  </Button>
                </a>
                <a href={`https://wa.me/91${selected.contact}?text=Hello, I want details about ${encodeURIComponent(selected.name)} PG in ${selected.city}`} target="_blank" rel="noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50 gap-2">
                    <MessageCircle className="w-4 h-4" />WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function AccommodationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <AccommodationContent />
    </Suspense>
  );
}
