import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  getCustomerRequirements,
} from "../lib/api";

import type {
  Requirement,
} from "../lib/api";

export default function CustomerRequirements() {
  const navigate = useNavigate();

  const [requirements, setRequirements] =
    useState<Requirement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadRequirements() {
      const token =
        sessionStorage.getItem(
          "customer_token",
        );

      if (!token) {
        navigate("/customer/login", {
          replace: true,
        });
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await getCustomerRequirements(
            token,
          );

        setRequirements(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your requirements.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadRequirements();
  }, [navigate]);

  function formatDate(
    value: string,
  ) {
    return new Date(
      value,
    ).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  }

  function getStatusStyle(
    status: Requirement["status"],
  ) {
    switch (status) {
      case "fulfilled":
        return styles.fulfilled;

      case "delivered":
        return styles.delivered;

      case "contacted":
        return styles.contacted;

      case "cancelled":
        return styles.cancelled;

      default:
        return styles.newStatus;
    }
  }

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}

      <header style={styles.header}>
        <div>
          <button
            type="button"
            onClick={() =>
              navigate(
                "/customer/dashboard",
              )
            }
            style={styles.backButton}
          >
            ← Dashboard
          </button>

          <h1 style={styles.title}>
            My Requirements
          </h1>

          <p style={styles.subtitle}>
            View and track all your milk
            requirements.
          </p>
        </div>

        <Link
          to="/customer/book-milk"
          style={styles.button}
        >
          + Book Milk
        </Link>
      </header>

      {/* ================= LOADING ================= */}

      {loading && (
        <div style={styles.message}>
          <div style={styles.loadingIcon}>
            ◌
          </div>

          <strong>
            Loading your requirements...
          </strong>

          <span>
            Please wait while we fetch your
            records.
          </span>
        </div>
      )}

      {/* ================= ERROR ================= */}

      {!loading && error && (
        <div style={styles.error}>
          <strong>
            Unable to load requirements.
          </strong>

          <span>
            {error}
          </span>

          <button
            type="button"
            style={styles.retryButton}
            onClick={() =>
              window.location.reload()
            }
          >
            Retry
          </button>
        </div>
      )}

      {/* ================= EMPTY ================= */}

      {!loading &&
        !error &&
        requirements.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              🥛
            </div>

            <h2 style={styles.emptyTitle}>
              No requirements yet
            </h2>

            <p style={styles.emptyText}>
              You haven't submitted any milk
              requirements yet.
            </p>

            <Link
              to="/customer/book-milk"
              style={styles.button}
            >
              Book Milk
            </Link>
          </div>
        )}

      {/* ================= REQUIREMENTS ================= */}

      {!loading &&
        !error &&
        requirements.length > 0 && (
          <>
            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <span>
                  Total Requirements
                </span>

                <strong>
                  {requirements.length}
                </strong>
              </div>

              <div style={styles.summaryCard}>
                <span>
                  Total Quantity
                </span>

                <strong>
                  {requirements.reduce(
                    (
                      total,
                      item,
                    ) =>
                      total +
                      Number(
                        item.qty_litres ||
                          0,
                      ),
                    0,
                  )}{" "}
                  L/day
                </strong>
              </div>

              <div style={styles.summaryCard}>
                <span>
                  Active
                </span>

                <strong>
                  {
                    requirements.filter(
                      (item) =>
                        item.status !==
                          "fulfilled" &&
                        item.status !==
                          "cancelled",
                    ).length
                  }
                </strong>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h2
                    style={
                      styles.cardTitle
                    }
                  >
                    Requirement History
                  </h2>

                  <p
                    style={
                      styles.cardSubtitle
                    }
                  >
                    All milk requests submitted
                    from your account.
                  </p>
                </div>
              </div>

              <div
                style={
                  styles.tableWrapper
                }
              >
                <table
                  style={styles.table}
                >
                  <thead>
                    <tr>
                      <th
                        style={styles.th}
                      >
                        #
                      </th>

                      <th
                        style={styles.th}
                      >
                        Date
                      </th>

                      <th
                        style={styles.th}
                      >
                        Quantity
                      </th>

                      <th
                        style={styles.th}
                      >
                        Location
                      </th>

                      <th
                        style={styles.th}
                      >
                        Status
                      </th>

                      <th
                        style={styles.th}
                      >
                        Note
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {requirements.map(
                      (item) => (
                        <tr
                          key={item.id}
                        >
                          <td
                            style={
                              styles.td
                            }
                          >
                            #
                            {String(
                              item.id,
                            ).padStart(
                              3,
                              "0",
                            )}
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            {formatDate(
                              item.submitted_at,
                            )}
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            <strong
                              style={
                                styles.quantity
                              }
                            >
                              {
                                item.qty_litres
                              }{" "}
                              L/day
                            </strong>
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            {
                              item.location
                            }
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            <span
                              style={{
                                ...styles.status,
                                ...getStatusStyle(
                                  item.status,
                                ),
                              }}
                            >
                              {item.status
                                .charAt(
                                  0,
                                )
                                .toUpperCase() +
                                item.status.slice(
                                  1,
                                )}
                            </span>
                          </td>

                          <td
                            style={
                              styles.td
                            }
                          >
                            {
                              item.note ||
                              "—"
                            }
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles: Record<
  string,
  React.CSSProperties
> = {
  page: {
    minHeight: "100vh",
    padding:
      "28px 30px 50px",
    boxSizing: "border-box",
    background: "#f7fafc",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#1d2939",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "22px",
  },

  backButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    marginBottom: "10px",
    color: "#1269b0",
    fontSize: "11px",
    fontWeight: 700,
    cursor: "pointer",
  },

  title: {
    margin: 0,
    color: "#173b68",
    fontSize: "24px",
    fontWeight: 800,
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#667085",
    fontSize: "12px",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent:
      "center",
    background: "#0864ad",
    color: "#fff",
    padding:
      "10px 15px",
    borderRadius: "7px",
    textDecoration: "none",
    fontSize: "10px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "15px",
  },

  summaryCard: {
    background: "#fff",
    border:
      "1px solid #e5eaf0",
    borderRadius: "10px",
    padding: "15px 17px",
    display: "flex",
    flexDirection:
      "column",
    gap: "4px",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.035)",
  },

  summaryCardSpan: {
    color: "#667085",
    fontSize: "10px",
  },

  card: {
    background: "#fff",
    border:
      "1px solid #e5eaf0",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.035)",
  },

  cardHeader: {
    padding:
      "16px 18px 13px",
    borderBottom:
      "1px solid #edf1f5",
  },

  cardTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "13px",
    fontWeight: 800,
  },

  cardSubtitle: {
    margin: "3px 0 0",
    color: "#98a2b3",
    fontSize: "9px",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    minWidth: "700px",
  },

  th: {
    padding:
      "10px 13px",
    background: "#f7fafc",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 700,
    textAlign: "left",
    borderBottom:
      "1px solid #edf1f5",
  },

  td: {
    padding:
      "12px 13px",
    color: "#526581",
    fontSize: "10px",
    borderBottom:
      "1px solid #edf1f5",
    whiteSpace:
      "nowrap",
  },

  quantity: {
    color: "#173b68",
    fontWeight: 800,
  },

  status: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent:
      "center",
    padding:
      "4px 8px",
    borderRadius: "20px",
    fontSize: "8px",
    fontWeight: 700,
  },

  newStatus: {
    background: "#eaf4ff",
    color: "#1671c4",
  },

  contacted: {
    background: "#e1f4ff",
    color: "#1682bc",
  },

  fulfilled: {
    background: "#e3f7e9",
    color: "#16884b",
  },

  delivered: {
    background: "#e4f7ef",
    color: "#11834d",
  },

  cancelled: {
    background: "#fff0f0",
    color: "#dc3545",
  },

  message: {
    minHeight: "250px",
    background: "#fff",
    border:
      "1px solid #e5eaf0",
    borderRadius: "12px",
    display: "flex",
    flexDirection:
      "column",
    alignItems: "center",
    justifyContent:
      "center",
    gap: "7px",
    color: "#667085",
    fontSize: "11px",
  },

  loadingIcon: {
    fontSize: "28px",
    color: "#159b59",
  },

  error: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff2f2",
    border:
      "1px solid #ffd2d2",
    color: "#b42318",
    padding:
      "12px 14px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "10px",
  },

  retryButton: {
    marginLeft: "auto",
    border:
      "1px solid #f0a0a0",
    background: "#fff",
    color: "#b42318",
    borderRadius: "5px",
    padding:
      "5px 10px",
    cursor: "pointer",
    fontSize: "9px",
    fontWeight: 700,
  },

  empty: {
    background: "#fff",
    border:
      "1px solid #e5eaf0",
    borderRadius: "14px",
    padding:
      "60px 20px",
    textAlign: "center",
    color: "#667085",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.035)",
  },

  emptyIcon: {
    fontSize: "40px",
    marginBottom: "8px",
  },

  emptyTitle: {
    margin:
      "5px 0",
    color: "#173b68",
    fontSize: "17px",
  },

  emptyText: {
    margin:
      "0 0 18px",
    color: "#98a2b3",
    fontSize: "10px",
  },
};