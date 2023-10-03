import { useState } from 'react'
import './App.css'
import validator from 'validator'

function App() {
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [email, setEmail] = useState('');
  const [mailValid, setMailValid] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [birthdateValid, setBirthdateValid] = useState(false);
  const [moreinfo, setMoreinfo] = useState('');
  const [error, setError] = useState('');

  
 //EMAIL

  function handleEmailInputChange({target}: React. ChangeEvent<HTMLInputElement> ) {
    setEmail(target.value);
    setMailValid(isMailValid(target.value));
  };

  function isMailValid(text: string) {
    const valid = /^(?:[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+)*)@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;
    if(text.match(valid)) {
      return true;
    } else {
      return false;
    }
  };

  //NAME 

  function handleNameInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
    setName(target.value);
    setNameValid(isNameValid(target.value));
  };

  function isNameValid(text: string) {
    const valid = /^[a-zA-Z]+$/;
    if(text.match(valid)) {
      return true;
    } else {
      return false;
    }
  };

  // BIRTHDATE

  function handleBirthdateInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
    setBirthdate(target.value);
    setBirthdateValid(isBirthdateValid(target.value));
    ageValidation(target.value);
  };

  function isBirthdateValid(text: string) {
    const valid = /^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{4})$/;
    if(text.match(valid) && validator.isDate(text, {
      delimiters: ['.'],
      format: 'DD.MM.YYYY',
    })) {
      return true;
    } else {
      return false;
    }
  };

  function ageValidation(text: string) {
    const currentYear = new Date().getFullYear();
    const year = parseInt((text).split(".")[2]);
    const age = currentYear - year;
    if (age < 18) {
      setError('wrong');
    } else if (age > 99) {
      setError('wrong');
    } else {
      setError('');
    }
  };

  // MORE INFO

  function handleMoreInfoInputChange({target}: React. ChangeEvent<HTMLInputElement>) {
    setMoreinfo(target.value);
  }


  const styleError = {
  backgroundColor: 'hsl(354, 84%, 57%, 0.4)',
  borderColor: 'hsl(354, 84%, 57%, 0.4)'
  }


  return (
      <div>
        <div className='form'>
          <div className='name'>
            <div className='leftPart'>
              <h1>Name</h1>
              <p>*required</p>
            </div>
            <input style={!nameValid && name !== '' ? styleError : undefined} type='text' placeholder="John Smith" minLength={3} maxLength={40} onChange={handleNameInputChange}></input>
          </div>
          {!nameValid && name !== '' && (<div className="notsuccess">Valid name required</div>)}
          <div className='title'>
            <div className='leftPart'>
              <h1>E-mail</h1> 
              <p>*required</p>
            </div>
            <input style={!mailValid && email !== '' ? styleError : undefined} placeholder="email@company.com" maxLength={80} minLength={3} onChange={handleEmailInputChange}></input>
          </div>
          {!mailValid && email !== '' && (<div className="notsuccess">Valid email required</div>)}
          <div className='title'>
            <div className='leftPart'>
              <h1>Birthdate</h1> 
              <p>*required</p>
            </div>
            <input style={!birthdateValid && birthdate !== '' || error === 'wrong' ? styleError : undefined} placeholder="15.07.2000" maxLength={10} onChange={handleBirthdateInputChange}></input>
          </div>
          {!birthdateValid && birthdate !== '' && (<div className="notsuccess">Valid birthdate required</div>)}
          {error === "wrong" ? (<div className="notsuccess">Invalid age</div>) : undefined}
          <div className='title'>
            <h1>More info</h1>
            <input onChange={handleMoreInfoInputChange}></input>
          </div>
          <div className='imageUpload'>
            <h1>File upload</h1>
            <input type='file'></input>
            <h1>Image preview</h1>
            <img src="/vite.svg" alt=""/>
            <button type='submit' style={{ cursor: !mailValid || !nameValid || !birthdateValid ? 'not-allowed' : 'pointer' }} disabled={!mailValid || !nameValid || !birthdateValid}>Submit</button>
          </div>
        </div>
        <div className='listOfAttendees'>
          <div className='attendee'>
            <h1>name</h1>
            <h2>email</h2>
          </div>
        </div>
      </div>
  );
}

export default App
