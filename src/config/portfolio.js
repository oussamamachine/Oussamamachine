// Portfolio Configuration
// Update these values to customize your portfolio

export const PORTFOLIO_CONFIG = {
    // Personal Information
    personal: {
        name: "Oussama",
        title: "Full-Stack Developer & AI Engineer",
        tagline: "Welcome to OUSSAMA.MIND – The Living Portfolio",
        description: "A fusion of cutting-edge technology, creative innovation, and digital consciousness. Explore the intersection of code, art, and human potential.",
        email: "hello@oussama.dev",
        github: "https://github.com/oussama",
        linkedin: "https://linkedin.com/in/oussama",
        location: "Available Worldwide",
        status: "Open for opportunities"
    },

    // Theme Colors
    theme: {
        primary: "#00F5FF",    // Cyber Blue
        secondary: "#8B5CF6",  // Cyber Purple
        accent: "#00FF00",     // Matrix Green
        success: "#10B981",    // Green
        warning: "#F59E0B",    // Yellow
        error: "#EF4444",      // Red
        dark: {
            background: "#0A0A0A",
            surface: "#1E1E1E",
            text: "#FFFFFF",
            textSecondary: "#9CA3AF"
        },
        light: {
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#111827",
            textSecondary: "#6B7280"
        }
    },

    // Animation Settings
    animations: {
        duration: {
            fast: 0.2,
            normal: 0.5,
            slow: 1.0
        },
        easing: {
            smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }
    },

    // 3D Settings
    threeD: {
        camera: {
            fov: 60,
            near: 0.1,
            far: 1000
        },
        lighting: {
            ambient: {
                intensity: 0.4,
                color: "#FFFFFF"
            },
            directional: {
                intensity: 0.8,
                color: "#FFFFFF",
                position: [10, 10, 10]
            }
        }
    },

    // Social Links
    social: {
        github: "https://github.com/oussama",
        linkedin: "https://linkedin.com/in/oussama",
        twitter: "https://twitter.com/oussama",
        instagram: "https://instagram.com/oussama",
        youtube: "https://youtube.com/@oussama"
    },

    // Contact Information
    contact: {
        email: "hello@oussama.dev",
        phone: "+1 (555) 123-4567",
        address: "Digital Realm, Internet",
        availability: "Available for freelance & full-time opportunities",
        responseTime: "Usually responds within 24 hours"
    },

    // SEO Settings
    seo: {
        title: "OUSSAMA.MIND - Full-Stack Developer & AI Engineer",
        description: "Portfolio of Oussama, a passionate developer and creative technologist specializing in React, Three.js, AI/ML, and cutting-edge web technologies.",
        keywords: ["React", "Three.js", "AI", "Machine Learning", "Full-Stack", "Developer", "Portfolio", "Web Development"],
        author: "Oussama",
        ogImage: "/og-image.jpg"
    },

    // Performance Settings
    performance: {
        lazyLoad: true,
        suspense: true,
        preload: false,
        cache: true
    }
};

// Export individual sections for easy access
export const { personal, theme, animations, threeD, social, contact, seo, performance } = PORTFOLIO_CONFIG;
