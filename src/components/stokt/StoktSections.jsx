import StoktServices from "./StoktServices";
import StoktAbout from "./StoktAbout";
import ServicesGsapMotion from "./ServicesGsapMotion";

export default function StoktSections({ onContact }) {
  return (
    <>
      <StoktAbout onContact={onContact} />
      <StoktServices />
      <ServicesGsapMotion />
    </>
  );
}
