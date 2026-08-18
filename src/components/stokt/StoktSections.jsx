import StoktServices from "./StoktServices";
import StoktAbout from "./StoktAbout";

// ExpertiseSection ("Digital Product Powerhouse") is hidden — drop
// `<ExpertiseSection />` back in above StoktAbout to bring it back. It used to
// carry the `services` anchor, which now lives on StoktServices.
export default function StoktSections({ onContact }) {
  return (
    <>
      <StoktAbout onContact={onContact} />
      <StoktServices onContact={onContact} />
    </>
  );
}
