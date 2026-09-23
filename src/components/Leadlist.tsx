import type { Lead, LeadStatus } from "../types";
import StatusPill from "./Statuspill";

interface Props {
    leads: Lead[];
    onStatusChange: (id: Lead["id"], status: LeadStatus) => void;
}

export default function LeadList({ leads, onStatusChange }: Props) {
    if (leads.length === 0) {
        return (
        <div className="lt-empty">
            <div className="big">No leads match yet</div>
            Try a different search or add a new lead.
        </div>
        );
    }

    return (
        <div className="lt-list">
            {leads.map((l) => (
                <div className="lt-row" key={l.id}>
                    <div className="lt-name">{l.name}</div>
                    <div className="lt-contact">
                    {l.email}
                    {l.phone ? ` · ${l.phone}` : ""}
                    </div>
                    <StatusPill status={l.status} onChange={(s) => onStatusChange(l.id, s)} />
                </div>
            ))}
        </div>
    );
}