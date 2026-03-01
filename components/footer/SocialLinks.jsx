import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaTiktok
} from "react-icons/fa6";

const linkStyles =
  "flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white transition-all duration-300";

const socialMediaLinks = [
  {
    name: "Youtube",
    url: "https://www.youtube", // Replace with your actual Facebook page URL
    icon: <FaYoutube />,
  },
  {
    name: "Github",
    url: "https://www.tiktok.com/@nova.fitness.cent?_r=1&_d=f21f6g9g7k0050&sec_uid=MS4wLjABAAAAJW_kUgzkhexx-9fVRCVYKON1jIc0-49kcV5JxrWa15XurbDqC43i50Z5BqPtPIBC&share_author_id=7447076560194438149&sharer_language=en&source=h5_m&u_code=df934gak3f7l4d&timestamp=1772301912&user_id=6889900133628232709&sec_user_id=MS4wLjABAAAA6WMfUH-4bC5ShoCOlaCJ7eg1x-TrTtx9a3dvbjxi5_TseS_h2rp5-C7mxyqIRtEC&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7607834752468977428&share_link_id=89e717e1-8b21-41c3-8359-9470d12fced4&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&enable_checksum=1", // Replace with your actual Twitter profile URL
    icon: <FaTiktok/>,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/", // Replace with your actual Pinterest profile URL
    icon: <FaInstagram />,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/", // Replace with your actual YouTube channel URL
    icon: <FaFacebookF />,
  },
];

function SocialLinks() {
  return (
    <ul className="flex gap-2">
      {socialMediaLinks.map(({ name, url, icon }) => (
        <li key={name}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
            aria-label={name}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
