import React, { useEffect } from 'react';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import useEventTrashedStore from '../stores/EventTrashedStore';

export default function EventTrashedList() {
    const {trashedEvents, isLoading, fetchTrashedEvents, deleteEvent} = useEventTrashedStore((state) => ({
        trashedEvents: state.trashedEvents,
        isLoading: state.isLoading,
        fetchTrashedEvents: state.fetchTrashedEvents,
        deleteEvent: state.deleteEvent,
    }));
    
    useEffect(() => {
        fetchTrashedEvents();
    }, [])

    const deleteClickHandler = (event) => {
        deleteEvent(event.id);
    }

    return (
        <>
            <div className='float-start'><h4>Trashed Event List</h4></div>
            <div className='float-end clearfix'>
                <Link className="btn btn-info" to="/">Back</Link>
            </div>
            <br/><br/><br/>

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
                    {trashedEvents.map((event, index) => (
                        <tr data-index={index} key={index}>
                            <td>{index+1}</td>
                            <td>{event.title}</td>
                            <td>{event.desc}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{event.status}</td>
                            <td align='center'><button title='Delete' className='btn btn-danger' onClick={()=>deleteClickHandler(event)}><FaTrash /></button></td>
                        </tr>
                    ))}  
                </tbody>
            </table>
        </>
    );
}