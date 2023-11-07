import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";




export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [spellCheckInput, setSpellCheckInput] = useState(""); // New state for spell check input
  const [showSpellCheckDialog, setShowSpellCheckDialog] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const [spellCheckResult, setSpellCheckResult] = useState("");

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  const updateSpellCheckResult = (result) => {
    setSpellCheckResult(result);
  };

  const handleSpellCheckRequest = () => {
    if (spellCheckInput.length > 0) {
      // Send the API request for spell checking with spellCheckInput
      fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: spellCheckInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response Data:", data);

          // Update the msg state with the corrected text
          setMsg(data.correctedText);
          setSpellCheckResult(data.correctedText);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Close the spell check dialog
     // setShowSpellCheckDialog(false);
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        
        
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button onClick={() => setShowSpellCheckDialog(true)}>Spell Check</button>
        

        <button type="submit">
          <IoMdSend />
        </button>
      </form>
       {/* Spell check dialog */}
       {showSpellCheckDialog && (
        <SpellCheckDialog>
          
          <input
            type="text"
            placeholder="Enter text for spell check"
            onChange={(e) => setSpellCheckInput(e.target.value)}
            value={spellCheckInput}
          />
          <button onClick={handleSpellCheckRequest}>Send for Spell Check</button>
          <div className="spell-check-result">
            <strong>Spell Check Result:</strong>
            <p>{spellCheckResult}</p>
          </div>
          <button onClick={() => setShowSpellCheckDialog(false)}>Close</button>

        </SpellCheckDialog>
      )}

    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
const SpellCheckDialog = styled.div`
  /* Style for the spell check dialog */

  .close-button {
    padding: 0.2rem 1rem; /* Adjust the padding to make the button smaller */
    font-size: 1rem; /* Adjust the font size to make the text smaller */
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
  }
  
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%; /* Adjust the top value to change the vertical position */
  left: 10%; /* Adjust the left value to change the horizontal position */
  width: 80%; /* Adjust the width to change the size */
  height: 80%; /* Adjust the height to change the size */
  z-index: 999; /* Ensure it appears above other elements */
  
  /* ... (add more styles as needed) */

  
`;
