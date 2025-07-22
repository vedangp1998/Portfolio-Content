"use client"

import { useState, useEffect, useCallback, memo } from "react"
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
  Building2,
} from "lucide-react"

import Logo1 from './assets/Beriman capital.png';
import Logo2 from './assets/market investopedia.png';
import Logo3 from './assets/carlos & company.png';
import Logo4 from './assets/kheoni.png';
import Logo5 from './assets/infowind.jpg';
import Logo6 from './assets/prestige.jpg'
import Logo7 from './assets/CBSE.png'


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
    <Card className="group hover:shadow-2xl transition-all duration-500 ease-out bg-white/80 backdrop-blur-sm border-white/20 hover:border-indigo-200 hover:-translate-y-3 transform-gpu relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 text-center relative z-10">
        <div
          className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-lg`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h4 className="font-semibold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          {description}
        </p>
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
    <Card className="group hover:shadow-xl transition-all duration-300 ease-out bg-white/80 backdrop-blur-sm border-white/20 hover:border-indigo-200 hover:-translate-y-2 transform-gpu">
      <CardContent className="p-4 text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h5 className="font-medium text-slate-800 text-sm group-hover:text-indigo-600 transition-colors duration-300">
          {name}
        </h5>
      </CardContent>
    </Card>
  ),
)

const CompanyLogo = memo(({ name, description, logoUrl, width, height }: { name: string; description: string; logoUrl?: string; width?: string; height?: string }) => (
  <Card className="group hover:shadow-2xl transition-all duration-500 ease-out bg-white/90 backdrop-blur-sm border-white/30 hover:border-indigo-200 hover:-translate-y-4 transform-gpu relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <CardContent className="p-8 text-center relative z-10">
      <div className="bg-gradient-to-br from-black to-indigo-50 flex items-center justify-center py-4 px-2 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-lg overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl || "/placeholder.svg"} alt={`${name} Logo`} width={width} height={height} className="object-contain" />
        ) : (
          <Building2 className="h-10 w-10 text-indigo-600" />
        )}
      </div>
      <h4 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-indigo-600 transition-colors duration-300">
        {name}
      </h4>
      <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{description}</p>
    </CardContent>
  </Card>
))

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
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

  // Static data moved outside component for better performance
  const skills = [
    {
      title: "Content Marketing Strategy",
      description: "Strategic planning and execution of content campaigns",
      icon: Target,
      gradient: "bg-gradient-to-br from-indigo-600 to-purple-700",
    },
    {
      title: "SEO-Optimized Content",
      description: "Creating content that ranks and drives organic traffic",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-purple-600 to-pink-700",
    },
    {
      title: "Website & Blog Content",
      description: "Engaging web copy and blog posts that convert",
      icon: BookOpen,
      gradient: "bg-gradient-to-br from-indigo-600 to-blue-700",
    },
    {
      title: "Social Media Content",
      description: "Compelling social media copy and campaign management",
      icon: Users,
      gradient: "bg-gradient-to-br from-purple-600 to-indigo-700",
    },
    {
      title: "Video & Podcast Scripts",
      description: "Creative scriptwriting for multimedia content",
      icon: Star,
      gradient: "bg-gradient-to-br from-pink-600 to-purple-700",
    },
    {
      title: "Digital Marketing",
      description: "Google Ads, Meta Ads, and performance marketing",
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
  ]

  const tools = [
    { name: "SEMrush", icon: TrendingUp, color: "text-indigo-600" },
    { name: "Ahrefs", icon: Target, color: "text-purple-600" },
    { name: "Google Analytics", icon: TrendingUp, color: "text-blue-600" },
    { name: "Search Console", icon: Star, color: "text-pink-600" },
    { name: "WordPress", icon: BookOpen, color: "text-indigo-600" },
    { name: "Shopify", icon: Users, color: "text-purple-600" },
    { name: "Canva", icon: Star, color: "text-blue-600" },
    { name: "Adobe", icon: Award, color: "text-pink-600" },
  ]

  const companies = [
    {
      name: "BEIRMAN CAPITAL",
      description: "Trading Education & Financial Content",
      logoUrl: Logo1,
      width: "60px",
      height: "60px"
    },
    {
      name: "MARKET INVESTOPEDIA",
      description: "Financial Market Analysis",
      logoUrl: Logo2,
      width: "60px",
      height: "60px"
    },
    {
      name: "CARLOS & COMPANY",
      description: "Investment Advisory Content",
      logoUrl: Logo3,
      width: "700px",
      height: "80px"
    },
    {
      name: "KHEONI VENTURE",
      description: "Sustainable Wellness Brand",
      logoUrl: Logo4,
      width: "120px",
      height: "120px"
    },
    {
      name: "INFOWIND",
      description: "Technology Content Creation",
      logoUrl: Logo5,
      width: "180px",
      height: "180px"
    },
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
        },
        {
          id: 12,
          title: "Beirman Capital Instagram",
          description: "Visual trading content and market updates for retail traders",
          link: "https://www.instagram.com/beirmancapital/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
        },
        {
          id: 13,
          title: "Beirman Capital MENA",
          description: "Regional Instagram presence for Middle East and North Africa markets",
          link: "https://www.instagram.com/beirmancapital.mena/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
        },
        {
          id: 14,
          title: "Carlos & Company Instagram",
          description: "Investment advisory social media content and client engagement",
          link: "https://www.instagram.com/carlosandcompany/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
        },
        {
          id: 1,
          title: "Beirman Capital LinkedIn Post",
          description: "Fair Value Gap trading strategy content for professional traders",
          link: "https://www.linkedin.com/posts/beirmancapital_beirmancapital-fairvaluegap-fvgtrading-activity-7351229829582643201-JKtQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
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
        },
        {
          id: 9,
          title: "Investment Blogs",
          description: "Educational blog content about trading strategies and market analysis",
          link: "https://marketinvestopedia.com/blogs/",
          category: "Blog Content",
          platform: "Website",
        },
        {
          id: 3,
          title: "Market Investopedia Forex Post",
          description: "Forex market analysis and trading insights for retail investors",
          link: "https://www.linkedin.com/posts/market-investopedia_forex-activity-7351211357070864384-OW2M?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
        },
      ],
    },
    {
      company: "CARLOS & COMPANY",
      description: "Financial advisory content and investment strategy blogs",
      projects: [
        {
          id: 10,
          title: "Carlos & Company Blog",
          description: "Investment advisory content and financial planning strategies",
          link: "https://carlosandcompany.com/blog/",
          category: "Blog Content",
          platform: "Website",
        },
        {
          id: 2,
          title: "Carlos & Company Portfolio Post",
          description: "Portfolio diversification and forex signals educational content",
          link: "https://www.linkedin.com/posts/carlosandcompany_portfolio-diversification-forexsignals-activity-7351229349066399744-AbbO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADHCe-ABvd1Rd5RWCmkK_L--yqClnhDVEzc",
          category: "LinkedIn Content",
          platform: "LinkedIn",
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
        },
        {
          id: 5,
          title: "Kheoni LinkedIn Company Page",
          description: "Professional brand presence and B2B content for sustainable wellness",
          link: "https://www.linkedin.com/company/kheoni-sustainable-wellness/",
          category: "LinkedIn Management",
          platform: "LinkedIn",
        },
        {
          id: 6,
          title: "Kheoni Instagram",
          description: "Visual content strategy and social media management for wellness community",
          link: "https://www.instagram.com/kheoni_wellness/?hl=en",
          category: "Instagram Management",
          platform: "Instagram",
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
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Navigation - Glass Effect */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 z-50 shadow-lg shadow-indigo-500/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </div>
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
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${activeSection === item.id
                    ? "text-indigo-600 scale-105 font-semibold"
                    : "text-slate-600 hover:text-indigo-600"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section - Gradient Background */}
      <section
        id="hero"
        className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
                NK
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
                Narinderpreet Kaur
              </h1>
              <p className="text-xl sm:text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-6">
                Content Strategist & Social Media Executive
              </p>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Creative and detail-oriented Content Writer & Digital Marketer with 2+ years of experience crafting
                compelling blog posts, website copy, and marketing content. Passionate about driving engagement,
                increasing organic traffic, and creating data-driven content that converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 rounded-xl"
                >
                  Get In Touch
                  {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
                </Button>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 rounded-xl hover:border-indigo-300"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Section - Subtle Gradient */}
      <section
        id="about"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Skilled in SEO, content strategy, and brand storytelling, with expertise in social media marketing, email
              campaigns, and performance analytics.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                  80% Traffic Increase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  Achieved significant organic traffic growth through strategic content optimization
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                  2,500+ Monthly Readers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  Built engaged audience through timely and relevant content creation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-pink-500/5 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-800 group-hover:text-pink-600 transition-colors duration-300">
                  60% Follower Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  Managed social media strategy resulting in substantial engagement boost
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Skills Section - Light Background */}
      <section
        id="skills"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/30 via-white to-indigo-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive skill set in content creation and digital marketing with proven results across multiple
              industries
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Core Skills Grid */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                <Award className="mr-3 h-6 w-6 text-indigo-600" />
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
                <Star className="mr-3 h-6 w-6 text-purple-600" />
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

          {/* Skills Stats */}
          {/* <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-lg shadow-indigo-500/25">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">7+</h4>
              <p className="text-slate-600">Core Skills Mastered</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-lg shadow-purple-500/25">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">8+</h4>
              <p className="text-slate-600">Professional Tools</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-lg shadow-pink-500/25">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-2">2+</h4>
              <p className="text-slate-600">Years Experience</p>
            </div>
          </div> */}
        </div>
      </section>

      {/* 4. Companies Section - Subtle Background */}
      <section
        id="companies"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              Built for the Best
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Proud to have collaborated with innovative companies across finance, technology, and wellness industries
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {companies.map((company, index) => (
              <CompanyLogo
                key={index}
                name={company.name}
                description={company.description}
                logoUrl={typeof company.logoUrl === "string" ? company.logoUrl : company.logoUrl?.src}
                width={company.width}
                height={company.height}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Work Section - Improved Gradient */}
      <section
        id="work"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">My Work Portfolio</h2>
            <p className="text-lg text-indigo-200 leading-relaxed">
              Comprehensive showcase of content creation across multiple industries and platforms
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-12">
            {workData.map((company, companyIndex) => (
              <div key={companyIndex} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                    {company.company}
                  </h3>
                  <p className="text-indigo-100 max-w-3xl mx-auto">{company.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.projects.map((project) => (
                    <Card
                      key={project.id}
                      className="group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 ease-out overflow-hidden bg-white/95 backdrop-blur-sm border-white/20 hover:border-indigo-300 hover:-translate-y-3 transform-gpu"
                      onClick={() => window.open(project.link, "_blank")}
                    >
                      <div className="relative p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2">
                              <Badge
                                className={`text-xs transition-all duration-300 ${project.platform === "LinkedIn"
                                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                  : project.platform === "Instagram"
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                    : "bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 text-white"
                                  }`}
                              >
                                {project.platform}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs border-indigo-200 text-indigo-600 bg-indigo-50/50"
                              >
                                {project.category}
                              </Badge>
                            </div>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full p-2 shadow-lg">
                                <ExternalLink className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </div>

                          <h4 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 mb-3 line-clamp-2">
                            {project.title}
                          </h4>

                          <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300 mb-4 line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-500 font-medium">{project.platform}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-indigo-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 p-2 transition-all duration-300 rounded-lg"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {companyIndex < workData.length - 1 && (
                  <div className="flex justify-center pt-8">
                    <div className="w-24 h-px bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Experience Section - Light Background */}
      <section
        id="experience"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Track record of delivering results across diverse industries
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu group"
              >
                <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-purple-50/30 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {exp.company}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-1 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                        {exp.position}
                      </CardDescription>
                    </div>
                    <div className="flex items-center text-slate-500 mt-2 sm:mt-0 group-hover:text-slate-600 transition-colors duration-300">
                      <Calendar className="mr-2 h-4 w-4" />
                      {exp.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 relative z-10">
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0 group-hover:text-purple-600 transition-colors duration-300" />
                        <span className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Education Section - Subtle Background */}
      <section
        id="education"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              Education
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">Academic foundation in law and management</p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader className="text-center">
                <div className="w-25 h-25 p-2 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg overflow-hidden">
                  <img
                    src={Logo6.src}
                    alt="Prestige Institute Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <CardTitle className="text-lg text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                  B.A.LL.B (HONS.)
                </CardTitle>
                <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  2017-2022 | 7.80 CGPA
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                  Department of Law, Prestige Institute of Management and Research, Indore
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-purple-500/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader className="text-center">
                <div className="w-25 h-25 p-2 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg overflow-hidden">
                  <img
                    src={Logo7.src}
                    alt="Gyan Vihar School Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <CardTitle className="text-lg text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                  12th Standard
                </CardTitle>
                <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  2015 | 65.50%
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                  Gyan Vihar Senior Secondary Public School, CBSE BOARD, Bhensoda Mandi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg shadow-pink-500/5 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu group">
              <CardHeader className="text-center">
                <div className="w-25 h-25 p-2 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg overflow-hidden">
                  <img
                    src={Logo7.src}
                    alt="Gyan Vihar School Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <CardTitle className="text-lg text-slate-800 group-hover:text-pink-600 transition-colors duration-300">
                  10th Standard
                </CardTitle>
                <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  2013 | 7.00 CGPA
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                  Gyan Vihar Senior Secondary Public School, CBSE BOARD, Bhensoda Mandi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 8. Contact Section - Final Gradient */}
      <section
        id="contact"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">Ready to collaborate on your next project</p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-2xl shadow-indigo-500/10 transition-all duration-500 group">
              <CardContent className="pt-6 relative z-10">
                <div className="space-y-6">
                  <a
                    href="mailto:narinderpreetkaur6@gmail.com"
                    className="flex items-center p-4 rounded-xl hover:bg-indigo-50/50 transition-all duration-300 group/item hover:scale-105 transform-gpu"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300 shadow-lg">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover/item:text-indigo-600 transition-colors duration-300">
                        Email
                      </p>
                      <p className="text-indigo-600 hover:underline group-hover/item:text-purple-600 transition-colors duration-300">
                        narinderpreetkaur6@gmail.com
                      </p>
                    </div>
                  </a>

                  <Separator className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

                  <a
                    href="tel:+918094429077"
                    className="flex items-center p-4 rounded-xl hover:bg-purple-50/50 transition-all duration-300 group/item hover:scale-105 transform-gpu"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300 shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover/item:text-purple-600 transition-colors duration-300">
                        Phone
                      </p>
                      <p className="text-purple-600 hover:underline group-hover/item:text-pink-600 transition-colors duration-300">
                        +91 8094429077
                      </p>
                    </div>
                  </a>

                  <Separator className="bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200" />

                  <div className="flex items-center p-4 group/item">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-indigo-700 rounded-xl flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform duration-300 shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover/item:text-pink-600 transition-colors duration-300">
                        Location
                      </p>
                      <p className="text-slate-600 group-hover/item:text-slate-700 transition-colors duration-300">
                        Indore, Madhya Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Dark with Gradient */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 Narinderpreet Kaur. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
