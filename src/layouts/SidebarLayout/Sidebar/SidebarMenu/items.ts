import { ReactNode } from 'react';

import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Overview',
        link: '/dashboard/overview',
        icon: BrightnessLowTwoToneIcon
      }
    ]
  },

  {
    heading: 'Banking',
    items: [
      {
        name: 'Financial Accounts',
        icon: AccountBalanceTwoToneIcon,
        link: '/banking/financialaccounts'
      },
      {
        name: 'Transactions',
        icon: ReceiptLongTwoToneIcon,
        link: '/banking/transactions'
      }
    ]
  },

  {
    heading: 'Finances',
    items: [
      {
        name: 'Reports',
        icon: BallotTwoToneIcon,
        link: '/finances/reports'
      },
      {
        name: 'Budget',
        icon: SavingsTwoToneIcon,
        link: '/finances/budget'
      },
      {
        name: 'Goals',
        icon: EmojiEventsTwoToneIcon,
        link: '/finances/goals'
      }
    ]
  },

  {
    heading: 'Tools',
    items: [
      {
        name: 'Calculators',
        icon: CalculateTwoToneIcon,
        link: '/tools/calculators'
      },
      {
        name: 'Calendar',
        icon: EventNoteTwoToneIcon,
        link: '/tools/calendar'
      }
    ]
  },

  {
    heading: 'Settings',
    items: [
      {
        name: 'Settings',
        icon: SettingsTwoToneIcon,
        link: '/status',
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
          {
            name: 'Error 500',
            link: '/status/500'
          },
          {
            name: 'Maintenance',
            link: '/status/maintenance'
          },
          {
            name: 'Coming Soon',
            link: '/status/coming-soon'
          }
        ]
      }
    ]
  }
];

export default menuItems;
