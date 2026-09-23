export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "LOST";

export interface Lead {
    id?: number | string;
    name: string;
    email: string;
    phone: string;
    status: LeadStatus;
    created_at?: string;
}

export const STATUSES: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "LOST"];

export const STATUS_LABEL: Record<LeadStatus, string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    QUALIFIED: "Qualified",
    LOST: "Lost",
};