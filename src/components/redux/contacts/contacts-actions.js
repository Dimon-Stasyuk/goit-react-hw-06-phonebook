import shortid from "shortid";
import { FILTER_CHANGE, ADD, REMOVE } from "./contacts-types";

export const filterChange = (event) => ({
  type: FILTER_CHANGE,
  value: event.target.value,
});

export const addContact = (name, number) => ({
  type: ADD,
  value: {
    id: shortid.generate(),
    name,
    number,
  },
});

export const removeContact = (id) => ({
  type: REMOVE,
  value: id,
});
