import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAuthUserRole } from '../store/auth/selectors';
import { USER_ROLE } from '../constants/users';

export const PERMISSION_MODULES = {
  USERS: {
    value: 'USERS',
    label: 'Users',
  },
  BONUSES: {
    value: 'BONUSES',
    label: 'Bonuses',
  },
  ACTIVITIES: {
    value: 'ACTIVITIES',
    label: 'Activities',
  },
};

export const PERMISSION_ACTIONS = {
  USERS: {
    INVITE_USER: 'INVITE_USER',
    EDIT_USER: 'EDIT_USER',
  },
  // bonuses of other users
  BONUSES: {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  },
  // activities of other users
  ACTIVITIES: {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  },
};

const PERMISSIONS = {
  [USER_ROLE.USER]: [],
  [USER_ROLE.ADMIN]: [
    {
      module: PERMISSION_MODULES.USERS,
      actions: [PERMISSION_ACTIONS.USERS.INVITE_USER],
    },
    {
      module: PERMISSION_MODULES.BONUSES,
      actions: [
        PERMISSION_ACTIONS.BONUSES.CREATE,
        PERMISSION_ACTIONS.BONUSES.UPDATE,
        PERMISSION_ACTIONS.BONUSES.DELETE,
      ],
    },
    {
      module: PERMISSION_MODULES.ACTIVITIES,
      actions: [
        PERMISSION_ACTIONS.ACTIVITIES.CREATE,
        PERMISSION_ACTIONS.ACTIVITIES.UPDATE,
        PERMISSION_ACTIONS.ACTIVITIES.DELETE,
      ],
    },
  ],
  [USER_ROLE.OWNER]: [
    {
      module: PERMISSION_MODULES.USERS,
      actions: [
        PERMISSION_ACTIONS.USERS.INVITE_USER,
        PERMISSION_ACTIONS.USERS.EDIT_USER,
      ],
    },
    {
      module: PERMISSION_MODULES.BONUSES,
      actions: [
        PERMISSION_ACTIONS.BONUSES.CREATE,
        PERMISSION_ACTIONS.BONUSES.UPDATE,
        PERMISSION_ACTIONS.BONUSES.DELETE,
      ],
    },
    {
      module: PERMISSION_MODULES.ACTIVITIES,
      actions: [
        PERMISSION_ACTIONS.ACTIVITIES.CREATE,
        PERMISSION_ACTIONS.ACTIVITIES.UPDATE,
        PERMISSION_ACTIONS.ACTIVITIES.DELETE,
      ],
    },
  ],
};

const useAppPermissions = () => {
  const userRole = useSelector(selectAuthUserRole);

  const module = useMemo(() => PERMISSIONS[userRole], [userRole]);

  return module;
};

export default useAppPermissions;
