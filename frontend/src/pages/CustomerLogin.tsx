import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customerLogin } from "../lib/api";

export default function CustomerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await customerLogin({
        email: email.trim(),
        password,
      });

      // Store customer authentication token
      sessionStorage.setItem(
        "customer_token",
        response.access_token,
      );

      // Go to customer dashboard
      navigate("/customer/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img
            src="/logo.png"
            alt="BS4G Dairy FPO"
            style={styles.logo}
          />
        </div>

        {/* Heading */}
        <div style={styles.headingSection}>
          <h1 style={styles.title}>Welcome Back</h1>

          <p style={styles.subtitle}>
            Login to your BS4G Dairy FPO customer account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>!</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>✉</span>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={loading}
                autoComplete="email"
                style={styles.input}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.field}>
            <div style={styles.passwordHeader}>
              <label
                htmlFor="password"
                style={styles.label}
              >
                Password
              </label>

              <button
                type="button"
                style={styles.forgotButton}
                onClick={() => {
                  alert(
                    "Password recovery will be added soon.",
                  );
                }}
              >
                Forgot password?
              </button>
            </div>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                disabled={loading}
                autoComplete="current-password"
                style={styles.input}
              />
            </div>
          </div>

          {/* Remember me */}
          <label style={styles.rememberRow}>
            <input
              type="checkbox"
              style={styles.checkbox}
            />

            <span>Remember me</span>
          </label>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              ...(loading ? styles.loginButtonDisabled : {}),
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}>⟳</span>
                Logging in...
              </>
            ) : (
              "Customer Login"
            )}
          </button>
        </form>

        {/* Register */}
        <div style={styles.registerSection}>
          <span>Don't have an account?</span>

          <Link
            to="/customer/register"
            style={styles.registerLink}
          >
            Register here
          </Link>
        </div>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Back to home */}
        <Link to="/" style={styles.backButton}>
          ← Back to Home
        </Link>

        {/* Footer */}
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
    padding: "32px 20px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #f4faf5 0%, #eef7ff 50%, #f8fbf7 100%)",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  backgroundGlowOne: {
    position: "absolute",
    width: "380px",
    height: "380px",
    borderRadius: "50%",
    background: "rgba(20, 150, 80, 0.08)",
    top: "-160px",
    left: "-120px",
  },

  backgroundGlowTwo: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "rgba(30, 91, 180, 0.07)",
    bottom: "-190px",
    right: "-140px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255, 255, 255, 0.97)",
    borderRadius: "24px",
    padding: "34px 38px 28px",
    boxSizing: "border-box",
    boxShadow:
      "0 20px 60px rgba(25, 55, 80, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    position: "relative",
    zIndex: 2,
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    height: "105px",
    overflow: "hidden",
  },

  logo: {
    width: "115px",
    height: "100px",
    objectFit: "contain",
    offsetPosition: "center",
    borderRadius: "0",
    mixBlendMode: "multiply",
  },

  headingSection: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    margin: "0 0 7px",
    color: "#173b68",
    fontSize: "28px",
    fontWeight: 700,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "11px 13px",
    marginBottom: "18px",
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
    flexShrink: 0,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: "#263b55",
    fontSize: "13px",
    fontWeight: 600,
  },

  forgotButton: {
    border: "none",
    background: "transparent",
    color: "#1467b3",
    fontSize: "12px",
    cursor: "pointer",
    padding: 0,
  },

  inputWrapper: {
    height: "48px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #d8e1e8",
    borderRadius: "10px",
    background: "#fff",
    transition: "border-color 0.2s ease",
    overflow: "hidden",
  },

  inputIcon: {
    width: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#16864a",
    fontSize: "16px",
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

  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#667085",
    fontSize: "12px",
    cursor: "pointer",
    marginTop: "-4px",
  },

  checkbox: {
    width: "14px",
    height: "14px",
    accentColor: "#16864a",
    cursor: "pointer",
  },

  loginButton: {
    height: "48px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #087c43, #149b58)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 7px 18px rgba(8, 124, 67, 0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "2px",
  },

  loginButtonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  spinner: {
    fontSize: "18px",
    animation: "none",
  },

  registerSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "20px",
    color: "#6b7280",
    fontSize: "12px",
  },

  registerLink: {
    color: "#1269b0",
    fontWeight: 700,
    textDecoration: "none",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "22px 0 17px",
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

  backButton: {
    height: "42px",
    borderRadius: "9px",
    border: "1px solid #dbe4ea",
    background: "#fff",
    color: "#344054",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 600,
  },

  footer: {
    textAlign: "center",
    margin: "17px 0 0",
    color: "#1d5fa8",
    fontSize: "10px",
    letterSpacing: "0.5px",
    fontWeight: 600,
  },
};