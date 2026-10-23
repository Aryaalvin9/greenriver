import { useEffect } from "react";
import Router from "next/router";

const selector = [
  ".hero-grid > *",
  ".trust-item",
  ".brand-band > *",
  ".section-heading > *",
  ".capability-card",
  ".story-panel > *",
  ".process-grid article",
  ".modern-cta",
  ".product-card",
  ".contact-copy",
  ".contact-card",
  ".admin-stat",
  ".admin-panel",
  ".admin-table-wrap",
  ".inquiry-modal",
].join(",");

export default function MotionController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return undefined;

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });

    const register = (root = document) => {
      root.querySelectorAll?.(selector).forEach((element, index) => {
        if (element.dataset.motionBound) return;
        element.dataset.motionBound = "true";
        element.classList.add("reveal-item");
        element.style.setProperty("--reveal-delay", `${(index % 6) * 65}ms`);
        observer.observe(element);
      });
    };

    register();
    const mutationObserver = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.matches?.(selector)) register(node.parentElement || document);
        else register(node);
      }
    })));
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    const onRoute = () => window.requestAnimationFrame(() => register());
    Router.events.on("routeChangeComplete", onRoute);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      Router.events.off("routeChangeComplete", onRoute);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return null;
}
