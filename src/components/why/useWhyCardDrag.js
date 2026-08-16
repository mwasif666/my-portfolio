import { useEffect } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// How much of a card must stay inside the stage when it is dragged to an edge.
const KEEP_X = 0.28;
const KEEP_Y = 0.45;

export default function useWhyCardDrag({ cardRefs }) {
  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    // Cards stack vertically below this width, where dragging would fight scroll.
    const stacked = window.matchMedia("(max-width: 860px)");
    const offsets = new Map(nodes.map((node) => [node, { x: 0, y: 0 }]));
    const disposers = [];
    let front = 10;

    nodes.forEach((node) => {
      let pointerId = null;
      let origin = null;
      let base = null;
      let bounds = null;

      const onPointerDown = (event) => {
        if (stacked.matches || event.button > 0 || pointerId !== null) return;

        const offset = offsets.get(node);
        const card = node.getBoundingClientRect();
        const layer = node.parentElement.getBoundingClientRect();

        pointerId = event.pointerId;
        origin = { x: event.clientX, y: event.clientY };
        base = { x: offset.x, y: offset.y };
        bounds = {
          minX: base.x + layer.left - card.width * (1 - KEEP_X) - card.left,
          maxX: base.x + layer.right - card.width * KEEP_X - card.left,
          minY: base.y + layer.top - card.height * (1 - KEEP_Y) - card.top,
          maxY: base.y + layer.bottom - card.height * KEEP_Y - card.top,
        };

        node.setPointerCapture(pointerId);
        node.style.zIndex = String((front += 1));
        node.style.setProperty("--drag-lift", "1.03");
        node.dataset.dragging = "true";
        event.preventDefault();
      };

      const onPointerMove = (event) => {
        if (pointerId === null || event.pointerId !== pointerId) return;

        const offset = offsets.get(node);
        offset.x = clamp(base.x + event.clientX - origin.x, bounds.minX, bounds.maxX);
        offset.y = clamp(base.y + event.clientY - origin.y, bounds.minY, bounds.maxY);
        node.style.setProperty("--drag-x", `${offset.x}px`);
        node.style.setProperty("--drag-y", `${offset.y}px`);
      };

      const onPointerUp = (event) => {
        if (pointerId === null || event.pointerId !== pointerId) return;

        if (node.hasPointerCapture(pointerId)) node.releasePointerCapture(pointerId);
        pointerId = null;
        node.style.setProperty("--drag-lift", "1");
        delete node.dataset.dragging;
      };

      // Double click drops a card back onto its scripted position.
      const onDoubleClick = () => {
        if (stacked.matches) return;
        const offset = offsets.get(node);
        offset.x = 0;
        offset.y = 0;
        node.style.setProperty("--drag-x", "0px");
        node.style.setProperty("--drag-y", "0px");
      };

      node.addEventListener("pointerdown", onPointerDown);
      node.addEventListener("pointermove", onPointerMove);
      node.addEventListener("pointerup", onPointerUp);
      node.addEventListener("pointercancel", onPointerUp);
      node.addEventListener("dblclick", onDoubleClick);

      disposers.push(() => {
        node.removeEventListener("pointerdown", onPointerDown);
        node.removeEventListener("pointermove", onPointerMove);
        node.removeEventListener("pointerup", onPointerUp);
        node.removeEventListener("pointercancel", onPointerUp);
        node.removeEventListener("dblclick", onDoubleClick);
      });
    });

    return () => disposers.forEach((dispose) => dispose());
  }, [cardRefs]);
}
