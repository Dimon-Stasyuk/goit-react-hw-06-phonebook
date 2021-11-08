import { combineReducers } from "redux";

const initialItemsState = JSON.parse(
  window.localStorage.getItem("contacts"),
) ?? [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const filterReducer = (state = "", { value, type }) => {
  switch (type) {
    case "contacts/filterChange":
      return (state = value);

    default:
      return state;
  }
};

const itemsReducer = (state = initialItemsState, { value, type }) => {
  switch (type) {
    case "contacts/contactFilter":
      return state.filter((contact) => contact.name.includes(value));

    case "contacts/add":
      return [...state, value];

    case "contacts/remove":
      return state.filter((contact) => contact.id !== value);

    default:
      return state;
  }
};

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default contactsReducer;
