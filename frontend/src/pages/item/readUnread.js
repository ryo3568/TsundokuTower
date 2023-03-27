
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ReadUnread = () => {

    const [unreadItems, setUnreadItems] = useState()

    useEffect(() => {
        document.title = "Unread Books"

        const getUnreadItems = async() => {
            const response = await fetch("http://localhost:5000/item/unread")
            const jsonResponse = await response.json()
            setUnreadItems(jsonResponse)
        }
        getUnreadItems()
    }, [])
    
    return (
        <div>
            <div>
                <h1>積読本一覧</h1>
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
    )
}

export default ReadUnread