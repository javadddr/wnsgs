import React, { useState } from "react";
import "./Upload.css";

function Upload(props) {
  const  {files, setFiles,preview, setPreview,urlInput, setUrlInput} = props
  const [look, setLook] = useState(true)
  console.log(look)
  const handleChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);
    setLook(true)
    const newPreviews = uploadedFiles.map((file) => {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
        });
      } else if (file.type === "application/pdf") {
        return URL.createObjectURL(file);
      } else {
        return null;
      }
    });
  
    Promise.all(newPreviews).then((values) => {
      setPreview([...preview, ...values.filter((value) => value != null)]);
    });
  };
  

  const handleURLChange = (event) => {
    setUrlInput(event.target.value);
    setLook(true)
  };

  const handleURLSubmit = () => {
    const url = urlInput;
    if (url.endsWith(".pdf") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png")) {
      setFiles([...files, url]);
      setPreview([...preview, url]);
      setUrlInput("");
    }
  };

  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newPreview = [...preview];
    newPreview.splice(index, 1);
    setPreview(newPreview);
  };

  const handleSubmit = () => {
    // Save the file(s) to state or send them to the server
    console.log("Files saved:", files);
   
    setLook(false)
    setUrlInput("");
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...uploadedFiles]);
    setLook(true)
    const newPreviews = uploadedFiles.map((file) => {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
        });
      } else if (file.type === "application/pdf") {
        return URL.createObjectURL(file);
      } else {
        return null;
      }
    });
  
    Promise.all(newPreviews).then((values) => {
      setPreview([...preview, ...values.filter((value) => value != null)]);
    });
  };
  

  

  return (
    <div className="upload-container">
       <div class="step5">
      <button  class="step4b"> 5 </button>
      </div>
      <h1 className="titlebv">Upload File</h1>
      <div className="upload-wrapper">
        <div className="upload-dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
          <p>Drag and drop files here or click to select files</p>
          <input type="file" onChange={handleChange} multiple />
        </div>
        <div>AND / OR </div>
        <div className="url-input-container">
    <input type="text" value={urlInput} onChange={handleURLChange} placeholder="Enter URL" />
    <button onClick={handleURLSubmit}>Add URL</button>
  </div>
        
        <div className="upload-preview">
          {look&& preview.map((previewItem, index) => (
            <div key={index} className="upload-preview-item">
              {previewItem.startsWith("blob") ? (
                <object width="200" height="200" data={previewItem} type="application/pdf">
                  <embed src={previewItem} type="application/pdf" />
                </object>
              ) : (
                <img src={previewItem} alt="preview" width="200" height="200" />
              )}
              <button className="remove-button" onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
     
</div>
      <br />
      <button className="addii" onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default Upload;
