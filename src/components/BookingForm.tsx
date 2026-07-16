"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { APPS_SCRIPT_URL, BOOKING_TOKEN, DOCTOR } from "@/lib/constants";

type FormState = {
  name: string;
  mobile: string;
  date: string;
  timeSlot: string;
  problem: string;
  visitType: "new" | "followup";
};

const INITIAL_STATE: FormState = {
  name: "",
  mobile: "",
  date: "",
  timeSlot: "",
  problem: "",
  visitType: "new",
};

const inputClasses =
  "w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-body placeholder:text-faint focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10";

const labelClasses =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");
  // honeypot — invisible to humans, bots fill it and get silently dropped
  const [website, setWebsite] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!APPS_SCRIPT_URL) {
      setServerMessage("");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      // URL-encoded body = a CORS "simple request" — no preflight,
      // which is the one shape Apps Script accepts cross-origin.
      const body = new URLSearchParams({
        token: BOOKING_TOKEN,
        name: form.name.trim(),
        mobile: form.mobile,
        date: form.date,
        timeSlot: form.timeSlot,
        visitType: form.visitType,
        problem: form.problem.trim(),
        website, // honeypot, must be empty
      });

      const response = await fetch(APPS_SCRIPT_URL, { method: "POST", body });
      if (!response.ok) throw new Error("Submission failed");

      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!result.ok) {
        // friendly validation messages from the backend (e.g. duplicate)
        if (result.error && result.error.length > 20) {
          setServerMessage(result.error);
        }
        throw new Error(result.error || "Submission rejected");
      }

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-white p-12 text-center shadow-card">
        <span aria-hidden="true" className="accent-line absolute inset-x-0 top-0 h-1" />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <CheckCircle2 className="h-14 w-14 text-green-600" />
        </motion.div>
        <h3 className="mt-5 font-serif text-2xl font-bold text-heading">
          Appointment Request Received
        </h3>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Thank you! Our clinic team will call you shortly on the number
          provided to confirm your appointment slot.
        </p>
        <p className="mt-2 text-sm text-faint">
          Need it faster? Call us directly at{" "}
          <a
            href={`tel:${DOCTOR.phoneRaw}`}
            className="font-semibold text-teal hover:underline"
          >
            {DOCTOR.phone}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-dark hover:scale-105"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-card md:p-10"
    >
      <span aria-hidden="true" className="accent-line absolute inset-x-0 top-0 h-1" />

      {/* Honeypot — hidden from humans (and screen readers); bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClasses}>
            Full Name
          </label>
          <input
            id="name"
            required
            type="text"
            maxLength={80}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Enter your full name"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="mobile" className={labelClasses}>
            Mobile Number
          </label>
          <input
            id="mobile"
            required
            type="tel"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            title="Please enter a valid 10-digit mobile number"
            value={form.mobile}
            onChange={(e) =>
              update("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile number"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="date" className={labelClasses}>
            Preferred Date
          </label>
          <input
            id="date"
            required
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="timeSlot" className={labelClasses}>
            Preferred OPD Slot
          </label>
          <select
            id="timeSlot"
            required
            value={form.timeSlot}
            onChange={(e) => update("timeSlot", e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select a slot
            </option>
            <option value={`Afternoon OPD (${DOCTOR.opd.afternoon})`}>
              Afternoon OPD ({DOCTOR.opd.afternoon})
            </option>
            <option value={`Evening OPD (${DOCTOR.opd.evening})`}>
              Evening OPD ({DOCTOR.opd.evening})
            </option>
          </select>
        </div>

        <div>
          <span className={labelClasses}>Visit Type</span>
          <div className="flex gap-5 pt-1">
            <label className="flex items-center gap-2 text-sm text-body">
              <input
                type="radio"
                name="visitType"
                checked={form.visitType === "new"}
                onChange={() => update("visitType", "new")}
                className="h-4 w-4 accent-teal"
              />
              New Patient
            </label>
            <label className="flex items-center gap-2 text-sm text-body">
              <input
                type="radio"
                name="visitType"
                checked={form.visitType === "followup"}
                onChange={() => update("visitType", "followup")}
                className="h-4 w-4 accent-teal"
              />
              Follow-up
            </label>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="problem" className={labelClasses}>
            Briefly Describe Your Concern
          </label>
          <textarea
            id="problem"
            required
            rows={4}
            maxLength={500}
            value={form.problem}
            onChange={(e) => update("problem", e.target.value)}
            placeholder="e.g. Knee pain for the past 2 weeks, difficulty walking"
            className={`${inputClasses} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          {serverMessage ||
            `Something went wrong while submitting your request. Please call us directly at ${DOCTOR.phone}.`}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-white shadow-hover transition-colors hover:bg-teal-dark disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Request Appointment
          </>
        )}
      </motion.button>
    </form>
  );
}
