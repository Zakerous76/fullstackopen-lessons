import { useApolloClient, useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries"
import PersonForm from "./components/PersonForm"
import { useState } from "react"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setErrorMessage} />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} onClose={``} />
      <PersonForm setError={setErrorMessage} />
      <PhoneForm setError={setErrorMessage} />
    </div>
  )
}

export default App
