import { useSelector } from 'react-redux';
import * as R from 'ramda';

import { selectAuthUser } from '../store/auth/selectors';
import { SCHEDULE_PERMISSIONS } from '../constants/permissions';

const visitsPermissionsType = {
  [SCHEDULE_PERMISSIONS.POST.value]: 'creatable',
  [SCHEDULE_PERMISSIONS.PATCH.value]: 'editable',
  [SCHEDULE_PERMISSIONS.DELETE.value]: 'deletable',
};

// ['creatable', 'editable', 'deletable'] => { creatable: true, editable: true, deletable: true }
const getFormattedPermissions = (data, value) =>
  data.reduce((acc, item) => ({ ...acc, [item]: value }), {});

const useVisitsPermissions = (schedule) => {
  const authUser = useSelector(selectAuthUser);

  const defaultPermissions = Object.values(visitsPermissionsType);

  // if user is the owner of current schedule, he has all permissions
  if (R.path(['owner', '_id'], schedule) === authUser.id) {
    return getFormattedPermissions(defaultPermissions, true);
  }

  // if user is not the owner, we need to find him in the list of participants
  const userPermissions = schedule?.participants
    ?.find(({ user }) => user.id === authUser.id)
    ?.permissions?.map((item) => visitsPermissionsType[item])
    ?.filter(Boolean);

  if (R.isNil(userPermissions) || R.isEmpty(userPermissions)) {
    return getFormattedPermissions(defaultPermissions, false);
  }

  return getFormattedPermissions(userPermissions, true);
};

export default useVisitsPermissions;
