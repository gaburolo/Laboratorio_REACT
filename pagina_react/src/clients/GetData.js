import { useEffect } from 'react';

const GetData = (API, spaces, setSpaces) => {
  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setSpaces(data));
  }, []);
  return spaces;
};

export default GetData;