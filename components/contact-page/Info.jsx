import SocialLinks from "../footer/SocialLinks";

const headingStyles = `relative mb-4 mt-6 pb-2 text-xl font-bold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red`;

function Info() {
  return (
    <div>
      <h3 className="mb-4 text-3xl font-bold">
        We are here for help you To Shape Your Body
      </h3>
      <p className="font-medium text-gray-300">
       We are dedicated to helping you achieve your fitness goals with expert guidance, personalized workout plans, and the motivation you need to succeed. Whether you want to build muscle, lose weight, or improve your overall health, our team is here to support you every step of the way. Start your fitness journey with us and transform your body with confidence.
      </p>
      <div className="grid 2xl:grid-cols-2 2xl:gap-y-8">
        <div>
          <h4 className={headingStyles}>Bishoftu, Ethiopia</h4>
          <address className="font-medium not-italic text-gray-300">
            around Meneharia
            <br /> Cooperative Bank of Oromia 3rd floor
          </address>
        </div>
        <div>
          <h4 className={headingStyles}>Opening Hours</h4>
          <p className="whitespace-nowrap font-medium text-gray-300">
            Mon to Fri: 9:00 am — 10:00 pm
          </p>
          <p className="whitespace-nowrap font-medium text-gray-300">
            Sat: 10:30 pm — 12:00 am
          </p>
        </div>
        <div>
          <h4 className={headingStyles}>Information</h4>
          <a
            href="tel:+251923704250"
            className="block font-medium text-gray-300"
          >
            +251923704250
          </a>
          <a
            href="novafitness51@gmail.com"
            className="block font-medium text-gray-300"
          >
          novafitness51@gmail.com
          </a>
        </div>
        <div>
          <h4 className={headingStyles}>Follow Us On</h4>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

export default Info;
