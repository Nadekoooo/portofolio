export interface NavItem {
  title: string;
  desc: string;
  icon: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    title: "Notebooks",
    desc: "Code & Analysis",
    icon: "Code",
    href: "/notebooks",
  },
  {
    title: "Publications",
    desc: "Academic Research",
    icon: "BookOpen",
    href: "/publications",
  },
  {
    title: "Experience",
    desc: "Professional Journey",
    icon: "Briefcase",
    href: "/experience",
  },
  {
    title: "About Me",
    desc: "Profile & Skills",
    icon: "User",
    href: "/about",
  },
];
