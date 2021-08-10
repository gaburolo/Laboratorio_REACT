import { useState, useEffect } from 'react';

const PostData = (description) => {
    fetch("https://localhost/api/spaces",{method:'POST', body:JSON.stringify({'detalle':description}),headers:{
    'Content-Type': 'application/json'}
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
};

export default PostData;