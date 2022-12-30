import React, { useEffect, useState } from "react";
import CustomerDetails from "./Components/CustomerDetails";

function App() {
  const [customerInfo, setCustomerInfo] = useState([]);
  let customersInfoCopy = [...customerInfo];
  const [userName,setUserName] = useState("");
  const [order, setOrder] = useState(true);
  const getData = () => {
    return fetch(
      "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
    )
      .then((response) => response.json())
      .then((data) => setCustomerInfo(data));
  };
  useEffect(() => {
    getData();
  }, []);

  function sortOrder(labelName,order) {
    if (order) {
      customersInfoCopy.sort((a, b) =>
        a.labelName > b.labelName ? 1 : b.labelName > a.labelName ? -1 : 0
      );
    } else {
      customersInfoCopy.sort((a, b) =>
        a.labelName > b.labelName ? -1 : b.labelName > a.labelName ? 1 : 0
      );
    }
  }
  sortOrder("last_name",true);
  function searchCustomer(serchString){
    if(serchString === "string" && serchString.length === 0){
      return customersInfoCopy = [...customerInfo];
    }else{
      customersInfoCopy = customersInfoCopy.filter((customersInfoCopy) => (customersInfoCopy.first_name + customersInfoCopy.last_name).toLowerCase().includes(serchString) )
    }
  }
  function userNameHandler(event){
    setUserName(event.target.value)
  }
  return (
    <div className="App">
      <h1>Users</h1>
        <input type="text" placeholder='Search by first or last name' onChange={userNameHandler}></input>
        <button onClick={searchCustomer(userName)}>Search</button>
      <CustomerDetails customersInfoCopy={customersInfoCopy}/>
    </div>
  );
}

export default App;
