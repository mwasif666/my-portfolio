import "./HeroBackdrop.css";

export default function HeroBackdrop() {
  return (
    <div className="heroBackdrop" aria-hidden="true">
      <div className="heroBackdrop__grid" />
      <div className="heroBackdrop__shade" />
    </div>
  );
}
