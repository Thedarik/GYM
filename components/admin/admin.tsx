"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Cloud,
  Download,
  FileText,
  Grid,
  Home,
  MapPin,
  Menu,
  MoreHorizontal,
  PanelLeft,
  Phone,
  Plus,
  QrCode,
  Search,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  UserCheck,
  Building,
  GraduationCap,
  Activity,
  RefreshCw,
  Download as DownloadIcon,
  UserPlus,
  FileCheck,
  AlertTriangle,
  Hash,
  Globe,
  Edit,
  Trash2,
  Upload,
  Save,
  User,
  Mail,
  BadgeCheck,
  Target,
  TrendingDown,
  AlertCircle,
  CheckSquare,
  XCircle,
  Clock3,
  Calendar as CalendarIcon,
  FileSpreadsheet,
  PieChart,
  BarChart,
  Bookmark,
  Archive,
  SendHorizontal,
  Copy,
  Share2,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

// TypeScript interfaces
interface AnalyticsData {
  name: string
  value: number | string
  change: number | string
  trend: "up" | "down"
  icon: React.ReactNode
  description: string
  target: number
  percentage: number
}

interface Course {
  id: string
  name: string
  duration_days: number
  price: number
  access_rules?: any
  freeze_allowed: boolean
  created_at?: string
  users_count?: number
}

interface ApiUser {
  id: number | string
  name: string
  email: string | null
  phone: string | null
  course: string | null
  progress: number | null
  enroll_date: string | null
  last_activity: string | null
  status: string | null
  certificates: number | null
  attendance: number | null
  avatar: string | null
}

interface Certificate {
  id: string
  studentName: string
  course: string
  issueDate: string
  status: "issued" | "draft" | "pending"
  downloads: number
  qrScans: number
  validUntil: string
  score: number
  grade: string
  issueTime: string
}

interface Activity {
  id: number
  type: "student_enrolled" | "assignment_submitted" | "certificate_issued" | "course_completed"
  message: string
  time: string
  icon: React.ReactNode
  color: string
}

interface SidebarItem {
  title: string
  icon: React.ReactNode
  badge?: string
  isActive: boolean
  onClick: () => void
}

interface Assignment {
  title: string
  course: string
  submitted: number
  total: number
  deadline: string
  status: "active" | "completed"
}

interface ReportCard {
  title: string
  desc: string
  icon: React.ReactNode
  color: string
}

interface AdminDashboardProps {
  onLogout?: () => void
}

// Certificate Template interfaces
interface CertificateTemplate {
  id: number
  name: string
  description: string
  category: "Modern" | "Classic" | "Elegant" | "Minimal" | "Colorful"
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  isActive: boolean
  downloads: number
  rating: number
  createdDate: string
}

// Certificate templates data
const certificateTemplates: CertificateTemplate[] = [
  {
    id: 1,
    name: "Zamonaviy Gradient",
    description: "Rangdor gradient dizayni bilan zamonaviy ko'rinish",
    category: "Modern",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#F59E0B"
    },
    isActive: true,
    downloads: 156,
    rating: 4.8,
    createdDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Klassik Elegant",
    description: "An'anaviy va professional ko'rinish",
    category: "Classic",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#1F2937",
      secondary: "#6B7280",
      accent: "#D97706"
    },
    isActive: false,
    downloads: 203,
    rating: 4.9,
    createdDate: "2024-02-10"
  },
  {
    id: 3,
    name: "Premium Gold",
    description: "Oltin rangli hashamatli dizayn",
    category: "Elegant",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#B45309",
      secondary: "#F59E0B",
      accent: "#FCD34D"
    },
    isActive: false,
    downloads: 89,
    rating: 4.7,
    createdDate: "2024-03-05"
  },
  {
    id: 4,
    name: "Minimal Clean",
    description: "Sodda va toza minimalist uslub",
    category: "Minimal",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#000000",
      secondary: "#6B7280",
      accent: "#10B981"
    },
    isActive: false,
    downloads: 127,
    rating: 4.6,
    createdDate: "2024-03-20"
  },
  {
    id: 5,
    name: "Rangdor Festival",
    description: "Yorqin va quvnoq ranglar bilan",
    category: "Colorful",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      accent: "#06B6D4"
    },
    isActive: false,
    downloads: 78,
    rating: 4.5,
    createdDate: "2024-04-01"
  },
  {
    id: 6,
    name: "Biznes Professional",
    description: "Biznes muhiti uchun professional dizayn",
    category: "Classic",
    preview: "/placeholder.svg?height=300&width=400",
    colors: {
      primary: "#1E40AF",
      secondary: "#3B82F6",
      accent: "#EF4444"
    },
    isActive: false,
    downloads: 234,
    rating: 4.8,
    createdDate: "2024-04-15"
  }
]

