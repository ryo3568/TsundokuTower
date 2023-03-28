import { Route, Routes, BrowserRouter } from "react-router-dom"
import { useState, useEffect } from "react"
import Register from "./pages/user/register"
import Login from "./pages/user/login"
import ReadAll from "./pages/item/readAll"
import ReadSingle from "./pages/item/readSingle"
import ReadFinished from "./pages/item/readFinished"
import ReadUnread from "./pages/item/readUnread"
import Create from "./pages/item/create"
import Header from "./components/header"
import Footer from "./components/footer"
import Main from "./pages/item/main"
import "./App.css"

const App = () => {
  const [login, setLogin] = useState(false)
  const [books, setBooks] = useState({
    pages: 0,
    numbers: 0,
  })

  useEffect(() => {
    const getAllItems = async() => {
      const response = await fetch("https://tsundokutower.onrender.com/item/unread", {
          method: "POST",
          headers: {
              "Accept" : "application/json",
              "Content-Type": "application/json",
              "authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      const jsonResponse = await response.json()
      let pages_sum = 0
      let numbers_sum = 0
      jsonResponse.unreadItems.map(item => {
        pages_sum += item.pages 
        numbers_sum += 1
      })
      setBooks({
        pages: pages_sum,
        numbers: numbers_sum,
      })
    }
    getAllItems()
    const token = localStorage.getItem('token')
    if(token){
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  }, [])

  return (
    <BrowserRouter>
    <div>
      <Header login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login setLogin={setLogin}/>} />
        <Route path="/item/all" element={<ReadAll />} />
        <Route path="/item/finished" element={<ReadFinished />} />
        <Route path="/item/unread" element={<ReadUnread />} />
        <Route path="/" element={<Main login={login} books={books}/>} />
        <Route path="/item/single/:id" element={<ReadSingle books={books} setBooks={setBooks}/>} />
        <Route path="/item/create" element={<Create books={books} setBooks={setBooks} />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App