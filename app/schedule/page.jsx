import HeroPages from "@/components/hero-pages/HeroPages";
import ScheduleLayout from "@/components/schedule-page/ScheduleLayout";
import Navbar from "@/components/navigation/Navbar";
import Fotter from "@/components/footer/Footer"
function Schedule() {
  return (
    <main>
      <Navbar />
      <HeroPages page="Schedule" />
      <ScheduleLayout />
      <Fotter />
    </main>
  );
}

export default Schedule;
