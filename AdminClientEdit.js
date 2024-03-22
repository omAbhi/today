import { useEffect, useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import classes from './AdminClientEdit.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminPopup from '../CREATE/AdminPopup';

const AdminClientEdit = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [data, setData] = useState('');
    const [text, setText] = useState(0);
    const [negotiable, setNegotiable] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState([]);



    const getData = async () => {
        let id = cookies.edit
        console.log(id)

        try {
            const res = await axios.get("http://localhost:8800/adminIndividualEdit", { params: { id } });
            console.log(res.data)
            setData(res.data[0])

        } catch (err) {
            console.log(err)
        }
    }  //getData end
    //
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }

        if (object.target.value < object.target.min) {
            object.target.value = null
        }
    }

    const inputHnd2 = (object) => {
        if (object.target.value < object.target.minLength) {
            object.target.value = null;

        }
    }

    const textareaHnd = (object) => {
        setText(object.target.value.length)
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }
    // nagotiable
    const negotiableHnd = () => {
        setNegotiable('Yes')
    }

    const negotiableHnd2 = () => {
        setNegotiable('No')
    }
    //
    const hndChg1 = (e) => {
        const name = e.target.name;
        setData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));

    }
    const handleimage1 = (e) => {
        setImage1(e.target.files[0])
    }
    const handleimage2 = (e) => {
        setImage2(e.target.files)
    }
    const navigate = useNavigate();
    // after submit popup

    const [already, setAlready] = useState(false);
    const [myload, setMyload] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => {
        setIsPopupOpen(false)
        setAlready(false)
        setMyload(false)
        navigate("/dashboard")
    }


    const sbtHnd = (e) => {
        e.preventDefault()
        //setMyload(true)
        //console.log(data.COVER)
        setMyload(true)
        const formdata = new FormData();
        formdata.append('ID', data.ID)
        formdata.append('CUST_PURP', data.CUST_PURP)
        formdata.append('PROPERTY_NAME', data.PROPERTY_NAME)
        formdata.append('BUILDING_TYPE', data?.BUILDING_TYPE)
        formdata.append('FURNISHING', data?.FURNISHING)
        formdata.append('FLOOR_NO', data?.FLOOR_NO)
        formdata.append('CITY', data?.CITY)
        formdata.append('LOCALITY', data?.LOCALITY)
        formdata.append('PROPERTY_OWNER', data?.PROPERTY_OWNER)
        formdata.append('OWNER_NAME', data?.OWNER_NAME)
        formdata.append('SQFT', data?.SQFT)
        formdata.append('BHK', data?.BHK)
        formdata.append('D_ADDRESS', data?.D_ADDRESS)
        formdata.append('PROP_IMAGE', image1 ? image1 : data?.PROP_IMAGE)
        formdata.append('PROPERTY_TYPE', data?.PROPERTY_TYPE)
        formdata.append('CONTACT', data?.CONTACT)
        formdata.append('PARKING', data?.PARKING)
        formdata.append('BALCONY', data?.BALCONY)
        formdata.append('TOTAL_FLOOR', data?.TOTAL_FLOOR)
        formdata.append('AGE_OF_PROPERTY', data?.AGE_OF_PROPERTY)
        formdata.append('BATHROOM', data?.BATHROOM)
        formdata.append('PRICE', data?.PRICE)
        formdata.append('NEGOTIABLE', data?.NEGOTIABLE)
        formdata.append('COVER_IMAGE', data?.COVER_IMAGE)
        for (let i = 0; i < image2.length; i++) {
            formdata.append('COVER_IMAGE', image2[i])
        }

        /*
        formdata.append('THUMBNAIL' , thumbnail ? thumbnail : data?.THUMBNAIL)
        for (let i = 0 ; i < coverimg.length ; i++){
            formdata.append('coverimg' , coverimg[i])
        }*/


        axios.put('http://localhost:8800/adminsideclientEditSubmit', formdata)
            .then(res => {
                setMyload(false);
                setIsPopupOpen(true)
            })
            //.then(navigate('/all_project_details'))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Link to="/client_side_request" className={classes.backBtn}>Back to Dashboard</Link>
            <div className={classes.container}>

                <form onSubmit={sbtHnd} className={classes.col}>
                    <p className={classes.head}>Edit Property of <span className={classes.highlight}>{data?.PROPERTY_NAME}</span></p>
                    <div className={classes.divHold}>

                        <div className={classes.left}>
                            <div className={classes.divIn}>
                                <label>You Are Here To:</label>
                                <select name='CUST_PURP' onChange={hndChg1}>
                                    <option>{data?.CUST_PURP}</option>
                                    {data?.CUST_PURP !== 'Sell' && <option>Sell</option>}
                                    {data?.CUST_PURP !== 'Rent/Lease' && <option>Rent/Lease</option>}
                                </select>
                            </div>

                            <div className={classes.divIn}>
                                <label>Property/Building Name:</label>
                                <input name='PROPERTY_NAME' type='text' defaultValue={data?.PROPERTY_NAME} onChange={hndChg1}></input>
                            </div>

                            <div className={classes.divIn}>
                                <label>Building Type:</label>
                                <select onChange={hndChg1} name='BUILDING_TYPE'>
                                    <option>{data?.BUILDING_TYPE}</option>
                                    {data?.BUILDING_TYPE !== 'Apartment' && data?.PROPERTY_TYPE === 'Residential' && <option>Apartment</option>}
                                    {data?.BUILDING_TYPE !== 'Office' && data?.PROPERTY_TYPE === 'Commercial' && <option>Office</option>}
                                    {data?.BUILDING_TYPE !== 'Bunglow' && data?.PROPERTY_TYPE === 'Residential' && <option>Bunglow</option>}
                                    {data?.BUILDING_TYPE !== 'Row House' && data?.PROPERTY_TYPE === 'Residential' && <option>Row House</option>}
                                    {data?.BUILDING_TYPE !== 'Factory' && data?.PROPERTY_TYPE === 'Commercial' && <option>Factory</option>}
                                    {data?.BUILDING_TYPE !== 'Educatinal' && data?.PROPERTY_TYPE === 'Commercial' && <option>Educatinal</option>}
                                    {data?.BUILDING_TYPE !== 'Shop' && data?.PROPERTY_TYPE === 'Commercial' && <option>Shop</option>}
                                    {data?.BUILDING_TYPE !== 'Land & Plotting' && data?.PROPERTY_TYPE === 'Land & Plotting' && <option>Land & Plotting</option>}
                                </select>
                            </div>

                            <div className={classes.divIn}>
                                <label>Furnishing Status:</label>
                                <select onChange={hndChg1} name='FURNISHING'>
                                    <option>{data?.FURNISHING}</option>
                                    {data?.FURNISHING !== 'Fully Furnished' && <option>Fully Furnished</option>}
                                    {data?.FURNISHING !== 'Semi Furnished' && <option>Semi Furnished</option>}
                                    {data?.FURNISHING !== 'UnFurnished' && <option>UnFurnished</option>}
                                </select>
                            </div>
                            <div className={classes.divIn}>
                                <p>Floor No  : </p><input type="number" onChange={hndChg1} min='0' maxLength="2" onInput={maxLengthCheck} name="FLOOR_NO" defaultValue={data?.FLOOR_NO} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Property Owner : </p><select onChange={hndChg1} name="PROPERTY_OWNER" className={classes.sel} required>
                                    <option>{data?.PROPERTY_OWNER}</option>
                                    {data?.PROPERTY_OWNER !== 'Single Owner' && <option>Single Owner</option>}
                                    {data?.PROPERTY_OWNER !== 'Resale Property' && <option>Resale Property</option>}
                                    {data?.PROPERTY_OWNER !== 'New Property' && <option>New Property</option>}
                                </select>
                            </div>
                            <div className={classes.divIn}>
                                <p>Owner Name : </p><input type="text" maxLength='40' onChange={hndChg1} name="OWNER_NAME" defaultValue={data?.OWNER_NAME} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>City : </p><input type="text" name="CITY" onChange={hndChg1} defaultValue={data?.CITY} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Area (Carpet Area in Sq.Ft) : </p><input type="number" name="SQFT" min='0' maxLength="5" onInput={maxLengthCheck} onChange={hndChg1} defaultValue={data?.SQFT} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>No. of BHk : </p><input type="text" min='1' onChange={hndChg1} name="BHK" defaultValue={data?.BHK} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Detailed Address : <span className={classes.txtL}>{text}/250</span></p><textarea onInput={textareaHnd} maxLength="250" type="text" onChange={hndChg1} name="D_ADDRESS" defaultValue={data?.D_ADDRESS} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Property Image : </p><input type="file" accept="image/*" name="PROP_IMAGE" onChange={handleimage1} />
                                <div className={classes.cv}>
                                    {data?.PROP_IMAGE?.split(',')?.map((image, index) => (
                                        <img key={index}
                                            src={`http://localhost:8800/BUILDER/${image}`}
                                            alt='Property Image' />
                                    ))}
                                </div>
                            </div>
                        </div> {/*left div end*/}

                        <div className={classes.right}>
                            <div className={classes.divIn}>
                                <label>Property Type  : </label>
                                <select name="PROPERTY_TYPE" onChange={hndChg1} className={classes.sel} required>
                                    <option>{data?.PROPERTY_TYPE}</option>
                                    {data?.PROPERTY_TYPE !== 'Residential' && <option>Residential</option>}
                                    {data?.PROPERTY_TYPE !== 'Commercial' && <option>Commercial</option>}
                                    {data?.PROPERTY_TYPE !== 'Land & Plotting' && <option>Land & Plotting</option>}
                                </select>
                            </div>
                            <div className={classes.divIn}>
                                <label>Contact Number  : </label><input type="number" maxLength="13" onInput={maxLengthCheck} onChange={hndChg1} name="CONTACT" defaultValue={data?.CONTACT} className={classes.in1} required />
                            </div>
                            <div className={classes.divIn}>
                                <label>Parking: </label><select name="PARKING" onChange={hndChg1} className={classes.sel} required>
                                    <option>{data?.PARKING}</option>
                                    {data?.PARKING !== 'Yes' && <option>Yes</option>}
                                    {data?.PARKING !== 'No' && <option>No</option>}
                                </select>
                            </div>
                            <div className={classes.divIn}>
                                <label>Balcony: </label><select name="BALCONY" onChange={hndChg1} className={classes.sel} required>
                                    <option>{data?.BALCONY}</option>
                                    {data?.BALCONY !== 'Yes' && <option>Yes</option>}
                                    {data?.BALCONY !== 'No' && <option>No</option>}
                                </select>
                            </div>
                            <div className={classes.divIn}>
                                <p>Total No. of Floors : </p><input type="number" min='1' maxLength="2" onChange={hndChg1} defaultValue={data?.TOTAL_FLOOR} name="TOTAL_FLOOR" required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Age of Property ( In Years): </p><input type="number" min='1' maxLength="2" onChange={hndChg1} name="AGE_OF_PROPERTY" defaultValue={data?.AGE_OF_PROPERTY} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Locality : </p><input type="text" name="LOCALITY" onChange={hndChg1} defaultValue={data?.LOCALITY} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>No. of Bathrooms : </p><input type="text" min='0' maxLength="1" onChange={hndChg1} name="BATHROOM" defaultValue={data?.BATHROOM} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>price : </p><input type="text" minLength='1' onInput={inputHnd2} onChange={hndChg1} name="PRICE" defaultValue={data?.PRICE} required />
                            </div>
                            <div className={classes.divIn}>
                                <p>Price Negotiable :</p>
                                <div className={classes.row}>
                                    <button type='button' name='NEGOTIABLE' value='Yes' onClick={hndChg1} defaultValue={data?.NEGOTIABLE} className={`${data?.NEGOTIABLE === 'Yes' ? classes.firstClass : classes.secondClass}`}>Yes</button>
                                    <button type='button' name='NEGOTIABLE' value='No' onClick={hndChg1} defaultValue={data?.NEGOTIABLE} className={`${data?.NEGOTIABLE === 'No' ? classes.firstClass : classes.secondClass}`}>No</button>
                                </div>
                            </div>

                            <div className={classes.divIn}>
                                <p>Cover Image : </p><input type="file" multiple accept="image/*" name="COVER_IMAGE" onChange={handleimage2} />
                                <div className={classes.cv}>
                                    {data?.COVER_IMAGE?.split(',').map((cover, index) => (

                                        <img
                                            key={index}
                                            src={`http://localhost:8800/BUILDER/${cover}`}
                                            alt={`Cover ${index}`}

                                        />

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className={classes.updateButton}>UPDATE</button>
                </form>
                {isPopupOpen && <AdminPopup onClose={closePopup} txt1="Property Updated Succesfully"></AdminPopup>}
                {myload && <AdminPopup onClose={closePopup} txt1="Property Updating .." txt2='Do not Press Back / Refresh '></AdminPopup>}
            </div>
        </>
    )
}

export default AdminClientEdit;