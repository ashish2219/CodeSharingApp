"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./globals.css";

export default function page() {
  const [langDropdown, setLangDropdown] = useState(false); //language dropdown state
  const [themeDropdown, setThemeDropdown] = useState(false); //theme dropdown state
  const [editorTheme, setEditorTheme] = useState("vs-light"); //editor theme state
  const [containerTheme, setContainerTheme] = useState("light"); //container theme state

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleThemeChange = (theme) => { //handling theme state
    if (theme === "Dark") {
      setEditorTheme("hc-black");
      setContainerTheme("dark");
    } else {
      setEditorTheme("vs-light");
      setContainerTheme("light");
    }
    setThemeDropdown(false);
  };

  return (
    <div className={`text-editor-container ${
      containerTheme === "dark" ? "dark-mode" : "" //checks if the theme is dark then it sets it to dark mode.
    }`} 
      onClick={() => {
            if(langDropdown === true) {
              setLangDropdown(false)
            } else if (themeDropdown === true) {
              setThemeDropdown(false);
            }
      }}
    >
      <div className="editor">

        <form action="#" onSubmit={handleSubmit}>

          <div className="">

            <Editor
              theme={editorTheme} //Dynamic theme
              height="65vh"
              defaultLanguage="html"
              defaultValue={`<html>
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
</html>`}
            />

          </div>
          
          <div className="buttonContainer">
            <div className="btnGroup">

              <div className="dropdown">
                <button type="button" className="leftSideButton" onClick={() => {setLangDropdown(!langDropdown)}}>
                  HTML
                  <img src="/images/down arrow.svg" alt="" />
                </button>
                {langDropdown && (
                  <div className="dropdownmenu">
                    <div className="dropdownitem">JavaScript</div>
                    <div className="dropdownitem">Python</div>
                  </div>
                )} 
              </div>

              <div className="dropdown">
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
              </div>

              <button type="button" className="shareButton">
                <img src="/images/Share.svg" alt="" />
                Share
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}