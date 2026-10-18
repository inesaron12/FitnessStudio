export function BookmarkToggle({ isBooked, onToggle, label = "Save class" }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={isBooked}
            aria-label={label}
            className={`inline-flex items-center justify-center h-9 w-9 rounded-full border transition-colors cursor-pointer ${isBooked
                ? 'border-accent bg-accent text-white'
                : 'border-border text-muted hover:border-accent hover:text-accent'
                }`}
        >
            <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </button>
    )
}