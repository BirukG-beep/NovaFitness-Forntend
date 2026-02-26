import FeatureCards from "./FeatureCards";
import Title from "./Title";
import Facilities from "./Facilities";
import SecondaryButton from "../buttons/SecondaryButton";
import RunningGirl from "./RunningBoy";

function WhoWeAre() {
  return (
    <section className="overflow-x-clip bg-[url('/images/who-we-are/background.webp')] md:px-6 pb-32">
      <div className=" w-screen space-y-32 space-x-3">

        <div className="relative z-[1] grid md:flex items-center gap-5 text-center  md:text-left">
          <div>
            <Title />

            <Facilities />

            <SecondaryButton to="/classes">Take a tour</SecondaryButton>
          </div>

          <RunningGirl />
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
