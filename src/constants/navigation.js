import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE } from '../routes/constants';

export const getMainNavItems = (logout, hasBonuses, hasActivities) => [
  {
    label: 'Schedules',
    icon: ScheduleOutlinedIcon,
    link: ROUTE.SCHEDULES,
  },
  {
    label: 'Finances',
    icon: TrendingUpOutlinedIcon,
    link: ROUTE.FINANCES,
  },
  {
    label: 'Notes',
    icon: NoteOutlinedIcon,
    link: ROUTE.NOTES,
  },
  {
    label: 'Sprints',
    icon: FormatListBulletedOutlinedIcon,
    link: ROUTE.SPRINTS,
  },
  {
    label: 'Bonuses',
    icon: CardGiftcardIcon,
    link: ROUTE.BONUSES,
    hasBadge: !!hasBonuses,
  },
  {
    label: 'Activities',
    icon: AssignmentOutlinedIcon,
    link: ROUTE.ACTIVITIES,
    hasBadge: !!hasActivities,
  },
  {
    label: 'Settings',
    icon: SettingsOutlinedIcon,
    link: ROUTE.SETTINGS,
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: logout,
  },
];
