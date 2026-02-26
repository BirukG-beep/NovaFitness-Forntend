import TertiaryHeading from "../../headings/TertiaryHeading";

function History() {
  return (
    <section className="bg-[url('/images/about-page/bg.png')] bg-cover px-6 py-32 text-center">
      <div className=" grid shadow-2xl md:grid-cols-2 gap-10">
        <div className="flex h-full flex-col gap-4 self-center  p-4">
          <img
            src="/images/about-page/target.png"
            alt=""
            className="hover:rotate-y-180 mx-auto w-32 transition-all duration-700"
          />
          <TertiaryHeading>Our history</TertiaryHeading>
          <p className="font-medium text-white">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit Exercitation
            veniam consequat.
          </p>
        </div>

        <div className="overflow-hidden">
          <img
            src="/images/about-page/img1.webp"
            alt=""
             className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500 hover:scale-110"
          />
        </div>

        <div className="flex h-full flex-col gap-4 self-center  p-4 xl:order-4">
          <img
            src="/images/about-page/mountain.png"
            alt=""
            className="hover:rotate-y-180 mx-auto transition-all duration-700"
          />
          <TertiaryHeading>Our Mission</TertiaryHeading>
          <p className="font-medium text-white">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit Exercitation
            veniam consequat.
          </p>
        </div>

        <div className="overflow-hidden">
          <img
            src="/images/about-page/img2.webp"
            alt=""
              className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}

export default History;
