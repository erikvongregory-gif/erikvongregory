/** Öffnet den ContactFunnel wie ein Klick auf `a[href="#contact"][data-paket]`. */
export function scrollToContactPaket(paketName: string) {
  if (typeof window === "undefined") return;
  const a = document.createElement("a");
  a.href = "#contact";
  a.setAttribute("data-paket", paketName);
  a.style.cssText = "position:fixed;left:-9999px;opacity:0;pointer-events:none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
