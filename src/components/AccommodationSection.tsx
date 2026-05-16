"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const FEATURED = [
  { name: "Scholar Boys PG", city: "New Delhi", near: "Delhi University", price: "₹8,000/mo", rating: 4.5, type: "Boys PG", amenities: ["WiFi", "Meals", "AC"], image: "🏠" },
  { name: "GirlsFirst Hostel", city: "Bangalore", near: "Manipal University", price: "₹9,500/mo", rating: 4.7, type: "Girls Hostel", amenities: ["WiFi", "Meals", "Gym"], image: "🏢" },
  { name: "Campus Living", city: "Mumbai", near: "IIT Bombay Gate", price: "₹12,000/mo", rating: 4.6, type: "Co-ed PG", amenities: ["WiFi", "Meals", "Laundry"], image: "🏬" },
  { name: "Student Home Pune", city: "Pune", near: "Symbiosis College", price: "₹7,500/mo", rating: 4.4, type: "Boys PG", amenities: ["WiFi", "Meals"], image: "🏘" },
  { name: "Shree Sai PG", city: "Hyderabad", near: "JNTU", price: "₹6,500/mo", rating: 4.3, type: "Boys PG", amenities: ["WiFi", "Meals", "AC"], image: "🏠" },
  { name: "Pink House", city: "Chennai", near: "Anna University", price: "₹8,500/mo", rating: 4.6, type: "Girls PG", amenities: ["WiFi", "Meals", "Security"], image: "🏡" },
];

const CITIES = [
  { name: "Delhi / NCR", pgCount: "2,500+", priceFrom: "₹6,000/mo" },
  { name: "Mumbai", pgCount: "1,800+", priceFrom: "₹8,000/mo" },
  { name: "Bangalore", pgCount: "3,000+", priceFrom: "₹5,500/mo" },
  { name: "Pune", pgCount: "2,000+", priceFrom: "₹5,000/mo" },
  { name: "Hyderabad", pgCount: "1,500+", priceFrom: "₹4,500/mo" },
  { name: "Chennai", pgCount: "1,200+", priceFrom: "₹5,000/mo" },
];

export default function AccommodationSection() {
  return (
    <section id="accommodation" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">🏠 Accommodation</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">PG, Hostel & Student Housing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Verified, safe and affordable student accommodation across India&apos;s top cities</p>
        </motion.div>

        {/* City quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {CITIES.map(city => (
            <Link key={city.name} href={`/accommodation?city=${encodeURIComponent(city.name)}`}>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-3 text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border border-border">
                <p className="font-semibold text-sm">{city.name}</p>
                <p className="text-xs text-emerald-600">{city.pgCount} listings</p>
                <p className="text-xs text-muted-foreground">From {city.priceFrom}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured listings */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FEATURED.map((item, i) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 flex items-center justify-center text-5xl">
                  {item.image}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <span className="flex items-center gap-0.5 text-xs text-amber-500">
                      <Star className="w-3 h-3 fill-current" />{item.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="w-3 h-3" />{item.city}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Near {item.near}</p>
                  <div className="flex gap-1 mb-3">
                    {item.amenities.map(a => (
                      <Badge key={a} variant="outline" className="text-[10px] px-1.5 py-0">{a}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-600">{item.price}</span>
                    <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">{item.type}</Badge>
                  </div>
                  <Link href="/accommodation">
                    <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white h-8 text-xs">
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-center text-white">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-2xl font-bold mb-2">10,000+ Verified Listings Across India</h3>
          <p className="mb-6 opacity-90">PG, Hostel, Single Room, Flat Share — find the best option within your budget</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/accommodation">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 font-semibold">
                <Building className="w-4 h-4 mr-2" />Browse All Listings
              </Button>
            </Link>
            <Link href="/accommodation">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8">
                <Users className="w-4 h-4 mr-2" />Find a Roommate
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
