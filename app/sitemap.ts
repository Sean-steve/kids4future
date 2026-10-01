import type { MetadataRoute } from "next";

const base = "https://sean-steve.github.io/kids4future";
const routes = [
  "",
  "/about",
  "/programs",
  "/programs/kids4future",
  "/programs/rise-boys",
  "/programs/family-forward",
  "/programs/future-skills",
  "/impact",
  "/stories",
  "/events",
  "/get-help",
  "/volunteer",
  "/partner",
  "/donate",
  "/reports",
  "/safeguarding",
  "/privacy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}/`,
    lastModified: new Date("2026-10-01"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
