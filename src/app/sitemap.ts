import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bit-box.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://bit-box.vercel.app/tools/base",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // 다른 페이지들도 필요하면 추가
  ];
}
