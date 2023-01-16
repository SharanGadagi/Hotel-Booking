import React, {useContext, useState} from 'react';
import './ReserveModal.css';
import {ImCancelCircle} from 'react-icons/im';
import useFetch from '../../Hook/useFetch.js';
import {SearchContext} from '../../Context/SearchContext.jsx';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ReserveModal1 = ({setOpen, hotelId}) => {
    const [selectRooms, setSelectRooms] = useState([]);
    const {data, loading, error} = useFetch(
        `http://localhost:8000/api/hotel/room/${hotelId}`,
    );
    const {date} = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const dates = new Date(start.getTime());

        const dateList = [];

        while (date <= end) {
            dateList.push(new Date(date).getTime());
            dates.setDate(date.getDate() + 1);
        }

        return dateList;
    };

    const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

    const isDateAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            alldates.includes(new Date(date).getTime()),
        );

        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRooms(
            checked
                ? [...selectRooms, value]
                : selectRooms.filter((item) => item !== value),
        );
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectRooms.map((roomId) => {
                    const res = axios.put(
                        `http://localhost:8000/api/room/availability/${roomId}`,
                        {
                            date: alldates,
                        },
                    );
                    return res.data;
                }),
            );
            setOpen(false);
            navigate('/');
        } catch (err) {}
    };
    return (
        <>
            <div className='reserve'>
                <div className='reserver-container'>
                    <ImCancelCircle
                        size='1.6rem'
                        className='rClose'
                        onClick={() => setOpen(false)}
                    />
                    <span className='sRoom'>Select your room: </span>
                    {data.map((item) => {
                        return (
                            <div className='rItem'>
                                <div className='rInfo'>
                                    <div className='rTitle'>{item.title} </div>
                                    <div className='rDesc'>{item.desc} </div>
                                    <div className='rMax'>
                                        Max People: <b>{item.maxPeople} </b>{' '}
                                    </div>
                                    <div className='rPrice'>${item.price} </div>
                                </div>
                                <div className='rSelectRoom'>
                                    {item.roomNumbers.map((roomNumber) => {
                                        return (
                                            <div className='roomNumbers'>
                                                <label>
                                                    {roomNumber.number}{' '}
                                                </label>
                                                <input
                                                    type='checkbox'
                                                    value={roomNumber._id}
                                                    onChange={handleSelect}
                                                    disabled={
                                                        !isDateAvailable(
                                                            roomNumber,
                                                        )
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    <button className='rBtn' onClick={handleClick}>
                        Reserve Now!
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReserveModal1;
