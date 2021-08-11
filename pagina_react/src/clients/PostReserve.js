
const PostReserve = (licensePlate) => {
  const requestOption={
    method: "post",
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify({"placa":licensePlate, "horaIngreso":"10:20"})};
  fetch('http://localhost:80/api/reservations/', requestOption)
  .then(response => response.json());
  console.log(requestOption);
}

export default PostReserve;