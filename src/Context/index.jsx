// import { useContext, createContext, useState, useEffect } from "react";
// import axios from 'axios'

// const StateContext = createContext()

// export const StateContextProvider = ({ children }) => {
//     const [weather, setWeather] = useState({})
//     const [values, setValues] = useState([])
//     const [place, setPlace] = useState('Jaipur')
//     const [thisLocation, setLocation] = useState('')
//     const [error, setError] = useState(null)
//     const [loading, setLoading] = useState(true)

//     // fetch api
//     const fetchWeather = async () => {
//         setLoading(true)
//         setError(null)
        
//         const options = {
//             method: 'GET',
//             url: 'https://api.openweathermap.org/data/2.5/forecast',
//             params: {
//                 aggregateHours: '24',
//                 location: place,
//                 contentType: 'json',
//                 unitGroup: 'metric',
//                 shortColumnNames: 0,
//             },
//             headers: {
//                 'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
//                 'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
//             }
//         }

//         try {
//             const response = await axios.request(options);
//             console.log('API Response:', response.data); // Debug log
            
//             if (!response.data) {
//                 throw new Error('No data received from weather API')
//             }

//             if (!response.data.locations || Object.keys(response.data.locations).length === 0) {
//                 throw new Error(`No weather data found for ${place}`)
//             }
            
//             const thisData = Object.values(response.data.locations)[0]
//             if (!thisData || !thisData.values || thisData.values.length === 0) {
//                 throw new Error('Invalid weather data format received')
//             }
            
//             setLocation(thisData.address || place)
//             setValues(thisData.values)
//             setWeather(thisData.values[0])
//         } catch (e) {
//             console.error('API Error:', e);
//             if (e.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 setError(e.response.data.message || `Error: ${e.response.status} - ${e.response.statusText}`)
//             } else if (e.request) {
//                 // The request was made but no response was received
//                 setError('No response received from weather service')
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 setError(e.message || 'Failed to fetch weather data')
//             }
//             setWeather({})
//             setValues([])
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         if (place) {
//             fetchWeather()
//         }
//     }, [place])

//     return (
//         <StateContext.Provider value={{
//             weather,
//             setPlace,
//             values,
//             thisLocation,
//             place,
//             error,
//             loading
//         }}>
//             {children}
//         </StateContext.Provider>
//     )
// }

// export const useStateContext = () => useContext(StateContext)


// filepath: c:\Users\Sri krishna mishra\OneDrive\Desktop\react js\krishna\wheater-app\src\Context\index.jsx
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Jaipur');
    const [thisLocation, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch api
    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast`,
            params: {
                q: place,
                units: 'metric',
                appid: import.meta.env.VITE_API_KEY
            }
        };

        try {
            const response = await axios.request(options);
            console.log('API Response:', response.data); // Debug log

            if (!response.data) {
                throw new Error('No data received from weather API');
            }

            if (!response.data.city || !response.data.list || response.data.list.length === 0) {
                throw new Error(`No weather data found for ${place}`);
            }

            setLocation(response.data.city.name || place);
            setValues(response.data.list);
            setWeather(response.data.list[0]);
        } catch (e) {
            console.error('API Error:', e);
            if (e.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(e.response.data.message || `Error: ${e.response.status} - ${e.response.statusText}`);
            } else if (e.request) {
                // The request was made but no response was received
                setError('No response received from weather service');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(e.message || 'Failed to fetch weather data');
            }
            setWeather({});
            setValues([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (place) {
            fetchWeather();
        }
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place,
            error,
            loading
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);