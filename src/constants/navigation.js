import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { ROUTE } from '../routes/constants';

export const mainNavItems = [
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
    label: 'Tasks',
    icon: FormatListBulletedOutlinedIcon,
    link: ROUTE.TASKS,
  },
  {
    label: 'Bonuses',
    icon: CardGiftcardIcon,
    link: ROUTE.BONUSES,
  },
  {
    label: 'Activities',
    icon: AssignmentOutlinedIcon,
    link: ROUTE.ACTIVITIES,
  },
  {
    label: 'Settings',
    icon: SettingsOutlinedIcon,
    link: ROUTE.SETTINGS,
  },
];
