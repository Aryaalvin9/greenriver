import { useEffect } from "react";
import Router from "next/router";

function visitorId() {
  const key = "greenriver_visitor_id";
  let value = window.localStorage.getItem(key);
  if (!value) {
    value = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    window.localStorage.setItem(key, value);
  }
  return value;
}

export default function VisitorTracker() {
  useEffect(() => {
    const track = (url) => {
      if (url.startsWith("/admin")) return;
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId: visitorId(), pathname: url.split("?")[0] }), keepalive: true }).catch(() => {});
    };
    track(window.location.pathname);
    Router.events.on("routeChangeComplete", track);
    return () => Router.events.off("routeChangeComplete", track);
  }, []);
  return null;
}
