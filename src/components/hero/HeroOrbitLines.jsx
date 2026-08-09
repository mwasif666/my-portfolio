import "./HeroOrbitLines.css";

export default function HeroOrbitLines({ active }) {
  return (
    <div className="heroRings" data-active={active ? "true" : "false"} aria-hidden="true">
      <span className="heroRings__field" />
      <span className="heroRings__field heroRings__field--secondary" />
    </div>
  );
}
