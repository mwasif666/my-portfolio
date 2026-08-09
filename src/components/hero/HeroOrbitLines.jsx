import "./HeroOrbitLines.css";

const RING_COUNT = 8;

export default function HeroOrbitLines({ active }) {
  return (
    <div className="heroRings" data-active={active ? "true" : "false"} aria-hidden="true">
      {Array.from({ length: RING_COUNT }, (_, index) => (
        <span
          key={index}
          className="heroRings__ring"
          style={{ "--ring-index": index }}
        />
      ))}
    </div>
  );
}
