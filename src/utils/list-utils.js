import uniq from "lodash/uniq";

export function listHasId(list, id) {
  return list.find(itemId => itemId === id);
}

export function addIdToList(list, newId) {
  return uniq(list.concat([newId]));
}

export function removeIdFromList(list, id) {
  return list.filter(itemId => itemId !== id);
}
