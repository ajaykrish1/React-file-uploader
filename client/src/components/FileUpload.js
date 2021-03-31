import React, {  useState } from 'react';

import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);

  const[show,setshow]=useState(false)
  const[showuploaded,setshowuploaded]=useState(false)

  function onChange(e) {
    setshow(true);
    


    
const files=e.target.files;

for(let i=0;i<files.length;i++){
  setFile(function (prevValue) {
    return [...prevValue,files[i]];
  });
  setFilename(function (prevValue) {
    return [...prevValue,files[i].name];
  });

}
  
    
  
  };

  
  const onSubmit = async e => {
    e.preventDefault();
    
    for(let i=0;i<file.length;i++){
      const formData = new FormData();
      formData.append('file', file[i]);
      
 
    
    

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;

      
      
      
      setUploadedFile(function (prevValue) {
        return [...prevValue,{ fileName, filePath }];
      });

      
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log('Successful');
      }
    }
  }
    setshow(false);
    setshowuploaded(true);
  };


  return (
   
      <div>
      <form onSubmit={onSubmit}>
        <div style={{border:"red solid 1px",height:"500px"}} className='custom-file mb-4'>
        
          
        
          <input style={{height:"500px"}}
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
            multiple
            
          />
           {show?<label  htmlFor='customFile'>
          <div style={{padding:"20px"}}>
          <h1>Selected Files</h1>
        <br/>
          {filename.map(function(fi,index){
            return(<h3 key={index}> {fi}  </h3>)
          })}
          </div>
          </label>:<label htmlFor='customFile'>
          <div style={{padding:"20px"}}>
          <h1>Choose files</h1>
          </div>
          </label>}
         
        </div>

      

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      <br/>
      {showuploaded?<h1>Uploaded Files</h1>:null}
      {uploadedFile.map(function name(UF,index) {
        
       return(
        <div key={index} >
          
         
            
          <h3 ><a href={UF.filePath}>{UF.fileName}</a></h3>
            
          
        </div>)
     })}
   </div>
  );
};

export default FileUpload;