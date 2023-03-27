import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import bookshelf from "../../images/hondana.png"
import tsundoku from "../../images/tsundoku.png"

// 対象物
import catImage from "../../images/kuroneko.png"
import cupImage from "../../images/cup.png"
import carImage from "../../images/car.png"

const Main = (props) => {

    const objects = {
        "cup": {
            "name": "コップ",
            "height": 10,
            "image": cupImage,
        },
        "cat": {
            "name": "猫",
            "height": 40,
            "image": catImage,
        },
        "car" :{
            "name": "車",
            "height": 200,
            "image": carImage,
        }
    }

    const [object, setObject] = useState(objects.cup)
    const [height, setHeight] = useState(1)
    const [style, setStyle] = useState({
        height: object.height * 10
    })

    useEffect(() => {
        document.title = "つんどくタワー"
        if(props.books.numbers == 0) {
            setHeight(0)
        }
        else{
            var res = (props.books.pages *  0.1 / 2 + 0.15 * 2) *10
            res = Math.round(res)
            res /= 100
            setHeight(res)
        }
        if(height === 0){
            setStyle({
                height: 200
            })
        }
        else{
            setStyle({
                height: object.height * 300 / height
            })
        }
    }, [props.books, object, height])

    return (
        <div>
            {props.login && 
                <div className="box2">
                    <h1>積読本の冊数：{props.books.numbers}冊</h1>
                    <h1>積読の高さ:{height}cm</h1>
                    <div className="object">
                        <h1>比較対象：</h1>
                        <label className="selectbox-002">
                            <select onChange={(e) => setObject(objects[e.target.value])}>
                                <option value="cup">コップ</option>
                                <option value="cat">猫</option>
                                <option value="car">車</option>
                            </select>
                        </label>
                    </div>
                    <h1>比較対象の高さ：{object.height}cm</h1>
                </div>
            }
            <div className="content">
                <Link to="/item/finished"><img className="bookshelf" src={bookshelf}/></Link>
                <img style={style} src={object.image} />
                <Link to="/item/unread"><img className="tsundoku" src={tsundoku}/></Link>
            </div>
        </div>
    )
}

export default Main