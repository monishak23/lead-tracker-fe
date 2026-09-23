import { useEffect, useRef, useState } from "react";
import { type LeadStatus, STATUSES, STATUS_LABEL } from "../types";

interface Props {
    status: LeadStatus;
    onChange: (status: LeadStatus) => void;
}

export default function StatusPill({ status, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function close(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    return (
        <div className="lt-pill-wrap" ref={ref}>
        <button className={`lt-pill ${status}`} onClick={() => setOpen((o) => !o)}>
            {STATUS_LABEL[status]}
        </button>
        {open && (
            <div className="lt-dropdown">
            {STATUSES.map((s) => (
                <button
                key={s}
                onClick={() => {
                    onChange(s);
                    setOpen(false);
                }}
                >
                {STATUS_LABEL[s]}
                </button>
            ))}
            </div>
        )}
        </div>
    );
}