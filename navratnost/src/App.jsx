import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

/* ─── DATA ─── */
const PROGRAMS = {
  ACC: { price: 169700, label: "CoachVille ACC", maxLevel: 3 },
  PCC: { price: 299700, label: "CoachVille ACC + PCC", maxLevel: 5 },
};

// Typical rate progression — presented as reference, not a promise
const LEVELS = [
  { key: "start",   label: "Start",   rate: 500,   period: "Měsíce 4–6",  note: "První klienti" },
  { key: "start2",  label: "Start+",  rate: 1000,  period: "Měsíce 7–9",  note: "Rostoucí praxe" },
  { key: "start3",  label: "Start++", rate: 1500,  period: "Měsíce 10–12", note: "Před certifikací" },
  { key: "acc",     label: "ACC",     rate: 2000,  period: "Rok 2",        note: "Po ACC certifikaci" },
  { key: "acc2",    label: "ACC+",    rate: 4000,  period: "Rok 2–3",      note: "Zkušený ACC kouč" },
  { key: "pcc",     label: "PCC",     rate: 5000,  period: "Rok 3–4",      note: "Po PCC certifikaci" },
  { key: "mcc",     label: "MCC",     rate: 7000,  period: "Rok 5+",       note: "Master Coach" },
  { key: "mcc2",    label: "MCC+",    rate: 12000, period: "Rok 7+",       note: "Top úroveň" },
];

const C = {
  navy: "#394A82",
  teal: "#38C0C3",
  gold: "#BF933A",
  black: "#000000",
  white: "#FFFFFF",
  cream: "#FAF9F5",
  dark: "#30302E",
  gray: "#6B7A9E",
  green: "#38C0C3",
  greenDark: "#16a34a",
  warn: "#fbbf24",
  // Functional aliases
  primary: "#394A82",
  accent: "#38C0C3",
  premium: "#BF933A",
  heroOverlay: "rgba(36,48,86,0.8)",
  gradBtn: "linear-gradient(135deg, #38C0C3, #2DA8AB)",
  gradHero: "linear-gradient(135deg, #EEF0F4, rgba(56,192,195,0.04))",
  gradCard: "linear-gradient(135deg, #394A82, #2E3D6B)",
  bg: "#FAF9F5",
  primaryGlow: "rgba(56,192,195,0.2)",
  primarySubtle: "rgba(56,192,195,0.05)",
  primaryBorder: "#D4D8E0",
  primaryMid: "rgba(56,192,195,0.05)",
};

function formatCZK(n) { return n.toLocaleString("cs-CZ") + " Kč"; }
function formatNum(n) { return Math.round(n).toLocaleString("cs-CZ"); }

/* ─── ANIMATED NUMBER ─── */
function Anim({ value, suffix = "" }) {
  const [d, setD] = useState(0);
  const ref = useRef(null);
  const st = useRef(null);
  const sv = useRef(0);
  useEffect(() => {
    sv.current = d; st.current = null;
    const go = (ts) => {
      if (!st.current) st.current = ts;
      const p = Math.min((ts - st.current) / 1000, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setD(Math.round(sv.current + (value - sv.current) * e));
      if (p < 1) ref.current = requestAnimationFrame(go);
    };
    ref.current = requestAnimationFrame(go);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  return <span>{d.toLocaleString("cs-CZ")}{suffix}</span>;
}

/* ─── SECTION ─── */
function Fade({ children, delay = 0, show = true }) {
  return (
    <div style={{
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ─── TOOLTIP ─── */
const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#FFFFFF", border: `1px solid ${C.primaryBorder}`,
      borderRadius: 10, padding: "10px 14px", fontFamily: "'Montserrat',sans-serif", fontSize: 14, boxShadow: '0 4px 16px rgba(57,74,130,0.12)',
    }}>
      <div style={{ color: "#5A6170", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.teal, fontWeight: 600 }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString("cs-CZ") : p.value}
          {p.dataKey === "rate" ? " Kč/hod" : p.dataKey === "hoursNeeded" ? " hod/týden" : ""}
        </div>
      ))}
    </div>
  );
};

