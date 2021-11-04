import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const contactsState = {
  contacts: {
    items: JSON.parse(window.localStorage.getItem("contacts")) ?? [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  },
};

const reducer = (store = contactsState, { value, type }) => {
  switch (type) {
    case "contacts/filterChange":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          filter: value,
        },
      };
    case "contacts/contactFilter":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          items: store.contacts.items.filter((contact) =>
            contact.name.includes(value),
          ),
        },
      };
    case "contacts/add":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          items: [...store.contacts.items, value],
        },
      };

    case "contacts/remove":
      return {
        ...store,
        contacts: {
          ...store.contacts,
          items: store.contacts.items.filter((contact) => contact.id !== value),
        },
      };

    default:
      return store;
  }
};

const store = createStore(reducer, composeWithDevTools());

export default store;
