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

type UserData = {
  // name: name;
  // dob: dateofbirth;
  // location: address;
  name: string,
  age: number,
  address: string
};

export default function App() {
  const [user, setUser] = useState<UserData>({
    name: '',
    age: 0,
    address: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.currentTarget.value

    setUser({ ...user, name: value })
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      const firstUser = data.results[0]

      setUser(prev => {
        return {
          ...prev,
          name: firstUser.name.first,
          age: firstUser.dob.age,
          address: firstUser.location.street.name,
        }
      })
    }
    getData()
  }, [])

  return (
    <div className="App">
      <div>
        <form >
          <label>Enter your name:
            <input
              type="text"
              value={user.name}
              onChange={handleChange}
            />
          </label>
          <label>Enter Age:
            <input
              type="text"
              value={user.age}
            />
          </label>
          <label>Enter Address:
            <input
              type="text"
              value={user.address}
            />
          </label>
        </form>
      </div>
    </div>
  );
}
