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
  ChevronDown,
  ChevronUp,
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
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    setShowAdvanced(false);
    setIsFormOpen(true);
  };

  const openEditYatra = (item: Yatra) => {
    setYatraForm(item);
    setFormMode("edit");
    setFormType("yatra");
    setShowAdvanced(false);
    setIsFormOpen(true);
  };

  const openAddTeertha = () => {
    setTeerthaForm(initialTeerthaState);
    setFormMode("add");
    setFormType("teertha");
    setShowAdvanced(false);
    setIsFormOpen(true);
  };

  const openEditTeertha = (item: Teertha) => {
    setTeerthaForm(item);
    setFormMode("edit");
    setFormType("teertha");
    setShowAdvanced(false);
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d040f] text-white flex flex-col justify-between">
      <section className="relative py-8 px-4 md:px-8 overflow-hidden min-h-[92vh] flex-grow flex">
        <FlowerField count={5} />

        <div className="w-full max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row gap-6 mt-2">
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="w-full md:w-72 shrink-0 space-y-6">
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-soft space-y-8">
              <div className="border-b border-white/5 pb-6 text-center md:text-left">
                <h2 className="font-display font-bold text-xl text-white tracking-wide">
                  Samyam <span className="text-amber-400">Admin</span>
                </h2>
                <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-2 truncate">
                  {adminEmail}
                </p>
              </div>

              <nav className="flex flex-col gap-2 font-body">
                {[
                  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
                  { id: "enquiries", label: "Enquiries", icon: Mail },
                  { id: "yatras", label: "Yatras", icon: Compass },
                  { id: "teerthas", label: "Teerthas", icon: MapPin },
                  { id: "videos", label: "Knowledge", icon: Film },
                  { id: "blogs", label: "CEO Journal", icon: FileText },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setSearchTerm("");
                      }}
                      className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 cursor-pointer ${
                        activeTab === item.id
                          ? "bg-amber-400 text-[#0d040f] shadow-glow-amber scale-[1.02]"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-white/5 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all rounded-2xl text-[10px] font-bold uppercase tracking-widest font-body flex items-center justify-center gap-2 cursor-pointer text-red-400"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT PANEL */}
          <main className="flex-1 min-w-0 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl overflow-y-auto">
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
              <div className="space-y-10 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                      Welcome Back
                    </h1>
                    <p className="text-xs text-white/40 font-body uppercase tracking-widest mt-1">
                      Platform Overview & Controls
                    </p>
                  </div>
                  <button
                    onClick={handleMigrateData}
                    disabled={migrating}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-amber-400 hover:bg-amber-400 hover:text-[#0d040f] transition-all rounded-2xl text-[10px] font-bold uppercase tracking-widest font-body flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Database size={14} className={migrating ? "animate-spin" : ""} />
                    {migrating ? "Syncing..." : "Sync Initial Data"}
                  </button>
                </div>

                {/* Statistics Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[
                    {
                      label: "Enquiries",
                      val: stats?.totalEnquiries ?? enquiries.length,
                      color: "text-amber-400",
                      icon: Mail,
                    },
                    {
                      label: "Yatras",
                      val: stats?.totalRetreats ?? yatras.length,
                      color: "text-sky-400",
                      icon: Compass,
                    },
                    {
                      label: "Videos",
                      val: stats?.totalVideos ?? videos.length,
                      color: "text-purple-400",
                      icon: Film,
                    },
                    {
                      label: "Teerthas",
                      val: stats?.totalTeerthas ?? teerthas.length,
                      color: "text-emerald-400",
                      icon: MapPin,
                    },
                    {
                      label: "Blogs",
                      val: stats?.totalBlogs ?? blogs.length,
                      color: "text-rose-400",
                      icon: FileText,
                    },
                  ].map((st, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl shadow-soft hover:border-white/10 transition-all flex flex-col items-center text-center"
                    >
                      <st.icon size={16} className={`${st.color} opacity-50 mb-2`} />
                      <p className={`text-4xl font-display font-black ${st.color}`}>{st.val}</p>
                      <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {[
                    {
                      title: "Enquiries",
                      desc: "Review seeker requests",
                      icon: "✉",
                      tab: "enquiries",
                    },
                    {
                      title: "Teerthas",
                      desc: "Curate destinations",
                      icon: "🕉",
                      tab: "teerthas",
                    },
                    {
                      title: "Knowledge",
                      desc: "Manage vault videos",
                      icon: "📚",
                      tab: "videos",
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(action.tab as any)}
                      className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] hover:border-amber-400/20 transition-all flex flex-col items-start group text-left cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        {action.icon}
                      </div>
                      <h4 className="text-lg font-bold font-display text-white mb-1">
                        {action.title}
                      </h4>
                      <p className="text-[10px] text-white/40 font-body leading-relaxed mb-4">
                        {action.desc}
                      </p>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 group-hover:translate-x-1 transition-transform">
                        Manage →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ENQUIRIES */}
            {activeTab === "enquiries" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold">Seeker Requests</h1>
                    <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-1">
                      Manage sacred inquiries
                    </p>
                  </div>

                  <div className="relative w-full xl:w-80 font-body">
                    <Search className="absolute left-4 top-3.5 text-white/20" size={16} />
                    <input
                      type="text"
                      placeholder="Search pilgrims..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-2xl font-body w-fit">
                  {(["All", "New", "Contacted", "Resolved"] as const).map((status) => {
                    const count =
                      status === "All"
                        ? enquiries.length
                        : enquiries.filter((e) => e.status === status).length;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                          statusFilter === status
                            ? "bg-amber-400 text-[#0d040f] shadow-sm"
                            : "text-white/40 hover:text-white"
                        }`}
                      >
                        {status} <span className="opacity-50 ml-1">({count})</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredEnquiries.map((enquiry) => (
                    <div
                      key={enquiry._id}
                      className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-6 text-left font-body relative hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="text-xl font-bold font-display text-white">
                              {enquiry.name}
                            </h4>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-amber-400">
                              {enquiry.preferredYatra}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-6 text-[11px] text-white/50">
                            <span>📞 {enquiry.phoneNumber}</span>
                            {enquiry.email && <span>✉ {enquiry.email}</span>}
                            <span>🕒 {new Date(enquiry.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={enquiry.status}
                            onChange={(e) =>
                              handleUpdateEnquiryStatus(
                                enquiry._id,
                                e.target.value as Enquiry["status"],
                              )
                            }
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:outline-none border cursor-pointer ${
                              enquiry.status === "New"
                                ? "bg-sky-500/10 border-sky-500/20 text-sky-400"
                                : enquiry.status === "Contacted"
                                  ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            } [&>option]:bg-[#140817]`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => setDeleteConfirm({ id: enquiry._id, type: "enquiry" })}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-white/70 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                        "{enquiry.message}"
                      </p>
                    </div>
                  ))}
                  {filteredEnquiries.length === 0 && (
                    <div className="py-20 text-center text-white/30 text-xs font-body uppercase tracking-widest">
                      No matching pilgrim requests
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: YATRA RETREATS */}
            {activeTab === "yatras" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-white">
                      Yatras & Retreats
                    </h1>
                    <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-1">
                      Dynamic Travel Itineraries
                    </p>
                  </div>
                  <button
                    onClick={openAddYatra}
                    className="px-6 py-3 bg-amber-400 text-[#0d040f] font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle size={14} /> Create Journey
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {yatras.map((y) => (
                    <div
                      key={y._id}
                      className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-soft flex flex-col justify-between hover:bg-white/[0.04] transition-all group"
                    >
                      <div>
                        <div className="aspect-video bg-black relative overflow-hidden">
                          <img
                            src={y.img.startsWith("/") ? y.img : `/images/${y.img}`}
                            alt={y.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://samyam.co/images/knowledge.jpeg";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d040f] via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold font-display text-white">{y.name}</h3>
                            <p className="text-[10px] text-amber-400 font-bold uppercase mt-0.5">
                              {y.duration} • {y.date}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 space-y-4">
                          <p className="text-white/50 text-[11px] leading-relaxed line-clamp-2">
                            {y.desc}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-sky-400">D: {y.doublePrice || "N/A"}</span>
                            <span className="text-amber-400">T: {y.triplePrice || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 py-4 bg-black/20 flex items-center justify-between border-t border-white/5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                            y.isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-white/10 text-white/40 border border-white/10"
                          }`}
                        >
                          {y.isPublished ? "Live" : "Draft"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditYatra(y)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition cursor-pointer"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ id: y._id as string, type: "yatra" })}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: TEERTHAS */}
            {activeTab === "teerthas" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-white">Holy Teerthas</h1>
                    <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-1">
                      Sacred Destination Library
                    </p>
                  </div>
                  <button
                    onClick={openAddTeertha}
                    className="px-6 py-3 bg-amber-400 text-[#0d040f] font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle size={14} /> Add Teertha
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {teerthas.map((t) => (
                    <div
                      key={t._id}
                      className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden flex flex-col justify-between hover:bg-white/[0.04] transition-all group"
                    >
                      <div>
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={
                              t.img.startsWith("http")
                                ? t.img
                                : t.img.startsWith("/")
                                  ? t.img
                                  : `/images/${t.img}`
                            }
                            alt={t.name}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://samyam.co/images/knowledge.jpeg";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d040f] via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-bold font-display text-white">{t.name}</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase mt-0.5">
                              {t.region} • {t.duration}
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-white/50 text-[11px] leading-relaxed line-clamp-2">
                            {t.desc}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 py-4 bg-black/20 flex items-center justify-end gap-2 border-t border-white/5">
                        <button
                          onClick={() => openEditTeertha(t)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition cursor-pointer"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: t._id!, type: "teertha" })}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: VIDEOS */}
            {activeTab === "videos" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-white">Knowledge Vault</h1>
                    <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-1">
                      Manage Spiritual Content
                    </p>
                  </div>
                  <button
                    onClick={openAddVideo}
                    className="px-6 py-3 bg-amber-400 text-[#0d040f] font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle size={14} /> Add Video
                  </button>
                </div>

                <div className="space-y-12">
                  {[
                    "Kashi Knowledge Portal",
                    "Kashi Knowledge Portal • Quick Bits",
                    "Testimonials (Coming Soon)",
                  ].map((cat) => {
                    const catVideos = videos.filter((v) => v.category === cat);
                    if (catVideos.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 whitespace-nowrap">
                            {cat}
                          </h3>
                          <div className="h-px w-full bg-white/5" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {catVideos.map((video) => (
                            <div
                              key={video._id}
                              className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all group"
                            >
                              <div className="aspect-video bg-black/50">
                                <iframe
                                  src={video.youtubeLink}
                                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                                  allowFullScreen
                                ></iframe>
                              </div>
                              <div className="p-4 flex items-center justify-between">
                                <span className="text-[9px] text-white/30 font-medium truncate max-w-[150px]">
                                  {video.youtubeLink}
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openEditVideo(video)}
                                    className="p-1.5 bg-white/5 rounded-lg text-white/40 hover:text-white"
                                  >
                                    <Edit size={12} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setDeleteConfirm({ id: video._id!, type: "video" })
                                    }
                                    className="p-1.5 bg-red-500/5 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: BLOGS */}
            {activeTab === "blogs" && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-white">CEO Journal</h1>
                    <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mt-1">
                      Manage philosophical blogs
                    </p>
                  </div>
                  <button
                    onClick={openAddBlog}
                    className="px-6 py-3 bg-amber-400 text-[#0d040f] font-bold rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition cursor-pointer flex items-center gap-2"
                  >
                    <PlusCircle size={14} /> New Post
                  </button>
                </div>

                <div className="space-y-6">
                  {blogs.map((b) => (
                    <div
                      key={b._id}
                      className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl flex flex-col justify-between gap-6 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-display font-bold text-white">{b.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${b.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"}`}
                          >
                            {b.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                          {b.content}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                        <button
                          onClick={() => openEditBlog(b)}
                          className="px-5 py-2 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: b._id!, type: "blog" })}
                          className="px-5 py-2 bg-red-500/5 text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* DYNAMIC FORMS MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-[#000]/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1a0a1e] border border-white/10 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl relative font-body text-xs text-left max-h-[90vh] flex flex-col">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div>
                <h2 className="text-2xl font-display font-bold text-white leading-tight">
                  {formMode === "add" ? "Create New" : "Edit"}{" "}
                  <span className="text-amber-400">
                    {formType === "yatra"
                      ? "Yatra Itinerary"
                      : formType === "teertha"
                        ? "Teertha Entry"
                        : formType === "video"
                          ? "Vault Video"
                          : "Blog Post"}
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition text-white/60 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              {/* Simplified YATRA FORM */}
              {formType === "yatra" && (
                <form onSubmit={handleYatraSubmit} className="space-y-8">
                  {/* Basic Info Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                        Journey Name
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.name}
                        onChange={(e) =>
                          setYatraForm({
                            ...yatraForm,
                            name: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          })
                        }
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400 transition-all"
                        placeholder="e.g. Kashi - Ayodhya"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Dates
                        </label>
                        <input
                          type="text"
                          required
                          value={yatraForm.date}
                          onChange={(e) => setYatraForm({ ...yatraForm, date: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                          placeholder="20-25 Oct"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Duration
                        </label>
                        <input
                          type="text"
                          required
                          value={yatraForm.duration}
                          onChange={(e) => setYatraForm({ ...yatraForm, duration: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                          placeholder="6 Days"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={yatraForm.desc}
                      onChange={(e) => setYatraForm({ ...yatraForm, desc: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white resize-none"
                      placeholder="Enter a brief soul-stirring description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        required
                        value={yatraForm.img}
                        onChange={(e) => setYatraForm({ ...yatraForm, img: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                        placeholder="/images/yatra-1.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Double Occupancy
                        </label>
                        <input
                          type="text"
                          value={yatraForm.doublePrice}
                          onChange={(e) =>
                            setYatraForm({ ...yatraForm, doublePrice: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                          placeholder="42,000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Triple Occupancy
                        </label>
                        <input
                          type="text"
                          value={yatraForm.triplePrice}
                          onChange={(e) =>
                            setYatraForm({ ...yatraForm, triplePrice: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                          placeholder="39,000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white">Published Status</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-widest">
                        Visibility on public portal
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setYatraForm({ ...yatraForm, isPublished: !yatraForm.isPublished })
                      }
                      className={`w-14 h-7 rounded-full transition-all duration-500 relative ${yatraForm.isPublished ? "bg-amber-400" : "bg-white/10"}`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-500 ${yatraForm.isPublished ? "right-1 bg-[#0d040f]" : "left-1 bg-white/40"}`}
                      />
                    </button>
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-400/60 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {showAdvanced
                        ? "Hide Advanced Details"
                        : "Show Advanced Details (Itinerary, Darshans, etc.)"}
                    </button>

                    {showAdvanced && (
                      <div className="mt-8 space-y-8 animate-fade-in">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
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
                            className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                            placeholder="Premium Stay&#10;Scholar Guided Sessions..."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Stays Title
                            </label>
                            <input
                              type="text"
                              value={yatraForm.staysHeading}
                              onChange={(e) =>
                                setYatraForm({ ...yatraForm, staysHeading: e.target.value })
                              }
                              className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                              placeholder="Heritage Haveli Stays"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Itinerary Length
                            </label>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() =>
                                  setYatraForm({
                                    ...yatraForm,
                                    itinerary: [
                                      ...(yatraForm.itinerary || []),
                                      { day: (yatraForm.itinerary?.length || 0) + 1, points: [] },
                                    ],
                                  })
                                }
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest"
                              >
                                + Add Day
                              </button>
                              <span className="text-white/40 text-[10px]">
                                {yatraForm.itinerary?.length || 0} Days defined
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-4 rounded-full bg-white/5 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:text-white transition cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-4 rounded-full bg-amber-400 text-[#0d040f] font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-amber hover:scale-105 transition cursor-pointer"
                    >
                      Save Itinerary
                    </button>
                  </div>
                </form>
              )}

              {/* Simplified TEERTHA FORM */}
              {formType === "teertha" && (
                <form onSubmit={handleTeerthaSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                        Teertha Name
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.name}
                        onChange={(e) =>
                          setTeerthaForm({
                            ...teerthaForm,
                            name: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          })
                        }
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Kedarnath"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Region
                        </label>
                        <select
                          value={teerthaForm.region}
                          onChange={(e) =>
                            setTeerthaForm({ ...teerthaForm, region: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white appearance-none focus:outline-none focus:border-amber-400 cursor-pointer [&>option]:bg-[#1a0a1e]"
                        >
                          <option value="North">North India</option>
                          <option value="South">South India</option>
                          <option value="East">East India</option>
                          <option value="West">West India</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                          Avg. Duration
                        </label>
                        <input
                          type="text"
                          required
                          value={teerthaForm.duration}
                          onChange={(e) =>
                            setTeerthaForm({ ...teerthaForm, duration: e.target.value })
                          }
                          className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                          placeholder="3 Days"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      Summary / Significance
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={teerthaForm.desc}
                      onChange={(e) => setTeerthaForm({ ...teerthaForm, desc: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white resize-none"
                      placeholder="What makes this place sacred?..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        required
                        value={teerthaForm.img}
                        onChange={(e) => setTeerthaForm({ ...teerthaForm, img: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                        placeholder="/images/kashi.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                        Teertha Tagline
                      </label>
                      <input
                        type="text"
                        value={teerthaForm.tagline}
                        onChange={(e) =>
                          setTeerthaForm({ ...teerthaForm, tagline: e.target.value })
                        }
                        className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                        placeholder="Birthplace of Lord Rama"
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-400/60 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {showAdvanced
                        ? "Hide Extra Details"
                        : "Add Extra Details (Prices, Highlights, Itinerary)"}
                    </button>

                    {showAdvanced && (
                      <div className="mt-8 space-y-8 animate-fade-in">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Double Price
                            </label>
                            <input
                              type="text"
                              value={teerthaForm.doublePrice}
                              onChange={(e) =>
                                setTeerthaForm({ ...teerthaForm, doublePrice: e.target.value })
                              }
                              className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                              placeholder="On Request"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Triple Price
                            </label>
                            <input
                              type="text"
                              value={teerthaForm.triplePrice}
                              onChange={(e) =>
                                setTeerthaForm({ ...teerthaForm, triplePrice: e.target.value })
                              }
                              className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                              placeholder="On Request"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
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
                              className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                              placeholder="Ganga Aarti&#10;VIP Darshan..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
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
                              className="w-full px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white"
                              placeholder="All Meals&#10;Scholar Guide..."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-4 rounded-full bg-white/5 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:text-white transition cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-4 rounded-full bg-amber-400 text-[#0d040f] font-black uppercase tracking-[0.2em] text-[10px] shadow-glow-amber hover:scale-105 transition cursor-pointer"
                    >
                      Save Teertha
                    </button>
                  </div>
                </form>
              )}

              {/* VIDEO FORM (Simple by default) */}
              {formType === "video" && (
                <form onSubmit={handleVideoSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      Category
                    </label>
                    <select
                      value={videoForm.category}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, category: e.target.value as any })
                      }
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer [&>option]:bg-[#1a0a1e]"
                    >
                      <option value="Kashi Knowledge Portal">Knowledge Portal</option>
                      <option value="Kashi Knowledge Portal • Quick Bits">Quick Bits</option>
                      <option value="Testimonials (Coming Soon)">Testimonials</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      YouTube Embed Link
                    </label>
                    <input
                      type="text"
                      required
                      value={videoForm.youtubeLink}
                      onChange={(e) => setVideoForm({ ...videoForm, youtubeLink: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                  <div className="pt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-3 rounded-full bg-white/5 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-3 rounded-full bg-amber-400 text-[#0d040f] font-black uppercase tracking-widest text-[10px] cursor-pointer"
                    >
                      Upload Video
                    </button>
                  </div>
                </form>
              )}

              {/* BLOG FORM (Simple by default) */}
              {formType === "blog" && (
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                      placeholder="The Soul of Bharat"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-400/80">
                      Main Content
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white"
                      placeholder="Write your thoughts here..."
                    />
                  </div>
                  <div className="pt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-8 py-3 rounded-full bg-white/5 text-white/60 font-bold uppercase tracking-widest text-[10px] hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-3 rounded-full bg-amber-400 text-[#0d040f] font-black uppercase tracking-widest text-[10px] cursor-pointer"
                    >
                      Publish Blog
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DELETE DIALOG */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-[#000]/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-[#1a0a1e] border border-white/10 rounded-[2.5rem] w-full max-w-sm p-8 space-y-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto text-2xl">
              ⚠️
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-white">Delete Permanently?</h3>
              <p className="text-white/40 text-xs leading-relaxed">
                This action cannot be undone. All data related to this {deleteConfirm.type} will be
                removed from our sacred vaults.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition cursor-pointer"
              >
                Keep it
              </button>
              <button
                onClick={handleDeleteItem}
                className="flex-1 py-4 bg-red-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-500/20 cursor-pointer"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
