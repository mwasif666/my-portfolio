import { useEffect } from "react";

const DIM = "rgba(244, 240, 236, 0.16)";
const LIT = "rgba(250, 248, 245, 1)";

// Word fill, in timeline units: the gap between two consecutive words lighting
// up, how long one word takes, and the beat the panel holds once the last one
// has landed. The exit is derived from these so the copy is always finished
// before the panel moves, however long the quote gets.
const FILL_STEP = 0.055;
const FILL_EACH = 0.4;
const HOLD_AFTER_FILL = 0.45;

// Viewport heights of scroll handed to acts 1-2 (hero + quote panel).
const FRONT_SCROLL_VH = 3.5;

// Pixels of scroll each pixel of card movement costs. Below 1 the row outruns
// the page and the cards flick past — it used to work out at about 0.53, i.e.
// twice the scroll speed. This is the dial: higher is slower.
const CAROUSEL_SLOWDOWN = 1.15;

/**
 * Three acts scrubbed off one sticky viewport:
 *
 *   1. the hero holds, then lifts away
 *   2. a glass panel slides up from under the viewport, parks dead centre
 *      while its copy fills word by word, then leaves upward
 *   3. the cards run right-to-left like a carousel
 *
 * The viewport is pinned with `position: sticky` rather than ScrollTrigger's
 * own pinning, so it behaves the same way as the other pinned sections here
 * and never fights Lenis over a pin-spacer.
 */
export default function useServicesTimeline({
  sectionRef,
  heroRef,
  quoteRef,
  wordsRef,
  railRef,
  trackRef,
}) {
  useEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    const quote = quoteRef.current;
    const rail = railRef.current;
    const track = trackRef.current;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!section || !hero || !quote || !rail || !track) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 860px)");

    // Without GSAP, or where the animation would hurt, show the finished state.
    if (!gsap || !ScrollTrigger || reducedMotion.matches || narrow.matches) {
      section.dataset.static = "true";
      return undefined;
    }

    delete section.dataset.static;

    const words = wordsRef.current.filter(Boolean);
    // Distance the track has to travel for its last card to reach the left.
    const travel = () => Math.max(track.scrollWidth - rail.clientWidth, 0);
    const enterFrom = () => rail.clientWidth * 0.88;
    // Far enough past the viewport edge that the panel — and the blurred glow
    // bleeding out of it — is fully clipped at either end of its run.
    const offstage = () => window.innerHeight / 2 + quote.offsetHeight / 2 + 96;

    const frontScroll = () => window.innerHeight * FRONT_SCROLL_VH;
    // The row does not only travel — it enters from off-screen right first, so
    // the distance the cards actually cover is the entry offset plus the travel.
    // Costing the slowdown against `travel` alone understates it by ~40%.
    const carouselMove = () => enterFrom() + travel();
    const carouselScroll = () => carouselMove() * CAROUSEL_SLOWDOWN;

    // The trigger runs `top top` -> `bottom bottom`, so the scrollable range is
    // the section height minus one viewport, not the height itself. The extra
    // viewport here is what makes frontScroll/carouselScroll land as the real
    // pixel budgets rather than ~14% short of them.
    const sizeSection = () => {
      section.style.height = `${window.innerHeight + frontScroll() + carouselScroll()}px`;
    };

    // Act 1-2 timings, needed both inside the timeline and by the resize handler
    // below, so they are worked out once here.
    const fillStart = 3.55;
    const fillEnd = fillStart + Math.max(words.length - 1, 0) * FILL_STEP + FILL_EACH;
    const exitStart = fillEnd + HOLD_AFTER_FILL;
    const frontDuration = exitStart + 1.25;

    /*
     * Scrub spreads the timeline evenly over the section's height, so a tween's
     * share of the duration *is* its share of the scroll. Solving
     *   frontDuration  / T = frontScroll    / height
     *   trackDuration  / T = carouselScroll / height     (T = front + track)
     * gives the duration that makes the row honour CAROUSEL_SLOWDOWN exactly,
     * rather than the old flat 3.7 that happened to outpace the page.
     */
    const trackDuration = () => (frontDuration * carouselScroll()) / frontScroll();

    let trackTween;

    sizeSection();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Act 1 — the hero holds for a beat, then lifts out of frame.
      tl.to(hero, { yPercent: -16, opacity: 0, scale: 0.96, ease: "power2.in", duration: 1.3 }, 1.0);

      // Act 2 — the panel travels straight up from under the viewport. No fade
      // and no scale: it simply arrives, and stops in the centre.
      tl.fromTo(
        quote,
        { y: offstage },
        { y: 0, ease: "power3.out", duration: 1.8 },
        1.5,
      );

      // Centre hold — nothing moves the panel while the copy fills, one word at
      // a time, so it reads as pinned for the whole of the read.
      tl.fromTo(
        words,
        { color: DIM },
        { color: LIT, stagger: { each: FILL_STEP }, duration: FILL_EACH },
        fillStart,
      );

      // Only once the last word is lit does the panel leave, upward.
      tl.to(quote, { y: () => -offstage(), ease: "power2.in", duration: 1.3 }, exitStart);

      // Act 3 — the carousel arrives from the right and runs left.
      tl.fromTo(rail, { opacity: 0 }, { opacity: 1, duration: 0.7 }, exitStart + 1.0);

      trackTween = tl.fromTo(
        track,
        { x: enterFrom },
        { x: () => -travel(), duration: trackDuration() },
        frontDuration,
      );
    }, section);

    // Function-based tween values re-evaluate on refresh but durations do not,
    // so a resize would otherwise leave the row's share of the timeline pinned
    // to the old viewport and quietly break the slowdown ratio.
    const onRefresh = () => {
      sizeSection();
      trackTween?.duration(trackDuration());
    };

    ScrollTrigger.addEventListener("refreshInit", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      ctx.revert();
      section.style.removeProperty("height");
    };
  }, [heroRef, quoteRef, railRef, sectionRef, trackRef, wordsRef]);
}
