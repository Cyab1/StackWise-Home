export default function Logo({ variant = 'dark', className = '' }) {
  // variant "dark" = for use on dark backgrounds (white "Stack", soft teal "Wise")
  // variant "light" = for use on light backgrounds (deep teal "Stack", medium teal "Wise")
  const stackColor = variant === 'dark' ? '#ffffff' : '#085041';
  const wiseColor = variant === 'dark' ? '#5DCAA5' : '#1D9E75';
  const barColor = variant === 'dark' ? '#5DCAA5' : '#1D9E75';

  return (
    <span className={`logo-mark ${className}`}>
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true">
        <rect x="2" y="17" width="26" height="6" rx="3" fill={barColor} opacity="0.55" />
        <rect x="6" y="9" width="18" height="6" rx="3" fill={barColor} opacity="0.8" />
        <rect x="10" y="1" width="10" height="6" rx="3" fill={barColor} />
        <circle cx="15" cy="4" r="1.6" fill={variant === 'dark' ? '#085041' : '#F4FBF8'} />
      </svg>
      <span className="logo-text">
        <span style={{ color: stackColor }}>Stack</span>
        <span style={{ color: wiseColor }}>Wise</span>
      </span>
    </span>
  );
}
