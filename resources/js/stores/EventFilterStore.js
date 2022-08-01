import { toast } from "react-toastify";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const eventFilterStore = (set) => ({
    isLoading: false,
    eventsFilter: [],
    fetchFilter: async () => {
        const response = await fetch('/api/event/event-filter')
        .then(res => {
            if(res.status == 200) {
                return res.json();
            }
            else{
                throw (res);
            }
        })
        .then(resJson => {
            set({eventsFilter: resJson.data})
        })
        .catch(error => {
            return error.json();  
        })
        .then(errorJson => {
            if(errorJson)
                toast.error(errorJson.message)
        });
    }
})

const useEventFilterStore = create(
    devtools(eventFilterStore)
);

export default useEventFilterStore;



