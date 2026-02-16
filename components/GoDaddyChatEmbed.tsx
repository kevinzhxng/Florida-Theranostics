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
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.textContent = GODADDY_CHAT_INLINE_SCRIPT;
    document.head.appendChild(configScript);

    const loaderScript = document.createElement("script");
    loaderScript.type = "text/javascript";
    loaderScript.async = true;
    loaderScript.src = GODADDY_CHAT_LOADER_URL;
    document.body.appendChild(loaderScript);

    return () => {
      configScript.remove();
      loaderScript.remove();
    };
  }, []);

  return null;
}
