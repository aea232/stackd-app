import { useState, useEffect } from "react";

const PRESET_CARDS = [
  {
    id: "amex_platinum",
    name: "Amex Platinum",
    issuer: "American Express",
    color: "#E8E0D0",
    textColor: "#1a1a1a",
    accent: "#C9B07A",
    categories: { flights: 5, hotels: 5, dining: 1, groceries: 1, transit: 1, streaming: 1, gas: 1, other: 1 },
    annualFee: 895,
    perks: ["$600 hotel credit", "$200 Uber Cash", "$120 Uber One", "Centurion Lounge access", "TSA PreCheck/Global Entry"],
    pointSystem: "Membership Rewards",
  },
  {
    id: "amex_gold",
    name: "Amex Gold",
    issuer: "American Express",
    color: "#C9A84C",
    textColor: "#fff",
    accent: "#fff",
    categories: { dining: 4, groceries: 4, flights: 3, hotels: 1, transit: 1, streaming: 1, gas: 1, other: 1 },
    annualFee: 325,
    perks: ["$120 dining credit", "$120 Uber Cash", "4x at restaurants worldwide"],
    pointSystem: "Membership Rewards",
  },
  {
    id: "chase_sapphire_reserve",
    name: "Chase Sapphire Reserve",
    issuer: "Chase",
    color: "#2C2C2C",
    textColor: "#C9A84C",
    accent: "#C9A84C",
    categories: { flights: 5, hotels: 5, dining: 3, transit: 3, groceries: 1, streaming: 1, gas: 1, other: 1 },
    annualFee: 795,
    perks: ["$300 travel credit", "Priority Pass lounge access", "3x dining & travel", "Global Entry/TSA PreCheck"],
    pointSystem: "Chase Ultimate Rewards",
  },
  {
    id: "chase_sapphire_preferred",
    name: "Chase Sapphire Preferred",
    issuer: "Chase",
    color: "#1A3A6B",
    textColor: "#fff",
    accent: "#4A90D9",
    categories: { flights: 5, hotels: 5, dining: 3, streaming: 3, groceries: 3, transit: 2, gas: 1, other: 1 },
    annualFee: 95,
    perks: ["$50 annual hotel credit", "25% more value on Chase Travel", "10% anniversary points boost"],
    pointSystem: "Chase Ultimate Rewards",
  },
  {
    id: "chase_freedom_unlimited",
    name: "Chase Freedom Unlimited",
    issuer: "Chase",
    color: "#1A3A6B",
    textColor: "#fff",
    accent: "#4A90D9",
    categories: { dining: 3, drugstore: 3, flights: 5, hotels: 5, groceries: 1.5, transit: 1.5, streaming: 1.5, gas: 1.5, other: 1.5 },
    annualFee: 0,
    perks: ["No annual fee", "5% on Chase travel", "3% dining & drugstore", "1.5% on everything else"],
    pointSystem: "Chase Ultimate Rewards",
  },
  {
    id: "capital_one_venture_x",
    name: "Capital One Venture X",
    issuer: "Capital One",
    color: "#CC0000",
    textColor: "#fff",
    accent: "#fff",
    categories: { flights: 5, hotels: 5, rental_cars: 5, other: 2 },
    annualFee: 395,
    perks: ["$300 Capital One Travel credit", "10,000 anniversary miles", "Capital One Lounge access", "Priority Pass"],
    pointSystem: "Capital One Miles",
  },
  {
    id: "capital_one_venture",
    name: "Capital One Venture",
    issuer: "Capital One",
    color: "#8B0000",
    textColor: "#fff",
    accent: "#fff",
    categories: { flights: 5, hotels: 5, rental_cars: 5, other: 2 },
    annualFee: 95,
    perks: ["2x miles on everything", "$120 Global Entry/TSA PreCheck credit", "No foreign transaction fees"],
    pointSystem: "Capital One Miles",
  },
  {
    id: "capital_one_savor",
    name: "Capital One Savor",
    issuer: "Capital One",
    color: "#5A0F0F",
    textColor: "#fff",
    accent: "#fff",
    categories: { dining: 3, groceries: 3, entertainment: 3, streaming: 3, hotels: 5, flights: 5, gas: 1, other: 1 },
    annualFee: 0,
    perks: ["No annual fee", "3% dining, groceries & entertainment", "5% on Capital One Travel hotels/flights"],
    pointSystem: "Cashback",
  },
  {
    id: "citi_strata_elite",
    name: "Citi Strata Elite",
    issuer: "Citi",
    color: "#003B8E",
    textColor: "#fff",
    accent: "#fff",
    categories: { flights: 10, hotels: 10, dining: 4, groceries: 4, gas: 4, other: 1 },
    annualFee: 595,
    perks: ["10x on hotels & flights (Citi Travel)", "4x dining, groceries & gas", "Priority Pass + AA Admirals Club passes"],
    pointSystem: "Citi ThankYou Points",
  },
  {
    id: "discover",
    name: "Discover it",
    issuer: "Discover",
    color: "#F76F20",
    textColor: "#fff",
    accent: "#fff",
    categories: { rotating: 5, other: 1 },
    annualFee: 0,
    perks: ["Cashback match first year", "5% rotating categories", "No annual fee"],
    pointSystem: "Cashback",
  },
  {
    id: "amex_blue_cash_preferred",
    name: "Amex Blue Cash Preferred",
    issuer: "American Express",
    color: "#0072CE",
    textColor: "#fff",
    accent: "#fff",
    categories: { groceries: 6, streaming: 6, transit: 3, gas: 3, dining: 1, other: 1 },
    annualFee: 95,
    perks: ["6% at US supermarkets (up to $6k/yr)", "6% on select streaming", "3% transit & gas stations"],
    pointSystem: "Cashback",
  },
  {
    id: "wells_fargo_autograph",
    name: "Wells Fargo Autograph",
    issuer: "Wells Fargo",
    color: "#CC0000",
    textColor: "#fff",
    accent: "#fff",
    categories: { dining: 3, travel: 3, transit: 3, gas: 3, streaming: 3, phone: 3, other: 1 },
    annualFee: 0,
    perks: ["No annual fee", "3x on dining, travel, transit, gas & streaming", "No foreign transaction fees"],
    pointSystem: "Wells Fargo Rewards",
  },
  {
    id: "chase_freedom_flex",
    name: "Chase Freedom Flex",
    issuer: "Chase",
    color: "#0A2463",
    textColor: "#fff",
    accent: "#4A90D9",
    categories: { rotating: 5, flights: 5, hotels: 5, dining: 3, drugstore: 3, other: 1 },
    annualFee: 0,
    perks: ["No annual fee", "5% rotating categories (up to $1,500/qtr)", "5% on Chase Travel", "3% dining & drugstore", "Cell phone protection"],
    pointSystem: "Chase Ultimate Rewards",
  },
  {
    id: "citi_double_cash",
    name: "Citi Double Cash",
    issuer: "Citi",
    color: "#003B8E",
    textColor: "#fff",
    accent: "#6EB4F7",
    categories: { hotels: 5, rental_cars: 5, attractions: 5, other: 2 },
    annualFee: 0,
    perks: ["No annual fee", "2% on everything (1% when you buy + 1% when you pay)", "5% on Citi Travel hotels, rentals & attractions"],
    pointSystem: "Cashback / Citi ThankYou Points",
  },
  {
    id: "apple_card",
    name: "Apple Card",
    issuer: "Apple / Goldman Sachs",
    color: "#1C1C1E",
    textColor: "#fff",
    accent: "#A0A0A0",
    categories: { apple: 3, uber: 3, nike: 3, walgreens: 3, gas: 3, apple_pay: 2, other: 1 },
    annualFee: 0,
    perks: ["No annual fee, no fees of any kind", "3% at Apple, Uber, Nike, Walgreens, Exxon/Mobil", "2% on all Apple Pay purchases", "Daily Cash deposited instantly"],
    pointSystem: "Daily Cash",
  },
  {
    id: "capital_one_quicksilver",
    name: "Capital One Quicksilver",
    issuer: "Capital One",
    color: "#B22222",
    textColor: "#fff",
    accent: "#fff",
    categories: { hotels: 5, rental_cars: 5, other: 1.5 },
    annualFee: 0,
    perks: ["No annual fee", "1.5% on all purchases", "5% on hotels & rental cars via Capital One Travel", "No foreign transaction fees"],
    pointSystem: "Cashback",
  },
  {
    id: "wells_fargo_active_cash",
    name: "Wells Fargo Active Cash",
    issuer: "Wells Fargo",
    color: "#CD3700",
    textColor: "#fff",
    accent: "#fff",
    categories: { other: 2 },
    annualFee: 0,
    perks: ["No annual fee", "Unlimited 2% cash rewards on all purchases", "Cell phone protection up to $600"],
    pointSystem: "Cashback",
  },
  {
    id: "bofa_customized_cash",
    name: "BofA Customized Cash Rewards",
    issuer: "Bank of America",
    color: "#C8102E",
    textColor: "#fff",
    accent: "#fff",
    categories: { choice_category: 3, groceries: 2, wholesale: 2, other: 1 },
    annualFee: 0,
    perks: ["No annual fee", "3% on your choice category (gas, dining, travel, online shopping, etc.)", "2% at grocery stores & wholesale clubs", "Preferred Rewards members earn up to 75% more"],
    pointSystem: "Cashback",
  },
  {
    id: "delta_gold_amex",
    name: "Delta SkyMiles Gold Amex",
    issuer: "American Express",
    color: "#003366",
    textColor: "#fff",
    accent: "#C9A84C",
    categories: { flights: 3, hotels: 3, dining: 2, groceries: 2, other: 1 },
    annualFee: 150,
    perks: ["$0 intro fee first year, then $150", "First checked bag free", "Annual companion certificate", "15% off Delta award travel", "Priority boarding"],
    pointSystem: "Delta SkyMiles",
  },
  {
    id: "bilt_mastercard",
    name: "Bilt Mastercard",
    issuer: "Bilt / Wells Fargo",
    color: "#1A1A2E",
    textColor: "#fff",
    accent: "#7B68EE",
    categories: { rent: 1, dining: 3, travel: 2, other: 1 },
    annualFee: 0,
    perks: ["No annual fee", "Earn points on rent with NO transaction fee", "3x dining, 2x travel, 1x rent", "Transfer points 1:1 to major airlines & hotels", "Must make 5 transactions/month to earn points"],
    pointSystem: "Bilt Points",
  },
];

