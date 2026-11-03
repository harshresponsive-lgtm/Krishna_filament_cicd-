export type IRItem = {
  slug: string;
  label: string;
  icon: string;
};

export const irItems: IRItem[] = [

  {
    slug: 'policy',
    label: 'Policy',
    icon: 'ScrollText',
  },
  {
    slug: 'disclosures',
    label: 'Disclosures under Regulation 46 of SEBI (LODR) Regulations',
    icon: 'FileText',
  },
  // {
  //   slug: 'board-of-directors',
  //   label: 'Board of Directors',
  //   icon: 'Users',
  // },
  // {
  //   slug: 'committee-composition',
  //   label: 'Composition of Committee',
  //   icon: 'Network',
  // },
  {
    slug: 'financial-results',
    label: 'Financial Results',
    icon: 'BarChart3',
  },
  {
    slug: 'annual-reports',
    label: 'Annual Reports',
    icon: 'BookOpen',
  },
  // {
  //   slug: 'annual-return',
  //   label: 'Annual Return',
  //   icon: 'FileSpreadsheet',
  // },
  {
    slug: 'corporate-governance',
    label: 'Corporate Governance',
    icon: 'Landmark',
  },
  {
    slug: 'shareholding-pattern',
    label: 'Shareholding Pattern',
    icon: 'PieChart',
  },
  {
    slug: 'updates-announcements',
    label: 'Updates & Announcements',
    icon: 'Megaphone',
  },
  // {
  //   slug: 'investor-grievance',
  //   label: 'Investor Relations',
  //   icon: 'Mail',
  // },
];

export const irSlugMap: Record<string, IRItem> = Object.fromEntries(
  irItems.map((i) => [i.slug, i])
);