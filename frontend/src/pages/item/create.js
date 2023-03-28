import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../utils/useAuth"
import bookImage from "../../images/No-image-book.png"

const CreateItem = (props) => {
    const navigate = useNavigate() 

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setISBN] = useState("")
    const [image, setImage] = useState("")
    const [book, setBook] = useState()
    const [showResult, setShowResult] = useState(false)

    const handleSearch = async(e) => {
        e.preventDefault()
        try{
            let flag = false
            let query = ""
            if(title!==""){
                query += `intitle:${title}`
                flag = true
            }
            if(author!==""){
                if(flag) query += "+"
                else flag = true
                query += `inauthor:${author}`
            }
            if(isbn!==""){
                if(flag) query += "+"
                query += `isbn:${isbn}`
            }
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            const jsonData = await response.json()
            setBook(jsonData)
            setShowResult(true)
        }catch(err){
            alert("アイテム検索失敗")
        }
    }

    const handleSubmit = async(e, item) => {
        e.preventDefault()
        try{
            const response = await fetch("https://tsundokutower.onrender.com/item/create", {
                method: "POST", 
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }, 
                body: JSON.stringify({ 
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors[0],
                    image: item.volumeInfo.imageLinks.thumbnail,
                    pages: Number(item.volumeInfo.pageCount),
                    status: false,
                })
            })
            if(item.volumeInfo.pageCount === 0){
                props.setBooks({
                    pages: props.books.pages + 300, 
                    numbers: props.books.numbers + 1,
                })
            }
            else{
                props.setBooks({
                    pages: props.books.pages + item.volumeInfo.pageCount, 
                    numbers: props.books.numbers + 1,
                })
            }
            navigate("/")
        }catch(err){
            alert("アイテム作成失敗")
        }
    }

    useEffect(() => {
        document.title = "登録ページ"
    })

    const showResults = () => {
        if(book){
            if(book.totalItems === 0){
                return <h1>該当書籍なし</h1>
            }
            else{
                return (
                    book.items.map(item => 
                    <div key={item.id}>
                        {item.volumeInfo.imageLinks ?
                         <img className="books-img" src={item.volumeInfo.imageLinks.thumbnail} alt="書影"/>
                        :
                        <img className="candidate" src={bookImage} />}
                        <h3>『{item.volumeInfo.title.length > 5 ? item.volumeInfo.title.substring(0,5) + "..." : item.volumeInfo.title}』</h3>
                        <h4>{item.volumeInfo.authors[0]}</h4>
                        <button onClick={(e) => handleSubmit(e, item)}>追加</button>
                    </div>
                ))
            }
        }
    }

    const loginUser = useAuth()

    if(loginUser){
        return (
            <div>
                <h1 className="h1-create">本の追加</h1>
                <form className="create-box" onSubmit={handleSearch}>
                    <input className="create-text" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" placeholder="タイトル"  />
                    <input className="create-text" value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" name="author" placeholder="著者名"  />
                    <input className="create-text" value={isbn} onChange={(e)=>setISBN(e.target.value)} type="text" name="isbn" placeholder="ISBN" />
                    <button className="search">検索</button>
                </form>
                <div className="books">
                    {showResult && showResults()}
                </div>
            </div>
        )
    }
}

export default CreateItem