import React, { useEffect, useState } from 'react'
import classes from './EditPage.module.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import Navbar from '../../Navbar/Navbar';

const EditPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [tim, setTim] = useState(false);
    const [data, setData] = useState([]);
    const [selectedPropOptions, setSelectedPropOptions] = useState([data.BHK]);
    const [selectedSportOptions, setSelectedSportOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [bhk, setBhk] = useState([data.BHK]);
    const [propType, setPropType] = useState([data.PROPERTY_TYPE]);
    const [sportType, setSportType] = useState([data.SPORTS]);
    const [safetyType, setSafetyType] = useState([data.SAFETY]);
    const [bathType, setBathType] = useState([data.BATHROOM]);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [locality, setLocality] = useState("");
    const [rera, setRera] = useState("");
    const [nbhk, setnBhk] = useState([]);
    const [min_sqft, setMin_sqft] = useState("");
    const [max_sqft, setMax_sqft] = useState("");
    const [min_price, setMin_price] = useState("");
    const [max_price, setMax_price] = useState("");
    const [address, setAddress] = useState("");
    const [file1, setFile1] = useState("");
    const [cover, setCover] = useState([]);
    const [units, setUnits] = useState("");
    const [acres, setAcres] = useState("");
    const [possession, setPossession] = useState();
    const [overview, setOverview] = useState("");
    const [b_walls, setB_Walls] = useState();
    const [bedFloor, setBedFloor] = useState();
    const [otherBedFloor, setOtherBedFloor] = useState();
    const [walls, setWalls] = useState();
    const [livingFloor, setivingFloor] = useState();
    const [structure, setStructure] = useState()


    const convertStringToArray = (input) => {
        return input.split(',').map((item) => ({
            value: item,
            label: item
        }));
    };


    const getPropDetail = async () => {
        try {
            let id = cookies.edit;

            const res = await axios.get('http://localhost:8800/editBuilderProp', { params: { id } });
            console.log(res.data, 'data')
            setData(res.data[0])
            console.log(data)

            const convertedBhkArray = convertStringToArray(data.BHK);
            setBhk(convertedBhkArray);

            const convertedPropTypeArray = convertStringToArray(data.PROPERTY_TYPE);
            setPropType(convertedPropTypeArray);

            const convertedSportTypeArray = convertStringToArray(data.SPORTS);
            setSportType(convertedSportTypeArray);

            const convertedSafetyTypeArray = convertStringToArray(data.SAFETY);
            setSafetyType(convertedSafetyTypeArray);

            const convertedBathTypeArray = convertStringToArray(data.BATHROOM);
            setBathType(convertedBathTypeArray);

        } catch (err) {
            console.log(err)
        }

    }


    const handleSelectChange = (selectedValues2) => {
        setBhk(selectedValues2);
    };

    const handleSelectPropChange = (selectedValues3) => {
        setPropType(selectedValues3)
    }

    const handleSelectSportChange = (selectedValues4) => {
        setSportType(selectedValues4)
    }

    const handleSelectSafetyChange = (selectedValues5) => {
        setSafetyType(selectedValues5)
    }

    const handleSelectBathChange = (selectedValues5) => {
        setBathType(selectedValues5)
    }

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

    const nameHnd = (e) => {
        //setName(e.target.value)
        const name = e.target.name
        /*setData((prevState) => ({
            [name]: e.target.value
        }))*/
        console.log('name')
    }

    const cityHnd = (e) => {
        setCity(e.target.value)
    }

    const localityHnd = (e) => {
        setLocality(e.target.value)
    }

    const reraHnd = (e) => {
        setRera(e.target.value)
    }

    const min_sqftHnd = (e) => {
        setMin_sqft(e.target.value)
    }

    const max_sqftHnd = (e) => {
        setMax_sqft(e.target.value)
    }

    const minPriceHnd = (e) => {
        setMin_price(e.target.value)
    }

    const maxPriceHnd = (e) => {
        setMax_price(e.target.value)
    }

    const addressHnd = (e) => {
        setAddress(e.target.value)
    }

    const unitsHnd = (e) => {
        setUnits(e.target.value)
    }

    const acreHnd = (e) => {
        setAcres(e.target.value)
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

    const otherBedFloorHnd = (e) => {
        setOtherBedFloor(e.target.value)
    }

    const wallsHnd = (e) => {
        setWalls(e.target.value)
    }

    const structureHnd = (e) => {
        setStructure(e.target.value)
    }





    ////submit Hnd//////// 

    const submitHnd = async (e) => {
        e.preventDefault()

        try {
            const formdata = new FormData();

            formdata.append("ID", cookies.edit)
            formdata.append("BATHROOM", bathType)
            formdata.append("POSSESSION", 'possession')
            const res = await axios.post('http://localhost:8800/builderEditSubmit', formdata)
        } catch (err) {
            console.log(err)
        }

        console.log(data)
    }

    const bedFloorHnd = (e) => {
        setBedFloor(e.target.value)
    }

    const livingFloorHnd = (e) => {
        setivingFloor(e.target.value)
    }

    useEffect(() => {
        getPropDetail()
        setTimeout(() => { setTim(true) }, 500)
    }, [tim])


    return (
        <div className={classes.hold}>

            <p className={classes.hd1}>Edit Form</p>

            <form onSubmit={submitHnd} className={classes.editformHold}>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>Project Name:</label>
                    <input defaultValue={data.PROJECT_NAME} name='PROJECT_NAME' onChange={nameHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>City:</label>
                    <input defaultValue={data.CITY} name='CITY' onChange={cityHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>Locality:</label>
                    <input defaultValue={data.LOCALITY} name='LOCALITY' onChange={localityHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>Regulatory Information:</label>
                    <input defaultValue={data.RERA} name='RERA' onChange={reraHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>Select BHK:</label>
                    <Select
                        options={bhkoptions}
                        isMulti
                        onChange={handleSelectChange}
                        value={bhk}
                        placeholder='Select Unit Type'
                        closeMenuOnSelect={false}
                    />
                </div>

                <div className={classes.divIn}>
                    <label>Area (in sqft from minimumn to maximum):</label>
                    <input placeholder='enter min sqft' defaultValue={data.MIN_SQFT} onChange={min_sqftHnd}></input>
                    <p>to</p>
                    <input placeholder='enter max sqft' defaultValue={data.MAX_SQFT} onChange={max_sqftHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label>Price:</label>
                    <input placeholder='min price' defaultValue={data.MIN_PRICE} onChange={minPriceHnd}></input>
                    <input placeholder='max price' defaultValue={data.MAX_PRICE} onChange={maxPriceHnd}></input>
                </div>

                <div className={classes.divIn}>
                    <label>Detailed Address</label>
                    <textarea defaultValue={data.D_ADDRESS} onChange={addressHnd}></textarea>
                </div>
                <div className={classes.divIn}>
                    <label>Project Size:</label>
                    <input defaultValue={data.TOTAL_UNITS} onChange={unitsHnd}></input><label>:</label>
                    <input defaultValue={data.TOTAL_ACRES} onChange={acreHnd}></input>
                </div>
                <div className={classes.divIn}>
                    <label className={classes.lbl}>Project Type:</label>
                    <Select
                        options={propOptions}
                        isMulti
                        onChange={handleSelectPropChange}
                        value={propType}
                        placeholder='Select Property Type'
                        closeMenuOnSelect={false}
                    />
                </div>
                <div className={classes.divIn}>
                    <label>Possession Status:</label>
                    <button type='button' onClick={possessionHnd} className={`${possession === 'Under Construction' ? classes.firstClass : classes.secondClass}`}>Under Construction</button>
                    <button type='button' onClick={possessionHnd2} className={`${possession === 'Ready To Move' ? classes.firstClass : classes.secondClass}`}>Ready To Move</button>
                </div>
                <div className={classes.divIn}>
                    <label>Project Details (Overview):</label>
                    <textarea defaultValue={data.OVERVIEW} onChange={overviewHnd}></textarea>
                </div>
                <div className={classes.divIn}>
                    <label>Brochure:</label>
                    <input type='file'></input>
                </div>
                <div className={classes.divIn}>
                    <label className={classes.lbl}>Sports:</label>
                    <Select
                        options={sportOptions}
                        isMulti
                        onChange={handleSelectSportChange}
                        value={sportType}
                        placeholder='Select Unit Type'
                        closeMenuOnSelect={false}
                    />
                </div>
                <div className={classes.divIn}>
                    <label className={classes.lbl}>Safety:</label>
                    <Select
                        options={safetyOptions}
                        isMulti
                        onChange={handleSelectSafetyChange}
                        value={safetyType}
                        placeholder='Safety Facilities'
                        closeMenuOnSelect={false}
                    />
                </div>
                <label>Specifications</label>
                <div className={classes.divIn}>
                    <label>Master BedRoom Walls</label>
                    <select value={data.B_WALLS} onChange={bedWallHnd}>
                        <option></option>
                        <option>Oil Bound Distemper</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label>Master BedRoom Flooring</label>
                    <select value={data.B_FLOOR} onChange={bedFloorHnd}>
                        <option></option>
                        <option>Vitrified Tiles</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label>Other BedRoom Flooring</label>
                    <select value={data.OTHER_BFLOOR} onChange={otherBedFloorHnd}>
                        <option></option>
                        <option>Vitrified Tiles</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label>Walls</label>
                    <select value={data.WALLS} onChange={wallsHnd}>
                        <option></option>
                        <option>Oil Bound Distemper</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label>Living Area Flooring</label>
                    <select value={data.L_FLOOR} onChange={livingFloorHnd}>
                        <option></option>
                        <option>Vitrified Tiles</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label className={classes.lbl}>Bathroom:</label>
                    <Select
                        options={bathOptions}
                        isMulti
                        onChange={handleSelectBathChange}
                        value={bathType}
                        placeholder='Select Bathroom Facilities'
                        closeMenuOnSelect={false}
                    />
                </div>

                <div className={classes.divIn}>
                    <label>Structure:</label>
                    <select value={data.STRUCTURE} onChange={structureHnd}>
                        <option></option>
                        <option>RCC Frame Structure</option>
                        <option>option 2</option>
                        <option>option 3</option>
                    </select>
                </div>

                <div className={classes.divIn}>
                    <label>Thumbnail:</label>
                    <input type='file'></input>
                    <img src={`http://localhost:8800/BUILDER/` + data.THUMBNAIL} className={classes.thumb} alt="top real estate" />
                </div>

                <div className={classes.divIn}>
                    <label>Cover:</label>
                    <input type='file'></input>
                    {data.COVER?.split(',').map((cover, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8800/BUILDER/${cover}`}
                            alt={`Cover ${index}`}
                            className={classes.cover}
                        />
                    ))}
                </div>

                <div className={classes.divIn}>
                    <label>Video:</label>
                    <video className={classes.vid} width="660" height="500" controls >
                        <source src={`http://localhost:8800/BUILDER/` + data.VIDEO} type="video/mp4" />
                    </video>
                </div>




                <button type='submit'>Submit</button>

            </form>

        </div>
    )
}

export default EditPage;