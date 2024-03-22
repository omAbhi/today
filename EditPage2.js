import { useState, useEffect } from 'react';
import classes from './EditPage2.module.css';
import { useCookies } from 'react-cookie';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminPopup from '../CREATE/AdminPopup';

const EditPage2 = () => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [bhk, setBhk] = useState([data?.BHK])
    const [bhk2, setBhk2] = useState()
    const [tim, setTim] = useState(false)
    const [propType, setPropType] = useState([data?.PROPERTY_TYPE]);
    const [propType2, setPropType2] = useState();
    const [totalUnit, setTotalUnit] = useState();
    const [totalAcres, setTotalAcres] = useState();
    const [possession, setPossession] = useState([data?.POSSESSION]);
    const [overview, setOverview] = useState("");
    const [sportType, setSportType] = useState([data?.SPORTS]);
    const [sport2, setSport2] = useState();
    const [safetyType, setSafetyType] = useState([data?.SAFETY]);
    const [safety2, setSafety2] = useState();
    const [b_walls, setB_Walls] = useState('');
    const [bedFloor, setBedFloor] = useState('');
    const [otherBedFloor, setOtherBedFloor] = useState('');
    const [walls, setWalls] = useState('');
    const [livingFloor, setivingFloor] = useState('');
    const [bathType, setBathType] = useState([data?.BATHROOM]);
    const [bathroom2, setBathroom2] = useState();
    const [structure, setStructure] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [coverimg, setCoverimg] = useState([]);
    const [brochure, setBrochure] = useState([]);
    const [video, setVideo] = useState('');
    const [date, setDate] = useState('');
    const [builderName, setBuilderName] = useState('');
    const [bhkID, setBhkID] = useState()

    const [already, setAlready] = useState(false);
    const [myload, setMyload] = useState(false);
    const [alert, setAlert] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);



    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const convertStringToArray = (input) => {
        return input?.split(',').map((item) => ({
            value: item,
            label: item
        }));
    };

    const getData = async () => {
        let id = cookies.edit;
        try {
            const response = await axios.get('http://localhost:8800/editBuilderProp', { params: { id } })
            //console.log(response)
            setData(response.data.data[0])
            setFormFields(response.data.data2)
            //console.log(response.data.data2,'IDPROOF')
            const BHKID = response.data.data2.map((item) => item.ID)
            console.log(BHKID, 'ooop')
            setBhkID(BHKID)

            const convertedBhkArray = convertStringToArray(data?.BHK);
            setBhk(convertedBhkArray);

            const convertedPropTypeArray = convertStringToArray(data?.PROPERTY_TYPE);
            setPropType(convertedPropTypeArray);

            const convertedSportTypeArray = convertStringToArray(data?.SPORTS);
            setSportType(convertedSportTypeArray);

            const convertedSafetyTypeArray = convertStringToArray(data?.SAFETY);
            setSafetyType(convertedSafetyTypeArray);

            const convertedBathTypeArray = convertStringToArray(data?.BATHROOM);
            setBathType(convertedBathTypeArray);

        } catch (err) {
            console.log(err)
        }
    }

    ////////options chg hnd////////////
    const handleSelectChange = (selectedValues2) => {
        setBhk(selectedValues2);
        console.log(selectedValues2)

        const bhk2 = selectedValues2.map((item) => item.value)
        setBhk2(bhk2)
    };
    const handleSelectPropChange = (selectedValues3) => {
        setPropType(selectedValues3)
        console.log(selectedValues3)

        const propType2 = selectedValues3.map((item) => item.value)
        setPropType2(propType2)
    }
    const handleSelectSportChange = (selectedValues4) => {
        setSportType(selectedValues4)
        const sport2 = selectedValues4.map((item) => item.value)
        setSport2(sport2)
    }
    const handleSelectSafetyChange = (selectedValues5) => {
        setSafetyType(selectedValues5)
        const safety2 = selectedValues5.map((item) => item.value)
        setSafety2(safety2)
    }
    const handleSelectBathChange = (selectedValues6) => {
        setBathType(selectedValues6)
        const bathroom2 = selectedValues6.map((item) => item.value)
        setBathroom2(bathroom2)
    }


    /////////////////options///////////

    const bhkoptions = [

        { value: '*', label: 'all' },
        { value: '1BHK', label: '1BHK' },
        { value: '2Bhk', label: '2Bhk' },
        { value: '3Bhk', label: '3Bhk' },
        { value: '4Bhk', label: '4Bhk' },
        { value: '5Bhk', label: '5Bhk' },
        { value: '6Bhk', label: '6Bhk' },
        { value: 'Bunglow', label: 'Bunglow' },
        { value: 'Shop', label: 'Shop' },
    ];
    const propOptions = [
        { value: 'Residential', label: 'Residential' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Land & Plotting', label: 'Land & Plotting' },

    ];
    const sportOptions = [
        { value: 'Gymnasium', label: 'Gymnasium' },
        { value: 'Kids Play Area', label: 'Kids Play Area' },
        { value: 'Jogging / Cycle Track', label: 'Jogging / Cycle Track' },
        { value: 'Swimming Pool', label: 'Swimming Pool' },
        { value: 'Badminton Court(s)', label: 'Badminton Court(s)' },
        { value: 'Cricket', label: 'Cricket' },
        { value: 'Basketball', label: 'Basketball' },
        { value: 'Yoga Areas', label: 'Yoga Areas' },
        { value: 'Snooker/Pool/Billiards', label: 'Snooker/Pool/Billiards' },
        { value: 'Rappelling/Rock Climbing', label: 'Rappelling/Rock Climbing' },
        { value: 'Skating Rink', label: 'Skating Rink' },
        { value: 'Gazebo', label: 'Gazebo' },
        { value: 'Volleyball', label: 'Volleyball' },
        { value: 'Golf Putting', label: 'Golf Putting' },

    ];
    const safetyOptions = [
        { value: '24 x 7 Security', label: '24 x 7 Security' },
        { value: 'CCTV / Video Surveillance', label: 'CCTV / Video Surveillance' },
        { value: 'Fire Fighting Systems', label: 'Fire Fighting Systems' },
        { value: 'Intercom Facility', label: 'Intercom Facility' },
        { value: 'Video Phone', label: 'Video Phone' },
        { value: 'Power Backup', label: 'Power Backup' },

    ];
    const bathOptions = [
        { value: 'Geyser', label: 'Geyser' },
        { value: 'Exhaust Fan', label: 'Exhaust Fan' },
        { value: 'Premium Bath Fittings', label: 'Premium Bath Fittings' },

    ];
    const chgHnd = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    const handletotalunit = (e) => {
        setTotalUnit(e.target.value)
    };
    const handletotalacres = (e) => {
        setTotalAcres(e.target.value)
    }
    const possessionHnd = () => {
        setPossession("Under Construction")
    }

    const possessionHnd2 = () => {
        setPossession("Ready To Move")
    }
    const overviewHnd = (e) => {
        setOverview(e.target.value)
    }
    const bedWallHnd = (e) => {
        setB_Walls(e.target.value)
    }
    const bedFloorHnd = (e) => {
        setBedFloor(e.target.value)
    }
    const otherBedFloorHnd = (e) => {
        setOtherBedFloor(e.target.value)
    }
    const wallsHnd = (e) => {
        setWalls(e.target.value)
    }
    const livingFloorHnd = (e) => {
        setivingFloor(e.target.value)
    }
    const structureHnd = (e) => {
        setStructure(e.target.value)
    }
    const handleThumbnail = (e) => {
        setThumbnail(e.target.files[0])
    }
    const handleCoverImg = (e) => {
        setCoverimg(e.target.files)
    }
    const setbrochure = (e) => {
        setBrochure(e.target.files)
    }
    const handleVideo = (e) => {
        setVideo(e.target.files[0])
    }
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    const handlebldrname = (e) => {
        setBuilderName(e.target.value)
    }
    ///rera handle
    const [green, setGreen] = useState(false)
    const [reracheck, setReracheck] = useState(false);
    const [reraTxt, setReraTxt] = useState('Incorrect Rera')
    const reraHandle = (e) => {
        if (e.target.value[0] < 'A' || e.target.value[0] > 'Z') {
            setReracheck(true)
            setGreen(false)
            setReraTxt('Incorrect Rera No')
        } else {
            setReracheck(false)
            setReraTxt('')
        }


        if (!isNaN(e.target.value.slice(1)) == false) {
            setReracheck(true)
            setReraTxt('incorrect rera')
            console.log('4 if')
            setGreen(false)
        }

        if (!isNaN(e.target.value.slice(1)) == true && e.target.value.length === 12) {
            setReracheck(true)
            setReraTxt('correct rera')
            setGreen(true)
        }
    }
    //handle -ve values
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }

        if (object.target.value < object.target.min) {
            object.target.value = null
        }
    }
    // for builder bhk form
    const [formFields, setFormFields] = useState([
        { units: '', area: '', price: '', image: '' }
    ]);
    const handleChange = (index, field, value) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = value;
        setFormFields(updatedFields);
    };

    const handleImageChange = (index, image) => {
        const updatedFields = [...formFields];
        updatedFields[index].image = image;
        setFormFields(updatedFields);
    };

    const handleAddRow = () => {
        setFormFields([...formFields, { units: '', area: '', price: '', image: '' }]);
    };

    const handleRemoveRow = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };
    useEffect(() => {
        getData();
        setTimeout(() => { setTim(true) }, 500)
    }, [tim])

    const navigate = useNavigate();
    /// for popup close
    const closePopup = () => {
        setIsPopupOpen(false)
        setAlready(false)
        setMyload(false)
        navigate("/all_project_details")
    }

    const sbtHnd = (e) => {
        e.preventDefault()
        setMyload(true)
        //console.log(data.COVER)
        const formdata = new FormData();
        formdata.append('PROJECT_NAME', data.PROJECT_NAME)
        formdata.append('CITY', data.CITY)
        formdata.append('LOCALITY', data.LOCALITY)
        formdata.append('RERA', data.RERA)
        formdata.append('BHK', bhk2 ? bhk2 : data?.BHK)
        formdata.append('MIN_SQFT', data.MIN_SQFT)
        formdata.append('MAX_SQFT', data.MAX_SQFT)
        formdata.append('MIN_PRICE', data.MIN_PRICE)
        formdata.append('MAX_PRICE', data.MAX_PRICE)
        formdata.append('D_ADDRESS', data.D_ADDRESS)
        formdata.append('THUMBNAIL', thumbnail ? thumbnail : data?.THUMBNAIL)
        for (let i = 0; i < coverimg.length; i++) {
            formdata.append('coverimg', coverimg[i])
        }
        formdata.append('coverimg', data.COVER)
        formdata.append("TOTAL_UNITS", totalUnit ? totalUnit : data.TOTAL_UNITS)
        formdata.append("TOTAL_ACRES", totalAcres ? totalAcres : data.TOTAL_ACRES)
        formdata.append('PROJECT_TYPE', propType2 ? propType2 : data?.PROPERTY_TYPE)
        formdata.append("POSSESSION", data.POSSESSION)
        formdata.append("OVERVIEW", overview ? overview : data.OVERVIEW)
        for (let i = 0; i < brochure.length; i++) {
            formdata.append('brochure', brochure[i])
        }
        formdata.append('brochure', data?.BROCHURE)
        formdata.append('sports', sport2 ? sport2 : data?.SPORTS)
        formdata.append('safety', safety2 ? safety2 : data?.SAFETY)
        formdata.append("B_WALLS", b_walls ? b_walls : data.B_WALLS)
        formdata.append("B_FLOOR", bedFloor ? bedFloor : data.B_FLOOR)
        formdata.append("OTHER_BFLOOR", otherBedFloor ? otherBedFloor : data.OTHER_BFLOOR)
        formdata.append("WALLS", walls ? walls : data.WALLS)
        formdata.append("L_FLOOR", livingFloor ? livingFloor : data.L_FLOOR)
        formdata.append("BATHROOM", bathroom2 ? bathroom2 : data?.BATHROOM)
        formdata.append("STRUCTURE", structure ? structure : data.STRUCTURE)
        formdata.append("video", video ? video : data.VIDEO)
        formdata.append('id', cookies.edit)
        formdata.append('date', date ? date : data.POSSESSION_DATE)
        formdata.append('builderName', builderName ? builderName : data.BUILDER_NAME)

        setCookie('Rera', data.RERA)
        pageFun()
        axios.put('http://localhost:8800/builderEditSubmit', formdata)
            .then(res => {
                setMyload(false);
                setIsPopupOpen(true)
            })
            //.then(navigate('/all_project_details'))
            .catch(err => console.log(err))
    }
    ////////////////page/////////////////
    const pageFun = async () => {
        const id = data.RERA;
        console.log(id, 'raraa')
        console.log(bhkID, 'formdata')
        try {
            console.log('page')


            const formDataArray = formFields.map((field) => {
                const formData2 = new FormData();
                formData2.append('units', field.units ? field.units : field.B_UNIT);
                formData2.append('area', field.area ? field.area : field.B_SQFT);
                formData2.append('price', field.price ? field.price : field.B_PRICE);
                formData2.append('image', field.image ? field.image : field.B_LAYOUT);
                formData2.append("rera", id)
                formData2.append('bhkID', bhkID.map((item) => (item)))

                return formData2;
            });

            // Use Promise.all to send multiple requests simultaneously

            await Promise.all(
                formDataArray.map((formData, index) => {
                    const uniqueId = bhkID[index]; // Assuming uniqueIds is an array of unique IDs
                    return axios.post('http://localhost:8800/builderbhkEditSubmit', formData, {
                        // Pass uniqueId as part of the request data
                        params: { id: uniqueId }
                    });
                })
            );

            //removeCookie('Rera', cookies.Rera)
            // alert('property posted successfully!')
            //navigate("/dashboard")
            //console.log('Responses:', responses);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Link to="/dashboard" className={classes.backBtn}>Back to Dashboard</Link>
            <div className={classes.Hold}>

                <p className={classes.head}>Edit Builder Property of <span className={classes.highlight}>{data?.PROJECT_NAME}</span></p>

                <form onSubmit={sbtHnd}>
                    <div className={classes.divsHold}>
                        <div className={classes.left}>
                            <div className={classes.leftIn}>
                                <label>Project Name:</label>
                                <input type='text' name='PROJECT_NAME' maxLength="40" onChange={chgHnd} defaultValue={data?.PROJECT_NAME} placeholder='Project Name'></input>
                            </div>

                            <div className={classes.leftIn}>
                                <label>City:</label>
                                <input type='text' name='CITY' onChange={chgHnd} defaultValue={data?.CITY} maxLength='20' placeholder='City'></input>
                            </div>

                            <div className={classes.leftIn}>
                                <label>Locality:</label>
                                <input type='text' name='LOCALITY' onChange={chgHnd} defaultValue={data?.LOCALITY} maxLength='20' placeholder='Locality'></input>
                            </div>

                            <div className={classes.leftIn}>
                                <label>Regulatory Information:</label>{reracheck && <p className={`${green ? classes.rera2 : classes.rera}`}>{reraTxt}</p>}
                                <input type='text' name='RERA' onChange={chgHnd} defaultValue={data?.RERA} onInput={reraHandle} maxLength='12' ></input>
                            </div>

                            <div className={classes.leftIn}>
                                <label>Select BHK:</label>

                                <Select className={classes.selLib}
                                    options={bhkoptions}
                                    isMulti
                                    onChange={handleSelectChange}
                                    value={bhk}
                                    placeholder='Select Unit Type'
                                    closeMenuOnSelect={false}
                                />
                            </div>

                            <label>Carpet Area (in sqft from minimumn to maximum):</label>
                            {Number(data?.MAX_SQFT) < Number(data?.MIN_SQFT) && <p className={classes.notif}>Maximumn Area Cannot be greater than Minimum Area</p>}
                            <div className={classes.leftIn}>

                                <input type='number' min='1' maxLength="9" onInput={maxLengthCheck} name='MIN_SQFT' onChange={chgHnd} defaultValue={data?.MIN_SQFT}></input><label>To</label>
                                <input type='number' min='1' maxLength="9" onInput={maxLengthCheck} name='MAX_SQFT' onChange={chgHnd} defaultValue={data?.MAX_SQFT}></input>
                            </div>

                            <label>Price (minimumn to maximum):</label>
                            {Number(data?.MAX_PRICE) < Number(data?.MIN_PRICE) && <p className={classes.notif}>Maximumn Area Cannot be greater than Minimum Area</p>}
                            <div className={classes.leftIn}>

                                <input type='text' name='MIN_PRICE' onChange={chgHnd} defaultValue={data?.MIN_PRICE}></input><label>To</label>
                                <input type='text' name='MAX_PRICE' onChange={chgHnd} defaultValue={data?.MAX_PRICE}></input>
                            </div>

                            <div className={classes.leftIn}>
                                <label>Detailed Address:</label>
                                <textarea name='D_ADDRESS' defaultValue={data?.D_ADDRESS} onChange={chgHnd}></textarea>
                            </div>

                            <div className={classes.leftIn}>
                                <label>Thumbnail Image:</label>
                                <input type='file' name='THUMBNAIL' onChange={handleThumbnail} accept='image/*'></input>
                                <div className={classes.cv}>
                                    {data?.THUMBNAIL?.split(',').map((cover, index) => (

                                        <img
                                            key={index}
                                            src={`http://localhost:8800/BUILDER/${cover}`}
                                            alt={`Cover ${index}`}
                                        />

                                    ))}
                                </div>''
                            </div>

                            <div className={classes.leftIn}>
                                <label>Cover Image:</label>
                                <input type='file' name="CoverIMG" multiple onChange={handleCoverImg} accept='image/*' ></input>
                                <div className={classes.cv}>
                                    {data?.COVER?.split(',').map((cover, index) => (

                                        <img
                                            key={index}
                                            src={`http://localhost:8800/BUILDER/${cover}`}
                                            alt={`Cover ${index}`}

                                        />

                                    ))}
                                </div>
                            </div>

                            <label>Project Size:</label>
                            <div className={classes.rightIn}>
                                <input type='number' onInput={maxLengthCheck} min='1' maxLength="9" defaultValue={data?.TOTAL_UNITS} onChange={handletotalunit}></input>
                                <input type='text' onInput={maxLengthCheck} min='1' maxLength="9" defaultValue={data?.TOTAL_ACRES} onChange={handletotalacres}></input>

                            </div>

                            <div className={classes.leftIn}></div>
                            <div className={classes.leftIn}></div>
                            <div className={classes.leftIn}></div>
                        </div> {/*left div end */}



                        <div className={classes.right}>

                            <div className={classes.rightIn}>
                                <label>Builder Name : </label>
                                <input type='text' defaultValue={data?.BUILDER_NAME} onChange={handlebldrname}></input>
                            </div>
                            <div className={classes.rightIn}>
                                <div className={classes.divIn}>
                                    <label className={classes.lbl}>Project Type:</label>
                                    <Select
                                        className={classes.selLib}
                                        options={propOptions}
                                        isMulti
                                        onChange={handleSelectPropChange}
                                        value={propType}
                                        placeholder='Select Property Type'
                                        closeMenuOnSelect={false}
                                    />
                                </div>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Possession Status:</label>
                                <div className={classes.possessionasd}>
                                    <button type='button' name='POSSESSION' value='Under Construction' onClick={chgHnd} defaultValue={data?.POSSESSION} className={`${data?.POSSESSION === 'Under Construction' ? classes.firstClass : classes.secondClass}`}>Under Construction</button>
                                    <button type='button' name='POSSESSION' value='Ready To Move' onClick={chgHnd} defaultValue={data?.POSSESSION} className={`${data?.POSSESSION === 'Ready To Move' ? classes.firstClass : classes.secondClass}`}>Ready To Move</button>
                                </div>
                                <label>Completion Date : </label>
                                {data?.POSSESSION === 'Under Construction' && <input type='date' onChange={handleDate} defaultValue={data.POSSESSION_DATE}></input>}
                            </div>
                            <div className={classes.rightIn}>
                                <label>Project Details (Overview):</label>
                                <textarea defaultValue={data?.OVERVIEW} onChange={overviewHnd}></textarea>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Brochure:</label>
                                <input type='file' name='brochure' accept='image/*' multiple onChange={setbrochure}></input>
                                <div className={classes.cv}>
                                    {data?.BROCHURE?.split(',').map((brochure, index) => (

                                        <img
                                            key={index}
                                            src={`http://localhost:8800/BUILDER/${brochure}`}
                                            alt={`Cover ${index}`}

                                        />

                                    ))}
                                </div>
                            </div>
                            <div className={classes.rightIn}>
                                <label className={classes.lbl}>Sports:</label>
                                <Select
                                    className={classes.selLib}
                                    options={sportOptions}
                                    isMulti
                                    onChange={handleSelectSportChange}
                                    value={sportType}
                                    placeholder='Select Unit Type'
                                    closeMenuOnSelect={false}
                                />
                            </div>
                            <div className={classes.rightIn}>
                                <label className={classes.lbl}>Safety:</label>
                                <Select
                                    className={classes.selLib}
                                    options={safetyOptions}
                                    isMulti
                                    onChange={handleSelectSafetyChange}
                                    value={safetyType}
                                    placeholder='Safety Facilities'
                                    closeMenuOnSelect={false}
                                />
                            </div>
                            <div className={classes.rightIn}>
                                <label>Master BedRoom Walls</label>
                                <select onChange={bedWallHnd}>
                                    <option>{data?.B_WALLS}</option>
                                    {data?.B_WALLS !== 'Oil Bound Distemper' && <option>Oil Bound Distemper</option>}
                                    {data?.B_WALLS !== 'option 2' && <option>option 2</option>}
                                    {data?.B_WALLS !== 'option 3' && <option>option 3</option>}
                                </select>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Master BedRoom Flooring</label>
                                <select onChange={bedFloorHnd}>
                                    <option>{data?.B_FLOOR}</option>
                                    {data?.B_FLOOR !== 'Vitrified Tiles' && <option>Vitrified Tiles</option>}
                                    {data?.B_FLOOR !== 'option 2' && <option>option 2</option>}
                                    {data?.B_FLOOR !== 'option 3' && <option>option 3</option>}
                                </select>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Other BedRoom Flooring</label>
                                <select onChange={otherBedFloorHnd}>
                                    <option>{data?.OTHER_BFLOOR}</option>
                                    {data?.OTHER_BFLOOR !== 'Vitrified Tiles' && <option>Vitrified Tiles</option>}
                                    {data?.OTHER_BFLOOR !== 'option 2' && <option>option 2</option>}
                                    {data?.OTHER_BFLOOR !== 'option 3' && <option>option 3</option>}
                                </select>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Walls</label>
                                <select onChange={wallsHnd}>
                                    <option>{data?.WALLS}</option>
                                    {data?.WALLS !== 'Oil Bound Distemper' && <option>Oil Bound Distemper</option>}
                                    {data?.WALLS !== 'option 2' && <option>option 2</option>}
                                    {data?.WALLS !== 'option 3' && <option>option 3</option>}
                                </select>
                            </div>
                            <div className={classes.rightIn}>
                                <label>Living Area Flooring</label>
                                <select onChange={livingFloorHnd}>
                                    <option>{data?.L_FLOOR}</option>
                                    {data?.L_FLOOR !== 'Vitrified Tiles' && <option>Vitrified Tiles</option>}
                                    {data?.L_FLOOR !== 'option 2' && <option>option 2</option>}
                                    {data?.L_FLOOR !== 'option 3' && <option>option 3</option>}
                                </select>
                            </div>
                            <div className={classes.rightIn}>
                                <label className={classes.lbl}>Bathroom:</label>
                                <Select
                                    options={bathOptions}
                                    isMulti
                                    onChange={handleSelectBathChange}
                                    value={bathType}
                                    placeholder='Select Bathroom Facilities'
                                    closeMenuOnSelect={false}
                                    className={classes.selLib}
                                />
                            </div>
                            <div className={classes.rightIn}>
                                <label>Structure:</label>
                                <select onChange={structureHnd}>
                                    <option>{data?.STRUCTURE}</option>
                                    {data?.STRUCTURE !== "RCC Frame Structure" && <option>RCC Frame Structure</option>}
                                    {data?.STRUCTURE !== "option 2" && <option>option 2</option>}
                                    {data?.STRUCTURE !== "option 3" && <option>option 3</option>}
                                </select>
                            </div>

                            <div className={classes.rightIn}>
                                <label>Video:</label>
                                <input type='file' accept="video/*" name="video" onChange={handleVideo} />
                                <p className={classes.notify}>{data?.VIDEO}</p>
                            </div>
                            <div className={classes.rightIn}></div>
                        </div> {/*right div end */}

                    </div>{/* divhold end */}
                    <div className={classes.bhkContainer}>
                        {formFields.map((field, index) => (
                            <div className={classes.unt} key={index}>
                                <label>
                                    Unit Type:
                                    <input
                                        placeholder="Eg. 1 BHK or Shop"
                                        type="text"
                                        defaultValue={field?.B_UNIT}
                                        onChange={(e) => handleChange(index, 'units', e.target.value)}
                                    />
                                </label>
                                <label>
                                    Carpet Area:
                                    <input
                                        placeholder="Enter Carpet Area"
                                        type="number"
                                        min='1'
                                        maxLength="9"
                                        onInput={maxLengthCheck}
                                        defaultValue={field?.B_SQFT}
                                        onChange={(e) => handleChange(index, 'area', e.target.value)}
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input
                                        placeholder="Enter Price"
                                        type="text"
                                        min='1'
                                        maxLength="9"
                                        onInput={maxLengthCheck}
                                        defaultValue={field.B_PRICE}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                    />
                                </label>
                                <label>
                                    Image:
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                                    />
                                </label>
                                <img className={classes.notifyIMG} src={`http://localhost:8800/BUILDER/${field.B_LAYOUT}`} />

                                {/*<div className={classes.btndd}> <button type="button" className={classes.btnR} onClick={() => handleRemoveRow(index)}>Remove</button> &emsp;  <button type="button" className={classes.btnA} onClick={handleAddRow} >Add Unit</button><br></br> </div>*/}

                            </div>
                        ))}
                    </div>
                    <div className={classes.btnHold}>
                        <button type='submit' className={classes.sbt}>Submit</button>
                    </div>
                </form>
                {isPopupOpen && <AdminPopup onClose={closePopup} txt1="Property Updated Succesfully"></AdminPopup>}
                {myload && <AdminPopup onClose={closePopup} txt1="Property Updating .." txt2='Do not Press Back / Refresh '></AdminPopup>}
            </div>
        </>
    )
}

export default EditPage2;