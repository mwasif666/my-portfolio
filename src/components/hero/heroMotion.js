import clsx from "clsx";

export const heroReveal = (delay) =>
  clsx(
    "opacity-0 translate-y-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
    "group-data-[visible=true]:opacity-100 group-data-[visible=true]:translate-y-0",
    "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none",
    delay,
  );
