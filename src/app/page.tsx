'use client';

import React, { useState } from "react";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import "./globals.css";

export default function Page() {
  const defaultHTML = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

  const defaultJs = `console.log("Hello World!");`;

  const defaultPython = `print("Hello World!");`;

  const [editorTheme, setEditorTheme] = useState("vs-light"); //editor theme state
  const [containerTheme, setContainerTheme] = useState("light"); //container theme state
  const [selectedLanguage, setSelectedLanguage] = useState("html"); //editor language state
  const [editorValue, setEditorValue] = useState(defaultHTML);
  const [inputData, setInputData] = useState(""); //handle input state

  // type CodeSnippet = {
  //   data: string;
  //   theme: string;
  //   language: string;
  //   ContainerTheme: string;
  // }

  // const [allData, setAllData] = useState<CodeSnippet[]>([]); //store all data from db

  const [shareableLink, setShareableLink] = useState(""); //store shareable link

  const saveData = async () => {
    if(!inputData.trim()) {
      alert("Please enter a valid input");
      return;
    }

    const dataToSave = {  //data to be saved
      data: inputData,
      language: selectedLanguage,
      theme: editorTheme,
      ContainerTheme: containerTheme,
    };

    const response = await fetch("/api/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( dataToSave ), // input data sent to the server
    });

    const result = await response.json();
    if (response.ok && result.shareableLink) {
      alert("Data saved successfully and link generated");
      setShareableLink(result.shareableLink);
    } else {
      alert("something went wrong");
    }
  }

  // const fetchAllData = async () => {
  //   try {
  //     const response = await fetch("/api/getAllData"); //fetch data from the server

  //     if(response.ok) {
  //       const fetchedData = await response.json();
  //       setAllData(fetchedData); //store the fetched data

  //       allData.slice(-1).map((item) => {   //log the fetched data
  //         setEditorValue(item.data); //send the fetched data to the editor
  //         setEditorTheme(item.theme); //set the theme of the editor
  //         setSelectedLanguage(item.language); //set the language of the editor
  //         setContainerTheme(item.ContainerTheme); //set the container theme
  //       });

  //       // console.log("Data fetched from db: ", fetchedData);
  //       // alert("Data fetched successfully");
  //     } else { //if response is not ok
  //       alert("Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //     alert("Something went wrong");
  //   }
  // };



  const handleLanguageChange = (newLanguage: "html" | "javascript" | "python") => {
    setSelectedLanguage(newLanguage);

    if (newLanguage === "html") {
      setEditorValue(defaultHTML); //update selected language
    } else if (newLanguage === "javascript") { // update default content based on language
      setEditorValue(defaultJs);
    } else if (newLanguage === "python") {
      setEditorValue(defaultPython);
    }
  }

  const handleThemeChange = (theme: "hc-black" | "vs-light") => { //handling theme state
    if (theme === "hc-black") {
      setEditorTheme("hc-black"); //update editor theme
      setContainerTheme("dark"); //update container theme
    } else {
      setEditorTheme("vs-light");
      setContainerTheme("light");
    }
  };



  return (
    <div>

    <div className="logo-container">
      <Image src="/images/NoteCodeLogo.svg" alt="logo" height={30} width={100} />
      <h2>Create {`&`} Share</h2>
      <h1>Your Code easily</h1>
    </div>

    <div className={`text-editor-container ${
      containerTheme === "dark" ? "dark-mode" : "" //checks if the (theme) value is dark then it sets it to dark mode.
    }`} 
    >
      <div className="editor">

        <form action="#" onSubmit={(e) => e.preventDefault()}>

          <div className="">

            <Editor       // Monaco Editor component
              theme={editorTheme} //Dynamic theme
              height="65vh"
              language={selectedLanguage}
              value={editorValue}
              onChange={(newValue) => {
                if (newValue !== undefined) {
                  setInputData(newValue);
                }
              }}
            />

          </div>
          
          <div className="buttonContainer">
            <div className="btnGroup">

              <div className="dropdown">
                <select className="leftSideButton" value={selectedLanguage} 
                  onChange={(e) => {handleLanguageChange(e.target.value as "html" | "javascript" | "python")}}
                >
                  <option value="html">HTML</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
              </div>

              <div className="dropdown">
                <select className="leftSideButton" value={editorTheme} 
                  onChange={(e) => {handleThemeChange(e.target.value as "hc-black" | "vs-light")}}
                >
                  <option value="vs-light">Light</option>
                  <option value="hc-black">Dark</option>
                </select>
              </div>

              <button type="button"  className={`linkButton ${!shareableLink ? "disabled" : ""}`} onClick={() => {
                  navigator.clipboard.writeText(shareableLink).then(() => {
                    alert("Link copied to clipboard");
                  }).catch(err => {
                    console.error("Error: ", err);
                    alert("Failed to copy link to clipboard");
                  });
                }} 
                disabled={!shareableLink}
              >
                <Image src="/images/link.svg" height={20} width={40} alt="" />
                {shareableLink ? "Click to copy link" : "No link available"}
              </button>

              <button type="button" className={`shareButton ${!inputData.trim() ? "disabled" : ""}`} disabled={!inputData.trim()} 
              onClick={async () => {
                await saveData();
                // await fetchAllData();
                }}>
                <img src="/images/Share.svg" alt="" />
                Share
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}