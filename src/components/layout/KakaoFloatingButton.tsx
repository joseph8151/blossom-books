import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function KakaoFloatingButton() {
  return (
    <a
      href={siteConfig.kakaoChatUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-40 hidden items-center gap-2 bg-navy-900 px-5 py-3.5 text-[14px] font-medium text-ivory-100 shadow-[0_10px_30px_-8px_rgba(13,22,38,0.45)] transition-transform hover:-translate-y-0.5 lg:flex"
    >
      <MessageCircle size={17} strokeWidth={2} />
      카카오톡 상담
    </a>
  );
}
