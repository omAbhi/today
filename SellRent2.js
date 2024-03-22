import classes from "./SellRent2.module.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Disclaimer from "../ADMIN/Disclaimer";
import Popup from "../Popup/Popup";
import ErrorPopup from "../ADMIN/CREATE/ErrorPopup";

import img1 from '../asset/dashboard.jpg'

const SellRent2 = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [detail, setDetail] = useState('');
    const [profile, setProfile] = useState('');
    const [cover, setCover] = useState([]);
    const [text, setText] = useState(0);
    let [step, setStep] = useState(1);
    const [alert, setAlert] = useState(false);
    const [already, setAlready] = useState(false);
    const [myload, setMyload] = useState(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [postingError, setPostingError] = useState(false)

    const user = cookies.token;

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8800/property", { params: { user } });
            //console.log(response.data);
            setDetail(response.data[0])
            //console.log(detail)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    const [negotiable, setNegotiable] = useState('');
    const [frontarea, setFrontarea] = useState('');
    const [ceilingHt, setCeilingHt] = useState('');
    const [value, setValue] = useState({
        hereto: "",
        building_name: "",
        property_type: "",
        building_type: "",
        //possession: "",
        furnishing: "Unfurnished",
        parking: "No",
        floor_no: "",
        total_floor_no: "",
        balcony: "No",
        property_age: "",
        owner_type: "",
        owner_name: "",
        locality: "",
        city: "",
        bhk: "",
        sqft: "",
        d_address: "",
        bathroom: "",
        price: "",
        contact_number: "",
        Available_From: "",
    });


    const handleChange = (e) => {
        //console.log({...value, [e.target.name] : e.target.value});
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const HndChg2 = (e) => {
        setCeilingHt(e.target.value)
        console.log(ceilingHt)
    }

    const propHnd = (e) => {
        setProfile(e.target.files[0])
        console.log(profile)
    }

    const coverHnd = (e) => {
        setCover(e.target.files)
        console.log(cover)
    }

    const negotiableHnd = () => {
        setNegotiable('Yes')
    }

    const negotiableHnd2 = () => {
        setNegotiable('No')
    }

    const frontAreaHnd = () => {
        setFrontarea('Yes')
    }

    const frontAreaHnd2 = () => {
        setFrontarea('No')
    }


    const navigate = useNavigate();

    const closePopup = () => {
        setIsPopupOpen(false);
        setAlready(false);
        setMyload(false)
    };
    const errorPopupClose = () => {
        setPostingError(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setIsPopupOpen(true);
        setMyload(true)
        const id = cookies.token2;

        const formdata = new FormData();
        // formdata.append("youare", value.youare)
        formdata.append("hereto", value.hereto)
        formdata.append("building_name", value.building_name)
        formdata.append("property_type", value.property_type)
        formdata.append("building_type", value.building_type)
        //formdata.append("possession", value.possession)
        formdata.append("furnishing", value.furnishing)
        formdata.append("parking", value.parking)
        formdata.append("floor_no", value.floor_no)
        formdata.append("total_floor_no", value.total_floor_no)
        formdata.append("balcony", value.balcony)
        formdata.append("property_age", value.property_age)
        formdata.append("owner_type", value.owner_type)
        formdata.append("owner_name", value.owner_name)
        formdata.append("locality", value.locality)
        formdata.append("city", value.city)
        formdata.append("bhk", value.bhk)
        formdata.append("sqft", value.sqft)
        formdata.append("d_address", value.d_address)
        formdata.append("bathroom", value.bathroom)
        formdata.append("price", value.price)
        formdata.append("contact_number", value.contact_number)
        formdata.append('id', id)
        formdata.append('negotiable', negotiable)
        formdata.append("Available_From", value.Available_From)
        { value.property_type === 'Commercial' && formdata.append('frontarea', frontarea) }
        { value.property_type === 'Commercial' && formdata.append('ceilingHt', ceilingHt) }
        formdata.append('profile', profile)
        for (let i = 0; i < cover.length; i++) {
            formdata.append('cover', cover[i]);
        }


        await axios.post("http://localhost:8800/send2", formdata)
            .then((res) => {
                console.log(res.data.status)
                if (res.data.status == 'already posted') {
                    setMyload(false)
                    setAlready(true);
                    navigate('/mydashboard')
                    //console.log('posted already')
                } else {
                    setMyload(false)
                    setIsPopupOpen(true);
                    navigate('/mydashboard')
                }
                //setAlert(true);


            })
            .catch(err => {
                console.log("Individual Property Posting Error", err)
                setPostingError(true)
                setMyload(false)
                setIsPopupOpen(false)
                setAlready(false)
            });
        //navigate("/")
    };

    const backHnd = () => {
        setStep(step = step - 1)
        console.log(step)
    }

    const nextHnd = () => {
        setStep(step = step + 1)
        console.log(step)

    }

    const alertBtnHld = () => {
        setAlert(false);
    }

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

    return (
        <>
            <div>


                {<div className={classes.container}>
                    <div className={classes.left}>
                        <h1>Sell or Rent your Property</h1>
                        <p>You are posting this property for <span className={classes.highlight}>FREE!</span></p>
                        <form className={classes.form_container} onSubmit={handleSubmit}>
                            <div className={classes.history}>
                                <div className={classes.col}><p>You are here to <span className={classes.required}>*</span>  </p><select name="hereto" onChange={handleChange} className={classes.sel} required>
                                    <option className={classes.sel} value="No">Select</option>
                                    <option className={classes.sel}>Sell </option>
                                    <option className={classes.sel}>Rent/Lease </option>
                                </select> </div>
                                <p className={classes.note}>Note : Inputs Marked with  *  are Mandatory</p>
                                <div className={classes.fill2}>
                                    <h3>Property Details : </h3>
                                    <div className={classes.underline}></div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Property Name/Building Name <span className={classes.required}>*</span> : </p><input type="text" maxLength='40' name="building_name" onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>Property Type <span className={classes.required}>*</span> : </p><select name="property_type" onChange={handleChange} className={classes.sel} required>
                                            <option>Select</option>
                                            <option>Residential</option>
                                            <option>Commercial</option>
                                            <option>Land & Plotting</option>
                                        </select></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Building Type <span className={classes.required}>*</span> : </p><select name="building_type" onChange={handleChange} className={classes.sel} required>
                                            <option>Select</option>
                                            {value.property_type === 'Residential' && <option>Apartment</option>}
                                            {value.property_type === 'Commercial' && <option>Office</option>}
                                            {value.property_type === 'Residential' && <option>Bunglow</option>}
                                            {value.property_type === 'Residential' && <option>Row House</option>}
                                            {value.property_type === 'Commercial' && <option>Factory</option>}
                                            {value.property_type === 'Commercial' && <option>Educatinal</option>}
                                            {value.property_type === 'Commercial' && <option>Shop</option>}
                                        </select></div>
                                        <div className={classes.col}><p>Contact Number <span className={classes.required}>*</span> : </p><input type="number" maxLength="13" onInput={maxLengthCheck} name="contact_number" onChange={handleChange} className={classes.in1} required /></div>
                                        {/*<div className={classes.col}><p>Possession Status : </p><select name="possession" onChange={handleChange} className={classes.sel} required>
                                            <option>Select</option>
                                            <option>Under Construction</option>
                                            <option>Ready to Move</option>
                                        </select></div>*/}
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Furnishing Status: </p><select name="furnishing" onChange={handleChange} className={classes.sel} required >
                                            <option>Select</option>
                                            <option>Fully Furnished</option>
                                            <option>Semi Furnished</option>
                                            <option>Unfurnished</option>
                                        </select></div>
                                        <div className={classes.col}><p>Parking: </p><select name="parking" onChange={handleChange} className={classes.sel} required>
                                            <option>Select</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Floor No <span className={classes.required}>*</span> : </p><input type="number" min='0' maxLength="2" onInput={maxLengthCheck} name="floor_no" onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>Total No. of Floors <span className={classes.required}>*</span> : </p><input type="number" min='1' maxLength="2" onInput={maxLengthCheck} name="total_floor_no" onChange={handleChange} required /></div>

                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}>
                                            <p>Balcony: </p><select name="balcony" onChange={handleChange} className={classes.sel} required>
                                                <option>Select</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select></div>
                                        <div className={classes.col}><p>Age of Property ( In Years) <span className={classes.required}>*</span> : </p><input type="number" min='1' maxLength="2" onInput={maxLengthCheck} name="property_age" onChange={handleChange} required /></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Property Owner <span className={classes.required}>*</span> : </p><select name="owner_type" onChange={handleChange} className={classes.sel} required>
                                            <option>Select</option>
                                            <option>Single Owner</option>
                                            <option>Resale Property</option>
                                            <option>New Property</option>
                                        </select></div>
                                        <div className={classes.col}><p>Owner Name <span className={classes.required}>*</span> : </p><input type="text" maxLength='40' name="owner_name" onChange={handleChange} required /></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Locality <span className={classes.required}>*</span> : </p><input type="text" name="locality" onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>City <span className={classes.required}>*</span>: </p><input type="text" name="city" onChange={handleChange} required /></div>
                                    </div>
                                    <div className={classes.row}>
                                        {value.building_type === 'Apartment' && <div className={classes.col}><p>No. of BHk <span className={classes.required}>*</span> : </p><input type="number" min='1' maxLength="1" onInput={maxLengthCheck} name="bhk" onChange={handleChange} required /></div>}
                                        <div className={classes.col}><p>Area (Carpet Area in sqft) <span className={classes.required}>*</span> : </p><input type="number" name="sqft" min='0' maxLength="5" onInput={maxLengthCheck} onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>Available From:</p><input type="date" name="Available_From" onChange={handleChange}></input></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Detailed Address <span className={classes.required}>*</span> : <span className={classes.txtL}>{text}/250</span></p><textarea onInput={textareaHnd} maxLength="250" type="text" name="d_address" onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>No. of Bathrooms <span className={classes.required}>*</span> : </p><input type="text" min='0' maxLength="1" onInput={maxLengthCheck} name="bathroom" onChange={handleChange} required /></div>
                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>{value.hereto == "Rent/Lease" ? "Expected Rent" : "price"} <span className={classes.required}>*</span> : </p><input type="Number" minLength='1' onInput={inputHnd2} name="price" onChange={handleChange} required /></div>
                                        <div className={classes.col}><p>Price Negotiable <span className={classes.required}>*</span> :</p></div>
                                        <div className={classes.col2}>
                                            <p onClick={negotiableHnd} className={`${negotiable === 'Yes' ? classes.firstClass : classes.secondClass}`}>Yes</p>
                                            <p onClick={negotiableHnd2} className={`${negotiable === 'No' ? classes.firstClass : classes.secondClass}`}>No</p>
                                        </div>

                                    </div>
                                    <div className={classes.row}>
                                        <div className={classes.col}><p>Property Image <span className={classes.required}>*</span>: </p><input onChange={propHnd} type="file" accept="image/*" name="profile" /></div>
                                        <div className={classes.col}><p>Cover Image <span className={classes.required}>*</span> : </p><input onChange={coverHnd} type="file" multiple accept="image/*" name="cover" /></div>
                                    </div>

                                    {value.property_type == 'Commercial' && <div className={classes.row}>
                                        <div className={classes.col}>
                                            <p>Ceiling Height (in feet) <span className={classes.required}>*</span> :</p>
                                            <input type="Number" name='ceiling' min="1" value={ceilingHt} onChange={HndChg2}></input>
                                        </div>
                                        <div className={classes.col2}>
                                            <p>Front Area <span className={classes.required}>*</span> :</p>
                                            <p onClick={frontAreaHnd} className={`${frontarea === 'Yes' ? classes.firstClass : classes.secondClass}`}>Yes</p>
                                            <p onClick={frontAreaHnd2} className={`${frontarea === 'No' ? classes.firstClass : classes.secondClass}`}>No</p>
                                        </div>
                                    </div>}

                                    <Disclaimer></Disclaimer>

                                    <button className={classes.btnSbt}>Submit</button>
                                </div>
                            </div>


                        </form>
                        {isPopupOpen && <Popup onClose={closePopup} txt1='SuccessFully Posted' txt2='Your property will be live after verification' txt3='.' />}
                        {already && <Popup onClose={closePopup} txt1='Property Already Posted' txt2='User can post one property for free' txt3='.' />}
                        {myload && <Popup onClose={closePopup} txt1='posting property' txt3='' />}
                        {postingError && <ErrorPopup txt1="Technical Error : Property Not Posted" txt2="Cheak all inputs are filled properly and try again" onClose={errorPopupClose} />}
                    </div>
                    <div className={classes.right}>
                        <p className={classes.rTxt}>Quick Links</p>
                        <Link to='/' className={classes.rBtn2}><button className={classes.rBtn}>Home</button></Link>
                        <Link to='/mydashboard' className={classes.rBtn2}><button className={classes.rBtn}>My Dashboard</button></Link>


                    </div>
                </div >}

            </div >

            {/*///////alert//////*/}

            {/*alert && <div className={classes.alertHold}>
                <div className={classes.alertHold1}>
                    <p>Message</p>
                </div>
                <p className={classes.alertTxt}>Form Submitted Successfully</p>
                <p className={classes.alertTxt2}>Your Posting Will be Live After Verification</p>
                <p className={classes.alertTxt2}>THANKYOU!</p>

                <div className={classes.btnHld}>
                    <button onClick={alertBtnHld} className={classes.alertBtn}>OK</button>
                </div>
            </div>*/}


        </>
    );
};
export default SellRent2;