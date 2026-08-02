import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import { TbBrandWhatsappFilled } from "react-icons/tb";

export const CONTACT_EMAIL = "info@iconivewigs.com";

export const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/profile.php?id=100087712010768", Icon: FaFacebook, label: "Facebook" },
  { href: "https://wa.me/message/PIZLMGBXCLUUN1", Icon: TbBrandWhatsappFilled, label: "WhatsApp" },
  { href: "https://www.instagram.com/iconivewigs/", Icon: PiInstagramLogoFill, label: "Instagram" },
  { href: "https://twitter.com/Iconivewigs", Icon: FaXTwitter, label: "X" },
  { href: "https://youtube.com/@IconiveWigs?si=m5ojSW2u4XrFVUCE", Icon: FaYoutube, label: "YouTube" },
  {
    href: "https://www.linkedin.com/company/99836837/admin/feed/posts/?feedType=following",
    Icon: FaLinkedinIn,
    label: "LinkedIn",
  },
] as const;
