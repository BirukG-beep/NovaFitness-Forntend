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
           Since 2017 E.C., we have been dedicated to transforming lives and developing skilled fitness trainers who are making a real impact in people’s lives. Through continuous growth, commitment, and passion for excellence, we strive to build a stronger, healthier community every day.
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
     Our mission at Fitness Nova is to empower individuals to live healthier, stronger, and more confident lives through quality training, continuous support, and a motivating fitness environment. We are committed to inspiring transformation and building a community focused on growth and excellence.
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
