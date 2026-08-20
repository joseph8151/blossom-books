"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { siteConfig } from "@/data/site";

// International visitors mostly don't use KakaoTalk, and a mailto: link
// both exposes the receiving address and depends on the visitor having a
// desktop mail client configured. This posts straight to Web3Forms instead
// — same delivery pipeline the Korean pages already use — so no email
// address ever appears in the page source, and it works from any browser.
export function EnContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const key = siteConfig.web3formsAccessKey;
    if (!key) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          from_name: name || "Blossom Books website (EN)",
          replyto: email,
          subject: `[Blossom Books EN] Inquiry from ${name || "website visitor"}`,
          message: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
      const json = (await res.json().catch(() => ({ success: false }))) as { success?: boolean };
      if (json.success) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-2 py-6 text-center">
        <Check size={22} className="text-brass-500" strokeWidth={2.4} />
        <p className="text-[14.5px] font-medium text-navy-950">Thanks — your message is on its way.</p>
        <p className="text-[13px] text-charcoal-600">We usually reply within one business day.</p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-navy-800/20 bg-ivory-100 px-4 py-3 text-[14px] text-charcoal-900 outline-none focus:border-navy-800/50";

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
      <input
        required
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputCls}
      />
      <input
        required
        type="email"
        placeholder="Your email (so we can reply)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputCls}
      />
      <textarea
        required
        rows={4}
        placeholder="What can we help with?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputCls} resize-none`}
      />
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-2 bg-navy-900 px-7 py-3.5 text-[14.5px] font-medium text-ivory-100 transition-colors hover:bg-navy-800 disabled:opacity-50"
      >
        <Send size={15} />
        {sending ? "Sending..." : "Send message"}
      </button>
      {error && (
        <p className="text-[12.5px] text-burgundy-700">
          Something went wrong — please try again, or use KakaoTalk above.
        </p>
      )}
    </form>
  );
}
