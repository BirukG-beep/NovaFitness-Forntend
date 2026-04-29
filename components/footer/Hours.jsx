function Hours() {
  return (
    <div className="space-y-5">
      <h4 className="relative pb-2 text-gray-700 text-xl font-semibold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red-600">
        Working hours
      </h4>
      <ul className="space-y-5 font-medium text-gray-700">
        <li>
          <div>
          <span className="font-semibold">Monday – Saturday: </span>
          <div className="">
           <div className="flex flex-col">
            <p>Morning</p>
            <p>12:00 AM - 6:00 AM</p>
           </div >
           <div>
              <p>Night</p>
            <p>7:30 PM - 3:00PM</p>
            </div>
           </div>
          </div>
        </li>
        <li>
          <span className="font-semibold">Sunday: </span>Closed
        </li>
      </ul>
    </div>
  );
}

export default Hours;
