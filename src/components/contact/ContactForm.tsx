"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { copy } from "@/data/copy";
import { DEFAULT_REQUEST_TYPE, parseRequestType, requestTypeLabel, requestTypes } from "@/data/contact";
import { mailto, siteConfig, type RequestType } from "@/data/site";
import type { ContactField } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";
type FieldErrors = Partial<Record<ContactField, string>>;

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-[6px] block text-small font-semibold text-strong">
        {label}
        {optional && <span className="font-normal text-subtle"> {copy.form.optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-[6px] text-small text-[#ffb0b0]">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactFormView() {
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
        setErrors(result.fields ?? {});
        setStatus("error");
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
        <h3 className="text-xl font-bold">{copy.form.successTitle}</h3>
        <p className="mt-2 text-body leading-[1.65] text-muted">
          {copy.form.successText}
        </p>
      </div>
    );
  }

  const fallbackHref = `${mailto(`${requestTypeLabel(type)} — website inquiry`)}&body=${encodeURIComponent(message)}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-label={copy.form.ariaLabel}>
      <Suspense fallback={null}>
        <RequestTypeFromQuery onType={onRequestedType} />
      </Suspense>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("name")} label={copy.form.name} error={errors.name}>
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
        <Field id={id("email")} label={copy.form.email} error={errors.email}>
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
        <Field id={id("company")} label={copy.form.company} error={errors.company} optional>
          <input
            {...fieldProps("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={160}
            className="field"
          />
        </Field>
        <Field id={id("type")} label={copy.form.topic} error={errors.type}>
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

      <Field id={id("message")} label={copy.form.message} error={errors.message}>
        <textarea
          {...fieldProps("message")}
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.form.placeholder}
          className="field resize-y"
        />
      </Field>

      {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {copy.form.honeypot}
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
            {copy.form.consentBefore}{" "}
            <Link href="/privacy" className="text-label underline underline-offset-2 hover:text-white">
              {copy.form.consentLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-[6px] text-small text-[#ffb0b0]">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="rounded-xl border border-[rgba(255,138,138,.4)] bg-[rgba(255,138,138,.08)] px-4 py-3 text-sm text-[#ffc4c4]">
          {copy.form.rateLimited}{" "}
          <a href={mailto()} className="underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      {status === "unavailable" && (
        <p role="alert" className="rounded-xl border border-[rgba(255,205,128,.4)] bg-[rgba(255,205,128,.08)] px-4 py-3 text-sm leading-[1.6] text-[#ffe0b0]">
          {copy.form.unavailable}{" "}
          <a href={fallbackHref} className="font-bold underline underline-offset-2">
            {copy.form.emailUs}
          </a>{" "}
          {copy.form.emailUsAt} {siteConfig.email} {copy.form.prefilled}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full disabled:opacity-60">
        {status === "submitting" ? copy.form.sending : copy.form.submit}
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

export function ContactForm() {
  return <ContactFormView />;
}
