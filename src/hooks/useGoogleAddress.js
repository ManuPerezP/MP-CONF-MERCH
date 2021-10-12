import { useState, useEffect } from 'react';
import axios from 'axios';

const useGoogleAddress = address =>{
    const API_KEY = 'AIzaSyDiSUZFrqTVOvMlhgXkkseAMiCDszPHP34';
    const [map, setMap] = useState({});
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    const getCoordinates = async (api) => {
        const response = await axios(api);

        console.log(response);

        return response
      }

    useEffect( async () => {
        const res = await getCoordinates(API);
        setMap(res.data.results[0].geometry.location);
      }, []);

      return map;
}

export default useGoogleAddress;
