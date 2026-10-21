"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { DEFAULT_REQUEST_TYPE, parseRequestType } from "@/data/contact";
import { mailto, siteConfig, type RequestType } from "@/data/site";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Content } from "@/i18n/content";
import type { ContactField } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";
type FieldErrors = Partial<Record<ContactField, string>>;

/** Visual order of the fields, used to find the first one with an error. */
const FIELD_ORDER: ContactField[] = ["name", "email", "company", "type", "message", "consent"];

function Field({
  id,
  label,
  error,
  optional,
  optionalLabel,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-[6px] block text-small font-semibold text-strong">
        {label}
        {optional && <span className="font-normal text-subtle"> {optionalLabel}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-[6px] text-small text-[#ffb0b0]">
          {error}
        </p>
      )}
    </div>
  );
}

interface ContactFormProps {
  lang: Locale;
  form: Content["copy"]["form"];
  requestTypes: Content["requestTypes"];
}

function ContactFormView({ lang, form, requestTypes }: ContactFormProps) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [type, setType] = useState<RequestType>(DEFAULT_REQUEST_TYPE);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const onRequestedType = useCallback((next: RequestType) => setType(next), []);

  const id = (field: string) => `${uid}-${field}`;
  const fieldProps = (field: ContactField) => ({
    id: id(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id(field)}-error` : undefined,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      type: String(data.get("type") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };

      if (response.ok) {
        setStatus("success");
        return;
      }
      if (response.status === 400 && result.error === "validation") {
        const messages = form.errors as Record<string, string>;
        const fields = Object.fromEntries(
          Object.entries(result.fields ?? {}).map(([field, code]) => [field, messages[code] ?? code]),
        ) as FieldErrors;
        setErrors(fields);
        setStatus("error");
        // Move focus to the first invalid field so keyboard and screen reader users land on the problem.
        const first = FIELD_ORDER.find((field) => fields[field]);
        if (first) requestAnimationFrame(() => document.getElementById(id(first))?.focus());
        return;
      }
      setStatus(response.status === 429 ? "error" : "unavailable");
      if (response.status === 429) setErrors({});
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-[rgba(121,219,231,.35)] bg-[rgba(5,12,25,.45)] p-6">
        <h3 className="text-xl font-bold">{form.successTitle}</h3>
        <p className="mt-2 text-body leading-[1.65] text-muted">
          {form.successText.replace("{name}", name.trim().split(/\s+/)[0])}
        </p>
      </div>
    );
  }

  const topicLabel = requestTypes.find((option) => option.value === type)?.label ?? type;
  const fallbackHref = `${mailto(`${topicLabel} — ${form.fallbackSubject}`)}&body=${encodeURIComponent(message)}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-label={form.ariaLabel}>
      <Suspense fallback={null}>
        <RequestTypeFromQuery onType={onRequestedType} />
      </Suspense>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field optionalLabel={form.optional} id={id("name")} label={form.name} error={errors.name}>
          <input
            {...fieldProps("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field"
          />
        </Field>
        <Field optionalLabel={form.optional} id={id("email")} label={form.email} error={errors.email}>
          <input
            {...fieldProps("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className="field"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field optionalLabel={form.optional} id={id("company")} label={form.company} error={errors.company} optional>
          <input
            {...fieldProps("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className="field"
          />
        </Field>
        <Field optionalLabel={form.optional} id={id("type")} label={form.topic} error={errors.type}>
          <div className="relative">
            <select
              {...fieldProps("type")}
              name="type"
              required
              value={type}
              onChange={(event) => setType(event.target.value as RequestType)}
              className="field appearance-none pr-10"
            >
              {requestTypes.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#0b1426]">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-label"
            />
          </div>
        </Field>
      </div>

      <Field optionalLabel={form.optional} id={id("message")} label={form.message} error={errors.message}>
        <textarea
          {...fieldProps("message")}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={form.placeholder}
          className="field resize-y"
        />
      </Field>

      {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {form.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-small leading-[1.55] text-strong">
          <input
            {...fieldProps("consent")}
            name="consent"
            type="checkbox"
            required
            className="checkbox mt-[1px]"
          />
          <span>
            {form.consentBefore}{" "}
            <Link href={localizedPath(lang, "/privacy")} className="text-label underline underline-offset-2 hover:text-white">
              {form.consentLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-error`} role="alert" className="mt-[6px] text-small text-[#ffb0b0]">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="rounded-xl border border-[rgba(255,138,138,.4)] bg-[rgba(255,138,138,.08)] px-4 py-3 text-sm text-[#ffc4c4]">
          {form.rateLimited}{" "}
          <a href={mailto()} className="underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      {status === "unavailable" && (
        <p role="alert" className="rounded-xl border border-[rgba(255,205,128,.4)] bg-[rgba(255,205,128,.08)] px-4 py-3 text-sm leading-[1.6] text-[#ffe0b0]">
          {form.unavailable}{" "}
          <a href={fallbackHref} className="font-bold underline underline-offset-2">
            {form.emailUs}
          </a>{" "}
          {form.emailUsAt} {siteConfig.email} {form.prefilled}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full disabled:opacity-60">
        {status === "submitting" ? form.sending : form.submit}
      </button>
    </form>
  );
}

/**
 * Reads `?type=...` so a CTA like "Request a review" lands on the form with that type selected.
 * Renders nothing: only this tiny reader sits inside Suspense, so the form itself is one stable tree
 * (no remount, nothing the visitor has typed is lost when the query becomes available).
 */
function RequestTypeFromQuery({ onType }: { onType: (type: RequestType) => void }) {
  const requested = parseRequestType(useSearchParams().get("type"));
  useEffect(() => {
    if (requested) onType(requested);
  }, [requested, onType]);
  return null;
}

export function ContactForm(props: ContactFormProps) {
  return <ContactFormView {...props} />;
}
