import { useLayoutEffect, useRef } from "react";
import KontourBanner from "./KontourBanner";
import styles from "./ScrollHero3D.module.css";

export default function ScrollHero3D({ onContact }) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!track || !stage || !gsap || !ScrollTrigger) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 901px)",
        motionOK: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { desktop, motionOK } = context.conditions;
        if (!desktop || !motionOK) return undefined;

        const hero = stage.querySelector(".portfolio-banner");
        const stats = stage.querySelector('[aria-label="Professional highlights"]');
        const portraitImage = stage.querySelector('img[alt*="Muhammad Wasif"]');
        const portrait = portraitImage?.parentElement;
        const heading = stage.querySelector("h1")?.parentElement;
        const cta = stage.querySelector(
          'button[aria-label="Start a project with Muhammad Wasif"]',
        );
        const projectsLink = stage.querySelector('a[href="#projects"]');
        const pitch = projectsLink?.parentElement?.parentElement;
        const layout = stats?.parentElement;
        const kicker = layout?.firstElementChild;
        const activity = layout?.lastElementChild;

        if (!hero || !layout) return undefined;

        const foreground = [
          kicker,
          heading,
          portrait,
          cta,
          stats,
          pitch,
          activity,
        ].filter(Boolean);

        gsap.set(hero, { transformStyle: "preserve-3d", force3D: true });
        gsap.set(layout, { transformStyle: "preserve-3d", force3D: true });
        gsap.set(foreground, {
          force3D: true,
          backfaceVisibility: "hidden",
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.15,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            stage,
            {
              "--bg-grid-y": "118px",
              "--bg-grid-z": "205px",
              "--bg-grid-rx": "40deg",
              "--bg-grid-rz": "-0.8deg",
              "--bg-glow-y": "-54px",
              "--bg-glow-scale": 1.16,
              "--bg-orb-x": "74px",
              "--bg-orb-y": "-38px",
              "--bg-beam-x": "-46px",
              "--bg-beam-y": "32px",
              duration: 1,
            },
            0,
          )
          .to(
            heading,
            {
              x: 10,
              y: -30,
              z: -132,
              rotationX: 1.4,
              scale: 0.975,
              opacity: 0.78,
              transformOrigin: "50% 35%",
              duration: 0.94,
            },
            0,
          )
          .to(
            kicker,
            {
              x: -5,
              y: -13,
              z: -48,
              opacity: 0.84,
              duration: 0.9,
            },
            0,
          )
          .to(
            portrait,
            {
              x: 42,
              y: -11,
              z: 188,
              rotationY: -4.1,
              scale: 1.043,
              transformOrigin: "55% 72%",
              duration: 1,
            },
            0,
          )
          .to(
            cta,
            {
              x: 27,
              y: -3,
              z: 112,
              scale: 1.02,
              duration: 0.96,
            },
            0,
          )
          .to(
            stats,
            {
              x: -18,
              y: -8,
              z: 108,
              rotationY: 2.1,
              scale: 1.008,
              transformOrigin: "50% 50%",
              duration: 0.98,
            },
            0,
          )
          .to(
            pitch,
            {
              x: -10,
              y: -19,
              z: 64,
              duration: 0.94,
            },
            0,
          )
          .to(
            activity,
            {
              x: 12,
              y: 15,
              z: 55,
              duration: 0.92,
            },
            0,
          );

        const pointerTarget = { x: 0, y: 0 };
        const pointerCurrent = { x: 0, y: 0 };

        const setTiltX = gsap.quickSetter(stage, "--bg-tilt-x");
        const setTiltY = gsap.quickSetter(stage, "--bg-tilt-y");

        const pointerTick = () => {
          pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.075;
          pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.075;

          setTiltX(`${(-pointerCurrent.y * 1.55).toFixed(3)}deg`);
          setTiltY(`${(pointerCurrent.x * 1.9).toFixed(3)}deg`);

          gsap.set(layout, {
            rotationY: pointerCurrent.x * 0.42,
            rotationX: -pointerCurrent.y * 0.28,
            x: pointerCurrent.x * 2.2,
            y: pointerCurrent.y * 1.5,
            transformPerspective: 1400,
          });
        };

        const onPointerMove = (event) => {
          const bounds = stage.getBoundingClientRect();
          pointerTarget.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
          pointerTarget.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
        };

        const onPointerLeave = () => {
          pointerTarget.x = 0;
          pointerTarget.y = 0;
        };

        gsap.ticker.add(pointerTick);
        stage.addEventListener("pointermove", onPointerMove, { passive: true });
        stage.addEventListener("pointerleave", onPointerLeave);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          gsap.ticker.remove(pointerTick);
          stage.removeEventListener("pointermove", onPointerMove);
          stage.removeEventListener("pointerleave", onPointerLeave);
          timeline.scrollTrigger?.kill();
          timeline.kill();
          gsap.set(layout, { clearProps: "transform" });
          gsap.set(foreground, { clearProps: "transform,opacity,backfaceVisibility" });
          gsap.set(hero, { clearProps: "transformStyle" });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.track} ref={trackRef} id="home">
      <div className={styles.stage} ref={stageRef}>
        <KontourBanner id="blue-banner" theme="blue" onContact={onContact} />
      </div>
    </section>
  );
}
