const PostData = (description) => {
    const requestOption = {
        method: "post",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ "detail": description })
    };
    fetch('http://localhost:8080/api/spaces/', requestOption)
    .then(response => response.json());
};

export default PostData;


