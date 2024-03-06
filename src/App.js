import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactList from "./Components/Contacts/ContactList/ContactList";
import AddContact from "./Components/Contacts/AddContact/AddContact";
import EditContact from "./Components/Contacts/Editcontact/EditContact";
import ViewContact from "./Components/Contacts/ViewContact/ViewContact";
import NavBar from "./Components/NavCompo/NavBar";

function App() {
  return (
    <div className="App">   
      <NavBar/>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Navigate to={'contacts/list'}/>}/>
          <Route path="/contacts/list" element={<ContactList/>}/>
          <Route path="/contacts/add" element={<AddContact/>}/>
          <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
          <Route path="/contacts/view/:contactId" element={<ViewContact/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
} 

export default App;
