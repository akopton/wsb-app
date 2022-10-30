import { useEffect, useState } from "react";
import LoginPanel from "./LoginPanel";
import Panel from './RegisterPanel'
const App = () => {


  const getDataFromDatabase = () => {
    const url = 
    fetch
  }

  useEffect(() => {
    getDataFromDatabase()
  },[])

  return (
    <div>
      <LoginPanel />
      {/* <Panel /> */}
    </div>
  )
}
export default App;
