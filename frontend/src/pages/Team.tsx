import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRequirements, updateRequirementStatus, downloadRequirementsCsv } from "../lib/api";
import type { Requirement } from "../lib/api";

export default function Team() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [view, setView] = useState<
    | "dashboard"
    | "requirements"
    | "members"
    | "procurement"
    | "sales"
    | "analytics"
    | "reports"
    | "customers"
    | "locations"
    | "settings"
  >("dashboard");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const statusOptions = ["all", "new", "contacted", "fulfilled", "delivered", "cancelled"];

  async function fetchRequirements(t: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await getRequirements(t);
      setRequirements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load requirements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const tokenValue = sessionStorage.getItem("team_token");

    if (!tokenValue) {
      navigate("/team/login", { replace: true });
      return;
    }

    // initial load
    fetchRequirements(tokenValue);

    // refresh when other parts of the app signal an update
    const onReqChanged = () => {
      const tk = sessionStorage.getItem("team_token");
      if (tk) fetchRequirements(tk);
    };

    // storage event for other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === "requirements_updated") {
        const tk = sessionStorage.getItem("team_token");
        if (tk) fetchRequirements(tk);
      }
    };

    window.addEventListener("requirements:changed", onReqChanged as EventListener);
    window.addEventListener("storage", onStorage as EventListener);

    return () => {
      window.removeEventListener("requirements:changed", onReqChanged as EventListener);
      window.removeEventListener("storage", onStorage as EventListener);
    };
  }, [navigate]);

  async function handleLogout() {
    sessionStorage.removeItem("team_token");
    navigate("/team/login", { replace: true });
  }

  async function changeStatus(id: number, status: string) {
    const token = sessionStorage.getItem("team_token");
    if (!token) {
      navigate("/team/login", { replace: true });
      return;
    }

    try {
      setBusyId(id);
      await updateRequirementStatus(id, status as any, token);
      const data = await getRequirements(token);
      setRequirements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update status.");
    } finally {
      setBusyId(null);
    }
  }

  function getActionsForStatus(status: string | undefined) {
    const st = status || 'new';
    switch (st) {
      case 'new':
        return [
          { key: 'contacted', status: 'contacted', label: 'Contacted' },
          { key: 'fulfilled', status: 'fulfilled', label: 'Fulfilled' },
          { key: 'cancelled', status: 'cancelled', label: 'Cancel', variant: 'cancel' },
        ];
      case 'contacted':
        return [
          { key: 'fulfilled', status: 'fulfilled', label: 'Fulfilled' },
          { key: 'delivered', status: 'delivered', label: 'Delivered' },
          { key: 'cancelled', status: 'cancelled', label: 'Cancel', variant: 'cancel' },
        ];
      case 'fulfilled':
        return [
          { key: 'delivered', status: 'delivered', label: 'Delivered' },
          { key: 'cancelled', status: 'cancelled', label: 'Cancel', variant: 'cancel' },
        ];
      case 'delivered':
        return [];
      default:
        return [
          { key: 'contacted', status: 'contacted', label: 'Contacted' },
          { key: 'fulfilled', status: 'fulfilled', label: 'Fulfilled' },
          { key: 'cancelled', status: 'cancelled', label: 'Cancel', variant: 'cancel' },
        ];
    }
  }

  async function exportCsv() {
    const token = sessionStorage.getItem("team_token");
    if (!token) {
      setError("Not authenticated.");
      return;
    }

    try {
      const blob = await downloadRequirementsCsv(token);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `requirements-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to export CSV.");
    }
  }

  // Derived statistics
  const stats = useMemo(() => {
    const totalRequirements = requirements.length;
    const totalDemand = requirements.reduce((s, r) => s + (r.qty_litres || 0), 0);
    const statusCounts: Record<string, number> = {};
    const locationMap: Record<string, number> = {};
    const byDay: Record<string, number> = {};

    requirements.forEach((r) => {
      statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
      locationMap[r.location] = (locationMap[r.location] || 0) + (r.qty_litres || 0);
      const day = new Date(r.submitted_at).toLocaleDateString();
      byDay[day] = (byDay[day] || 0) + (r.qty_litres || 0);
    });

    const topLocations = Object.entries(locationMap)
      .map(([loc, qty]) => ({ loc, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    const daily = Object.entries(byDay)
      .map(([day, qty]) => ({ day, qty }))
      .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
      .slice(-7);

    return { totalRequirements, totalDemand, statusCounts, topLocations, daily };
  }, [requirements]);

  const filteredRequirements = useMemo(() => {
    let list = requirements.slice();

    if (statusFilter && statusFilter !== "all") {
      list = list.filter((r) => r.status === statusFilter);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((r) => {
        return (
          r.name?.toLowerCase().includes(q) ||
          r.contact?.toLowerCase().includes(q) ||
          (r.location || "").toLowerCase().includes(q) ||
          (r.note || "").toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [requirements, searchQuery, statusFilter]);

  function renderSmallCard(title: string, value: string | number, hint?: string) {
    return (
      <div style={styles.statCard}>
        <div style={styles.statTitle}>{title}</div>
        <div style={styles.statValue}>{value}</div>
        {hint && <div style={styles.statHint}>{hint}</div>}
      </div>
    );
  }

  function renderStatusPie() {
    const map = stats.statusCounts;
    const total = Object.values(map).reduce((s, n) => s + n, 0) || 1;
    const slices = Object.entries(map);
    const colors: Record<string, string> = {
      new: "#60a5fa",
      contacted: "#f59e0b",
      fulfilled: "#10b981",
      cancelled: "#ef4444",
      delivered: "#6366f1",
    };

    let angle = 0;
    const paths = slices.map(([k, v], i) => {
      const sliceAngle = (v / total) * Math.PI * 2;
      const x1 = 50 + 45 * Math.cos(angle);
      const y1 = 50 + 45 * Math.sin(angle);
      angle += sliceAngle;
      const x2 = 50 + 45 * Math.cos(angle);
      const y2 = 50 + 45 * Math.sin(angle);
      const large = sliceAngle > Math.PI ? 1 : 0;
      const d = `M50 50 L ${x1} ${y1} A 45 45 0 ${large} 1 ${x2} ${y2} Z`;
      return <path key={k} d={d} fill={colors[k] || `hsl(${(i * 70) % 360} 70% 50%)`} />;
    });

    return (
      <svg viewBox="0 0 100 100" width={120} height={120} style={{ display: "block" }}>
        <circle cx={50} cy={50} r={45} fill="#f3f4f6" />
        {paths}
        <circle cx={50} cy={50} r={25} fill="#fff" />
        <text x="50" y="54" textAnchor="middle" fontWeight={700} fontSize={10} fill="#111">
          {Object.values(map).reduce((s, n) => s + n, 0)}
        </text>
      </svg>
    );
  }

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <img src="/logo.png" alt="BS4G" style={{ width: 36 }} />
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontWeight: 800, color: "#0f172a" }}>BS4G</div>
            <div style={{ fontSize: 12, color: "#475569" }}>Dairy FPO</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <div style={view === "dashboard" ? styles.navItemActive : styles.navItem} onClick={() => setView("dashboard")}>Dashboard</div>
          <div style={view === "requirements" ? styles.navItemActive : styles.navItem} onClick={() => setView("requirements")}>All Requirements</div>
          <div style={view === "members" ? styles.navItemActive : styles.navItem} onClick={() => setView("members")}>Farmers / Members</div>
          <div style={view === "procurement" ? styles.navItemActive : styles.navItem} onClick={() => setView("procurement")}>Milk Procurement</div>
          <div style={view === "sales" ? styles.navItemActive : styles.navItem} onClick={() => setView("sales")}>Milk Sales</div>
          <div style={view === "analytics" ? styles.navItemActive : styles.navItem} onClick={() => setView("analytics")}>Analytics</div>
          <div style={view === "reports" ? styles.navItemActive : styles.navItem} onClick={() => setView("reports")}>Reports</div>
          <div style={view === "customers" ? styles.navItemActive : styles.navItem} onClick={() => setView("customers")}>Customers</div>
          <div style={view === "locations" ? styles.navItemActive : styles.navItem} onClick={() => setView("locations")}>Locations</div>
          <div style={view === "settings" ? styles.navItemActive : styles.navItem} onClick={() => setView("settings")}>Settings</div>
        </nav>

        <div style={styles.logoutArea}>
          <button style={styles.logoutButtonSmall} onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main style={styles.content}>
        <header style={styles.headerRow}>
          <h1 style={styles.h1}>FPO Team Dashboard</h1>
          <div style={styles.headerRight}>
            <div style={styles.userBadge}>Team Admin</div>
          </div>
        </header>

        {error && <div style={styles.error}>{error}</div>}
        {loading && <div style={styles.message}>Loading...</div>}

        {view === "dashboard" ? (
          <>
            <section style={styles.statsRow}>
              {renderSmallCard("Total Requirements", stats.totalRequirements, "+ overview")}
              {renderSmallCard("Total Demand (L)", stats.totalDemand.toFixed(0))}
              {renderSmallCard("Collected (approx)", (requirements.filter(r => r.status === 'delivered' || r.status === 'fulfilled').reduce((s, r) => s + r.qty_litres,0)).toFixed(0))}
              {renderSmallCard("Sold (approx)", (requirements.filter(r => r.status === 'fulfilled').reduce((s, r) => s + r.qty_litres,0)).toFixed(0))}
            </section>

            <section style={styles.row}>
              <div style={styles.colLarge}>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>Milk Flow Overview</div>
                  <svg viewBox="0 0 300 100" style={{ width: "100%", height: 120 }}>
                    {/* Simple line using daily data */}
                    {(() => {
                      const points = stats.daily.length ? stats.daily : [{ day: "", qty: 0 }];
                      const max = Math.max(...points.map((p) => p.qty), 10);
                      const coords = points.map((p, i) => `${(i / (points.length - 1 || 1)) * 300},${100 - (p.qty / max) * 90}`).join(" ");
                      return (
                        <polyline
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth={3}
                          points={coords}
                        />
                      );
                    })()}
                  </svg>

                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={styles.smallTitle}>Daily Milk Activity</div>
                      <table style={styles.simpleTable}>
                        <thead>
                          <tr><th>Date</th><th>Qty (L)</th></tr>
                        </thead>
                        <tbody>
                          {stats.daily.map((d) => (
                            <tr key={d.day}><td>{d.day}</td><td>{d.qty}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ width: 200 }}>
                      <div style={styles.smallTitle}>Status Distribution</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {renderStatusPie()}
                        <div>
                          {Object.entries(stats.statusCounts).map(([k, v]) => (
                            <div key={k} style={{ fontSize: 13, color: "#374151" }}>{k}: {v}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ ...styles.card, marginTop: 12 }}>
                  <div style={styles.cardTitle}>All Requirements</div>
                  <div style={styles.toolbar}>
                    <input placeholder="Search customer, contact, location or note" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
                      <option value="all">All Statuses</option>
                      {statusOptions.filter(s => s !== 'all').map(s => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                      <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={styles.actionButton}>Clear</button>
                      <button onClick={exportCsv} style={styles.actionButton}>Export CSV</button>
                    </div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={styles.fullTable}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Contact</th>
                          <th>Qty</th>
                          <th>Location</th>
                          <th>Note</th>
                          <th>Status</th>
                          <th>Submitted</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequirements.map((r) => (
                          <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.name}</td>
                            <td>{r.contact}</td>
                            <td>{r.qty_litres}</td>
                            <td>{r.location}</td>
                            <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.note || "-"}</td>
                            <td style={{ textTransform: "capitalize" }}>{r.status}</td>
                            <td>{new Date(r.submitted_at).toLocaleString()}</td>
                            <td>
                              <div style={{ display: "flex", gap: 6 }}>
                                {getActionsForStatus(r.status).map((a) => (
                                  <button key={a.key} onClick={() => changeStatus(r.id, a.status)} disabled={busyId === r.id} style={{ ...styles.actionButton, ...(a.variant === 'cancel' ? styles.cancelButton : {}) }}>{a.label}</button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div style={styles.colSmall}>
                <div style={styles.card}>
                  <div style={styles.cardTitle}>Top Locations</div>
                  <div>
                    {stats.topLocations.map((t) => (
                      <div key={t.loc} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                        <div style={{ color: "#0f172a" }}>{t.loc}</div>
                        <div style={{ color: "#475569", fontWeight: 700 }}>{t.qty}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ ...styles.card, marginTop: 12 }}>
                  <div style={styles.cardTitle}>Quick Actions</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button style={styles.actionPrimary}>Export CSV</button>
                    <button style={styles.actionPrimary}>Refresh</button>
                    <button style={{ ...styles.actionPrimary, background: "#ef4444" }} onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : view === "requirements" ? (
          <div>
            <div style={{ ...styles.card }}>
              <div style={styles.cardTitle}>All Requirements</div>
              <div style={styles.toolbar}>
                <input placeholder="Search customer, contact, location or note" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
                  <option value="all">All Statuses</option>
                  {statusOptions.filter(s => s !== 'all').map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} style={styles.actionButton}>Clear</button>
                  <button onClick={exportCsv} style={styles.actionButton}>Export CSV</button>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={styles.fullTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Contact</th>
                      <th>Qty</th>
                      <th>Location</th>
                      <th>Note</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequirements.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>{r.contact}</td>
                        <td>{r.qty_litres}</td>
                        <td>{r.location}</td>
                        <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.note || "-"}</td>
                        <td style={{ textTransform: "capitalize" }}>{r.status}</td>
                        <td>{new Date(r.submitted_at).toLocaleString()}</td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            {getActionsForStatus(r.status).map((a) => (
                              <button key={a.key} onClick={() => changeStatus(r.id, a.status)} disabled={busyId === r.id} style={{ ...styles.actionButton, ...(a.variant === 'cancel' ? styles.cancelButton : {}) }}>{a.label}</button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.card}>
            <div style={styles.cardTitle}>{view.charAt(0).toUpperCase() + view.slice(1)}</div>
            <div style={{ color: "#64748b" }}>
              This view is a placeholder. You can wire it to real pages or add detailed UI here.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif", background: "#f8fafc" },
  sidebar: { width: 220, background: "#fff", borderRight: "1px solid #e6eaea", padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", marginBottom: 14 },
  nav: { display: "flex", flexDirection: "column", gap: 8, marginTop: 18 },
  navItem: { padding: "8px 10px", color: "#475569", borderRadius: 8, cursor: "pointer" },
  navItemActive: { padding: "8px 10px", color: "#0f172a", background: "#eef2ff", borderRadius: 8, fontWeight: 700 },
  logoutArea: { marginTop: 20 },
  logoutButtonSmall: { background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },

  content: { flex: 1, padding: 20 },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  h1: { margin: 0, fontSize: 20, color: "#0f172a" },
  headerRight: { display: "flex", gap: 12, alignItems: "center" },
  userBadge: { background: "#eef2ff", padding: "6px 10px", borderRadius: 14, fontWeight: 700, color: "#0f172a" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 12 },
  statCard: { background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(12,38,63,0.06)" },
  statTitle: { fontSize: 12, color: "#475569" },
  statValue: { fontSize: 20, fontWeight: 800, color: "#0f172a", marginTop: 6 },
  statHint: { fontSize: 12, color: "#94a3b8", marginTop: 6 },

  row: { display: "flex", gap: 12, alignItems: "flex-start" },
  colLarge: { flex: 1 },
  colSmall: { width: 300 },

  card: { background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(12,38,63,0.06)" },
  cardTitle: { fontWeight: 800, color: "#0f172a", marginBottom: 8 },

  smallTitle: { fontSize: 13, color: "#475569", marginBottom: 6 },
  simpleTable: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  fullTable: { width: "100%", borderCollapse: "collapse", fontSize: 13 },

  actions: {},
  actionButton: { background: "#0ea5e9", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 8, cursor: "pointer" },
  cancelButton: { background: "#ef4444" },

  actionPrimary: { background: "#1269b0", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" },

  message: { padding: 18, color: "#6b7280" },
  empty: { textAlign: "center", padding: 12, color: "#6b7280" },
  error: { padding: 12, background: "#fff1f1", color: "#b42318", borderRadius: 8, marginBottom: 12 },

  toolbar: { display: 'flex', gap: 8, alignItems: 'center', padding: '8px 0', marginBottom: 8 },
  searchInput: { padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e6e6', width: 320 },
  select: { padding: '8px 10px', borderRadius: 8, border: '1px solid #e6e6e6' },
};
