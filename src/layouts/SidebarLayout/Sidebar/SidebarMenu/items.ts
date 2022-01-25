import { ReactNode } from 'react';

import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';

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
        link: '/banking/financialaccounts',
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
        link: '/components/buttons'
      },
      {
        name: 'Budget',
        icon: BeachAccessTwoToneIcon,
        link: '/components/modals'
      },
      {
        name: 'Goals',
        icon: EmojiEventsTwoToneIcon,
        link: '/components/accordions'
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
