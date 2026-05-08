"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { createBrowserClient } from "@supabase/ssr";

// ─── Types ────────────────────────────────────────────────────────────────────

type WalletLevel = "beginner" | "intermediate" | "expert";
type XamanStatus = "not_installed" | "installed_no_account" | "installed_with_account";
type GuideMode = "guided" | "fast";
type StablecoinChoice = "geur" | "rlusd" | "both";
type AdvanceStatus = "none" | "pending" | "recovered" | "forgiven";

type OnboardingStep =
  | "questionnaire"
  | "install"
  | "create_wallet"
  | "seed_phrase"
  | "activate"
  | "stablecoin"
  | "connect"
  | "complete";

interface UserProfile {
  level: WalletLevel | null;
  xamanStatus: XamanStatus | null;
  guideMode: GuideMode | null;
}

interface XrpAdvance {
  sent: boolean;
  amountXrp: number;
  amountEur: number;
  status: AdvanceStatus;
  txHash: string | null;
}

interface TrustLineStatus {
  geur: "none" | "pending" | "done" | "error";
  rlusd: "none" | "pending" | "done" | "error";
}

interface OnboardingState {
  profile: UserProfile;
  currentStep: OnboardingStep;
  steps: OnboardingStep[];
  xrplAddress: string;
  addressValid: boolean;
  accountActivated: boolean;
  stablecoin: StablecoinChoice | null;
  trustLines: TrustLineStatus;
  walletConnected: boolean;
  xrpAdvance: XrpAdvance;
  rgpdConsented: boolean;
  qrExpiry: number; // secondes restantes
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const XRPL_ADDRESS_REGEX = /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/;
const QR_DURATION_SECONDS = 300; // 5 min
const XRP_ADVANCE_AMOUNT = 2;

// Émetteurs XRPL officiels
const STABLECOIN_ISSUERS = {
  geur: "rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq", // GateHub EUR
  rlusd: "rMxCKbEDwqr76QuheSUMdEGf4B9xJ8m5De", // Ripple RLUSD
} as const;

// Détection EUR par locale
const EUR_LOCALES = ["fr"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSteps(profile: UserProfile): OnboardingStep[] {
  const steps: OnboardingStep[] = [];

  if (profile.xamanStatus === "not_installed") {
    steps.push("install");
  }
  if (
    profile.xamanStatus === "not_installed" ||
    profile.xamanStatus === "installed_no_account"
  ) {
    steps.push("create_wallet");
    steps.push("seed_phrase");
  }
  if (profile.xamanStatus !== "installed_with_account") {
    steps.push("activate");
  }

  steps.push("stablecoin");
  steps.push("connect");
  steps.push("complete");
  return steps;
}

function formatAddress(addr: string): string {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

// Barre de progression
function ProgressBar({
  steps,
  currentStep,
}: {
  steps: OnboardingStep[];
  currentStep: OnboardingStep;
}) {
  const idx = steps.indexOf(currentStep);
  const pct = steps.length > 1 ? (idx / (steps.length - 1)) * 100 : 100;
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// Badge statut
function Badge({
  type,
  children,
}: {
  type: "ok" | "warn" | "info" | "danger" | "gray";
  children: React.ReactNode;
}) {
  const cls = {
    ok: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warn: "bg-amber-50 text-amber-700 border border-amber-200",
    info: "bg-blue-50 text-blue-700 border border-blue-200",
    danger: "bg-red-50 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-500 border border-gray-200",
  }[type];
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cls}`}>
      {children}
    </span>
  );
}

// Boîte info
function InfoBox({
  type = "info",
  children,
}: {
  type?: "info" | "warn" | "danger";
  children: React.ReactNode;
}) {
  const cls = {
    info: "bg-gray-50 border-gray-200 text-gray-600",
    warn: "bg-amber-50 border-amber-200 text-amber-700",
    danger: "bg-red-50 border-red-200 text-red-700",
  }[type];
  return (
    <div className={`rounded-xl border p-3 text-sm leading-relaxed ${cls}`}>
      {children}
    </div>
  );
}

// Question du questionnaire
function QuestionOption({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all
        ${selected
          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400"
          : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/50"
        }`}
    >
      <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>
      </div>
      {selected && (
        <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </button>
  );
}

// Carte stablecoin
function StablecoinCard({
  id,
  symbol,
  name,
  issuer,
  description,
  tags,
  selected,
  disabled,
  onClick,
}: {
  id: StablecoinChoice | "eurc";
  symbol: string;
  name: string;
  issuer: string;
  description: string;
  tags: string[];
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full text-left p-4 rounded-xl border transition-all
        ${disabled
          ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
          : selected
            ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400"
            : "border-gray-200 bg-white hover:border-emerald-300"
        }`}
    >
      {selected && !disabled && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      <div className="text-xl font-semibold text-gray-900 mb-0.5">{symbol}</div>
      <div className="text-xs text-gray-500 mb-2">
        {name}{issuer ? ` · ${issuer}` : ""}
      </div>
      <p className="text-xs text-gray-600 leading-relaxed mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} type={disabled ? "gray" : tag === "Recommandé" || tag === "Recommended" || tag === "Recomendado" ? "ok" : tag === "EUR" ? "info" : "gray"}>
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}

// QR code mock (à remplacer par vraie lib WalletConnect)
function QRCodeDisplay({
  expirySeconds,
  onRefresh,
  t,
}: {
  expirySeconds: number;
  onRefresh: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const expired = expirySeconds <= 0;
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative w-40 h-40 border-2 rounded-xl flex items-center justify-center
          ${expired ? "border-gray-200 bg-gray-100" : "border-emerald-200 bg-white"}`}
      >
        {/* QR code pattern simplifié — remplacer par <QRCode value={wcUri} /> */}
        {!expired ? (
          <svg viewBox="0 0 100 100" className="w-32 h-32 text-gray-900">
            {/* Coins QR */}
            <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="13" y="13" width="12" height="12" fill="currentColor" />
            <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="75" y="13" width="12" height="12" fill="currentColor" />
            <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="13" y="75" width="12" height="12" fill="currentColor" />
            {/* Data cells */}
            {[45,50,55,60,65].map((x) =>
              [10,20,30,45,55,65,75,85].map((y) =>
                Math.random() > 0.5 ? (
                  <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="currentColor" />
                ) : null
              )
            )}
            <rect x="45" y="67" width="4" height="4" fill="currentColor" />
            <rect x="55" y="75" width="4" height="4" fill="currentColor" />
            <rect x="65" y="67" width="4" height="4" fill="currentColor" />
          </svg>
        ) : (
          <div className="text-center">
            <p className="text-xs text-gray-400">{t("steps.connect.qr_expired")}</p>
          </div>
        )}
        {/* Timer badge */}
        {!expired && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-2 py-0.5 text-xs text-gray-500 font-mono whitespace-nowrap">
            {t("steps.connect.qr_expires", { time: formatTime(expirySeconds) })}
          </span>
        )}
      </div>
      {expired && (
        <button
          onClick={onRefresh}
          className="mt-2 text-sm text-emerald-600 underline underline-offset-2"
        >
          {t("steps.connect.qr_refresh")}
        </button>
      )}
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────────

export default function XamanOnboarding({
  investorId,
  onComplete,
}: {
  investorId: string;
  onComplete?: (address: string) => void;
}) {
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const locale = useLocale();
  const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

  // Détection mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(/iPhone|iPad|Android/i.test(navigator.userAgent));
  }, []);

  // Détection locale → devise suggérée
  const suggestedStablecoin: StablecoinChoice = EUR_LOCALES.includes(locale)
    ? "geur"
    : "rlusd";

  // ── État principal ──
  const [state, setState] = useState<OnboardingState>({
    profile: { level: null, xamanStatus: null, guideMode: null },
    currentStep: "questionnaire",
    steps: [],
    xrplAddress: "",
    addressValid: false,
    accountActivated: false,
    stablecoin: suggestedStablecoin,
    trustLines: { geur: "none", rlusd: "none" },
    walletConnected: false,
    xrpAdvance: {
      sent: false,
      amountXrp: XRP_ADVANCE_AMOUNT,
      amountEur: 0,
      status: "none",
      txHash: null,
    },
    rgpdConsented: false,
    qrExpiry: QR_DURATION_SECONDS,
  });

  // Quiz seed phrase
  const [quizWords, setQuizWords] = useState<{ pos: number; answer: string; input: string }[]>([]);
  const [quizPassed, setQuizPassed] = useState(false);

  // Statut trust lines
  const [trustLineLoading, setTrustLineLoading] = useState(false);

  // QR timer
  useEffect(() => {
    if (state.currentStep !== "connect") return;
    if (state.qrExpiry <= 0) return;
    const timer = setInterval(() => {
      setState((s) => ({ ...s, qrExpiry: Math.max(0, s.qrExpiry - 1) }));
    }, 1000);
    return () => clearInterval(timer);
  }, [state.currentStep, state.qrExpiry]);

  // Polling activation XRPL (toutes les 10 secondes)
  useEffect(() => {
    if (state.currentStep !== "activate") return;
    if (!state.xrplAddress || !state.addressValid) return;
    if (state.accountActivated) return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/xrpl/check-activation?address=${state.xrplAddress}`);
        const data = await res.json();
        if (data.activated) {
          setState((s) => ({ ...s, accountActivated: true }));
          clearInterval(poll);
        }
      } catch {
        // silencieux — retry au prochain cycle
      }
    }, 10_000);

    return () => clearInterval(poll);
  }, [state.currentStep, state.xrplAddress, state.addressValid, state.accountActivated]);

  // ── Helpers d'état ──
  const update = useCallback((patch: Partial<OnboardingState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const goToStep = useCallback((step: OnboardingStep) => {
    update({ currentStep: step });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [update]);

  // ── Questionnaire validé → calcul des étapes ──
  function validateQuestionnaire() {
    const { profile } = state;
    if (!profile.level || !profile.xamanStatus || !profile.guideMode) return;
    const steps = buildSteps(profile);
    const firstStep = steps[0];
    update({ steps, currentStep: firstStep });
  }

  // ── Validation adresse XRPL ──
  function handleAddressInput(value: string) {
    const clean = value.trim();
    const valid = XRPL_ADDRESS_REGEX.test(clean);
    update({ xrplAddress: clean, addressValid: valid });
  }

  // ── Envoi des 2 XRP par CV (Option A) ──
  async function sendXrpAdvance() {
    if (!state.xrplAddress || !state.addressValid) return;
    try {
      const res = await fetch("/api/xrpl/send-advance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId, address: state.xrplAddress }),
      });
      const data = await res.json();
      if (data.success) {
        update({
          xrpAdvance: {
            sent: true,
            amountXrp: XRP_ADVANCE_AMOUNT,
            amountEur: data.eurAmount,
            status: "pending",
            txHash: data.txHash,
          },
        });
      }
    } catch {
      // Géré par l'UI
    }
  }

  // ── Création trust lines ──
  async function createTrustLines() {
    const { stablecoin } = state;
    if (!stablecoin) return;
    setTrustLineLoading(true);

    const coinsToActivate: Array<"geur" | "rlusd"> =
      stablecoin === "both" ? ["geur", "rlusd"] : [stablecoin as "geur" | "rlusd"];

    for (const coin of coinsToActivate) {
      update({ trustLines: { ...state.trustLines, [coin]: "pending" } });
      try {
        const res = await fetch("/api/xrpl/trust-line", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            investorId,
            address: state.xrplAddress,
            currency: coin.toUpperCase(),
            issuer: STABLECOIN_ISSUERS[coin],
          }),
        });
        const data = await res.json();
        update({
          trustLines: {
            ...state.trustLines,
            [coin]: data.success ? "done" : "error",
          },
        });
      } catch {
        update({ trustLines: { ...state.trustLines, [coin]: "error" } });
      }
    }
    setTrustLineLoading(false);
  }

  // ── Connexion WalletConnect / Xaman ──
  async function initiateWalletConnect() {
    try {
      const res = await fetch("/api/xrpl/walletconnect-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investorId }),
      });
      const data = await res.json();
      if (data.uri && isMobile) {
        // Deep link mobile
        window.location.href = `xumm://wc?uri=${encodeURIComponent(data.uri)}`;
      }
      // Sur desktop : le QR est affiché depuis data.uri
      update({ qrExpiry: QR_DURATION_SECONDS });
    } catch {
      // Géré par l'UI
    }
  }

