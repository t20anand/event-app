import React, { useEffect } from 'react';

import  useEventFilterStore  from '../stores/EventFilterStore';
import useEventStore from '../stores/EventStore';

export default function EventFilter() {
    const {eventsFilter, isLoading, fetchFilter} = useEventFilterStore((state) => ({
        eventsFilter: state.eventsFilter,
        isLoading: state.isLoading,
        fetchFilter: state.fetchFilter,
    }));

    const fetchEvents = useEventStore((state) => state.fetchEvents);
    
    useEffect(() => {
        fetchFilter();
    }, [])

    const filterChangeHandler = (e) => {
        fetchEvents(e.target.value);
    }

    return (
        <div className="form-inline">
            <div className="form-group">
                <label>Event Filter:&nbsp;&nbsp;</label>
                <select className="form-control" onChange={filterChangeHandler}>
                    {eventsFilter.map((row, index) => (
                        <option value={row} key={index}>{row}</option>
                    ))} 
                </select>
            </div>
        </div>
    );
}