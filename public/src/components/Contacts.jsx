import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";
import {BsFillCheckSquareFill} from "react-icons/bs"

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isClicked,setIsClicked]=useState(false);
  const [selectedContacts, setSelectedContacts] = useState(new Map());
  const [addedContacts,setAddedContacts]=useState([]);
  
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
    setCurrentUser(data);
  }, []);

  useEffect(() => {
    const initialSelectedContacts = new Map();
    contacts.forEach((contact) => {
      initialSelectedContacts.set(contact, false); // Initially, no contacts are selected
    });
    setSelectedContacts(initialSelectedContacts);
  }, [Contacts]);
  
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const createGroup=(event)=>{
    event.preventDefault();
    setIsClicked(false);
  }
  const toggleContactSelection = (contact) => {
      setSelectedContacts((prevSelectedContacts) => {
      const updatedSelectedContacts = new Map(prevSelectedContacts);
      updatedSelectedContacts.set(contact, !prevSelectedContacts.get(contact));
      return updatedSelectedContacts;
    });
  };
  const addtogrp=(contact)=>{
    toggleContactSelection(contact);
    setAddedContacts((previous) => [...previous, contact]);
    
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <>
        {isClicked===false?(
          <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>talkwave</h3>
            <button onClick={()=>{setIsClicked(true);
            setAddedContacts([currentUser]);
            }}> + </button>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index===currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout/>
            <a href="http://localhost:8501/">chatBot</a>
          </div>
        </Container>
        )
        : (<Container>
          <div className="selectpeople">
            <h3>add members</h3>
          </div>
          <div className="contacts">
            {Array.from(selectedContacts).map(([contact, isSelected]) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    isSelected===true ? "selected" : ""
                  }`}
                  onClick={() => addtogrp(contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="creategrp">
            <div className="grpname">
            <form className="create" onSubmit={(event) => createGroup(event)}>
              <input
                type="text"
                placeholder="Group Name"
              />
              <button type="submit">
              <BsFillCheckSquareFill/>
              </button>
            </form>
            </div>
          </div>
        </Container>)
        }
        </>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .selectpeople{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .creategrp{
    .groupname{
      button{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: #9a86f3;
        border: none;
        cursor: pointer;
      }
    }
  }
`;
