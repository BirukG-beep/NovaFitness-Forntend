
const cardStyles =
  "relative z-10 flex flex-col items-center gap-4 overflow-hidden rounded-br-3xl rounded-tl-3xl bg-white bg-[url('/images/who-we-are/card-bg.webp')] bg-cover bg-center bg-no-repeat px-5 py-10 text-center shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:z-[-1] before:bg-white before:transition-all before:duration-300 hover:text-white hover:before:bg-opacity-0";

function FeatureCards() {
  return (
    <div className="mt-[-50px] max-w-200 grid gap-14 md:grid-cols-3 md:gap-6">
      <div className={cardStyles}>
        <img src="/images/who-we-are/progression.png" alt="progression" className="h-auto w-20" />
        <h5 className="text-2xl font-bold uppercase text-blue-500">Progression</h5>
        <p className="font-medium text-blue-600">
          Our team of experts will work with you to create a customized plan
          that helps you achieve success one step at a time.
        </p>
      </div>
      <div className={cardStyles}>
        <img src="/images/who-we-are/workout.png" alt="workout" className="h-auto w-20" />
        <h5 className="text-2xl font-bold uppercase text-blue-500">Workout</h5>
        <p className="font-medium text-blue-800">
          With a variety of workouts to choose from, you&apos;ll have everything
          you need to get into the best shape of your life.
        </p>
      </div>
      <div className={cardStyles}>
        <img src="/images/who-we-are/nutritions.png" alt="nutritions" className="h-auto w-20" />
        <h5 className="text-2xl font-bold uppercase text-blue-500">Nutritions</h5>
        <p className="font-medium text-blue-600">
          Our team will work with you to create a personalized meal plan that
          helps you reach your specific health goals.
        </p>
      </div>
    </div>
  );
}

export default FeatureCards;
