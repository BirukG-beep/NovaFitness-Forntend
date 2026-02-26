import Link from "next/link";
import { dancing } from "@/app/layout";
function Copyright() {
  return (
    <div className="font-medium text-gray-700">
      <p className=" ">
        All Rights Reserved | &copy; <span>{new Date().getFullYear()}</span> Nova
      </p>
      <p>
        Designed by{" "}
        <Link
  href="https://biruk.vercel.app"
  target="_blank"
  className={`${dancing.className} text-red-600 text-xl`}
>
  Eyasu Kefyalew
</Link>
      </p>
    </div>
  );
}

export default Copyright;
