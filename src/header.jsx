import logo from'./assets/logo.png'
export default function Header({darkMode}){
  return(
    <>
      <header className={darkMode ? "dark-header" : ""}>
        <img src={logo} alt="ai study logo"></img>
        <h1>AI Study Buddy</h1>
      </header>
    </>
  )
}