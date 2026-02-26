import TertiaryHeading from "../headings/TertiaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";

function CallToAction() {
  return (
    <section className="relative z-[1] flex justify-center bg-[url('/images/call-to-action/bg.png')] bg-cover bg-[20%] text-center md:bg-center md:text-left">
      <div className="grid items-center gap-10 px-6 py-12 md:grid-cols-[0.8fr,200px]">
        <TertiaryHeading color="white">
          We are always providing best fitness services for you
        </TertiaryHeading>

        <div>
          <PrimaryButton to="/contact" borderColor="white">
            Join with us
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
