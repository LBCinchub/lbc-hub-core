import './LuminaVerifyBadge.css'

interface LuminaVerifyBadgeProps {
  label?: string
}

export function LuminaVerifyBadge({ label = 'Lumina Verified' }: LuminaVerifyBadgeProps) {
  return (
    <span className="lumina-verify-badge" aria-label={label} title={label}>
      <svg
        className="lumina-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        width="14"
        height="14"
      >
        <path
          d="M12 2L14.4 8.26L21 9.27L16.5 13.64L17.77 20.23L12 17.27L6.23 20.23L7.5 13.64L3 9.27L9.6 8.26L12 2Z"
          fill="currentColor"
        />
      </svg>
      <span className="lumina-label">{label}</span>
    </span>
  )
}