const CATEGORIES = [
  { key: "flights", label: "Flights", icon: "✈️" },
  { key: "hotels", label: "Hotels", icon: "🏨" },
  { key: "dining", label: "Dining", icon: "🍽️" },
  { key: "groceries", label: "Groceries", icon: "🛒" },
  { key: "transit", label: "Transit", icon: "🚇" },
  { key: "gas", label: "Gas", icon: "⛽" },
  { key: "streaming", label: "Streaming", icon: "📺" },
  { key: "other", label: "Everything Else", icon: "💳" },
];

export default function Stackd() {
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem("stackd_cards") || "[]"); } catch { return []; }
  });
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("stackd_history") || "[]"); } catch { return []; }
  });
  const [step, setStep] = useState("profile");
  const [purchaseInput, setPurchaseInput] = useState({ amount: "", category: "", description: "" });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addingCustom, setAddingCustom] = useState(false);
  const CUSTOM_CARD_DEFAULTS = {
    name: "", issuer: "", annualFee: "", pointSystem: "", color: "#1A1A2E",
    categories: { flights: "1", hotels: "1", dining: "1", groceries: "1", transit: "1", gas: "1", streaming: "1", other: "1" },
  };
  const [customCard, setCustomCard] = useState(CUSTOM_CARD_DEFAULTS);
  const [search, setSearch] = useState("");
  const [filterIssuer, setFilterIssuer] = useState("All");
  const [filterFee, setFilterFee] = useState("All");
  // Card analyzer
  const [analyzerCard, setAnalyzerCard] = useState(null);
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [analyzerResult, setAnalyzerResult] = useState(null);

  // Persist cards + history to localStorage
  useEffect(() => {
    try { localStorage.setItem("stackd_cards", JSON.stringify(cards)); } catch {}
  }, [cards]);
  useEffect(() => {
    try { localStorage.setItem("stackd_history", JSON.stringify(history)); } catch {}
  }, [history]);

  const ISSUERS = ["All", ...Array.from(new Set(PRESET_CARDS.map(c => c.issuer)))];

  const filteredCards = PRESET_CARDS.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.issuer.toLowerCase().includes(search.toLowerCase()) ||
      card.pointSystem.toLowerCase().includes(search.toLowerCase());
    const matchesIssuer = filterIssuer === "All" || card.issuer === filterIssuer;
    const matchesFee = filterFee === "All" ||
      (filterFee === "No Annual Fee" && card.annualFee === 0) ||
      (filterFee === "Has Annual Fee" && card.annualFee > 0);
    return matchesSearch && matchesIssuer && matchesFee;
  });

  const toggleCard = (card) => {
    setCards((prev) =>
      prev.find((c) => c.id === card.id)
        ? prev.filter((c) => c.id !== card.id)
        : [...prev, { ...card, authorizedUser: false }]
    );
  };

  const toggleAuthUser = (cardId) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, authorizedUser: !c.authorizedUser } : c))
    );
  };

  const analyzeCard = async (card) => {
    setAnalyzerLoading(true);
    setAnalyzerResult(null);
    const walletSummary = cards.map(c => ({ name: c.name, categories: c.categories, pointSystem: c.pointSystem, annualFee: c.annualFee }));
    const prompt = `You are an expert credit card rewards strategist. The user is considering adding this card: ${JSON.stringify({ name: card.name, issuer: card.issuer, categories: card.categories, annualFee: card.annualFee, perks: card.perks, pointSystem: card.pointSystem })}.

Their current wallet: ${JSON.stringify(walletSummary)}.

Analyze whether this card fills a gap or overlaps with their existing wallet. Consider:
- Does it add a new reward category not covered at 3x+ already?
- Does it introduce a new transferable points ecosystem?
- Is the annual fee justified given their likely spend patterns?
- Does it overlap heavily with existing cards?

Respond ONLY with a JSON object (no markdown, no backticks):
{
  "verdict": "Strong Add" | "Situational" | "Skip",
  "verdictReason": "One punchy sentence summarizing the verdict",
  "gapsItFills": ["gap1", "gap2"] or [],
  "overlaps": ["overlap1", "overlap2"] or [],
  "annualFeeJustified": true | false,
  "annualFeeReasoning": "one sentence on whether the fee is worth it given their wallet",
  "bestUseCase": "The single best scenario where this card shines for this user",
  "alternatives": ["existing card they already have that covers similar ground"] or [],
  "score": number from 1-10 representing how much value this adds to their specific wallet
}`;
    try {
      const res = await fetch("/.netlify/functions/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setAnalyzerResult({ ...JSON.parse(clean), cardName: card.name });
    } catch (e: any) { setAnalyzerResult({ error: e.message || "Something went wrong. Try again." }); }
    setAnalyzerLoading(false);
  };

  const addCustomCard = () => {
    if (!customCard.name.trim()) return;
    const newCard = {
      id: `custom_${Date.now()}`,
      name: customCard.name.trim(),
      issuer: customCard.issuer.trim() || "Custom",
      color: customCard.color,
      textColor: "#fff",
      accent: "#fff",
      categories: Object.fromEntries(
        Object.entries(customCard.categories).map(([k, v]) => [k, Math.max(1, parseFloat(v as string) || 1)])
      ),
      annualFee: parseFloat(customCard.annualFee) || 0,
      perks: [],
      pointSystem: customCard.pointSystem || "Cashback",
      isCustom: true,
    };
    setCards((prev) => [...prev, { ...newCard, authorizedUser: false }]);
    setAddingCustom(false);
    setCustomCard(CUSTOM_CARD_DEFAULTS);
  };

  const getRecommendation = async () => {
    if (!purchaseInput.amount || !purchaseInput.category) return;
    setLoading(true);
    setRecommendation(null);

    const cardSummary = cards.map((c) => ({
      name: c.name,
      pointSystem: c.pointSystem,
      multipliers: c.categories,
      perks: c.perks,
      annualFee: c.annualFee,
      authorizedUser: c.authorizedUser,
    }));

    const prompt = `You are an expert credit card rewards strategist. The user has these cards: ${JSON.stringify(cardSummary)}.

Purchase: $${purchaseInput.amount} for ${purchaseInput.description || purchaseInput.category} (category: ${purchaseInput.category}).

CRITICAL RULES you must follow precisely:
1. Point value benchmarks (cents per point): Amex Membership Rewards = 2.0, Chase Ultimate Rewards = 2.0, Capital One Miles = 1.7, Bilt Points = 2.2, Delta SkyMiles = 1.2, Citi ThankYou Points = 1.7, Cashback/Daily Cash/Wells Fargo Rewards = 1.0.
2. HOTEL BOOKINGS: Amex Platinum earns 5x ONLY on hotels booked through AmexTravel.com. Chase Sapphire Reserve earns 5x ONLY on hotels booked through Chase Travel portal. Chase Freedom Unlimited earns 5x ONLY on Chase Travel portal bookings — otherwise it earns 1.5x. If the purchase is a direct hotel booking (not through a portal), do NOT award portal multipliers.
3. TRANSFERABLE POINTS vs CASH BACK: Distinguish clearly. Cards like Chase Freedom Unlimited, Wells Fargo Active Cash, Capital One Quicksilver, Citi Double Cash, and Apple Card earn cash back or cash-equivalent rewards — NOT transferable points. Cards like Amex Platinum/Gold, Chase Sapphire Preferred/Reserve, Capital One Venture X, Bilt, and Citi Strata Elite earn transferable points worth more than face value. When the user is optimizing for points/miles, prefer transferable points cards.
4. AUTHORIZED USER cards: Note if the best card is one where the user is an authorized user, as redemption access may vary.
5. Always recommend the card that maximizes TOTAL VALUE (multiplier × cents per point), not just the highest multiplier.

Analyze ALL cards and respond ONLY with a JSON object (no markdown, no backticks):
{
  "bestCard": "exact card name",
  "multiplier": number (e.g. 4),
  "pointsEarned": number,
  "centsPerPoint": number,
  "dollarValueCents": "$X.XX (total value = pointsEarned * centsPerPoint / 100)",
  "effectiveCashbackPct": "X.X%",
  "rewardType": "Transferable Points" or "Cash Back" or "Airline Miles" or "Hotel Points",
  "reasoning": "2-3 sentences. Be specific: name the multiplier, the booking requirement if any, and the point value used.",
  "runnerUp": "exact card name",
  "runnerUpMultiplier": number,
  "runnerUpDollarValue": "$X.XX",
  "runnerUpReasoning": "one sentence on why it's second best",
  "stackStrategy": "Describe a specific stacking opportunity if one exists (e.g. Amex Offer + card spend, dining program + card, portal bonus + base card). Say null if none.",
  "stackCards": ["card1", "card2"] or null,
  "tip": "One specific, actionable pro tip. If a booking portal or specific merchant unlocks a higher rate, name it explicitly.",
  "warning": "One short caveat: booking restrictions, spending caps, auth user redemption limits, category exclusions. Say null if none."
}`;

    try {
      const res = await fetch("/.netlify/functions/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const text = data.content?.find((b) => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setRecommendation(JSON.parse(clean));
    } catch (e: any) {
      setRecommendation({ error: e.message || "Something went wrong. Try again." });
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      fontFamily: "'DM Sans', sans-serif",
      color: "#F0EDE8",
      padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .card-row:hover { transform: translateY(-1px); box-shadow: 0 4px 24px rgba(201,168,76,0.08); }
        .card-row { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .tab-btn { transition: all 0.18s ease; }
        .tab-btn:hover { color: #C9A84C !important; }
        .cta-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(201,168,76,0.25); }
        .cta-btn { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .result-card { animation: fadeSlideUp 0.35s ease both; }
        .result-card:nth-child(2) { animation-delay: 0.07s; }
        .result-card:nth-child(3) { animation-delay: 0.14s; }
        .result-card:nth-child(4) { animation-delay: 0.21s; }
        .result-card:nth-child(5) { animation-delay: 0.28s; }
        input:focus { border-color: rgba(201,168,76,0.5) !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.08) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }

        /* ── BOTTOM TAB BAR (mobile) ── */
        .bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
          background: rgba(10,10,10,0.97);
          border-top: 1px solid #1E1E1E;
          padding: 8px 0 env(safe-area-inset-bottom, 8px);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .bottom-nav-inner {
          display: flex; align-items: center; justify-content: space-around;
          max-width: 500px; margin: 0 auto;
        }
        .bottom-tab {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 6px 12px; border: none; background: transparent;
          cursor: pointer; flex: 1; min-width: 0;
        }
        .bottom-tab-icon { font-size: 15px; line-height: 1; font-weight: 300; }
        .bottom-tab-label { font-size: 10px; font-weight: 400; letter-spacing: 0.4px; white-space: nowrap; text-transform: uppercase; }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .top-nav-tabs { display: none !important; }
          .bottom-nav { display: block; }
          .main-content { padding: 20px 16px 100px !important; }
          .header-pad { padding: 14px 16px !important; }
          .stats-3col { grid-template-columns: 1fr 1fr !important; }
          .stats-4col { grid-template-columns: 1fr 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .filter-scroll { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
          .filter-scroll::-webkit-scrollbar { display: none; }
          .section-title { font-size: 22px !important; }
          .history-row { gap: 10px !important; }
          .history-desc { max-width: 120px; }
        }
      `}</style>

      {/* Header */}
      <div className="header-pad" style={{
        borderBottom: "1px solid transparent",
        backgroundImage: "linear-gradient(#0A0A0A, #0A0A0A), linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #C9A84C, #E8D49A)",
            borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, boxShadow: "0 2px 12px rgba(201,168,76,0.35)",
          }}>⚡</div>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, letterSpacing: "-0.3px" }}>
              Stackd
            </span>
            {cards.length > 0 && (
              <span style={{ fontSize: 11, color: "#555", marginLeft: 8 }}>{cards.length} cards</span>
            )}
          </div>
        </div>
        <div className="top-nav-tabs" style={{ display: "flex", gap: 2, background: "#111", borderRadius: 22, padding: "3px", border: "1px solid #1E1E1E" }}>
          {[["profile","My Cards"],["dashboard","Wallet"],["recommend","Optimize"],["history","History"],["analyzer","Card Check"]].map(([s, label]) => (
            <button key={s} onClick={() => setStep(s)} className="tab-btn" style={{
              padding: "7px 16px",
              borderRadius: 18,
              border: "none",
              background: step === s ? "linear-gradient(135deg, #C9A84C, #D4B46A)" : "transparent",
              color: step === s ? "#0A0A0A" : "#555",
              fontSize: 12,
              fontWeight: step === s ? 600 : 400,
              cursor: "pointer",
              letterSpacing: step === s ? "0.1px" : "0",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="main-content" style={{ maxWidth: 680, margin: "0 auto", padding: "36px 24px 80px" }}>

        {step === "profile" && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
                Build your card profile
              </h1>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Select every card in your wallet. We'll use this to maximize every purchase.</p>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <input
                placeholder="Search cards, issuers, or reward types..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10,
                  background: "#111", border: "1px solid #2A2A2A",
                  color: "#F0EDE8", fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
              />
              <div className="filter-scroll" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["All", "No Annual Fee", "Has Annual Fee"].map(opt => (
                  <button key={opt} onClick={() => setFilterFee(opt)} style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                    border: "1px solid", fontWeight: 500,
                    borderColor: filterFee === opt ? "#C9A84C" : "#2A2A2A",
                    background: filterFee === opt ? "rgba(201,168,76,0.1)" : "#111",
                    color: filterFee === opt ? "#C9A84C" : "#666",
                  }}>{opt}</button>
                ))}
                <div style={{ width: "1px", background: "#2A2A2A", margin: "0 4px" }} />
                {ISSUERS.map(issuer => (
                  <button key={issuer} onClick={() => setFilterIssuer(issuer)} style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                    border: "1px solid", fontWeight: 500,
                    borderColor: filterIssuer === issuer ? "#C9A84C" : "#2A2A2A",
                    background: filterIssuer === issuer ? "rgba(201,168,76,0.1)" : "#111",
                    color: filterIssuer === issuer ? "#C9A84C" : "#666",
                  }}>{issuer}</button>
                ))}
              </div>
              {(search || filterFee !== "All" || filterIssuer !== "All") && (
                <div style={{ fontSize: 12, color: "#555" }}>
                  {filteredCards.length} of {PRESET_CARDS.length} cards shown
                  <span onClick={() => { setSearch(""); setFilterFee("All"); setFilterIssuer("All"); }}
                    style={{ color: "#C9A84C", cursor: "pointer", marginLeft: 10 }}>Clear filters</span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {filteredCards.map((card) => {
                const selected = cards.find((c) => c.id === card.id);
                return (
                  <div key={card.id} className="card-row" style={{
                    border: "1px solid",
                    borderColor: selected ? "#C9A84C" : "#1E1E1E",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: selected ? "rgba(201,168,76,0.04)" : "#111",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", gap: 16, cursor: "pointer" }}
                      onClick={() => toggleCard(card)}>
                      {/* Mini card visual */}
                      <div style={{
                        width: 58, height: 37,
                        borderRadius: 7,
                        background: card.color,
                        flexShrink: 0,
                        display: "flex", alignItems: "flex-end",
                        padding: "4px 6px",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                        position: "relative", overflow: "hidden",
                      }}>
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: "50%",
                          background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
                          borderRadius: "7px 7px 0 0",
                        }} />
                        <span style={{ fontSize: 7, color: card.textColor, opacity: 0.85, fontWeight: 700, letterSpacing: "0.4px", position: "relative" }}>
                          {card.issuer.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 2 }}>{card.name}</div>
                        <div style={{ fontSize: 12, color: "#555" }}>
                          {card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`} · {card.pointSystem}
                        </div>
                      </div>
                      <div style={{
                        width: 22, height: 22,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: selected ? "#C9A84C" : "#333",
                        background: selected ? "#C9A84C" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12,
                      }}>
                        {selected && "✓"}
                      </div>
                    </div>

                    {selected && (
                      <div style={{ padding: "0 20px 16px", borderTop: "1px solid #1A1A1A" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12, marginBottom: 10 }}>
                          {card.perks.map((p, i) => (
                            <span key={i} style={{
                              fontSize: 11, padding: "3px 10px",
                              borderRadius: 12,
                              background: "rgba(201,168,76,0.1)",
                              color: "#C9A84C",
                              border: "1px solid rgba(201,168,76,0.2)",
                            }}>{p}</span>
                          ))}
                        </div>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#888" }}>
                          <input type="checkbox" checked={selected.authorizedUser || false}
                            onChange={() => toggleAuthUser(card.id)}
                            style={{ accentColor: "#C9A84C" }} />
                          I'm an authorized user on this card
                        </label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button onClick={() => setAddingCustom(true)} style={{
              width: "100%", padding: "13px 16px", marginBottom: 12,
              background: "transparent",
              border: "1px dashed #2A2A2A",
              borderRadius: 12, color: "#555", fontSize: 14,
              fontWeight: 500, cursor: "pointer", letterSpacing: "0.1px",
            }}>
              + Add a card not in the list
            </button>

            {cards.length > 0 && (
              <button onClick={() => setStep("recommend")} style={{
                width: "100%",
                padding: "16px",
                background: "linear-gradient(135deg, #C9A84C, #E8D49A)",
                border: "none",
                borderRadius: 12,
                color: "#0A0A0A",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.2px",
              }}>
                Optimize My Cards ({cards.length} selected) →
              </button>
            )}
          </>
        )}


        {step === "dashboard" && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
                Wallet Summary
              </h1>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
                {cards.length === 0 ? "Add cards in My Cards to see your wallet analysis." : `Your ${cards.length}-card wallet, analyzed.`}
              </p>
            </div>

            {cards.length === 0 ? (
              <div style={{ padding: 32, borderRadius: 16, background: "#111", border: "1px solid #1E1E1E", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
                <p style={{ color: "#555", margin: 0, fontSize: 14 }}>No cards added yet.</p>
                <span style={{ color: "#C9A84C", cursor: "pointer", fontSize: 14 }} onClick={() => setStep("profile")}>Build your profile →</span>
              </div>
            ) : (
              <>
                {/* Stat row */}
                <div className="stats-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {[
                    { label: "Cards", value: cards.length },
                    { label: "Annual Fees", value: "$" + cards.reduce((s, c) => s + (c.annualFee || 0), 0).toLocaleString() },
                    { label: "Reward Systems", value: new Set(cards.map(c => c.pointSystem)).size },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500, color: "#C9A84C" }}>{stat.value}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Best card per category */}
                <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Best Card by Category</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { key: "dining", label: "🍽️ Dining" },
                      { key: "groceries", label: "🛒 Groceries" },
                      { key: "flights", label: "✈️ Flights" },
                      { key: "hotels", label: "🏨 Hotels" },
                      { key: "gas", label: "⛽ Gas" },
                      { key: "streaming", label: "📺 Streaming" },
                      { key: "transit", label: "🚇 Transit" },
                      { key: "other", label: "💳 Everything Else" },
                    ].map(cat => {
                      const best = cards.reduce((best, card) => {
                        const rate = card.categories?.[cat.key] || card.categories?.other || 1;
                        const bestRate = best ? (best.categories?.[cat.key] || best.categories?.other || 1) : 0;
                        return rate > bestRate ? card : best;
                      }, null);
                      if (!best) return null;
                      const rate = best.categories?.[cat.key] || best.categories?.other || 1;
                      return (
                        <div key={cat.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1A1A1A" }}>
                          <span style={{ fontSize: 13, color: "#AAA" }}>{cat.label}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 13, fontWeight: 500, color: "#F0EDE8" }}>{best.name}</span>
                            <span style={{ fontSize: 12, color: "#C9A84C", fontWeight: 600, background: "rgba(201,168,76,0.1)", padding: "2px 8px", borderRadius: 8 }}>{rate}x</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Your cards list */}
                <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: 24, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#666", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Your Cards</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {cards.map(card => (
                      <div key={card.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                          width: 48, height: 30, borderRadius: 5,
                          background: card.color, flexShrink: 0,
                          display: "flex", alignItems: "flex-end", padding: "3px 5px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                        }}>
                          <span style={{ fontSize: 6, color: card.textColor, opacity: 0.8, fontWeight: 600, letterSpacing: "0.3px" }}>{card.issuer.toUpperCase()}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 500 }}>{card.name}{card.authorizedUser ? <span style={{ fontSize: 11, color: "#555", marginLeft: 6 }}>Auth User</span> : null}</div>
                          <div style={{ fontSize: 11, color: "#555" }}>{card.pointSystem}</div>
                        </div>
                        <div style={{ fontSize: 13, color: card.annualFee === 0 ? "#6B9E6B" : "#888" }}>
                          {card.annualFee === 0 ? "No fee" : `$${card.annualFee}/yr`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gaps / recommendations */}
                <div style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 16, padding: 24 }}>
                  <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>Wallet Insight</div>
                  <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.7 }}>
                    {(() => {
                      const hasNoFee = cards.some(c => c.annualFee === 0);
                      const hasDining = cards.some(c => (c.categories?.dining || 0) >= 3);
                      const hasTravel = cards.some(c => (c.categories?.flights || 0) >= 3);
                      const hasGrocery = cards.some(c => (c.categories?.groceries || 0) >= 3);
                      const totalFees = cards.reduce((s, c) => s + (c.annualFee || 0), 0);
                      const insights = [];
                      if (!hasDining) insights.push("Your wallet has no strong dining card (3x+). Consider adding Amex Gold or Chase Sapphire Preferred.");
                      if (!hasGrocery) insights.push("No grocery optimizer detected. Amex Blue Cash Preferred (6x) or Amex Gold (4x) would fill this gap.");
                      if (!hasTravel) insights.push("No premium travel card in your stack. Chase Sapphire Preferred or Capital One Venture X could unlock better flight and hotel rewards.");
                      if (totalFees > 500) insights.push(`You're paying $${totalFees}/yr in annual fees — make sure you're maxing credits to offset.`);
                      if (insights.length === 0) insights.push("Well-rounded wallet! Use the Optimize tab to make sure you're swiping the right card for every purchase.");
                      return insights.map((ins, i) => <div key={i} style={{ marginBottom: 8 }}>• {ins}</div>);
                    })()}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {step === "recommend" && (
          <>
            <div style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
                What are you buying?
              </h1>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Tell us the purchase and we'll tell you exactly which card to swipe.</p>
            </div>

            {cards.length === 0 && (
              <div style={{ padding: 32, borderRadius: 16, background: "#111", border: "1px solid #1E1E1E", marginBottom: 28, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>💳</div>
                <div style={{ fontSize: 15, color: "#555", marginBottom: 12 }}>No cards in your wallet yet.</div>
                <button onClick={() => setStep("profile")} style={{ padding: "8px 20px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.08)", color: "#C9A84C", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  Add your cards →
                </button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: "#444", fontWeight: 400, pointerEvents: "none" }}>$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={purchaseInput.amount}
                    onChange={(e) => setPurchaseInput((p) => ({ ...p, amount: e.target.value }))}
                    style={{
                      width: "100%", padding: "16px 16px 16px 32px", borderRadius: 12,
                      background: "#111", border: "1px solid #2A2A2A",
                      color: "#F0EDE8", fontSize: 22, fontWeight: 500,
                      outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Category</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {CATEGORIES.map((cat) => (
                    <button key={cat.key} onClick={() => setPurchaseInput((p) => ({ ...p, category: cat.key }))}
                      style={{
                        padding: "8px 14px", borderRadius: 20,
                        border: "1px solid",
                        borderColor: purchaseInput.category === cat.key ? "#C9A84C" : "#2A2A2A",
                        background: purchaseInput.category === cat.key ? "rgba(201,168,76,0.1)" : "#111",
                        color: purchaseInput.category === cat.key ? "#C9A84C" : "#888",
                        fontSize: 13, cursor: "pointer",
                      }}>
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>Description (optional)</label>
                <input
                  placeholder="e.g. Delta flight to LA, Whole Foods run..."
                  value={purchaseInput.description}
                  onChange={(e) => setPurchaseInput((p) => ({ ...p, description: e.target.value }))}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 10,
                    background: "#111", border: "1px solid #2A2A2A",
                    color: "#F0EDE8", fontSize: 14,
                    outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <button onClick={getRecommendation} className="cta-btn" disabled={loading || !purchaseInput.amount || !purchaseInput.category || cards.length === 0}
              style={{
                width: "100%", padding: "16px",
                background: loading ? "#1A1A1A" : "linear-gradient(135deg, #C9A84C, #E8D49A)",
                border: "none", borderRadius: 12,
                color: loading ? "#555" : "#0A0A0A",
                fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                marginBottom: 24,
              }}>
              {loading ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{animation:"pulse 1.2s ease infinite"}}>●</span> Analyzing your wallet...</span> : "Find the best card →"}
            </button>

            {recommendation && !recommendation.error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Winner card */}
                <div className="result-card" style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.03))",
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: 18, padding: 26,
                  boxShadow: "0 0 40px rgba(201,168,76,0.06)",
                }}>
                  <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Best Card</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500 }}>{recommendation.bestCard}</div>
                    {recommendation.rewardType && (
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 10, background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)", whiteSpace: "nowrap" }}>
                        {recommendation.rewardType}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, color: "#999", marginBottom: 20, lineHeight: 1.6 }}>{recommendation.reasoning}</div>

                  {/* Stats grid */}
                  <div className="stats-4col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 0 }}>
                    {[
                      { label: "Multiplier", value: `${recommendation.multiplier}x` },
                      { label: "Points", value: Number(recommendation.pointsEarned)?.toLocaleString() },
                      { label: "Est. Value", value: recommendation.dollarValueCents },
                      { label: "Eff. Cashback", value: recommendation.effectiveCashbackPct },
                    ].map(stat => (
                      <div key={stat.label} style={{ background: "rgba(0,0,0,0.35)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: "#C9A84C" }}>{stat.value}</div>
                        <div style={{ fontSize: 10, color: "#555", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.4px" }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Runner up */}
                <div className="result-card" style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Runner Up</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontWeight: 500, fontSize: 15 }}>{recommendation.runnerUp}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#666" }}>{recommendation.runnerUpDollarValue}</span>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#666" }}>{recommendation.runnerUpMultiplier}x</span>
                    </div>
                  </div>
                  {recommendation.runnerUpReasoning && (
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{recommendation.runnerUpReasoning}</div>
                  )}
                </div>

                {/* Stack strategy */}
                {recommendation.stackStrategy && recommendation.stackStrategy !== "null" && recommendation.stackCards && (
                  <div className="result-card" style={{
                    background: "rgba(107,158,107,0.06)", border: "1px solid rgba(107,158,107,0.25)",
                    borderRadius: 16, padding: 20,
                  }}>
                    <div style={{ fontSize: 11, color: "#6B9E6B", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>⚡ Stack Strategy</div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                      {recommendation.stackCards.map((c, i) => (
                        <span key={i} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 10, background: "rgba(107,158,107,0.1)", color: "#6B9E6B", border: "1px solid rgba(107,158,107,0.2)" }}>{c}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.6 }}>{recommendation.stackStrategy}</div>
                  </div>
                )}

                {/* Pro tip */}
                <div className="result-card" style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Pro Tip</div>
                  <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.6 }}>💡 {recommendation.tip}</div>
                </div>

                {/* Warning */}
                {recommendation.warning && recommendation.warning !== "null" && (
                  <div className="result-card" style={{ background: "rgba(180,120,60,0.06)", border: "1px solid rgba(180,120,60,0.2)", borderRadius: 16, padding: 20 }}>
                    <div style={{ fontSize: 11, color: "#B4783C", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>⚠️ Heads Up</div>
                    <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.6 }}>{recommendation.warning}</div>
                  </div>
                )}

              </div>
            )}

            {recommendation?.error && (
              <div style={{ padding: 16, borderRadius: 12, background: "#111", border: "1px solid #2A2A2A", color: "#888", fontSize: 14 }}>
                {recommendation.error}
              </div>
            )}

            {recommendation && !recommendation.error && (
              <button onClick={() => {
                const entry = {
                  id: Date.now(),
                  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                  description: purchaseInput.description || purchaseInput.category,
                  category: purchaseInput.category,
                  amount: parseFloat(purchaseInput.amount),
                  card: recommendation.bestCard,
                  multiplier: recommendation.multiplier,
                  pointsEarned: recommendation.pointsEarned,
                  dollarValue: recommendation.dollarValueCents,
                  rewardType: recommendation.rewardType,
                };
                setHistory(prev => [entry, ...prev]);
                setStep("history");
              }} className="cta-btn" style={{
                width: "100%", padding: "14px", marginTop: 8,
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: 12, color: "#C9A84C",
                fontSize: 14, fontWeight: 500, cursor: "pointer",
              }}>
                + Log this purchase
              </button>
            )}
          </>
        )}

        {step === "history" && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
                Purchase History
              </h1>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Every optimized purchase, logged and tracked.</p>
            </div>

            {history.length === 0 ? (
              <div style={{ padding: 48, borderRadius: 18, background: "#111", border: "1px solid #1E1E1E", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>📋</div>
                <div style={{ fontSize: 15, color: "#444", marginBottom: 16 }}>No purchases logged yet.</div>
                <button onClick={() => setStep("recommend")} style={{ padding: "9px 22px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.08)", color: "#C9A84C", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  Optimize a purchase →
                </button>
              </div>
            ) : (
              <>
                {/* Summary stats */}
                <div className="stats-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
                  {[
                    { label: "Total Spent", value: "$" + history.reduce((s, h) => s + h.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) },
                    { label: "Total Points", value: history.reduce((s, h) => s + (h.pointsEarned || 0), 0).toLocaleString() },
                    { label: "Est. Value Earned", value: (() => {
                      const total = history.reduce((s, h) => {
                        const num = parseFloat((h.dollarValue || "$0").replace(/[^0-9.]/g, ""));
                        return s + (isNaN(num) ? 0 : num);
                      }, 0);
                      return "$" + total.toFixed(2);
                    })() },
                  ].map(stat => (
                    <div key={stat.label} style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: "#C9A84C" }}>{stat.value}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Purchase list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {history.map((entry, i) => (
                    <div key={entry.id} className="result-card" style={{
                      background: "#111", border: "1px solid #1E1E1E",
                      borderRadius: 14, padding: "16px 20px",
                      display: "flex", alignItems: "center", gap: 16,
                      animationDelay: `${i * 0.04}s`,
                    }}>
                      {/* Category icon */}
                      <div style={{
                        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                        background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                      }}>
                        {CATEGORIES.find(c => c.key === entry.category)?.icon || "💳"}
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2, textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {entry.description}
                        </div>
                        <div style={{ fontSize: 12, color: "#555" }}>
                          {entry.card}
                          {entry.rewardType && <span style={{ marginLeft: 6, padding: "1px 7px", borderRadius: 8, background: "rgba(201,168,76,0.08)", color: "#8A7040", fontSize: 10, border: "1px solid rgba(201,168,76,0.12)" }}>{entry.rewardType}</span>}
                        </div>
                      </div>

                      {/* Right stats */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#F0EDE8" }}>${entry.amount.toLocaleString()}</div>
                        <div style={{ fontSize: 12, color: "#C9A84C", marginTop: 2 }}>{entry.dollarValue} earned</div>
                      </div>

                      {/* Delete */}
                      <button onClick={() => setHistory(prev => prev.filter(h => h.id !== entry.id))} style={{
                        background: "none", border: "none", color: "#333", cursor: "pointer",
                        fontSize: 16, padding: "4px", flexShrink: 0, lineHeight: 1,
                      }} title="Remove">×</button>
                    </div>
                  ))}
                </div>

                {history.length > 0 && (
                  <button onClick={() => setHistory([])} style={{
                    marginTop: 16, width: "100%", padding: "12px",
                    background: "transparent", border: "1px solid #2A2A2A",
                    borderRadius: 10, color: "#444", fontSize: 13, cursor: "pointer",
                  }}>
                    Clear all history
                  </button>
                )}
              </>
            )}
          </>
        )}


        {step === "analyzer" && (
          <>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, margin: "0 0 8px" }}>
                Should I get this card?
              </h1>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>Pick any card and we'll tell you if it actually adds value to your wallet.</p>
            </div>

            {cards.length === 0 && (
              <div style={{ padding: 24, borderRadius: 14, background: "#111", border: "1px solid #1E1E1E", marginBottom: 24, textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 10 }}>Add your current cards first so we can analyze the gaps.</div>
                <button onClick={() => setStep("profile")} style={{ padding: "8px 18px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.35)", background: "rgba(201,168,76,0.08)", color: "#C9A84C", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Build your profile →</button>
              </div>
            )}

            {/* Card picker */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#666", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 10 }}>Select a card to analyze</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRESET_CARDS.filter(c => !cards.find(owned => owned.id === c.id)).map(card => (
                  <div key={card.id} onClick={() => { setAnalyzerCard(card); setAnalyzerResult(null); }}
                    className="card-row"
                    style={{
                      border: "1px solid",
                      borderColor: analyzerCard?.id === card.id ? "#C9A84C" : "#1E1E1E",
                      borderRadius: 14, padding: "14px 18px",
                      background: analyzerCard?.id === card.id ? "rgba(201,168,76,0.05)" : "#111",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
                    }}>
                    <div style={{
                      width: 50, height: 32, borderRadius: 6, background: card.color, flexShrink: 0,
                      display: "flex", alignItems: "flex-end", padding: "3px 5px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)" }} />
                      <span style={{ fontSize: 6, color: card.textColor, opacity: 0.85, fontWeight: 700, letterSpacing: "0.4px", position: "relative" }}>{card.issuer.toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{card.name}</div>
                      <div style={{ fontSize: 11, color: "#555" }}>{card.annualFee === 0 ? "No annual fee" : `$${card.annualFee}/yr`} · {card.pointSystem}</div>
                    </div>
                    {analyzerCard?.id === card.id && (
                      <span style={{ fontSize: 12, color: "#C9A84C" }}>Selected ✓</span>
                    )}
                  </div>
                ))}
                {PRESET_CARDS.filter(c => !cards.find(owned => owned.id === c.id)).length === 0 && (
                  <div style={{ padding: 20, borderRadius: 12, background: "#111", border: "1px solid #1E1E1E", textAlign: "center", color: "#555", fontSize: 13 }}>
                    You already have all available cards in your wallet!
                  </div>
                )}
              </div>
            </div>

            {analyzerCard && (
              <button onClick={() => analyzeCard(analyzerCard)} className="cta-btn"
                disabled={analyzerLoading || cards.length === 0}
                style={{
                  width: "100%", padding: "15px",
                  background: analyzerLoading ? "#1A1A1A" : "linear-gradient(135deg, #C9A84C, #D4B46A)",
                  border: "none", borderRadius: 12,
                  color: analyzerLoading ? "#555" : "#0A0A0A",
                  fontSize: 15, fontWeight: 600, cursor: analyzerLoading ? "not-allowed" : "pointer",
                  marginBottom: 24,
                }}>
                {analyzerLoading
                  ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{animation:"pulse 1.2s ease infinite"}}>●</span> Analyzing your wallet...</span>
                  : `Analyze ${analyzerCard.name} →`}
              </button>
            )}

            {analyzerResult && !analyzerResult.error && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Verdict hero */}
                <div className="result-card" style={{
                  background: analyzerResult.verdict === "Strong Add"
                    ? "linear-gradient(135deg, rgba(107,158,107,0.14), rgba(107,158,107,0.03))"
                    : analyzerResult.verdict === "Skip"
                    ? "linear-gradient(135deg, rgba(180,80,80,0.12), rgba(180,80,80,0.03))"
                    : "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.03))",
                  border: `1px solid ${analyzerResult.verdict === "Strong Add" ? "rgba(107,158,107,0.3)" : analyzerResult.verdict === "Skip" ? "rgba(180,80,80,0.25)" : "rgba(201,168,76,0.3)"}`,
                  borderRadius: 18, padding: 26,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500 }}>{analyzerResult.cardName}</div>
                    <div style={{
                      padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                      background: analyzerResult.verdict === "Strong Add" ? "rgba(107,158,107,0.2)" : analyzerResult.verdict === "Skip" ? "rgba(180,80,80,0.2)" : "rgba(201,168,76,0.15)",
                      color: analyzerResult.verdict === "Strong Add" ? "#6B9E6B" : analyzerResult.verdict === "Skip" ? "#C05050" : "#C9A84C",
                      border: `1px solid ${analyzerResult.verdict === "Strong Add" ? "rgba(107,158,107,0.3)" : analyzerResult.verdict === "Skip" ? "rgba(180,80,80,0.25)" : "rgba(201,168,76,0.3)"}`,
                    }}>{analyzerResult.verdict}</div>
                  </div>
                  <div style={{ fontSize: 15, color: "#CCC", marginBottom: 20, lineHeight: 1.6 }}>{analyzerResult.verdictReason}</div>

                  {/* Score bar */}
                  <div style={{ marginBottom: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.5px" }}>Wallet Value Score</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#C9A84C" }}>{analyzerResult.score}/10</span>
                    </div>
                    <div style={{ height: 6, background: "#1A1A1A", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 4,
                        width: `${(analyzerResult.score / 10) * 100}%`,
                        background: analyzerResult.score >= 7 ? "linear-gradient(90deg, #6B9E6B, #8FBE8F)" : analyzerResult.score >= 4 ? "linear-gradient(90deg, #C9A84C, #E8D49A)" : "linear-gradient(90deg, #C05050, #D07070)",
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                  </div>
                </div>

                {/* Gaps + Overlaps */}
                <div className="result-card two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 11, color: "#6B9E6B", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>✓ Gaps It Fills</div>
                    {analyzerResult.gapsItFills?.length > 0
                      ? analyzerResult.gapsItFills.map((g, i) => <div key={i} style={{ fontSize: 13, color: "#AAA", marginBottom: 5, lineHeight: 1.4 }}>• {g}</div>)
                      : <div style={{ fontSize: 13, color: "#444" }}>No new gaps filled</div>}
                  </div>
                  <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 11, color: "#C05050", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>⚠ Overlaps</div>
                    {analyzerResult.overlaps?.length > 0
                      ? analyzerResult.overlaps.map((o, i) => <div key={i} style={{ fontSize: 13, color: "#AAA", marginBottom: 5, lineHeight: 1.4 }}>• {o}</div>)
                      : <div style={{ fontSize: 13, color: "#444" }}>No major overlaps</div>}
                  </div>
                </div> 

                {/* Annual fee + Best use case */}
                <div className="result-card" style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Annual Fee</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>${analyzerCard.annualFee}/yr</span>
                    <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 10, fontWeight: 500,
                      background: analyzerResult.annualFeeJustified ? "rgba(107,158,107,0.12)" : "rgba(180,80,80,0.1)",
                      color: analyzerResult.annualFeeJustified ? "#6B9E6B" : "#C05050",
                      border: `1px solid ${analyzerResult.annualFeeJustified ? "rgba(107,158,107,0.25)" : "rgba(180,80,80,0.2)"}`,
                    }}>{analyzerResult.annualFeeJustified ? "Justified" : "Hard to justify"}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{analyzerResult.annualFeeReasoning}</div>
                </div>

                <div className="result-card" style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Best Use Case For You</div>
                  <div style={{ fontSize: 14, color: "#AAA", lineHeight: 1.6 }}>💡 {analyzerResult.bestUseCase}</div>
                </div>

                {analyzerResult.alternatives?.length > 0 && (
                  <div className="result-card" style={{ background: "rgba(180,120,60,0.05)", border: "1px solid rgba(180,120,60,0.18)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 11, color: "#B4783C", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>You Already Have This Covered</div>
                    {analyzerResult.alternatives.map((a, i) => (
                      <div key={i} style={{ fontSize: 13, color: "#AAA", marginBottom: 4 }}>• {a}</div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {analyzerResult?.error && (
              <div style={{ padding: 16, borderRadius: 12, background: "#111", border: "1px solid #2A2A2A", color: "#888", fontSize: 14 }}>
                {analyzerResult.error}
              </div>
            )}
          </>
        )}

      {/* Bottom nav — mobile only */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {[
            ["profile",  "My Cards",   "▣"],
            ["dashboard","Wallet",     "◈"],
            ["recommend","Optimize",   "◎"],
            ["history",  "History",    "≡"],
            ["analyzer", "Card Check", "⊕"],
          ].map(([s, label, icon]) => (
            <button key={s} className="bottom-tab" onClick={() => setStep(s)} style={{
              color: step === s ? "#C9A84C" : "#3A3A3A",
              fontWeight: step === s ? 600 : 400,
            }}>
              <span className="bottom-tab-icon" style={{fontSize:15,fontWeight:400,letterSpacing:0}}>{icon}</span>
              <span className="bottom-tab-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>
      </div>

      {/* ── Custom Card Modal ── */}
      {addingCustom && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setAddingCustom(false); setCustomCard(CUSTOM_CARD_DEFAULTS); } }}
          style={{
            position: "fixed", inset: 0, zIndex: 500,
            background: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
        >
          <div style={{
            background: "#111", border: "1px solid #2A2A2A",
            borderRadius: "20px 20px 0 0",
            width: "100%", maxWidth: 620,
            maxHeight: "92vh", overflowY: "auto",
            padding: "28px 28px 44px",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, margin: 0 }}>
                Add Custom Card
              </h2>
              <button onClick={() => { setAddingCustom(false); setCustomCard(CUSTOM_CARD_DEFAULTS); }}
                style={{ background: "none", border: "none", color: "#555", fontSize: 26, cursor: "pointer", lineHeight: 1, padding: "0 4px" }}>×</button>
            </div>

            {/* Basic Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Card Name *</label>
                <input
                  placeholder="e.g. My Custom Rewards Card"
                  value={customCard.name}
                  onChange={e => setCustomCard(p => ({ ...p, name: e.target.value }))}
                  style={{ width: "100%", padding: "11px 14px", borderRadius: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#F0EDE8", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Issuer</label>
                  <input
                    placeholder="e.g. Chase, Amex..."
                    value={customCard.issuer}
                    onChange={e => setCustomCard(p => ({ ...p, issuer: e.target.value }))}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#F0EDE8", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Annual Fee ($)</label>
                  <input
                    type="number" min="0" placeholder="0"
                    value={customCard.annualFee}
                    onChange={e => setCustomCard(p => ({ ...p, annualFee: e.target.value }))}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#F0EDE8", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>

            {/* Reward Type */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 10 }}>Reward Type</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                {["Cashback", "Chase Ultimate Rewards", "Amex Membership Rewards", "Capital One Miles", "Citi ThankYou Points", "Bilt Points", "Delta SkyMiles", "Other Points"].map(ps => (
                  <button key={ps} onClick={() => setCustomCard(p => ({ ...p, pointSystem: ps }))} style={{
                    padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                    border: "1px solid",
                    borderColor: customCard.pointSystem === ps ? "#C9A84C" : "#2A2A2A",
                    background: customCard.pointSystem === ps ? "rgba(201,168,76,0.1)" : "#1A1A1A",
                    color: customCard.pointSystem === ps ? "#C9A84C" : "#666",
                    fontWeight: customCard.pointSystem === ps ? 500 : 400,
                  }}>{ps}</button>
                ))}
              </div>
              <input
                placeholder="Or type a custom reward system name..."
                value={["Cashback","Chase Ultimate Rewards","Amex Membership Rewards","Capital One Miles","Citi ThankYou Points","Bilt Points","Delta SkyMiles","Other Points"].includes(customCard.pointSystem) ? "" : customCard.pointSystem}
                onChange={e => setCustomCard(p => ({ ...p, pointSystem: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#F0EDE8", fontSize: 13, outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Card Color */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 10 }}>Card Color</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { color: "#1A1A2E", label: "Midnight" }, { color: "#1A3A6B", label: "Navy" },
                  { color: "#2C2C2C", label: "Slate" },    { color: "#C9A84C", label: "Gold" },
                  { color: "#8B0000", label: "Crimson" },  { color: "#003B8E", label: "Royal" },
                  { color: "#2D1A5E", label: "Violet" },   { color: "#1A3A2E", label: "Forest" },
                ].map(({ color, label }) => (
                  <div key={color} onClick={() => setCustomCard(p => ({ ...p, color }))} title={label}
                    style={{
                      width: 36, height: 36, borderRadius: 8, background: color, cursor: "pointer",
                      border: customCard.color === color ? "2px solid #C9A84C" : "2px solid transparent",
                      boxShadow: customCard.color === color ? "0 0 0 2px rgba(201,168,76,0.4)" : "0 0 0 1px #2A2A2A",
                      transition: "box-shadow 0.15s",
                    }} />
                ))}
              </div>
            </div>

            {/* Reward Multipliers */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>Reward Multipliers</label>
              <p style={{ fontSize: 12, color: "#444", margin: "0 0 14px" }}>Points or cash back earned per $1 spent in each category.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CATEGORIES.map(cat => {
                  const val = parseFloat(customCard.categories[cat.key as keyof typeof customCard.categories]) || 1;
                  return (
                    <div key={cat.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 13, color: "#888", minWidth: 140 }}>{cat.icon} {cat.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button
                          onClick={() => setCustomCard(p => ({ ...p, categories: { ...p.categories, [cat.key]: String(Math.max(1, val - 0.5)) } }))}
                          style={{ width: 30, height: 30, borderRadius: 8, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>−</button>
                        <input
                          type="number" min="1" max="20" step="0.5"
                          value={customCard.categories[cat.key as keyof typeof customCard.categories]}
                          onChange={e => setCustomCard(p => ({ ...p, categories: { ...p.categories, [cat.key]: e.target.value } }))}
                          style={{ width: 54, padding: "6px 8px", borderRadius: 8, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#F0EDE8", fontSize: 14, fontWeight: 500, outline: "none", textAlign: "center" }}
                        />
                        <span style={{ fontSize: 13, color: "#444", width: 14 }}>x</span>
                        <button
                          onClick={() => setCustomCard(p => ({ ...p, categories: { ...p.categories, [cat.key]: String(val + 0.5) } }))}
                          style={{ width: 30, height: 30, borderRadius: 8, background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            {customCard.name.trim() && (
              <div style={{ marginBottom: 24, padding: "16px 20px", borderRadius: 14, background: "#0D0D0D", border: "1px solid #1E1E1E", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 58, height: 37, borderRadius: 7, background: customCard.color, flexShrink: 0, display: "flex", alignItems: "flex-end", padding: "4px 6px", boxShadow: "0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)", borderRadius: "7px 7px 0 0" }} />
                  <span style={{ fontSize: 7, color: "#fff", opacity: 0.85, fontWeight: 700, letterSpacing: "0.4px", position: "relative" }}>{(customCard.issuer || "CUSTOM").toUpperCase()}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 2 }}>{customCard.name}</div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    {parseFloat(customCard.annualFee) > 0 ? `$${customCard.annualFee}/yr` : "No annual fee"} · {customCard.pointSystem || "Select reward type"}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => { setAddingCustom(false); setCustomCard(CUSTOM_CARD_DEFAULTS); }}
                style={{ flex: 1, padding: "13px", borderRadius: 10, background: "transparent", border: "1px solid #2A2A2A", color: "#666", fontSize: 14, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={addCustomCard} disabled={!customCard.name.trim()} style={{
                flex: 2, padding: "13px", borderRadius: 10,
                background: customCard.name.trim() ? "linear-gradient(135deg, #C9A84C, #E8D49A)" : "#1A1A1A",
                border: "none",
                color: customCard.name.trim() ? "#0A0A0A" : "#444",
                fontSize: 14, fontWeight: 600,
                cursor: customCard.name.trim() ? "pointer" : "not-allowed",
              }}>
                Add to Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}