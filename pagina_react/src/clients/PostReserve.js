
const PostReserve = (licensePlate) => {
  const requestOption={
    method: "post",
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify({"licensePlate":licensePlate})};
  fetch('http://localhost:8080/api/reservations/', requestOption)
  .then(response => response.json());
}

export default PostReserve;