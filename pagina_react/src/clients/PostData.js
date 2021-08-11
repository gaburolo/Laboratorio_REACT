const PostData = (description) => {
    const requestOption = {
        method: "post",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ "detalle": description })
    };
    fetch('http://localhost:80/api/spaces/', requestOption)
    .then(response => response.json());
    console.log(requestOption);
};

export default PostData;


