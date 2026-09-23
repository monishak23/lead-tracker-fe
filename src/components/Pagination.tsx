interface Props {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let p = start; p <= end; p++) pages.push(p);

    return (
        <div className="lt-pagination">
        <button
            className="lt-page-btn"
            disabled={page <= 1}
            onClick={() => onChange(page - 1)}
            aria-label="Previous page"
        >
            ‹ Prev
        </button>

        {start > 1 && (
            <>
            <button className="lt-page-btn" onClick={() => onChange(1)}>1</button>
            {start > 2 && <span className="lt-page-ellipsis">…</span>}
            </>
        )}

        {pages.map((p) => (
            <button
            key={p}
            className={`lt-page-btn${p === page ? " active" : ""}`}
            onClick={() => onChange(p)}
            >
            {p}
            </button>
        ))}

        {end < totalPages && (
            <>
            {end < totalPages - 1 && <span className="lt-page-ellipsis">…</span>}
            <button className="lt-page-btn" onClick={() => onChange(totalPages)}>
                {totalPages}
            </button>
            </>
        )}

        <button
            className="lt-page-btn"
            disabled={page >= totalPages}
            onClick={() => onChange(page + 1)}
            aria-label="Next page"
        >
            Next ›
        </button>
        </div>
    );
}