// Sample data with proper typing
const adminAnalytics: AnalyticsData[] = [
  {
    name: "Abonementlar",
    value: 0,
    change: 0,
    trend: "up",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Faol tariflar soni",
    target: 0,
    percentage: 0
  },
  {
    name: "Faol A'zolar",
    value: 89,
    change: 12,
    trend: "up",
    icon: <Users className="h-4 w-4" />,
    description: "Joriy kurslar bo'yicha",
    target: 100,
    percentage: 89
  },
  {
    name: "QR Tekshirishlar",
    value: "1,247",
    change: "+198",
    trend: "up",
    icon: <QrCode className="h-4 w-4" />,
    description: "Sertifikatlar tekshirildi",
    target: 1500,
    percentage: 83
  },
  {
    name: "Faol Abonementlar",
    value: 12,
    change: 3,
    trend: "up",
    icon: <CheckSquare className="h-4 w-4" />,
    description: "Ushbu oyda yakunlandi",
    target: 15,
    percentage: 80
  },
]

// plans from API
const adminCourses: Course[] = []

// API'dan a'zolar (users) ma'lumotlarini olamiz

const certificatesHistory: Certificate[] = [
  {
    id: "CERT-2024-001247",
    studentName: "Karimova Malika",
    course: "Digital Marketing",
    issueDate: "2024-05-01",
    status: "issued",
    downloads: 5,
    qrScans: 12,
    validUntil: "2027-05-01",
    score: 95,
    grade: "A+",
    issueTime: "2 kun oldin"
  },
  {
    id: "CERT-2024-001245",
    studentName: "Abdullayev Jasur",
    course: "Frontend Development",
    issueDate: "2024-06-10",
    status: "draft",
    downloads: 0,
    qrScans: 0,
    validUntil: "2027-06-10",
    score: 88,
    grade: "A",
    issueTime: "Tayyorlanmoqda"
  },
]

const recentActivities: Activity[] = [
  {
    id: 1,
    type: "student_enrolled",
    message: "Nazarova Dilnoza 'Graphic Design' kursiga yozildi",
    time: "1 soat oldin",
    icon: <UserPlus className="h-4 w-4" />,
    color: "text-blue-600"
  },
  {
    id: 2,
    type: "assignment_submitted",
    message: "Abdullayev Jasur 5-topshiriqni yubordi",
    time: "2 soat oldin",
    icon: <FileCheck className="h-4 w-4" />,
    color: "text-green-600"
  },
  {
    id: 3,
    type: "certificate_issued",
    message: "Karimova Malika uchun sertifikat berildi",
    time: "2 kun oldin",
    icon: <Award className="h-4 w-4" />,
    color: "text-purple-600"
  },
  {
    id: 4,
    type: "course_completed",
    message: "Digital Marketing kursi yakunlandi",
    time: "3 kun oldin",
    icon: <CheckSquare className="h-4 w-4" />,
    color: "text-emerald-600"
  },
]

// assignments bo'limi olib tashlandi

const reportCards: ReportCard[] = [
  { title: "A'zolar Hisoboti", desc: "Davomad va rivojlanish", icon: <Users className="h-6 w-6" />, color: "bg-blue-500" },
  { title: "Abonementlar Samaradorligi", desc: "Faollik ko'rsatkichi", icon: <BookOpen className="h-6 w-6" />, color: "bg-green-500" },
  { title: "Sertifikatlar Statistikasi", desc: "Berilgan sertifikatlar", icon: <Award className="h-6 w-6" />, color: "bg-purple-500" },
  { title: "Topshiriqlar Tahlili", desc: "Baholash natijalari", icon: <FileCheck className="h-6 w-6" />, color: "bg-orange-500" },
  { title: "Moliyaviy Hisobot", desc: "To'lovlar va daromad", icon: <BarChart3 className="h-6 w-6" />, color: "bg-emerald-500" },
  { title: "Umumiy Ko'rsatkichlar", desc: "Barcha metrikalar", icon: <PieChart className="h-6 w-6" />, color: "bg-pink-500" },
]

