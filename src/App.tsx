import { useState, useEffect } from 'react'
import './App.css'
import AttendeesList, { Attendee } from './AttendeesList'
import Form from './Form'



function App() {
  const [data, setData] = useState<Attendee[]>([]);
  
  useEffect(() => {
    getData();
  },[]);  

const saveData = (data: Attendee) => {
  fetch('http://localhost:3000/attendees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      getData();
    })
    .catch((err) => console.log('error', err))
}

const getData = async () => {
  try {
    const response = await fetch('http://localhost:3000/attendees', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    setData(result);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <>
      <Form saveDataFn={saveData}/>
      <div className='bottomPart'>
        <AttendeesList dataFn={getData} attendees={data} setDataFn={setData} />
      </div>
    </>
  );
}

export default App


