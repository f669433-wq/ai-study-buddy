
  // I COMMENTED YOU BECAUSE I GOT CONFUSED AND WANTED TO START A FRESH, I WILL COME BACK AND SAY HI TO YOU OFTEN COS I LOVE EVERY BIT OF YOU TOO MUCH TO DELETE YOU😊🤗😛🙄😅😎😋🤭🤓

// import ReactMarkdown from "react-markdown"
// import React from 'react'
// import {getStudyMaterial} from './ai.js'
// export default function Body(){
  
//   const [prevChats,setPrevChats] = React.useState([])
//   const [studyMaterial, setStudyMaterial] = React.useState('')
//   const [topic,setTopic] = React.useState('')
//   async function getTopic(formData){
//     const newTopic=formData.get('topic')
//     setTopic(newTopic)
//     const result = await getStudyMaterial(newTopic)
//     setStudyMaterial(result)
//     const chat = {
//       user: newTopic,
//       ai: result
//     }
//     const prevChat = [...prevChats,chat]
//     setPrevChats(prevChat)
   
//   }
   

//   return(
//     <>
//       <form action={getTopic}>
//         <p>What do want to learn?</p>
//         <div className="form-container">
//           <input name='topic' placeholder="Enter your topic here"></input>
//           <button>Generate</button>
//         </div>
//       </form>
//       {studyMaterial && <div className="content"><ReactMarkdown >
//           {studyMaterial}
//         </ReactMarkdown></div>}
        
//       {prevChats.map((chat) => (
//           <div className="content">
            
//               {chat.user}
//               {chat.ai}
           
//           </div>
//     ))}
        
//     </>
//   )
// }


  // U MADE ME STARE AT U FOR SO LONG LOOKING FOR THE BUGS U KEPT HIDING 😠😩🙄😡
import ReactMarkdown from "react-markdown"
import React from "react"
import { getStudyMaterial } from "./ai.js"

export default function Body({ darkMode, setDarkMode }) {
  const [loading, setLoading] = React.useState(false)

  const messagesEndRef = React.useRef(null)
  // Array of messages in the active conversation: [{ user: string, ai: string }] YOU BETTER BEHAVE MY FRIENDS 
  const [currentChat, setCurrentChat] = React.useState([])

  // Array of past  conversations: [[ { user, ai }, ... ]]
  const [prevChats, setPrevChats] = React.useState([])

  // Controlled input state
  const [topic, setTopic] = React.useState("")

  const [activeChatIndex, setActiveChatIndex] = React.useState(null)

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  async function getTopic(formData) {
    const newTopic = formData ? formData.get("topic") : topic

    if (!newTopic || !newTopic.trim()) return

    // Clear input field right after submit OR ELSE 🤬
    setTopic("")

    // Pass the active chat history along with the new query so the AI maintains context
    try {
    const result = await getStudyMaterial(newTopic, currentChat)

    const chatMessage = {
      user: newTopic,
      ai: result
    }

    setCurrentChat((prev) => [...prev, chatMessage])
  } catch (error) {
    console.error(error)

    const chatMessage = {
      user: newTopic,
      ai: "Sorry, something went wrong. Please try again."
    }

    setCurrentChat((prev) => [...prev, chatMessage])
  }
  finally {
    setLoading(false)
  }
}
  React.useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentChat])

  function handleNewChat() {
  if (currentChat.length === 0) return

  if (activeChatIndex === null) {
    setPrevChats(prev => [...prev, currentChat])
  }

  setCurrentChat([])
  setActiveChatIndex(null)
}

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Sidebar for chat history ] STAY ASIDE FROM MY BUSINESS YOU REMAINED IN THE PAST🙄*/}
      <button
      className="menu-btn"
      onClick={() => {console.log('clicked') 
        setIsSidebarOpen(prev => !prev)}}
      
    >
      ☰
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Study Buddy</h2>
        <button
          className="dark-mode-btn"
          onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button className="new-chat" onClick={handleNewChat}>
          + New Chat
        </button>

        <div className="history">
          
          {prevChats.map((chatHistory, index) => (
        <div
          className="history-item"
          key={index}
          onClick={() => {
            setCurrentChat(chatHistory)
            setActiveChatIndex(index)
          }}
        >
          {chatHistory[0]?.user || `Chat #${index + 1}`}
        </div>
))}

        </div>
      </aside>

      {/* Active Conversation Container] U SILLY CONTAINER CONTAIN YOURSELF OR I FINISH U😡 */}
      <main className="chat-container">
        <div className="messages">
          {currentChat.map((chat, index) => (
            <div className="conversation" key={index}>
              <div className="user-message">
                <p>{chat.user}</p>
              </div>
              <div className="ai-message">
                <ReactMarkdown>{chat.ai}</ReactMarkdown>
              </div>
            </div>
          ))}
           <div ref={messagesEndRef}></div>
           {loading && (
          <div className="ai-message loading">
            <p>Thinking...</p>
          </div>
          )}
        </div>

        {/* [Floating Input Bar]  HOW DO I STOP U FROM FLOATING AND STICK YOU TO THE HEADER, U R REALLY ANNOYING ME 🙄🤣*/}
        <form action={getTopic} className="chat-form">
          <div className="form-container">
            <input
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What do you want to learn?"
            />
            <button type="submit" disabled={loading}> {loading ? "Thinking..." : "Send"}</button>
          </div>
        </form>
      </main>
    </div>
  )
}