import React, { useContext, useState } from 'react'
import './Header.css'
import { HeaderData } from './HeaderData'
import { SlCalender } from 'react-icons/sl'
import { BsFillPersonFill } from
    'react-icons/bs'
import { FaBed } from 'react-icons/fa'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../Context/SearchContext'
import { AuthContext } from '../../Context/AuthContext'

const Header = ({type}) => {
    const {user} =useContext(AuthContext)

    const navigate=useNavigate();
    // calender
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }])

    const [openDate,setOpenDate]=useState(false);

    // persons

    const [persons,setPersons]=useState({
adult:1,
children:0,
room:1
    })

    const [openPerson,setOpenPerson]=useState(false)

    // persons count function

    const handleCount=(name,operation)=>{
     setPersons((prev)=>{
        return{
            ...prev,
            [name]:operation==='i'?persons[name]+1:persons[name]-1
        }
     })
    }

    // search handler using searchContext
    const {dispatch}=useContext(SearchContext)

// handleSearch
const [destinations,setDestinations]=useState("")

const handleSearch=()=>{
    dispatch({type:"NEW_-SEARCH",payload:{destinations,date,persons}})
    navigate('/hotels',{state:{destinations,date,persons}})

}

    return (
        <>
            <div className="header">
                <div className={type==="list"?  "headerContainer hotelList":"headerContainer"}>
                    <div className="headerList">
                        {HeaderData.map((item) => (
                            <div className="hearerListItem" key={item.id}>
                                {item.icon}
                                <span className="header-icon-name">{item.desc} </span>

                            </div>
                        ))}

                    </div>
                    { type !=="list" &&
                        <><h1 className="header-title">A Lifetime of discounts? it's Genius</h1>
                    <p className="header-desc">Get rewarded for your travels-unlock instant savings of 10% or more with a free LamaBooking account</p>
                {  !user &&  <button className="header-btn">Sign in/Register</button>}

                    <div className="header-search">
                        <div className="headerSearch-item">
                            <FaBed color='rgb(105, 103, 103)' size='1.2rem' />
                            <input type="text" className="headerSearchInput" placeholder='Where are you going' 
                            onChange={(e)=>setDestinations(e.target.value)}
                            />
                        </div>
                        <div className="headerSearch-item">
                            <SlCalender color='rgb(105, 103, 103)' size='1.1rem' />
                            <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">
                                {`${format(date[0].startDate, "MM/dd/yyyy")} To ${format(date[0].endDate, "MM/dd/yyyy")}`}
                            </span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className='calendar'
                            />}
                        </div>
                        <div className="headerSearch-item">
                            <BsFillPersonFill color='rgb(105, 103, 103)' size='1.1rem' />
                            <span onClick={()=>setOpenPerson(!openPerson)} className="headerSearchText">
                                {`${persons.adult} Adult . ${persons.children} Children .${persons.room} Room`}
                            </span>
{openPerson && <div className="personOptions">
    <div className="p-optionItem">
        
        <span className="personText">Adult</span>
        <div className="optionCounter">
        <button className="personCountBtn" disabled={persons.adult<=1} onClick={()=>handleCount("adult","d")}>-</button>
        <span className="personCount">{persons.adult}</span>
        <button className="personCountBtn" onClick={()=>handleCount("adult","i")}>+</button>
        </div>
    </div>
    <div className="p-optionItem">
        <span className="personText">Children</span>
        <div className="optionCounter">
        <button className="personCountBtn" disabled={persons.children<=0} onClick={()=>handleCount("children","d")}>-</button>
        <span className="personCount">{persons.children}</span>
        <button className="personCountBtn" onClick={()=>handleCount("children","i")}>+</button>
        </div>
    </div>
    <div className="p-optionItem">
        <span className="personText">Room</span>
        <div className="optionCounter">
        <button className="personCountBtn" disabled={persons.room<=1} onClick={()=>handleCount("room","d")}>-</button>
        <span className="personCount">{persons.room}</span>
        <button className="personCountBtn" onClick={()=>handleCount("room","i")}>+</button>
        </div>
    </div>
</div>}

                        </div>
                        <div className="headerSearch-item">
                            <button className="headerSearch-btn" onClick={handleSearch}>Search</button>
                        </div>
                    </div></>}
                </div>
            </div>
        </>
    )
}

export default Header
