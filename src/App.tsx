import { useState, useEffect } from "react";
import './App.css'

type name = {
  title: string;
  first: string;
  last: string;
}
type dateofbirth = { date: string; age: number }

type street = { number: number; name: string }

type address = {
  street: street;
  city: string;
  state: string;
  country: string;
  postcode: number
}

type user = {
  name: name;
  dob: dateofbirth;
  location: address;
};

export default function App() {
  const [result, setResult] = useState<user[]>([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("https://randomuser.me/api", {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData.results);
    };

    api();
  }, []);

  return (
    <div className="App">
       <table className="table">
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Full Name</th>
                    <th>AGE</th>
                    <th>ADDRESS</th>
                </tr>
            </thead>
            <tbody>
            {
                result.map((value, index)=>{
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.name.title} {value.name.first} {value.name.last}</td>
                            <td>{value.dob.age}</td>
                            <td>{value.location.street.number} {value.location.street.name} {value.location.state} {value.location.city} {value.location.country} {value.location.postcode}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  );
}
