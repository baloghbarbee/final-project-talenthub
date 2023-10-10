import { useState, useEffect } from 'react'
import './App.css'
import AttendeesList, { Attendee } from './AttendeesList'
import Form from './Form'



function App() {
  const [newData, setNewData] = useState();
  
  useEffect(() => {
    displayedUpdatedData();
  },[]);  

const saveData = (data: any) => {
  fetch('http://localhost:3000/attendees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      displayedUpdatedData();
    })
    .catch((err) => console.log('error', err))
}

const displayedUpdatedData = async () => {
  try {
    const response = await fetch('http://localhost:3000/attendees', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    setNewData(result);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <>
      <Form saveDataFn={saveData}/>
      <div className='bottomPart'>
        <AttendeesList dataFn={displayedUpdatedData} updatedData={newData} />
      </div>
    </>
  );
}

export default App


