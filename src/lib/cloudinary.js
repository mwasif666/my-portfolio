import { Cloudinary } from "@cloudinary/url-gen";

/*
 * Delivery-side Cloudinary setup.
 *
 * Only the cloud name lives here, and that is fine because it is present in
 * every delivery URL the browser fetches. No API credentials belong in this
 * client-side module.
 *
 * The fallback matters because .env is gitignored, so a fresh clone has no
 * VITE_CLOUDINARY_CLOUD_NAME and would otherwise build with an empty cloud.
 */
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "agymx2xx";
const FOLDER = "wasif-portfolio";

export const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

/**
 * A CloudinaryImage, for `<AdvancedImage cldImg={...} />` and for chaining
 * further transforms (resize, crop) at the call site.
 */
export function cldImage(id) {
  // f_auto picks AVIF/WebP per the browser's Accept header, q_auto picks the
  // compression level per image. Together they are what takes this project's
  // artwork from ~9 MB down to well under 1 MB.
  return cld.image(`${FOLDER}/${id}`).format("auto").quality("auto");
}

/** Delivery URL — what every `<img src>` and CSS `url()` here uses. */
export function cldUrl(id) {
  return cldImage(id).toURL();
}

/**
 * Video renditions for a `<video>` element, VP9 first.
 *
 * These are explicit rather than left to `f_auto`: Cloudinary's negotiation for
 * video depends on both the URL extension and the Accept header, and the same
 * asset came back as 1.2 MB VP9 or 2.2 MB H.264 depending on the combination.
 * Handing the browser both sources and letting it pick is predictable.
 *
 * `width` caps the transcode — the raw screen recordings dwarf the slot they
 * play in (the first one is 37 MB untouched, 1.2 MB at w_1000), and an
 * autoplaying preview has to be cheap or it is worse than no preview at all.
 */
export function cldVideoSources(id, { width = 1000 } = {}) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

  return [
    { type: "video/webm", src: `${base}/f_webm,vc_vp9,q_auto,w_${width}/${FOLDER}/${id}.webm` },
    { type: "video/mp4", src: `${base}/f_mp4,q_auto,w_${width}/${FOLDER}/${id}.mp4` },
  ];
}
