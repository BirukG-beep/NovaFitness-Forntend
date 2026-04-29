
function Image() {
  return (
    <div className="relative flex before:absolute before:bottom-0 before:left-3 before:h-64 before:w-3 before:bg-red after:absolute after:bottom-0 after:right-8 after:top-[-30px] after:w-3 after:rotate-[-6deg] after:bg-red">
      <img src= "/images/choose-us/main.webp" alt="" className="m-auto w-4/5" />
      <button className="absolute bottom-1/2 right-1/2 z-10 translate-x-1/2 translate-y-1/2 rounded-full bg-white p-4 shadow-2xl shadow-red">
        <img src="/images/choose-us/play.png" alt="" className="w-5" />
      </button>
    </div>
  );
}

export default Image;
