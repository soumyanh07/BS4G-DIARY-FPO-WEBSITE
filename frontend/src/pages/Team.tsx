import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Clipboard,
  Download,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Search,
  Users,
  Milk,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  downloadRequirementsCsv,
  getRequirements,
  teamLogin,
  updateRequirementStatus,
} from "../lib/api";

import type {
  Requirement,
  RequirementStatus,
} from "../lib/api";

export default function Team() {
  const [passcode, setPasscode] = useState("");

  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("bs4g_team_token");
  });

  const [items, setItems] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | RequirementStatus>("all");

  const [exporting, setExporting] = useState(false);

  async function loadRequirements(
    currentToken: string,
  ) {
    setLoading(true);
    setError("");

    try {
      const data =
        await getRequirements(currentToken);

      setItems(data);
    } catch (err) {
      sessionStorage.removeItem(
        "bs4g_team_token",
      );

      setToken(null);

      setError(
        err instanceof Error
          ? err.message
          : "Session expired. Please login again.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadRequirements(token);
    }
  }, [token]);

  async function handleLogin() {
    if (!passcode.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result =
        await teamLogin(passcode);

      sessionStorage.setItem(
        "bs4g_team_token",
        result.access_token,
      );

      setToken(result.access_token);
      setPasscode("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid passcode.",
      );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(
      "bs4g_team_token",
    );

    setToken(null);
    setItems([]);
    setSearch("");
    setStatusFilter("all");
  }

  async function handleStatusChange(
    requirementId: number,
    status: RequirementStatus,
  ) {
    if (!token) return;

    setUpdatingId(requirementId);
    setError("");

    try {
      const updated =
        await updateRequirementStatus(
          requirementId,
          status,
          token,
        );

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === requirementId
            ? updated
            : item,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update requirement status.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  function getStatusLabel(
    status: RequirementStatus,
  ) {
    switch (status) {
      case "new":
        return "New";

      case "contacted":
        return "Contacted";

      case "fulfilled":
        return "Fulfilled";

      case "cancelled":
        return "Cancelled";

      default:
        return status;
    }
  }

  function getStatusClass(
    status: RequirementStatus,
  ) {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "fulfilled":
        return "bg-green-50 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  }

  function copyAll() {
    const text = filteredItems
      .map(
        (item) =>
          `${item.name} | ${item.contact} | ${item.qty_litres} L/day | ${item.location} | ${getStatusLabel(
            item.status,
          )} | ${new Date(
            item.submitted_at,
          ).toLocaleString()}`,
      )
      .join("\n");

    navigator.clipboard.writeText(text);
  }

  async function downloadCsv() {
    if (!token) return;

    setExporting(true);
    setError("");

    try {
      const blob =
        await downloadRequirementsCsv(token);

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "bs4g-requirements.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to export requirements.",
      );
    } finally {
      setExporting(false);
    }
  }

  const stats = useMemo(() => {
    const totalLitres =
      items.reduce(
        (sum, item) =>
          sum + Number(item.qty_litres),
        0,
      );

    return {
      total: items.length,

      newCount: items.filter(
        (item) => item.status === "new",
      ).length,

      contacted: items.filter(
        (item) =>
          item.status === "contacted",
      ).length,

      fulfilled: items.filter(
        (item) =>
          item.status === "fulfilled",
      ).length,

      cancelled: items.filter(
        (item) =>
          item.status === "cancelled",
      ).length,

      totalLitres,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          .toLowerCase()
          .includes(query) ||
        item.contact
          .toLowerCase()
          .includes(query) ||
        item.location
          .toLowerCase()
          .includes(query) ||
        (item.note || "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    items,
    search,
    statusFilter,
  ]);

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5 py-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="rounded-[28px] border border-paper-line bg-white p-7 shadow-[0_24px_70px_rgba(31,58,92,0.1)] sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-cream">
              <LockKeyhole size={21} />
            </div>

            <p className="section-kicker mt-8">
              Private area
            </p>

            <h1 className="mt-3 font-display text-4xl text-ink">
              FPO Team Register
            </h1>

            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Enter the team passcode to view
              customer milk requirements.
            </p>

            <input
              value={passcode}
              onChange={(event) =>
                setPasscode(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              type="password"
              placeholder="Team passcode"
              className="field-input mt-7"
              autoComplete="current-password"
            />

            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={
                loading || !passcode
              }
              className="mt-5 w-full rounded-2xl bg-brass px-5 py-4 font-semibold text-white transition hover:bg-brass-dark disabled:opacity-50"
            >
              {loading
                ? "Checking..."
                : "Open register"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 border-b border-paper-line pb-7 sm:flex-row sm:items-end">
          <div>
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
            >
              <ArrowLeft size={16} />
              Public website
            </Link>

            <p className="section-kicker">
              FPO internal
            </p>

            <h1 className="mt-2 font-display text-5xl text-ink">
              Requirement register
            </h1>

            <p className="mt-2 text-sm text-ink-soft">
              {filteredItems.length} of{" "}
              {items.length} customer{" "}
              {items.length === 1
                ? "requirement"
                : "requirements"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                if (token) {
                  loadRequirements(token);
                }
              }}
              className="icon-button"
              disabled={loading}
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              onClick={copyAll}
              className="icon-button"
              disabled={
                filteredItems.length === 0
              }
            >
              <Clipboard size={15} />
              Copy all
            </button>

            <button
              onClick={downloadCsv}
              className="icon-button"
              disabled={
                exporting ||
                items.length === 0
              }
            >
              <Download size={15} />

              {exporting
                ? "Exporting..."
                : "CSV"}
            </button>

            <button
              onClick={logout}
              className="icon-button"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUMMARY CARDS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Total
              </span>

              <Users
                size={18}
                className="text-brass"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-ink">
              {stats.total}
            </p>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                New
              </span>

              <Clock3
                size={18}
                className="text-blue-600"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-blue-700">
              {stats.newCount}
            </p>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Contacted
              </span>

              <Users
                size={18}
                className="text-amber-600"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-amber-700">
              {stats.contacted}
            </p>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Fulfilled
              </span>

              <CheckCircle2
                size={18}
                className="text-green-600"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-green-700">
              {stats.fulfilled}
            </p>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Cancelled
              </span>

              <XCircle
                size={18}
                className="text-red-600"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-red-700">
              {stats.cancelled}
            </p>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Milk / day
              </span>

              <Milk
                size={18}
                className="text-brass"
              />
            </div>

            <p className="mt-4 font-display text-3xl text-ink">
              {stats.totalLitres}
              <span className="ml-1 text-base">
                L
              </span>
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search customer, contact, location or note..."
              className="field-input pl-11"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target
                  .value as
                  | "all"
                  | RequirementStatus,
              )
            }
            className="field-input sm:w-48"
          >
            <option value="all">
              All statuses
            </option>

            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="fulfilled">
              Fulfilled
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-paper-line bg-white">
          <table className="w-full min-w-[1150px] border-collapse text-left">
            <thead className="bg-paper">
              <tr>
                {[
                  "#",
                  "Customer",
                  "Contact",
                  "Qty / day",
                  "Location",
                  "Note",
                  "Status",
                  "Submitted",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-paper-line px-5 py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredItems.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="border-b border-paper-line/70 last:border-0 hover:bg-cream/50"
                  >
                    <td className="px-5 py-5 font-mono text-xs text-brass">
                      {String(
                        item.id,
                      ).padStart(4, "0")}
                    </td>

                    <td className="px-5 py-5 font-semibold text-ink">
                      {item.name}
                    </td>

                    <td className="px-5 py-5 text-sm text-ink-soft">
                      {item.contact}
                    </td>

                    <td className="px-5 py-5 font-mono text-sm text-ink">
                      {item.qty_litres} L
                    </td>

                    <td className="px-5 py-5 text-sm text-ink-soft">
                      {item.location}
                    </td>

                    <td className="max-w-xs px-5 py-5 text-sm text-ink-soft">
                      {item.note || "—"}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                          item.status,
                        )}`}
                      >
                        {getStatusLabel(
                          item.status,
                        )}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 font-mono text-[10px] text-ink-soft">
                      {new Date(
                        item.submitted_at,
                      ).toLocaleString()}
                    </td>

                    <td className="px-5 py-5">
                      <select
                        value={item.status}
                        disabled={
                          updatingId ===
                          item.id
                        }
                        onChange={(
                          event,
                        ) =>
                          handleStatusChange(
                            item.id,
                            event.target
                              .value as RequirementStatus,
                          )
                        }
                        className="rounded-xl border border-paper-line bg-white px-3 py-2 text-xs font-medium text-ink outline-none transition focus:border-brass disabled:opacity-50"
                      >
                        <option value="new">
                          New
                        </option>

                        <option value="contacted">
                          Contacted
                        </option>

                        <option value="fulfilled">
                          Fulfilled
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                      {updatingId ===
                        item.id && (
                        <p className="mt-1 text-[10px] text-ink-soft">
                          Updating...
                        </p>
                      )}
                    </td>
                  </tr>
                ),
              )}

              {!loading &&
                filteredItems.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-16 text-center text-sm text-ink-soft"
                    >
                      {items.length ===
                      0
                        ? "No customer requirements yet."
                        : "No requirements match your search or filter."}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-ink-soft sm:flex-row">
          <p>
            Showing{" "}
            <strong className="text-ink">
              {filteredItems.length}
            </strong>{" "}
            requirement
            {filteredItems.length ===
            1
              ? ""
              : "s"}
          </p>

          <p>
            Total requested volume:{" "}
            <strong className="text-ink">
              {stats.totalLitres} L/day
            </strong>
          </p>
        </div>
      </div>
    </main>
  );
}