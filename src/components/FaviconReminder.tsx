"use client";

import { useEffect } from "react";

const NORMAL_ICON = "/icon.svg?v=20260427";
const REMINDER_ICON = "/icon-reminder.svg?v=20260427";
const REMINDER_TITLE = "EvGlab wartet auf dich";

function setFavicons(href: string) {
  const links = document.querySelectorAll<HTMLLinkElement>("link[rel='icon'], link[rel='shortcut icon']");

  if (links.length === 0) {
    const fallback = document.createElement("link");
    fallback.rel = "icon";
    fallback.type = "image/svg+xml";
    fallback.href = href;
    document.head.appendChild(fallback);
    return;
  }

  links.forEach((link) => {
    link.href = href;
    if (!link.type) link.type = "image/svg+xml";
  });
}

export function FaviconReminder() {
  useEffect(() => {
    let blinkInterval: ReturnType<typeof setInterval> | null = null;
    let showReminder = false;
    const originalTitle = document.title;

    const clearBlink = () => {
      if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
      }
    };

    const startReminder = () => {
      clearBlink();
      document.title = REMINDER_TITLE;
      blinkInterval = setInterval(() => {
        showReminder = !showReminder;
        setFavicons(showReminder ? REMINDER_ICON : NORMAL_ICON);
      }, 900);
    };

    const stopReminder = () => {
      clearBlink();
      document.title = originalTitle;
      setFavicons(NORMAL_ICON);
      showReminder = false;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        startReminder();
        return;
      }
      stopReminder();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", stopReminder);
    window.addEventListener("blur", startReminder);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", stopReminder);
      window.removeEventListener("blur", startReminder);
      stopReminder();
    };
  }, []);

  return null;
}
