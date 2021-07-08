import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
// adding {} indicates that the component imported in not a default export

function App() {

  const LOCAL_STORAGE_KEY = "contact"
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]); // second param of useEffect is it's dependency.

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />
          <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler}/>)} />

          {/* this approach creates new component each time
          <Route path="/" exact component={() => {<ContactList contacts={contacts} getContactId={removeContactHandler} />}} />
          <Route path="/add" component={() => {<AddContact addContactHandler={addContactHandler}/>}} /> */}
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
