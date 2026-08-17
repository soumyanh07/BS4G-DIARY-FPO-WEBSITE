import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  createRequirement,
  getCustomerProfile,
  type RequirementCreate,
  type CustomerProfile,
} from "../lib/api";

export default function BookMilk() {
  const navigate = useNavigate();

  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("customer_token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    if (!qty || Number(qty) <= 0) {
      setError("Please enter a valid milk quantity.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter your location.");
      return;
    }

    try {
      setLoading(true);

        // fetch customer profile to obtain name and contact
        let custName = "Customer";
        let custContact = "";

        try {
          const profile: CustomerProfile = await getCustomerProfile(token);
          custName = profile.name || custName;
          custContact = (profile.contact || "").replace(/\s|\-|\+/g, "");
        } catch (e) {
          // if profile cannot be fetched, proceed with defaults — backend will validate
        }

        // Ensure contact meets backend criteria
        if (!custContact || !/^[0-9]+$/.test(custContact) || custContact.length < 10) {
          setError("Your account contact number is invalid. Please update your profile before submitting.");
          return;
        }

        const data: RequirementCreate = {
          name: custName,
          contact: custContact,
          qty_litres: Number(qty),
          location: location.trim(),
          note: note.trim() || undefined,
        };

        await createRequirement(data, token);

      setSuccess(
        "Your milk requirement has been submitted successfully.",
      );

      setQty("");
      setLocation("");
      setNote("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit requirement.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🥛</div>

        <h1 style={styles.title}>Book Milk</h1>

        <p style={styles.subtitle}>
          Submit your daily milk requirement.
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <label style={styles.label}>
            Milk Quantity (Litres / Day)

            <input
              type="number"
              min="1"
              step="0.5"
              value={qty}
              onChange={(e) =>
                setQty(e.target.value)
              }
              placeholder="Example: 5"
              style={styles.input}
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            Delivery Location

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Enter your location"
              style={styles.input}
              disabled={loading}
            />
          </label>

          <label style={styles.label}>
            Note

            <textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Any special requirement..."
              style={styles.textarea}
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Submitting..."
              : "Submit Requirement"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/customer/dashboard")
            }
            style={styles.backButton}
          >
            ← Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "40px 20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    fontFamily:
      "Inter, system-ui, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxSizing: "border-box",
    boxShadow: "0 8px 30px rgba(30,60,90,.08)",
  },

  icon: {
    fontSize: "42px",
    textAlign: "center",
  },

  title: {
    textAlign: "center",
    color: "#173b68",
    margin: "10px 0 5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#667085",
    fontSize: "13px",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    color: "#344054",
    fontSize: "13px",
    fontWeight: 600,
  },

  input: {
    height: "46px",
    border: "1px solid #d8e1e8",
    borderRadius: "9px",
    padding: "0 13px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  textarea: {
    minHeight: "100px",
    resize: "vertical",
    border: "1px solid #d8e1e8",
    borderRadius: "9px",
    padding: "12px",
    fontSize: "14px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  button: {
    height: "46px",
    border: "none",
    borderRadius: "9px",
    background: "#087c43",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  backButton: {
    height: "42px",
    border: "1px solid #d8e1e8",
    borderRadius: "9px",
    background: "#fff",
    color: "#344054",
    cursor: "pointer",
  },

  error: {
    padding: "12px",
    marginBottom: "15px",
    background: "#fff1f1",
    color: "#c62828",
    borderRadius: "8px",
    fontSize: "13px",
  },

  success: {
    padding: "12px",
    marginBottom: "15px",
    background: "#e7f8ed",
    color: "#16864a",
    borderRadius: "8px",
    fontSize: "13px",
  },
};