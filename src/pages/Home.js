import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactPage.css";
import ContactList from "./Contactlist";
import { mkConfig, generateCsv, download } from "export-to-csv";
import {
  DashboardOutlined,
  ContactsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

const ContactPage = ({ userId, userContacts }) => {  
  const [contacts, setContacts] = useState([...userContacts]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const csvConfig = mkConfig({ useKeysAsHeaders: true });
  const navigate = useNavigate();
  useEffect(() => {
    let email = sessionStorage.getItem('email');
    if(email === '' || email === null) {
        navigate('/')
    }
});
  const handleLogout = () => {
    navigate("/");
  };
  if (userId == "") handleLogout();
  const handleImport = () => {
    document.getElementById("importBtn").click();
  };
  const deleteSelected = async (selected) => {
    if (selected.length == 0) {
      alert("No contacts Available");
      return;
    }
    let newContacts = contacts.filter((data, i) => !selected.includes(i));
    let newSelectedContacts = selectedContacts.filter(
      (data, i) => !selected.includes(i)
    );
    let deleteContacts = contacts.filter((data, i) => selected.includes(i));
    setContacts(newContacts);
    setSelectedContacts(newSelectedContacts);
    await fetch("http://localhost:5000/deleteContacts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user: userId,
        contacts: deleteContacts,
      }),
    });
  };
  const selectContact = (index, value, selectAll) => {
    if (selectAll !== undefined) {
      if (selectAll) {
        const newSeletedContacts = contacts.map((data, i) => i);
        setSelectedContacts(newSeletedContacts);
      } else setSelectedContacts([]);
    } else if (value) setSelectedContacts([...selectedContacts, index]);
    else setSelectedContacts(selectedContacts.filter((data, i) => i !== index));
  };
  const handleDelete = (index) => {
    deleteSelected([index]);
  };
  const removeDuplicate = (array) => {
    const newArray = [];
    array.forEach((data) => {
      if (
        !newArray.find((i) => data.phone === i.phone || data.email === i.email)
      ) {
        newArray.push(data);
      }
    });
    return newArray;
  };
  const handleFileImport = async (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async function (e) {
      var jsonData = [];
      var headers = [];
      var rows = e.target.result.split("\r\n");
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(",");
        var rowData = {};
        for (var j = 0; j < cells.length; j++) {
          if (i == 0) {
            var headerName = cells[j].trim();
            if (j == 0) {
              headers.push("name");
            } else headers.push(headerName);
          } else {
            var key = headers[j];
            if (key) {
              rowData[key] = cells[j].trim().replace(/['"]+/g, "");
            }
          }
        }
        if (i != 0) {
          jsonData.push(rowData);
        }
      }
      jsonData.length = jsonData.length - 1;
      jsonData = removeDuplicate(jsonData);
      await fetch("http://localhost:5000/importContacts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user: userId,
          contacts: jsonData,
        }),
      });
      setContacts(jsonData);
    };
  };
  const handleExport = () => {
    if (contacts.length > 0) {
      const csv = generateCsv(csvConfig)(contacts);
      download(csvConfig)(csv);
    } else {
      alert("No contacts availalble");
    }
  };
  return (
    <div id="container">
      <div id="logoContainer">
        <div className="logoTop">
          <div className="logo">LOGO</div>
          <div className="dashboard">
            <DashboardOutlined />
            Dashboard
          </div>
          <div className="totalContacts">
            <ContactsOutlined />
            TotalContacts
          </div>
        </div>
        <div className="logoBottom">
          <button className="logoutBtn" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        </div>
      </div>
      <div id="contacts">
        <div id="titleContainer">
          <div className="title">Total Contacts</div>
        </div>
        <div id="contactsContainer">
          <div className="contactsButtons">
            <div className="leftBtns">
              <div className="selectData button">
                <button>Select Date</button>
              </div>
              <div className="filter button">
                <button>Filter</button>
              </div>
            </div>
            <div className="rightBtns">
              <div className="delete button">
                <button onClick={() => deleteSelected(selectedContacts)}>
                  Delete
                </button>
              </div>
              <div className="import button">
                <button onClick={handleImport}>Import</button>
                <input type="file" id="importBtn" onChange={handleFileImport} />
              </div>
              <div className="export button">
                <button onClick={handleExport}>Export</button>
              </div>
            </div>
          </div>
          <div className="contactList">
            <ContactList
              contacts={contacts}
              handleDelete={handleDelete}
              selectContact={selectContact}
              selectedContacts={selectedContacts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
