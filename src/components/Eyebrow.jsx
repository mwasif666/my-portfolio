export default function Eyebrow({ tone = 'dark', bordered, children }) {
  return (
    <span className={`eyebrow ${tone}${bordered ? ' bordered' : ''}`}>
      <span className="dot" />
      {children}
    </span>
  );
}
