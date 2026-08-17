import ExpertiseSection from "./ExpertiseSection";
import StoktServices from "./StoktServices";
import StoktAbout from "./StoktAbout";
import ServicesGsapMotion from "./ServicesGsapMotion";

export default function StoktSections({ onContact }) {
  return (
    <>
      <ExpertiseSection />
      <StoktAbout onContact={onContact} />
      <StoktServices />
      <ServicesGsapMotion />
    </>
  );
}
