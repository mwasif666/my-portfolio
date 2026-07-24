export default function Component() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,rgba(220,103,33,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(220,103,33,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,103,33,0.045)_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
  );
}
