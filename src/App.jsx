import React from 'react'
import Header from'./header.jsx'
import Body from './body.jsx'
export default function App(){
  const [darkMode, setDarkMode] = React.useState(false)
  return(
    <>
    <Header darkMode={darkMode}/>
    <Body darkMode={darkMode}
        setDarkMode={setDarkMode}/>
    </>
  )
}