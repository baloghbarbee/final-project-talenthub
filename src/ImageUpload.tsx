
import {useState} from 'react';
import './App.css'

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    function handleFile(e: any) {
        setMessage("");
        const selectedFile = e.target.files[0];
            

        if (selectedFile) {
            const fileType = selectedFile.type;
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile(selectedFile);
            } else {
                setMessage("only images accepted");
            }
        }
    }; 

    function removeImage() {
        setFile(null);
    }

    return (
        <>
            {!file ? (
                <div className='imageUpload'>
                    <h1>File upload</h1>
                    <p>{message}</p>
                    <input type='file' onChange={handleFile}></input>
                </div>
                ) : (
                    <div className='imagePreview'>
                        <h1>Image preview</h1>
                        <button className='removeImageButton' onClick={removeImage}>Remove Image</button>            
                        <img className='uploadedImage' src={URL.createObjectURL(file)}/>
                    </div>
                )
            }
        </>
    );
}

export default ImageUpload;
    