import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function KakaoFloatingButton() {
  return (
    <a
      href={siteConfig.kakaoChannelUrl}
      target="_blank"
      rel="noreferrer"
      className="btn-secondary fixed bottom-8 right-8 z-40 hidden px-5 py-3.5 text-[14px] font-medium lg:flex"
    >
      <MessageCircle size={17} strokeWidth={2} />
      카카오톡 상담
    </a>
  );
}
