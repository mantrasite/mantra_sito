import MenuExperience from "@/components/MenuExperience";
import { menuSections, restaurantInfo } from "@/data/menuMobile";

export default function MenuPage() {
  return (
    <div className="w-screen h-full">
      <MenuExperience sections={menuSections} restaurant={restaurantInfo} />
    </div>
  );
}