// Bansal Wire AI Assistant Engine
// Supports both live Gemini API (if VITE_GEMINI_API_KEY is provided) and deep embedded metallurgical domain reasoning

interface Message {
  sender: 'bot' | 'user'
  text: string
  timestamp?: string
}

const BANSAL_KNOWLEDGE_PROMPT = `
You are the Official AI Technical Consultant & Assistant for Bansal Wire Industries Ltd. (BWIL), India's #1 Stainless Steel Wire Manufacturer (20% Market Share) and #2 overall steel wire manufacturer.
Company Background:
- Founded in 1938 (85+ years of trust). Commercial production started in 1985.
- Stock Exchange: BSE (544203) & NSE (BANSALWIRE).
- Global Footprint: Exporting to 50+ countries.
- Total Capacity: 206,466+ MTPA.
- Manufacturing Units: 4 operational units in Ghaziabad, UP and Asia's mega single-location facility in Dadri, UP.
- Certifications: ISO 9001:2015, ISO 14001:2015, IATF 16949:2016. All products come with EN 10204 3.1 Mill Test Certificates.

Product Portfolio (3,000+ SKUs, Diameters from 0.04 mm to 15.65 mm):
1. Stainless Steel Wires:
   - Grades: AISI 304, 304L, 316, 316L, 302, 310, 410, 430, 201, 204Cu.
   - Applications: Spring wires, weaving/mesh, cold heading (CHQ fasteners/screws), MIG/TIG welding wires, electro-polishing quality (EPQ), scrubbers, spoke wires.
2. High Carbon Steel Wires:
   - Grades: HC 45 to HC 85 (C45 to C85).
   - Applications: Mechanical springs, mattress springs, wire ropes, tyre bead wire, pre-stressed concrete (PC) wires, cycle spokes.
3. Mild Steel & Galvanized Wires:
   - Low Carbon (C1006 - C1018).
   - Coatings: Heavy Galvanized (200 - 300 GSM) & Commercial Galvanized.
   - Applications: Cable armouring (round wire & formed flat strips as per IS 3975 / BS 5467), fencing, binding, nails, stay wires, ACSR conductors.
4. Profile & Shaped Wires:
   - Shapes: Flat strips, square, half-round, oval, trapezoid, triangular, hexagon.
   - Applications: Wiper arm blades, surgical instruments, textile reed wire, lock springs.
5. Special Products:
   - Multi-strand wire ropes, tyre bead wires, aluminium alloy mesh, stainless steel scrubbers, engineered building ties & anchor bolts, high-tensile barbed wire.

Corporate Office & Contact:
- Address: F-3, Main Road, Shastri Nagar, New Delhi - 110052, India.
- Phone: 011-23651890 / 91 / 92 / 93.
- Email: info@bansal-group.com (General), exports@bansalwire.com (Exports).
- Response Time: Under 24 business hours.

Be professional, knowledgeable, polite, and technically precise. Provide concise, clear answers, suggest relevant wire grades or diameters, and encourage the user to submit an RFQ or contact sales.
`

export async function queryAIAssistant(
  userInput: string,
  history: Message[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  // If Gemini API Key is configured in environment, call Google Gemini 1.5/2.0 API directly
  if (apiKey && apiKey !== 'undefined') {
    try {
      const contents = [
        {
          role: 'user',
          parts: [{ text: BANSAL_KNOWLEDGE_PROMPT }]
        },
        ...history.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        {
          role: 'user',
          parts: [{ text: userInput }]
        }
      ]

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        }
      )

      if (response.ok) {
        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) return text.trim()
      }
    } catch (e) {
      console.warn('Gemini API fallback to domain engine:', e)
    }
  }

  // High-Intelligence Domain Reasoning Engine
  return generateDomainAIResponse(userInput)
}

