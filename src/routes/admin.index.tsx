import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect, useCallback } from "react";
import { API_ENDPOINTS } from "@/lib/api-config";
import { FlowerField } from "@/components/FlowerField";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  LogOut,
  Mail,
  Phone,
  Calendar,
  Users,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  RefreshCw,
  Eye,
  X,
  Compass,
  MapPin,
  DollarSign,
  LayoutDashboard,
  Film,
  Sparkles,
  Edit,
  Plus,
  PlusCircle,
  Database,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
  head: () => ({
    title: "Admin Dashboard | Samyam Sacred Journeys",
    meta: [
      {
        name: "description",
        content: "Admin console for Samyam Sacred Journeys.",
      },
    ],
  }),
});

interface Enquiry {
  _id: string;
  name: string;
  phoneNumber: string;
  preferredYatra: string;
  message: string;
  status: "New" | "Contacted" | "Resolved";
  email?: string;
  travelers?: string;
  journeyType?: string;
  budget?: string;
  createdAt: string;
}

interface Stats {
  totalEnquiries: number;
  totalRetreats: number;
  totalVideos: number;
  totalTeerthas: number;
  totalBlogs?: number;
}

interface Yatra {
  _id?: string;
  slug: string;
  name: string;
  date: string;
  duration: string;
  desc: string;
  img: string;
  triplePrice?: string;
  doublePrice?: string;
  slogan?: string;
  staysHeading?: string;
  staysDesc?: string;
  itinerary?: { day: number; points: string[] }[];
  darshans?: { title: string; items: string[] }[];
  inclusions?: string[];
  isPublished?: boolean;
}

interface Teertha {
  _id?: string;
  slug: string;
  name: string;
  tagline?: string;
  region: string;
  duration: string;
  date?: string;
  desc: string;
  img: string;
  triplePrice?: string;
  doublePrice?: string;
  slogan?: string;
  staysHeading?: string;
  staysDesc?: string;
  itinerary?: { day: number; points: string[] }[];
  darshans?: { title: string; items: string[] }[];
  inclusions?: string[];
  highlights?: string[];
  significance?: string;
  isPublished?: boolean;
}

interface Video {
  _id?: string;
  category:
    | "Kashi Knowledge Portal"
    | "Kashi Knowledge Portal • Quick Bits"
    | "Testimonials (Coming Soon)";
  youtubeLink: string;
}

interface Blog {
  _id?: string;
  title: string;
  quote?: string;
  content: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  isPublished?: boolean;
}

const initialYatraState: Yatra = {
  slug: "",
  name: "",
  date: "",
  duration: "",
  desc: "",
  img: "",
  triplePrice: "",
  doublePrice: "",
  slogan: "",
  staysHeading: "",
  staysDesc: "",
  itinerary: [{ day: 1, points: [] }],
  darshans: [{ title: "", items: [] }],
  inclusions: [],
  isPublished: true,
};

const initialTeerthaState: Teertha = {
  slug: "",
  name: "",
  tagline: "",
  region: "North",
  duration: "",
  date: "Multiple Departures Available",
  desc: "",
  img: "",
  triplePrice: "",
  doublePrice: "",
  slogan: "",
  staysHeading: "",
  staysDesc: "",
  itinerary: [{ day: 1, points: [] }],
  darshans: [{ title: "", items: [] }],
  inclusions: [],
  highlights: [],
  significance: "",
  isPublished: true,
};

const initialVideoState: Video = {
  category: "Kashi Knowledge Portal",
  youtubeLink: "",
};

