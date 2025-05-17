"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Minus,
  Menu,
  Clock,
  Wheat,
  Award,
  MapPin,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Users,
  ArrowRight,
  X,
  Plus,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

// Define types for our data structures
interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  tag?: string
  availability?: string
  notes: string[]
  quantity?: number
}

interface FeaturedProduct {
  id: number
  name: string
  rating: number
  reviews: string
  price: string
  image: string
}

interface Category {
  id: string
  name: string
  description: string
  image: string
  color: string
}

interface Testimonial {
  id: number
  name: string
  text: string
  image: string
}

interface RecipeIngredient {
  amount: string
  ingredient: string
  note: string
}

interface ProcessStep {
  title: string
  description: string
  details: string[]
  icon: React.ReactNode
}

interface Chef {
  name: string
  title: string
  bio: string
  image: string
  specialty: string
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<Product[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [activeCategory, setActiveCategory] = useState("bread")
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [featuredProduct, setFeaturedProduct] = useState<FeaturedProduct>({
    id: 1,
    name: "Golden Crust Sourdough",
    rating: 5,
    reviews: "2.5k reviews",
    price: "$8",
    image: "/images/breads.png",
  })

  // Category data with descriptions and images
  const categories: Category[] = [
    {
      id: "bread",
      name: "Artisan Bread",
      description: "Handcrafted sourdough and specialty loaves made with traditional techniques and organic flour.",
      image: "/images/artisan.png",
      color: "amber-400",
    },
    {
      id: "pastries",
      name: "French Pastries",
      description: "Delicate, buttery pastries with flaky layers and rich fillings, baked fresh each morning.",
      image: "/images/pastries.png",
      color: "rose-400",
    },
    {
      id: "cakes",
      name: "Celebration Cakes",
      description: "Custom cakes for special occasions, crafted with premium ingredients and artistic decoration.",
      image: "/images/cakes.png",
      color: "sky-400",
    },
    {
      id: "sandwiches",
      name: "Gourmet Sandwiches",
      description: "Fresh-made sandwiches on our artisan bread with locally sourced, seasonal ingredients.",
      image: "/images/sandwiches.png",
      color: "emerald-400",
    },
    {
      id: "cookies",
      name: "Cookies & Treats",
      description: "Small-batch cookies, brownies, and sweet treats to satisfy your cravings any time of day.",
      image: "/images/cookies.png",
      color: "purple-400",
    },
  ]

  // Update active index when category changes
  useEffect(() => {
    const index = categories.findIndex((cat) => cat.id === activeCategory)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [activeCategory])

  // Detect scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [heroRef.current, productsRef.current, aboutRef.current, processRef.current, contactRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () =>
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
  }, [])