type TabType = "dashboard" | "courses" | "students" | "certificates" | "assignments" | "reports" | "finance" | "settings"

// ✅ ASOSIY O'ZGARISH: Bu yerda export qilish kerak
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<number>(5)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)
  const [users, setUsers] = useState<ApiUser[]>([])
  const [usersLoading, setUsersLoading] = useState<boolean>(false)
  const [usersError, setUsersError] = useState<string>("")
  const [usersFilterOpen, setUsersFilterOpen] = useState<boolean>(false)
  const [usersFilterQuery, setUsersFilterQuery] = useState<string>("")
  const [usersFilterStatus, setUsersFilterStatus] = useState<string>("all")
  const [plans, setPlans] = useState<Course[]>([])
  const [plansLoading, setPlansLoading] = useState<boolean>(false)
  const [plansError, setPlansError] = useState<string>("")
  const [planOpen, setPlanOpen] = useState<boolean>(false)
  const [planName, setPlanName] = useState<string>("")
  const [planDuration, setPlanDuration] = useState<number>(30)
  const [planPrice, setPlanPrice] = useState<number>(0)
  const [planSaving, setPlanSaving] = useState<boolean>(false)

  // Edit Plan modal state
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [editPlanId, setEditPlanId] = useState<string | number | null>(null)
  const [editName, setEditName] = useState<string>("")
  const [editDuration, setEditDuration] = useState<number>(30)
  const [editPrice, setEditPrice] = useState<number>(0)
  const [editSaving, setEditSaving] = useState<boolean>(false)
  const [editError, setEditError] = useState<string>("")

  // Add Member modal state
  const [addOpen, setAddOpen] = useState<boolean>(false)
  const [addLoading, setAddLoading] = useState<boolean>(false)
  const [addError, setAddError] = useState<string>("")
  const [formName, setFormName] = useState<string>("")
  const [formEmail, setFormEmail] = useState<string>("")
  const [formPhone, setFormPhone] = useState<string>("")

  // Real-time clock - only initialize on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch users from API
  const fetchUsers = async () => {
      try {
        setUsersLoading(true)
        setUsersError("")
        const resp = await fetch('/api/users', { cache: 'no-store' })
        const json = await resp.json()
        if (!resp.ok) throw new Error(json?.error || 'Yuklashda xatolik')
        setUsers(Array.isArray(json?.users) ? json.users : [])
      } catch (e: any) {
        setUsersError(e?.message || 'Yuklashda xatolik')
      } finally {
        setUsersLoading(false)
      }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchPlans = async () => {
    try {
      setPlansLoading(true)
      setPlansError("")
      const resp = await fetch('/api/plans', { cache: 'no-store' })
      const json = await resp.json()
      if (!resp.ok) throw new Error(json?.error || 'Tariflarni yuklashda xatolik')
      setPlans(Array.isArray(json?.plans) ? json.plans : [])
    } catch (e: any) {
      setPlansError(e?.message || 'Tariflarni yuklashda xatolik')
    } finally {
      setPlansLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setPlanSaving(true)
      setPlansError("")
      const resp = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: planName, duration_days: planDuration, price: planPrice })
      })
      const json = await resp.json()
      if (!resp.ok) throw new Error(json?.error || 'Tarif yaratishda xatolik')
      setPlanOpen(false)
      setPlanName("")
      setPlanDuration(30)
      setPlanPrice(0)
      fetchPlans()
    } catch (e: any) {
      setPlansError(e?.message || 'Tarif yaratishda xatolik')
    } finally {
      setPlanSaving(false)
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setAddLoading(true)
      setAddError("")
      const resp = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
        })
      })
      const json = await resp.json()
      if (!resp.ok) throw new Error(json?.error || 'Yaratishda xatolik')
      setAddOpen(false)
      setFormName("")
      setFormEmail("")
      setFormPhone("")
      fetchUsers()
    } catch (err: any) {
      setAddError(err?.message || 'Yaratishda xatolik')
    } finally {
      setAddLoading(false)
    }
  }

  const openEditPlan = (plan: Course) => {
    setEditPlanId(plan.id)
    setEditName(plan.name)
    setEditDuration(Number(plan.duration_days))
    setEditPrice(Number(plan.price))
    setEditError("")
    setEditOpen(true)
  }

  const handleEditPlan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editPlanId == null) return
    try {
      setEditSaving(true)
      setEditError("")
      const url = `/api/plans/${editPlanId}`
      let resp = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, duration_days: editDuration, price: editPrice })
      })
      if (resp.status === 405) {
        resp = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editName, duration_days: editDuration, price: editPrice })
        })
      }
      const contentType = resp.headers.get('content-type') || ''
      const payload = contentType.includes('application/json') ? await resp.json() : await resp.text()
      if (!resp.ok) {
        const message = typeof payload === 'string' ? payload : (payload?.error || 'Tarifni tahrirlashda xatolik')
        throw new Error(message)
      }
      setEditOpen(false)
      setEditPlanId(null)
      fetchPlans()
    } catch (e: any) {
      setEditError(e?.message || 'Tarifni tahrirlashda xatolik')
    } finally {
      setEditSaving(false)
    }
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <Home />,
      isActive: activeTab === "dashboard",
      onClick: () => setActiveTab("dashboard")
    },
    {
      title: "Abonementlar",
      icon: <BookOpen />,
      badge: String(plans.length || 0),
      isActive: activeTab === "courses",
      onClick: () => setActiveTab("courses")
    },
    {
      title: "A'zolar",
      icon: <Users />,
      badge: String(users.length || 0),
      isActive: activeTab === "students",
      onClick: () => setActiveTab("students")
    },
    {
      title: "Hisobotlar",
      icon: <BarChart3 />,
      isActive: activeTab === "reports",
      onClick: () => setActiveTab("reports")
    },
    {
      title: "Moliyaviy",
      icon: <BarChart />,
      isActive: activeTab === "finance",
      onClick: () => setActiveTab("finance")
    },
    {
      title: "Sozlamalar",
      icon: <Settings />,
      isActive: activeTab === "settings",
      onClick: () => setActiveTab("settings")
    },
  ]

  const getStatusBadge = (status: string): React.ReactNode => {
    const statusMap = {
      active: "Faol",
      completed: "Tugallangan",
      upcoming: "Boshlanmagan",
      pending: "Kutilmoqda",
      issued: "Berilgan",
      draft: "Tayyorlanmoqda"
    }

    return (
      <Badge
        variant={status === "active" || status === "issued" ? "default" : "secondary"}
        className="rounded-xl text-xs"
      >
        {statusMap[status as keyof typeof statusMap] || status}
      </Badge>
    )
  }

  const formatInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 25%, rgba(34, 197, 94, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, rgba(34, 197, 94, 0.2) 25%, rgba(59, 130, 246, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(147, 51, 234, 0.1) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 hidden w-72 transform border-r bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out md:block",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white shadow-lg">
                <GraduationCap className="size-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Gym Admin</h2>
                <p className="text-xs text-muted-foreground">Sport Zali Boshqaruvi</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-3">
              {mounted && currentTime ? (
                <>
                  {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
                </>
              ) : (
                <span className="opacity-50">Loading...</span>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="A'zo yoki abonement qidirish..."
                className="w-full rounded-2xl bg-muted/50 pl-9 pr-4 py-2"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    item.isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted/70 hover:scale-[1.02]",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">IT Academy Tashkent</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-xl">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-72" : "md:pl-0")}>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/80 backdrop-blur-md px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gym Admin Panel
              </h1>
              <p className="text-sm text-muted-foreground">Zal ishlarini boshqaring va nazorat qiling</p>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl">
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Ma'lumotlarni yangilash</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                        >
                          {notifications}
                        </motion.span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bildirishnomalar</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-8 text-white relative"
              >
                <div className="relative z-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                        <Badge className="bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30 rounded-xl">
                          <Activity className="h-3 w-3 mr-1" />
                          3 Faol Abonement
                        </Badge>
                      </div>
                      <h2 className="text-3xl font-bold">
                        Salom, Admin! 🎓
                      </h2>
                      <p className="max-w-[600px] text-white/80">
                        Bugun 5 ta yangi o'quvchi qo'shildi va 3 ta topshiriq yuborildi. Barcha kurslar muvaffaqiyatli davom etmoqda.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="rounded-2xl bg-white text-purple-700 hover:bg-white/90">
                          <Plus className="mr-2 h-4 w-4" />
                          Yangi Abonement Qo'shish
                        </Button>
                        <Button variant="outline" className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10">
                          <Award className="mr-2 h-4 w-4" />
                          Sertifikat Berish
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {adminAnalytics.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 rounded-xl bg-primary/10">
                            {item.icon}
                          </div>
                          <Badge variant={item.trend === "up" ? "default" : "secondary"} className="rounded-xl">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {item.change}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {(() => {
                            const isUsersCard = item.name === "Faol A'zolar"
                            const isPlansCard = item.name === "Abonementlar"
                            const valueToShow = isUsersCard ? users.length : (isPlansCard ? plans.length : item.value)
                            const descToShow = isUsersCard ? "Jami foydalanuvchilar soni (backend)" : (isPlansCard ? "Faol tariflar soni" : item.description)
                            return (
                              <>
                                <p className="text-2xl font-bold">{valueToShow}</p>
                                <p className="text-sm text-muted-foreground">{item.name}</p>
                                <p className="text-xs text-muted-foreground">{descToShow}</p>
                              </>
                            )
                          })()}
                          <Progress value={item.percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {item.percentage}% dan {item.target} maqsad
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">Oxirgi Faoliyatlar</CardTitle>
                          <CardDescription>Eng so'nggi o'zgarishlar va yangilanishlar</CardDescription>
                        </div>
                        <Button variant="outline" className="rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Barchasini Ko'rish
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                          >
                            <div className={cn("p-2 rounded-xl bg-muted", activity.color)}>
                              {activity.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{activity.message}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div>
                  <Card className="rounded-3xl border-2">
                    <CardHeader>
                      <CardTitle className="text-xl">Tezkor Statistika</CardTitle>
                      <CardDescription>Asosiy ko'rsatkichlar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Bugungi davomad</span>
                          <span className="font-semibold">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Topshiriqlar bajarildi</span>
                          <span className="font-semibold">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">O'rtacha baho</span>
                          <span className="font-semibold text-green-600">4.8</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="secondary" className="w-full rounded-2xl">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Batafsil Hisobot
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Active Plans (Abonementlar) */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Faol Abonementlar</CardTitle>
                      <CardDescription>Hozirda amal qilayotgan tariflar</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Barcha Abonementlar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.slice(0, 6).map((plan, index) => (
                      <motion.div
                        key={String(plan.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                      >
                        <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-base leading-tight truncate">{plan.name}</CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3 space-y-3">
                            <p className="text-sm text-muted-foreground">Davomiyligi: {plan.duration_days} kun</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Narxi</span>
                                <span className="font-semibold">{Number(plan.price).toLocaleString()} so'm</span>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Foydalanuvchilar</span>
                                <span className="font-semibold">{Number(plan.users_count ?? 0)}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Yaratilgan</p>
                                <p className="font-semibold text-xs">{plan.created_at || '—'}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex gap-2 pt-3">
                            <Button variant="secondary" className="flex-1 rounded-2xl text-xs">
                              <Eye className="mr-1 h-3 w-3" />
                              Boshqarish
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Courses Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Abonementlar</h2>
                  <p className="text-muted-foreground">Barcha abonement (tarif)larni boshqaring va nazorat qiling</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Dialog open={planOpen} onOpenChange={setPlanOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-2xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Yangi Abonement
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Yangi Abonement (tarif)</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddPlan} className="space-y-4">
                        {plansError && (
                          <div className="text-sm text-red-600">{plansError}</div>
                        )}
                        <div>
                          <label className="text-sm">Nomi</label>
                          <Input value={planName} onChange={(e) => setPlanName(e.target.value)} required placeholder="Masalan: Oylik Standart" />
                        </div>
                        <div>
                          <label className="text-sm">Davomiyligi (kun)</label>
                          <Input type="number" min={1} value={planDuration} onChange={(e) => setPlanDuration(Number(e.target.value))} required />
                        </div>
                        <div>
                          <label className="text-sm">Narxi</label>
                          <Input type="number" min={0} step="0.01" value={planPrice} onChange={(e) => setPlanPrice(Number(e.target.value))} required />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setPlanOpen(false)}>Bekor qilish</Button>
                          <Button type="submit" className="rounded-2xl" disabled={planSaving}>
                            {planSaving ? 'Saqlanmoqda...' : 'Saqlash'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {plansLoading && (
                  <div className="col-span-full text-center text-sm text-muted-foreground">Yuklanmoqda...</div>
                )}
                {!!plansError && (
                  <div className="col-span-full text-center text-sm text-red-600">{plansError}</div>
                )}
                {!plansLoading && !plansError && plans.length === 0 && (
                  <div className="col-span-full text-center text-sm text-muted-foreground">Abonementlar topilmadi</div>
                )}
                {plans.map((plan, index) => (
                  <motion.div
                    key={String(plan.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                              <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{plan.name}</CardTitle>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Davomiyligi: {plan.duration_days} kun • Narxi: {Number(plan.price).toLocaleString()} so'm</p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-2 pt-2 border-t text-sm">
                          <div>
                            <p className="text-muted-foreground">Yaratilgan</p>
                            <p className="font-semibold text-xs">{plan.created_at || '—'}</p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2">
                        <Button variant="secondary" className="flex-1 rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Boshqarish
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => openEditPlan(plan)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Tahrirlash
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {/* Edit Plan Dialog */}
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Abonementni Tahrirlash</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEditPlan} className="space-y-4">
                    {editError && (
                      <div className="text-sm text-red-600">{editError}</div>
                    )}
                    <div>
                      <label className="text-sm">Nomi</label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} required placeholder="Masalan: Oylik Standart" />
                    </div>
                    <div>
                      <label className="text-sm">Davomiyligi (kun)</label>
                      <Input type="number" min={1} value={editDuration} onChange={(e) => setEditDuration(Number(e.target.value))} required />
                    </div>
                    <div>
                      <label className="text-sm">Narxi</label>
                      <Input type="number" min={0} step="0.01" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} required />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditOpen(false)}>Bekor qilish</Button>
                      <Button type="submit" className="rounded-2xl" disabled={editSaving}>
                        {editSaving ? 'Saqlanmoqda...' : 'Yangilash'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              {/* Students Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">A'zolar</h2>
                  <p className="text-muted-foreground">Barcha a'zolar ro'yxati va ularning rivojlanishi</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl" onClick={() => setUsersFilterOpen((v) => !v)}>
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger asChild>
                      <Button className="rounded-2xl">
                        <UserPlus className="mr-2 h-4 w-4" />
                        A'zo Qo'shish
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Yangi A'zo Qo'shish</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMember} className="space-y-4">
                        {addError && (
                          <div className="text-sm text-red-600">{addError}</div>
                        )}
                        <div>
                          <label className="text-sm">Ism Familya</label>
                          <Input value={formName} onChange={(e) => setFormName(e.target.value)} required placeholder="Masalan: Aliyev Aziz" />
                        </div>
                        <div>
                          <label className="text-sm">Email</label>
                          <Input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required placeholder="example@mail.com" />
                        </div>
                        <div>
                          <label className="text-sm">Telefon</label>
                          <Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="+998 90 000 00 00" />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setAddOpen(false)}>Bekor qilish</Button>
                          <Button type="submit" className="rounded-2xl" disabled={addLoading}>
                            {addLoading ? 'Saqlanmoqda...' : 'Saqlash'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Filter Panel */}
              {usersFilterOpen && (
                <Card className="rounded-2xl border-2">
                  <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Qidirish</label>
                      <Input placeholder="Ism, email yoki telefon" value={usersFilterQuery} onChange={(e) => setUsersFilterQuery(e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Holat</label>
                      <Select value={usersFilterStatus} onValueChange={setUsersFilterStatus}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Holat" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Barchasi</SelectItem>
                          <SelectItem value="active">Faol</SelectItem>
                          <SelectItem value="pending">Kutilmoqda</SelectItem>
                          <SelectItem value="completed">Tugallangan</SelectItem>
                          <SelectItem value="draft">Tayyorlanmoqda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button variant="secondary" className="rounded-2xl" onClick={() => { setUsersFilterQuery(""); setUsersFilterStatus("all") }}>Tozalash</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Members Grid (from Supabase users) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {usersLoading && (
                  <div className="col-span-full text-center text-sm text-muted-foreground">Yuklanmoqda...</div>
                )}
                {!!usersError && (
                  <div className="col-span-full text-center text-sm text-red-600">{usersError}</div>
                )}
                {!usersLoading && !usersError && users.length === 0 && (
                  <div className="col-span-full text-center text-sm text-muted-foreground">A'zolar topilmadi</div>
                )}
                {users
                  .filter((u) => {
                    const q = usersFilterQuery.trim().toLowerCase()
                    const matchesQuery = q
                      ? [u.name, u.email, u.phone]
                          .filter(Boolean)
                          .some((v) => String(v).toLowerCase().includes(q))
                      : true
                    const matchesStatus = usersFilterStatus === 'all' ? true : (String(u.status || '').toLowerCase() === usersFilterStatus)
                    return matchesQuery && matchesStatus
                  })
                  .map((user, index) => (
                  <motion.div
                    key={String(user.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={user.avatar || '/placeholder.svg?height=40&width=40'} alt={user.name} />
                            <AvatarFallback>{formatInitials(user.name || '')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base leading-tight truncate">{user.name}</CardTitle>
                            {getStatusBadge((user.status || 'active'))}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Abonement</p>
                          <p className="font-medium text-sm">{user.course || '—'}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rivojlanish</span>
                            <span className="font-medium">{user.progress ?? 0}%</span>
                          </div>
                          <Progress value={Number(user.progress ?? 0)} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Davomad</p>
                            <p className="font-semibold">{user.attendance ?? 0}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Sertifikatlar</p>
                            <p className="font-semibold">{user.certificates ?? 0}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Oxirgi faollik</p>
                          <p className="font-medium text-xs">{user.last_activity || '—'}</p>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2 pt-3">
                        <Button variant="secondary" className="flex-1 rounded-2xl text-xs">
                          <Eye className="mr-1 h-3 w-3" />
                          Profil
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-2xl">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="space-y-6">
              {/* Certificates Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Sertifikatlar Boshqaruvi</h2>
                  <p className="text-muted-foreground">Barcha sertifikatlarni ko'ring, boshqaring va tekshiring</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button variant="outline" className="rounded-2xl">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Yangi Sertifikat
                  </Button>
                </div>
              </div>

              {/* Certificates Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Jami Sertifikatlar", value: "247", icon: <Award className="h-5 w-5" />, color: "text-blue-600" },
                  { title: "Berilgan", value: "189", icon: <CheckCircle className="h-5 w-5" />, color: "text-green-600" },
                  { title: "Tayyorlanmoqda", value: "45", icon: <Clock className="h-5 w-5" />, color: "text-yellow-600" },
                  { title: "QR Tekshirishlar", value: "1,247", icon: <QrCode className="h-5 w-5" />, color: "text-purple-600" },
                ].map((stat, index) => (
                  <Card key={index} className="rounded-3xl border-2 text-center">
                    <CardContent className="p-6">
                      <div className={cn("mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3", stat.color)}>
                        {stat.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Certificates List */}
              <Card className="rounded-3xl border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Sertifikatlar Ro'yxati</CardTitle>
                  <CardDescription>Barcha yaratilgan va berilgan sertifikatlar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificatesHistory.map((certificate, index) => (
                      <div key={certificate.id} className="flex items-center justify-between p-4 rounded-2xl border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Award className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{certificate.studentName}</h4>
                              {getStatusBadge(certificate.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{certificate.course}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {certificate.id} • {certificate.issueDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium">Ball: {certificate.score}</p>
                            <p className="text-xs text-muted-foreground">Baholar: {certificate.grade}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{certificate.downloads}</p>
                            <p className="text-xs text-muted-foreground">Yuklab olingan</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-2xl">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-2xl">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* assignments bo'limi olib tashlandi */}

          {activeTab === "reports" && (
            <div className="space-y-6">
              {/* Reports Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Hisobotlar va Tahlillar</h2>
                  <p className="text-muted-foreground">Zal faoliyati va natijalar bo'yicha batafsil ma'lumotlar</p>
                </div>
                <Button className="rounded-2xl">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Hisobot Eksport Qilish
                </Button>
              </div>

              {/* Report Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportCards.map((report, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={cn("p-3 rounded-2xl text-white", report.color)}>
                            {report.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.desc}</p>
                          </div>
                        </div>
                        <Button variant="secondary" className="w-full rounded-2xl">
                          <Eye className="mr-2 h-4 w-4" />
                          Hisobotni Ko'rish
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Moliyaviy Boshqaruv</h2>
                  <p className="text-muted-foreground">To'lovlar, daromad va xarajatlarni kuzatib boring</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtr
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    Yangi To'lov
                  </Button>
                </div>
              </div>

              {/* Top KPI cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-emerald-100">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                      </div>
                      <Badge className="rounded-xl">+12%</Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Oylik Daromad</p>
                      <p className="text-2xl font-bold">45,200,000 <span className="text-xs font-medium">UZS</span></p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <UserCheck className="h-5 w-5 text-primary" />
                      </div>
                      <Badge className="rounded-xl">+24</Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">To'langan O'quvchilar</p>
                      <p className="text-2xl font-bold">198 <span className="text-xs font-medium">ta</span></p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-orange-100">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <Badge className="rounded-xl">49 ta</Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Kutilayotgan To'lovlar</p>
                      <p className="text-2xl font-bold">12,500,000 <span className="text-xs font-medium">UZS</span></p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-red-100">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <Badge className="rounded-xl">-5%</Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Oylik Xarajatlar</p>
                      <p className="text-2xl font-bold">18,750,000 <span className="text-xs font-medium">UZS</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent payments */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Oxirgi To'lovlar</CardTitle>
                    <CardDescription>Eng so'nggi qabul qilingan to'lovlar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { initials: 'AJ', name: 'Abdullayev Jasur', plan: 'Frontend Development', ago: '1 soat oldin', amount: 2500000, status: 'To\'landi' },
                      { initials: 'KM', name: 'Karimova Malika', plan: 'Digital Marketing', ago: '3 soat oldin', amount: 2200000, status: 'To\'landi' },
                      { initials: 'RB', name: 'Rahmonov Bekzod', plan: 'Graphic Design', ago: '5 soat oldin', amount: 2500000, status: 'Kutilmoqda' },
                      { initials: 'ND', name: 'Nazarova Dilnoza', plan: 'Frontend Development', ago: '1 kun oldin', amount: 2500000, status: 'To\'landi' },
                    ].map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarFallback>{p.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{p.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{p.plan}</p>
                            <p className="text-xs text-muted-foreground">{p.ago}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-600">{p.amount.toLocaleString()} UZS</p>
                          <Badge variant="secondary" className="rounded-xl">{p.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Payments statistics */}
                <Card className="rounded-3xl border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">To'lovlar Statistikasi</CardTitle>
                    <CardDescription>Oylik to'lovlar tahlili</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[{label: 'Yanvar', value: 82}, {label: 'Fevral', value: 86}, {label: 'Mart', value: 87}, {label: 'Aprel', value: 90}].map((m) => (
                      <div key={m.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{m.label}</span>
                          <span>{m.value}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${m.value}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
                      <p className="text-sm text-muted-foreground">Sof foyda</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-emerald-700">26.45M UZS</p>
                        <Badge variant="secondary" className="rounded-xl">Joriy oy</Badge>
                      </div>
                    </div>
                    <div>
                      <Button variant="secondary" className="w-full rounded-2xl">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Hisobot Yuklab Olish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Settings Header */}
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Sozlamalar</h2>
                <p className="text-muted-foreground">Profilingizni va tizim sozlamalarini boshqaring</p>

                <Card className="max-w-md mx-auto rounded-3xl border-2">
                  <CardContent className="p-8 text-center space-y-4">
                    <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                      <AvatarFallback className="text-xl">AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">Admin User</h3>
                      <p className="text-sm text-muted-foreground">IT Academy Tashkent</p>
                      <p className="text-sm text-muted-foreground">admin@itacademy.uz</p>
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Edit className="mr-2 h-4 w-4" />
                        Profilni Tahrirlash
                      </Button>
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Shield className="mr-2 h-4 w-4" />
                        Xavfsizlik
                      </Button>
                      <Button variant="outline" className="w-full rounded-2xl">
                        <Settings className="mr-2 h-4 w-4" />
                        Tizim Sozlamalari
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={onLogout}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Chiqish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Settings Options */}
              <Card className="max-w-md mx-auto rounded-3xl border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Tizim Sozlamalari</CardTitle>
                  <CardDescription>Umumiy platforma sozlamalarini boshqaring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Bildirishnoma Sozlamalari</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Bell className="mr-2 h-4 w-4" />
                      Bildirishnomalarni Sozlash
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ma'lumotlar Zahirasi</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Cloud className="mr-2 h-4 w-4" />
                      Zahira Nusxasini Yaratish
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tashkilot Ma'lumotlari</p>
                    <Button variant="secondary" className="w-full rounded-2xl">
                      <Building className="mr-2 h-4 w-4" />
                      Tashkilotni Tahrirlash
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}