function generateDomainAIResponse(input: string): string {
  const query = input.toLowerCase().trim()

  // 1. Stainless Steel queries
  if (query.includes('stainless') || query.includes('ss ') || query.includes('ss304') || query.includes('304') || query.includes('316') || query.includes('grade')) {
    if (query.includes('316') || query.includes('corrosion') || query.includes('marine')) {
      return "For high-corrosion or marine environments, Bansal Wire manufactures **SS 316 / 316L Wires** with 2-3% Molybdenum. Available in diameters from 0.04 mm to 12.00 mm for springs, filters, EPQ baskets, and chemical equipment."
    }
    if (query.includes('spring') || query.includes('tensile')) {
      return "Our **SS Spring Wires (AISI 302, 304, 316)** comply with ASTM A313 and EN 10270-3 standards, offering tensile strengths up to 2200 N/mm² with superior fatigue life and bright or matte surface finishes."
    }
    if (query.includes('welding') || query.includes('mig') || query.includes('tig')) {
      return "Bansal Wire supplies high-precision **MIG & TIG Stainless Steel Welding Wires** (ER308L, ER309L, ER316L) with uniform copper/clean matte finish, smooth cast and helix for zero jam feed."
    }
    return "Bansal Wire is India's **#1 Stainless Steel Wire Manufacturer** (20% national market share). We produce over 3,000 SKUs in grades 201, 204Cu, 304, 304L, 316, 302, and 430 across diameters 0.04 mm to 15.65 mm for cold heading, springs, weaving, fasteners, and scrubbers."
  }

  // 2. High Carbon & Springs
  if (query.includes('high carbon') || query.includes('carbon wire') || query.includes('hc') || query.includes('tyre bead') || query.includes('rope')) {
    if (query.includes('tyre') || query.includes('bead')) {
      return "Our **Tyre Bead Wire** features high tensile strength (up to 2150 MPa) with uniform Bronze/Brass coating for optimal rubber adhesion in passenger, radial, and heavy commercial vehicle tyres."
    }
    if (query.includes('rope')) {
      return "We manufacture **High Tensile Steel Wire Ropes** (galvanized & ungalvanized) from 0.50 mm to 6.00 mm for elevators, cranes, mining hoists, and general engineering applications."
    }
    return "Our **High Carbon Steel Wires** (C45 to C85 grades) are engineered for extreme elasticity and tensile loads, ideal for mechanical springs, mattress coils, wire ropes, and agricultural implements."
  }

  // 3. Galvanized & Mild Steel / Cable Armouring
  if (query.includes('galvanized') || query.includes('gi wire') || query.includes('mild steel') || query.includes('armouring') || query.includes('cable') || query.includes('binding') || query.includes('zinc')) {
    if (query.includes('cable') || query.includes('armour')) {
      return "Bansal Wire is a premier supplier of **Cable Armouring Galvanized Wires & Formed Strips** complying with IS 3975, BS 5467, and IEC 60502 standards with high zinc coating (up to 300 GSM) for power transmission cables."
    }
    return "We manufacture **Hot-Dip Galvanized & Mild Steel Wires** ranging from 0.80 mm to 5.00 mm with commercial or heavy zinc coatings (up to 300 GSM) for corrosion-resistant fencing, stay wires, ACSR conductor cores, and binding."
  }

  // 4. Shaped & Profile Wires
  if (query.includes('shaped') || query.includes('profile') || query.includes('flat') || query.includes('square') || query.includes('oval') || query.includes('strip')) {
    return "We specialize in precision cold-rolled and drawn **Shaped & Profile Wires** including Flat, Square, Half-Round, Oval, and Trapezoidal profiles with tight dimensional tolerances (±0.01 mm) for wipers, springs, and precision engineering."
  }

  // 5. Sizes / Diameters / Tolerances
  if (query.includes('size') || query.includes('diameter') || query.includes('thickness') || query.includes('gauge') || query.includes('swg') || query.includes('mm') || query.includes('tolerance')) {
    return "Our wire diameter manufacturing capabilities span from **ultra-fine 0.04 mm up to heavy 15.65 mm** with precision tolerances complying with ASTM, DIN, JIS, and IS international standards."
  }

  // 6. Quotation / Pricing / Cost
  if (query.includes('price') || query.includes('quote') || query.includes('cost') || query.includes('rate') || query.includes('order') || query.includes('rfq') || query.includes('buy') || query.includes('moq')) {
    return "Bansal Wire operates on a competitive **transparent raw-material Cost-Plus pricing model**. To receive an official quotation with technical datasheets, please use our **Contact Page RFQ form** or connect directly via WhatsApp at 011-23651890."
  }

  // 7. Testing, Quality & Certifications
  if (query.includes('quality') || query.includes('certificate') || query.includes('iso') || query.includes('mtc') || query.includes('test') || query.includes('lab') || query.includes('iatf')) {
    return "Bansal Wire is **ISO 9001:2015, ISO 14001:2015, and IATF 16949:2016 certified**. Every consignment is dispatched with an authentic **EN 10204 3.1 Mill Test Certificate (MTC)** verified by our computer-controlled metallurgical testing laboratories."
  }

  // 8. Exports & Global Shipping
  if (query.includes('export') || query.includes('country') || query.includes('shipping') || query.includes('seaworthy') || query.includes('international') || query.includes('global')) {
    return "We actively export to **over 50 countries across 5 continents**. All export orders are packaged in seaworthy, moisture-proof wrapping, wooden pallets, plastic spools, or orbital coils to prevent transit oxidation."
  }

  // 9. About Company, History, Plants, Dadri
  if (query.includes('about') || query.includes('history') || query.includes('capacity') || query.includes('plant') || query.includes('facility') || query.includes('dadri') || query.includes('ghaziabad') || query.includes('bse') || query.includes('nse')) {
    return "Established in **1938**, Bansal Wire Industries Ltd. operates **4 production units in Ghaziabad** and is constructing **Asia's mega single-location facility in Dadri, UP**, scaling total output beyond 206,000 MTPA. Listed on **BSE (544203)** and **NSE (BANSALWIRE)**."
  }

  // 10. Contact / Office / Phone / Email
  if (query.includes('contact') || query.includes('address') || query.includes('phone') || query.includes('email') || query.includes('location') || query.includes('delhi') || query.includes('office')) {
    return "🏢 **Corporate Office**: F-3, Main Road, Shastri Nagar, New Delhi – 110052, India.\n📞 **Phone**: 011-23651890-93\n✉️ **Email**: info@bansal-group.com | exports@bansalwire.com\n⏰ **Hours**: Mon – Sat, 9:00 AM – 6:00 PM IST."
  }

  // 11. Greeting
  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('namaste') || query === '') {
    return "Hello! I am your Bansal Wire AI Technical Consultant. How can I assist you today? You can ask about our wire grades (SS, High Carbon, GI), available diameters (0.04 - 15.65 mm), export packaging, or request a quick price quotation."
  }

  // Default intelligent assistant fallback
  return `Thank you for your inquiry about "${input}". As India's leading steel wire manufacturer with over 3,000 SKUs, Bansal Wire provides customized solutions across Stainless Steel, High Carbon, Mild Steel, Galvanized, and Shaped wires. Would you like detailed technical specifications or a fast-track price quotation for this requirement?`
}
