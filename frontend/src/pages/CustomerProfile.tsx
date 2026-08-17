import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomerProfile,
  type CustomerProfile as CustomerProfileType,
} from "../lib/api";

export default function CustomerProfile() {
  const [profile, setProfile] =
    useState<CustomerProfileType | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const token =
        sessionStorage.getItem("customer_token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const data =
          await getCustomerProfile(token);

        setProfile(data);
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
  }, []);

  if (loading) {
    return (
      <div style={styles.page}>
        Loading profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={styles.page}>
        <div style={styles.error}>
          {error || "Profile unavailable."}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {profile.name.charAt(0).toUpperCase()}
        </div>

        <h1 style={styles.name}>
          {profile.name}
        </h1>

        <p style={styles.role}>
          BS4G Dairy FPO Customer
        </p>

        <div style={styles.info}>
          <div style={styles.row}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>

          <div style={styles.row}>
            <span>Phone</span>
            <strong>{profile.contact}</strong>
          </div>

          <div style={styles.row}>
            <span>Member Since</span>
            <strong>
              {new Date(
                profile.created_at,
              ).toLocaleDateString("en-IN")}
            </strong>
          </div>

          <div style={styles.row}>
            <span>Total Requirements</span>
            <strong>
              {profile.total_requirements}
            </strong>
          </div>

          <div style={styles.row}>
            <span>Total Requested</span>
            <strong>
              {profile.total_requested_litres} L
            </strong>
          </div>
        </div>

        <Link
          to="/customer/profile/edit"
          style={styles.edit}
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "40px",
    boxSizing: "border-box",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  card: {
    maxWidth: "550px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "16px",
    padding: "35px",
    textAlign: "center",
    border: "1px solid #e5eaf0",
  },

  avatar: {
    width: "75px",
    height: "75px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "#e8f2fc",
    color: "#173b68",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: 700,
  },

  name: {
    color: "#173b68",
    margin: 0,
  },

  role: {
    color: "#667085",
    fontSize: "13px",
    marginBottom: "25px",
  },

  info: {
    textAlign: "left",
    borderTop: "1px solid #eef1f4",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "15px 0",
    borderBottom: "1px solid #eef1f4",
    fontSize: "13px",
  },

  edit: {
    display: "block",
    marginTop: "25px",
    background: "#087c43",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "13px",
  },

  error: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    background: "#fff1f1",
    color: "#c62828",
    borderRadius: "10px",
  },
};