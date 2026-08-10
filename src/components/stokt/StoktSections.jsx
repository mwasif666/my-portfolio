import StoktServices from "./StoktServices";
import StoktAbout from "./StoktAbout";

export default function StoktSections({ onContact }) {
  return (
    <>
      <StoktServices />
      <StoktAbout onContact={onContact} />
    </>
  );
}
