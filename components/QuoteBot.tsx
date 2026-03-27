"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";
import { CONTENT } from "@/lib/content";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Step = "intro" | "questions" | "done";

interface Answers {
  [key: string]: string | undefined;
}

/* ─── Question tree ─────────────────────────────────────────────────── */
type QuestionNode = {
  key: string;
  text: string;
  options?: string[];
  type: "choice" | "text" | "text-optional";
  placeholder?: string;
};

const baseQuestions: QuestionNode[]                     = CONTENT.quoteBot.baseQuestions as QuestionNode[];
const adaptiveQuestions: Record<string, QuestionNode[]> = CONTENT.quoteBot.adaptiveQuestions as Record<string, QuestionNode[]>;
const sharedTailQuestions: QuestionNode[]               = CONTENT.quoteBot.sharedTailQuestions as QuestionNode[];

/* ─── Typewriter hook ───────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 16, enabled = true) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) { setDisplayed(text); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, enabled]);

  return displayed;
}

/* ─── TypingDots ────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div
      className="flex gap-1 items-center px-5 py-4"
      style={{ background: "var(--accent-tint)", borderRadius: "12px", borderTopLeftRadius: "2px", width: "fit-content" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
            animation: `dotBounce 1s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── BotBubble ─────────────────────────────────────────────────────── */
function BotBubble({ text, animate }: { text: string; animate: boolean }) {
  const displayed = useTypewriter(text, 16, animate);
  return (
    <div className="flex gap-3">
      <div
        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
        style={{ background: "var(--accent)", color: "var(--on-dark-primary)" }}
      >
        VS
      </div>
      <div
        className="rounded-xl rounded-tl-none px-5 py-4 flex-1"
        style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-border)" }}
      >
        <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--text-primary)", minHeight: "1.4em" }}>
          {displayed}
          <span style={{ opacity: 0.3 }}>▋</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */
