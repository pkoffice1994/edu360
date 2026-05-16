import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are EduGuide360 AI Counselor — an expert Indian student guidance assistant.

Help students with:
- Indian Schools: CBSE, ICSE, top schools in Delhi, Mumbai, Bangalore, Kota
- Indian Colleges: IIT, IIM, NIT, AIIMS, DU, Kota coaching (Allen, Resonance, Vibrant)
- Entrance Exams: JEE Main, JEE Advanced, NEET, CAT, CLAT, GATE, UPSC, CUET
- Study Abroad: USA, UK, Canada, Australia, Germany
- Scholarships: NSP, Fulbright, Chevening, DAAD
- Jobs & Careers: IT, Engineering, Medical, Government, Banking
- Accommodation: PG, hostel in Kota, Delhi, Mumbai, Bangalore

Always respond in clear English. Be warm, specific and helpful.`;

function smartReply(msg: string): string {
  const m = msg.toLowerCase();

  // Greetings
  if (m === "hello" || m === "hi" || m === "hey" || m.startsWith("hello") || m.startsWith("hi ") || m === "namaste")
    return `Hello! 👋 Welcome to **EduGuide360**!\n\nI am your AI Counselor. How can I help you today?\n\nYou can ask me about:\n🎓 JEE, NEET, CAT, UPSC exams\n🏫 Schools & Colleges — Kota, IIT, AIIMS\n✈️ Study Abroad — USA, UK, Germany\n💰 Scholarships\n💼 Jobs & Career\n🏠 Kota PG & Accommodation\n\nWhat would you like to know?`;

  // AI / Technology
  if (m.includes("learn ai") || m.includes("artificial intelligence") || m.includes("machine learning") || m.includes("ai course") || m.includes("data science"))
    return `**How to Learn AI & Machine Learning**\n\nGreat choice! AI is the future 🚀\n\n**Free Courses:**\n- Google ML Crash Course — free\n- Andrew Ng ML Course — Coursera (audit free)\n- Fast.ai — practical deep learning\n- NPTEL AI courses — free for Indians\n\n**Best Colleges for AI in India:**\n- IIT Bombay, Delhi, Madras — MTech AI\n- IIIT Hyderabad — top AI research\n- IISc Bangalore — best research\n\n**Skills Needed:**\n- Python (start here)\n- Mathematics (Linear Algebra, Stats)\n- Libraries: TensorFlow, PyTorch, Scikit-learn\n\n**Career After AI:**\n- ML Engineer: ₹8–25 LPA India\n- Data Scientist: ₹6–20 LPA\n- USA: $120,000–200,000/yr\n\n**Learning Path:**\n1. Learn Python (3 months)\n2. Maths basics (2 months)\n3. Andrew Ng ML Course\n4. Build projects on GitHub\n5. Apply at TCS AI labs or study abroad\n\nWant college recommendations or course details?`;

  // Python / Coding
  if (m.includes("python") || m.includes("coding") || m.includes("programming"))
    return `**Learn Python & Programming**\n\nPython is the most in-demand skill!\n\n**Free Resources:**\n- Python.org official tutorial\n- CS50 by Harvard — free on edX\n- NPTEL Programming courses\n- YouTube: CodeWithHarry (Hindi), Corey Schafer\n\n**Career Options:**\n- Software Engineer: ₹4–15 LPA\n- Data Scientist: ₹6–20 LPA\n- Web Developer: ₹3–10 LPA\n\n**Top CS Colleges:**\n- IIT Bombay, Delhi, Madras (JEE Advanced)\n- BITS Pilani (BITSAT 380+)\n- IIIT Hyderabad (JEE Main 99%ile)\n\nWant CS college details or career guidance?`;

  // CSE branch
  if (m.includes("computer science") || m.includes("cse") || m.includes("btech cs"))
    return `**Computer Science Engineering (CSE)**\n\nMost popular branch in India!\n\n**Top Colleges:**\n- IIT Bombay CSE — JEE AIR ~100\n- IIT Delhi CSE — JEE AIR ~200\n- IIT Madras CSE — JEE AIR ~300\n- BITS Pilani CS — BITSAT 380+\n- IIIT Hyderabad — JEE Main 99%ile\n\n**Average Packages:**\n- IIT CSE: ₹20–40 LPA\n- NIT CSE: ₹8–15 LPA\n\n**Top Recruiters:** Google, Microsoft, Amazon, TCS\n\n**Kota Coaching for JEE:**\n- Allen Career Institute: Best JEE results\n- Resonance: Strong faculty\n\nWant JEE prep tips or college comparison?`;

  if (m.includes("jee") || m.includes("iit") || m.includes("kota"))
    return `**JEE & Kota Coaching Guide**\n\nKota is India's coaching capital for JEE!\n\nTop Coaching in Kota:\n- Allen Career Institute — Best for JEE, 10,000+ students\n- Resonance — Strong faculty, good results\n- Vibrant Academy — Personal attention\n- Motion IIT-JEE — Affordable fees\n\nFees: ₹1L–2L/year\nJEE Main: January & April | JEE Advanced: May\n\nTop IITs: Bombay, Delhi, Madras, Kanpur, Kharagpur\n\nAsk me about specific coaching, fees or study plan!`;

  if (m.includes("neet") || m.includes("mbbs") || m.includes("medical"))
    return `**NEET & Medical Guide**\n\nNEET: May every year (NTA)\n\nKota Coaching for NEET:\n- Allen Career Institute — Best NEET coaching\n- Aakash Kota — Strong biology faculty\n\nTop Medical Colleges: AIIMS Delhi, JIPMER, Maulana Azad\nFees: AIIMS = ₹1,500/yr only!\n\nNEET Marks: Biology 360 + Physics 180 + Chemistry 180 = 720\nAIIMS cutoff: 700+ | Govt Medical: 550+\n\nWant coaching details or college list?`;

  if (m.includes("pg") || m.includes("hostel") || m.includes("kota room") || m.includes("accommodation"))
    return `**Kota PG & Hostel Guide**\n\nMonthly Rent in Kota:\n- Near Allen (Talwandi): ₹6,000–8,500/mo\n- Near Resonance (Dadabari): ₹5,500–7,500/mo\n- Vigyan Nagar: ₹5,000–7,000/mo\n\nTypes: Boys PG | Girls Hostel | Co-ed PG\nAmenities: WiFi, Meals, AC, Study Room\n\nVisit our Accommodation page for 6 Kota listings with direct Call & WhatsApp!\n\nWhich area in Kota are you looking for?`;

  if (m.includes("usa") || m.includes("abroad") || m.includes("uk") || m.includes("canada") || m.includes("germany"))
    return `**Study Abroad Guide**\n\nUSA: MIT, Stanford, Harvard | $40K-60K/yr | GRE + TOEFL\nUK: Oxford, Cambridge | £15K-35K/yr | IELTS 6.5+\nCanada: UofT, McGill | CAD 20K-40K/yr | PR-friendly\nGermany: TU Munich | Nearly FREE (€500/yr)\nAustralia: Melbourne, Sydney | AUD 25K-45K/yr\n\nScholarships:\n- Fulbright (USA) — Fully funded\n- Chevening (UK) — Fully funded\n- DAAD (Germany) — Fully funded\n\nWhich country interests you?`;

  if (m.includes("scholarship"))
    return `**Scholarships for Indian Students**\n\nIndia:\n- NSP (National Scholarship Portal) — Government\n- PM Scholarship — ₹25,000-50,000/yr\n- AICTE Scholarship\n\nInternational:\n- Fulbright (USA) — Full funding\n- Chevening (UK) — Full funding\n- DAAD (Germany) — Free education\n- Australia Awards — Full funding\n\nApply 12-18 months early. Need CGPA 8.0+\n\nWhich scholarship are you interested in?`;

  if (m.includes("job") || m.includes("career") || m.includes("salary"))
    return `**Jobs & Career Guide**\n\nIT Companies (Freshers):\n- TCS, Infosys, Wipro: ₹3-5 LPA\n- Amazon, Google, Microsoft: ₹15-40 LPA\n\nGovernment Jobs:\n- SSC CGL: ₹4-10 LPA\n- Banking PO: ₹6-8 LPA\n- Railway RRB: ₹2-4 LPA\n- UPSC IAS: ₹10-20 LPA\n\nVisit our Jobs page for 15+ current openings!\n\nWhich field interests you?`;

  if (m.includes("cat") || m.includes("mba") || m.includes("iim"))
    return `**CAT & MBA Guide**\n\nCAT: November every year\nTop IIMs: IIM A, B, C, L, K\n\nCutoffs: IIM A/B/C: 99%ile+\nFees: IIM A: ₹25L | Avg Package: ₹35 LPA\n\nCoaching: IMS, TIME, Career Launcher\n\nWant CAT prep tips or IIM selection strategy?`;

  if (m.includes("upsc") || m.includes("ias"))
    return `**UPSC Civil Services Guide**\n\nStages: Prelims → Mains → Interview\nVacancies: ~1,000/year | Age: 21-32 years\n\nTop Coaching: Vision IAS, Vajiram & Ravi, Drishti IAS\nKey Books: Laxmikant (Polity), NCERT all subjects\nNewspaper: The Hindu daily\n\nVisit our Mentors page — IAS officers guide you!\n\nWant study plan or optional subject guidance?`;

  if (m.includes("12th") || m.includes("after 12"))
    return `**Career Options After 12th**\n\nScience:\n- Engineering → JEE → IIT, NIT, BITS\n- Medical → NEET → AIIMS, MBBS\n- B.Sc Research → IISc, IISER\n\nCommerce:\n- CA → ICAI exams\n- BBA → Management\n- B.Com + MBA\n\nArts:\n- BA LLB → CLAT → NLUs\n- Journalism, Design\n- UPSC after graduation\n\nWhat subject did you take in 12th?`;

  return `Hello! I am the **EduGuide360 AI Counselor** 👋\n\nI can help you with:\n\n🎓 Schools & Colleges — IIT, IIM, AIIMS, Kota Coaching\n📚 Entrance Exams — JEE, NEET, CAT, UPSC\n✈️ Study Abroad — USA, UK, Canada, Germany\n💰 Scholarships — Fulbright, Chevening, DAAD\n💼 Jobs & Career guidance\n🏠 Kota PG & Accommodation\n\nType your question — I will answer instantly!`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ message: "Please type a message." });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ message: smartReply(message) });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-6) : []).map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content),
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://eduguide360.vercel.app",
        "X-Title": "EduGuide360",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", res.status);
      return NextResponse.json({ message: smartReply(message) });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ message: smartReply(message) });
    }

    return NextResponse.json({ message: reply });

  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ message: smartReply(message) });
  }
}
