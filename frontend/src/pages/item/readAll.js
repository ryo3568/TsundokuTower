
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../utils/useAuth"

const ReadAll = () => {

    const [finishedItems, setFinishedItems] = useState()
    const [unreadItems, setUnreadItems] = useState()

    const loginUser = useAuth()

    useEffect(() => {

        document.title = "All Books"

        const getAllItems = async() => {
            const finishedResponse = await fetch("https://tsundokutower.onrender.com/item/finished", {
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const jsonFinishedResponse = await finishedResponse.json()
            setFinishedItems(jsonFinishedResponse)

            const unreadResponse = await fetch("https://tsundokutower.onrender.com/item/unread", {
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const jsonUnreadResponse = await unreadResponse.json()
            setUnreadItems(jsonUnreadResponse)
        }
        getAllItems()
    }, [])
    
    return (
        <div>
            <div>
                <h1 className="allbooks-title">蔵書一覧</h1>
                <div>
                    <h2>読了本</h2>
                    <div className="books">
                        {finishedItems && finishedItems.finishedItems.map(item => 
                            <Link to={`/item/single/${item._id}`} key={item._id}>
                                <img className="books-img" src={item.image} alt="item" />
                                <div>
                                    <h3>『{item.title.length >= 5 ? item.title.substring(0,5) + "..." : item.title}』</h3>
                                    <h4>{item.author}</h4>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="border">積読本</h2>
                    <div className="books">
                        {unreadItems && unreadItems.unreadItems.map(item => 
                            <Link to={`/item/single/${item._id}`} key={item._id}>
                                <img className="books-img" src={item.image} alt="item" />
                                <div>
                                    <h3>『{item.title.length > 5 ? item.title.substring(0,5) + "..." : item.title}』</h3>
                                    <h4>{item.author}</h4>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadAll