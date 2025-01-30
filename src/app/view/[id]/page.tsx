"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import Image from "next/image";
import "../../globals.css";

export default function SharedSnippet() {
    const params = useParams(); // get the params from the url
    const id = params?.id; // get the id from the url

    const [editorValue, setEditorValue] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("html");
    const [editorTheme, setEditorTheme] = useState("vs-light");
    const [containerTheme, setContainerTheme] = useState("light");
    

    const router = useRouter();

    useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`/api/getSnippetById/${id}`);

        if (response.ok) {
          const data = await response.json();
          setEditorValue(data.data);
          setSelectedLanguage(data.language);
          setEditorTheme(data.theme);
          setContainerTheme(data.ContainerTheme);
        } else {
          alert("Code not found!");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching code:", error);
        alert("Something went wrong");
        router.push("/");
      }
    };

    if (id) {
      fetchCode();
    }
  }, [id, router]);

  const homeButton = () => {
    router.push("/");
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
                <label>Shared Code</label>
                <Editor
                height="65vh"
                language={selectedLanguage}
                value={editorValue}
                theme={editorTheme}
                options={{ readOnly: true }}
            />
    
              </div>
              
              <div className="sharedButtonContainer">
                <div className="sharedBtnGroup">
    
                  <div className="dropdown">
                    <select disabled className="leftSideButton" value={selectedLanguage}>
                      <option value="html">HTML</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                    </select>
                  </div>

                  <button className="homeButton" onClick={homeButton}>Create and Share Your Code</button>
    
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      );
};