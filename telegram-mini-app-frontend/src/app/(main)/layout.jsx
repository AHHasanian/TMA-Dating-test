import BottomNavigation from "@/components/BottomNavigation/BottomNavigation";

export default function MainLayout({ children }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
}
