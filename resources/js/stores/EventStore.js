import { toast } from "react-toastify";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const eventStore = (set) => ({
    events: [],
    isLoading: false,
    fetchEvents: async (filter) => {
        set({isLoading: true});
        
        let url = '/api/event';

        if(filter)
            url = '/api/event?'+ 'event_filter='+filter; 

        const response = await fetch(url)
        .then(res => {
            if(res.status == 200) {
                return res.json();
            }
            else{
                throw (res);
            }
        })
        .then(resJson => {
            set({events: resJson.data}) 
        })
        .catch(error => {
            return error.json();  
        })
        .then(errorJson => {
            if(errorJson)
                toast.error(errorJson.message)
        });

        set({isLoading: false});
    },
    getEventById: async (eventId) => {
        set({isLoading: true});
        
        let url = '/api/event';

        if(filter)
            url = '/api/event?'+ 'event_filter='+filter; 

        const response = await fetch(url)
        .then(res => {
            if(res.status == 200) {
                return res.json();
            }
            else{
                throw (res);
            }
        })
        .then(resJson => {
            set({events: resJson.data}) 
        })
        .catch(error => {
            return error.json();  
        })
        .then(errorJson => {
            if(errorJson)
                toast.error(errorJson.message)
        });

        set({isLoading: false});
    },
    addEvent: (event) => {
        set((state) => {
            events: [...state.events, event]
        });
    },
    postEvent: async (data) => {
        set({isLoading: true});
        
        let url = '/api/event';

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
            body: new URLSearchParams(data)
        };

        const response = await fetch(url, requestOptions)
        
        set({isLoading: false});

        return response;
    },
    trashEvent: async (eventId) => {
        set({isLoading: true});
        
        let url = '/api/event/trash/'+eventId;

        const response = await fetch(url, {method:'delete'})
        .then(res => {
            if(res.status == 200) {
                return res.json();
            }
            else{
                throw (res);
            }
        })
        .then(resJson => {
            set((state) => ({
                events: state.events.filter((e) => e.id !== eventId)
            }))
            
            toast.success(resJson.message)
        })
        .catch(error => {
            return error.json();  
        })
        .then(errorJson => {
            if(errorJson)
                toast.error(errorJson.message)
        });

        set({isLoading: false});
    }
})

const useEventStore = create(
    devtools(eventStore)
);

export default useEventStore;



