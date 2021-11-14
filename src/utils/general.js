import * as R from 'ramda';

import config from '../config';
import { COMPONENT_STATE } from '../constants/general';

export const getErrorMessage = (error) =>
  R.pathOr('Something went wrong', ['response', 'data', 'message'], error);

export const getImageUrl = (url, type = 'user') => {
  const defaultImage = {
    bonus: '/img/gift.svg',
    user: '/img/default-avatar.svg',
  };

  // TODO: refactor when image uploads will be done on server
  const imageUrl = url ? `${config.apiUrl}${url}` : null;

  // return url || defaultImage[type];
  return imageUrl || defaultImage[type];
};

export const getPaginationPagesCount = (totalItemsCount, minItemsCount) => {
  if (totalItemsCount === 0) return 1;

  return Math.ceil(totalItemsCount / minItemsCount);
};

export const arrayToObject = (array, key = '_id') =>
  R.reduce((acc, x) => R.assoc(x[key], x, acc), {})(array);

export const getComponentState = (loading, error, empty) => {
  if (loading) return COMPONENT_STATE.LOADING;
  if (error) return COMPONENT_STATE.ERROR;
  if (empty) return COMPONENT_STATE.EMPTY;

  return COMPONENT_STATE.SUCCESS;
};

export const capitalizeFirstLetter = (string) =>
  string && string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const conditionalPropType =
  (condition, message) => (props, propName, componentName) => {
    if (condition(props, propName, componentName)) {
      return new Error(
        `Invalid prop '${propName}' '${props[propName]}' supplied to '${componentName}'. ${message}`,
      );
    }

    return true;
  };

export const hexToRgba = (color, opacity = 1) => {
  if (color.substring(0, 1) === '#') {
    color = color.substring(1);
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const removeHTMLTagsFromString = (value) =>
  value.replace(/<[^>]+>/g, '');
