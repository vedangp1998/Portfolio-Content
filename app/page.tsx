"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Award,
  BookOpen,
  ChevronRight,
  Star,
  ExternalLink,
  ChevronLeft,
  Building2,
} from "lucide-react"

// Memoized components for better performance
const SkillCard = memo(
  ({
    icon: Icon,
    title,
    description,
    gradient,
  }: {
    icon: any
    title: string
    description: string
    gradient: string
  }) => (
    <Card className="group hover:shadow-xl transition-all duration-500 ease-out bg-white border-blue-100 hover:border-blue-200 hover:-translate-y-2 transform-gpu">
      <CardContent className="p-6 text-center">
        <div
          className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 ease-out`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  ),
)

const ToolCard = memo(
  ({
    icon: Icon,
    name,
    iconColor,
  }: {
    icon: any
    name: string
    iconColor: string
  }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 ease-out bg-white border-slate-200 hover:border-blue-200 hover:-translate-y-1 transform-gpu">
      <CardContent className="p-4 text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ease-out">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h5 className="font-medium text-slate-800 text-sm">{name}</h5>
      </CardContent>
    </Card>
  ),
)

const CompanyLogo = memo(({ name, description }: { name: string; description: string }) => (
  <Card className="group hover:shadow-xl transition-all duration-500 ease-out bg-white border-slate-200 hover:border-blue-200 hover:-translate-y-2 transform-gpu">
    <CardContent className="p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 ease-out">
        <Building2 className="h-10 w-10 text-white" />
      </div>
      <h4 className="font-bold text-slate-800 mb-2 text-lg">{name}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </CardContent>
  </Card>
))

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({})
  const intervalRefs = useRef<{ [key: number]: NodeJS.Timeout | null }>({})

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const sections = ["hero", "about", "skills", "companies", "work", "experience", "education", "contact"]
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const nextImage = useCallback((projectId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
    }))
  }, [])

  const prevImage = useCallback((projectId: number, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages,
    }))
  }, [])

  const startAutoRotation = useCallback(
    (projectId: number, totalImages: number) => {
      if (totalImages <= 1) return

      intervalRefs.current[projectId] = setInterval(() => {
        if (!isHovered[projectId]) {
          nextImage(projectId, totalImages)
        }
      }, 3000)
    },
    [nextImage, isHovered],
  )

  const stopAutoRotation = useCallback((projectId: number) => {
    if (intervalRefs.current[projectId]) {
      clearInterval(intervalRefs.current[projectId])
      intervalRefs.current[projectId] = null
    }
  }, [])

  const handleMouseEnter = useCallback(
    (projectId: number) => {
      setIsHovered((prev) => ({ ...prev, [projectId]: true }))
      stopAutoRotation(projectId)
    },
    [stopAutoRotation],
  )

  const handleMouseLeave = useCallback(
    (projectId: number, totalImages: number) => {
      setIsHovered((prev) => ({ ...prev, [projectId]: false }))
      startAutoRotation(projectId, totalImages)
    },
    [startAutoRotation],
  )

  useEffect(() => {
    workData.forEach((company) => {
      company.projects.forEach((project) => {
        if (project.images && project.images.length > 1) {
          startAutoRotation(project.id, project.images.length)
        }
      })
    })

    return () => {
      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [startAutoRotation])

  // Static data moved outside component for better performance
  const skills = [
    {
      title: "Content Marketing Strategy",
      description: "Strategic planning and execution of content campaigns",
      icon: Target,
      gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    {
      title: "SEO-Optimized Content",
      description: "Creating content that ranks and drives organic traffic",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-indigo-600 to-blue-700",
    },
    {
      title: "Website & Blog Content",
      description: "Engaging web copy and blog posts that convert",
      icon: BookOpen,
      gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    {
      title: "Social Media Content",
      description: "Compelling social media copy and campaign management",
      icon: Users,
      gradient: "bg-gradient-to-br from-slate-600 to-slate-700",
    },
    {
      title: "Video & Podcast Scripts",
      description: "Creative scriptwriting for multimedia content",
      icon: Star,
      gradient: "bg-gradient-to-br from-indigo-600 to-blue-700",
    },
    {
      title: "Digital Marketing",
      description: "Google Ads, Meta Ads, and performance marketing",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
  ]

  const tools = [
    { name: "SEMrush", icon: TrendingUp, color: "text-blue-600" },
    { name: "Ahrefs", icon: Target, color: "text-indigo-600" },
    { name: "Google Analytics", icon: TrendingUp, color: "text-blue-600" },
    { name: "Search Console", icon: Star, color: "text-slate-600" },
    { name: "WordPress", icon: BookOpen, color: "text-blue-600" },
    { name: "Shopify", icon: Users, color: "text-indigo-600" },
    { name: "Canva", icon: Star, color: "text-blue-600" },
    { name: "Adobe", icon: Award, color: "text-slate-600" },
  ]

  const companies = [
    { name: "BEIRMAN CAPITAL", description: "Trading Education & Financial Content" },
    { name: "MARKET INVESTOPEDIA", description: "Financial Market Analysis" },
    { name: "CARLOSANDCOMPANY", description: "Investment Advisory Content" },
    { name: "KHEONI VENTURE", description: "Sustainable Wellness Brand" },
    { name: "INFOWIND", description: "Technology Content Creation" },
  ]

  const experiences = [
    {
      company: "MALTAR SERVICE PVT.LTD",
      position: "Content Strategist & Digital Marketing Associate",
      duration: "April 2025 - Present",
      achievements: [
        "Created and optimized blog content across tech and financial niches, contributing to a 80% increase in organic website traffic within two months",
        "Researched and wrote timely news articles that improved site relevance and helped attract over 2,500 monthly readers",
        "Developed content calendars and collaborated with design teams to align visuals with copy for stronger brand messaging",
        "Managed Instagram and LinkedIn content strategy, resulting in a 60% increase in followers and a 35% boost in engagement rates",
        "Applied SEO best practices to increase average blog dwell time by 25% and reduce bounce rates",
        "Conducted keyword research and performance tracking using tools like Google Analytics and SEMrush to refine content strategies",
        "Collaborated with cross-functional teams to align digital campaigns with brand goals and audience insights",
      ],
    },
    {
      company: "KHEONI VENTURE PVT.LTD",
      position: "Content Writer & Digital Marketing Associate",
      duration: "Dec 2024 - Mar 2025",
      achievements: [
        "Content Creation: Wrote and edited blog posts, product descriptions, social media captions, and magazine columns, ensuring brand consistency and SEO optimization",
        "Social Media Management: Managed multi-platform presence (Instagram, Facebook, LinkedIn, X), creating and scheduling engaging content to boost follower growth",
        "Email Marketing: Executed targeted email campaigns, managing subscriber lists and analyzing performance metrics",
        "E-commerce & Operations: Optimized the brand's online storefront and collaborated with teams to streamline marketing and operational strategies",
      ],
    },
    {
      company: "VARLYQ TECHNOLOGIES PVT.LTD",
      position: "Content Writer & Research Expert",
      duration: "Feb 2023 - Aug 2024",
      achievements: [
        "Created and managed high-quality content, including articles, blogs, and technical documentation",
        "Applied SEO best practices to optimize content for search visibility and engagement",
        "Collaborated with developers and marketing teams to ensure alignment with brand messaging",
        "Edited and proofread content to maintain consistency and clarity",
        "Managed project deadlines, ensuring timely content delivery",
      ],
    },
  ]

  const workData = [
    {
      company: "BEIRMAN CAPITAL",
      description: "Trading education and financial market content across multiple platforms",
      projects: [
        {
          id: 11,
          title: "Beirman Capital Blogs",
          description: "Professional trading strategies and market analysis content",
          link: "https://beirmancapital.com/blogs/",
          category: "Blog Content",
          platform: "Website",
          images: [
            `/placeholder.svg?height=180&width=320&query=beirman capital blog website screenshot`,
            `/placeholder.svg?height=180&width=320&query=beirman capital trading analysis blog post`,
          ],
        },
        {
          id: 12,
          title: "Beirman Capital Instagram",
          description: "Visual trading content and market updates for retail traders",
          link: "https://www.instagram.com/beirmancapital/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
          images: [
            `/placeholder.svg?height=180&width=320&query=beirman capital instagram profile screenshot`,
            `/placeholder.svg?height=180&width=320&query=beirman capital instagram trading posts`,
            `/placeholder.svg?height=180&width=320&query=beirman capital instagram stories highlights`,
          ],
        },
        {
          id: 13,
          title: "Beirman Capital MENA",
          description: "Regional Instagram presence for Middle East and North Africa markets",
          link: "https://www.instagram.com/beirmancapital.mena/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
          images: [`/placeholder.svg?height=180&width=320&query=beirman capital mena instagram profile`],
        },
        {
          id: 14,
          title: "Carlos & Company Instagram",
          description: "Investment advisory social media content and client engagement",
          link: "https://www.instagram.com/carlosandcompany/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
          images: [`/placeholder.svg?height=180&width=320&query=carlos and company instagram profile screenshot`],
        },
        {
          id: 1,
          title: "Beirman Capital LinkedIn Post",
          description: "Fair Value Gap trading strategy content for professional traders",
          link: "https://www.linkedin.com/posts/beirmancapital_beirmancapital-fairvaluegap-fvgtrading-activity-7351229829582643201-JKtQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
          images: [
            `/placeholder.svg?height=180&width=320&query=beirman capital linkedin post fair value gap trading`,
            `/placeholder.svg?height=180&width=320&query=beirman capital linkedin engagement metrics`,
          ],
        },
      ],
    },
    {
      company: "MARKET INVESTOPEDIA",
      description: "Financial market analysis and investment education content",
      projects: [
        {
          id: 8,
          title: "Market News Section",
          description: "Daily market updates and financial news analysis",
          link: "https://marketinvestopedia.com/market-news/",
          category: "News Content",
          platform: "Website",
          images: [
            `/placeholder.svg?height=180&width=320&query=market investopedia news section website`,
            `/placeholder.svg?height=180&width=320&query=market investopedia daily market updates`,
          ],
        },
        {
          id: 9,
          title: "Investment Blogs",
          description: "Educational blog content about trading strategies and market analysis",
          link: "https://marketinvestopedia.com/blogs/",
          category: "Blog Content",
          platform: "Website",
          images: [`/placeholder.svg?height=180&width=320&query=market investopedia blog section screenshot`],
        },
        {
          id: 3,
          title: "Market Investopedia Forex Post",
          description: "Forex market analysis and trading insights for retail investors",
          link: "https://www.linkedin.com/posts/market-investopedia_forex-activity-7351211357070864384-OW2M?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
          images: [
            `/placeholder.svg?height=180&width=320&query=market investopedia linkedin forex post`,
            `/placeholder.svg?height=180&width=320&query=market investopedia forex analysis charts`,
          ],
        },
      ],
    },
    {
      company: "CARLOSANDCOMPANY",
      description: "Financial advisory content and investment strategy blogs",
      projects: [
        {
          id: 10,
          title: "Carlos & Company Blog",
          description: "Investment advisory content and financial planning strategies",
          link: "https://carlosandcompany.com/blog/",
          category: "Blog Content",
          platform: "Website",
          images: [
            `/placeholder.svg?height=180&width=320&query=carlos and company blog website screenshot`,
            `/placeholder.svg?height=180&width=320&query=carlos and company investment advisory content`,
            `/placeholder.svg?height=180&width=320&query=carlos and company financial planning blog posts`,
          ],
        },
        {
          id: 2,
          title: "Carlos & Company Portfolio Post",
          description: "Portfolio diversification and forex signals educational content",
          link: "https://www.linkedin.com/posts/carlosandcompany_portfolio-diversification-forexsignals-activity-7351229349066399744-AbbO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
          images: [`/placeholder.svg?height=180&width=320&query=carlos and company linkedin portfolio post`],
        },
      ],
    },
    {
      company: "KHEONI VENTURE PVT.LTD",
      description: "Sustainable wellness brand content and digital marketing across multiple platforms",
      projects: [
        {
          id: 4,
          title: "Kheoni Website",
          description: "Main website content and product descriptions for sustainable wellness products",
          link: "https://www.kheoni.com/?srsltid=AfmBOooQVyrMIMfcOKAuPpO5ElllI2IItJUKkUQStBKSIOrXXphOtGhf",
          category: "Website Content",
          platform: "Website",
          images: [
            `/placeholder.svg?height=180&width=320&query=kheoni website homepage screenshot`,
            `/placeholder.svg?height=180&width=320&query=kheoni product pages sustainable wellness`,
            `/placeholder.svg?height=180&width=320&query=kheoni website content strategy`,
          ],
        },
        {
          id: 5,
          title: "Kheoni LinkedIn Company Page",
          description: "Professional brand presence and B2B content for sustainable wellness",
          link: "https://www.linkedin.com/company/kheoni-sustainable-wellness/",
          category: "LinkedIn Management",
          platform: "LinkedIn",
          images: [`/placeholder.svg?height=180&width=320&query=kheoni linkedin company page screenshot`],
        },
        {
          id: 6,
          title: "Kheoni Instagram",
          description: "Visual content strategy and social media management for wellness community",
          link: "https://www.instagram.com/kheoni_wellness/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
          images: [
            `/placeholder.svg?height=180&width=320&query=kheoni instagram profile wellness content`,
            `/placeholder.svg?height=180&width=320&query=kheoni instagram posts sustainable products`,
            `/placeholder.svg?height=180&width=320&query=kheoni instagram stories wellness tips`,
          ],
        },
      ],
    },
    {
      company: "INFOWIND",
      description: "Technology blog content creation and technical writing",
      projects: [
        {
          id: 7,
          title: "InfoWind Tech Blogs",
          description: "Technical blog posts and industry insights for technology solutions",
          link: "https://www.infowindtech.com/blogs/",
          category: "Blog Content",
          platform: "Website",
          images: [
            `/placeholder.svg?height=180&width=320&query=infowind tech blog website screenshot`,
            `/placeholder.svg?height=180&width=320&query=infowind technology articles content`,
          ],
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-slate-800">Narinderpreet Kaur</div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "companies", label: "Companies" },
                { id: "work", label: "Work" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${activeSection === item.id ? "text-blue-600" : "text-slate-600"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                NK
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">Narinderpreet Kaur</h1>
              <p className="text-xl sm:text-2xl text-blue-600 font-semibold mb-6">
                Content Strategist & Digital Marketing Associate
              </p>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                Creative and detail-oriented Content Writer & Digital Marketer with 2+ years of experience crafting
                compelling blog posts, website copy, and marketing content. Passionate about driving engagement,
                increasing organic traffic, and creating data-driven content that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300"
                >
                  Get In Touch

                </Button>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Skilled in SEO, content strategy, and brand storytelling, with expertise in social media marketing, email
              campaigns, and performance analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800">80% Traffic Increase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Achieved significant organic traffic growth through strategic content optimization
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800">2,500+ Monthly Readers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Built engaged audience through timely and relevant content creation</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <Target className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <CardTitle className="text-slate-800">60% Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Managed social media strategy resulting in substantial engagement boost
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Skills & Expertise</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive skill set in content creation and digital marketing with proven results across multiple
              industries
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Core Skills Grid */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                <Award className="mr-3 h-6 w-6 text-blue-600" />
                Core Skills
              </h3>
              <p className="text-slate-600">Strategic content creation and marketing expertise</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  icon={skill.icon}
                  title={skill.title}
                  description={skill.description}
                  gradient={skill.gradient}
                />
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                <Star className="mr-3 h-6 w-6 text-indigo-600" />
                Tools & Platforms
              </h3>
              <p className="text-slate-600">Professional tools and platforms I work with daily</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} icon={tool.icon} name={tool.name} iconColor={tool.color} />
              ))}
            </div>
          </div>


        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Trusted by Leading Companies</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proud to have collaborated with innovative companies across finance, technology, and wellness industries
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {companies.map((company, index) => (
              <CompanyLogo key={index} name={company.name} description={company.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">My Work Portfolio</h2>
            <p className="text-lg text-slate-600">
              Comprehensive showcase of content creation across multiple industries and platforms
            </p>
          </div>

          <div className="space-y-12">
            {workData.map((company, companyIndex) => (
              <div key={companyIndex} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">{company.company}</h3>
                  <p className="text-slate-600 max-w-3xl mx-auto">{company.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.projects.map((project) => (
                    <Card
                      key={project.id}
                      className="group cursor-pointer hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden bg-white border-slate-200 hover:border-blue-200 hover:-translate-y-2 transform-gpu"
                      onClick={() => window.open(project.link, "_blank")}
                      onMouseEnter={() => project.images && project.images.length > 1 && handleMouseEnter(project.id)}
                      onMouseLeave={() =>
                        project.images &&
                        project.images.length > 1 &&
                        handleMouseLeave(project.id, project.images!.length)
                      }
                    >
                      <div className="relative">
                        {project.images && project.images.length > 0 && (
                          <div className="relative">
                            <img
                              src={project.images[currentImageIndex[project.id] || 0]}
                              alt={project.title}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />

                            {/* Carousel Controls - Only show if more than 1 image */}
                            {project.images.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    prevImage(project.id, project.images!.length)
                                  }}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    nextImage(project.id, project.images!.length)
                                  }}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>

                                {/* Image Indicators with Progress */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                  {project.images.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex((prev) => ({
                                          ...prev,
                                          [project.id]: index,
                                        }))
                                      }}
                                      className={`relative w-2 h-2 rounded-full transition-all duration-300 ${index === (currentImageIndex[project.id] || 0)
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/75"
                                        }`}
                                    >
                                      {/* Progress ring for active indicator */}
                                      {index === (currentImageIndex[project.id] || 0) && !isHovered[project.id] && (
                                        <div className="absolute inset-0 rounded-full border border-white/50 animate-pulse" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="bg-white rounded-full p-3 shadow-lg">
                              <ExternalLink className="h-6 w-6 text-slate-800" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge
                            className={`text-xs ${project.platform === "LinkedIn"
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : project.platform === "Instagram"
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-slate-700 hover:bg-slate-800 text-white"
                              }`}
                          >
                            {project.platform}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-slate-300 text-slate-600 bg-white/90">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base group-hover:text-blue-600 transition-colors duration-300 text-slate-800 line-clamp-2">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-600 line-clamp-3">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{project.platform}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-white hover:bg-blue-600 p-2 transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {companyIndex < workData.length - 1 && (
                  <div className="flex justify-center pt-8">
                    <div className="w-24 h-px bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Professional Experience</h2>
            <p className="text-lg text-slate-600">Track record of delivering results across diverse industries</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 transform-gpu"
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-800">{exp.company}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-blue-600 mt-1">
                        {exp.position}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-slate-500 mt-2 sm:mt-0">
                      <Calendar className="mr-2 h-4 w-4" />
                      {exp.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Education</h2>
            <p className="text-lg text-slate-600">Academic foundation in law and management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg text-slate-800">B.A.LL.B (HONS.)</CardTitle>
                <CardDescription className="text-slate-600">2017-2022 | 7.80 CGPA</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Department of Law, Prestige Institute of Management and Research, Indore
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-lg text-slate-800">12th Standard</CardTitle>
                <CardDescription className="text-slate-600">2015 | 65.50%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Gyan Vihar Senior Secondary Public School, CBSE BOARD, Bhensoda Mandi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-slate-600 mb-2" />
                <CardTitle className="text-lg text-slate-800">10th Standard</CardTitle>
                <CardDescription className="text-slate-600">2013 | 7.00 CGPA</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Gyan Vihar Senior Secondary Public School, CBSE BOARD, Bhensoda Mandi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-600">Ready to collaborate on your next project</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-xl">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <a
                    href="mailto:narinderpreetkaur6@gmail.com"
                    className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <Mail className="h-5 w-5 text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <p className="text-blue-600 hover:underline">narinderpreetkaur6@gmail.com</p>
                    </div>
                  </a>

                  <Separator className="bg-slate-200" />

                  <a
                    href="tel:+918094429077"
                    className="flex items-center p-4 rounded-lg hover:bg-indigo-50 transition-all duration-300 group"
                  >
                    <Phone className="h-5 w-5 text-indigo-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="font-semibold text-slate-800">Phone</p>
                      <p className="text-indigo-600 hover:underline">+91 8094429077</p>
                    </div>
                  </a>

                  <Separator className="bg-slate-200" />

                  <div className="flex items-center p-4">
                    <MapPin className="h-5 w-5 text-slate-600 mr-4" />
                    <div>
                      <p className="font-semibold text-slate-800">Location</p>
                      <p className="text-slate-600">Indore, Madhya Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-300">© 2025 Narinderpreet Kaur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
