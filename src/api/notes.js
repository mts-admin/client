import apiRequest from './index';
import { endpoints } from './endpoints';

export const getNotes = (params, cancelToken) =>
  apiRequest({
    method: 'GET',
    url: endpoints.notes.notes,
    // page, sort, search, favorite
    params,
    cancelToken,
  }).then(({ data }) => data);

export const getNote = (id) =>
  apiRequest({
    method: 'GET',
    url: endpoints.notes.noteById(id),
  }).then(({ data }) => data);

export const createNote = (body) =>
  apiRequest({
    method: 'POST',
    url: endpoints.notes.notes,
    data: body,
  }).then(({ data }) => data);

export const editNote = (id, body) =>
  apiRequest({
    method: 'PATCH',
    url: endpoints.notes.noteById(id),
    data: body,
  }).then(({ data }) => data);

export const deleteNote = (id) =>
  apiRequest({
    method: 'DELETE',
    url: endpoints.notes.noteById(id),
  }).then(({ data }) => data);
