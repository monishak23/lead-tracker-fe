import { useEffect, useState } from "react";
import "./App.css";
import { type Lead, type LeadStatus, STATUSES, STATUS_LABEL } from "./types";
import LeadList from "./components/Leadlist";
import AddLeadModal from "./components/Addleadmodal";
import toast, { Toaster } from "react-hot-toast";

const API_BASE = "https://lead-tracker-ctvb.onrender.com";

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    const search = query.trim();

    if (search) {
      params.set("search", search);
    }

    if (filter !== "all") {
      params.set("status", filter);
    }

    const queryString = params.toString();

    fetch(`${API_BASE}/leads${queryString ? `?${queryString}` : ""}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        return res.json();
      })
      .then((json: { count: number; data: Lead[] }) => {
        if (!cancelled) {
          setLeads(json.data ?? []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Couldn't load leads");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query, filter]);


  function updateStatus(id: Lead["id"], status: LeadStatus) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    fetch(`${API_BASE}/leads/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        toast.success("Lead status updated");
        return res.json();
      })
      .then((json: Lead) => {
        setLeads((ls) => ls.map((l) => (l.id === id ? json : l)));
      })
      .catch(() => {
        toast.error("Failed to update lead");
      });
  }

  function addLead(lead: Lead) {
    setLeads((ls) => [lead, ...ls]);
    fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
        toast.success("Lead saved successfully");
        return res.json();
      })
      .then((json: Lead) => {
        setLeads((ls) => ls.map((l) => (l.id === lead.id ? json : l)));
      })
      .catch(() => {
        toast.error("Failed to save lead");
      });       
  }

  return (
    <>
      <Toaster />
      <div className="lt-wrap">
        <header className="lt-masthead">
          <div className="lt-brand">
            <span>Lead Tracker</span>
          </div>
          <div className="lt-tally">{leads.length} leads tracked</div>
        </header>

        <div className="lt-toolbar">
          <div className="lt-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              placeholder="Search by name, company or email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="lt-add-btn" onClick={() => setShowAdd(true)}>
            + Add lead
          </button>
        </div>

        <div className="lt-filters">
          {(["all", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              className={`lt-chip${filter === s ? " active" : ""}`}
              onClick={() => setFilter(s as LeadStatus | "all")}
            >
              {s === "all" ? "All" : STATUS_LABEL[s as LeadStatus]}
            </button>
          ))}
        </div>

        {loading && <div className="lt-empty">Loading leads…</div>}

        {!loading && error && (
          <div className="lt-empty">
            <div className="big">Couldn't load leads</div>
            {error}
          </div>
        )}

        {!loading && !error && (
          <LeadList leads={leads} onStatusChange={updateStatus} />
        )}

        {showAdd && <AddLeadModal onClose={() => setShowAdd(false)} onAdd={addLead} />}
      </div>
    </>
  );
}