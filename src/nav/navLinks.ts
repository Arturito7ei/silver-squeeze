type NavLink = { href: string; label: string; active?: boolean }

export type DashboardSection =
  | 'silver'
  | 'gold'
  | 'copper'
  | 'natgas'
  | 'wti'
  | 'brent'
  | 'arabica'

export function dashboardNav(section: DashboardSection): {
  links: NavLink[]
  subnav?: NavLink[]
  subnavLabel: string
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
        ],
        subnavLabel: 'Metals dashboards',
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
        ],
        subnavLabel: 'Metals dashboards',
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
        ],
        subnavLabel: 'Metals dashboards',
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
      }
  }
}
