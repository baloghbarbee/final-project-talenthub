import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuid } from 'uuid';
import { isMailValid, isNameValid, isBirthdateValid, isLengthValid, ageValidation } from './formUtils.ts'
import { Attendee } from './AttendeesList.tsx';

function Form(props: { saveDataFn: (arg0: Attendee) => void; }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [moreinfo, setMoreinfo] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');

    function validate (isValid: boolean, field: string) {
        if (isValid) {
            if (errors.includes(field)) {
            setErrors(errors.filter((err) => err !== field));
            }
        } else {
            if (!errors.includes(field)) {
            setErrors([...errors, field]);
            }
        }
    } 
      
     //EMAIL
    
    function handleEmailInputChange({target}: React. ChangeEvent<HTMLInputElement> ) {
        setEmail(target.value);
        validate(isMailValid(target.value), 'mail');
    };
    
    
      //NAME 
    
    function handleNameInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
        setName(target.value);
        validate(isNameValid(target.value) && isLengthValid(target.value, 3), 'name');
    };
    
    
      // BIRTHDATE
    
    function handleBirthdateInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
        setBirthdate(target.value);
        validate(isBirthdateValid(target.value) && ageValidation(target.value), 'birthdate');
    };
    
      // MORE INFO
    
    function handleMoreInfoInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
        setMoreinfo(target.value);
    }
    
    
    const styleError = {
        backgroundColor: 'hsla(354, 84%, 57%, 0.4)',
        borderColor: 'hsla(354, 84%, 57%, 0.6)'
    }
     
    
    function handleFile(e: any) {
        setMessage("");
        const selectedFile = e.target.files[0];  
    
        if (selectedFile) {
            const fileType = selectedFile.type;
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFile(reader.result as string); 
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setMessage("only images accepted");
            }
        }
    }; 
    
    function removeImage() {
        setFile('');
    }

    function handleSubmit() {
        const newUuid = uuid();
        
        const data: Attendee = {
          "name": name,
          "e-mail": email,
          "birthdate": birthdate,
          "moreInfo": moreinfo,
          "file": file,
          "id": newUuid
        }

        props.saveDataFn(data);
        setName('');
        setEmail('');
        setBirthdate('');
        setMoreinfo('');
        removeImage();
    }
    
    return (
        <div className='form'>
            <div className='name'>
              <div className='leftPart'>
                <h1>Name</h1>
                <p>*required</p>
              </div>
              <input value={name} style={(errors.includes('name') && name !== '') ? styleError : undefined} type='text' placeholder="John Smith" minLength={3} maxLength={40} onChange={handleNameInputChange}></input>
            </div>
            {errors.includes('name') && name !== '' && (<div className="notSuccess">Valid name required (input must be at least 3 characters long)</div>)}
            <div className='title'>
              <div className='leftPart'>
                <h1>E-mail</h1> 
                <p>*required</p>
              </div>
              <input value={email} style={(errors.includes('mail') && email !== '') ? styleError : undefined} placeholder="email@company.com" maxLength={80} minLength={3} onChange={handleEmailInputChange}></input>
            </div>
            {errors.includes('mail') && email !== '' && (<div className="notSuccess">Valid email required (input must be at least 3 characters long)</div>)}
            <div className='title'>
              <div className='leftPart'>
                <h1>Birthdate</h1> 
                <p>*required</p>
              </div>
              <input value={birthdate} style={(errors.includes('birthdate') && birthdate !== '') ? styleError : undefined} placeholder="15.07.2000" maxLength={10} onChange={handleBirthdateInputChange}></input>
            </div>
            {errors.includes('birthdate') && birthdate !== '' && (<div className="notSuccess">Valid birthdate required (age must be between 18-99)</div>)}
            <div className='title'>
              <h1>More info</h1>
              <input value={moreinfo} onChange={handleMoreInfoInputChange}></input>
            </div>
            <div className='uploadAndPreview'>
            {!file ? (
                <div className='imageUpload'>
                    <h1>File upload</h1>
                    <p>{message}</p>
                    <input id='image_input' type='file' onChange={handleFile}></input>
                </div>
                ) : (
                    <div className='imagePreview'>
                        <h1>Image preview</h1>
                        <button className='removeImageButton' onClick={removeImage}>Remove Image</button>            
                        <img className='uploadedImage' src={file}/>
                        {/* <img className='uploadedImage' src={URL.createObjectURL(file)}/> */}
                    </div>
                )
            }
            </div>
            <button className='submit' type='submit' onClick={handleSubmit} style={{ cursor: errors.length !== 0 || birthdate === '' || name === '' || email === '' ? 'not-allowed' : 'pointer' }} disabled={errors.length > 0 || birthdate === '' || name === '' || email === ''}>Submit</button>
        </div>
      );
    }
    
    export default Form;
    