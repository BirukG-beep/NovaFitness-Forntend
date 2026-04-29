import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";

function Title() {
  return (
    <div className="relative z-20">
      <SecondaryHeading>Pricing chart</SecondaryHeading>
      <TertiaryHeading>Nova pricing plan</TertiaryHeading>
      <p className="mx-auto max-w-[50ch] font-medium text-gray-700">
         fixed plans designed to match your goals. Get access to professional training, modern equipment, and a supportive fitness community at an affordable price.
      </p>
    </div>
  );
}

export default Title;