/* ─── MAIN ─── */
export default function CoachVilleCalculator() {
  const [income, setIncome] = useState(50000);
  const [hours, setHours] = useState(8);
  const [program, setProgram] = useState("ACC");
  const [showResults, setShowResults] = useState(false);
  const [tab, setTab] = useState(0);
  const [pkgPrice, setPkgPrice] = useState(12000);
  const [pkgClients, setPkgClients] = useState(5);
  const [pkgIncrement, setPkgIncrement] = useState(2000);
  const resRef = useRef(null);

  const prog = PROGRAMS[program];
  const hrsMonth = hours * 4;

  // Core calculation: hours needed per week at each level to match income
  const levelsData = LEVELS.slice(0, prog.maxLevel + 3).map(lv => {
    const hrsWeekNeeded = income / lv.rate / 4;
    const hrsDayNeeded = hrsWeekNeeded / 4; // 4 coaching days
    const achievable = hrsWeekNeeded <= 20;
    const matchesInput = hrsWeekNeeded <= hours;
    return { ...lv, hrsWeekNeeded, hrsDayNeeded, achievable, matchesInput };
  });

  // Find the level where user's available hours are enough
  const matchLevel = levelsData.find(l => l.matchesInput);
  const matchLevelIndex = matchLevel ? levelsData.indexOf(matchLevel) : -1;

  // What they actually earn at their hours (for payback calc only — NOT shown as promise)
  // Conservative: months 1-3 = 0, then gradual ramp
  const monthRates = [];
  for (let m = 1; m <= 36; m++) {
    if (m <= 3) monthRates.push(0);
    else if (m <= 6) monthRates.push(500);
    else if (m <= 9) monthRates.push(1000);
    else if (m <= 12) monthRates.push(1500);
    else if (m <= 18) monthRates.push(2000);
    else if (m <= 24) monthRates.push(3000);
    else if (m <= 30) monthRates.push(4000);
    else monthRates.push(program === "PCC" ? 5000 : 4000);
  }

  // Optimistic (already conservative: 3 months zero, gradual ramp)
  let cumOpt = 0;
  let paybackOpt = null;
  for (let m = 0; m < monthRates.length; m++) {
    cumOpt += hours * 4 * monthRates[m];
    if (!paybackOpt && cumOpt >= prog.price) paybackOpt = m + 1;
  }

  // Pessimistic: 6 months zero, slower ramp, 70% utilization of hours
  const pessRates = [];
  for (let m = 1; m <= 48; m++) {
    if (m <= 6) pessRates.push(0);
    else if (m <= 10) pessRates.push(500);
    else if (m <= 14) pessRates.push(1000);
    else if (m <= 18) pessRates.push(1500);
    else if (m <= 24) pessRates.push(2000);
    else if (m <= 30) pessRates.push(2500);
    else if (m <= 36) pessRates.push(3000);
    else pessRates.push(program === "PCC" ? 4000 : 3500);
  }
  let cumPess = 0;
  let paybackPess = null;
  for (let m = 0; m < pessRates.length; m++) {
    cumPess += Math.round(hours * 4 * pessRates[m] * 0.7);
    if (!paybackPess && cumPess >= prog.price) paybackPess = m + 1;
  }
  if (!paybackPess) paybackPess = 48;
  if (!paybackOpt) paybackOpt = 36;

  const paybackMin = paybackOpt;
  const paybackMax = paybackPess;

  // Time freedom
  const savedMonth = 160 - hrsMonth;
  const savedYear = savedMonth * 12;
  const savedDaysYear = savedYear / 8;
  const saved5yr = savedYear * 5;
  const saved10yr = savedYear * 10;
  const yearsBack10 = Math.round(saved10yr / 8 / 230 * 10) / 10;

  // Chart: hours needed at each level (horizontal bar)
  const hoursChartData = levelsData.filter(l => l.rate > 0).map(l => ({
    name: `${l.label} (${formatCZK(l.rate)}/h)`,
    hoursNeeded: Math.round(l.hrsWeekNeeded * 10) / 10,
    matches: l.matchesInput,
    rate: l.rate,
  }));

  const handleCalc = () => {
    setShowResults(true);
    setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  };

  const tabs = [
    { id: 0, label: "⏱️ Kolik hodin potřebuji?" },
    { id: 1, label: "🕐 Kolik času získám?" },
    { id: 2, label: "💼 Balíčky" },
    { id: 3, label: "📊 Návratnost" },
  ];

  const sliderPct = (hours - 1) / 19 * 100;

  return (
    <div style={{ minHeight: "100vh", background: C.cream, color: C.black, fontFamily: "'Montserrat',sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ─── HERO ─── */}
      <div style={{ padding: "60px 20px 40px", maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{
          position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(56,192,195,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: C.gold, marginBottom: 20, fontWeight: 600 }}>
          CoachVille Kalkulačka
        </div>
        <h1 style={{
          fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(26px,5vw,42px)",
          fontWeight: 700, lineHeight: 1.2, margin: "0 0 20px",
          color: C.navy, textTransform: "uppercase",
        }}>
          Za jak dlouho a kolikrát se ti CoachVille investice vrátí?
        </h1>
        <p style={{ fontSize: 16, color: "#5A6170", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
          Zadej svůj současný příjem a počet hodin, které chceš koučovat týdně. Kalkulačka poté zobrazí několik perspektiv, které vycházejí z naší dlouholeté praktické zkušenosti. Žádné vzdušné zámky, pouze realita.
        </p>
      </div>

      {/* ─── INPUTS ─── */}
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{
          background: "#FFFFFF", border: "1px solid #E8EBF0",
          borderRadius: 20, padding: "36px 32px",
          boxShadow: "0 2px 12px rgba(57,74,130,0.06)",
        }}>
          {/* Income — THE primary input */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 14, color: "#5A6170", marginBottom: 6, fontWeight: 500 }}>
              Kolik si chcete měsíčně vydělávat koučováním?
            </label>
            <div style={{ fontSize: 12, color: "#8B919D", marginBottom: 12 }}>
              Tip: Zadejte svůj současný příjem — zjistíte, jak málo hodin potřebujete na stejnou částku.
            </div>
            <div style={{ position: "relative" }}>
              <input type="number" value={income}
                onChange={e => setIncome(Math.max(0, Number(e.target.value) || 0))}
                style={{
                  width: "100%", padding: "16px 80px 16px 16px", borderRadius: 12,
                  border: "1px solid #E2E5EA", background: "#FFFFFF",
                  color: C.black, fontSize: 22, fontWeight: 700,
                  fontFamily: "'Montserrat',sans-serif", outline: "none", boxSizing: "border-box",
                }}
              />
              <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#8B919D", fontSize: 14 }}>Kč/měs</span>
            </div>
          </div>

          {/* Hours slider */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <label style={{ fontSize: 14, color: "#5A6170", fontWeight: 500 }}>
                Kolik hodin týdně chcete koučovat?
              </label>
              <span style={{ fontSize: 32, fontWeight: 800, color: C.teal }}>{hours}</span>
            </div>
            <input type="range" min={1} max={20} value={hours}
              onChange={e => setHours(Number(e.target.value))}
              style={{
                width: "100%", height: 8, borderRadius: 4, appearance: "none",
                background: `linear-gradient(to right, #38C0C3 ${sliderPct}%, #E2E5EA ${sliderPct}%)`,
                cursor: "pointer", outline: "none",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginTop: 6 }}>
              <span>1 hod</span><span>5</span><span>10</span><span>15</span><span>20 hod</span>
            </div>
          </div>

          {/* Program */}
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 14, color: "#5A6170", marginBottom: 12, fontWeight: 500 }}>
              Vyberte program
            </label>
            <div style={{ display: "flex", gap: 12 }}>
              {Object.entries(PROGRAMS).map(([key, val]) => (
                <button key={key} onClick={() => setProgram(key)} style={{
                  flex: 1, padding: "14px 12px", borderRadius: 12,
                  border: program === key ? `2px solid ${C.teal}` : "1px solid #E2E5EA",
                  background: program === key ? C.primarySubtle : "#FFFFFF",
                  color: program === key ? C.teal : "#4A5578",
                  cursor: "pointer", transition: "all 0.3s",
                  fontFamily: "'Montserrat',sans-serif", fontSize: 14, fontWeight: 600, textAlign: "center",
                }}>
                  <div>{val.label}</div>
                  <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, opacity: 0.7 }}>{formatCZK(val.price)}</div>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleCalc} style={{
            width: "100%", padding: "18px", borderRadius: 14, border: "none",
            background: C.gradBtn, color: "#FFFFFF", fontSize: 17, fontWeight: 700,
            cursor: "pointer", fontFamily: "'Montserrat',sans-serif",
            textTransform: "uppercase", letterSpacing: "0.03em",
            boxShadow: `0 4px 24px ${C.primaryGlow}`, transition: "all 0.3s",
          }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Ukázat výsledky →
          </button>
        </div>
      </div>

      {/* ─── RESULTS ─── */}
      {showResults && (
        <div ref={resRef} style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 80px" }}>

          {/* ─── KEY INSIGHT ─── */}
          <Fade show={showResults} delay={0.1}>
            <div style={{
              textAlign: "center", marginBottom: 40, padding: "36px 24px",
              background: C.gradHero, borderRadius: 24, border: `1px solid ${C.primaryBorder}`,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0, width: 200, height: 200,
                background: `radial-gradient(circle, ${C.primarySubtle}, transparent 70%)`,
              }} />

              {matchLevel ? (
                <>
                  <div style={{ fontSize: 14, color: "#5A6170", marginBottom: 8 }}>
                    Pro váš cílový příjem {formatCZK(income)}/měs při {hours} hod/týden potřebujete
                  </div>
                  <div style={{
                    display: "inline-block", padding: "8px 24px", borderRadius: 12,
                    background: "rgba(56,192,195,0.1)", border: "1px solid rgba(56,192,195,0.25)",
                    marginBottom: 16,
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontSize: 32, fontWeight: 700, color: C.teal,
                    }}>
                      sazbu {formatCZK(matchLevel.rate)}/hod
                    </span>
                  </div>
                  <div style={{ fontSize: 15, color: "#5A6170", lineHeight: 1.6 }}>
                    Toho kouči typicky dosahují v období <strong style={{ color: C.navy }}>{matchLevel.period}</strong> ({matchLevel.note}).
                    <br />
                    Ve skutečnosti vám bude stačit jen <strong style={{ color: C.teal }}>{matchLevel.hrsWeekNeeded.toFixed(1)} hod/týden</strong> — a to je méně, než jste zadali.
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 14, color: "#5A6170", marginBottom: 12 }}>
                    Váš cílový příjem {formatCZK(income)}/měs při {hours} hod/týden vyžaduje
                  </div>
                  <div style={{ fontSize: 15, color: "#5A6170", lineHeight: 1.6 }}>
                    vyšší sazbu, než je dostupná na počáteční úrovni. Podívejte se níže, na jaké úrovni certifikace tohoto cíle dosáhnete — nebo zkuste navýšit počet hodin.
                  </div>
                </>
              )}
            </div>
          </Fade>

          {/* ─── TABS ─── */}
          <Fade show={showResults} delay={0.25}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 18, color: "#A0ADCC" }}>↓</span>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", letterSpacing: "0.03em" }}>
                Vyberte si pohled:
              </div>
            </div>
            <div style={{
              display: "flex", gap: 4, background: "#FFFFFF",
              borderRadius: 14, padding: 4, marginBottom: 28,
              border: "1px solid #E2E5EA", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
            }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: "12px 6px", borderRadius: 10, border: "none",
                  background: tab === t.id ? "rgba(56,192,195,0.12)" : "transparent",
                  color: tab === t.id ? "#1A7A7C" : "#5A6170",
                  fontSize: 13, fontWeight: tab === t.id ? 700 : 600, cursor: "pointer",
                  fontFamily: "'Montserrat',sans-serif", transition: "all 0.3s",
                }}>{t.label}</button>
              ))}
            </div>
          </Fade>

          {/* ═══ TAB 0: Hours needed ═══ */}
          {tab === 0 && (
            <Fade show={showResults} delay={0.35}>

              {/* Table — the hero of this tab */}
              <div style={{
                background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                borderRadius: 16, padding: "24px 20px", marginBottom: 28,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 4, textAlign: "center" }}>
                  Kolik hodin týdně potřebujete pro {formatCZK(income)}/měs?
                </h3>
                <p style={{ fontSize: 12, color: "#8B919D", textAlign: "center", marginBottom: 20 }}>
                  Typické hodinové sazby koučů na základě zkušeností CoachVille
                </p>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                      <tr>
                        {["Úroveň", "Sazba", "Hod/týden", "Hod/den", "Kdy typicky"].map(h => (
                          <th key={h} style={{
                            padding: "10px 8px", textAlign: "left", color: "#394A82",
                            fontSize: 12, fontWeight: 500, borderBottom: "1px solid #E8EBF0",
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {levelsData.filter(l => l.rate > 0).map((row, i) => {
                        const isMatch = row.matchesInput;
                        const isFirst = levelsData.filter(l => l.rate > 0).findIndex(l => l.matchesInput) === i;
                        return (
                          <tr key={i} style={{
                            background: isFirst ? "rgba(56,192,195,0.05)" : "transparent",
                          }}>
                            <td style={{
                              padding: "12px 8px", fontWeight: 600,
                              color: isMatch ? C.teal : "#5A6170",
                              borderBottom: "1px solid #F2F4F7",
                              position: "relative",
                            }}>
                              {isFirst && <span style={{
                                position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)",
                                color: C.teal, fontSize: 12,
                              }}>→</span>}
                              {row.label}
                            </td>
                            <td style={{ padding: "12px 8px", color: "#4A5578", borderBottom: "1px solid #F2F4F7" }}>
                              {formatCZK(row.rate)}/h
                            </td>
                            <td style={{
                              padding: "12px 8px", fontWeight: 700,
                              color: isMatch ? C.green : row.achievable ? C.warn : "#8B919D",
                              borderBottom: "1px solid #F2F4F7",
                              fontSize: 16,
                            }}>
                              {row.hrsWeekNeeded.toFixed(1)}
                              {isFirst && <span style={{ fontSize: 12, fontWeight: 400, color: C.green, marginLeft: 6 }}>✓ stačí</span>}
                            </td>
                            <td style={{ padding: "12px 8px", color: "#6B7280", borderBottom: "1px solid #F2F4F7" }}>
                              {row.hrsDayNeeded.toFixed(1)}
                            </td>
                            <td style={{ padding: "12px 8px", color: "#8B919D", fontSize: 12, borderBottom: "1px solid #F2F4F7" }}>
                              {row.period}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {matchLevel && (
                  <div style={{
                    marginTop: 16, padding: "12px 16px", borderRadius: 10,
                    background: "rgba(56,192,195,0.05)", border: `1px solid ${C.primaryBorder}`,
                    fontSize: 13, color: "#5A6170", lineHeight: 1.6, textAlign: "center",
                  }}>
                    Při sazbě <strong style={{ color: C.teal }}>{formatCZK(matchLevel.rate)}/hod</strong> a vašich{" "}
                    <strong style={{ color: C.navy }}>{hours} hodinách týdně</strong> dosáhnete svého cílového příjmu.
                    Ve skutečnosti potřebujete jen {matchLevel.hrsWeekNeeded.toFixed(1)} hod/týden — zbytek je váš prostor pro růst.
                  </div>
                )}
              </div>

              {/* Visual: horizontal bar chart — hours needed */}
              <div style={{
                background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                borderRadius: 16, padding: "24px 16px",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 20, textAlign: "center" }}>
                  Potřebný počet hodin pro dosažení vašeho cílového příjmu (dle úrovně certifikace)
                </h3>
                <ResponsiveContainer width="100%" height={hoursChartData.length * 48 + 40}>
                  <BarChart data={hoursChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" horizontal={false} />
                    <XAxis type="number"
                      tick={{ fill: "#5A6170", fontSize: 13 }}
                      axisLine={{ stroke: "#D4D8E0" }}
                      label={{ value: "hod/týden", position: "insideBottomRight", offset: -5, fill: "#A0ADCC", fontSize: 12 }}
                    />
                    <YAxis type="category" dataKey="name" width={160}
                      tick={{ fill: "#5A6170", fontSize: 12 }}
                      axisLine={{ stroke: "#D4D8E0" }}
                    />
                    <Tooltip content={<Tip />} />
                    <ReferenceLine x={hours} stroke={C.teal} strokeDasharray="6 3"
                      label={{ value: `Vaše dostupné hodiny: ${hours}`, fill: C.teal, fontSize: 12, position: "top" }}
                    />
                    <Bar dataKey="hoursNeeded" name="Potřebné hodiny" radius={[0, 6, 6, 0]} barSize={28}>
                      {hoursChartData.map((entry, i) => (
                        <Cell key={i}
                          fill={entry.matches ? C.navy : "#DDE0E7"}
                          opacity={entry.matches ? 1 : 0.6}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ textAlign: "center", fontSize: 15, color: "#1A1A1A", marginTop: 8 }}>
                  Modré sloupce = s vašimi hodinami dosáhnete cílového příjmu · Přerušovaná čára = vaše dostupné hodiny
                </div>
              </div>
            </Fade>
          )}

          {/* ═══ TAB 1: Time freedom — Day timeline ═══ */}
          {tab === 1 && (() => {
            const coachHoursDay = hours / 4; // for calculations only

            // Employee blocks
            const empBlocks = [
              { start: 6, end: 7, label: "Příprava", type: "prep" },
              { start: 7, end: 8, label: "Dojíždění", type: "commute" },
              { start: 8, end: 12, label: "Práce", type: "work" },
              { start: 12, end: 13, label: "Oběd", type: "break" },
              { start: 13, end: 17, label: "Práce", type: "work" },
              { start: 17, end: 18, label: "Dojíždění", type: "commute" },
              { start: 18, end: 20, label: "Volný čas", type: "free" },
            ];

            // Coach blocks — fixed illustrative schedule
            const coachBlocks = [
              { start: 6, end: 10, label: "Ráno pro sebe", type: "free" },
              { start: 10, end: 12, label: "Koučování", type: "coach" },
              { start: 12, end: 13, label: "Pauza", type: "free" },
              { start: 13, end: 15, label: "Koučování", type: "coach" },
              { start: 15, end: 20, label: "Volný čas", type: "free" },
            ];

            const blockColor = (type) => ({
              work: "#394A82",
              commute: "#5A6D9E",
              prep: "#5A6D9E",
              break: "#8B919D",
              coach: "#38C0C3",
              free: "#E4F6F6",
            }[type] || "#F0F2F5");

            const blockBorder = (type) => ({
              work: "1px solid #2E3D6B",
              commute: "1px solid #4A5D88",
              prep: "1px solid #4A5D88",
              break: "1px solid #7A8290",
              coach: "1px solid #2DA8AB",
              free: "1px solid #B8E6E7",
            }[type] || "1px solid #E8EBF0");

            const blockText = (type) => ({
              work: "#FFFFFF",
              commute: "#FFFFFF",
              prep: "#FFFFFF",
              break: "#FFFFFF",
              coach: "#FFFFFF",
              free: "#1A7A7C",
            }[type] || "#6B7280");

            const totalRange = 20 - 6; // 6:00 to 20:00

            const empFreeHours = 2;
            const coachFreeHours = 4 + 1 + 5; // 6-10 + 12-13 + 15-20
            const extraFreeHours = coachFreeHours - empFreeHours;

            const renderTimeline = (blocks, label) => (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#4A5578", marginBottom: 8 }}>
                  {label}
                </div>
                <div style={{ position: "relative", height: 56, borderRadius: 10, overflow: "hidden", display: "flex" }}>
                  {blocks.map((b, i) => {
                    const widthPct = ((b.end - b.start) / totalRange) * 100;
                    return (
                      <div key={i} style={{
                        width: `${widthPct}%`, height: "100%",
                        background: blockColor(b.type),
                        border: blockBorder(b.type),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexDirection: "column", padding: "2px 4px",
                        boxSizing: "border-box",
                        transition: "all 0.5s ease",
                      }}>
                        {widthPct > 8 && (
                          <span style={{
                            fontSize: widthPct > 15 ? 12 : 10,
                            fontWeight: 600,
                            color: blockText(b.type),
                            textAlign: "center",
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}>{b.label}</span>
                        )}
                        {widthPct > 12 && (
                          <span style={{ fontSize: 10, color: "#8B919D", marginTop: 2 }}>
                            {b.start}:00–{b.end > 20 ? "20" : b.end}:00
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );

            return (
              <Fade show={showResults} delay={0.2}>
                {/* Day timeline */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                  borderRadius: 16, padding: "28px 20px", marginBottom: 28,
                }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 6, textAlign: "center" }}>
                    Jeden den: zaměstnanec vs. kouč
                  </h3>
                  <p style={{ fontSize: 12, color: "#8B919D", textAlign: "center", marginBottom: 24 }}>
                    Při {hours} hodinách koučování týdně (4 koučovací dny)
                  </p>

                  {/* Time axis */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, padding: "0 2px" }}>
                    {[6,8,10,12,14,16,18,20].map(h => (
                      <span key={h} style={{ fontSize: 10, color: "#A0ADCC", width: 0, textAlign: "center" }}>
                        {h}:00
                      </span>
                    ))}
                  </div>

                  {renderTimeline(empBlocks, "👔 Zaměstnanec")}
                  <div style={{ height: 12 }} />
                  {renderTimeline(coachBlocks, "🎯 Kouč (4 hodiny koučování denně)")}

                  {/* Legend */}
                  <div style={{
                    display: "flex", gap: 16, justifyContent: "center", marginTop: 20, flexWrap: "wrap",
                  }}>
                    {[
                      { color: "#394A82", border: "#2E3D6B", label: "Práce / dojíždění" },
                      { color: "#38C0C3", border: "#2DA8AB", label: "Koučování" },
                      { color: "#E4F6F6", border: "#B8E6E7", label: "Volný čas" },
                    ].map((l, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 3, background: l.color, border: `1px solid ${l.border}` }} />
                        <span style={{ fontSize: 13, color: "#5A6170" }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key insight — simple, human-scale */}
                <div style={{
                  textAlign: "center", marginBottom: 28, padding: "28px 24px",
                  background: C.gradHero, borderRadius: 20, border: `1px solid ${C.primaryBorder}`,
                }}>
                  <div style={{ fontSize: 15, color: "#5A6170", lineHeight: 1.7 }}>
                    Jako kouč máte v jednom dni o
                  </div>
                  <div style={{
                    fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(40px,8vw,56px)",
                    fontWeight: 700, color: C.teal, margin: "8px 0",
                  }}>
                    {extraFreeHours > 0 ? `${Math.round(extraFreeHours * 10) / 10}` : "0"} hodin
                  </div>
                  <div style={{ fontSize: 15, color: "#5A6170", lineHeight: 1.7 }}>
                    více volného času než v zaměstnání.
                    {extraFreeHours >= 4 && <><br />To je jako mít každý den <strong style={{ color: C.navy }}>půl dne navíc</strong>.</>}
                    {extraFreeHours >= 8 && <><br />Koučujete jen 10–12 a 13–15 — zbytek dne je váš.</>}
                  </div>
                </div>

                {/* Week perspective */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                  borderRadius: 16, padding: "24px 20px", marginBottom: 28,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 20, textAlign: "center" }}>
                    Váš týden v číslech
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "Zaměstnání", days: "5 dnů", hrsDay: "8 hod/den", hrsWeek: "40 hod/týden", color: "#394A82" },
                      { label: "Koučování", days: "4 dny", hrsDay: `${coachHoursDay.toFixed(1)} hod/den`, hrsWeek: `${hours} hod/týden`, color: C.navy },
                    ].map((row, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
                        borderRadius: 10, background: i === 1 ? "rgba(56,192,195,0.05)" : "#FFFFFF",
                        border: i === 1 ? `1px solid ${C.primaryBorder}` : "1px solid #EEF0F4",
                      }}>
                        <div style={{
                          width: 8, height: 40, borderRadius: 4, background: row.color, flexShrink: 0,
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: i === 1 ? C.teal : "#4A5578" }}>
                            {row.label}
                          </div>
                          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                            {row.days} · {row.hrsDay}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 18, fontWeight: 700,
                          color: i === 1 ? C.teal : "#5A6170",
                          whiteSpace: "nowrap",
                        }}>
                          {row.hrsWeek}
                        </div>
                      </div>
                    ))}
                  </div>

                  {hours < 20 && (
                    <div style={{
                      marginTop: 16, padding: "10px 14px", borderRadius: 8,
                      background: "rgba(56,192,195,0.05)", border: "1px solid rgba(56,192,195,0.08)",
                      fontSize: 13, color: "#3D4250", textAlign: "center", lineHeight: 1.5,
                    }}>
                      {20 - hours >= 5 ? `Máte ještě ${20 - hours} hodin týdně prostoru navíc` : `Navíc máte prostor`} —
                      pro rodinu, koníčky, odpočinek, nebo další klienty.
                    </div>
                  )}
                </div>

                {/* What you gain — in human terms, no huge numbers */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                  borderRadius: 16, padding: "24px 20px",
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 16, textAlign: "center" }}>
                    Co to znamená v praxi?
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { emoji: "☀️", text: "Ráno od 6 do 10 máte jen pro sebe — sport, rodina, snídaně v klidu" },
                      { emoji: "📅", text: `Koučujete jen 4 dny v týdnu — ${hours <= 10 ? "pátek už je volný" : "máte 3 volné dny"}` },
                      { emoji: "🏠", text: "Žádné dojíždění — koučujete odkudkoli" },
                      { emoji: "🌅", text: "Od 15:00 máte volno — odpoledne a večery jsou vaše" },
                      { emoji: "✈️", text: "Můžete koučovat i na cestách — stačí vám notebook a 4 hodiny" },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 14px", borderRadius: 8,
                        background: "#FFFFFF",
                      }}>
                        <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
                        <span style={{ fontSize: 14, color: "#3D4250", lineHeight: 1.4 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            );
          })()}

          {/* ═══ TAB 2: Package-based ROI ═══ */}
          {tab === 2 && (() => {
            // Package model: 1 package = 12 sessions over 3 months (1 quarter)
            // Q1 = learning (0), then price grows by pkgIncrement each quarter
            const qPrices = [];
            let currentPrice = pkgPrice;
            for (let i = 0; i < 8; i++) {
              if (i === 0) {
                qPrices.push(0); // learning period
              } else {
                qPrices.push(currentPrice);
                currentPrice += pkgIncrement;
              }
            }

            const quarters = [
              { q: "Q1 (měs. 1–3)", price: 0, rev: 0, note: "Učení a praxe", year: 1 },
              { q: "Q2 (měs. 4–6)", price: qPrices[1], rev: pkgClients * qPrices[1], note: "První balíčky", year: 1 },
              { q: "Q3 (měs. 7–9)", price: qPrices[2], rev: pkgClients * qPrices[2], note: "Rostoucí praxe", year: 1 },
              { q: "Q4 (měs. 10–12)", price: qPrices[3], rev: pkgClients * qPrices[3], note: "Před certifikací", year: 1 },
              { q: "Q5 (rok 2)", price: qPrices[4], rev: pkgClients * qPrices[4], note: "ACC úroveň", year: 2 },
              { q: "Q6 (rok 2)", price: qPrices[5], rev: pkgClients * qPrices[5], note: "ACC úroveň", year: 2 },
              { q: "Q7 (rok 2)", price: qPrices[6], rev: pkgClients * qPrices[6], note: "ACC úroveň", year: 2 },
              { q: "Q8 (rok 2)", price: qPrices[7], rev: pkgClients * qPrices[7], note: "ACC úroveň", year: 2 },
            ];

            const year1Total = quarters.filter(q => q.year === 1).reduce((s, q) => s + q.rev, 0);
            const year2Total = quarters.filter(q => q.year === 2).reduce((s, q) => s + q.rev, 0);
            const twoYearTotal = year1Total + year2Total;

            let pkgCum = 0;
            let pkgPaybackQ = null;
            const quartersWithCum = quarters.map((q, i) => {
              pkgCum += q.rev;
              if (!pkgPaybackQ && pkgCum >= prog.price) pkgPaybackQ = i + 1;
              return { ...q, cumulative: pkgCum, paid: pkgCum >= prog.price };
            });

            // Bar chart data
            const chartData = quartersWithCum.map(q => ({
              name: q.q.split(" ")[0],
              výdělek: q.rev,
              kumulativně: q.cumulative,
              year: q.year,
            }));

            // Per-session price for context
            const perSession = Math.round(pkgPrice / 12);

            return (
              <Fade show={showResults} delay={0.2}>
                {/* Inputs for this tab */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0",
                  borderRadius: 16, padding: "24px 20px", marginBottom: 28,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 16, textAlign: "center" }}>
                    Nastavte si svůj balíček
                  </h3>
                  <p style={{ fontSize: 12, color: "#8B919D", textAlign: "center", marginBottom: 20 }}>
                    Balíček = 12 koučovacích setkání na 3 měsíce (1 setkání týdně)
                  </p>

                  {/* Package price */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <label style={{ fontSize: 14, color: "#5A6170", fontWeight: 500 }}>
                        Cena balíčku (12 setkání)
                      </label>
                      <span style={{ fontSize: 24, fontWeight: 800, color: C.teal }}>
                        {formatCZK(pkgPrice)}
                      </span>
                    </div>
                    <input type="range" min={6000} max={50000} step={1000} value={pkgPrice}
                      onChange={e => setPkgPrice(Number(e.target.value))}
                      style={{
                        width: "100%", height: 8, borderRadius: 4, appearance: "none",
                        background: `linear-gradient(to right, #38C0C3 ${(pkgPrice - 6000) / 44000 * 100}%, #E2E5EA ${(pkgPrice - 6000) / 44000 * 100}%)`,
                        cursor: "pointer", outline: "none",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                      <span>6 000 Kč</span><span>15 000</span><span>30 000</span><span>50 000 Kč</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#8B919D", marginTop: 8, textAlign: "center" }}>
                      = {formatCZK(perSession)} za jedno setkání
                    </div>
                  </div>

                  {/* Number of clients */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <label style={{ fontSize: 14, color: "#5A6170", fontWeight: 500 }}>
                        Počet klientů na balíčku
                      </label>
                      <span style={{ fontSize: 24, fontWeight: 800, color: C.teal }}>
                        {pkgClients}
                      </span>
                    </div>
                    <input type="range" min={1} max={20} value={pkgClients}
                      onChange={e => setPkgClients(Number(e.target.value))}
                      style={{
                        width: "100%", height: 8, borderRadius: 4, appearance: "none",
                        background: `linear-gradient(to right, #38C0C3 ${(pkgClients - 1) / 19 * 100}%, #E2E5EA ${(pkgClients - 1) / 19 * 100}%)`,
                        cursor: "pointer", outline: "none",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                      <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
                    </div>
                  </div>

                  {/* Quarterly price increment */}
                  <div style={{ marginTop: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <label style={{ fontSize: 14, color: "#5A6170", fontWeight: 500 }}>
                        Kvartální navýšení ceny
                      </label>
                      <span style={{ fontSize: 24, fontWeight: 800, color: pkgIncrement > 0 ? C.teal : "#8B919D" }}>
                        {pkgIncrement > 0 ? `+${formatCZK(pkgIncrement)}` : "0 Kč"}
                      </span>
                    </div>
                    <input type="range" min={0} max={10000} step={500} value={pkgIncrement}
                      onChange={e => setPkgIncrement(Number(e.target.value))}
                      style={{
                        width: "100%", height: 8, borderRadius: 4, appearance: "none",
                        background: `linear-gradient(to right, #38C0C3 ${pkgIncrement / 10000 * 100}%, #E2E5EA ${pkgIncrement / 10000 * 100}%)`,
                        cursor: "pointer", outline: "none",
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                      <span>0 Kč</span><span>2 500</span><span>5 000</span><span>7 500</span><span>10 000 Kč</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#8B919D", marginTop: 8, textAlign: "center" }}>
                      {pkgIncrement > 0
                        ? `Cena balíčku: Q2 = ${formatCZK(pkgPrice)} → Q8 = ${formatCZK(pkgPrice + pkgIncrement * 6)}`
                        : "S rostoucí praxí a certifikací je přirozené cenu postupně zvyšovat"
                      }
                    </div>
                  </div>
                </div>

                {/* Quarterly breakdown table */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                  borderRadius: 16, padding: "24px 20px", marginBottom: 28,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 16, textAlign: "center" }}>
                    Výdělek po čtvrtletích
                  </h3>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr>
                          {["Období", "Klienti", "Cena bal.", "Výdělek", "Kumulativně"].map(h => (
                            <th key={h} style={{
                              padding: "10px 8px", textAlign: "left", color: "#394A82",
                              fontSize: 12, fontWeight: 500, borderBottom: "1px solid #E8EBF0",
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {quartersWithCum.map((q, i) => {
                          const isPayback = pkgPaybackQ === i + 1;
                          return (
                            <tr key={i} style={{
                              background: isPayback ? "rgba(56,192,195,0.05)" : "transparent",
                            }}>
                              <td style={{
                                padding: "10px 8px", fontWeight: 600,
                                color: q.rev === 0 ? "#8B919D" : "#4A5578",
                                borderBottom: "1px solid #F2F4F7",
                                fontSize: 13,
                              }}>
                                {q.q}
                                <div style={{ fontSize: 12, fontWeight: 400, color: "#A0ADCC", marginTop: 2 }}>{q.note}</div>
                              </td>
                              <td style={{ padding: "10px 8px", color: "#5A6170", borderBottom: "1px solid #F2F4F7" }}>
                                {q.rev === 0 ? "—" : pkgClients}
                              </td>
                              <td style={{ padding: "10px 8px", color: "#5A6170", borderBottom: "1px solid #F2F4F7" }}>
                                {q.rev === 0 ? "—" : formatCZK(q.price)}
                              </td>
                              <td style={{
                                padding: "10px 8px", fontWeight: 700,
                                color: q.rev === 0 ? "#B0B5BD" : C.teal,
                                borderBottom: "1px solid #F2F4F7",
                              }}>
                                {q.rev === 0 ? "0 Kč" : formatCZK(q.rev)}
                              </td>
                              <td style={{
                                padding: "10px 8px", fontWeight: 600,
                                color: q.paid ? C.green : "#6B7280",
                                borderBottom: "1px solid #F2F4F7",
                              }}>
                                {formatCZK(q.cumulative)}
                                {isPayback && <span style={{ fontSize: 12, color: C.green, marginLeft: 6 }}>✓ splaceno</span>}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Investment reference line note */}
                  <div style={{
                    marginTop: 16, padding: "10px 14px", borderRadius: 8,
                    background: "#FFFFFF",
                    fontSize: 12, color: "#8B919D", lineHeight: 1.5, textAlign: "center",
                  }}>
                    Investice do programu: <strong style={{ color: "#4A5578" }}>{formatCZK(prog.price)}</strong>
                    {pkgPaybackQ && <> · Splatí se v <strong style={{ color: C.teal }}>{pkgPaybackQ}. čtvrtletí</strong></>}
                  </div>
                </div>

                {/* Visual bar chart */}
                <div style={{
                  background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                  borderRadius: 16, padding: "24px 16px", marginBottom: 28,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 20, textAlign: "center" }}>
                    Kumulativní výdělek z balíčků
                  </h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" />
                      <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={{ stroke: "#D4D8E0" }} />
                      <YAxis tick={{ fill: "#5A6170", fontSize: 13 }} axisLine={{ stroke: "#D4D8E0" }}
                        tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<Tip />} />
                      <ReferenceLine y={prog.price} stroke="#ef4444" strokeDasharray="8 4"
                        label={{ value: `Investice ${formatCZK(prog.price)}`, fill: "#ef4444", fontSize: 12, position: "right" }}
                      />
                      <Bar dataKey="kumulativně" name="Kumulativní výdělek" radius={[6, 6, 0, 0]}>
                        {chartData.map((entry, i) => (
                          <Cell key={i}
                            fill={entry.kumulativně >= prog.price ? C.navy : entry.výdělek === 0 ? "#E8EBF0" : C.teal}
                            opacity={entry.kumulativně >= prog.price ? 1 : 0.6}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ textAlign: "center", fontSize: 12, color: "#A0ADCC", marginTop: 8 }}>
                    Červená čára = vaše investice do programu · Modré sloupce = kumulativní příjem z balíčků
                  </div>
                </div>

                {/* Year summaries */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                  <div style={{
                    flex: 1, minWidth: 200, padding: "20px", borderRadius: 14,
                    background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>1. rok (od 4. měsíce)</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>
                      <Anim value={year1Total} suffix=" Kč" />
                    </div>
                    <div style={{ fontSize: 12, color: "#8B919D", marginTop: 4 }}>
                      {pkgClients} klientů × 3 čtvrtletí{pkgIncrement > 0 ? ` · cena roste o ${formatCZK(pkgIncrement)}/Q` : ""}
                    </div>
                  </div>
                  <div style={{
                    flex: 1, minWidth: 200, padding: "20px", borderRadius: 14,
                    background: "rgba(56,192,195,0.06)", border: "1px solid rgba(56,192,195,0.2)",
                    boxShadow: "0 2px 8px rgba(56,192,195,0.08)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 13, color: "#1A7A7C", marginBottom: 8, fontWeight: 600 }}>2. rok (ACC úroveň)</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>
                      <Anim value={year2Total} suffix=" Kč" />
                    </div>
                    <div style={{ fontSize: 12, color: "#5A6170", marginTop: 4 }}>
                      {pkgClients} klientů × 4 čtvrtletí{pkgIncrement > 0 ? ` · cena roste o ${formatCZK(pkgIncrement)}/Q` : ""}
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div style={{
                  padding: "16px 20px", borderRadius: 12,
                  background: "#FFFFFF", border: "1px solid #F0F2F5",
                  fontSize: 13, color: "#6B7280", lineHeight: 1.6, textAlign: "center",
                }}>
                  {pkgIncrement > 0 ? (
                    `Cena balíčku roste každé čtvrtletí o ${formatCZK(pkgIncrement)} — 
                    od ${formatCZK(pkgPrice)} v Q2 až po ${formatCZK(qPrices[7])} v Q8.
                    To odpovídá přirozenému růstu s praxí a certifikací. Skutečná cena závisí na vaší specializaci a klientele.`
                  ) : (
                    `Cena balíčku je po celé 2 roky stejná (${formatCZK(pkgPrice)}). 
                    Zkuste posunout slider "Kvartální navýšení ceny" — s rostoucí praxí je přirozené cenu zvyšovat.`
                  )}
                </div>
              </Fade>
            );
          })()}

          {/* ═══ TAB 3: Investment payback ═══ */}
          {tab === 3 && (
            <Fade show={showResults} delay={0.2}>
              <div style={{
                textAlign: "center", marginBottom: 28, padding: "32px 24px",
                background: "#FFFFFF", borderRadius: 20, border: "1px solid #EEF0F4",
              }}>
                <div style={{
                  display: "inline-block", padding: "4px 14px", borderRadius: 20,
                  background: "#EEF0F4", border: "1px solid #E2E5EA",
                  fontSize: 12, color: "#6B7280", marginBottom: 16, fontWeight: 500,
                }}>
                  📊 Konzervativní výpočet · první 3 měsíce bez příjmu
                </div>

                <div style={{ fontSize: 14, color: "#5A6170", marginBottom: 8 }}>
                  Na základě vašich vstupů ({hours} hod/týden) a různých scénářů:
                </div>
                <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, lineHeight: 1.6 }}>
                  Investice <strong style={{ color: C.navy }}>{formatCZK(prog.price)}</strong> se při postupném růstu sazeb pokryje přibližně za
                </div>
                <div style={{
                  fontFamily: "'Montserrat',sans-serif",
                  fontSize: "clamp(40px,8vw,56px)", fontWeight: 800,
                  color: C.teal, lineHeight: 1,
                }}>
                  {paybackMin}–{paybackMax}
                </div>
                <div style={{ fontSize: 20, color: C.teal, fontWeight: 600, marginTop: 4, marginBottom: 12 }}>
                  měsíců
                </div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, maxWidth: 440, margin: "0 auto" }}>
                  Rozpětí závisí na tom, jak rychle získáte první klienty a jak se bude vyvíjet vaše praxe.
                  Spodní odhad předpokládá rychlejší start, horní počítá s pomalejším rozjezdem a nižší vytížeností.
                </div>
              </div>

              {/* Assumptions box — two scenarios */}
              <div style={{
                background: "#FFFFFF", border: "1px solid #E8EBF0", boxShadow: "0 1px 4px rgba(57,74,130,0.05)",
                borderRadius: 16, padding: "24px 20px", marginBottom: 28,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#394A82", marginTop: 0, marginBottom: 16, textAlign: "center" }}>
                  Dva scénáře výpočtu
                </h3>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
                  {/* Scenario A */}
                  <div style={{ flex: 1, minWidth: 220, padding: "16px", borderRadius: 12, background: "rgba(56,192,195,0.05)", border: `1px solid ${C.primaryBorder}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, marginBottom: 10 }}>
                      Rychlejší start — {paybackMin} měsíců
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}>
                      3 měsíce bez příjmu, 100% využití hodin, postupný růst sazeb: 500 → 1 000 → 1 500 → 2 000+ Kč/hod
                    </div>
                  </div>
                  {/* Scenario B */}
                  <div style={{ flex: 1, minWidth: 220, padding: "16px", borderRadius: 12, background: "#FFFFFF", border: "1px solid #E8EBF0" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#4A5578", marginBottom: 10 }}>
                      Pomalejší rozjezd — {paybackMax} měsíců
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}>
                      6 měsíců bez příjmu, 70% vytížení hodin, pomalejší přechod mezi sazbami, opatrný růst
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: "10px 14px", borderRadius: 8,
                  background: "#FFFFFF",
                  fontSize: 12, color: "#8B919D", lineHeight: 1.5, textAlign: "center",
                }}>
                  Oba scénáře jsou odhady na základě typického průběhu u koučů CoachVille.
                  Vaše skutečné výsledky závisí na vašem nasazení, praxi a tržních podmínkách.
                </div>
              </div>

            </Fade>
          )}

          {/* ─── SOCIAL PROOF ─── */}
          <Fade show={showResults} delay={0.5}>
            <div style={{
              marginTop: 40, padding: "20px 24px", background: "#FFFFFF",
              borderRadius: 14, border: "1px solid #F0F2F5", textAlign: "center",
            }}>
              <div style={{ fontSize: 16, color: "#1A1A1A", lineHeight: 1.7, fontStyle: "italic" }}>
                „Sazby a časové odhady vycházejí z praktických zkušeností koučů CoachVille.
                Vaše výsledky závisí na vašem nasazení — mohou být horší, stejné, nebo lepší.
                Tento výpočet není formou garance. Za svou praxi zodpovídá kouč."
              </div>
            </div>
          </Fade>

          {/* ─── CTA ─── */}
          <Fade show={showResults} delay={0.7}>
            <div style={{
              marginTop: 40, textAlign: "center", padding: "48px 24px",
              background: C.gradHero, borderRadius: 24, border: `1px solid ${C.primaryBorder}`,
              position: "relative", overflow: "hidden",
            }}>
              <h2 style={{
                fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(24px,4vw,34px)",
                fontWeight: 700, marginBottom: 12, marginTop: 0, color: C.navy, textTransform: "uppercase",
              }}>
                Chcete zjistit víc?
              </h2>
              <p style={{
                fontSize: 15, color: C.gray, marginBottom: 28,
                maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
              }}>
                {matchLevel
                  ? `Při ${hours} hodinách týdně a sazbě ${formatCZK(matchLevel.rate)}/hod dosáhnete svého cíle. Zjistěte, jak vám CoachVille pomůže na tuto úroveň.`
                  : `Zjistěte, jak vám CoachVille pomůže vybudovat koučovací praxi, která odpovídá vašim cílům.`
                }
              </p>
              <a href="https://www.coachville.eu" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-block", padding: "18px 48px", borderRadius: 14,
                  background: C.gradBtn, color: "#FFFFFF", fontSize: 17, fontWeight: 700,
                  textDecoration: "none", fontFamily: "'Montserrat',sans-serif",
                  textTransform: "uppercase", letterSpacing: "0.03em",
                  boxShadow: `0 4px 32px ${C.primaryGlow}`, transition: "all 0.3s",
                }}
              >
                Chci se stát koučem →
              </a>
              <div style={{ marginTop: 16, fontSize: 12, color: C.gray }}>coachville.eu</div>
            </div>
          </Fade>

          <div style={{ marginTop: 32, textAlign: "center", fontSize: 12, color: "#B0B5BD", lineHeight: 1.6 }}>
            Kalkulačka slouží jako orientační nástroj. Nezaručuje konkrétní příjmy ani výsledky.
          </div>
        </div>
      )}

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none; width: 28px; height: 28px; border-radius: 50%;
          background: ${C.teal}; cursor: pointer;
          box-shadow: 0 2px 12px ${C.primaryGlow};
          border: 3px solid #FAF9F5; transition: transform 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }
        input[type="range"]::-moz-range-thumb {
          width: 28px; height: 28px; border-radius: 50%;
          background: ${C.teal}; cursor: pointer;
          box-shadow: 0 2px 12px ${C.primaryGlow}; border: 3px solid #FAF9F5;
        }
        input[type="number"]:focus {
          border-color: rgba(56,192,195,0.4) !important;
          box-shadow: 0 0 0 3px rgba(56,192,195,0.12);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
