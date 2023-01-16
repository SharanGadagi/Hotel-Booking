import React, {useState, useContext} from 'react';
import Header from '../../Components/Header/Header';
import Navbar from '../../Components/Navbar/Navbar';
import ContactMail from '../../Components/ContactMail/ContactMail';
import Footer from '../../Components/Footer/Footer';
import {ImLocation2} from 'react-icons/im';
import {
    FaArrowAltCircleRight,
    FaArrowAltCircleLeft,
    FaHotel,
} from 'react-icons/fa';
import useFetch from '../../Hook/useFetch.js';

import {GiCancel} from 'react-icons/gi';
import './SingleHotel.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {SearchContext} from '../../Context/SearchContext.jsx';
import {AuthContext} from '../../Context/AuthContext';
import ReserveModal1 from '../../Components/ReserveModal/ReserveModal1';
// import ReserveModal1 from '../../Components/ReserveModal1/ReserveModal'
// import { set } from 'date-fns'

const SingleHotel = () => {
    const location = useLocation();
    const hotelid = location.pathname.split('/')[2];
    const navigate = useNavigate();
    // console.log(location)
    const [sliderNumber, setSliderNumber] = useState(0);
    const [openSlider, setOpenSlider] = useState(false);
    const [openReserveModal, setOpenReserveModal] = useState(false);

    const {data, loading, error, reFetch} = useFetch(
        `http://localhost:8000/api/hotel/find/${hotelid}`,
    );

    // search handler using searchContext
    const {date, persons} = useContext(SearchContext);
    console.log(date);

    // days find out
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysFindOut = (startDate, endDate) => {
        const timeDifference = Math.abs(
            endDate.getTime() - startDate.getTime(),
        );
        const dayDifference = Math.ceil(timeDifference / MILLISECONDS_PER_DAY);
        return dayDifference;
    };
    const days = daysFindOut(date[0].endDate, date[0].startDate);
    console.log(days);

    const handlleOpen = (i) => {
        setSliderNumber(i);
        setOpenSlider(true);
    };

    const handlemove = (direction) => {
        let newSliderNumber;
        if (direction === 'left') {
            newSliderNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
        } else {
            newSliderNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
        }
        setSliderNumber(newSliderNumber);
    };

    //reserve button
    const {user} = useContext(AuthContext);
    const handleClick = () => {
        if (user) {
            setOpenReserveModal(true);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Navbar />
            <Header type='list' />
            {loading ? (
                'Loading.......'
            ) : (
                <div className='hotelContainer'>
                    {openSlider && (
                        <div className='slider'>
                            <GiCancel
                                className='close'
                                size='1.8rem'
                                onClick={() => setOpenSlider(false)}
                            />
                            <FaArrowAltCircleLeft
                                className='arrow'
                                onClick={() => handlemove('left')}
                            />
                            <div className='sliderWrapper'>
                                <img
                                    src={data.photos[sliderNumber]}
                                    alt=''
                                    className='sliderImg'
                                />
                            </div>

                            <FaArrowAltCircleRight
                                className='arrow'
                                onClick={() => handlemove('right')}
                            />
                        </div>
                    )}
                    <div className='hotelWrapper'>
                        <button className='bookNow' onClick={handleClick}>
                            Reserve or Book Now
                        </button>
                        <h1 className='hotelTitle'>{data.name}</h1>
                        <div className='hotelAddress'>
                            <ImLocation2 />
                            <span className='hotelLocation'>
                                {data.address}{' '}
                            </span>
                        </div>
                        <span className='hotelDistance'>
                            Excellent location {data.distance}m from center
                        </span>
                        <span className='hotelPrice'>
                            Book a stay over ${data.cheapestPrice} at this
                            property and get a free airport taxi
                        </span>
                        <div className='hotelImgs'>
                            {data.photos?.map((item, i) => (
                                <div className='hotelImgWrapper'>
                                    <img
                                        src={item}
                                        alt='hotel Img'
                                        onClick={() => handlleOpen(i)}
                                        className='hotelImg'
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='hotelDetails'>
                            <div className='hotelDesc'>
                                <h1 className='hotelDetail-title'>
                                    {data.title}
                                </h1>
                                <p className='hotelPara'>{data.desc} </p>
                            </div>
                            <div className='hotelHighlightPrice'>
                                <h1>Perfect for {days} nights stay</h1>
                                <span>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Eligendi, dolores.
                                </span>
                                <h2>
                                    <b className='priceBold'>
                                        $
                                        {days *
                                            data.cheapestPrice *
                                            persons.room}{' '}
                                    </b>
                                    ({days}-nights)
                                </h2>
                                <button
                                    className='hotelPriceBtn'
                                    onClick={handleClick}
                                >
                                    Reserve or Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <ContactMail />
                    <Footer />
                </div>
            )}
     
            {openReserveModal && (
                <ReserveModal1
                    setOpen={setOpenReserveModal}
                    hotelId={hotelid}
                />
            )}
        </>
    );
};

export default SingleHotel;