export default function QuoteBot() {
  const [step, setStep]               = useState<Step>("intro");
  const [questions, setQuestions]     = useState<QuestionNode[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers]         = useState<Answers>({});
  const [textInput, setTextInput]     = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping]       = useState(false);

  const currentQuestion = questions[questionIndex];

  const progress =
    step === "questions" ? (questionIndex / Math.max(questions.length, 1)) * 100
    : step === "done"    ? 100
    : 0;

  function startQuestions() {
    setQuestions(baseQuestions);
    setQuestionIndex(0);
    setAnswers({});
    setShowOptions(false);
    setIsTyping(true);
    setStep("questions");
    setTimeout(() => { setIsTyping(false); setShowOptions(true); }, 900);
  }

  function handleChoice(value: string) {
    const updated = { ...answers, [currentQuestion.key]: value };
    setAnswers(updated);

    if (currentQuestion.key === "projectType") {
      const adaptive = adaptiveQuestions[value] ?? adaptiveQuestions["Other"];
      const fullList = [...baseQuestions, ...adaptive, ...sharedTailQuestions];
      setQuestions(fullList);
      advance(fullList, 0);
    } else {
      advance(questions, questionIndex);
    }
  }

  function handleTextSubmit() {
    if (currentQuestion.type === "text" && !textInput.trim()) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: textInput.trim() }));
    setTextInput("");
    advance(questions, questionIndex);
  }

  function advance(qList: QuestionNode[], currentIdx: number) {
    setShowOptions(false);
    setIsTyping(true);

    if (currentIdx < qList.length - 1) {
      setTimeout(() => {
        setIsTyping(false);
        setQuestionIndex(currentIdx + 1);
        setShowOptions(true);
      }, 700);
    } else {
      // All questions answered — log answers and show confirmation
      // TODO: send `answers` to your backend/CRM here when ready
      setTimeout(() => {
        setIsTyping(false);
        setStep("done");
      }, 700);
    }
  }

  function handleReset() {
    setStep("intro");
    setQuestions([]);
    setQuestionIndex(0);
    setAnswers({});
    setTextInput("");
    setShowOptions(false);
    setIsTyping(false);
  }

  return (
    <>
      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeSlideIn 0.35s ease forwards; }
      `}</style>

      <section id="quote-bot" className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container px-4 md:px-6">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label">{CONTENT.quoteBot.intro.label}</p>
            <h2 className="section-title">{CONTENT.quoteBot.intro.title}</h2>
            <p className="section-subtitle mx-auto">{CONTENT.quoteBot.intro.subtitle}</p>
          </div>

          {/* Card */}
          <div
            className="mx-auto rounded-2xl overflow-hidden"
            style={{
              maxWidth: "680px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              boxShadow: "var(--card-shadow-lg)",
            }}
          >
            {/* Progress bar */}
            {step !== "intro" && (
              <div style={{ height: "3px", background: "var(--border)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "var(--accent)",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            )}

            <div className="p-6 md:p-10">

              {/* ── INTRO ── */}
              {step === "intro" && (
                <div className="text-center fade-in">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-border)" }}
                  >
                    <span className="font-display text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>?</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {CONTENT.quoteBot.intro.cardTitle}
                  </h3>
                  <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                    {CONTENT.quoteBot.intro.cardSubtitle}
                  </p>
                  <button
                    id="quotebot-start-btn"
                    onClick={startQuestions}
                    className="btn-primary text-base px-8 py-4 mx-auto"
                  >
                    {CONTENT.quoteBot.intro.button} <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── QUESTIONS ── */}
              {step === "questions" && currentQuestion && (
                <div>
                  {isTyping ? (
                    <div className="flex gap-3 mb-6">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: "var(--accent)", color: "var(--on-dark-primary)" }}
                      >
                        VS
                      </div>
                      <TypingDots />
                    </div>
                  ) : (
                    <div className="mb-6 fade-in">
                      <BotBubble text={currentQuestion.text} animate={true} />
                    </div>
                  )}

                  <p className="text-xs mb-5 text-right" style={{ color: "var(--text-secondary)" }}>
                    {CONTENT.quoteBot.questions.progressPrefix} {questionIndex + 1} {CONTENT.quoteBot.questions.progressSeparator} {questions.length}
                  </p>

                  {showOptions && (
                    <div className="fade-in">
                      {currentQuestion.type === "choice" && (
                        <div className="flex flex-col gap-2">
                          {currentQuestion.options!.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleChoice(opt)}
                              className="text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                              style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.color = "var(--accent)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.color = "var(--text-primary)";
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {(currentQuestion.type === "text" || currentQuestion.type === "text-optional") && (
                        <div>
                          <input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                            placeholder={currentQuestion.placeholder}
                            className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
                            style={{ background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                            autoFocus
                          />
                          <div className="mt-3 flex gap-2 justify-end">
                            {currentQuestion.type === "text-optional" && (
                              <button
                                onClick={() => { setTextInput(""); handleTextSubmit(); }}
                                className="text-sm px-4 py-2 cursor-pointer transition-colors duration-200"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {CONTENT.quoteBot.questions.skipButton}
                              </button>
                            )}
                            <button
                              onClick={handleTextSubmit}
                              className="btn-primary text-sm px-5 py-2"
                              disabled={currentQuestion.type === "text" && !textInput.trim()}
                            >
                              {CONTENT.quoteBot.questions.continueButton} <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── DONE ── */}
              {step === "done" && (
                <div className="text-center fade-in">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-border)" }}
                  >
                    <CheckCircle size={36} style={{ color: "var(--accent)" }} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                    {CONTENT.quoteBot.result.badge}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {CONTENT.quoteBot.result.title}
                  </h3>
                  <p className="text-sm mb-8 mx-auto" style={{ color: "var(--text-secondary)", maxWidth: "420px", lineHeight: 1.7 }}>
                    {CONTENT.quoteBot.result.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <a href="tel:+15550000000" className="btn-primary justify-center">
                      <Phone size={16} />
                      {CONTENT.quoteBot.result.callCTA}
                    </a>
                    <a href="mailto:info@valdezstairs.com" className="btn-outline justify-center"
                       style={{ color: "var(--accent)", borderColor: "var(--accent-tint-border)", background: "transparent" }}
                       onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-tint)"; }}
                       onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <Mail size={16} />
                      {CONTENT.quoteBot.result.emailCTA}
                    </a>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs cursor-pointer transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {CONTENT.quoteBot.result.startOverText}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
