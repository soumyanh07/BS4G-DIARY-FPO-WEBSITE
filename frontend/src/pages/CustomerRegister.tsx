import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  customerRegister,
} from "../lib/api";

interface RegisterForm {
  name: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
}

export default function CustomerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(
    field: keyof RegisterForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim();
    const contact = form.contact.trim();

    if (!name || !email || !contact || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await customerRegister({
        name,
        email,
        contact,
        password: form.password,
      });

      sessionStorage.setItem(
        "customer_token",
        response.access_token,
      );

      setSuccess(
        "Account created successfully. Redirecting...",
      );

      setTimeout(() => {
        navigate("/customer/dashboard");
      }, 700);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>

      {/* Decorative background */}
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>

        {/* =================================================
            LOGO
        ================================================= */}
        <div style={styles.logoContainer}>
          <img
            src="/logo.png"
            alt="BS4G Dairy FPO"
            style={styles.logo}
          />
        </div>


        {/* =================================================
            HEADING
        ================================================= */}
        <div style={styles.heading}>
          <h1 style={styles.title}>
            Create Your Account
          </h1>

          <p style={styles.subtitle}>
            Join BS4G Dairy FPO and manage your milk
            requirements easily.
          </p>
        </div>


        {/* =================================================
            ERROR
        ================================================= */}
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>
              !
            </span>

            <span>{error}</span>
          </div>
        )}


        {/* =================================================
            SUCCESS
        ================================================= */}
        {success && (
          <div style={styles.successBox}>
            <span>✓</span>
            <span>{success}</span>
          </div>
        )}


        {/* =================================================
            FORM
        ================================================= */}
        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          {/* Full Name */}
          <div style={styles.field}>
            <label
              htmlFor="name"
              style={styles.label}
            >
              Full Name
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>
                👤
              </span>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(event) =>
                  handleChange(
                    "name",
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="name"
                style={styles.input}
              />
            </div>
          </div>


          {/* Email */}
          <div style={styles.field}>
            <label
              htmlFor="email"
              style={styles.label}
            >
              Email Address
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>
                ✉
              </span>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(event) =>
                  handleChange(
                    "email",
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="email"
                style={styles.input}
              />
            </div>
          </div>


          {/* Phone */}
          <div style={styles.field}>
            <label
              htmlFor="contact"
              style={styles.label}
            >
              Phone Number
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>
                📱
              </span>

              <input
                id="contact"
                type="tel"
                placeholder="Enter your phone number"
                value={form.contact}
                onChange={(event) =>
                  handleChange(
                    "contact",
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="tel"
                style={styles.input}
              />
            </div>
          </div>


          {/* Password */}
          <div style={styles.field}>
            <label
              htmlFor="password"
              style={styles.label}
            >
              Password
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>
                🔒
              </span>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(event) =>
                  handleChange(
                    "password",
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="new-password"
                style={styles.input}
              />
            </div>
          </div>


          {/* Confirm Password */}
          <div style={styles.field}>
            <label
              htmlFor="confirmPassword"
              style={styles.label}
            >
              Confirm Password
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>
                🔐
              </span>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(event) =>
                  handleChange(
                    "confirmPassword",
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="new-password"
                style={styles.input}
              />
            </div>
          </div>


          {/* Terms */}
          <label style={styles.terms}>
            <input
              type="checkbox"
              required
              style={styles.checkbox}
            />

            <span>
              I agree to the BS4G Dairy FPO terms
              and conditions.
            </span>
          </label>


          {/* Create Account */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.registerButton,
              ...(loading
                ? styles.disabledButton
                : {}),
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* =================================================
            LOGIN
        ================================================= */}
        <div style={styles.loginRow}>
          <span>
            Already have an account?
          </span>

          <Link
            to="/customer/login"
            style={styles.loginLink}
          >
            Login here
          </Link>
        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />

          <span style={styles.dividerText}>
            OR
          </span>

          <div style={styles.dividerLine} />
        </div>


        {/* =================================================
            FPO TEAM
        ================================================= */}
        <Link
          to="/team/login"
          style={styles.teamButton}
        >
          <span style={styles.teamIcon}>
            T
          </span>

          <span>
            FPO Team
          </span>
        </Link>


        {/* =================================================
            BACK HOME
        ================================================= */}
        <Link
          to="/"
          style={styles.backHome}
        >
          ← Back to Home
        </Link>


        <p style={styles.footer}>
          Pure Milk • Strong Farms • Better Future
        </p>

      </div>
    </div>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles: Record<string, React.CSSProperties> = {

  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #f4faf5 0%, #eef7ff 50%, #f8fbf7 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  glowOne: {
    position: "absolute",
    width: "380px",
    height: "380px",
    borderRadius: "50%",
    background:
      "rgba(20, 150, 80, 0.08)",
    top: "-160px",
    left: "-120px",
  },

  glowTwo: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "rgba(30, 91, 180, 0.07)",
    bottom: "-190px",
    right: "-140px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "30px 38px 26px",
    boxSizing: "border-box",
    boxShadow:
      "0 20px 60px rgba(25, 55, 80, 0.14)",
    border:
      "1px solid rgba(255,255,255,0.8)",
    position: "relative",
    zIndex: 2,
  },

  logoContainer: {
    height: "82px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "8px",
  },

  logo: {
    width: "90px",
    height: "78px",
    objectFit: "contain",
  },

  heading: {
    textAlign: "center",
    marginBottom: "22px",
  },

  title: {
    margin: "0 0 7px",
    color: "#173b68",
    fontSize: "27px",
    fontWeight: 700,
  },

  subtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: 1.5,
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "11px 13px",
    marginBottom: "16px",
    borderRadius: "10px",
    background: "#fff1f1",
    border: "1px solid #ffd0d0",
    color: "#c62828",
    fontSize: "13px",
  },

  errorIcon: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#e53935",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 700,
  },

  successBox: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "11px 13px",
    marginBottom: "16px",
    borderRadius: "10px",
    background: "#ecfdf3",
    border: "1px solid #b7ebc6",
    color: "#087c43",
    fontSize: "13px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    color: "#263b55",
    fontSize: "13px",
    fontWeight: 600,
  },

  inputWrapper: {
    height: "46px",
    display: "flex",
    alignItems: "center",
    border:
      "1px solid #d8e1e8",
    borderRadius: "10px",
    background: "#fff",
    overflow: "hidden",
  },

  icon: {
    width: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
  },

  input: {
    flex: 1,
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "0 12px 0 0",
    color: "#1f2937",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  terms: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    color: "#667085",
    fontSize: "11px",
    lineHeight: 1.4,
    cursor: "pointer",
    marginTop: "1px",
  },

  checkbox: {
    width: "14px",
    height: "14px",
    accentColor: "#16864a",
    flexShrink: 0,
    marginTop: "1px",
  },

  registerButton: {
    height: "48px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #087c43, #149b58)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 7px 18px rgba(8, 124, 67, 0.22)",
    marginTop: "3px",
  },

  disabledButton: {
    opacity: 0.65,
    cursor: "not-allowed",
  },

  loginRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "18px",
    color: "#6b7280",
    fontSize: "12px",
  },

  loginLink: {
    color: "#1269b0",
    fontWeight: 700,
    textDecoration: "none",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0 15px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e5e7eb",
  },

  dividerText: {
    color: "#9ca3af",
    fontSize: "10px",
    fontWeight: 600,
  },

  teamButton: {
    height: "44px",
    borderRadius: "9px",
    border: "1px solid #d5e0ea",
    background: "#f8fbff",
    color: "#173b68",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    transition: "all 0.2s ease",
  },

  teamIcon: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#173b68",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
  },

  backHome: {
    height: "40px",
    marginTop: "10px",
    borderRadius: "9px",
    border: "1px solid #e1e7ed",
    background: "#fff",
    color: "#344054",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: 600,
  },

  footer: {
    textAlign: "center",
    margin: "15px 0 0",
    color: "#1d5fa8",
    fontSize: "10px",
    letterSpacing: "0.5px",
    fontWeight: 600,
  },
};