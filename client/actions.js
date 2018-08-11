/* globals fetch */
import { ICONS } from './constants';

export const SET_ACTIVE_PLANE = Symbol('SET_ACTIVE_PLANE');
export const RENAME_PLANE = Symbol('RENAME_PLANE');
export const REMOVE_PLANE = Symbol('REMOVE_PLANE');
export const TOGGLE_TRACE = Symbol('TOGGLE_TRACE');
export const CLEAR_TRACE = Symbol('CLEAR_TRACE');
export const CHANGE_ICON = Symbol('CHANGE_ICON');
export const REQUEST_PLANES = Symbol('REQUEST_PLANES');
export const RECEIVE_PLANES = Symbol('RECEIVE_PLANES');
export const REJECT_PLANES = Symbol('REJECT_PLANES');

const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '';

export function setActivePlane(plane) {
  return { type: SET_ACTIVE_PLANE, key: plane ? plane.ip : plane };
}

export function renamePlane(plane, name) {
  fetch(`${endpoint}/api/rename`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ip: plane.ip,
      name,
    }),
  });
  return { type: RENAME_PLANE, key: plane.ip, name };
}

export function removePlane(plane) {
  return { type: REMOVE_PLANE, key: plane.ip };
}

export function toggleTrace(plane) {
  return { type: TOGGLE_TRACE, key: plane.ip };
}

export function clearTrace(plane) {
  return { type: CLEAR_TRACE, key: plane.ip };
}

function nextIcon(currentIcon) {
  const allIcons = Object.keys(ICONS);
  const currentIndex = allIcons.indexOf(currentIcon);
  return allIcons[(currentIndex + 1) % allIcons.length];
}

export function changeIcon(plane) {
  const icon = nextIcon(plane.icon);
  fetch(`${endpoint}/api/change-icon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ip: plane.ip,
      icon,
    }),
  });
  return { type: CHANGE_ICON, key: plane.ip, icon };
}

function receivePlanes(planes) {
  return { type: RECEIVE_PLANES, planes };
}

function rejectPlanes(error) {
  return { type: REJECT_PLANES, error };
}

export function fetchPlanes() {
  return function fetchPlanesThunk(dispatch) {
    fetch(`${endpoint}/api/data`)
      .then(response => response.json())
      .then(data => dispatch(receivePlanes(data)))
      .catch(error => dispatch(rejectPlanes(error)));
  };
}
