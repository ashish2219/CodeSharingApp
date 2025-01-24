'use client';

import React, { useState } from "react";
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


  // const [langDropdown, setLangDropdown] = useState(false); //language dropdown state
  // const [themeDropdown, setThemeDropdown] = useState(false); //theme dropdown state
  const [editorTheme, setEditorTheme] = useState("vs-light"); //editor theme state
  const [containerTheme, setContainerTheme] = useState("light"); //container theme state
  const [selectedLanguage, setSelectedLanguage] = useState("html"); //editor language state
  const [editorValue, setEditorValue] = useState(defaultHTML);



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
      <img src="/images/NoteCodeLogo.svg" alt="logo" />
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

            <Editor
              theme={editorTheme} //Dynamic theme
              height="65vh"
              language={selectedLanguage}
              value={editorValue}
              onChange={(newValue) => {
                if (newValue !== undefined) {
                  setEditorValue(newValue);
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

              {/* <div className="dropdown">
                <button type="button" className="leftSideButton" onClick={() => {setLangDropdown(!langDropdown)}}>
                  {selectedLanguage === "html" ? "HTML"
                   : selectedLanguage === "javascript" ? "JavaScript"
                   : "Python"
                  }
                  <img src="/images/down arrow.svg" alt="" />
                </button>
                {langDropdown && (
                  <div className="dropdownmenu">
                    <div className="dropdownitem" onClick={() => handleLanguageChange("html")}>HTML</div>
                    <div className="dropdownitem" onClick={() => handleLanguageChange("javascript")}>JavaScript</div>
                    <div className="dropdownitem" onClick={() => handleLanguageChange("python")}>Python</div>
                  </div>
                )} 
              </div> */}

              <div className="dropdown">
                <select className="leftSideButton" value={editorTheme} 
                  onChange={(e) => {handleThemeChange(e.target.value as "hc-black" | "vs-light")}}
                >
                  <option value="vs-light">Light</option>
                  <option value="hc-black">Dark</option>
                </select>
              </div>

              {/* <div className="dropdown">
                <button type="button" className="leftSideButton" onClick={() => {setThemeDropdown(!themeDropdown)}}>
                  {editorTheme === "hc-black"? "Dark": "Light"}
                  <img src="/images/down arrow.svg" alt="" />
                </button>
                {themeDropdown && (
                  <div className="dropdownmenu">
                    <div className="dropdownitem" onClick={() => handleThemeChange("Light")}>Light</div>
                    <div className="dropdownitem" onClick={() => handleThemeChange("Dark")}>Dark</div>
                  </div>
                )}
              </div> */}

              <button type="button" className="shareButton">
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