import StoktServices from "./StoktServices";
import StoktAbout from "./StoktAbout";

export default function StoktSections({ onContact }) {
  return (
    <>
      <StoktAbout onContact={onContact} />
      <StoktServices />
    </>
  );
}
