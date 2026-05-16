import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import StudyAbroadSection from "@/components/StudyAbroadSection";
import JobsSection from "@/components/JobsSection";
import MentorshipSection from "@/components/MentorshipSection";
import AccommodationSection from "@/components/AccommodationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <EducationSection />
      <StudyAbroadSection />
      <JobsSection />
      <MentorshipSection />
      <AccommodationSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingChatbot />
    </main>
  );
}
