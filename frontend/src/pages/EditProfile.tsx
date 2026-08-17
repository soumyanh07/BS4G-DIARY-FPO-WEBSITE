import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../lib/api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token =
        sessionStorage.getItem("customer_token");

      if (!token) {
        navigate("/customer/login");
        return;
      }

      try {
        const profile =
          await getCustomerProfile(token);

        setName(profile.name);
        setEmail(profile.email);
        setContact(profile.contact);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load profile.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const token =
      sessionStorage.getItem("customer_token");

    if (!token) {
      navigate("/customer/login");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateCustomerProfile(
        {
          name: name.trim(),
          email: email.trim(),
          contact: contact.trim(),
        },
        token,
      );

      navigate("/customer/profile");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        Loading profile...
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Edit Profile
        </h1>

        <p style={styles.subtitle}>
          Update your BS4G Dairy FPO account information.
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <label style={styles.label}>
            Full Name

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={styles.input}
              required
            />
          </label>

          <label style={styles.label}>
            Phone Number

            <input
              value={contact}
              onChange={(e) =>
                setContact(e.target.value)
              }
              style={styles.input}
              required
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            style={styles.save}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/customer/profile")
            }
            style={styles.cancel}
          >
            Cancel
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
    fontFamily: "Inter, system-ui, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxSizing: "border-box",
    border: "1px solid #e5eaf0",
  },

  title: {
    margin: 0,
    color: "#173b68",
  },

  subtitle: {
    color: "#667085",
    fontSize: "13px",
    marginBottom: "25px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "17px",
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
    height: "45px",
    border: "1px solid #d8e1e8",
    borderRadius: "8px",
    padding: "0 12px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  save: {
    height: "45px",
    border: "none",
    borderRadius: "8px",
    background: "#087c43",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  cancel: {
    height: "43px",
    border: "1px solid #d8e1e8",
    borderRadius: "8px",
    background: "#fff",
    color: "#344054",
    cursor: "pointer",
  },

  error: {
    padding: "12px",
    marginBottom: "18px",
    background: "#fff1f1",
    color: "#c62828",
    borderRadius: "8px",
    fontSize: "13px",
  },
};