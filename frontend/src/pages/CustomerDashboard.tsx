import { useEffect, useMemo, useState } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  getCustomerProfile,
  getCustomerRequirements,
} from "../lib/api";

import type {
  CustomerProfile,
  Requirement,
} from "../lib/api";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    () => sessionStorage.getItem("customer_token"),
  );

  const [profile, setProfile] =
    useState<CustomerProfile | null>(null);

  const [requirements, setRequirements] =
    useState<Requirement[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard(currentToken: string) {
    try {
      setLoading(true);
      setError("");

      const [profileData, requirementData] =
        await Promise.all([
          getCustomerProfile(currentToken),
          getCustomerRequirements(currentToken),
        ]);

      setProfile(profileData);
      setRequirements(requirementData);
    } catch (err) {
      sessionStorage.removeItem("customer_token");
      setToken(null);

      setError(
        err instanceof Error
          ? err.message
          : "Your session has expired. Please login again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/customer/login", {
        replace: true,
      });
      return;
    }

    loadDashboard(token);
  }, [token, navigate]);

  function logout() {
    sessionStorage.removeItem("customer_token");
    setToken(null);
    navigate("/", { replace: true });
  }

  const totalQuantity = useMemo(() => {
    return requirements.reduce(
      (total, item) => total + Number(item.qty_litres || 0),
      0,
    );
  }, [requirements]);

  const activeRequirements = useMemo(() => {
    return requirements.filter(
      (item) =>
        item.status !== "fulfilled" &&
        item.status !== "cancelled",
    );
  }, [requirements]);

  const latestRequirement =
    requirements.length > 0
      ? [...requirements].sort(
          (a, b) =>
            new Date(b.submitted_at).getTime() -
            new Date(a.submitted_at).getTime(),
        )[0]
      : null;

  const recentRequirements = useMemo(() => {
    return [...requirements]
      .sort(
        (a, b) =>
          new Date(b.submitted_at).getTime() -
          new Date(a.submitted_at).getTime(),
      )
      .slice(0, 5);
  }, [requirements]);

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          year: "numeric",
        },
      )
    : "—";

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  const getStatusStyle = (
    status: Requirement["status"],
  ) => {
    switch (status) {
      case "fulfilled":
        return styles.statusFulfilled;

      case "contacted":
        return styles.statusContacted;

      case "delivered":
        return styles.statusDelivered;

      case "cancelled":
        return styles.statusCancelled;

      default:
        return styles.statusNew;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingSpinner}>⟳</div>
          <h2 style={styles.loadingTitle}>
            Loading your dashboard
          </h2>
          <p style={styles.loadingText}>
            Please wait while we load your milk requirements.
          </p>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div style={styles.dashboardLayout}>
      <CustomerSidebar onLogout={logout} />

      <main style={styles.mainContent}>
        {/* ================= HEADER ================= */}

        <header style={styles.topHeader}>
          <div>
            <h1 style={styles.pageTitle}>
              My Dashboard
            </h1>

            <p style={styles.welcomeText}>
              Hello, {profile?.name || "Customer"} 👋
            </p>

            <p style={styles.headerDescription}>
              Welcome back! Here's your milk requirement
              overview.
            </p>
          </div>

          <div style={styles.headerActions}>
            <button
              type="button"
              style={styles.notificationButton}
              onClick={() =>
                alert(
                  "Notifications will appear here.",
                )
              }
            >
              🔔
            </button>

            <button
              type="button"
              style={styles.profileMini}
              onClick={() =>
                navigate("/customer/profile")
              }
            >
              <div style={styles.avatar}>
                {profile?.name
                  ? profile.name.charAt(0).toUpperCase()
                  : "C"}
              </div>

              <div style={styles.profileMiniText}>
                <strong>
                  {profile?.name || "Customer"}
                </strong>

                <span>BS4G Customer</span>
              </div>
            </button>
          </div>
        </header>

        {/* ================= ERROR ================= */}

        {error && (
          <div style={styles.errorBox}>
            <strong>Unable to load dashboard.</strong>
            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                token && loadDashboard(token)
              }
              style={styles.retryButton}
            >
              Retry
            </button>
          </div>
        )}

        {/* ================= STAT CARDS ================= */}

        <section style={styles.statsGrid}>
          <StatCard
            icon="🥛"
            label="Active Requirement"
            value={
              activeRequirements.length > 0 &&
              latestRequirement
                ? `${latestRequirement.qty_litres} L/day`
                : "0 L/day"
            }
            description={
              latestRequirement?.location ||
              "No active request"
            }
            tone="green"
          />

          <StatCard
            icon="▣"
            label="Total Booked"
            value={String(requirements.length)}
            description={
              requirements.length === 1
                ? "requirement"
                : "requirements"
            }
            tone="blue"
          />

          <StatCard
            icon="💧"
            label="Total Quantity"
            value={`${totalQuantity} L/day`}
            description="requested"
            tone="cyan"
          />

          <StatCard
            icon="▦"
            label="Member Since"
            value={memberSince}
            description="BS4G member"
            tone="gold"
          />
        </section>

        {/* ================= MAIN GRID ================= */}

        <section style={styles.contentGrid}>
          <div style={styles.leftColumn}>
            {/* RECENT REQUIREMENTS */}

            <section style={styles.panel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>
                    Recent Requirements
                  </h2>

                  <p style={styles.panelSubtitle}>
                    Your latest milk requests
                  </p>
                </div>

                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={() =>
                    navigate("/customer/book-milk")
                  }
                >
                  + Submit New Requirement
                </button>
              </div>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>
                        Date
                      </th>

                      <th style={styles.tableHeader}>
                        Quantity
                      </th>

                      <th style={styles.tableHeader}>
                        Location
                      </th>

                      <th style={styles.tableHeader}>
                        Status
                      </th>

                      <th style={styles.tableHeader}>
                        Note
                      </th>

                      <th style={styles.tableHeader}>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentRequirements.map((item) => (
                      <tr key={item.id}>
                        <td style={styles.tableCell}>
                          {formatDate(
                            item.submitted_at,
                          )}
                        </td>

                        <td
                          style={{
                            ...styles.tableCell,
                            fontWeight: 700,
                          }}
                        >
                          {item.qty_litres} L/day
                        </td>

                        <td style={styles.tableCell}>
                          {item.location}
                        </td>

                        <td style={styles.tableCell}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              ...getStatusStyle(
                                item.status,
                              ),
                            }}
                          >
                            {item.status
                              .charAt(0)
                              .toUpperCase() +
                              item.status.slice(1)}
                          </span>
                        </td>

                        <td style={styles.tableCell}>
                          {item.note || "—"}
                        </td>

                        <td style={styles.tableCell}>
                          <button
                            type="button"
                            style={styles.viewButton}
                            onClick={() =>
                              navigate(
                                "/customer/requirements",
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}

                    {recentRequirements.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          style={
                            styles.emptyTableCell
                          }
                        >
                          <div
                            style={
                              styles.emptyState
                            }
                          >
                            <span
                              style={
                                styles.emptyIcon
                              }
                            >
                              🥛
                            </span>

                            <strong>
                              No requirements yet
                            </strong>

                            <span>
                              Submit your first milk
                              requirement.
                            </span>

                            <button
                              type="button"
                              style={
                                styles.primaryButton
                              }
                              onClick={() =>
                                navigate(
                                  "/customer/book-milk",
                                )
                              }
                            >
                              Book Milk
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {requirements.length > 5 && (
                <div style={styles.viewAllRow}>
                  <button
                    type="button"
                    style={styles.viewAllButton}
                    onClick={() =>
                      navigate(
                        "/customer/requirements",
                      )
                    }
                  >
                    View All →
                  </button>
                </div>
              )}
            </section>

            {/* REQUIREMENT HISTORY */}

            <section style={styles.panel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>
                    My Requirement History
                  </h2>

                  <p style={styles.panelSubtitle}>
                    Detailed record of your milk
                    requirements
                  </p>
                </div>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() =>
                    navigate("/customer/history")
                  }
                >
                  View History
                </button>
              </div>

              <div style={styles.historyGrid}>
                {requirements
                  .slice(0, 4)
                  .map((item) => (
                    <div
                      key={item.id}
                      style={styles.historyRow}
                    >
                      <span>
                        #{String(item.id).padStart(
                          3,
                          "0",
                        )}
                      </span>

                      <span>
                        {formatDate(
                          item.submitted_at,
                        )}
                      </span>

                      <strong>
                        {item.qty_litres} L/day
                      </strong>

                      <span>
                        {item.location}
                      </span>

                      <span
                        style={{
                          ...styles.statusBadge,
                          ...getStatusStyle(
                            item.status,
                          ),
                        }}
                      >
                        {item.status}
                      </span>

                      <span>
                        {item.note || "—"}
                      </span>
                    </div>
                  ))}

                {requirements.length === 0 && (
                  <div style={styles.emptyHistory}>
                    No requirement history available.
                  </div>
                )}
              </div>
            </section>

            {/* REQUIREMENT STATUS */}

            <section style={styles.panel}>
              <div style={styles.panelHeader}>
                <div>
                  <h2 style={styles.panelTitle}>
                    Requirement Status
                  </h2>

                  <p style={styles.panelSubtitle}>
                    Overview of your current
                    requirement
                  </p>
                </div>

                {latestRequirement && (
                  <span style={styles.requirementId}>
                    Requirement #
                    {String(
                      latestRequirement.id,
                    ).padStart(3, "0")}
                  </span>
                )}
              </div>

              <RequirementTimeline
                requirement={latestRequirement}
              />
            </section>
          </div>

          {/* ================= RIGHT COLUMN ================= */}

          <aside style={styles.rightColumn}>
            {/* MILK USAGE */}

            <section style={styles.sidePanel}>
              <h2 style={styles.sidePanelTitle}>
                Your Milk Usage
              </h2>

              <p style={styles.sidePanelSubtitle}>
                Daily litres
              </p>

              <div style={styles.chart}>
                {requirements.length > 0 ? (
                  requirements
                    .slice(0, 4)
                    .reverse()
                    .map((item) => (
                      <div
                        key={item.id}
                        style={styles.chartColumn}
                      >
                        <span
                          style={
                            styles.chartValue
                          }
                        >
                          {item.qty_litres}L
                        </span>

                        <div
                          style={{
                            ...styles.chartBar,
                            height: `${Math.min(
                              110,
                              Math.max(
                                25,
                                Number(
                                  item.qty_litres,
                                ) * 18,
                              ),
                            )}px`,
                          }}
                        />

                        <span
                          style={
                            styles.chartLabel
                          }
                        >
                          {new Date(
                            item.submitted_at,
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                            },
                          )}
                        </span>
                      </div>
                    ))
                ) : (
                  <div style={styles.noChartData}>
                    No usage data yet
                  </div>
                )}
              </div>

              <div style={styles.usageSummary}>
                <div>
                  <strong>
                    {totalQuantity} L
                  </strong>
                  <span>Total requested</span>
                </div>

                <div style={styles.usageRequests}>
                  <strong>
                    {requirements.length}
                  </strong>
                  <span>requests</span>
                </div>
              </div>
            </section>

            {/* ACCOUNT INFO */}

            <section style={styles.sidePanel}>
              <div style={styles.accountHeader}>
                <div>
                  <h2 style={styles.sidePanelTitle}>
                    Account Info
                  </h2>

                  <p
                    style={
                      styles.sidePanelSubtitle
                    }
                  >
                    Your customer profile
                  </p>
                </div>

                <div style={styles.accountAvatar}>
                  {profile?.name
                    ? profile.name
                        .charAt(0)
                        .toUpperCase()
                    : "C"}
                </div>
              </div>

              <div style={styles.accountName}>
                {profile?.name || "Customer"}
              </div>

              <div style={styles.accountRole}>
                BS4G Customer
              </div>

              <div style={styles.accountDivider} />

              <div style={styles.accountDetail}>
                <span>☎</span>
                <span>
                  {profile?.contact || "—"}
                </span>
              </div>

              <div style={styles.accountDetail}>
                <span>✉</span>
                <span>
                  {profile?.email || "—"}
                </span>
              </div>

              <button
                type="button"
                style={styles.editProfileButton}
                onClick={() =>
                  navigate(
                    "/customer/profile/edit",
                  )
                }
              >
                Edit Profile
              </button>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function CustomerSidebar({
  onLogout,
}: {
  onLogout: () => void;
}) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarLogo}>
        <img
          src="/logo.png"
          alt="BS4G Dairy FPO"
          style={styles.sidebarLogoImage}
        />

        <div>
          <strong style={styles.logoTitle}>
            BS4G
          </strong>

          <span style={styles.logoSubtitle}>
            DAIRY FPO
          </span>
        </div>
      </div>

      <nav style={styles.navigation}>
        <NavItem
          to="/customer/dashboard"
          icon="⌂"
          label="Dashboard"
        />

        <NavItem
          to="/customer/requirements"
          icon="▣"
          label="My Requirements"
        />

        <NavItem
          to="/customer/book-milk"
          icon="□"
          label="Book Milk"
        />

        <NavItem
          to="/customer/history"
          icon="◷"
          label="My History"
        />

        <NavItem
          to="/customer/profile"
          icon="♙"
          label="Profile"
        />

        <NavItem
          to="/customer/support"
          icon="?"
          label="Help & Support"
        />
      </nav>

      <button
        type="button"
        onClick={onLogout}
        style={styles.logoutButton}
      >
        <span>↪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: string;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.navItem,
        ...(isActive
          ? styles.navItemActive
          : {}),
      })}
    >
      <span style={styles.navIcon}>
        {icon}
      </span>

      <span>{label}</span>
    </NavLink>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  description,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  description: string;
  tone: "green" | "blue" | "cyan" | "gold";
}) {
  const toneStyles = {
    green: {
      background: "#e9f8ef",
      color: "#119447",
    },
    blue: {
      background: "#eaf2ff",
      color: "#1769c2",
    },
    cyan: {
      background: "#e9f7ff",
      color: "#168fd0",
    },
    gold: {
      background: "#fff5d9",
      color: "#d49a00",
    },
  };

  return (
    <div style={styles.statCard}>
      <div
        style={{
          ...styles.statIcon,
          background: toneStyles[tone].background,
          color: toneStyles[tone].color,
        }}
      >
        {icon}
      </div>

      <div style={styles.statContent}>
        <span style={styles.statLabel}>
          {label}
        </span>

        <strong style={styles.statValue}>
          {value}
        </strong>

        <span style={styles.statDescription}>
          {description}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   REQUIREMENT TIMELINE
========================================================= */

function RequirementTimeline({
  requirement,
}: {
  requirement: Requirement | null;
}) {
  const status =
    requirement?.status || "new";

  const statuses = [
    {
      key: "submitted",
      title: "Submitted",
      description: requirement
        ? new Date(
            requirement.submitted_at,
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })
        : "Pending",
    },
    {
      key: "contacted",
      title: "Contacted",
      description: "Processing",
    },
    {
      key: "inprogress",
      title: "In Progress",
      description: "Processing",
    },
    {
      key: "fulfilled",
      title: "Fulfilled",
      description: "Pending",
    },
  ];

  let activeIndex = 0;

  if (status === "contacted") {
    activeIndex = 1;
  } else if (status === "delivered") {
    activeIndex = 2;
  } else if (status === "fulfilled") {
    activeIndex = 3;
  }

  return (
    <div style={styles.timeline}>
      {statuses.map((item, index) => {
        const active = index <= activeIndex;

        return (
          <div
            key={item.key}
            style={styles.timelineItem}
          >
            <div
              style={{
                ...styles.timelineCircle,
                ...(active
                  ? styles.timelineCircleActive
                  : {}),
              }}
            >
              {active ? "✓" : "•"}
            </div>

            <strong
              style={{
                ...styles.timelineTitle,
                ...(active
                  ? styles.timelineTitleActive
                  : {}),
              }}
            >
              {item.title}
            </strong>

            <span style={styles.timelineDescription}>
              {item.description}
            </span>

            {index < statuses.length - 1 && (
              <div
                style={{
                  ...styles.timelineLine,
                  ...(index <
                  activeIndex
                    ? styles.timelineLineActive
                    : {}),
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles: Record<string, React.CSSProperties> = {
  dashboardLayout: {
    minHeight: "100vh",
    display: "flex",
    background: "#f7fafc",
    color: "#1d2939",
  },

  sidebar: {
    width: "200px",
    minHeight: "100vh",
    background: "#ffffff",
    borderRight: "1px solid #e5eaf0",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  sidebarLogo: {
    height: "95px",
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "14px 16px",
    boxSizing: "border-box",
    borderBottom: "1px solid #eef1f4",
  },

  sidebarLogoImage: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },

  logoTitle: {
    display: "block",
    color: "#173b68",
    fontSize: "15px",
    lineHeight: 1.1,
  },

  logoSubtitle: {
    display: "block",
    color: "#6b7280",
    fontSize: "7px",
    letterSpacing: "1px",
    marginTop: "3px",
  },

  navigation: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "16px 10px",
  },

  navItem: {
    minHeight: "42px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "0 15px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#344054",
    fontSize: "12px",
    fontWeight: 500,
    transition: "all 0.2s ease",
  },

  navItemActive: {
    background: "#e8f2fc",
    color: "#173b68",
    fontWeight: 700,
  },

  navIcon: {
    width: "16px",
    textAlign: "center",
    fontSize: "14px",
  },

  logoutButton: {
    marginTop: "auto",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    minHeight: "42px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "0 15px",
    border: "none",
    background: "transparent",
    color: "#ef4444",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    borderRadius: "8px",
  },

  mainContent: {
    flex: 1,
    minWidth: 0,
    padding: "20px 25px 40px",
    boxSizing: "border-box",
  },

  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "20px",
  },

  pageTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "21px",
    fontWeight: 800,
  },

  welcomeText: {
    margin: "5px 0 0",
    color: "#526581",
    fontSize: "13px",
    fontWeight: 600,
  },

  headerDescription: {
    margin: "3px 0 0",
    color: "#8491a5",
    fontSize: "11px",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  notificationButton: {
    width: "38px",
    height: "38px",
    border: "1px solid #e2e8ef",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  profileMini: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e5f2ed",
    color: "#16844d",
    fontWeight: 800,
  },

  profileMiniText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    fontSize: "11px",
    color: "#344054",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "15px",
  },

  statCard: {
    background: "#fff",
    border: "1px solid #e5eaf0",
    borderRadius: "10px",
    minHeight: "95px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxSizing: "border-box",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.04)",
  },

  statIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    flexShrink: 0,
  },

  statContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  statLabel: {
    color: "#667085",
    fontSize: "10px",
  },

  statValue: {
    color: "#173b68",
    fontSize: "18px",
  },

  statDescription: {
    color: "#98a2b3",
    fontSize: "9px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0, 1fr) 240px",
    gap: "15px",
    alignItems: "start",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    minWidth: 0,
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  panel: {
    background: "#fff",
    border: "1px solid #e5eaf0",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.035)",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "16px 18px 12px",
  },

  panelTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "13px",
    fontWeight: 800,
  },

  panelSubtitle: {
    margin: "3px 0 0",
    color: "#98a2b3",
    fontSize: "9px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "7px",
    background: "#0864ad",
    color: "#fff",
    padding: "9px 13px",
    fontSize: "10px",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  secondaryButton: {
    border: "1px solid #d8e3ed",
    borderRadius: "7px",
    background: "#fff",
    color: "#1269b0",
    padding: "8px 12px",
    fontSize: "10px",
    fontWeight: 700,
    cursor: "pointer",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "680px",
  },

  tableHeader: {
    padding: "10px 12px",
    background: "#f7fafc",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 700,
    textAlign: "left",
    borderTop: "1px solid #edf1f5",
    borderBottom: "1px solid #edf1f5",
  },

  tableCell: {
    padding: "11px 12px",
    color: "#526581",
    fontSize: "9px",
    borderBottom: "1px solid #edf1f5",
    whiteSpace: "nowrap",
  },

  emptyTableCell: {
    padding: "30px",
    textAlign: "center",
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "8px",
    fontWeight: 700,
  },

  statusNew: {
    background: "#eaf4ff",
    color: "#1671c4",
  },

  statusContacted: {
    background: "#e1f4ff",
    color: "#1682bc",
  },

  statusFulfilled: {
    background: "#e3f7e9",
    color: "#16884b",
  },

  statusDelivered: {
    background: "#e4f7ef",
    color: "#11834d",
  },

  statusCancelled: {
    background: "#fff0f0",
    color: "#dc3545",
  },

  viewButton: {
    border: "1px solid #d8e3ed",
    background: "#fff",
    color: "#1769b1",
    borderRadius: "5px",
    padding: "4px 9px",
    fontSize: "8px",
    cursor: "pointer",
  },

  viewAllRow: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 15px",
  },

  viewAllButton: {
    border: "none",
    background: "transparent",
    color: "#1269b0",
    fontSize: "9px",
    fontWeight: 700,
    cursor: "pointer",
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    color: "#667085",
    fontSize: "10px",
  },

  emptyIcon: {
    fontSize: "25px",
  },

  historyGrid: {
    padding: "0 18px 15px",
  },

  historyRow: {
    display: "grid",
    gridTemplateColumns:
      "55px 90px 90px 1fr 75px 1fr",
    alignItems: "center",
    gap: "8px",
    padding: "10px 7px",
    borderTop: "1px solid #edf1f5",
    color: "#526581",
    fontSize: "9px",
  },

  emptyHistory: {
    padding: "30px",
    textAlign: "center",
    color: "#98a2b3",
    fontSize: "10px",
  },

  requirementId: {
    padding: "6px 9px",
    borderRadius: "20px",
    background: "#f3f7fb",
    color: "#667085",
    fontSize: "9px",
    fontWeight: 700,
  },

  timeline: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    padding: "15px 25px 25px",
  },

  timelineItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    minWidth: 0,
  },

  timelineCircle: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f4f7",
    border: "2px solid #dbe2e9",
    color: "#9aa5b1",
    fontSize: "10px",
    zIndex: 2,
  },

  timelineCircleActive: {
    background: "#159b59",
    borderColor: "#159b59",
    color: "#fff",
  },

  timelineTitle: {
    marginTop: "7px",
    color: "#98a2b3",
    fontSize: "9px",
  },

  timelineTitleActive: {
    color: "#173b68",
  },

  timelineDescription: {
    marginTop: "2px",
    color: "#98a2b3",
    fontSize: "8px",
  },

  timelineLine: {
    position: "absolute",
    height: "3px",
    background: "#e2e8ee",
    top: "12px",
    left: "50%",
    width: "100%",
    zIndex: 1,
  },

  timelineLineActive: {
    background: "#159b59",
  },

  sidePanel: {
    background: "#fff",
    border: "1px solid #e5eaf0",
    borderRadius: "10px",
    padding: "15px",
    boxSizing: "border-box",
    boxShadow:
      "0 2px 10px rgba(30, 60, 90, 0.035)",
  },

  sidePanelTitle: {
    margin: 0,
    color: "#173b68",
    fontSize: "12px",
    fontWeight: 800,
  },

  sidePanelSubtitle: {
    margin: "3px 0 0",
    color: "#98a2b3",
    fontSize: "8px",
  },

  chart: {
    height: "180px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    gap: "8px",
    padding: "20px 5px 10px",
    boxSizing: "border-box",
  },

  chartColumn: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "4px",
  },

  chartValue: {
    color: "#526581",
    fontSize: "8px",
    fontWeight: 700,
  },

  chartBar: {
    width: "22px",
    borderRadius: "5px 5px 2px 2px",
    background:
      "linear-gradient(180deg, #1595dd, #1768c2)",
    minHeight: "25px",
  },

  chartLabel: {
    color: "#98a2b3",
    fontSize: "8px",
  },

  noChartData: {
    alignSelf: "center",
    color: "#98a2b3",
    fontSize: "9px",
  },

  usageSummary: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #edf1f5",
    paddingTop: "12px",
  },

  usageSummaryItem: {},

  usageRequests: {
    textAlign: "right",
  },

  accountHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  accountAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e5f4ee",
    color: "#16884d",
    fontWeight: 800,
    fontSize: "14px",
  },

  accountName: {
    marginTop: "12px",
    color: "#173b68",
    fontSize: "12px",
    fontWeight: 800,
  },

  accountRole: {
    marginTop: "2px",
    color: "#98a2b3",
    fontSize: "8px",
  },

  accountDivider: {
    height: "1px",
    background: "#edf1f5",
    margin: "12px 0",
  },

  accountDetail: {
    display: "flex",
    gap: "9px",
    alignItems: "center",
    marginBottom: "9px",
    color: "#667085",
    fontSize: "9px",
    wordBreak: "break-word",
  },

  editProfileButton: {
    marginTop: "5px",
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#1269b0",
    fontSize: "9px",
    fontWeight: 700,
    cursor: "pointer",
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "11px 14px",
    background: "#fff2f2",
    border: "1px solid #ffd2d2",
    borderRadius: "8px",
    color: "#b42318",
    fontSize: "10px",
  },

  retryButton: {
    marginLeft: "auto",
    border: "1px solid #f0a0a0",
    background: "#fff",
    color: "#b42318",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "9px",
  },

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7fafc",
  },

  loadingCard: {
    width: "340px",
    padding: "35px",
    background: "#fff",
    border: "1px solid #e5eaf0",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow:
      "0 15px 40px rgba(30, 60, 90, 0.08)",
  },

  loadingSpinner: {
    fontSize: "28px",
    color: "#159b59",
  },

  loadingTitle: {
    margin: "15px 0 5px",
    color: "#173b68",
    fontSize: "17px",
  },

  loadingText: {
    margin: 0,
    color: "#98a2b3",
    fontSize: "11px",
  },
};