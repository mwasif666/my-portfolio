import { forwardRef } from 'react';

// Brand 4-point spark.
export const Logo = (p) => (
  <svg className="icon" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
  </svg>
);

// forwardRef so PillButton can spring the arrow on hover.
export const ArrowRight = forwardRef((p, ref) => (
  <svg ref={ref} className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
));

export const ArrowUpRight = forwardRef((p, ref) => (
  <svg ref={ref} className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
));

export const Star = (p) => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
  </svg>
);

export const CircleDot = (p) => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
  </svg>
);

export const GridIcon = (p) => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon = (p) => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

// Original brand marks for the Preferred Stack chips. Kept in their official
// colours so they read as the real logos; the React atom's orbits are given a
// `.orbits` group so CSS can spin them.
export const StackIcon = ({ name, ...p }) => {
  switch (name) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className="brand-react" aria-hidden="true" {...p}>
          <g className="orbits" fill="none" stroke="#61dafb" strokeWidth="1.1">
            <ellipse cx="12" cy="12" rx="11" ry="4.3" />
            <ellipse cx="12" cy="12" rx="11" ry="4.3" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.3" transform="rotate(120 12 12)" />
          </g>
          <circle cx="12" cy="12" r="2.1" fill="#61dafb" />
        </svg>
      );
    case 'next':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <circle cx="12" cy="12" r="11.5" fill="#000" />
          <path d="M8.2 7.4v9.2M8.2 7.4 15.6 17M15.7 7.4v6" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <path d="M12 1.6 21.5 7v10L12 22.4 2.5 17V7L12 1.6Z" fill="#5fa04e" />
          <path d="M12 1.6 21.5 7v10L12 22.4Z" fill="#3f7a37" />
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <rect x="1" y="1" width="22" height="22" rx="3.2" fill="#3178c6" />
          <text x="12.4" y="16.6" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="-.4">TS</text>
        </svg>
      );
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <ellipse cx="6.7" cy="9.6" rx="3.7" ry="4.3" fill="#336791" />
          <ellipse cx="17.3" cy="9.6" rx="3.7" ry="4.3" fill="#336791" />
          <path d="M12 4.1c-3.5 0-6.3 2.8-6.3 6.3 0 2.4 1.3 4.5 3.2 5.6v3.4c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6 0-.6-.2-1 .1-1.4.3-.4.9-.4 1.2 0 .3.4.5.9 1.2.9.9 0 1.6-.7 1.6-1.6v-1.4c1.8-1.1 3.1-3.1 3.1-5.5 0-3.5-2.8-6.3-6.3-6.3Z" fill="#336791" />
          <circle cx="9.7" cy="10.4" r="1" fill="#fff" />
          <circle cx="14.3" cy="10.4" r="1" fill="#fff" />
        </svg>
      );
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <path d="M12 1.5c.9 3.6 3.1 5.9 4.3 8.5 1.8 3.8.7 8.3-2.7 10.7-.4.3-.7.7-.9 1.2l-.5 2.1h-.4l-.5-2.1c-.2-.5-.5-.9-.9-1.2-3.5-2.5-4.6-7.2-2.5-11.1C9.1 7.2 11.1 5.1 12 1.5Z" fill="#00a44f" />
          <path d="M12 4.2v15.6" fill="none" stroke="#0a7d40" strokeWidth="1" strokeLinecap="round" opacity=".7" />
        </svg>
      );
    case 'aws':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <text x="12" y="12.6" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="7.6" fontWeight="800" fill="#232f3e" letterSpacing="-.2">aws</text>
          <path d="M4.5 16.2c2.6 1.9 5.4 2.9 7.5 2.9s4.9-1 7.5-2.9" fill="none" stroke="#ff9900" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M17.3 15.4 19.8 16l-.5 2.5" fill="none" stroke="#ff9900" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 54 33" aria-hidden="true" {...p}>
          <path fill="#38bdf8" fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" {...p}>
          <path fill="#3776ab" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V72.804c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
          <path fill="#ffd43b" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
        </svg>
      );
    case 'graphql':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <g stroke="#e10098" strokeWidth="1" fill="none">
            <path d="M12 3.2 19.6 7.6v8.8L12 20.8 4.4 16.4V7.6L12 3.2Z" />
            <path d="M12 3.2 4.4 16.4h15.2L12 3.2Z" />
          </g>
          <g fill="#e10098">
            <circle cx="12" cy="3.2" r="1.7" />
            <circle cx="19.6" cy="7.6" r="1.7" />
            <circle cx="19.6" cy="16.4" r="1.7" />
            <circle cx="12" cy="20.8" r="1.7" />
            <circle cx="4.4" cy="16.4" r="1.7" />
            <circle cx="4.4" cy="7.6" r="1.7" />
          </g>
        </svg>
      );
    case 'redis':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <g fill="#dc382d">
            <path d="M4 16.4v-4c0 1.7 3.6 3 8 3s8-1.3 8-3v4c0 1.7-3.6 3-8 3s-8-1.3-8-3Z" opacity=".7" />
            <path d="M4 12.4v-4c0 1.7 3.6 3 8 3s8-1.3 8-3v4c0 1.7-3.6 3-8 3s-8-1.3-8-3Z" opacity=".85" />
            <ellipse cx="12" cy="7.4" rx="8" ry="3" />
          </g>
          <ellipse cx="12" cy="7.4" rx="4.4" ry="1.5" fill="#fff" opacity=".22" />
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
          <g fill="#2496ed">
            <rect x="5.2" y="9.2" width="2.7" height="2.7" rx=".3" />
            <rect x="8.4" y="9.2" width="2.7" height="2.7" rx=".3" />
            <rect x="11.6" y="9.2" width="2.7" height="2.7" rx=".3" />
            <rect x="14.8" y="9.2" width="2.7" height="2.7" rx=".3" />
            <rect x="8.4" y="6" width="2.7" height="2.7" rx=".3" />
            <rect x="11.6" y="6" width="2.7" height="2.7" rx=".3" />
            <path d="M2.4 12.4h17c.2 0 .32.15.3.34-.06.7-.34 1.86-1.16 2.86C17.3 17.2 14.9 18.2 12 18.2H8.4c-2.8 0-5.4-1.5-5.9-4.2-.05-.28-.16-1-.18-1.2-.02-.2.1-.4.28-.4Z" />
            <path d="M20 11.3c.5-.4.85-1 .95-1.75.12.65.55 1.2 1 1.5-.42.3-1 .42-1.55.32l-.4-.07Z" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};
