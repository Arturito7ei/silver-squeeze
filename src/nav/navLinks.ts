type NavLink = { href: string; label: string; active?: boolean }

export type DashboardSection =
  | 'silver'
  | 'gold'
  | 'copper'
  | 'platinum'
  | 'natgas'
  | 'wti'
  | 'brent'
  | 'arabica'

export function dashboardNav(section: DashboardSection): {
  links: NavLink[]
  subnav?: NavLink[]
  subnavLabel: string
  markSrc: string
} {
  switch (section) {
    case 'silver':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: 'wti/', label: 'Energy' },
          { href: 'arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: './', label: 'Silver', active: true },
          { href: 'gold/', label: 'Gold' },
          { href: 'copper/', label: 'Copper' },
          { href: 'platinum/', label: 'Platinum' },
        ],
        subnavLabel: 'Metals dashboards',
        markSrc: './pcdd-mark.png',
      }
    case 'gold':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: '../wti/', label: 'Energy' },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: '../', label: 'Silver' },
          { href: './', label: 'Gold', active: true },
          { href: '../copper/', label: 'Copper' },
          { href: '../platinum/', label: 'Platinum' },
        ],
        subnavLabel: 'Metals dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'copper':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: '../wti/', label: 'Energy' },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: '../', label: 'Silver' },
          { href: '../gold/', label: 'Gold' },
          { href: './', label: 'Copper', active: true },
          { href: '../platinum/', label: 'Platinum' },
        ],
        subnavLabel: 'Metals dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'platinum':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: '../wti/', label: 'Energy' },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: '../', label: 'Silver' },
          { href: '../gold/', label: 'Gold' },
          { href: '../copper/', label: 'Copper' },
          { href: './', label: 'Platinum', active: true },
        ],
        subnavLabel: 'Metals dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'natgas':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: './', label: 'Energy', active: true },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: './', label: 'NatGas', active: true },
          { href: '../wti/', label: 'WTI' },
          { href: '../brent/', label: 'Brent' },
        ],
        subnavLabel: 'Energy dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'wti':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: './', label: 'Energy', active: true },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: '../natgas/', label: 'NatGas' },
          { href: './', label: 'WTI', active: true },
          { href: '../brent/', label: 'Brent' },
        ],
        subnavLabel: 'Energy dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'brent':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: './', label: 'Energy', active: true },
          { href: '../arabica/', label: 'Soft/Agri' },
        ],
        subnav: [
          { href: '../natgas/', label: 'NatGas' },
          { href: '../wti/', label: 'WTI' },
          { href: './', label: 'Brent', active: true },
        ],
        subnavLabel: 'Energy dashboards',
        markSrc: '../pcdd-mark.png',
      }
    case 'arabica':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: '../wti/', label: 'Energy' },
          { href: './', label: 'Soft/Agri', active: true },
        ],
        subnav: [{ href: './', label: 'Arabica', active: true }],
        subnavLabel: 'Soft/Agri dashboards',
        markSrc: '../pcdd-mark.png',
      }
  }
}
