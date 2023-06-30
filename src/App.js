
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  state = {
    selectedFile: null,
    fileUploadedSuccessfully: false
  }
  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  }
  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    //  api call
    axios.post("https://r3bjn1jjhl.execute-api.us-east-1.amazonaws.com/dev/inde-file-storage", formData).then(() => {
      this.setState({ selectedFile: null });
      this.setState({ fileUploadedSuccessfully: true });
    })
    console.log(formData);
   

  }
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p> File Name:: {this.state.selectedFile.name}</p>
          <p> File Type:: {this.state.selectedFile.type}</p>
          <p> Last Modified:: {" "}{this.state.selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else if (this.state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>The file has been successfully uploaded</h4>
        </div>
      );
    } else {
      return (
        <div>Choose a file and then press upload</div>
      )
    }
  }
  render() {
    return (
      <div className='container'>
        <h2>Prathamesh Inde's File Upload System</h2>
        <h2>File Upload System</h2>
        <input type="file" onChange={this.onFileChange} />
        <button onClick={this.onFileUpload}>Upload</button>
        {this.fileData()}
      </div>

    );
  }
}

export default App;
