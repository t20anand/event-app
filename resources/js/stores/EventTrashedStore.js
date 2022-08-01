import { toast } from "react-toastify";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const eventTrashedStore = (set) => ({
    trashedEvents: [],
    isLoading: false,
    fetchTrashedEvents: async () => {
        set({isLoading: true});
        
        let url = '/api/event/trashed';

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
            set({trashedEvents: resJson.data})
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
    deleteEvent: async (eventId) => {
        set({isLoading: true});
        
        let url = '/api/event/delete/'+eventId;

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
                trashedEvents: state.trashedEvents.filter((e) => e.id !== eventId)
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

const useEventTrashedStore = create(
    devtools(eventTrashedStore)
);

export default useEventTrashedStore;