  // ── Enregistrement final en base ──
  async function saveToSupabase() {
    await supabase.from("investisseurs").update({
      xrpl_address: state.xrplAddress,
      wallet_verified: true,
      connected_at: new Date().toISOString(),
      stablecoin_preference: state.stablecoin?.toUpperCase(),
      locale,
      devise: state.stablecoin === "rlusd" ? "USD" : "EUR",
      rgpd_consent_at: new Date().toISOString(),
      xrp_advance_sent: state.xrpAdvance.sent,
      xrp_advance_amount: state.xrpAdvance.amountXrp,
      xrp_advance_eur: state.xrpAdvance.amountEur,
      xrp_advance_tx_hash: state.xrpAdvance.txHash,
      xrp_advance_status: state.xrpAdvance.status,
      xrp_advance_sent_at: state.xrpAdvance.sent ? new Date().toISOString() : null,
    }).eq("id", investorId);

    onComplete?.(state.xrplAddress);
    goToStep("complete");
  }

  // ── Rendu par étape ──────────────────────────────────────────────────────────

  // QUESTIONNAIRE
  if (state.currentStep === "questionnaire") {
    const { profile } = state;
    const canValidate = profile.level && profile.xamanStatus && profile.guideMode;

    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">{t("questionnaire.title")}</h1>
        <p className="text-sm text-gray-500 mb-6">{t("questionnaire.subtitle")}</p>

        {/* Q1 */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("questionnaire.q1.label")}</p>
          <p className="text-sm font-medium text-gray-800 mb-3">{t("questionnaire.q1.title")}</p>
          <div className="flex flex-col gap-2">
            {(["beginner", "intermediate", "expert"] as WalletLevel[]).map((lvl) => (
              <QuestionOption
                key={lvl}
                selected={profile.level === lvl}
                onClick={() => update({ profile: { ...profile, level: lvl } })}
                icon={lvl === "beginner" ? "🌱" : lvl === "intermediate" ? "👍" : "🚀"}
                title={t(`questionnaire.q1.options.${lvl}.title`)}
                subtitle={t(`questionnaire.q1.options.${lvl}.subtitle`)}
              />
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("questionnaire.q2.label")}</p>
          <p className="text-sm font-medium text-gray-800 mb-3">{t("questionnaire.q2.title")}</p>
          <div className="flex flex-col gap-2">
            {(["not_installed", "installed_no_account", "installed_with_account"] as XamanStatus[]).map((status) => (
              <QuestionOption
                key={status}
                selected={profile.xamanStatus === status}
                onClick={() => update({ profile: { ...profile, xamanStatus: status } })}
                icon={status === "not_installed" ? "📵" : status === "installed_no_account" ? "📱" : "✅"}
                title={t(`questionnaire.q2.options.${status}.title`)}
                subtitle={t(`questionnaire.q2.options.${status}.subtitle`)}
              />
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t("questionnaire.q3.label")}</p>
          <p className="text-sm font-medium text-gray-800 mb-3">{t("questionnaire.q3.title")}</p>
          <div className="flex flex-col gap-2">
            {(["guided", "fast"] as GuideMode[]).map((mode) => (
              <QuestionOption
                key={mode}
                selected={profile.guideMode === mode}
                onClick={() => update({ profile: { ...profile, guideMode: mode } })}
                icon={mode === "guided" ? "🗺️" : "⚡"}
                title={t(`questionnaire.q3.options.${mode}.title`)}
                subtitle={t(`questionnaire.q3.options.${mode}.subtitle`)}
              />
            ))}
          </div>
        </div>

        {/* Résumé profil + CTA */}
        {canValidate && (
          <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-medium text-emerald-800 mb-1">
              {t(`questionnaire.result.profiles.${profile.level!}.name`)}
            </p>
            <p className="text-xs text-emerald-700">
              {t(`questionnaire.result.profiles.${profile.level!}.desc`)}
            </p>
          </div>
        )}

        <button
          onClick={validateQuestionnaire}
          disabled={!canValidate}
          className={`w-full py-3 rounded-xl text-sm font-medium transition-all
            ${canValidate
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          {t("questionnaire.result.cta")}
        </button>
      </div>
    );
  }

  // ── ÉTAPES GUIDÉES ──────────────────────────────────────────────────────────

  const isGuided = state.profile.guideMode === "guided";
  const stepIndex = state.steps.indexOf(state.currentStep);
  const nextStep = state.steps[stepIndex + 1] ?? null;
  const prevStep = state.steps[stepIndex - 1] ?? "questionnaire";

  function StepShell({
    stepKey,
    children,
    canContinue,
    onContinue,
    continueLabel,
  }: {
    stepKey: string;
    children: React.ReactNode;
    canContinue: boolean;
    onContinue?: () => void;
    continueLabel?: string;
  }) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <ProgressBar steps={state.steps} currentStep={state.currentStep} />
        <p className="text-xs text-gray-400 mb-1">
          {t("progress", { current: stepIndex + 1, total: state.steps.length })}
        </p>
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          {t(`steps.${stepKey}.title`)}
        </h1>
        {children}
        <div className="flex gap-3 mt-8">
          <button
            onClick={() =>
              prevStep === "questionnaire"
                ? update({ currentStep: "questionnaire", steps: [] })
                : goToStep(prevStep as OnboardingStep)
            }
            className="px-4 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:border-gray-300"
          >
            {tc("back")}
          </button>
          <button
            onClick={onContinue ?? (() => nextStep && goToStep(nextStep as OnboardingStep))}
            disabled={!canContinue}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
              ${canContinue
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {continueLabel ?? tc("continue")}
          </button>
        </div>
      </div>
    );
  }

  // INSTALL
  if (state.currentStep === "install") {
    const [confirmed, setConfirmed] = useState(false);
    return (
      <StepShell stepKey="install" canContinue={confirmed}>
        <p className="text-sm text-gray-600 mb-4">{t("steps.install.description")}</p>
        {isGuided && (
          <div className="w-full h-36 bg-gray-100 rounded-xl flex items-center justify-center mb-4 border border-gray-200">
            <p className="text-xs text-gray-400">{t("steps.install.screenshot_alt")}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href="https://apps.apple.com/app/xaman/id1492302243"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">🍎</span>
            <div>
              <p className="text-xs text-gray-500">App Store</p>
              <p className="text-sm font-medium text-gray-900">iOS</p>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.xrpllabs.xumm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">🤖</span>
            <div>
              <p className="text-xs text-gray-500">Google Play</p>
              <p className="text-sm font-medium text-gray-900">Android</p>
            </div>
          </a>
        </div>
        <InfoBox type="warn">
          ⚠️ {t("steps.install.warning_source")}
          <br />
          <strong>{t("steps.install.publisher")}</strong>
        </InfoBox>
        {isGuided && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">{t("steps.install.confirm_question")}</p>
            <p className="text-xs text-gray-500 mb-3">{t("steps.install.confirm_hint")}</p>
            <QuestionOption
              selected={confirmed}
              onClick={() => setConfirmed(true)}
              icon="✅"
              title={tc("yes")}
              subtitle={t("steps.install.confirm_question")}
            />
          </div>
        )}
        {!isGuided && (
          <button
            onClick={() => setConfirmed(true)}
            className="mt-4 w-full py-2 text-sm text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-50"
          >
            {t("steps.install.confirm_question")} ✓
          </button>
        )}
      </StepShell>
    );
  }

  // CREATE WALLET
  if (state.currentStep === "create_wallet") {
    const [confirmed, setConfirmed] = useState(false);
    return (
      <StepShell stepKey="create_wallet" canContinue={confirmed}>
        <Badge type="warn">⚡ {t("steps.create_wallet.critical")}</Badge>
        <p className="text-sm text-gray-600 mt-3 mb-4">{t("steps.create_wallet.description")}</p>
        <div className="flex flex-col gap-2 mb-4">
          {(["substep_1", "substep_2", "substep_3"] as const).map((sub, i) => (
            <div key={sub} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-medium flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700">{t(`steps.create_wallet.${sub}`)}</p>
            </div>
          ))}
        </div>
        {isGuided && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-28 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <p className="text-xs text-gray-400 text-center px-2">
                    {t(`steps.create_wallet.screenshot_alt_${n as 1 | 2 | 3}`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-gray-700 mb-2">{t("steps.create_wallet.confirm_question")}</p>
            <QuestionOption
              selected={confirmed}
              onClick={() => setConfirmed(true)}
              icon="✅"
              title={tc("yes")}
              subtitle={t("steps.create_wallet.confirm_question")}
            />
          </>
        )}
        {!isGuided && (
          <button onClick={() => setConfirmed(true)} className="w-full py-2 text-sm text-emerald-600 border border-emerald-200 rounded-xl hover:bg-emerald-50">
            {tc("done")} ✓
          </button>
        )}
      </StepShell>
    );
  }

  // SEED PHRASE
  if (state.currentStep === "seed_phrase") {
    return (
      <StepShell stepKey="seed_phrase" canContinue={isGuided ? quizPassed : true}>
        <Badge type="danger">🔒 {t("steps.seed_phrase.critical")}</Badge>
        <p className="text-sm text-gray-600 mt-3 mb-4">{t("steps.seed_phrase.description")}</p>

        <InfoBox type="danger">
          <strong>{t("steps.seed_phrase.warning_title")}</strong>
          <br />
          {t("steps.seed_phrase.warning_body")}
        </InfoBox>

        <div className="mt-4 flex flex-col gap-2">
          {(["rule_1", "rule_2", "rule_3"] as const).map((r) => (
            <div key={r} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-emerald-500 mt-0.5">✓</span>
              {t(`steps.seed_phrase.${r}`)}
            </div>
          ))}
        </div>

        {isGuided && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-sm font-medium text-gray-800 mb-1">{t("steps.seed_phrase.quiz_title")}</p>
            <p className="text-xs text-gray-500 mb-4">{t("steps.seed_phrase.quiz_subtitle")}</p>
            {/* Simulation quiz — en production, les positions viennent du wallet */}
            {[3, 11, 19].map((pos) => {
              const entry = quizWords.find((q) => q.pos === pos);
              return (
                <div key={pos} className="mb-3">
                  <label className="text-xs text-gray-500 mb-1 block">
                    {t("steps.seed_phrase.quiz_question", { position: pos })}
                  </label>
                  <input
                    type="text"
                    placeholder={t("steps.seed_phrase.quiz_placeholder", { position: pos })}
                    value={entry?.input ?? ""}
                    onChange={(e) => {
                      const next = quizWords.filter((q) => q.pos !== pos);
                      next.push({ pos, answer: "", input: e.target.value });
                      setQuizWords(next);
                      // Simulation : tout rempli = validé
                      setQuizPassed(next.filter((q) => q.input.length > 2).length === 3);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              );
            })}
            {quizPassed && (
              <p className="text-sm text-emerald-600 font-medium">{t("steps.seed_phrase.quiz_success")}</p>
            )}
          </div>
        )}
      </StepShell>
    );
  }

  // ACTIVATE
  if (state.currentStep === "activate") {
    const [optionSelected, setOptionSelected] = useState<"cv" | "exchange" | null>(null);
    const [advanceSent, setAdvanceSent] = useState(false);

    return (
      <StepShell
        stepKey="activate"
        canContinue={state.accountActivated}
        continueLabel={tc("continue")}
      >
        <Badge type="warn">⏱ {t("steps.activate.friction_label")}</Badge>
        <p className="text-sm text-gray-600 mt-3 mb-4">{t("steps.activate.description")}</p>

        {/* Saisie adresse */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500 block mb-1">
            {t("steps.activate.address_label")}
          </label>
          <input
            type="text"
            placeholder={t("steps.activate.address_placeholder")}
            value={state.xrplAddress}
            onChange={(e) => handleAddressInput(e.target.value)}
            className={`w-full px-3 py-2.5 text-sm font-mono border rounded-xl focus:outline-none transition-colors
              ${state.xrplAddress.length > 0
                ? state.addressValid
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-red-300 bg-red-50"
                : "border-gray-200"
              }`}
          />
          <p className={`text-xs mt-1 ${state.xrplAddress.length > 0
            ? state.addressValid ? "text-emerald-600" : "text-red-500"
            : "text-gray-400"}`}>
            {state.xrplAddress.length > 0
              ? state.addressValid
                ? t("steps.activate.address_valid")
                : t("steps.activate.address_invalid")
              : t("steps.activate.address_hint")}
          </p>
          {isGuided && (
            <p className="text-xs text-gray-400 mt-1">{t("steps.activate.address_copy_hint")}</p>
          )}
        </div>

        {/* Options d'activation */}
        {state.addressValid && (
          <div className="flex flex-col gap-3">
            {/* Option A — CV active */}
            <div
              className={`border rounded-xl p-4 cursor-pointer transition-all
                ${optionSelected === "cv" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"}`}
              onClick={() => setOptionSelected("cv")}
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-800">{t("steps.activate.option_cv_title")}</p>
                <Badge type="ok">{t("steps.activate.option_cv_subtitle")}</Badge>
              </div>
              <p className="text-xs text-gray-500 mb-3">{t("steps.activate.option_cv_description")}</p>
              {optionSelected === "cv" && !advanceSent && (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await sendXrpAdvance();
                    setAdvanceSent(true);
                  }}
                  className="w-full py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600"
                >
                  {t("steps.activate.option_cv_cta")}
                </button>
              )}
              {advanceSent && (
                <InfoBox>
                  ✅ 2 XRP envoyés — {t("steps.activate.waiting_body")}
                </InfoBox>
              )}
              <p className="text-xs text-gray-400 mt-2">{t("steps.activate.option_cv_note")}</p>
            </div>

            {/* Option B — Exchange */}
            <div
              className={`border rounded-xl p-4 cursor-pointer transition-all
                ${optionSelected === "exchange" ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
              onClick={() => setOptionSelected("exchange")}
            >
              <p className="text-sm font-medium text-gray-800 mb-1">{t("steps.activate.option_exchange_title")}</p>
              <p className="text-xs text-gray-500 mb-2">{t("steps.activate.option_exchange_description")}</p>
              {optionSelected === "exchange" && (
                <button className="text-xs text-blue-600 underline underline-offset-2">
                  {t("steps.activate.option_exchange_guide")} →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Statut activation */}
        {state.accountActivated && (
          <InfoBox type="info">
            ✅ <strong>{t("steps.activate.activated_title")}</strong>
            <br />
            {t("steps.activate.activated_body")}
          </InfoBox>
        )}
        {!state.accountActivated && state.addressValid && (
          <div className="mt-3">
            <InfoBox>
              ⏳ {t("steps.activate.waiting_title")} — {t("steps.activate.waiting_body")}
            </InfoBox>
          </div>
        )}
      </StepShell>
    );
  }

  // STABLECOIN
  if (state.currentStep === "stablecoin") {
    const regionLabel = locale === "fr" ? "Guadeloupe / Martinique" : locale === "es" ? "Caraïbes hispanophones" : "Caribbean";
    const trustReady =
      state.stablecoin === "geur"
        ? state.trustLines.geur === "done"
        : state.stablecoin === "rlusd"
          ? state.trustLines.rlusd === "done"
          : state.trustLines.geur === "done" && state.trustLines.rlusd === "done";

    return (
      <StepShell
        stepKey="stablecoin"
        canContinue={trustReady}
        onContinue={() => nextStep && goToStep(nextStep as OnboardingStep)}
      >
        <p className="text-sm text-gray-600 mb-3">{t("steps.stablecoin.description")}</p>

        {/* Détection locale */}
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-4">
          <span>📍</span>
          <span>
            {EUR_LOCALES.includes(locale)
              ? t("steps.stablecoin.detected_eur", {
                  region: regionLabel,
                  coin: "GEUR",
                })
              : t("steps.stablecoin.detected_usd", {
                  region: regionLabel,
                  coin: "RLUSD",
                })}
          </span>
          <Badge type="info">{t("steps.stablecoin.detected_label")}</Badge>
        </div>
        <p className="text-xs text-gray-400 mb-3">{t("steps.stablecoin.manual_hint")}</p>

        {/* Sélecteur */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <StablecoinCard
            id="geur"
            symbol="GEUR"
            name={t("steps.stablecoin.coins.geur.name")}
            issuer={t("steps.stablecoin.coins.geur.issuer")}
            description={t("steps.stablecoin.coins.geur.description")}
            tags={["EUR", t("common.available" as Parameters<typeof t>[0])]}
            selected={state.stablecoin === "geur"}
            onClick={() => update({ stablecoin: "geur" })}
          />
          <StablecoinCard
            id="rlusd"
            symbol="RLUSD"
            name={t("steps.stablecoin.coins.rlusd.name")}
            issuer={t("steps.stablecoin.coins.rlusd.issuer")}
            description={t("steps.stablecoin.coins.rlusd.description")}
            tags={["USD", t("common.available" as Parameters<typeof t>[0])]}
            selected={state.stablecoin === "rlusd"}
            onClick={() => update({ stablecoin: "rlusd" })}
          />
          <StablecoinCard
            id="both"
            symbol="GEUR + RLUSD"
            name={t("steps.stablecoin.coins.both.name")}
            issuer=""
            description={t("steps.stablecoin.coins.both.description")}
            tags={["EUR", "USD", t("common.recommended" as Parameters<typeof t>[0])]}
            selected={state.stablecoin === "both"}
            onClick={() => update({ stablecoin: "both" })}
          />
          <StablecoinCard
            id="eurc"
            symbol="EURC"
            name={t("steps.stablecoin.coins.eurc.name")}
            issuer={t("steps.stablecoin.coins.eurc.issuer")}
            description={t("steps.stablecoin.coins.eurc.description")}
            tags={["EUR", t("common.coming_soon" as Parameters<typeof t>[0])]}
            selected={false}
            disabled
            onClick={() => {}}
          />
        </div>

        {/* Alerte "both" */}
        {state.stablecoin === "both" && (
          <InfoBox type="warn">⚠️ {t("steps.stablecoin.both_warning")}</InfoBox>
        )}

        {/* Trust lines */}
        {state.stablecoin && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-sm font-medium text-gray-800 mb-1">{t("steps.stablecoin.trust_line_title")}</p>
            <p className="text-xs text-gray-500 mb-3">{t("steps.stablecoin.trust_line_description")}</p>

            {!trustReady && !trustLineLoading && (
              <button
                onClick={createTrustLines}
                className="w-full py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600"
              >
                {tc("validate")}
              </button>
            )}

            {trustLineLoading && (
              <InfoBox>{t("steps.stablecoin.trust_line_pending")}</InfoBox>
            )}

            {/* Statuts individuels */}
            {(["geur", "rlusd"] as const).map((coin) => {
              const show =
                state.stablecoin === coin || state.stablecoin === "both";
              if (!show) return null;
              const status = state.trustLines[coin];
              return (
                <div key={coin} className={`flex items-center gap-2 mt-2 text-xs ${status === "done" ? "text-emerald-600" : status === "error" ? "text-red-500" : "text-gray-400"}`}>
                  <span>{status === "done" ? "✅" : status === "error" ? "❌" : "⏳"}</span>
                  {status === "done"
                    ? t("steps.stablecoin.trust_line_success", { coin: coin.toUpperCase() })
                    : status === "error"
                      ? t("steps.stablecoin.trust_line_error")
                      : `${coin.toUpperCase()} — ${t("steps.stablecoin.trust_line_pending")}`}
                </div>
              );
            })}
          </div>
        )}

        {isGuided && (
          <InfoBox>
            📱 {state.stablecoin === "both"
              ? t("steps.stablecoin.xaman_notification_both")
              : t("steps.stablecoin.xaman_notification")}
          </InfoBox>
        )}
      </StepShell>
    );
  }

  // CONNECT (WalletConnect QR)
  if (state.currentStep === "connect") {
    return (
      <StepShell
        stepKey="connect"
        canContinue={state.walletConnected}
        onContinue={saveToSupabase}
        continueLabel={tc("finish")}
      >
        {/* Consentement RGPD — affiché une seule fois */}
        {!state.rgpdConsented && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm font-medium text-blue-800 mb-1">{t("rgpd.consent_title")}</p>
            <p className="text-xs text-blue-700 mb-3 leading-relaxed">{t("rgpd.consent_body")}</p>
            <p className="text-xs text-blue-600 mb-3">{t("rgpd.data_minimization")}</p>
            <button
              onClick={() => update({ rgpdConsented: true })}
              className="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700"
            >
              {t("rgpd.consent_cta")}
            </button>
          </div>
        )}

        {state.rgpdConsented && (
          <>
            <p className="text-sm text-gray-600 mb-6">
              {isMobile
                ? t("steps.connect.description_mobile")
                : t("steps.connect.description_desktop")}
            </p>

            <div className="flex flex-col items-center gap-4 mb-6">
              {isMobile ? (
                <button
                  onClick={initiateWalletConnect}
                  className="w-full py-3 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600"
                >
                  {t("steps.connect.mobile_cta")}
                </button>
              ) : (
                <>
                  <QRCodeDisplay
                    expirySeconds={state.qrExpiry}
                    onRefresh={() => {
                      update({ qrExpiry: QR_DURATION_SECONDS });
                      initiateWalletConnect();
                    }}
                    t={t}
                  />
                  {isGuided && (
                    <p className="text-xs text-gray-500 text-center max-w-xs">
                      {t("steps.connect.qr_instruction")}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Simulation connexion pour dev */}
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={() => update({ walletConnected: true, xrplAddress: state.xrplAddress || "rDEVxxxxxxxxxxxxxxxxxxxxxxxxxx" })}
                className="w-full py-2 text-xs text-gray-400 border border-dashed border-gray-300 rounded-xl hover:bg-gray-50"
              >
                [DEV] Simuler la connexion Xaman
              </button>
            )}

            {state.walletConnected && (
              <InfoBox>
                ✅ <strong>{t("steps.connect.success_title")}</strong>
                <br />
                {t("steps.connect.address_confirmed", {
                  address: formatAddress(state.xrplAddress),
                })}
                <br />
                <span className="text-xs text-gray-400 mt-1 block">
                  🔒 {t("steps.connect.security_note")}
                </span>
              </InfoBox>
            )}

            {!state.walletConnected && (
              <p className="text-xs text-gray-400 text-center animate-pulse">
                {t("steps.connect.waiting")}
              </p>
            )}
          </>
        )}
      </StepShell>
    );
  }

  // COMPLETE
  if (state.currentStep === "complete") {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">{t("steps.complete.title")}</h1>
        <p className="text-sm text-gray-500 mb-8">{t("steps.complete.subtitle")}</p>

        {/* Récapitulatif */}
        <div className="text-left border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-medium text-gray-500">{t("steps.complete.summary_title")}</p>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between items-center p-3 text-sm">
              <span className="text-gray-500">{t("steps.complete.wallet_label")}</span>
              <span className="font-mono text-gray-900">{formatAddress(state.xrplAddress)}</span>
            </div>
            <div className="flex justify-between items-center p-3 text-sm">
              <span className="text-gray-500">{t("steps.complete.stablecoin_label")}</span>
              <span className="font-medium text-gray-900">
                {state.stablecoin === "both" ? "GEUR + RLUSD" : state.stablecoin?.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 text-sm">
              <span className="text-gray-500">{t("steps.complete.status_label")}</span>
              <Badge type="ok">✓ {t("steps.complete.status_active")}</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={`/${locale}/rhum`}
            className="w-full py-3 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 block"
          >
            {t("steps.complete.cta_primary")}
          </a>
          <a
            href={`/${locale}/dashboard`}
            className="w-full py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 block"
          >
            {t("steps.complete.cta_secondary")}
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          {t("steps.complete.help_label")}{" "}
          <a href={`/${locale}/contact`} className="text-emerald-600 underline underline-offset-2">
            {t("steps.complete.help_link")}
          </a>
        </p>
      </div>
    );
  }

  return null;
}