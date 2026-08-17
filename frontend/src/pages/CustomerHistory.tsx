import { useEffect, useState } from "react";
import {
  getCustomerRequirements,
  type Requirement,
} from "../lib/api";

export default function CustomerHistory() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      const token =
        sessionStorage.getItem("customer_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data =
          await getCustomerRequirements(token);

        setRequirements(data);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My History</h1>

      <p style={styles.subtitle}>
        Detailed history of your milk requirements.
      </p>

      {loading ? (
        <div style={styles.card}>
          Loading history...
        </div>
      ) : (
        <div style={styles.card}>
          {requirements.length === 0 ? (
            <div style={styles.empty}>
              No requirement history found.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {requirements.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>
                      #{String(item.id).padStart(3, "0")}
                    </td>

                    <td style={styles.td}>
                      {new Date(
                        item.submitted_at,
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td style={styles.td}>
                      {item.qty_litres} L/day
                    </td>

                    <td style={styles.td}>
                      {item.location}
                    </td>

                    <td style={styles.td}>
                      <span style={styles.status}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f7fafc",
    padding: "30px",
    fontFamily: "Inter, system-ui, sans-serif",
    boxSizing: "border-box",
  },

  title: {
    margin: 0,
    color: "#173b68",
    fontSize: "26px",
  },

  subtitle: {
    color: "#667085",
    fontSize: "13px",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    overflowX: "auto",
    border: "1px solid #e5eaf0",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    background: "#f5f8fb",
    padding: "13px",
    color: "#344054",
    fontSize: "11px",
  },

  td: {
    padding: "14px 13px",
    borderBottom: "1px solid #eef1f4",
    fontSize: "12px",
    color: "#475467",
  },

  status: {
    background: "#e8f2ff",
    color: "#1769aa",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "10px",
    textTransform: "capitalize",
  },

  empty: {
    textAlign: "center",
    padding: "50px",
    color: "#667085",
  },
};