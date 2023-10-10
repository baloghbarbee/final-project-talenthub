import { useState, useEffect } from 'react'
import './App.css'

export interface Attendee {  
    'name': string;
    'e-mail': string;
    "birthdate": string,
    "moreInfo": string,
    "file": string,
    "id": string;
}

function Attendees(props: { dataFn: () => void; updatedData: any}) {
    const [attendeesData, setAttendeesData] = useState<Attendee[]>([]);

    useEffect(() => {
      fetch('http://localhost:3000/attendees', {
        method: 'GET',
      })
        .then(response => {
          if (response.ok) {
            return response.json()
            }
            throw response;
          })
          .then((data) => {

            setAttendeesData(data);
          })
          .catch((err) => console.log(err));
    },[]);

    function removeAttendee(id: string) {
        fetch(`http://localhost:3000/attendees/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
            if (response.ok) {
                return response.json()
                }
                throw response;
            })
            .then((data) => {

                console.log(data, 'Marecekove bajky a vysvetlovania');
                props.dataFn();
            })
    }


    return (
        <div className='listOfAttendees'>
            {(!props.updatedData ? attendeesData : props.updatedData).map((attendee: Attendee, index: any) => (
                <div className='attendee' key={index}>
                    <div className='fieldName'>
                        <h1>#</h1>
                        <p>{attendee.id}</p>
                    </div>
                    <div className='fieldName'>
                        <h1>Image</h1>
                        <img src={attendee.file} />
                    </div>
                    <div className='fieldName'>
                        <h1>Name</h1>
                        <p>{attendee.name}</p>
                    </div>
                    <div className='fieldName'>
                        <h1>Email</h1>
                        <p>{attendee['e-mail']}</p>
                    </div>
                    <div className='fieldName'>
                        <h1>More info</h1>
                        <p>{attendee.moreInfo}</p>
                    </div>
                    {/* <h1>Image {attendee.file}</h1> */}
                    <button className='removeButton' onClick={() => removeAttendee(attendee.id)}>X</button>
                </div>
            ))}
        </div>
    )
}

export default Attendees;