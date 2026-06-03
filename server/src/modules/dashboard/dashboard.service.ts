// @ts-nocheck
import fs from "fs";
import path from "path";
import Enquiry from "../../models/enquiry";
import Retreat from "../../models/yatra";
import Video from "../../models/testimonial";
import Teertha from "../../models/teerthas";
import Blog from "../../models/blog";
import Gallery from "../../models/gallery";

/* ======================================================
   GET DASHBOARD STATS SERVICE
====================================================== */
export const getDashboardStatsService = async () => {
  const [totalEnquiries, totalRetreats, totalVideos, totalTeerthas, totalBlogs, totalGallery] = await Promise.all(
    [
      Enquiry.countDocuments(),
      Retreat.countDocuments(),
      Video.countDocuments(),
      Teertha.countDocuments(),
      Blog.countDocuments(),
      Gallery.countDocuments(),
    ],
  );

  return {
    totalEnquiries,
    totalRetreats,
    totalVideos,
    totalTeerthas,
    totalBlogs,
    totalGallery,
  };
};

/* ======================================================
   MIGRATE INITIAL DATA SERVICE
====================================================== */
export const migrateInitialDataService = async () => {
  const seedDataPath = path.join(__dirname, "../../utils/seedData.json");

  if (!fs.existsSync(seedDataPath)) {
    throw new Error("Seed data file not found. Please build it first.");
  }

  const rawData = fs.readFileSync(seedDataPath, "utf-8");
  const { yatras, teerthas, videos, gallery } = JSON.parse(rawData);

  const defaultBlogs = [
    {
      title: "Samyam: Travel Beyond, Discover Within",
      quote: "Let's not just visit the sacred. Let's transform the way we experience the soul.",
      content:
        "Samyam was born out of a vision to restore the authenticity of spiritual pilgrimage. Traditionally, a yatra was not a leisure trip but a sadhana, a path of self-purification. By integrating Hatha Yoga, Devta Upasana, and scholarly scriptural guidance, we prepare seekers physically and mentally to connect with the divine. Our mission is to move tourism from sightseeing to soul-stirring transformation.",
      authorName: "Nileema Shenoy",
      authorTitle: "Founder & CEO",
      authorImage: "/images/founder.jpg",
      isPublished: true,
    },
  ];

  // Clear existing collections to avoid duplicate slug violations
  await Promise.all([
    Retreat.deleteMany({}),
    Teertha.deleteMany({}),
    Video.deleteMany({}),
    Blog.deleteMany({}),
    Gallery.deleteMany({}),
  ]);

  // Insert seed data
  const [createdYatras, createdTeerthas, createdVideos, createdBlogs, createdGallery] = await Promise.all([
    Retreat.insertMany(yatras),
    Teertha.insertMany(teerthas),
    Video.insertMany(videos),
    Blog.insertMany(defaultBlogs),
    Gallery.insertMany(gallery || []),
  ]);

  return {
    yatrasCount: createdYatras.length,
    teerthasCount: createdTeerthas.length,
    videosCount: createdVideos.length,
    blogsCount: createdBlogs.length,
    galleryCount: createdGallery.length,
  };
};
