import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import {
  createRequirement,
} from "../lib/api";

export default function RequirementForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!contact.trim()) {
      setError("Please enter your contact number.");
      return;
    }

    // Client-side contact validation to match backend rules
    const cleanedContact = contact.replace(/\s|\-|\+/g, "");
    if (!/^[0-9]+$/.test(cleanedContact)) {
      setError("Contact must contain digits only (0-9). e.g. 9480123456");
      return;
    }

    if (cleanedContact.length < 10 || cleanedContact.length > 15) {
      setError("Contact must be between 10 and 15 digits.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError(
        "Please enter a valid milk quantity.",
      );
      return;
    }

    if (!location.trim() || location.trim().length < 2) {
      setError(
        "Please enter the delivery location (at least 2 characters).",
      );
      return;
    }

    try {
      setLoading(true);

      await createRequirement({
        name: name.trim(),
        contact: cleanedContact,
        qty_litres: Number(quantity),
        location: location.trim(),
        note: note.trim() || undefined,
      });

      setSuccess(true);

      setName("");
      setContact("");
      setQuantity("");
      setLocation("");
      setNote("");

      // Notify other parts of the app (and other tabs) that requirements changed
      try {
        // dispatch in current window
        window.dispatchEvent(new Event("requirements:changed"));
        // write a timestamp to localStorage so other tabs get a storage event
        localStorage.setItem("requirements_updated", String(Date.now()));
      } catch {
        // ignore if storage is not available
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="requirement"
      className="bg-cream px-6 py-20 lg:px-8"
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-paper-line bg-white shadow-sm lg:grid-cols-2">

        <div className="bg-ink p-8 text-white lg:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
            05 · Milk requirement
          </p>

          <h2 className="mt-5 font-display text-4xl leading-tight lg:text-5xl">
            Tell us what you need.
          </h2>

          <p className="mt-5 max-w-md leading-7 text-white/75">
            Your requirement goes into the BS4G
            procurement follow-up register so the
            team can review it and contact you.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Regular supply",
              "Buffalo milk",
              "Delivery",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={18}
                  className="text-brass"
                />
                <span className="text-sm text-white/85">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Your name *
              </label>

              <input
                className="field-input"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Phone / WhatsApp *
              </label>

              <input
                className="field-input"
                value={contact}
                onChange={(e) =>
                  setContact(e.target.value)
                }
                placeholder="98765 43210"
                type="tel"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Required quantity *
              </label>

              <div className="relative">
                <input
                  className="field-input pr-24"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="5"
                  type="number"
                  min="0.1"
                  step="0.1"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-ink-soft">
                  litres / day
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Delivery location *
              </label>

              <input
                className="field-input"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Area / town / village"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Additional note
              </label>

              <textarea
                className="field-input min-h-24 resize-y"
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
                placeholder="Anything else the team should know?"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                <strong>
                  Requirement submitted successfully.
                </strong>
                <br />
                The BS4G team can now review your
                requirement and contact you.
              </div>
            )}

            <p className="text-xs leading-5 text-ink-soft">
              By submitting this form, you are
              sharing your contact details with BS4G
              Dairy FPO for the purpose of following
              up on your milk requirement.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brass px-6 py-3.5 font-semibold text-white transition hover:bg-brass-dark disabled:opacity-60"
            >
              <Send size={17} />

              {loading
                ? "Submitting..."
                : "Submit requirement"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}