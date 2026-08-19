import { useEffect } from "react";

const DIM = "rgba(244, 240, 236, 0.16)";
const LIT = "rgba(250, 248, 245, 1)";

// Word fill, in timeline units: the gap between two consecutive words lighting
// up, how long one word takes, and the beat that follows the last one landing.
// The card cue is derived from these so the copy is always finished reading
// before anything crosses it, however long the quote gets.
const FILL_STEP = 0.055;
const FILL_EACH = 0.4;
const HOLD_AFTER_FILL = 0.45;

// Viewport heights of scroll handed to acts 1-2 (hero + quote panel).
const FRONT_SCROLL_VH = 3.5;

// Pixels of scroll each pixel of card movement costs. This is the dial for how
// fast act three reads: higher is slower.
const CARD_SLOWDOWN = 0.85;

// How much of a card has to have cleared the top edge before the card two
// places behind it is released from below.
const HIDDEN_AT = 0.7;

/**
 * Three acts scrubbed off one sticky viewport:
 *
 *   1. the hero holds, then lifts away
 *   2. a glass panel slides up from under the viewport and parks dead centre,
 *      where it stays for the rest of the section while its copy fills word by
 *      word
 *   3. the cards rise from under the stage and travel up over the parked
 *      panel through three lanes — left, right, then centre — each released as
 *      the card two ahead of it clears the top edge, so two or three are always
 *      in frame at once
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
    const cards = Array.from(track.querySelectorAll("[data-service-card]"));

    // Far enough past the viewport edge that the panel — and the blurred glow
    // bleeding out of it — is fully clipped at either end of its run.
    const offstage = () => window.innerHeight / 2 + quote.offsetHeight / 2 + 96;

    const frontScroll = () => window.innerHeight * FRONT_SCROLL_VH;

    // A card enters with its top on the stage's bottom edge and leaves with its
    // bottom on the top edge, so one pass covers stage height plus card height.
    const stageHeight = () => rail.clientHeight || window.innerHeight;
    const cardHeight = () => cards[0]?.offsetHeight || stageHeight() * 0.6;
    const enterY = () => stageHeight();
    const exitY = () => -cardHeight();
    const cardTravel = () => stageHeight() + cardHeight();

    // Where in a card's own pass HIDDEN_AT of it has gone past the top edge.
    const hiddenPoint = () =>
      (stageHeight() + HIDDEN_AT * cardHeight()) / cardTravel();

    // "Card i+2 starts when card i is 70% hidden" chains all the way down the
    // row, and a uniform stagger of half that point is exactly what satisfies
    // it — which also puts the right-lane card below the left-lane one.
    const stepFraction = () => hiddenPoint() / 2;
    // Act three's length measured in single-card passes.
    const passUnits = () => Math.max(cards.length - 1, 0) * stepFraction() + 1;

    const cardsScroll = () => cardTravel() * CARD_SLOWDOWN * passUnits();

    // The trigger runs `top top` -> `bottom bottom`, so the scrollable range is
    // the section height minus one viewport, not the height itself. The extra
    // viewport here is what makes frontScroll/cardsScroll land as the real
    // pixel budgets rather than ~14% short of them.
    const sizeSection = () => {
      section.style.height = `${window.innerHeight + frontScroll() + cardsScroll()}px`;
    };

    // Act 1-2 timings, needed both inside the timeline and by the resize handler
    // below, so they are worked out once here.
    const fillStart = 3.55;
    const fillEnd = fillStart + Math.max(words.length - 1, 0) * FILL_STEP + FILL_EACH;
    // The panel never leaves, so this is simply the beat at which act three is
    // cued rather than the start of an exit.
    const handover = fillEnd + HOLD_AFTER_FILL;
    const frontDuration = handover + 0.9;

    /*
     * Scrub spreads the timeline evenly over the section's height, so a tween's
     * share of the duration *is* its share of the scroll. Solving
     *   frontDuration / T = frontScroll / height
     *   cardsDuration / T = cardsScroll / height     (T = front + cards)
     * gives act three the duration that honours CARD_SLOWDOWN exactly.
     */
    const cardsDuration = () => (frontDuration * cardsScroll()) / frontScroll();
    const cardDuration = () => cardsDuration() / passUnits();
    const cardStep = () => cardDuration() * stepFraction();

    let cardTweens = [];

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

      // Act 3 — the stage fades up over the parked panel, then the cards start
      // rising through it.
      tl.fromTo(rail, { opacity: 0 }, { opacity: 1, duration: 0.6 }, handover + 0.15);

      // CSS puts each card on its lane with `left`; this pulls it back onto that
      // centre line, leaving `y` as the only thing the scrub has to drive.
      gsap.set(cards, { xPercent: -50 });

      const dur = cardDuration();
      const step = cardStep();

      cards.forEach((card, index) => {
        tl.fromTo(
          card,
          { y: enterY },
          { y: exitY, duration: dur },
          frontDuration + index * step,
        );
      });

      // `tl.fromTo` returns the timeline rather than the tween, so the card
      // tweens are picked back out of it by target for the resize fixup below.
      cardTweens = tl
        .getChildren(false, true, false)
        .filter((tween) => cards.includes(tween.targets()[0]));
    }, section);

    // Function-based tween values re-evaluate on refresh but durations and
    // start times do not, so a resize would otherwise leave act three pinned to
    // the old viewport and quietly break both the slowdown and the handover.
    const onRefresh = () => {
      sizeSection();
      const dur = cardDuration();
      const step = cardStep();

      cardTweens.forEach((tween, index) => {
        tween.duration(dur).startTime(frontDuration + index * step);
      });
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
