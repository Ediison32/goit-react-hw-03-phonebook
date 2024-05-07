import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import styles from './App.styles.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: ''
    };
    
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const trimmedName = name.trim();
    const { contacts } = this.state;

    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === trimmedName.toLowerCase());
    
    if (isDuplicate) {
      alert(`${trimmedName} is already in contacts!`);
      return;
    }
    
    const newContact = {
      id: nanoid(),
      name: trimmedName,
      number
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }), () => {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    });
    console.log()
  };

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;