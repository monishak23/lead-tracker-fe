import { type FormEvent, useState } from "react";
import type { Lead } from "../types";

interface Props {
    onClose: () => void;
    onAdd: (lead: Lead) => void;
}

export default function AddLeadModal({ onClose, onAdd }: Props) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    function set(key: keyof typeof form, value: string) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    function submit(e: FormEvent) {
        e.preventDefault();
        if (!form.name.trim()) return;
        onAdd({ ...form, status: "NEW" });
        onClose();
    }

    return (
        <div className="lt-overlay" onClick={onClose}>
        <div className="lt-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Lead Details</h2>
            <form onSubmit={submit}>
            <div className="lt-field">
                <label>Full name</label>
                <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Monisha"
                />
            </div>
            <div className="lt-field">
                <label>Email</label>
                <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="name@company.com"
                />
            </div>
            <div className="lt-field">
                <label>Phone</label>
                <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="7894587456"
                />
            </div>
            <div className="lt-modal-actions">
                <button type="button" className="lt-btn-ghost" onClick={onClose}>
                Cancel
                </button>
                <button type="submit" className="lt-btn-primary">
                Save lead
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}