"use client";

import { useEffect } from "react";
import {
  GODADDY_CHAT_LOADER_URL,
  GODADDY_CHAT_INLINE_SCRIPT,
} from "@/lib/godaddy-chat-config";

/**
 * Renders GoDaddy Conversations (Reamaze) chat widget.
 * Inline config runs first on window so the loader can see it, then the loader script loads.
 */
export default function GoDaddyChatEmbed() {
  useEffect(() => {
    // Run the inline config in global scope so Reamaze loader can read window._support
    try {
      const runInGlobal = (0, eval);
      runInGlobal(GODADDY_CHAT_INLINE_SCRIPT);
    } catch (e) {
      console.warn("GoDaddy chat config error:", e);
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = GODADDY_CHAT_LOADER_URL;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null;
}
