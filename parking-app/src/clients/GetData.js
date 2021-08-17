
const GetData = (API) => {
  const infor = fetch(API)
  .then(response => response.json())
  return infor;
};

export default GetData;