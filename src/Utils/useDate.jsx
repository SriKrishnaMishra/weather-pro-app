// import { use } from "react";

// export const useDate = () => {

//     const local = 'en';
//     const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

//     useEffect(() => { 

//         const timer = setInterval(() => { // Creates an interval which will update the current data every minute
//             setDate(new Date());
//         }, 60 * 1000);
//         return () => {
//             clearInterval(timer);
//          } // Return a function to clear the timer so that it will stop being called on unmount  
//     }, [])
 
//     // This empty array is a trick to run the effect only on the first render
//       const day = today.toLocalDateString(local, { weekday: 'long' }); // long week day name
   
//       const date = `${day}, ${today.getDate()}, ${today.toLocalDateString(locale, { month: 'long' })}\n\n`; // Full date, e.g. Friday, 25, December
      
//       const time = today.toLocaleTimeString(local, { hour: 'numeric', hour12: true, minute: 'numeric' }); // 11:59 AM
       
//       return {date, time};
//     }

import { useEffect, useState } from "react";

export const useDate = () => {
    const locale = 'en';
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60*1000)

        return () => {
            clearInterval(timer)
        }
    },[])

    const day = today.toLocaleDateString(locale, {weekday: 'long'})
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month: 'long'})}\n\n`
    const time = today.toLocaleDateString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' })

    return {
        date, time
    }
}