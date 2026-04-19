export interface NavItem {
  label: string
  href: string
  badge?: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Notes",
    href: "/notes",
  },
  {
    label: "Projects",
    href: "#",
    badge: "Uploading",
  },
]
