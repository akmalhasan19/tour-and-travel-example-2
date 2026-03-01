import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nusatrip-mvp.local";
  const now = new Date();
  const routes = [
    "/",
    "/tours",
    "/booking",
    "/faq",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/admin",
    "/admin/tours",
    "/admin/bookings",
    "/admin/tours/new",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
