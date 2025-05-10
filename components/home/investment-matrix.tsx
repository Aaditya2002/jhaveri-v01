"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export default function InvestmentMatrix() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const { ref: sectionRef, timeSpent, engagementScore } = useSectionTracking(
    "investment-philosophy",
    "Investment Philosophy",
    "Our structured approach to wealth management built on three fundamental pillars"
  )

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoverState, setHoverState] = useState<string | null>(null)
  const [userInteracted, setUserInteracted] = useState(false)

  const categories = [
    {
      id: "wealth-creation",
      title: "Wealth Creation",
      subtitle: "Long-term portfolios",
      description:
        "Strategic investments designed for substantial long-term capital appreciation through carefully selected growth opportunities.",
      cta: "Build Long-Term Wealth",
      color: "#0A2342", // Navy
      hoverColor: "rgba(10, 35, 66, 0.9)",
      textColor: "#FFFFFF",
      position: { index: 0 }
    },
    {
      id: "wealth-preservation",
      title: "Wealth Preservation",
      subtitle: "Liquid portfolios",
      description:
        "Conservative strategies focused on protecting your capital while providing steady returns that outpace inflation.",
      cta: "Preserve Your Capital",
      color: "#2D3142", // Charcoal
      hoverColor: "rgba(45, 49, 66, 0.9)",
      textColor: "#FFFFFF",
      position: { index: 1 }
    },
    {
      id: "high-yield",
      title: "High Yield Investments",
      subtitle: "Regular cashflow",
      description:
        "Alternative investment opportunities that generate consistent income streams through carefully vetted illiquid assets.",
      cta: "Generate Steady Cashflow",
      color: "#D5A021", // Gold
      hoverColor: "rgba(213, 160, 33, 0.9)",
      textColor: "#0A2342",
      position: { index: 2 }
    },
  ]

  const handleCategoryHover = (id: string | null) => {
    setHoverState(id)
  }

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id === activeCategory ? null : id)
    setUserInteracted(true)
  }

  useEffect(() => {
    if (inView && !activeCategory && !userInteracted) {
      const timer = setTimeout(() => {
        setActiveCategory("wealth-creation")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [inView, activeCategory, userInteracted])

  // Debug logging
  useEffect(() => {
    if (inView) {
      console.log("Investment Matrix is in view")
    }
  }, [inView])

  const triangleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.3 + (index * 0.2),
        ease: [0.215, 0.61, 0.355, 1]
      }
    }),
  }

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  }

  const centerLogoVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.2,
        ease: [0.175, 0.885, 0.32, 1.275]  // Custom easing for elegant pop
      }
    }
  }
  
  // Calculate positions based on triangle layout
  const getTriangleCoordinates = () => {
    const radius = 160;
    const centerX = 240;
    const centerY = 220;
    
    // Calculate vertices of an equilateral triangle
    return [
      { x: centerX, y: centerY - radius }, // Top
      { x: centerX - radius * 0.866, y: centerY + (radius * 0.5) }, // Bottom left
      { x: centerX + radius * 0.866, y: centerY + (radius * 0.5) }, // Bottom right
    ];
  }
  
  const trianglePoints = getTriangleCoordinates();
  
  // Center point
  const centerPoint = { x: 240, y: 220 };

  return (
    <section 
      ref={ref} 
      id="investment-philosophy"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
          ref={sectionRef}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-navy mb-5">Investment Philosophy</h2>
          <p className="text-charcoal/80 text-lg max-w-3xl mx-auto">
            Our structured approach to wealth management is built on three fundamental pillars,
            each designed to fulfill a distinct aspect of your financial objectives.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center">
          {/* Mobile View */}
          <div className="md:hidden w-full space-y-6 mb-12">
            {categories.map((category) => (
              <motion.div
                key={`mobile-${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + category.position.index * 0.2 }}
                className="bg-white border border-gray-200 shadow-lg p-6 cursor-pointer"
                style={{
                  borderLeft: `6px solid ${category.color}`,
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px',
                  transform: activeCategory === category.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <h3 className="font-serif text-xl text-navy mb-2">{category.title}</h3>
                <p className="text-gold text-sm mb-3">{category.subtitle}</p>
                <p className="text-charcoal/80 text-sm mb-4">{category.description}</p>
                <Button 
                  className="rounded-sm text-sm py-2"
                  style={{ 
                    backgroundColor: category.color,
                    color: category.textColor
                  }}
                >
                  {category.cta}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Desktop View - Triangle Matrix */}
          <div className="hidden md:block relative" style={{ height: '580px', width: '100%' }}>
            <svg 
              viewBox="0 0 480 480" 
              className="w-full max-w-3xl mx-auto"
              style={{ filter: "drop-shadow(0px 10px 30px rgba(10, 35, 66, 0.15))" }}
            >
              {/* Connecting lines */}
              <motion.g
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {/* Line from center to each node */}
                {trianglePoints.map((point, index) => (
                  <motion.line
                    key={`line-${index}`}
                    x1={centerPoint.x}
                    y1={centerPoint.y}
                    x2={point.x}
                    y2={point.y}
                    stroke={categories[index].color}
                    strokeWidth="2"
                    strokeDasharray="1,3"
                    variants={lineVariants}
                    custom={index}
                    style={{
                      opacity: hoverState === categories[index].id || activeCategory === categories[index].id ? 1 : 0.6,
                      transition: "opacity 0.3s ease"
                    }}
                  />
                ))}
                
                {/* Triangle connecting three points */}
                <motion.path
                  d={`M ${trianglePoints[0].x} ${trianglePoints[0].y} 
                       L ${trianglePoints[1].x} ${trianglePoints[1].y} 
                       L ${trianglePoints[2].x} ${trianglePoints[2].y} Z`}
                  fill="none"
                  stroke="#0A2342"
                  strokeWidth="2"
                  variants={lineVariants}
                  opacity="0.3"
                />
              </motion.g>

              {/* Center logo */}
              <motion.g
                variants={centerLogoVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <circle
                  cx={centerPoint.x}
                  cy={centerPoint.y}
                  r="48"
                  fill="#0A2342" // Navy
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#glow)"
                />
                <text
                  x={centerPoint.x}
                  y={centerPoint.y - 12}
                  textAnchor="middle"
                  className="font-serif"
                  fill="#FFFFFF"
                  style={{ fontSize: '18px', fontWeight: 500 }}
                >
                  Jhaveri
                </text>
                <text
                  x={centerPoint.x}
                  y={centerPoint.y + 16}
                  textAnchor="middle"
                  className="font-serif"
                  fill="#FFFFFF"
                  style={{ fontSize: '18px', fontWeight: 500 }}
                >
                  Matrix
                </text>
              </motion.g>

              {/* Category nodes */}
              {categories.map((category, index) => {
                const point = trianglePoints[index];
                const isActive = activeCategory === category.id;
                return (
                  <motion.g 
                    key={category.id}
                    custom={index}
                    variants={triangleVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    onClick={() => handleCategoryClick(category.id)}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={() => handleCategoryHover(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="42"
                      fill={category.color}
                      style={{ 
                        transition: "all 0.3s ease",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        transformOrigin: `${point.x}px ${point.y}px`,
                        filter: isActive || hoverState === category.id 
                          ? "drop-shadow(0 0 12px rgba(213, 160, 33, 0.4))" 
                          : "none"
                      }}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="38"
                      fill={isActive || hoverState === category.id ? category.hoverColor : category.color}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      style={{ transition: "all 0.3s ease" }}
                    />
                    {/* Only show icon if active, only show text if not active */}
                    {isActive && index === 0 && (
                      // Wealth Creation Icon - Growth/Chart
                      <path
                        d={`M ${point.x - 14} ${point.y + 12} L ${point.x - 6} ${point.y + 2} L ${point.x + 2} ${point.y + 8} L ${point.x + 14} ${point.y - 10}`}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        fill="none"
                        style={{ opacity: 0.9 }}
                      />
                    )}
                    {isActive && index === 1 && (
                      // Wealth Preservation Icon - Shield
                      <g transform={`translate(${point.x - 12}, ${point.y - 12})`}>
                        <path
                          d="M12 0L0 5v7c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5L12 0z"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          fill="none"
                          style={{ opacity: 0.9 }}
                        />
                      </g>
                    )}
                    {isActive && index === 2 && (
                      // High Yield Icon - Dollar/Flow
                      <g transform={`translate(${point.x - 8}, ${point.y - 12})`}>
                        <path
                          d="M8 0v24M3 5h10M3 19h10"
                          stroke="#0A2342"
                          strokeWidth="2.5"
                          style={{ opacity: 0.9 }}
                        />
                      </g>
                    )}
                    {/* Text always visible, smaller font, tighter line spacing, centered */}
                    {!isActive && (
                      <text
                        x={point.x}
                        y={point.y - 10}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className="font-serif"
                        fill={index === 2 ? "#0A2342" : "#FFFFFF"}
                        style={{ 
                          fontSize: '11px', 
                          fontWeight: 600,
                          pointerEvents: 'none',
                        }}
                      >
                        <tspan x={point.x} dy="0">{category.title.split(' ')[0]}</tspan>
                        {category.title.split(' ')[1] && (
                          <tspan x={point.x} dy="13">{category.title.split(' ')[1]}</tspan>
                        )}
                        {category.title.split(' ')[2] && (
                          <tspan x={point.x} dy="13">{category.title.split(' ')[2]}</tspan>
                        )}
                      </text>
                    )}
                  </motion.g>
                );
              })}
              
              {/* SVG filters for glow effects */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feFlood floodColor="#D5A021" floodOpacity="0.3" result="gold" />
                  <feComposite in="gold" in2="blur" operator="in" result="coloredBlur" />
                  <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
                </filter>
              </defs>
            </svg>
            
            {/* Detail panel for active category */}
            {activeCategory && (
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white w-full max-w-xl px-8 py-6 shadow-2xl border-t-4"
                style={{ 
                  borderColor: categories.find(c => c.id === activeCategory)?.color,
                  background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)"
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl text-navy mb-2">
                      {categories.find(c => c.id === activeCategory)?.title}
                    </h3>
                    <p className="text-sm uppercase tracking-wider font-medium mb-3" 
                      style={{ color: categories.find(c => c.id === activeCategory)?.color }}>
                      {categories.find(c => c.id === activeCategory)?.subtitle}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Close details"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <p className="text-charcoal/80 mb-6 text-base">
                  {categories.find(c => c.id === activeCategory)?.description}
                </p>
                
                <div className="flex">
                  <Button 
                    className="rounded-sm py-2.5 px-5 text-sm"
                    style={{ 
                      backgroundColor: categories.find(c => c.id === activeCategory)?.color,
                      color: categories.find(c => c.id === activeCategory)?.textColor
                    }}
                  >
                    {categories.find(c => c.id === activeCategory)?.cta}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="ml-3 rounded-sm py-2.5 px-5 text-sm border-navy text-navy hover:bg-navy/5"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}