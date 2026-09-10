import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { bedrijf } from "@/lib/loodgieter";

type Bericht = { role: "user" | "assistant"; content: string };

const start: Bericht = {
  role: "assistant",
  content: `Hallo! Ik ben de digitale assistent van ${bedrijf.naam} en help u 24/7 verder. Waar kan ik u mee helpen — een lekkage, verstopping, CV-storing of een offerte?`,
};

const suggesties = [
  "Wat kost het ontstoppen van een wc?",
  "Ik heb een lekkage, wat nu?",
  "Hoe snel kunnen jullie er zijn?",
];

export function ChatAssistent() {
  const [open, setOpen] = useState(false);
  const [berichten, setBerichten] = useState<Bericht[]>([start]);
  const [invoer, setInvoer] = useState("");
  const [bezig, setBezig] = useState(false);
  const bodemRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodemRef.current?.scrollIntoView({ block: "end" });
  }, [berichten, bezig, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function verstuur(tekst: string) {
    const schoon = tekst.trim();
    if (!schoon || bezig) return;
    const nieuw: Bericht[] = [...berichten, { role: "user", content: schoon }];
    setBerichten(nieuw);
    setInvoer("");
    setBezig(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nieuw }),
      });
      const data = (await res.json()) as { antwoord?: string; error?: string };
      setBerichten((b) => [
        ...b,
        {
          role: "assistant",
          content:
            data.antwoord ??
            data.error ??
            `Er ging iets mis. Bel ons gerust direct op ${bedrijf.telefoon}.`,
        },
      ]);
    } catch {
      setBerichten((b) => [
        ...b,
        {
          role: "assistant",
          content: `Ik kan u nu even niet bereiken. Bel ons op ${bedrijf.telefoon}, we zijn 24/7 bereikbaar.`,
        },
      ]);
    } finally {
      setBezig(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="ai-assistent"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-plumb px-5 py-4 text-sm font-semibold text-white shadow-xl transition hover:brightness-110"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Sluiten" : "Stel uw vraag · 24/7"}</span>
      </button>

      {open ? (
        <div
          id="ai-assistent"
          className="fixed bottom-24 right-3 z-50 flex h-[70vh] max-h-[560px] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <div className="bg-gradient-to-r from-plumb-dark to-plumb px-4 py-3 text-white">
            <p className="text-sm font-semibold">Digitale assistent</p>
            <p className="text-xs text-white/80">24/7 antwoord op al uw vragen</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {berichten.map((b, i) => (
              <div
                key={i}
                className={
                  b.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-plumb px-3 py-2 text-sm text-white"
                    : "max-w-[90%] text-sm leading-relaxed text-foreground"
                }
              >
                {b.content}
              </div>
            ))}
            {bezig ? (
              <p className="text-sm text-muted-foreground">Even denken…</p>
            ) : berichten.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggesties.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => verstuur(s)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-plumb hover:text-plumb"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
            <div ref={bodemRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void verstuur(invoer);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <label htmlFor="ai-vraag" className="sr-only">
              Uw vraag
            </label>
            <input
              id="ai-vraag"
              ref={inputRef}
              value={invoer}
              onChange={(e) => setInvoer(e.target.value)}
              placeholder="Typ uw vraag…"
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={bezig || !invoer.trim()}
              aria-label="Verstuur vraag"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground transition hover:brightness-95 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <a
            href={bedrijf.telefoonLink}
            className="flex items-center justify-center gap-2 border-t border-border bg-secondary py-2.5 text-sm font-semibold text-plumb-dark"
          >
            <Phone className="h-4 w-4" /> Spoed? Bel {bedrijf.telefoon}
          </a>
        </div>
      ) : null}
    </>
  );
}
