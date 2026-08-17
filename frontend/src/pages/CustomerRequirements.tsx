import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomerRequirements,
  type Requirement,
} from "../lib/api";

export default function CustomerRequirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequirements() {
      const token = sessionStorage.getItem("customer_token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCustomerRequirements(token);
        setRequirements(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load requirements.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadRequirements();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Requirements</h1>
          <p style={styles.subtitle}>
            View and track all your milk requirements.
          </p>
        </div>

        <Link to="/customer/book-milk" style={styles.button}>
          + Book Milk
        </Link>
      </div>

      {loading && (
        <div style={styles.message}>
          Loading your requirements...
        </div>
      )}

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {!loading && !error && requirements.length === 0 && (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🥛</div>
          <h2>No requirements yet</h2>
          <p>
            You haven't submitted any milk requirements.
          </p>

          <Link
            to="/customer/book-milk"
            style={styles.button}
          >
            Book Milk
          </Link>
        </div>
      )}

      {!loading && requirements.length > 0 && (
        <div style={styles.card}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Note</th>
                </tr>
              </thead>

              <tbody>
                {requirements.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>
                      {new Date(
                        item.submitted_at,
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td style={styles.td}>
                      <strong>
                        {item.qty_litres} L/day
                      </strong>
                    </td>

                    <td style={styles.td}>
                      {item.location}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          ...(item.status === "fulfilled"
                            ? styles.fulfilled
                            : item.status === "cancelled"
                              ? styles.cancelled
                              : item.status === "contacted"
                                ? styles.contacted
                                : styles.newStatus),
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {item.note || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    boxSizing: "border-box",
    background: "#f7fafc",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    color: "#173b68",
    fontSize: "26px",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#667085",
    fontSize: "13px",
  },

  button: {
    background: "#087c43",
    color: "#fff",
    padding: "11px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
  },

  card: {
    background: "#fff",
    border: "1px solid #e5eaf0",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(30, 60, 90, 0.05)",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px 16px",
    background: "#f5f8fb",
    color: "#344054",
    fontSize: "11px",
    fontWeight: 700,
    borderBottom: "1px solid #e5eaf0",
  },

  td: {
    padding: "15px 16px",
    color: "#475467",
    fontSize: "12px",
    borderBottom: "1px solid #eef1f4",
  },

  status: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "capitalize",
  },

  newStatus: {
    background: "#e8f2ff",
    color: "#1769aa",
  },

  contacted: {
    background: "#e1f3ff",
    color: "#0875b1",
  },

  fulfilled: {
    background: "#dcf7e7",
    color: "#16864a",
  },

  cancelled: {
    background: "#fee4e2",
    color: "#d92d20",
  },

  message: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#667085",
  },

  error: {
    background: "#fff1f1",
    border: "1px solid #ffd0d0",
    color: "#c62828",
    padding: "15px",
    borderRadius: "10px",
  },

  empty: {
    background: "#fff",
    borderRadius: "14px",
    padding: "60px 20px",
    textAlign: "center",
    color: "#667085",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },
};