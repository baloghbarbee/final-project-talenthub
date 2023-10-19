import { useState} from 'react'
import './App.css'

export interface Attendee {  
    'name': string;
    'e-mail': string;
    "birthdate": string,
    "moreInfo": string,
    "file": string,
    "id": string;
}

interface Props {
    dataFn: () => void; 
    attendees: Attendee[]; 
    setDataFn: (attendees: Attendee[]) => void;
}

function Attendees(props: Props) {
    const [editingId, setEditingId] = useState('');
    const [text, setText] = useState('');

    function handleEditClick(attendee: Attendee) {
        setEditingId(attendee.id);
        setText(attendee.moreInfo);
    };

    function handleChange(e: any) {
        setText(e.target.value);
    };

    function handleSaveButtonClick() {
            let updatedAttendees = props.attendees.map((attendee: Attendee) => {
                if (attendee.id === editingId) {
                    return {...attendee, moreInfo: text}
                }
                return attendee;
            });
            setEditingId('');
            fetch(`http://localhost:3000/attendees/${editingId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ moreInfo: text }),
            })
            .then((response) => response.json())
            .then(() => {
                props.setDataFn(updatedAttendees); 
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
    };

    function handleKeyDown(event: any) {
        if (event.key === 'Enter' ) {
            handleSaveButtonClick();
        }
    };

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
        .then(() => {
            props.dataFn();
        })
    }

    return (
        <div className='listOfAttendees'>
            {(props.attendees).map((attendee: Attendee) => (
                <div className='attendee' key={attendee.id}>
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
                        <div className='moreInfoField'>
                            {attendee.id === editingId ? (
                            <>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleChange} 
                                    onKeyDown={handleKeyDown}
                                />
                                <button className='editingButtons' onClick={() => handleSaveButtonClick()}>
                                    <img src='./src/assets/thick.png' alt=''/>
                                </button>
                            </>
                            ) : (
                            <>
                                <p>{attendee.moreInfo}</p>
                                <button className='editingButtons' onClick={() => handleEditClick(attendee)}>
                                    <img src='./src/assets/edit.png' alt=''/>
                                </button>
                            </>
                            )}
                        </div>
                    </div>
                    <button className='removeButton' onClick={() => removeAttendee(attendee.id)}>X</button>
                </div>
            ))}
        </div>
    )
}

export default Attendees;

