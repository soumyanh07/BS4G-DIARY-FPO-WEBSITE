import { useState } from "react";
import type { FormEvent } from "react";

import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000";

export default function TeamLogin() {
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!passcode.trim()) {
      setError("Please enter the team passcode.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 Team login started");

      const response = await fetch(
        `${API_BASE_URL}/api/team/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            passcode: passcode.trim(),
          }),
        },
      );

      console.log(
        "📡 Login response:",
        response.status,
      );

      const data = await response.json();

      console.log("📦 Login data:", data);

      if (!response.ok) {
        throw new Error(
          data?.detail || "Invalid team passcode",
        );
      }

      if (!data.access_token) {
        throw new Error(
          "Authentication succeeded but access token is missing.",
        );
      }

      // IMPORTANT
      sessionStorage.setItem(
        "team_token",
        data.access_token,
      );

      console.log(
        "✅ team_token saved:",
        sessionStorage.getItem("team_token"),
      );

      // Small delay ensures storage is committed
      setTimeout(() => {
        console.log(
          "➡️ Navigating to /team/dashboard",
        );

        navigate("/team/dashboard", {
          replace: true,
        });
      }, 100);

    } catch (err) {
      console.error("❌ Team login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to login.",
      );

      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <img
          src="/logo.png"
          alt="BS4G Dairy FPO"
          style={styles.logo}
        />

        <h1 style={styles.title}>
          FPO Team Login
        </h1>

        <p style={styles.subtitle}>
          Enter the team passcode to access customer
          milk requirements.
        </p>

        {error && (
          <div style={styles.error}>
            <strong>Login Error</strong>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label style={styles.label}>
            Team Passcode
          </label>

          <div style={styles.inputBox}>
            <span>🔐</span>

            <input
              type="password"
              value={passcode}
              onChange={(e) =>
                setPasscode(e.target.value)
              }
              placeholder="Enter team passcode"
              disabled={loading}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? "Authenticating..."
              : "Team Login"}
          </button>

        </form>

        <div style={styles.privateBox}>
          🔒
          <div>
            <strong>
              PRIVATE FPO ACCESS
            </strong>

            <span>
              Authorized team members only
            </span>
          </div>
        </div>

        <button
          type="button"
          style={styles.link}
          onClick={() =>
            navigate("/customer/login")
          }
        >
          Customer Login
        </button>

        <button
          type="button"
          style={styles.link}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div style={styles.footer}>
          BS4G Dairy FPO • Team Administration
        </div>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f9fc",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow:
      "0 15px 50px rgba(20,50,80,0.12)",
    textAlign: "center",
  },

  logo: {
    width: "65px",
    height: "65px",
    objectFit: "contain",
    marginBottom: "15px",
  },

  title: {
    margin: 0,
    color: "#173b68",
    fontSize: "24px",
    fontWeight: 800,
  },

  subtitle: {
    color: "#7b8794",
    fontSize: "12px",
    lineHeight: 1.6,
    marginBottom: "25px",
  },

  error: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gap: "4px",
    padding: "12px",
    marginBottom: "15px",
    background: "#fff1f1",
    border: "1px solid #ffd0d0",
    borderRadius: "8px",
    color: "#b42318",
    fontSize: "11px",
  },

  label: {
    display: "block",
    textAlign: "left",
    marginBottom: "7px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#344054",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height: "48px",
    border: "1px solid #d8e2eb",
    borderRadius: "8px",
    padding: "0 12px",
    marginBottom: "15px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "13px",
  },

  button: {
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "8px",
    background: "#0864ad",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  privateBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textAlign: "left",
    marginTop: "20px",
    padding: "12px",
    borderRadius: "8px",
    background: "#f4f8fc",
    color: "#173b68",
    fontSize: "16px",
  },

  link: {
    display: "block",
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#1269b0",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "15px",
  },

  footer: {
    marginTop: "25px",
    paddingTop: "15px",
    borderTop: "1px solid #edf1f5",
    color: "#98a2b3",
    fontSize: "9px",
  },
};