export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviews: number;
  students: number;
  language: string;
  tags: string[];
}

const generateProducts = (): Product[] => {
  const baseProducts = [
    {
      id: "1",
      name: "Complete JavaScript Course 2024",
      price: 299000,
      originalPrice: 599000,
      image: "/courses/javascript.jpg",
      description:
        "Master JavaScript from basics to advanced concepts including ES6+, DOM manipulation, and modern frameworks.",
      category: "Programming",
      instructor: "John Smith",
      duration: "25 hours",
      level: "Beginner" as const,
      rating: 4.8,
      reviews: 1247,
      students: 15420,
      language: "English",
      tags: ["JavaScript", "Web Development", "ES6"],
    },
    {
      id: "2",
      name: "React Native Masterclass",
      price: 450000,
      originalPrice: 799000,
      image: "/courses/react-native.jpg",
      description:
        "Build cross-platform mobile apps with React Native. Learn state management, navigation, and deployment.",
      category: "Mobile Development",
      instructor: "Sarah Johnson",
      duration: "32 hours",
      level: "Intermediate" as const,
      rating: 4.9,
      reviews: 892,
      students: 8765,
      language: "English",
      tags: ["React Native", "Mobile", "Cross-platform"],
    },
    {
      id: "3",
      name: "Python for Data Science",
      price: 350000,
      originalPrice: 650000,
      image: "/courses/python-data.jpg",
      description:
        "Learn Python programming for data analysis, machine learning, and scientific computing.",
      category: "Data Science",
      instructor: "Dr. Michael Chen",
      duration: "28 hours",
      level: "Beginner" as const,
      rating: 4.7,
      reviews: 1563,
      students: 20340,
      language: "English",
      tags: ["Python", "Data Science", "Machine Learning"],
    },
    {
      id: "4",
      name: "Advanced UI/UX Design",
      price: 550000,
      originalPrice: 899000,
      image: "/courses/ui-ux.jpg",
      description:
        "Master modern UI/UX design principles, tools, and techniques for creating stunning user interfaces.",
      category: "Design",
      instructor: "Emma Wilson",
      duration: "35 hours",
      level: "Advanced" as const,
      rating: 4.6,
      reviews: 634,
      students: 5430,
      language: "English",
      tags: ["UI/UX", "Design", "Figma"],
    },
    {
      id: "5",
      name: "Machine Learning Fundamentals",
      price: 750000,
      originalPrice: 1299000,
      image: "/courses/ml.jpg",
      description:
        "Comprehensive introduction to machine learning algorithms, neural networks, and AI applications.",
      category: "Artificial Intelligence",
      instructor: "Prof. David Kim",
      duration: "40 hours",
      level: "Advanced" as const,
      rating: 4.9,
      reviews: 445,
      students: 3210,
      language: "English",
      tags: ["Machine Learning", "AI", "Neural Networks"],
    },
    {
      id: "6",
      name: "Web Development Bootcamp",
      price: 250000,
      originalPrice: 499000,
      image: "/courses/web-dev.jpg",
      description:
        "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks.",
      category: "Web Development",
      instructor: "Alex Rodriguez",
      duration: "20 hours",
      level: "Beginner" as const,
      rating: 4.5,
      reviews: 2103,
      students: 18760,
      language: "English",
      tags: ["HTML", "CSS", "JavaScript", "Web"],
    },
    {
      id: "7",
      name: "Digital Marketing Strategy",
      price: 400000,
      originalPrice: 699000,
      image: "/courses/marketing.jpg",
      description:
        "Learn digital marketing strategies, SEO, social media marketing, and analytics.",
      category: "Marketing",
      instructor: "Lisa Thompson",
      duration: "30 hours",
      level: "Intermediate" as const,
      rating: 4.4,
      reviews: 987,
      students: 12340,
      language: "English",
      tags: ["Marketing", "SEO", "Social Media"],
    },
    {
      id: "8",
      name: "Blockchain Development",
      price: 650000,
      originalPrice: 999000,
      image: "/courses/blockchain.jpg",
      description:
        "Master blockchain technology, smart contracts, and decentralized applications.",
      category: "Blockchain",
      instructor: "Robert Zhang",
      duration: "38 hours",
      level: "Advanced" as const,
      rating: 4.8,
      reviews: 334,
      students: 2870,
      language: "English",
      tags: ["Blockchain", "Smart Contracts", "DApps"],
    },
  ];
  // Additional Products For Infinite Scroll
  const additionalProducts: Product[] = [];
  const courseNames = [
    "Vue.js Complete Guide",
    "Angular Masterclass",
    "Node.js Backend Development",
    "Python Django Framework",
    "Flutter Mobile Development",
    "Swift iOS Development",
    "Kotlin Android Development",
    "AWS Cloud Computing",
    "Docker & Kubernetes",
    "DevOps Fundamentals",
    "Cybersecurity Essentials",
    "Ethical Hacking",
    "Game Development with Unity",
    "3D Modeling with Blender",
    "Video Editing with Premiere Pro",
    "Photography Masterclass",
    "Content Writing Skills",
    "Public Speaking",
    "Project Management",
    "Business Analytics",
    "Financial Modeling",
    "Stock Market Trading",
    "Cryptocurrency Investment",
    "Real Estate Investment",
    "Personal Finance",
    "Leadership Skills",
    "Team Management",
    "Conflict Resolution",
    "Negotiation Skills",
    "Sales Techniques",
    "Customer Service",
    "Human Resources",
    "Supply Chain Management",
    "Logistics Operations",
    "Quality Management",
    "Six Sigma",
    "Lean Manufacturing",
    "Operations Research",
    "Statistics for Business",
    "Econometrics",
    "Market Research",
    "Consumer Behavior",
    "Brand Management",
    "Product Management",
    "Agile Methodology",
    "Scrum Framework",
    "Kanban Method",
    "Risk Management",
    "Compliance & Ethics",
    "Data Privacy",
    "Information Security",
  ];

  const instructors = [
    "Dr. Sarah Williams",
    "Prof. Michael Brown",
    "Lisa Anderson",
    "David Chen",
    "Emma Thompson",
    "James Wilson",
    "Maria Garcia",
    "Robert Johnson",
    "Jennifer Davis",
    "Christopher Lee",
    "Amanda White",
    "Daniel Martinez",
    "Jessica Taylor",
    "Matthew Rodriguez",
    "Nicole Anderson",
    "Andrew Thomas",
    "Stephanie Jackson",
    "Kevin White",
    "Rachel Harris",
    "Steven Clark",
    "Michelle Lewis",
    "Ryan Walker",
    "Lauren Hall",
    "Tyler Young",
    "Hannah King",
    "Brandon Wright",
    "Victoria Green",
    "Nathan Baker",
    "Samantha Adams",
    "Justin Nelson",
    "Megan Carter",
    "Gregory Mitchell",
    "Ashley Perez",
    "Jonathan Roberts",
    "Brittany Turner",
    "Sean Phillips",
    "Katherine Campbell",
    "Derek Parker",
    "Rebecca Evans",
    "Travis Edwards",
    "Heather Collins",
    "Corey Stewart",
    "Melissa Morris",
    "Troy Rogers",
    "Crystal Reed",
    "Dustin Cook",
    "Tiffany Morgan",
    "Brent Bell",
    "Monica Murphy",
    "Chad Bailey",
    "Stacy Rivera",
  ];

  const categories = [
    "Programming",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Design",
    "Artificial Intelligence",
    "Marketing",
    "Blockchain",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "Game Development",
    "Creative Arts",
    "Business",
    "Finance",
    "Leadership",
    "Management",
    "Operations",
    "Analytics",
    "Research",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"] as const;

  for (let i = 9; i <= 60; i++) {
    const courseNameIndex = (i - 9) % courseNames.length;
    const instructorIndex = (i - 9) % instructors.length;
    const courseName = courseNames[courseNameIndex];
    const instructor = instructors[instructorIndex];
    const category = categories[i % categories.length];
    const level = levels[i % 3];
    const price = Math.floor(Math.random() * 800000) + 200000;
    const originalPrice = price + Math.floor(Math.random() * 400000);
    const rating = 4.0 + Math.random() * 1.0;
    const reviews = Math.floor(Math.random() * 2000) + 100;
    const students = Math.floor(Math.random() * 20000) + 1000;
    const duration = `${Math.floor(Math.random() * 40) + 10} hours`;

    additionalProducts.push({
      id: i.toString(),
      name: courseName,
      price,
      originalPrice,
      image: `/courses/course-${i}.jpg`,
      description: `Comprehensive course on ${courseName.toLowerCase()}. Learn from industry experts and gain practical skills.`,
      category,
      instructor,
      duration,
      level,
      rating: Math.round(rating * 10) / 10,
      reviews,
      students,
      language: "English",
      tags: [category, level, "Online Course"],
    });
  }

  return [...baseProducts, ...additionalProducts];
};

export const products: Product[] = generateProducts();

export const categories = [
  "All",
  "Programming",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Artificial Intelligence",
  "Marketing",
  "Blockchain",
];
export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 500K", min: 0, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "Over 1M", min: 1000000, max: Infinity },
];
