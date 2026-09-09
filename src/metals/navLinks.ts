type NavLink = { href: string; label: string; active?: boolean }

export function dashboardNav(section: 'silver' | 'gold' | 'copper' | 'natgas' | 'wti' | 'brent'): {
  links: NavLink[]
  subnav?: NavLink[]
} {
  switch (section) {
    case 'silver':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: 'natgas/', label: 'NatGas' },
          { href: 'wti/', label: 'Oil' },
        ],
        subnav: [
          { href: './', label: 'Silver', active: true },
          { href: 'gold/', label: 'Gold' },
          { href: 'copper/', label: 'Copper' },
        ],
      }
    case 'gold':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: '../natgas/', label: 'NatGas' },
          { href: '../wti/', label: 'Oil' },
        ],
        subnav: [
          { href: '../', label: 'Silver' },
          { href: './', label: 'Gold', active: true },
          { href: '../copper/', label: 'Copper' },
        ],
      }
    case 'copper':
      return {
        links: [
          { href: './', label: 'Metals', active: true },
          { href: '../natgas/', label: 'NatGas' },
          { href: '../wti/', label: 'Oil' },
        ],
        subnav: [
          { href: '../', label: 'Silver' },
          { href: '../gold/', label: 'Gold' },
          { href: './', label: 'Copper', active: true },
        ],
      }
    case 'natgas':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: './', label: 'NatGas', active: true },
          { href: '../wti/', label: 'Oil' },
        ],
      }
    case 'wti':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: '../natgas/', label: 'NatGas' },
          { href: './', label: 'Oil', active: true },
        ],
        subnav: [
          { href: './', label: 'WTI', active: true },
          { href: '../brent/', label: 'Brent' },
        ],
      }
    case 'brent':
      return {
        links: [
          { href: '../', label: 'Metals' },
          { href: '../natgas/', label: 'NatGas' },
          { href: './', label: 'Oil', active: true },
        ],
        subnav: [
          { href: '../wti/', label: 'WTI' },
          { href: './', label: 'Brent', active: true },
        ],
      }
  }
}
