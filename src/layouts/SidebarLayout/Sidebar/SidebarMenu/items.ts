import { ReactNode } from 'react';

// import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
// import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone'; NEED TO REMOVE
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
// import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
// import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
// import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
// import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
// import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';

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
      // Crypto is not needed, NEED TO REMOVE
      {
        name: 'Overview',
        link: '/dashboard/overview',
        icon: BrightnessLowTwoToneIcon // need to change icons
      }

      // Won't be needing this, NEED TO REMOVE
      // {
      //   name: 'Messenger',
      //   icon: MmsTwoToneIcon,
      //   link: '/dashboards/messenger'
      // },
    ]
  },
  
  {
    heading: 'Banking',
    items: [
      {
        name: 'Financial Accounts',
        icon: TableChartTwoToneIcon,
        link: '/banking/financialaccounts',
      },
      {
        name: 'Transactions',
        icon: AccountCircleTwoToneIcon,
        link: '/banking/transactions'
        
        // // WILL NOT NEED THESE TWO ITEMS, NEED TO REMOVE
        // items: [
        //   {
        //     name: 'Profile Details',
        //     link: '/management/profile/details'
        //   },
        //   {
        //     name: 'User Settings',
        //     link: '/management/profile/settings'
        //   }
        // ]
      }
    ]
  },

  // FINANCES
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

      // WILL NOT NEED THESE, NEED TO REMOVE
      // {
      //   name: 'Tabs',
      //   icon: FilterVintageTwoToneIcon,
      //   link: '/components/tabs'
      // },
      // {
      //   name: 'Badges',
      //   icon: HowToVoteTwoToneIcon,
      //   link: '/components/badges'
      // },
      // {
      //   name: 'Tooltips',
      //   icon: LocalPharmacyTwoToneIcon,
      //   link: '/components/tooltips'
      // },
      // {
      //   name: 'Avatars',
      //   icon: RedeemTwoToneIcon,
      //   link: '/components/avatars'
      // },
      // {
      //   name: 'Cards',
      //   icon: SettingsTwoToneIcon,
      //   link: '/components/cards'
      // },
      // {
      //   name: 'Forms',
      //   icon: TrafficTwoToneIcon,
      //   link: '/components/forms'
      // },
    ]
  },

  // NEED TO FIGURE OUT HOW TO MOVE THIS DOWN
  {
    // WONT NEED THIS HEADING HERE
    heading: 'Settings',
    items: [
      {
        name: 'Settings',
        icon: VerifiedUserTwoToneIcon,
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
