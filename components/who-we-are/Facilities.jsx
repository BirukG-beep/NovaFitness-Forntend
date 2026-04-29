
function Facilities() {
  return (
    <div className="mb-24 flex flex-col items-center justify-center gap-12 text-center lg:flex-row lg:gap-0 2xl:justify-start">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/images/who-we-are/trainers.png"
          alt="trainers"
          className="hover:rotate-y-180 h-auto w-16 transition-all duration-700"
        />
        <h4 className="w-48 text-gray-900 text-xl font-bold uppercase">
          Professional trainers
        </h4>
      </div>
      <div className="flex flex-col items-center gap-4 lg:border-l lg:border-r lg:border-gray-400">
        <img
          src="/images/who-we-are/equipments.png"
          alt="equipments"
          className="hover:rotate-y-180 h-auto w-16 transition-all duration-700"
        />
        <h4 className="w-48 text-xl font-bold uppercase text-gray-900">Modern equipments</h4>
      </div>
      <div className="flex flex-col items-center gap-4">
        <img
          src="/images/who-we-are/machines.png"
          alt="machines"
          className="hover:rotate-y-180 h-auto w-16 transition-all duration-700"
        />
        <h4 className="w-48 text-xl font-bold uppercase text-gray-900">Fancy gym machines</h4>
      </div>
    </div>
  );
}

export default Facilities;
