import { useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries"
import PersonForm from "./components/PersonForm"
import { useState } from "react"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} onClose={``} />
      <PersonForm setError={setErrorMessage} />
      <PhoneForm setError={setErrorMessage} />
    </div>
  )
}

export default App