const initialBlogState: Blog = {
  title: "",
  quote: "",
  content: "",
  authorName: "Nileema Shenoy",
  authorTitle: "Founder & CEO",
  authorImage: "/images/founder.jpg",
  isPublished: true,
};

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "enquiries" | "yatras" | "teerthas" | "videos" | "blogs"
  >("dashboard");

  // Data lists
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [yatras, setYatras] = useState<Yatra[]>([]);
  const [teerthas, setTeerthas] = useState<Teertha[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "New" | "Contacted" | "Resolved">("All");

  // Card Expansion states
  const [expandedYatras, setExpandedYatras] = useState<Record<string, boolean>>({});
  const [expandedTeerthas, setExpandedTeerthas] = useState<Record<string, boolean>>({});

  const toggleYatraExpand = (id: string) => {
    setExpandedYatras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTeerthaExpand = (id: string) => {
    setExpandedTeerthas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Modals & Forms states
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    type: "enquiry" | "yatra" | "teertha" | "video" | "blog";
  } | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [formType, setFormType] = useState<"yatra" | "teertha" | "video" | "blog">("yatra");

  const [yatraForm, setYatraForm] = useState<Yatra>(initialYatraState);
  const [teerthaForm, setTeerthaForm] = useState<Teertha>(initialTeerthaState);
  const [videoForm, setVideoForm] = useState<Video>(initialVideoState);
  const [blogForm, setBlogForm] = useState<Blog>(initialBlogState);

  // Authentication check
  useEffect(() => {
    const storedToken = localStorage.getItem("samyam_token");
    const storedEmail = localStorage.getItem("samyam_email") || "admin@samyam.co";
    if (!storedToken) {
      navigate({ to: "/admin/login" });
    } else {
      setToken(storedToken);
      setAdminEmail(storedEmail);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("samyam_token");
    localStorage.removeItem("samyam_email");
    navigate({ to: "/admin/login" });
  }, [navigate]);

  const fetchData = useCallback(
    async (authToken: string) => {
      setLoading(true);
      setError("");
      try {
        // 1. Fetch Stats
        const statsRes = await fetch(API_ENDPOINTS.DASHBOARD.STATS, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (statsRes.status === 401) {
          handleLogout();
          return;
        }
        const statsResult = await statsRes.json();
        if (statsRes.ok) setStats(statsResult.data);

        // 2. Fetch Enquiries
        const enquiriesRes = await fetch(API_ENDPOINTS.ENQUIRIES, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const enquiriesResult = await enquiriesRes.json();
        if (enquiriesRes.ok) setEnquiries(enquiriesResult.data || []);

        // 3. Fetch Yatras
        const yatrasRes = await fetch(API_ENDPOINTS.YATRAS);
        const yatrasResult = await yatrasRes.json();
        if (yatrasRes.ok) setYatras(yatrasResult.data || []);

        // 4. Fetch Teerthas
        const teerthasRes = await fetch(API_ENDPOINTS.TEERTHAS);
        const teerthasResult = await teerthasRes.json();
        if (teerthasRes.ok) setTeerthas(teerthasResult.data || []);

        // 5. Fetch Videos
        const videosRes = await fetch(API_ENDPOINTS.TESTIMONIALS);
        const videosResult = await videosRes.json();
        if (videosRes.ok) setVideos(videosResult.data || []);

        // 6. Fetch Blogs
        const blogsRes = await fetch(API_ENDPOINTS.BLOGS);
        const blogsResult = await blogsRes.json();
        if (blogsRes.ok) setBlogs(blogsResult.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    },
    [handleLogout],
  );

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token, fetchData]);

  // Seeder call
  const handleMigrateData = async () => {
    if (!token) return;
    setMigrating(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(API_ENDPOINTS.DASHBOARD.MIGRATE, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Migration failed");

      setSuccessMsg("Success! Seeder executed. All database tables refreshed.");
      await fetchData(token);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setError(err.message || "Data seeding encountered an issue.");
    } finally {
      setMigrating(false);
    }
  };

  // Enquiry status change
  const handleUpdateEnquiryStatus = async (id: string, newStatus: Enquiry["status"]) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_ENDPOINTS.ENQUIRIES}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");

      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item)),
      );
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete Action Dispatcher
  const handleDeleteItem = async () => {
    if (!token || !deleteConfirm) return;
    const { id, type } = deleteConfirm;

    let url = "";
    if (type === "enquiry") url = `${API_ENDPOINTS.ENQUIRIES}/${id}`;
    if (type === "yatra") url = `${API_ENDPOINTS.YATRAS}/${id}`;
    if (type === "teertha") url = `${API_ENDPOINTS.TEERTHAS}/${id}`;
    if (type === "video") url = `${API_ENDPOINTS.TESTIMONIALS}/${id}`;
    if (type === "blog") url = `${API_ENDPOINTS.BLOGS}/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete record");

      // Update states
      if (type === "enquiry") setEnquiries((prev) => prev.filter((item) => item._id !== id));
      if (type === "yatra") setYatras((prev) => prev.filter((item) => item._id !== id));
      if (type === "teertha") setTeerthas((prev) => prev.filter((item) => item._id !== id));
      if (type === "video") setVideos((prev) => prev.filter((item) => item._id !== id));
      if (type === "blog") setBlogs((prev) => prev.filter((item) => item._id !== id));

      // Update statistics
      if (token) {
        const statsRes = await fetch(API_ENDPOINTS.DASHBOARD.STATS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsResult = await statsRes.json();
        if (statsRes.ok) setStats(statsResult.data);
      }

      setDeleteConfirm(null);
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Yatra Form Submit
  const handleYatraSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const isEdit = formMode === "edit";
      const url = isEdit ? `${API_ENDPOINTS.YATRAS}/${yatraForm._id}` : API_ENDPOINTS.YATRAS;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(yatraForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save Yatra");

      await fetchData(token);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Teertha Form Submit
  const handleTeerthaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const isEdit = formMode === "edit";
      const url = isEdit ? `${API_ENDPOINTS.TEERTHAS}/${teerthaForm._id}` : API_ENDPOINTS.TEERTHAS;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teerthaForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save Teertha");

      await fetchData(token);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Video Form Submit
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const isEdit = formMode === "edit";
      const url = isEdit
        ? `${API_ENDPOINTS.TESTIMONIALS}/${videoForm._id}`
        : API_ENDPOINTS.TESTIMONIALS;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(videoForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save Video");

      await fetchData(token);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open forms helper
  const openAddYatra = () => {
    setYatraForm(initialYatraState);
    setFormMode("add");
    setFormType("yatra");
    setIsFormOpen(true);
  };

  const openEditYatra = (item: Yatra) => {
    setYatraForm(item);
    setFormMode("edit");
    setFormType("yatra");
    setIsFormOpen(true);
  };

  const openAddTeertha = () => {
    setTeerthaForm(initialTeerthaState);
    setFormMode("add");
    setFormType("teertha");
    setIsFormOpen(true);
  };

  const openEditTeertha = (item: Teertha) => {
    setTeerthaForm(item);
    setFormMode("edit");
    setFormType("teertha");
    setIsFormOpen(true);
  };

  const openAddVideo = () => {
    setVideoForm(initialVideoState);
    setFormMode("add");
    setFormType("video");
    setIsFormOpen(true);
  };

  const openEditVideo = (item: Video) => {
    setVideoForm(item);
    setFormMode("edit");
    setFormType("video");
    setIsFormOpen(true);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const isEdit = formMode === "edit";
      const url = isEdit ? `${API_ENDPOINTS.BLOGS}/${blogForm._id}` : API_ENDPOINTS.BLOGS;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save Blog");

      await fetchData(token);
      setIsFormOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddBlog = () => {
    setBlogForm(initialBlogState);
    setFormMode("add");
    setFormType("blog");
    setIsFormOpen(true);
  };

  const openEditBlog = (item: Blog) => {
    setBlogForm(item);
    setFormMode("edit");
    setFormType("blog");
    setIsFormOpen(true);
  };

  // Filters logic
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.email && e.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      e.phoneNumber.includes(searchTerm) ||
      e.preferredYatra.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newCount = enquiries.filter((e) => e.status === "New").length;
  const contactedCount = enquiries.filter((e) => e.status === "Contacted").length;
  const resolvedCount = enquiries.filter((e) => e.status === "Resolved").length;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d040f] text-white flex flex-col justify-between">
      <section
        data-nav-theme="dark"
        className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-[#0d040f] via-[#140817] to-[#0a020b] overflow-hidden min-h-[92vh] flex-grow flex"
      >
        <FlowerField count={5} />

        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto w-full relative z-10 flex flex-col md:flex-row gap-8 mt-4">
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-80 shrink-0 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-soft space-y-4">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display font-semibold text-lg text-white">Admin Dashboard</h2>
                <p className="text-[10px] text-amber-400 font-body truncate mt-0.5">{adminEmail}</p>
              </div>

              <nav className="flex flex-col gap-1.5 font-body">
                {[
                  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                  { id: "enquiries", label: "Enquiries", icon: Mail },
                  { id: "yatras", label: "Yatra and Retreats", icon: Compass },
                  { id: "teerthas", label: "Teerthas", icon: MapPin },
                  { id: "videos", label: "Knowledge Videos", icon: Film },
                  { id: "blogs", label: "CEO Blogs & Quotes", icon: FileText },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSearchTerm("");
                      }}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                        activeTab === item.id
                          ? "bg-gradient-cta text-white shadow-glow border border-amber-500/20"
                          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/10 border border-red-500/25 hover:bg-red-500 hover:text-white transition rounded-2xl text-xs font-semibold uppercase tracking-wider font-body flex items-center justify-center gap-2 cursor-pointer text-red-400"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT PANEL */}
          <main className="flex-1 min-w-0 bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 shadow-soft">
            {error && (
              <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-200 text-xs rounded-2xl text-center font-body flex items-center justify-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            {successMsg && (
              <div className="p-4 mb-6 bg-green-500/10 border border-green-500/20 text-green-200 text-xs rounded-2xl text-center font-body flex items-center justify-center gap-2 animate-pulse">
                <CheckCircle2 size={14} /> {successMsg}
              </div>
            )}

            {/* TAB CONTENT: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-display font-semibold">
                      Welcome to Admin Dashboard
                    </h1>
                    <p className="text-xs text-white/50 font-body mt-0.5">
                      Samyam Spiritual Tourism Console
                    </p>
                  </div>
                  <button
                    onClick={handleMigrateData}
                    disabled={migrating}
                    className="px-5 py-3 bg-gradient-cta text-white shadow-glow hover:scale-[1.03] transition rounded-2xl text-xs font-bold uppercase tracking-wider font-body flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    <Database size={14} className={migrating ? "animate-spin" : ""} />
                    {migrating ? "Migrating Data..." : "Migrate Initial Data"}
                  </button>
                </div>

                {/* Statistics Overview */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 font-body">
                    Statistics Overview
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      {
                        label: "Total Enquiries",
                        val: stats?.totalEnquiries ?? enquiries.length,
                        color: "text-amber-400",
                      },
                      {
                        label: "Yatra and Retreats",
                        val: stats?.totalRetreats ?? yatras.length,
                        color: "text-sky-400",
                      },
                      {
                        label: "Knowledge Videos",
                        val: stats?.totalVideos ?? videos.length,
                        color: "text-purple-400",
                      },
                      {
                        label: "Teerthas",
                        val: stats?.totalTeerthas ?? teerthas.length,
                        color: "text-emerald-400",
                      },
                      {
                        label: "CEO Blogs & Quotes",
                        val: stats?.totalBlogs ?? blogs.length,
                        color: "text-rose-400",
                      },
                    ].map((st, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-soft"
                      >
                        <p className={`text-3xl font-display font-bold mt-1 ${st.color}`}>
                          {st.val}
                        </p>
                        <p className="text-[10px] text-white/45 font-body uppercase tracking-wider mt-1">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 font-body">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-amber-500/20 transition-all flex flex-col justify-between group">
                      <div className="space-y-2 text-left">
                        <h4 className="text-base font-semibold font-display text-white">
                          ✉ Enquiry Management
                        </h4>
                        <p className="text-xs text-white/55 font-body leading-relaxed">
                          View and manage contact form submissions
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("enquiries")}
                        className="mt-6 text-[10px] uppercase font-bold tracking-wider text-amber-400 text-left cursor-pointer group-hover:translate-x-1.5 transition-transform"
                      >
                        View Enquiries →
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-amber-500/20 transition-all flex flex-col justify-between group">
                      <div className="space-y-2 text-left">
                        <h4 className="text-base font-semibold font-display text-white">
                          🕉 Teerthas Management
                        </h4>
                        <p className="text-xs text-white/55 font-body leading-relaxed">
                          Add, edit, and manage sacred destinations
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("teerthas")}
                        className="mt-6 text-[10px] uppercase font-bold tracking-wider text-amber-400 text-left cursor-pointer group-hover:translate-x-1.5 transition-transform"
                      >
                        Manage Teerthas →
                      </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-amber-500/20 transition-all flex flex-col justify-between group">
                      <div className="space-y-2 text-left">
                        <h4 className="text-base font-semibold font-display text-white">
                          📚 Knowledge Videos
                        </h4>
                        <p className="text-xs text-white/55 font-body leading-relaxed">
                          Manage videos in the Knowledge Portal
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("videos")}
                        className="mt-6 text-[10px] uppercase font-bold tracking-wider text-amber-400 text-left cursor-pointer group-hover:translate-x-1.5 transition-transform"
                      >
                        Manage Videos →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ENQUIRIES */}
            {activeTab === "enquiries" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <h1 className="text-2xl font-display font-semibold">Enquiry Management</h1>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-64 font-body">
                    <Search className="absolute left-4 top-3 text-white/30" size={14} />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-xs transition-all"
                    />
                  </div>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-2xl font-body max-w-fit">
                  {(["All", "New", "Contacted", "Resolved"] as const).map((status) => {
                    const count =
                      status === "All"
                        ? enquiries.length
                        : enquiries.filter((e) => e.status === status).length;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                          statusFilter === status
                            ? "bg-gradient-cta text-white shadow border border-amber-500/10"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {status} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* List */}
                {filteredEnquiries.length === 0 ? (
                  <div className="py-20 text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-3xl">
                    <p className="text-white/40 text-xs font-body">
                      No pilgrim requests match your current filters.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEnquiries.map((enquiry) => (
                      <div
                        key={enquiry._id}
                        className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-4 text-left font-body text-xs relative hover:border-white/10 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h4 className="text-base font-semibold font-display text-white">
                                {enquiry.name}
                              </h4>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  enquiry.preferredYatra.includes("Custom")
                                    ? "bg-purple-500/10 border border-purple-500/20 text-purple-300"
                                    : "bg-amber-400/10 border border-amber-400/20 text-amber-300"
                                }`}
                              >
                                {enquiry.preferredYatra}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/50 text-[11px]">
                              <span>📞 {enquiry.phoneNumber}</span>
                              {enquiry.email && <span>✉ {enquiry.email}</span>}
                              <span>🕒 {new Date(enquiry.createdAt).toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enquiry.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(
                                  enquiry._id,
                                  e.target.value as Enquiry["status"],
                                )
                              }
                              className={`px-3 py-1.5 rounded-2xl text-[10px] font-semibold focus:outline-none border cursor-pointer ${
                                enquiry.status === "New"
                                  ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                                  : enquiry.status === "Contacted"
                                    ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              } [&>option]:bg-[#140817] [&>option]:text-white`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            <button
                              onClick={() => setDeleteConfirm({ id: enquiry._id, type: "enquiry" })}
                              className="px-3 py-1.5 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white transition text-red-400 cursor-pointer"
                              title="Delete Record"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Custom details */}
                        {enquiry.preferredYatra.includes("Custom") && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">
                                Destination
                              </p>
                              <p className="font-semibold text-white">
                                {enquiry.journeyType || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">
                                Dates
                              </p>
                              <p className="font-semibold text-white">
                                {enquiry.message.slice(0, 20) || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">
                                Travelers
                              </p>
                              <p className="font-semibold text-white">
                                {enquiry.travelers || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">
                                Budget
                              </p>
                              <p className="font-semibold text-white">{enquiry.budget || "N/A"}</p>
                            </div>
                          </div>
                        )}

                        <div className="space-y-1">
                          <p className="text-white/40 text-[9px] uppercase tracking-wider">
                            Seeker message / intent
                          </p>
                          <p className="text-white/85 leading-relaxed bg-white/[0.01] p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                            {enquiry.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: YATRA RETREATS */}
            {activeTab === "yatras" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <h1 className="text-2xl font-display font-semibold">
                      Yatra and Retreats Management
                    </h1>
                    <p className="text-xs text-white/50 font-body">
                      Add, update, or remove dynamic spiritual travel itineraries
                    </p>
                  </div>
                  <button
                    onClick={openAddYatra}
                    className="px-5 py-3 bg-gradient-cta text-white shadow-glow hover:scale-[1.03] transition rounded-2xl text-xs font-bold uppercase tracking-wider font-body flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} /> Add New Yatra/Retreat
                  </button>
                </div>

                {/* Grid list */}
                {yatras.length === 0 ? (
                  <div className="py-20 text-center bg-white/[0.01] border border-white/5 rounded-3xl">
                    <p className="text-white/40 text-xs font-body">
                      No Yatra records found. Seed initial data or add new.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {yatras.map((y) => (
                      <div
                        key={y._id}
                        className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-soft flex flex-col justify-between hover:border-white/10 transition duration-300"
                      >
                        <div>
                          {/* Image */}
                          <div className="aspect-video bg-black/40 relative overflow-hidden">
                            <img
                              src={y.img.startsWith("/") ? y.img : `/images/${y.img}`}
                              alt={y.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // fallback if image fails to load
                                (e.target as HTMLImageElement).src =
                                  "https://samyam.co/images/knowledge.jpeg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-lg font-semibold font-display text-white leading-tight">
                                {y.name}
                              </h3>
                              <p className="text-[10px] text-amber-300 font-semibold font-body uppercase mt-0.5">
                                {y.date} • {y.duration}
                              </p>
                            </div>
                          </div>

                          <div className="p-5 space-y-4 font-body text-xs">
                            <p className="text-white/60 leading-relaxed line-clamp-3">{y.desc}</p>

                            {/* Badges counts */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/70">
                                📅 {y.itinerary?.length || 0} Days Itinerary
                              </span>
                              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/70">
                                🕉 {y.darshans?.length || 0} Darshan Categories
                              </span>
                              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/70">
                                ✓ {y.inclusions?.length || 0} Inclusions
                              </span>
                            </div>

                            {/* Expandable Details Panel */}
                            <div className="border-t border-white/5 mt-2 pt-2">
                              <button
                                onClick={() => toggleYatraExpand(y._id!)}
                                className="w-full py-2 text-center text-[10px] uppercase font-bold text-amber-400 hover:text-amber-300 transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                {expandedYatras[y._id!] ? "Hide Details ▴" : "Show Full Details ▾"}
                              </button>

                              {expandedYatras[y._id!] && (
                                <div className="space-y-4 px-1 pb-3 text-white/80 animate-fade-in mt-3 text-left">
                                  {y.slogan && (
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-wider block">
                                        Slogan
                                      </span>
                                      <p className="text-[10px] font-semibold italic text-amber-100">
                                        {y.slogan}
                                      </p>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">
                                        Double Price
                                      </span>
                                      <p className="text-[10px] text-white font-medium">
                                        {y.doublePrice || "N/A"}
                                      </p>
                                    </div>
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">
                                        Triple Price
                                      </span>
                                      <p className="text-[10px] text-white font-medium">
                                        {y.triplePrice || "N/A"}
                                      </p>
                                    </div>
                                  </div>

                                  {y.staysHeading && (
                                    <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                                      <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-wider block">
                                        Stays Info
                                      </span>
                                      <p className="text-[10px] text-white font-semibold">
                                        {y.staysHeading}
                                      </p>
                                      <p className="text-[10px] text-white/60 leading-normal">
                                        {y.staysDesc}
                                      </p>
                                    </div>
                                  )}

                                  {y.inclusions && y.inclusions.length > 0 && (
                                    <div className="space-y-1">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold mb-1">
                                        Inclusions
                                      </span>
                                      <ul className="list-disc list-inside text-[10px] text-white/70 space-y-1 leading-normal pl-1">
                                        {y.inclusions.map((inc, i) => (
                                          <li key={i}>{inc}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {y.itinerary && y.itinerary.length > 0 && (
                                    <div className="space-y-2 border-t border-white/5 pt-2">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold">
                                        Day-wise Itinerary
                                      </span>
                                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {y.itinerary.map((day) => (
                                          <div
                                            key={day.day}
                                            className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl"
                                          >
                                            <span className="text-[10px] font-bold text-amber-400 block">
                                              Day {day.day}
                                            </span>
                                            <ul className="list-disc list-inside text-[10px] text-white/75 mt-1 space-y-1 leading-normal pl-1">
                                              {day.points.map((pt, pIdx) => (
                                                <li key={pIdx}>{pt}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {y.darshans && y.darshans.length > 0 && (
                                    <div className="space-y-2 border-t border-white/5 pt-2">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold">
                                        Sacred Darshans
                                      </span>
                                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                        {y.darshans.map((d, dIdx) => (
                                          <div
                                            key={dIdx}
                                            className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl"
                                          >
                                            <span className="text-[10px] font-bold text-white block">
                                              {d.title}
                                            </span>
                                            <ul className="list-disc list-inside text-[10px] text-white/75 mt-1 space-y-1 leading-normal pl-1">
                                              {d.items.map((item, itemIdx) => (
                                                <li key={itemIdx}>{item}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="px-5 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditYatra(y)}
                            className="px-4 py-2 bg-gradient-cta text-white font-bold rounded-2xl text-[10px] uppercase tracking-wider hover:scale-105 transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: y._id!, type: "yatra" })}
                            className="px-4 py-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white transition text-red-400 font-bold rounded-2xl text-[10px] uppercase tracking-wider cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: TEERTHAS */}
            {activeTab === "teerthas" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <h1 className="text-2xl font-display font-semibold">Teerthas Management</h1>
                    <p className="text-xs text-white/50 font-body">
                      Add, edit, and manage sacred destinations
                    </p>
                  </div>
                  <button
                    onClick={openAddTeertha}
                    className="px-5 py-3 bg-gradient-cta text-white shadow-glow hover:scale-[1.03] transition rounded-2xl text-xs font-bold uppercase tracking-wider font-body flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} /> Add Teertha
                  </button>
                </div>

                {/* Grid list */}
                {teerthas.length === 0 ? (
                  <div className="py-20 text-center bg-white/[0.01] border border-white/5 rounded-3xl">
                    <p className="text-white/40 text-xs font-body">
                      No Teertha records found. Seed initial data or add new.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {teerthas.map((t) => (
                      <div
                        key={t._id}
                        className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-soft flex flex-col justify-between hover:border-white/10 transition duration-300"
                      >
                        <div>
                          {/* Image */}
                          <div className="aspect-[4/3] bg-black/40 relative overflow-hidden">
                            <img
                              src={
                                t.img.startsWith("http")
                                  ? t.img
                                  : t.img.startsWith("/")
                                    ? t.img
                                    : `/images/${t.img}`
                              }
                              alt={t.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://samyam.co/images/knowledge.jpeg";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-base font-semibold font-display text-white leading-tight">
                                {t.name}
                              </h3>
                              <p className="text-[9px] text-white/45 font-semibold font-body uppercase mt-0.5">
                                {t.region} • {t.significance || t.tagline} • {t.duration}
                              </p>
                            </div>
                          </div>

                          <div className="p-4 font-body text-xs space-y-3">
                            <p className="text-white/60 leading-relaxed line-clamp-3">{t.desc}</p>

                            {/* Badges counts */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                                📅 {t.itinerary?.length || 0} Days Itinerary
                              </span>
                              {t.darshans && t.darshans.length > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                                  🕉 {t.darshans.length} Darshans
                                </span>
                              )}
                              {t.highlights && t.highlights.length > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                                  ✨ {t.highlights.length} Highlights
                                </span>
                              )}
                              {t.inclusions && t.inclusions.length > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-white/60">
                                  ✓ {t.inclusions.length} Inclusions
                                </span>
                              )}
                            </div>

                            {/* Expandable Details Panel */}
                            <div className="border-t border-white/5 mt-2 pt-2">
                              <button
                                onClick={() => toggleTeerthaExpand(t._id!)}
                                className="w-full py-2 text-center text-[10px] uppercase font-bold text-amber-400 hover:text-amber-300 transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                {expandedTeerthas[t._id!]
                                  ? "Hide Details ▴"
                                  : "Show Full Details ▾"}
                              </button>

                              {expandedTeerthas[t._id!] && (
                                <div className="space-y-4 px-1 pb-3 text-white/80 animate-fade-in mt-3 text-left">
                                  {t.tagline && (
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-wider block">
                                        Tagline
                                      </span>
                                      <p className="text-[10px] font-semibold text-amber-100">
                                        {t.tagline}
                                      </p>
                                    </div>
                                  )}

                                  {t.slogan && (
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-wider block font-semibold mb-0.5">
                                        Slogan Banner
                                      </span>
                                      <p className="text-[10px] font-semibold italic text-amber-100">
                                        {t.slogan}
                                      </p>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">
                                        Double Price
                                      </span>
                                      <p className="text-[10px] text-white font-medium">
                                        {t.doublePrice || "N/A"}
                                      </p>
                                    </div>
                                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block">
                                        Triple Price
                                      </span>
                                      <p className="text-[10px] text-white font-medium">
                                        {t.triplePrice || "N/A"}
                                      </p>
                                    </div>
                                  </div>

                                  {t.staysHeading && (
                                    <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                                      <span className="text-[9px] text-amber-400/80 font-bold uppercase tracking-wider block font-semibold mb-0.5">
                                        Stays Info
                                      </span>
                                      <p className="text-[10px] text-white font-semibold">
                                        {t.staysHeading}
                                      </p>
                                      <p className="text-[10px] text-white/60 leading-normal">
                                        {t.staysDesc}
                                      </p>
                                    </div>
                                  )}

                                  {t.highlights && t.highlights.length > 0 && (
                                    <div className="space-y-1">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold mb-1">
                                        Highlights
                                      </span>
                                      <ul className="list-disc list-inside text-[10px] text-white/70 space-y-1 leading-normal pl-1">
                                        {t.highlights.map((hl, i) => (
                                          <li key={i}>{hl}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {t.inclusions && t.inclusions.length > 0 && (
                                    <div className="space-y-1">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold mb-1">
                                        Inclusions
                                      </span>
                                      <ul className="list-disc list-inside text-[10px] text-white/70 space-y-1 leading-normal pl-1">
                                        {t.inclusions.map((inc, i) => (
                                          <li key={i}>{inc}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {t.itinerary && t.itinerary.length > 0 && (
                                    <div className="space-y-2 border-t border-white/5 pt-2">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold">
                                        Day-wise Itinerary
                                      </span>
                                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {t.itinerary.map((day) => (
                                          <div
                                            key={day.day}
                                            className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl"
                                          >
                                            <span className="text-[10px] font-bold text-amber-400 block">
                                              Day {day.day}
                                            </span>
                                            <ul className="list-disc list-inside text-[10px] text-white/75 mt-1 space-y-1 leading-normal pl-1">
                                              {day.points.map((pt, pIdx) => (
                                                <li key={pIdx}>{pt}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {t.darshans && t.darshans.length > 0 && (
                                    <div className="space-y-2 border-t border-white/5 pt-2">
                                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider block font-semibold">
                                        Sacred Darshans
                                      </span>
                                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                        {t.darshans.map((d, dIdx) => (
                                          <div
                                            key={dIdx}
                                            className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl"
                                          >
                                            <span className="text-[10px] font-bold text-white block">
                                              {d.title}
                                            </span>
                                            <ul className="list-disc list-inside text-[10px] text-white/75 mt-1 space-y-1 leading-normal pl-1">
                                              {d.items.map((item, itemIdx) => (
                                                <li key={itemIdx}>{item}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditTeertha(t)}
                            className="px-3.5 py-1.5 bg-gradient-cta text-white font-bold rounded-xl text-[9px] uppercase tracking-wider hover:scale-105 transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: t._id!, type: "teertha" })}
                            className="px-3.5 py-1.5 border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white transition text-red-400 font-bold rounded-xl text-[9px] uppercase tracking-wider cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: KNOWLEDGE VIDEOS */}
            {activeTab === "videos" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <h1 className="text-2xl font-display font-semibold">Knowledge Videos</h1>
                    <p className="text-xs text-white/50 font-body">
                      Manage videos and seeker testimonials in the Knowledge Portal
                    </p>
                  </div>
                  <button
                    onClick={openAddVideo}
                    className="px-5 py-3 bg-gradient-cta text-white shadow-glow hover:scale-[1.03] transition rounded-2xl text-xs font-bold uppercase tracking-wider font-body flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} /> Add Video
                  </button>
                </div>

                {/* List grouped by category */}
                {videos.length === 0 ? (
                  <div className="py-20 text-center bg-white/[0.01] border border-white/5 rounded-3xl">
                    <p className="text-white/40 text-xs font-body">
                      No Video records found. Seed initial data or add new.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8 text-left font-body">
                    {[
                      "Kashi Knowledge Portal",
                      "Kashi Knowledge Portal • Quick Bits",
                      "Testimonials (Coming Soon)",
                    ].map((cat) => {
                      const catVideos = videos.filter((v) => v.category === cat);
                      if (catVideos.length === 0) return null;
                      return (
                        <div key={cat} className="space-y-4">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 border-b border-white/5 pb-2">
                            {cat}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {catVideos.map((video) => (
                              <div
                                key={video._id}
                                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/10 transition duration-300 shadow-soft"
                              >
                                <div>
                                  {/* Iframe embed */}
                                  <div className="aspect-video bg-black/50">
                                    <iframe
                                      src={video.youtubeLink}
                                      title="Video preview"
                                      className="w-full h-full border-0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                  <div className="p-3 text-[10px] text-white/50 break-all truncate">
                                    {video.youtubeLink}
                                  </div>
                                </div>

                                <div className="p-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openEditVideo(video)}
                                    className="p-1.5 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer text-white/80 hover:text-white"
                                    title="Edit"
                                  >
                                    <Edit size={12} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setDeleteConfirm({ id: video._id!, type: "video" })
                                    }
                                    className="p-1.5 bg-red-500/10 border border-red-500/10 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer text-red-400"
                                    title="Delete"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: BLOGS */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <h1 className="text-2xl font-display font-semibold">CEO Blogs & Quotes</h1>
                    <p className="text-xs text-white/50 font-body">
                      Manage philosophical blogs and idea quotes by the CEO/Founder shown on the
                      home page
                    </p>
                  </div>
                  <button
                    onClick={openAddBlog}
                    className="px-5 py-3 bg-gradient-cta text-white shadow-glow hover:scale-[1.03] transition rounded-2xl text-xs font-bold uppercase tracking-wider font-body flex items-center gap-2 cursor-pointer"
                  >
                    <Plus size={14} /> Add Blog Post
                  </button>
                </div>

                {blogs.length === 0 ? (
                  <div className="py-20 text-center bg-white/[0.01] border border-white/5 rounded-3xl">
                    <p className="text-white/40 text-xs font-body">
                      No Blog posts found. Click Add Blog Post or seed data.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 text-left font-body">
                    {blogs.map((b) => (
                      <div
                        key={b._id}
                        className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl flex flex-col justify-between gap-6 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-display font-semibold text-white">
                                {b.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                                  {b.authorName || "Nileema Shenoy"}
                                </span>
                                <span className="text-white/30 text-[10px]">•</span>
                                <span className="text-[9px] text-white/50 uppercase font-semibold">
                                  {b.authorTitle || "Founder & CEO"}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${b.isPublished ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-white/10 text-white/40"}`}
                            >
                              {b.isPublished ? "Published" : "Draft"}
                            </span>
                          </div>

                          {b.quote && (
                            <div className="pl-4 border-l-2 border-amber-500/50 py-0.5 text-xs italic text-amber-200">
                              “{b.quote}”
                            </div>
                          )}

                          <p className="text-xs text-white/70 leading-relaxed whitespace-pre-wrap">
                            {b.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                          <button
                            onClick={() => openEditBlog(b)}
                            className="px-4 py-2 bg-gradient-cta text-white font-bold rounded-2xl text-[10px] uppercase tracking-wider hover:scale-105 transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: b._id!, type: "blog" })}
                            className="px-4 py-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white transition text-red-400 font-bold rounded-2xl text-[10px] uppercase tracking-wider cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* VIEW DETAILS ENQUIRY MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-[#000]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#140817] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative font-body text-xs text-left">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.01]">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-amber-400 font-semibold">
                  Enquiry details
                </p>
                <h3 className="text-xl font-display font-semibold text-white mt-0.5">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 hover:bg-white/5 rounded-full transition text-white/60 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase text-white/40 tracking-wider">Phone number</p>
                  <p className="text-white font-medium mt-0.5">📞 {selectedEnquiry.phoneNumber}</p>
                </div>
                {selectedEnquiry.email && (
                  <div>
                    <p className="text-[9px] uppercase text-white/40 tracking-wider">
                      Email Address
                    </p>
                    <p className="text-white font-medium mt-0.5 truncate">
                      ✉ {selectedEnquiry.email}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                <span className="text-white/50 uppercase tracking-wider">Preferred Yatra</span>
                <span className="text-amber-400 font-semibold">
                  {selectedEnquiry.preferredYatra}
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="text-white/40 uppercase tracking-wider">Message</p>
                <p className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white/90 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#140817] border border-red-500/20 rounded-3xl w-full max-w-sm p-6 space-y-6 shadow-2xl text-center font-body">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto text-lg">
              ⚠️
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-display font-semibold text-white">Delete Item?</h3>
              <p className="text-white/60 text-xs leading-relaxed max-w-xs mx-auto">
                This action is irreversible. It will permanently remove this {deleteConfirm.type}{" "}
                from the database.
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC FORMS MODAL (YATRA, TEERTHA, VIDEO) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#000]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#140817] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative font-body text-xs text-left max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.01] shrink-0">
              <h2 className="text-xl font-display font-semibold text-white">
                {formMode === "add" ? "Create New" : "Edit"}{" "}
                {formType === "yatra"
                  ? "Yatra & Retreat"
                  : formType === "teertha"
                    ? "Teertha"
                    : "Knowledge Video"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-full transition text-white/60 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Scroll Container */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* YATRA FORM */}
              {formType === "yatra" && (
                <form onSubmit={handleYatraSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.name}
                        onChange={(e) => setYatraForm({ ...yatraForm, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Ayodhya - Kashi"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.slug}
                        onChange={(e) =>
                          setYatraForm({
                            ...yatraForm,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. ayodhya-kashi"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.date}
                        onChange={(e) => setYatraForm({ ...yatraForm, date: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. 20 - 25 Oct"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.duration}
                        onChange={(e) => setYatraForm({ ...yatraForm, duration: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. 6 Days"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Image Path/URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={yatraForm.img}
                      onChange={(e) => setYatraForm({ ...yatraForm, img: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. /images/ayodhya_kashi.png or https://example.com/img.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={yatraForm.desc}
                      onChange={(e) => setYatraForm({ ...yatraForm, desc: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 resize-none"
                      placeholder="Enter brief description of the retreat..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Triple Occupancy Price
                      </label>
                      <input
                        type="text"
                        value={yatraForm.triplePrice}
                        onChange={(e) =>
                          setYatraForm({ ...yatraForm, triplePrice: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Rs. 39000 per Head"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Double Occupancy Price
                      </label>
                      <input
                        type="text"
                        value={yatraForm.doublePrice}
                        onChange={(e) =>
                          setYatraForm({ ...yatraForm, doublePrice: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Rs. 42000 per Head"
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Brand Slogan Banner
                    </label>
                    <input
                      type="text"
                      value={yatraForm.slogan}
                      onChange={(e) => setYatraForm({ ...yatraForm, slogan: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. RELAX | REJUVENATE | UNLEARN | RELEARN"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Stays Section Heading
                      </label>
                      <input
                        type="text"
                        value={yatraForm.staysHeading}
                        onChange={(e) =>
                          setYatraForm({ ...yatraForm, staysHeading: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. We Curate Divine Heritage Stays"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Stays Section Description
                      </label>
                      <textarea
                        rows={2}
                        value={yatraForm.staysDesc}
                        onChange={(e) => setYatraForm({ ...yatraForm, staysDesc: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 resize-none"
                        placeholder="Enter description of accommodations..."
                      />
                    </div>
                  </div>

                  {/* Inclusions text area (one per line) */}
                  <div className="border-t border-white/5 pt-4">
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Inclusions (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={yatraForm.inclusions?.join("\n")}
                      onChange={(e) =>
                        setYatraForm({
                          ...yatraForm,
                          inclusions: e.target.value.split("\n").filter(Boolean),
                        })
                      }
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="Premium accommodation...&#10;Yoga sessions..."
                    />
                  </div>

                  {/* Itinerary builder */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400">
                        Day-wise Itinerary
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = yatraForm.itinerary || [];
                          setYatraForm({
                            ...yatraForm,
                            itinerary: [...current, { day: current.length + 1, points: [] }],
                          });
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold cursor-pointer"
                      >
                        + Add Day
                      </button>
                    </div>

                    <div className="space-y-4">
                      {yatraForm.itinerary?.map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl relative space-y-2"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const current = [...(yatraForm.itinerary || [])];
                              current.splice(idx, 1);
                              // Re-sequence day numbers
                              const resequenced = current.map((d, i) => ({ ...d, day: i + 1 }));
                              setYatraForm({ ...yatraForm, itinerary: resequenced });
                            }}
                            className="absolute top-2 right-2 p-1 hover:bg-red-500/10 rounded text-red-400 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <p className="font-semibold text-white">Day {day.day}</p>
                          <textarea
                            rows={3}
                            value={day.points.join("\n")}
                            onChange={(e) => {
                              const current = [...(yatraForm.itinerary || [])];
                              current[idx].points = e.target.value.split("\n").filter(Boolean);
                              setYatraForm({ ...yatraForm, itinerary: current });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Activity point 1 (one per line)...&#10;Activity point 2..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Darshans builder */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400">
                        Sacred Darshans
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = yatraForm.darshans || [];
                          setYatraForm({
                            ...yatraForm,
                            darshans: [...current, { title: "", items: [] }],
                          });
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold cursor-pointer"
                      >
                        + Add Category
                      </button>
                    </div>

                    <div className="space-y-4">
                      {yatraForm.darshans?.map((cat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl relative space-y-2"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const current = [...(yatraForm.darshans || [])];
                              current.splice(idx, 1);
                              setYatraForm({ ...yatraForm, darshans: current });
                            }}
                            className="absolute top-2 right-2 p-1 hover:bg-red-500/10 rounded text-red-400 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <input
                            type="text"
                            required
                            value={cat.title}
                            onChange={(e) => {
                              const current = [...(yatraForm.darshans || [])];
                              current[idx].title = e.target.value;
                              setYatraForm({ ...yatraForm, darshans: current });
                            }}
                            className="w-full p-2 bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Category Title (e.g. Kashi Sacred Sites)"
                          />

                          <textarea
                            rows={3}
                            value={cat.items.join("\n")}
                            onChange={(e) => {
                              const current = [...(yatraForm.darshans || [])];
                              current[idx].items = e.target.value.split("\n").filter(Boolean);
                              setYatraForm({ ...yatraForm, darshans: current });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Darshan item 1 (one per line)...&#10;Darshan item 2..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-white/10 pt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-cta text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      {formMode === "add" ? "Create" : "Update"} Yatra
                    </button>
                  </div>
                </form>
              )}

              {/* TEERTHA FORM */}
              {formType === "teertha" && (
                <form onSubmit={handleTeerthaSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.name}
                        onChange={(e) => setTeerthaForm({ ...teerthaForm, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Ayodhya"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.slug}
                        onChange={(e) =>
                          setTeerthaForm({
                            ...teerthaForm,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. ayodhya"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Region *
                      </label>
                      <select
                        value={teerthaForm.region}
                        onChange={(e) => setTeerthaForm({ ...teerthaForm, region: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-amber-400 [&>option]:bg-[#140817]"
                      >
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="West">West</option>
                        <option value="East">East</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Significance *
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.significance || ""}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, significance: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Ramayana"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.duration}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, duration: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. 2-3 days"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={teerthaForm.tagline}
                      onChange={(e) => setTeerthaForm({ ...teerthaForm, tagline: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. Birthplace of Lord Rama"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Image Path/URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.img}
                        onChange={(e) => setTeerthaForm({ ...teerthaForm, img: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. /images/aayodhya.jpg or https://example.com/img.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={teerthaForm.date}
                        onChange={(e) => setTeerthaForm({ ...teerthaForm, date: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Multiple Departures Available"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={teerthaForm.desc}
                      onChange={(e) => setTeerthaForm({ ...teerthaForm, desc: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 resize-none"
                      placeholder="Enter description of the teertha..."
                    />
                  </div>

                  {/* Highlights and Inclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Highlights (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={teerthaForm.highlights?.join("\n")}
                        onChange={(e) =>
                          setTeerthaForm({
                            ...teerthaForm,
                            highlights: e.target.value.split("\n").filter(Boolean),
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="VIP Darshan...&#10;Sarayu snan..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Inclusions (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={teerthaForm.inclusions?.join("\n")}
                        onChange={(e) =>
                          setTeerthaForm({
                            ...teerthaForm,
                            inclusions: e.target.value.split("\n").filter(Boolean),
                          })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="Comfortable stays...&#10;Meals included..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Triple Occupancy Price
                      </label>
                      <input
                        type="text"
                        value={teerthaForm.triplePrice}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, triplePrice: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Rs. 16,000 per Head"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Double Occupancy Price
                      </label>
                      <input
                        type="text"
                        value={teerthaForm.doublePrice}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, doublePrice: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Rs. 20,000 per Head"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Stays Heading
                      </label>
                      <input
                        type="text"
                        value={teerthaForm.staysHeading}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, staysHeading: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Stay Near Ram Janmabhoomi"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Stays Description
                      </label>
                      <textarea
                        rows={2}
                        value={teerthaForm.staysDesc}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, staysDesc: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 resize-none"
                        placeholder="Enter stays info..."
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Slogan Banner
                    </label>
                    <input
                      type="text"
                      value={teerthaForm.slogan}
                      onChange={(e) => setTeerthaForm({ ...teerthaForm, slogan: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. RAMA | DHARMA | DEVOTION"
                    />
                  </div>

                  {/* Itinerary builder */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400">
                        Day-wise Itinerary
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = teerthaForm.itinerary || [];
                          setTeerthaForm({
                            ...teerthaForm,
                            itinerary: [...current, { day: current.length + 1, points: [] }],
                          });
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold cursor-pointer"
                      >
                        + Add Day
                      </button>
                    </div>

                    <div className="space-y-4">
                      {teerthaForm.itinerary?.map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl relative space-y-2"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const current = [...(teerthaForm.itinerary || [])];
                              current.splice(idx, 1);
                              const resequenced = current.map((d, i) => ({ ...d, day: i + 1 }));
                              setTeerthaForm({ ...teerthaForm, itinerary: resequenced });
                            }}
                            className="absolute top-2 right-2 p-1 hover:bg-red-500/10 rounded text-red-400 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <p className="font-semibold text-white">Day {day.day}</p>
                          <textarea
                            rows={3}
                            value={day.points.join("\n")}
                            onChange={(e) => {
                              const current = [...(teerthaForm.itinerary || [])];
                              current[idx].points = e.target.value.split("\n").filter(Boolean);
                              setTeerthaForm({ ...teerthaForm, itinerary: current });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Activity point 1 (one per line)..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Darshans builder */}
                  <div className="border-t border-white/5 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400">
                        Sacred Darshans
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = teerthaForm.darshans || [];
                          setTeerthaForm({
                            ...teerthaForm,
                            darshans: [...current, { title: "", items: [] }],
                          });
                        }}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold cursor-pointer"
                      >
                        + Add Category
                      </button>
                    </div>

                    <div className="space-y-4">
                      {teerthaForm.darshans?.map((cat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl relative space-y-2"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const current = [...(teerthaForm.darshans || [])];
                              current.splice(idx, 1);
                              setTeerthaForm({ ...teerthaForm, darshans: current });
                            }}
                            className="absolute top-2 right-2 p-1 hover:bg-red-500/10 rounded text-red-400 cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <input
                            type="text"
                            required
                            value={cat.title}
                            onChange={(e) => {
                              const current = [...(teerthaForm.darshans || [])];
                              current[idx].title = e.target.value;
                              setTeerthaForm({ ...teerthaForm, darshans: current });
                            }}
                            className="w-full p-2 bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Category Title"
                          />

                          <textarea
                            rows={3}
                            value={cat.items.join("\n")}
                            onChange={(e) => {
                              const current = [...(teerthaForm.darshans || [])];
                              current[idx].items = e.target.value.split("\n").filter(Boolean);
                              setTeerthaForm({ ...teerthaForm, darshans: current });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:outline-none"
                            placeholder="Darshan item 1 (one per line)..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-white/10 pt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-cta text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      {formMode === "add" ? "Create" : "Update"} Teertha
                    </button>
                  </div>
                </form>
              )}

              {/* VIDEO FORM */}
              {formType === "video" && (
                <form onSubmit={handleVideoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Category *
                    </label>
                    <select
                      value={videoForm.category}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, category: e.target.value as any })
                      }
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-amber-400 [&>option]:bg-[#140817]"
                    >
                      <option value="Kashi Knowledge Portal">Kashi Knowledge Portal</option>
                      <option value="Kashi Knowledge Portal • Quick Bits">
                        Kashi Knowledge Portal • Quick Bits
                      </option>
                      <option value="Testimonials (Coming Soon)">Testimonials (Coming Soon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      YouTube Embed URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={videoForm.youtubeLink}
                      onChange={(e) => setVideoForm({ ...videoForm, youtubeLink: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. https://www.youtube.com/embed/LOqXUmuFGI4"
                    />
                    <p className="text-[10px] text-white/45 mt-1.5 leading-relaxed">
                      Must be a valid YouTube embed URL containing "/embed/". (Example:
                      https://www.youtube.com/embed/XXXXXX)
                    </p>
                  </div>

                  {/* Preview */}
                  {videoForm.youtubeLink && videoForm.youtubeLink.includes("/embed/") && (
                    <div className="border border-white/10 rounded-2xl overflow-hidden aspect-video bg-black">
                      <iframe
                        src={videoForm.youtubeLink}
                        title="Video preview"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="border-t border-white/10 pt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-cta text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      {formMode === "add" ? "Create" : "Update"} Video
                    </button>
                  </div>
                </form>
              )}

              {/* BLOG FORM */}
              {formType === "blog" && (
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. Samyam: Travel Beyond, Discover Within"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Quote (CEO Statement)
                    </label>
                    <input
                      type="text"
                      value={blogForm.quote}
                      onChange={(e) => setBlogForm({ ...blogForm, quote: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="e.g. Let's transform the way we experience the soul."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                      Content / Body *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                      placeholder="Enter the main body of the blog or philosophy..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={blogForm.authorName}
                        onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="Nileema Shenoy"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Author Title
                      </label>
                      <input
                        type="text"
                        value={blogForm.authorTitle}
                        onChange={(e) => setBlogForm({ ...blogForm, authorTitle: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="Founder & CEO"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Author Image Path/URL
                      </label>
                      <input
                        type="text"
                        value={blogForm.authorImage}
                        onChange={(e) => setBlogForm({ ...blogForm, authorImage: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="/images/founder.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-amber-400 mb-1">
                        Status
                      </label>
                      <select
                        value={blogForm.isPublished ? "true" : "false"}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, isPublished: e.target.value === "true" })
                        }
                        className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-amber-400 [&>option]:bg-[#140817]"
                      >
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                      </select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-white/10 pt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-5 py-2.5 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-cta text-white font-semibold rounded-full uppercase tracking-wider transition cursor-pointer"
                    >
                      {formMode === "add" ? "Create" : "Update"} Blog
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
