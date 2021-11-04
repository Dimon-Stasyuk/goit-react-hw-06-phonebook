import { useEffect } from "react";
import "./style.css";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import shortid from "shortid";
import { connect } from "react-redux";

function App({
  contacts,
  filter,
  handleFilterChange,
  onAddContact,
  onRemoveContact,
}) {
  const contactFilter = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='container'>
      <h1>Phoneboock</h1>
      <ContactForm contacts={contacts} submit={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={contactFilter} removeContact={onRemoveContact} />
    </div>
  );
}

const filterChange = (event) => ({
  type: "contacts/filterChange",
  value: event.target.value,
});

const addContact = (name, number) => ({
  type: "contacts/add",
  value: {
    id: shortid.generate(),
    name,
    number,
  },
});

const removeContact = (id) => ({
  type: "contacts/remove",
  value: id,
});

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  handleFilterChange: (event) => dispatch(filterChange(event)),
  onAddContact: (name, number) => dispatch(addContact(name, number)),
  onRemoveContact: (id) => dispatch(removeContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
