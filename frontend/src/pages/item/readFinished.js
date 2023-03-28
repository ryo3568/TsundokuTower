
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ReadFinished = () => {

    const [finishedItems, setFinishedItems] = useState()

    useEffect(() => {
        document.title = "Finished Books"

        const getFinishedItems = async() => {
            // const response = await fetch("https://tsundokutower.onrender.com/item/finished")
            // const jsonResponse = await response.json()
            // setFinishedItems(jsonResponse)
            const response = await fetch("https://tsundokutower.onrender.com/item/finished", {
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const jsonResponse = await response.json()
            setFinishedItems(jsonResponse)
        }
        getFinishedItems()
    }, [])
    
    return (
        <div>
            <div>
                <h1>読了本一覧</h1>
                <div className="books">
                    {finishedItems && finishedItems.finishedItems.map(item => 
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

export default ReadFinished