  // Products data
  const products: Record<string, Product[]> = {
    bread: [
      {
        id: 1,
        name: "Golden Crust Sourdough",
        description: "24-hour fermented with our house starter",
        price: "$8",
        image: "/images/sourdough.png",
        tag: "Bestseller",
        availability: "Fresh Out",
        notes: ["🌾 Whole Wheat", "🧂 Sea Salt"],
      },
      {
        id: 2,
        name: "Crumb Queen Ciabatta",
        description: "Crispy crust, tender inside",
        price: "$4",
        image: "/images/queen.png",
        availability: "Ready",
        notes: ["🫒 Olive Oil", "🌿 Herbs"],
      },
      {
        id: 3,
        name: "Flour Child Rye",
        description: "Dark and dense with caraway",
        price: "$7",
        image: "/images/rye.png",
        tag: "Limited",
        availability: "Rising Soon",
        notes: ["🌱 Caraway", "🍯 Molasses"],
      },
      {
        id: 4,
        name: "Hearth & Soul Multigrain",
        description: "Seven grains and seeds",
        price: "$9",
        image: "/placeholder.svg?height=300&width=300",
        availability: "Ready",
        notes: ["🌻 Sunflower", "🌾 Flax"],
      },
    ],
    pastries: [
      {
        id: 5,
        name: "Butter Believer Croissant",
        description: "Filled with almond cream",
        price: "$4.50",
        image: "/images/croissant.png",
        tag: "Bestseller",
        availability: "Fresh Out",
        notes: ["🧈 French Butter", "🥛 Cream"],
      },
      {
        id: 6,
        name: "Chocolate Dreamweaver",
        description: "Buttery layers with dark chocolate",
        price: "$4.25",
        image: "/images/chocolate.png",
        availability: "Ready",
        notes: ["🍫 Dark Chocolate", "🧈 Butter"],
      },
      {
        id: 7,
        name: "Swirl Seeker Cinnamon Roll",
        description: "Swirled with cinnamon sugar",
        price: "$4.75",
        image: "/images/cinammonroll.png",
        availability: "Rising Soon",
        notes: ["🍯 Honey", "🌰 Cinnamon"],
      },
      {
        id: 8,
        name: "Citrus Sunrise Morning Bun",
        description: "Citrus-scented with a sugar coating",
        price: "$4.50",
        image: "/placeholder.svg?height=300&width=300",
        availability: "Ready",
        notes: ["🍊 Orange Zest", "🍋 Lemon"],
      },
    ],
    cakes: [
      {
        id: 9,
        name: "Midnight Craving Chocolate",
        description: "Single-origin dark chocolate ganache",
        price: "$28.00",
        image: "/images/chocolate2.png",
        availability: "Ready",
        notes: ["🍫 70% Cocoa", "🥛 Cream"],
      },
      {
        id: 10,
        name: "Garden Party Carrot",
        description: "With cream cheese frosting",
        price: "$26.00",
        image: "/images/wild.png",
        tag: "New",
        availability: "Fresh Out",
        notes: ["🥕 Carrots", "🧀 Cream Cheese"],
      },
      {
        id: 11,
        name: "Cloud Nine Cheesecake",
        description: "New York style with berry compote",
        price: "$30.00",
        image: "/images/cheesecake.png",
        availability: "Ready",
        notes: ["🧀 Cream Cheese", "🍓 Berries"],
      },
      {
        id: 12,
        name: "Orchard Harvest Apple Tart",
        description: "With local apples and cinnamon",
        price: "$24.00",
        image: "/placeholder.svg?height=300&width=300",
        availability: "Rising Soon",
        notes: ["🍎 Local Apples", "🌰 Cinnamon"],
      },
    ],
    sandwiches: [
      {
        id: 13,
        name: "Avocado Delight",
        description: "Fresh avocado with sprouts on sourdough",
        price: "$12.00",
        image: "/images/sand.png",
        availability: "Ready",
        notes: ["🥑 Avocado", "🌱 Sprouts"],
      },
      {
        id: 14,
        name: "Roast Beef Classic",
        description: "Slow-roasted beef with horseradish cream",
        price: "$14.00",
        image: "/images/sand2.png",
        tag: "Popular",
        availability: "Fresh Out",
        notes: ["🥩 Beef", "🌿 Herbs"],
      },
    ],
    cookies: [
      {
        id: 15,
        name: "Chocolate Chunk",
        description: "Crisp edges with a chewy center",
        price: "$3.50",
        image: "/images/cookie.png",
        availability: "Ready",
        notes: ["🍫 Chocolate", "🧂 Sea Salt"],
      },
      {
        id: 16,
        name: "Oatmeal Raisin",
        description: "Hearty oats with plump raisins",
        price: "$3.25",
        image: "/images/cookies2.png",
        availability: "Ready",
        notes: ["🌾 Oats", "🍇 Raisins"],
      },
    ],
  }

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "The sourdough here reminds me of my grandmother's recipe. Perfect crust, tender inside. Will be back every weekend!",
      image: "/images/2.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "Their bread has become a staple in our home. The attention to detail and quality ingredients really shine through.",
      image: "/images/1.png",
    },
    {
      id: 3,
      name: "John Rodriguez",
      text: "I ordered a birthday cake and it exceeded all expectations. Not only was it beautiful, but it tasted amazing!",
      image: "/images/3.png",
    },
  ]

  // Recipe ingredients
  const recipeIngredients: RecipeIngredient[] = [
    {
      amount: "1 cup",
      ingredient: "tradition",
      note: "passed down through generations of bakers",
    },
    {
      amount: "2 tbsp",
      ingredient: "innovation",
      note: "just enough to keep things interesting",
    },
    {
      amount: "3 cups",
      ingredient: "passion",
      note: "the essential ingredient in everything we make",
    },
    {
      amount: "A pinch",
      ingredient: "patience",
      note: "for the perfect fermentation",
    },
    {
      amount: "To taste",
      ingredient: "craftsmanship",
      note: "honed over decades of practice",
    },
  ]

  // Process steps
  const processSteps: ProcessStep[] = [
    {
      title: "Sourcing",
      description: "We select only the finest organic ingredients from local farms and trusted suppliers.",
      details: [
        "Organic flour from heritage wheat varieties",
        "Filtered water for optimal fermentation",
        "Sea salt harvested from pristine waters",
        "Natural yeast cultures developed in-house",
      ],
      icon: <Wheat className="h-8 w-8" />,
    },
    {
      title: "Fermentation",
      description: "Our doughs develop flavor through long, slow fermentation processes.",
      details: [
        "24-48 hour cold fermentation",
        "Natural levain for sourdough breads",
        "Temperature-controlled proofing rooms",
        "Hand-monitoring throughout the process",
      ],
      icon: <Clock className="h-8 w-8" />,
    },
    {
      title: "Craftsmanship",
      description: "Each loaf is shaped by hand with meticulous attention to detail.",
      details: [
        "Traditional hand-shaping techniques",
        "Artful scoring patterns unique to each bread",
        "Stone hearth ovens for perfect crust development",
        "Small batches to ensure quality",
      ],
      icon: <Award className="h-8 w-8" />,
    },
  ]

  // Our Chefs data
  const chefs: Chef[] = [
    {
      name: "Emma Laurent",
      title: "Head Baker",
      bio: "With 15 years of experience in artisanal baking, Emma brings traditional European techniques to every loaf.",
      image: "/images/chef2.png",
      specialty: "Sourdough & Rye Breads",
    },
    {
      name: "Marcus Chen",
      title: "Pastry Chef",
      bio: "Trained in Paris, Marcus combines classic French pastry techniques with innovative flavor combinations.",
      image: "/images/chef1.png",
      specialty: "Croissants & Laminated Doughs",
    },
    {
      name: "Sofia Albert",
      title: "Cake Artist",
      bio: "Sofia's background in fine arts gives her a unique approach to cake design and decoration.",
      image: "/images/chef3.png",
      specialty: "Custom Celebration Cakes",
    },
    {
      name: "James Wilson",
      title: "Bread Master",
      bio: "James specializes in long-fermentation breads and ancient grain varieties.",
      image: "/images/chef4.png",
      specialty: "Whole Grain & Seeded Loaves",
    },
  ]

  // Carousel navigation functions
  const nextCategory = () => {
    const nextIndex = (activeIndex + 1) % categories.length
    setActiveCategory(categories[nextIndex].id)
    setActiveIndex(nextIndex)
  }

  const prevCategory = () => {
    const prevIndex = (activeIndex - 1 + categories.length) % categories.length
    setActiveCategory(categories[prevIndex].id)
    setActiveIndex(prevIndex)
  }

  // Cart functions
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }

    // Show cart briefly when adding items
    setCartOpen(true)
    setTimeout(() => {
      setCartOpen(false)
    }, 2000)
  }

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      return
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number.parseFloat(item.price.replace("$", ""))
        return total + price * (item.quantity || 1)
      }, 0)
      .toFixed(2)
  }

  // Function to get ring class based on category and state
  const getRingClass = (category: Category, isActive: boolean, isHovered: boolean) => {
    const baseClass = "ring"
    const sizeClass = isActive ? "ring-4" : isHovered ? "ring-3" : "ring-2"

    // Use a safe approach for dynamic color classes
    let colorClass = ""
    switch (category.color) {
      case "amber-400":
        colorClass = "ring-amber-400"
        break
      case "rose-400":
        colorClass = "ring-rose-400"
        break
      case "sky-400":
        colorClass = "ring-sky-400"
        break
      case "emerald-400":
        colorClass = "ring-emerald-400"
        break
      case "purple-400":
        colorClass = "ring-purple-400"
        break
      default:
        colorClass = "ring-gray-400"
    }

    return `${baseClass} ${sizeClass} ${colorClass}`
  }

  return (
    <main className="relative bg-white text-forest-900 min-h-screen font-body">
      {/* Navigation - With background when scrolled */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-forest-900 py-3 shadow-md" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "font-display tracking-widest text-2xl flex items-center gap-2",
              scrolled ? "text-cream" : "text-forest-900",
            )}
          >
            <div className="w-8 h-8 bg-forest-800 rounded-md flex items-center justify-center">
              <Wheat className="h-5 w-5 text-cream" />
            </div>
            Levure
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex items-center gap-8"
            >
              {[
                { id: "hero", label: "The Oven" },
                { id: "products", label: "Today's Rise" },
                { id: "about", label: "Our Recipe" },
                { id: "process", label: "How We Rise" },
                { id: "contact", label: "Find Our Hearth" },
              ].map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "uppercase text-xs tracking-widest transition-all cursor-pointer",
                    scrolled ? "text-cream" : "text-forest-900",
                    activeSection === section.id ? "opacity-100" : "opacity-70 hover:opacity-100",
                  )}
                >
                  {section.label}
                </a>
              ))}
            </motion.div>

            {/* Accessible Cart Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center"
                onClick={() => setCartOpen(!cartOpen)}
                aria-label={`Shopping cart with ${getTotalItems()} items`}
              >
                <ShoppingCart className="h-5 w-5 text-white" strokeWidth={2} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className={scrolled ? "text-cream" : "text-forest-900"}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-forest-100 p-0 w-full max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-forest-100">
                    <div className="font-display tracking-widest text-xl flex items-center gap-2 text-forest-900">
                      <div className="w-7 h-7 bg-forest-800 rounded-md flex items-center justify-center">
                        <Wheat className="h-4 w-4 text-cream" />
                      </div>
                      Levure
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto py-6">
                    <nav className="flex flex-col space-y-1">
                      {[
                        { id: "hero", label: "The Oven", icon: <Wheat className="h-4 w-4" /> },
                        { id: "products", label: "Today's Rise", icon: <ShoppingBag className="h-4 w-4" /> },
                        { id: "about", label: "Our Recipe", icon: <Users className="h-4 w-4" /> },
                        { id: "process", label: "How We Rise", icon: <Clock className="h-4 w-4" /> },
                        { id: "contact", label: "Find Our Hearth", icon: <MapPin className="h-4 w-4" /> },
                      ].map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={cn(
                            "flex items-center gap-3 px-6 py-3 text-forest-800 hover:bg-forest-50 transition-colors",
                            activeSection === section.id && "bg-forest-50 text-forest-900 font-medium",
                          )}
                        >
                          {section.icon}
                          <span>{section.label}</span>
                          {activeSection === section.id && (
                            <div className="ml-auto w-1 h-6 bg-forest-800 rounded-full" />
                          )}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div className="p-6 border-t border-forest-100">
                    <Button
                      className="w-full bg-forest-800 hover:bg-forest-700 text-white flex items-center gap-2"
                      onClick={() => setCartOpen(true)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      View Cart ({getTotalItems()})
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 z-50 w-80 bg-white rounded-xl shadow-xl border border-forest-100 overflow-hidden"
          >
            <div className="p-4 bg-forest-50 flex justify-between items-center border-b border-forest-100">
              <h3 className="font-medium text-forest-900">Your Cart ({getTotalItems()})</h3>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-80 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-forest-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-forest-100">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-forest-50 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-forest-900">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-forest-800 text-sm">{item.price}</p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-forest-50"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-4 text-center">{item.quantity || 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-forest-50"
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-forest-400 hover:text-forest-900"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-forest-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${getTotalPrice()}</span>
                </div>
                <Button className="w-full bg-forest-800 hover:bg-forest-700 text-white">Checkout</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Modern Clean Design */}
      <section id="hero" ref={heroRef} className="pt-40 pb-52 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn("max-w-xl", isMobile ? "px-2" : "pl-6")}
            >
              <div className="inline-block mb-4 px-3 py-1 bg-forest-50 rounded-full text-forest-800 text-xs font-medium tracking-wider">
                Artisanal Bakery • Est. 2023
              </div>

              <h1
                className={cn(
                  "flex font-display mb-6 text-forest-800 leading-tight",
                  isMobile ? "text-4xl" : "text-5xl md:text-7xl",
                )}
              >
                Taste The Difference
              </h1>
              <p className={cn("text-forest-700/80 mb-10", isMobile ? "text-base" : "text-lg md:text-xl")}>
                Our artisanal approach to food
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-forest-800 hover:bg-forest-700 text-white px-8 py-6 rounded-md cursor-pointer"
                  onClick={() => setCartOpen(true)}
                >
                  Order now
                </Button>
                <Link href="#products" className="cursor-pointer">
                  <Button
                    variant="outline"
                    className="border-forest-800 text-forest-800 hover:bg-forest-50 px-8 py-6 rounded-md cursor-pointer"
                  >
                    Menu
                  </Button>
                </Link>
              </div>

              {/* Featured Products Thumbnails */}
              <div className="mt-16 flex gap-6">
                {products.bread.slice(0, 2).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-forest-100 shadow-sm">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-1 -right-1 bg-forest-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Featured Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute top-1/4 left-6 bg-white/90 text-teal-700 font-medium px-6 py-2 rounded-full shadow-md z-10">
                Freshly Baked
              </div>
              {/* Decorative curved lines */}
              {!isMobile && (
                <>
                  <svg
                    className="absolute -left-20 top-1/2 transform -translate-y-1/2 w-40 h-80 text-amber-400/30"
                    viewBox="0 0 100 200"
                    fill="none"
                  >
                    <path d="M100,0 C60,40 0,60 0,100 C0,140 60,160 100,200" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <svg
                    className="absolute -right-10 top-1/3 transform -translate-y-1/2 w-40 h-60 text-red-400/20"
                    viewBox="0 0 100 150"
                    fill="none"
                  >
                    <path d="M0,0 C40,30 100,50 100,75 C100,100 40,120 0,150" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </>
              )}

              {/* Main product image */}
              <div className="relative rounded-full overflow-hidden border-8 border-white shadow-xl mx-auto max-w-md">
                <Image
                  src={featuredProduct.image || "/placeholder.svg"}
                  alt={featuredProduct.name}
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={cn(
                  "absolute -bottom-16 right-0 bg-forest-800 text-white shadow-lg rounded-2xl p-6",
                  isMobile ? "max-w-[220px] p-4 -bottom-12" : "max-w-[280px]",
                )}
              >
                <div className={cn("grid grid-cols-2 gap-6", isMobile && "gap-3")}>
                  <div className="text-center">
                    <p className={cn("font-display text-amber-400", isMobile ? "text-3xl" : "text-4xl")}>24h</p>
                    <p className={cn("text-cream/80 mt-1", isMobile && "text-xs")}>Fermentation</p>
                  </div>
                  <div className="text-center">
                    <p className={cn("font-display text-amber-400", isMobile ? "text-3xl" : "text-4xl")}>5</p>
                    <p className={cn("text-cream/80 mt-1", isMobile && "text-xs")}>Ingredients</p>
                  </div>
                  <div className="text-center">
                    <p className={cn("font-display text-amber-400", isMobile ? "text-3xl" : "text-4xl")}>350°</p>
                    <p className={cn("text-cream/80 mt-1", isMobile && "text-xs")}>Baking Temp</p>
                  </div>
                  <div className="text-center">
                    <p className={cn("font-display text-amber-400", isMobile ? "text-3xl" : "text-4xl")}>15</p>
                    <p className={cn("text-cream/80 mt-1", isMobile && "text-xs")}>Varieties</p>
                  </div>
                </div>
              </motion.div>

              {/* Modern featured product highlight - only shown on desktop */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-12 right-0 md:right-10 left-0 md:left-auto mx-auto md:mx-0 max-w-sm backdrop-blur-md bg-white/80 border border-white/20 rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200"></div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section - "Our Categories" - Enhanced Smooth Carousel */}
      <section id="products" ref={productsRef} className="py-20 md:py-32 bg-cream relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMDMgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-48 bg-forest-300/50 hidden md:block"></div>
              <h2 className="text-4xl md:text-5xl font-display mx-6 text-forest-800">Our Categories</h2>
              <div className="h-px w-48 bg-forest-300/50 hidden md:block"></div>
            </div>
            <p className="text-forest-700/80 max-w-xl mx-auto">
              Distinguished by its chewy crust, feather-light interior, and topside slashes
            </p>
          </motion.div>

          {/* Enhanced Smooth Carousel with Hover Effects */}
          <div className="relative w-full mx-auto mb-8 overflow-hidden pb-8">
            {/* Main carousel container */}
            <div className="relative overflow-hidden pb-8 max-w-none">
              {/* Carousel track */}
              <div className="flex items-center justify-center h-[400px]">
                {/* Carousel items */}
                {categories.map((category, index) => {
                  // Calculate position relative to active item
                  const position = index - activeIndex

                  // Determine if this is the active item
                  const isActive = index === activeIndex

                  // Determine if this item is being hovered
                  const isHovered = index === hoveredIndex

                  // Calculate z-index (active item should be on top)
                  const zIndex = isActive ? 20 : 10 - Math.abs(position)

                  // Calculate scale (active item is larger, hovered items get a boost)
                  const scale = isActive ? 1 : isHovered ? 0.85 : 0.7

                  // Calculate opacity (items further from active are more transparent)
                  const opacity = isActive ? 1 : isHovered ? 0.8 : 0.5

                  // Calculate horizontal position - increased spacing for more dramatic effect
                  const x = position * 300 // Wider spacing between items

                  return (
                    <motion.div
                      key={category.id}
                      className="absolute transform cursor-pointer"
                      style={{
                        zIndex,
                        filter: isActive ? "none" : isHovered ? "blur(0.5px)" : "blur(1px)",
                      }}
                      animate={{
                        x,
                        scale,
                        opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        opacity: { duration: 0.2 },
                      }}
                      onClick={() => setActiveCategory(category.id)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      whileHover={{ scale: isActive ? 1.05 : 0.85 }}
                    >
                      <div
                        className={`relative rounded-2xl overflow-hidden ${getRingClass(category, isActive, isHovered)} shadow-lg transition-all duration-300`}
                        style={{ width: isActive ? "400px" : "300px", height: isActive ? "300px" : "250px" }}
                      >
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className={`object-cover transition-transform duration-700 ${isActive || isHovered ? "scale-110" : "scale-100"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-white font-medium text-xl md:text-2xl mb-2">{category.name}</h3>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="text-white/80 text-sm md:text-base max-w-xs"
                            >
                              {category.description}
                            </motion.p>
                          )}
                          {isHovered && !isActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center text-white/90 text-sm mt-2"
                            >
                              <span>View Category</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Enhanced navigation arrows */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
              <motion.button
                onClick={prevCategory}
                className="bg-white/80 hover:bg-white text-forest-800 rounded-full p-4 shadow-md transition-all"
                aria-label="Previous category"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="h-8 w-8" />
              </motion.button>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
              <motion.button
                onClick={nextCategory}
                className="bg-white/80 hover:bg-white text-forest-800 rounded-full p-4 shadow-md transition-all"
                aria-label="Next category"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-8 w-8" />
              </motion.button>
            </div>

            {/* Improved pagination indicator */}
            <div className="flex justify-center items-center mt-8">
              <div className="relative w-64 h-2 bg-forest-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-forest-800 rounded-full"
                  initial={{ width: `${(1 / categories.length) * 100}%` }}
                  animate={{
                    width: `${(1 / categories.length) * 100}%`,
                    x: `${activeIndex * (100 / categories.length)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          </div>

          {/* Featured category products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products[activeCategory]?.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.tag && (
                    <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full z-10">
                      {product.tag}
                    </div>
                  )}
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 relative">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100"></div>

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-forest-900">{product.name}</h3>
                      <span className="text-lg font-semibold text-forest-800">{product.price}</span>
                    </div>
                    <p className="text-forest-700 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {product.notes.slice(0, 2).map((note, i) => (
                          <span
                            key={i}
                            className="inline-block bg-forest-50 text-forest-800 text-xs px-2 py-1 rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <Button size="sm" className="w-8 h-8 p-0 rounded-full bg-forest-800 hover:bg-forest-700">
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All button removed as requested */}
          </motion.div>
        </div>
      </section>

      {/* About Section - "Kneaded With Care" - Modern Redesign */}
      <section id="about" ref={aboutRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-amber-500 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-forest-500 translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-3 py-1 bg-forest-50 rounded-full text-forest-800 text-xs font-medium tracking-wider">
              OUR STORY
            </div>
            <h2 className="text-4xl md:text-6xl font-display mb-4 text-forest-900">Kneaded With Care</h2>
            <p className="text-lg text-forest-800/80 max-w-2xl mx-auto">
              Our story, like our bread, has been crafted with care and attention to detail.
            </p>
          </motion.div>

          {/* Modern grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left column - Image with overlays */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/bakery.png" alt="Baker working with dough" fill className="object-cover" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-forest-900/20 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-xs">
                    <h3 className="text-xl font-display text-forest-900 mb-3">Our Philosophy</h3>
                    <p className="text-forest-700 text-sm leading-relaxed">
                      "We believe bread is more than sustenance—it's community, tradition, and innovation baked into
                      every loaf."
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center mr-3">
                        <Wheat className="h-5 w-5 text-forest-800" />
                      </div>
                      <span className="text-forest-900 font-medium">Since 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right column - Recipe and content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7 flex flex-col"
            >
              {/* Top section - Our Secret */}
              <div className="bg-forest-50 rounded-2xl p-8 shadow-sm flex-grow">
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl font-display text-forest-900">Our Secret Recipe</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recipeIngredients.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-forest-800 font-medium text-sm">{index + 1}</span>
                        </div>
                        <div className="ml-3">
                          <span className="text-forest-500 text-xs uppercase tracking-wider">Amount</span>
                          <p className="text-forest-900 font-medium">{item.amount}</p>
                        </div>
                      </div>
                      <h4 className="text-xl font-medium text-forest-900 mb-1 capitalize">{item.ingredient}</h4>
                      <p className="text-forest-600 text-sm">{item.note}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/#chefs" className="cursor-pointer">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className="border-forest-800 text-forest-800 hover:bg-forest-50 px-6 py-5 rounded-xl"
                      >
                        Meet Our Team
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - "How We Rise" with Our Chefs instead of timeline */}
      <section id="process" ref={processRef} className="py-20 md:py-32 bg-cream relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-forest-900">How We Rise</h2>
            <p className="text-lg text-forest-800/80 max-w-2xl mx-auto">
              No shortcuts. Just time, love, and heat. From flour to fresh-out-the-oven, here's our bread's journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-forest-50 rounded-lg p-8 shadow-sm border border-forest-100"
                whileHover={{ y: -10 }}
              >
                <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-forest-800">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-display mb-4 text-forest-900">{step.title}</h3>
                <p className="text-forest-800 mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-forest-500 mr-2">•</span>
                      <span className="text-forest-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Our Chefs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <div id="chefs" className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-24 bg-forest-300/50 hidden md:block"></div>
                <div className="bg-forest-100 w-16 h-16 rounded-full flex items-center justify-center mx-6 text-forest-800">
                  <Users className="h-8 w-8" />
                </div>
                <div className="h-px w-24 bg-forest-300/50 hidden md:block"></div>
              </div>
              <h2 className="text-4xl font-display mb-4 text-forest-900">Our Chefs</h2>
              <p className="text-lg text-forest-800/80 max-w-2xl mx-auto">
                Meet the talented team behind our delicious creations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {chefs.map((chef, index) => (
                <motion.div
                  key={chef.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="h-64 overflow-hidden relative">
                    <Image
                      src={chef.image || "/placeholder.svg"}
                      alt={chef.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-light">{chef.bio}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-forest-900">{chef.name}</h3>
                    <p className="text-amber-600 text-sm mb-2">{chef.title}</p>
                    <div className="flex items-center mt-4">
                      <div className="h-px flex-grow bg-forest-100"></div>
                      <span className="px-3 text-xs text-forest-600 font-medium">SPECIALTY</span>
                      <div className="h-px flex-grow bg-forest-100"></div>
                    </div>
                    <p className="text-center text-forest-800 text-sm mt-2">{chef.specialty}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Styled like handwritten recipe notes */}
      <section className="py-20 md:py-32 bg-forest-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display mb-6 text-forest-900">Notes From Our Customers</h2>
            <p className="text-lg text-forest-800/80 max-w-2xl mx-auto">
              What our community has to say about our baked goods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-cream p-8 rounded-lg shadow-md border border-forest-200 font-handwritten relative"
                whileHover={{
                  y: -5,
                  rotate: index % 2 === 0 ? -3 : 3,
                }}
              >
                {/* Improved contrast for better readability */}
                <div className="absolute inset-0 bg-cream/70 rounded-lg"></div>

                <div className="relative z-10">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-forest-400 text-forest-400" />
                    ))}
                  </div>

                  <p className="text-forest-900 text-xl mb-6 leading-relaxed">"{testimonial.text}"</p>

                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-forest-800">— {testimonial.name}</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 text-forest-400 text-2xl z-20">✻</div>
                <div className="absolute bottom-2 left-2 text-forest-400 text-2xl z-20">✻</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - "Find Our Hearth" - Smaller and Sleeker */}
      <section id="contact" ref={contactRef} className="py-8 bg-forest-600 text-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-display mb-2">Find Our Hearth</h2>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-forest-300 flex-shrink-0" />
                <p className="font-light">123 Bakery Street, New York, NY 10001</p>
              </div>
            </div>

            <div className="md:w-1/3 flex flex-col items-center">
              <div className="bg-forest-700/50 rounded-lg p-3 text-sm w-full">
                <div className="flex justify-between items-center mb-1 pb-1 border-b border-forest-500/50">
                  <span>Wed - Fri</span>
                  <span>7:00 AM — 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sat - Sun</span>
                  <span>8:00 AM — 2:00 PM</span>
                </div>
              </div>
              <p className="text-xs text-forest-300 mt-2 italic">Closed Monday & Tuesday</p>
            </div>

            <div className="md:w-1/3 flex flex-col md:items-end">
              <div className="flex items-center gap-4 mb-2">
                <a href="mailto:hello@flourbakery.com" className="text-sm hover:text-forest-300 transition-colors">
                  hello@flourbakery.com
                </a>
                <a href="tel:+12125550123" className="text-sm hover:text-forest-300 transition-colors">
                  (212) 555-0123
                </a>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-cream text-forest-900 hover:bg-cream/90 rounded-full px-6 py-2 text-sm">
                  Get Directions
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Sleek */}
      <footer className="py-3 bg-white border-t border-forest-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-forest-800 rounded-md flex items-center justify-center">
                <Wheat className="h-3 w-3 text-cream" />
              </div>
              <span className="text-xs text-forest-800 font-medium">FLOUR © {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram">
                  <div className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center hover:bg-forest-100 transition-colors">
                    <span className="text-forest-800 text-xs">IG</span>
                  </div>
                </a>
                <a href="#" aria-label="Twitter">
                  <div className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center hover:bg-forest-100 transition-colors">
                    <span className="text-forest-800 text-xs">TW</span>
                  </div>
                </a>
              </div>
              <span className="text-xs text-forest-400">Terms & Privacy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl grid md:grid-cols-2 gap-4 p-6 rounded-lg bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full z-10"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="relative h-[200px] md:h-[250px]">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-display mb-1 text-forest-900">{selectedProduct.name}</h2>
                <p className="text-sm opacity-70 mb-3 text-forest-700">{selectedProduct.description}</p>
                <div className="text-xl mb-4 text-forest-900">{selectedProduct.price}</div>

                <div className="mb-4">
                  <h3 className="text-xs uppercase tracking-wider opacity-70 mb-1">Ingredients</h3>
                  <p className="text-sm font-light text-forest-800">
                    Organic flour, filtered water, sea salt, natural yeast culture, and time.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="mt-auto bg-forest-900 text-cream hover:bg-forest-800 font-display"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                  >
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
