import SecondaryHeading from "../headings/SecondaryHeading";
import PrimaryHeading from "../headings/PrimaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";
import Share from "./Share";

function Hero() {
  return (
    <section className="relative z-[2] justify-center md:mt-[-84px] flex h-96 md:h-[110vh] items-center md:items-end bg-[url('/images/hero/bg-hero.webp')] bg-cover bg-[20%] px-20 text-center xl:text-left">
      <div className=" flex relative md:pt-20"> 
      <div className="w-74 mt-[100px] hidden md:flex bg-blue-500/50 skew-x-30"></div>
       <div className="w-74 h-[500px] hidden md:flex bg-blue-500/50 skew-x-30 -ml-[120px] "></div>
        <div className="flex flex-col gap-y-5 z-[1000] md:absolute">
            <SecondaryHeading textColor="black" bgColor="white">
              Go beyond
            </SecondaryHeading>

            <PrimaryHeading />

            <PrimaryButton to="/classes">Our classes</PrimaryButton>
          </div>
      </div>
         

          <Share />
    </section>
  );
}

export default Hero;