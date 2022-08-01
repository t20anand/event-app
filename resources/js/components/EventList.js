import React, { useEffect } from 'react';
import { FaPen, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import EventFilter from './EventFilter';
import  useEventStore  from '../stores/EventStore';

export default function EventList() {
    const navigate = useNavigate();

    const {events, isLoading, fetchEvents, trashEvent} = useEventStore((state) => ({
        events: state.events,
        isLoading: state.isLoading,
        fetchEvents: state.fetchEvents,
        trashEvent: state.trashEvent,
    }));
    
    useEffect(() => {
        fetchEvents();
    }, [])

    const trashClickHandler = (event) => {
        trashEvent(event.id);
    }

    const editClickHandler = (event) => {

    }

    return (
        <>
            <div className='float-start'><h4>Event List</h4></div>
            <div className='float-end clearfix'>
                <Link className="btn btn-success" to="/add">Add Event</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link className="btn btn-warning" to="/trash">Trash Bin</Link>
            </div>

            <br/><br/>
            <div className='row col-md-4'><EventFilter /></div>
            <br/>

            <table className="table table-bordered table-striped">
                <thead className="table-thead">
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-tbody">
                    {events.map((event, index) => (
                        <tr data-index={index} key={index}>
                            <td>{index+1}</td>
                            <td>{event.title}</td>
                            <td>{event.desc}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{event.status}</td>
                            <td align='center'>
                                <button title="Edit" className='btn btn-info' onClick={()=>navigate('/edit?eventid='+event.id)}><FaPen /></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button title="Trash" className='btn btn-warning' onClick={()=>trashClickHandler(event)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}  
                </tbody>
            </table>
        </>
    );
}