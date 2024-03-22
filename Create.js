import { useState } from "react";
//import Footer from "../../Footer/Footer";
//import Navbar from "../../Navbar/Navbar";
import classes from "./Create.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import AdminPopup from './AdminPopup';
import ErrorPopup from "./ErrorPopup";
import { Link } from "react-router-dom";


function Create() {
    const [cookies, setCookie, removeCookie] = useCookies(['batli']);
    const [reraMatched, setReraMatched] = useState(false);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [locality, setLocality] = useState("");
    const [rera, setRera] = useState("")
    const [reracheck, setReracheck] = useState(false);
    const [reraTxt, setReraTxt] = useState('Incorrect Rera')
    const [bhk, setBhk] = useState([]);
    const [min_sqft, setMin_sqft] = useState("");
    const [max_sqft, setMax_sqft] = useState("");
    const [min_price, setMin_price] = useState("");
    const [max_price, setMax_price] = useState("");
    const [builderName, setBuilderName] = useState("");
    const [address, setAddress] = useState("");
    const [file1, setFile1] = useState("");
    const [cover, setCover] = useState([]);
    const [units, setUnits] = useState("");
    const [acres, setAcres] = useState("");
    const [reralength, setreraLength] = useState(false)

    const [Sqftblur, setSqftblur] = useState(false)
    const [priceblur, setPriceblur] = useState(false);

    const [property_type, setProperty_type] = useState([]);
    const [possesion, setPossession] = useState();
    const [date, setDate] = useState('')
    const [overview, setOverview] = useState("");
    const [brochure, setBrochure] = useState([]);
    const [plays, setPlays] = useState([]);
    const [safe, setSafe] = useState([]);
    const [paint, setPaint] = useState("");
    const [floor, setFloor] = useState("");
    const [floor2, setFloor2] = useState("");
    const [wall, setWall] = useState("");
    const [floor3, setFloor3] = useState("");
    const [bath, setBath] = useState([]);
    const [cieling, setCeiling] = useState('')
    const [structure, setStructure] = useState("");
    const [video, setVideo] = useState("");
    const [text, setText] = useState(0);
    const [text2, setText2] = useState(0);
    //////form state////////////
    let [step, setStep] = useState(1);

    // const [two, setTwo] = useState(false);
    //const [three, setThree] = useState(false);

    // small form
    const [formFields, setFormFields] = useState([
        { units: '', area: '', price: '', image: '' }
    ]);
    //small builder bhk form
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

    //console.log(formFields, 'logic Test')
    ////////
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedPropOptions, setSelectedPropOptions] = useState([]);
    const [selectedSportOptions, setSelectedSportOptions] = useState([]);
    const [selectedSafetyOptions, setSelectedSafetyOptions] = useState([]);
    const [selectedBathOptions, setSelectedBathOptions] = useState([]);

    const textareaHnd = (object) => {
        setText(object.target.value.length)
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const textareaHnd2 = (object) => {
        setText2(object.target.value.length)
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }

        if (object.target.value < object.target.min) {
            object.target.value = null
        }
    }

    const setname = (e) => {
        setName(e.target.value)
    };
    const setcity = (e) => {
        setCity(e.target.value)
    };
    const setlocality = (e) => {
        setLocality(e.target.value)
    };
    const setrera = (e) => {
        const newInputValue = e.target.value;

        // Check if the input matches the desired pattern
        if (e.target.value.length == 12) {
            if (/^[A-Z]\d{11}$/.test(newInputValue)) {
                setRera(newInputValue);
                setReraMatched(true);
            } else {
                alert('Invalid rera number ');
            }
        }
        setRera(e.target.value)
    };
    const setbhk = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked)
        if (checked) {
            setBhk([...bhk, value])
        } else {
            setBhk(bhk.filter((e) => (e !== value)))
        }
    };
    const setmin_sqft = (e) => {
        setMin_sqft(e.target.value)
    };
    const setmax_sqft = (e) => {
        setMax_sqft(e.target.value)
    };
    const setmin_price = (e) => {
        setMin_price(e.target.value)
    };
    const setmax_price = (e) => {
        setMax_price(e.target.value)
    };
    const setbldname = (e) => {
        setBuilderName(e.target.value)
    };
    const setaddress = (e) => {
        setAddress(e.target.value)
    };
    const setimgfile = (e) => {
        setFile1(e.target.files[0])
    };
    const setcoverimg = (e) => {
        const fileList = e.target.files;
        const imageFiles = Array.from(fileList);
        setCover(imageFiles)
    };
    const setunits = (e) => {
        setUnits(e.target.value)
    };
    const setacres = (e) => {
        setAcres(e.target.value)
    };

    const setproperty_type = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        if (checked) {
            setProperty_type([...property_type, value])
        } else {
            setProperty_type(property_type.filter((e) => (e !== value)))
        }
    };
    const setPossession3 = () => {
        setPossession('Ready To Move')
    };
    const setPossession2 = () => {
        setPossession('Under Construction')
    }
    const handleDate = (e) => {
        setDate(e.target.value)
        console.log(e.target.value)
    }
    const setoverview = (e) => {
        setOverview(e.target.value)
    };
    const setbrochure = (e) => {
        const fileList = e.target.files;
        const imageFiles = Array.from(fileList);
        setBrochure(imageFiles)
    };
    const setsport = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        if (checked) {
            setPlays([...plays, value])
        } else {
            setPlays(plays.filter((e) => (e !== value)))
        }
    };
    const setsafe = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked)
        if (checked) {
            setSafe([...safe, value])
        } else {
            setSafe(safe.filter((e) => (e !== value)))
        }
    };
    const setpaint = (e) => {
        setPaint(e.target.value)
    };
    const setfloor = (e) => {
        setFloor(e.target.value)
    };
    const setfloor2 = (e) => {
        setFloor2(e.target.value)
    };
    const setwall = (e) => {
        setWall(e.target.value)
    };
    const setfloor3 = (e) => {
        setFloor3(e.target.value)
    };
    const setbath = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if (checked) {
            setBath([...bath, value])
        } else {
            setBath(bath.filter((e) => (e !== value)))
        }
    };
    const setceiling = (e) => {
        setCeiling(e.target.value)
    }
    const setstructure = (e) => {
        setStructure(e.target.value)
    };
    const setvideo = (e) => {
        setVideo(e.target.files[0])
    };

    const backHnd = () => {
        setStep(step = step - 1)
        console.log(step)
    }

    const nextHnd = () => {

        if (Number(max_price) > Number(min_price) && Number(max_sqft) > Number(min_sqft)) {
            setStep(step = step + 1)
            console.log(step)
        } else {
            alert("price and sqft input/s is/are incorrect")
        }


    }

    ///options new chekbox multiselect
    const [options, setOptions] = useState([
        { name: '1BHK', id: 1 },
        { name: '2BHK', id: 2 },
        { name: '3BHK', id: 3 },
        { name: '4BHK', id: 4 },
        { name: '5BHK', id: 5 },
        { name: '6BHK', id: 6 },
        { name: 'Bunglow', id: 7 },
        { name: 'Shop', id: 8 },])

    const [propertyType_options, setPropertyType_options] = useState([
        { name: 'Residential', id: 1 },
        { name: 'Commercial', id: 2 },
        { name: 'Land & Plotting', id: 3 },
    ])

    const [sport_options, setSport_options] = useState([
        { name: 'Gymnasium', id: 1 },
        { name: 'Kids Play Area', id: 2 },
        { name: 'Jogging / Cycle Track', id: 3 },
        { name: 'Swimming Pool', id: 4 },
        { name: 'Badminton Court(s)', id: 5 },
        { name: 'Cricket', id: 6 },
        { name: 'Basketball', id: 7 },
        { name: 'Yoga Areas', id: 8 },
        { name: 'Snooker/Pool/Billiards', id: 9 },
        { name: 'Rappelling/Rock Climbing', id: 10 },
        { name: 'Gazebo', id: 11 },
        { name: 'Volleyball', id: 12 },
        { name: 'Golf Putting', id: 13 }
    ])
    const [bath_options, setBath_options] = useState([
        { name: 'Geyser', id: 1 },
        { name: 'Exhaust Fan', id: 2 },
        { name: 'Premium Bath Fittings', id: 3 },
    ])
    const [safety_options, setSafety_options] = useState([
        { name: '24 x 7 Security', id: 1 },
        { name: 'CCTV / Video Surveillance', id: 2 },
        { name: 'Fire Fighting Systems', id: 3 },
        { name: 'Intercom Facility', id: 4 },
        { name: 'Video Phone', id: 5 },
        { name: 'Power Backup', id: 6 }
    ])

    //state new select
    const [selectedValues, setSelectedValues] = useState('')
    const [propType, setPropType] = useState('')
    const [sport, setSport] = useState('')
    const [safety, setSafety] = useState('')
    const [bathroom, setBathroom] = useState('')
    const [listing, setListing] = useState([])
    const [listing2, setListing2] = useState([])
    const [listing3, setListing3] = useState([])
    const [listing4, setListing4] = useState([])
    const [listing5, setListing5] = useState([])

    //onselect new
    const onSelect = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSelectedValues(valString)
        console.log(selectedValues)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing(retainArray2)


    }
    const propTypeonSelect = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setPropType(valString)
        //console.log(selectedValues)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing2(retainArray2)

    }
    const sportonSelect = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSport(valString)
        //console.log(selectedValues)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing3(retainArray2)
    }
    const safetyonSelect = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSafety(valString)
        //console.log(selectedValues)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing5(retainArray2)
    }
    const bathonSelect = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setBathroom(valString)
        //console.log(selectedValues)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing4(retainArray2)
    }
    //onremove new
    const onRemove = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSelectedValues(valString)
        //console.log(valString)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing(retainArray2)
    }
    const propTypeonRemove = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setPropType(valString)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing2(retainArray2)
    }
    const sportonRemove = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSport(valString)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing3(retainArray2)
    }
    const safetyonRemove = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setSafety(valString)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing5(retainArray2)
    }
    const bathonRemove = (selectedItem) => {
        let val = selectedItem.map((item) => item.name)
        let valString = val.toString();
        setBathroom(valString)

        const retainArray = valString.split(",")
        const retainArray2 = retainArray.map((item, id) => ({ name: item, id: id + 1 }))
        setListing4(retainArray2)
    }

    const navigate = useNavigate();
    const addUserData = (e) => {
        e.preventDefault();
        setMyload(true)
        console.log(formFields, " formfields")

        const formdata = new FormData();

        formdata.append("name", name)
        formdata.append("city", city)
        formdata.append("locality", locality)
        formdata.append("rera", rera)
        formdata.append("bhk", bhk)
        formdata.append("min_sqft", min_sqft)
        formdata.append("max_sqft", max_sqft)
        formdata.append("min_price", min_price)
        formdata.append("max_price", max_price)
        formdata.append("bldname", builderName)
        formdata.append("address", address)
        formdata.append("photo", file1)
        for (let i = 0; i < cover.length; i++) {
            formdata.append('cover', cover[i]);
        }
        formdata.append("units", units)
        formdata.append("acres", acres)

        formdata.append("property_type", property_type)
        formdata.append("possesion", possesion)
        formdata.append('date', date)
        formdata.append("overview", overview)
        for (let i = 0; i < brochure.length; i++) {
            formdata.append('brochure', brochure[i]);
        }
        formdata.append("plays", plays)
        formdata.append("safe", safe)
        formdata.append("paint", paint)
        formdata.append("floor", floor)
        formdata.append("floor2", floor2)
        formdata.append("wall", wall)
        formdata.append("floor3", floor3)
        formdata.append("bath", bath)
        formdata.append("ceiling", cieling)
        formdata.append("structure", structure)
        formdata.append("video", video)
        /////////////////////////////////////
        const bhk5 = selectedOptions.map(item => item.value)
        //console.log(selectedPropOptions)
        formdata.append('selectedOptions', bhk5);

        const prop5 = selectedPropOptions.map(item => item.value)
        //console.log(prop5)
        formdata.append('selectedPropOptions', prop5);

        const safety5 = selectedSafetyOptions.map(item => item.value)
        console.log(safety5)
        formdata.append('selectedSafetyOptions', safety5);

        const sport5 = selectedSportOptions.map(item => item.value)
        //console.log(sport5)
        formdata.append('selectedSportOptions', sport5);

        const bath5 = selectedBathOptions.map(item => item.value)
        //console.log(bath5)
        formdata.append('selectedBathOptions', bath5);

        ////newwwwwwwwwwwwwwwwwwwwww
        formdata.append('selectedValues', selectedValues)
        formdata.append('propType', propType)
        formdata.append('sport', sport)
        formdata.append('safety', safety)
        formdata.append('bathroom', bathroom)

        const formDataArray = formFields.map((field) => {
            //const formData2 = new FormData();
            formdata.append('unitss', field.units);
            formdata.append('area', field.area);
            formdata.append('price', field.price);
            formdata.append('image3', field.image);
            formdata.append("rera2", rera)

            //return formData2;
        });

        //////page////////



        ///////page///////////



        setCookie('Rera', rera)
        //pageFun()
        axios.post("http://localhost:8800/builder33", formdata)

            .then(res => {
                console.log(res.data);
                if (res.data == "error") {
                    setPostingError(true)
                    setMyload(false)
                    setIsPopupOpen(false)

                } else {
                    setMyload(false)
                    setIsPopupOpen(true)
                }

            })
            .catch(err => {
                console.log("Error in Property Posting", err);
                setPostingError(true)
                setMyload(false)
                setIsPopupOpen(false)
            })
    };

    ////////////////page/////////////////
    const pageFun = async () => {
        const id = cookies.Rera;
        console.log(id)
        try {
            console.log('page')
            const formDataArray = formFields.map((field) => {
                const formData2 = new FormData();
                formData2.append('units', field.units);
                formData2.append('area', field.area);
                formData2.append('price', field.price);
                formData2.append('image', field.image);
                formData2.append("rera", rera)

                return formData2;
            });

            // Use Promise.all to send multiple requests simultaneously
            await Promise.all(
                formDataArray.map((formData2) =>
                    axios.post('http://localhost:8800/builderbhk', formData2)
                )
            );
            removeCookie('Rera', cookies.Rera)
            // alert('property posted successfully!')
            //navigate("/dashboard")
            //console.log('Responses:', responses);
        } catch (err) {
            console.log("Error in builderbhk Property Posting", err);
            setPostingError(true)
            setMyload(false)
            setIsPopupOpen(false)
        }
    }

    ///rera handle
    const [green, setGreen] = useState(false)
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
            setreraLength(false)
        }
    }

    //after submit popup
    const [alertt, setAlertt] = useState(false);
    const [already, setAlready] = useState(false);
    const [myload, setMyload] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const closePopup = () => {
        setIsPopupOpen(false);
        setAlready(false);
        setMyload(false)
        navigate("/dashboard")
    };

    const reraBlur = (e) => {
        const leng = e.target.value.length
        if (leng < 12) {
            setreraLength(true)
        }

    }

    const maxSqftBlur = (e) => {
        if (Number(e.target.value) <= min_sqft) {
            setSqftblur(true)
        } else {
            setSqftblur(false)
        }
    }

    const maxPriceBlur = (e) => {
        if (Number(e.target.value) <= min_price) {
            setPriceblur(true)
        } else {
            setPriceblur(false)
        }
    }
    //if ERROR Occures in Property Posting
    const [postingError, setPostingError] = useState(false);

    const errorPopupClose = () => {
        setPostingError(false)
    }

    return (
        <>
            <Link to="/dashboard" className={classes.backBtn}>Back Dashboard</Link>
            <div className={classes.formHold}>
                <h3 className={classes.head}>Fill the Form to Create New Property :</h3>
                <form onSubmit={addUserData}>


                    {step === 1 ? <div className={classes.stepDiv}>
                        <div className={classes.left}>
                            <section className={classes.column}>
                                <label >Project Name : </label>
                                <input type="text" name="name" value={name} onChange={setname} maxLength='40' placeholder="Enter Your Project's Name" />
                            </section>

                            <section className={classes.column}>
                                <label>City: </label>
                                <input type="text" name="city" value={city} onChange={setcity} maxLength='20' placeholder="City" />
                            </section>

                            <section className={classes.column}>
                                <label>Locality: </label>
                                <input type="text" name="locality" value={locality} onChange={setlocality} maxLength='20' placeholder="Locality" />
                            </section>

                            <section className={classes.column}>
                                <label>Regulatory Information :</label> {reracheck && <p className={`${green ? classes.rera2 : classes.rera}`}>{reraTxt}</p>}{reralength && <p className={classes.rera}>length 12 required</p>}
                                <input value={rera} placeholder="Enter Project RERA Reg." name="rera" onChange={setrera} onInput={reraHandle} onBlur={reraBlur} maxLength='12' />
                            </section>

                            <section className={classes.column}>
                                <label>Select Property : </label>
                                <Multiselect
                                    options={options} // Options to display in the dropdown
                                    selectedValues={listing} // Preselected value to persist in dropdown
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    isObject='true'
                                    className={classes.multiselect}
                                    value={bhk}
                                />

                            </section>

                            <section className={classes.column}>
                                <label> Carpet Area (in sqft) (from minimumn to maximum): </label>
                                {Sqftblur && <p className={classes.notif}>Maximumn Area Cannot be greater than Minimum Area</p>}
                                <div className={classes.row}>
                                    <input type="number" min='1' maxLength="9" onInput={maxLengthCheck} value={min_sqft} name="min_sqft" onChange={setmin_sqft} placeholder="Enter Min SqFt" />
                                    To
                                    <input type="number" placeholder="Enter Max SqFt" min="1"
                                        maxLength="9" onInput={maxLengthCheck} name="max_sqft" value={max_sqft} onChange={setmax_sqft} onBlur={maxSqftBlur} />
                                </div>
                            </section>

                        </div>
                        <div className={classes.right}>

                            <section className={classes.column}>
                                <label>Builder Name: </label>
                                <input type="text" name="bldname" value={builderName} onChange={setbldname} placeholder="Enter Builder Name" />
                            </section>

                            <section className={classes.column}>
                                <label>Price (in rupees from minimumn to maximum): </label>
                                {priceblur && <p className={classes.notif}>Minimum Price Cannot be greater than Maximum Price</p>}
                                <div className={classes.row}>
                                    <input type="number" min='1' maxLength="9" onInput={maxLengthCheck} value={min_price} name="min_price" onChange={setmin_price} placeholder="Enter Min Price" />
                                    To
                                    <input type="number" name="max_price" min='1' maxLength="9" onInput={maxLengthCheck} value={max_price} onChange={setmax_price} onBlur={maxPriceBlur} placeholder="Enter Max Price" />
                                </div>
                            </section>

                            <section className={classes.column}>
                                <label>Detailed Address:  <span className={classes.txtL}>{text}/250</span></label>
                                <textarea type="text" name="address" value={address} onChange={setaddress} onInput={textareaHnd} maxLength="250" placeholder="Enter Your Address" />
                            </section>

                            <section className={classes.column}>
                                <label>Thumbnail Image: </label>
                                <input type="file" accept="image/*" name="photo" onChange={setimgfile} placeholder="Import Image you want as Thumbnail" />
                                {file1 && (<p className={classes.retrimg}>{file1.name}</p>)}
                            </section>

                            <section className={classes.column}>
                                <label>Cover Image: </label>
                                <input type="file" accept="image/*" multiple name="cover" onChange={setcoverimg} placeholder="Import Image you want as Cover Image" />
                                {cover.map((image, index) => (
                                    <p key={index} className={classes.retrimg} >{image.name}</p>
                                ))}
                            </section>

                            <section className={classes.column}></section>
                            <lable><b>Project Size :</b></lable>
                            <div className={classes.row}><input type="number" min='1' maxLength="9" onInput={maxLengthCheck} placeholder="Enter Total Units" name="units" value={units} onChange={setunits} /> : <input type="number" value={acres} min='1' maxLength="9" onInput={maxLengthCheck} placeholder="Enter Total Acres" name="acres" onChange={setacres} /></div>
                        </div>



                    </div> : ''}  {/*step 1 end */}


                    {step == 2 ? <div className={classes.stepDiv}>

                        <div className={classes.left}>
                            <section className={classes.column}>
                                <label>Property Type: </label>
                                <Multiselect
                                    options={propertyType_options} // Otions to display in the dropdown
                                    selectedValues={listing2} // Preselected value to persist in dropdown
                                    onSelect={propTypeonSelect} // Function will trigger on select event
                                    onRemove={propTypeonRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    isObject='true'
                                    className={classes.multiselect}

                                />

                            </section>

                            <section className={classes.column}>
                                <label>Possession Status:</label>
                                <div className={classes.row}>
                                    <button type="button" name="possesion" onClick={setPossession2} className={`${possesion === 'Under Construction' ? classes.firstClass : classes.secondClass}`}>Under Construction</button>
                                    <button type="button" name="possesion" onClick={setPossession3} className={`${possesion === 'Ready To Move' ? classes.firstClass : classes.secondClass}`}>Ready To Move</button>
                                </div>
                                {possesion === 'Under Construction' && (
                                    <div className={classes.column}>
                                        <label>Completion Date</label>
                                        <input type="date" defaultValue={date} name="DATA" onChange={handleDate} />
                                    </div>
                                )}
                            </section>

                            <section className={classes.column}>
                                <h3>Project Details :</h3>
                                <div className={classes.underline}></div>
                            </section>

                            <section className={classes.column}>
                                <p>Write Overview:  <span className={classes.txtL}>{text2}/250</span> </p>
                                <textarea type="text" name="overview" value={overview} onInput={textareaHnd2} maxLength="250" onChange={setoverview} />
                            </section>

                            <section className={classes.column}>
                                <p>Brochure :</p>
                                <input type="file" multiple name="brochure" onChange={setbrochure} accept="image/*" />
                                {brochure.map((image, index) => (
                                    <p key={index} className={classes.retrimg} >{image.name}</p>
                                ))}
                            </section>

                            <h3>Amenities :</h3>
                            <section className={classes.column}>
                                <label>Sports :</label>
                                <Multiselect
                                    options={sport_options} // Otions to display in the dropdown
                                    selectedValues={listing3} // Preselected value to persist in dropdown
                                    onSelect={sportonSelect} // Function will trigger on select event
                                    onRemove={sportonRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    isObject='true'
                                    className={classes.multiselect}
                                />

                            </section>

                            <section className={classes.column}>
                                <label>Bathroom :</label>
                                <Multiselect
                                    options={bath_options} // Otions to display in the dropdown
                                    selectedValues={listing4} // Preselected value to persist in dropdown
                                    onSelect={bathonSelect} // Function will trigger on select event
                                    onRemove={bathonRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    isObject='true'
                                    className={classes.multiselect}
                                />

                            </section>
                        </div>

                        <div className={classes.stepRight}>

                            <section className={classes.column}>
                                <label>Safety :</label>
                                <Multiselect
                                    options={safety_options} // Otions to display in the dropdown
                                    selectedValues={listing5} // Preselected value to persist in dropdown
                                    onSelect={safetyonSelect} // Function will trigger on select event
                                    onRemove={safetyonRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    showCheckbox='true'
                                    isObject='true'
                                    className={classes.multiselect}
                                />

                            </section>

                            <h3>Specifications :</h3>

                            <section className={classes.column}>
                                <label>Master Bedroom-Walls :</label>
                                <select name="paint" onChange={setpaint}>
                                    <option>{paint}</option>
                                    {paint !== 'Oil Bound Distemper' && <option>Oil Bound Distemper</option>}
                                    {paint !== 'option 2' && <option>option 2</option>}
                                    {paint !== 'option 3' && <option>option 3</option>}
                                </select>

                            </section>

                            <section className={classes.column}>
                                <label>Master Bedroom-Flooring :</label>
                                <select name="floor" onChange={setfloor}>
                                    <option>{floor}</option>
                                    {floor !== "Vitrified Tiles" && <option>Vitrified Tiles</option>}
                                    {floor !== "option 2" && <option>option 2</option>}
                                    {floor !== "option 3" && <option>option 3</option>}
                                </select>

                            </section>

                            {(selectedValues.includes('2BHK') || (selectedValues.includes('3BHK')) || (selectedValues.includes('4BHK')) || (selectedValues.includes('5BHK'))) && <section className={classes.column}>
                                <label>Other Bedrooms-Flooring :</label>
                                <select name="floor2" onChange={setfloor2}>
                                    <option>{floor2}</option>
                                    {floor2 !== 'Vitrified Tiles' && <option>Vitrified Tiles</option>}
                                    {floor2 !== 'option 2' && <option>option 2</option>}
                                    {floor2 !== 'option 3' && <option>option 3</option>}
                                </select>

                            </section>}

                            <section className={classes.column}>
                                <label>Walls :</label>
                                <select name="wall" onChange={setwall}>
                                    <option>{wall}</option>
                                    {wall !== "Oil Bound Distemper" && <option>Oil Bound Distemper</option>}
                                    {wall !== "option 2" && <option>option 2</option>}
                                    {wall !== "option 3" && <option>option 3</option>}
                                </select>

                            </section>

                            <section className={classes.column}>
                                <label>Living Area-Flooring :</label>
                                <select name="floor3" onChange={setfloor3}>
                                    <option>{floor3}</option>
                                    {floor3 !== "Vitrified Tiles" && <option>Vitrified Tiles</option>}
                                    {floor3 !== "option 2" && <option>option 2</option>}
                                    {floor3 !== "option 3" && <option>option 3</option>}
                                </select>

                            </section>

                            <section className={classes.column}>
                                <label>Structure :</label>
                                <select name="structure" onChange={setstructure}>
                                    <option>{structure}</option>
                                    {structure !== "RCC Frame Structure" && <option>RCC Frame Structure</option>}
                                    {structure !== "option 2" && <option>option 2</option>}
                                    {structure !== "option 3" && <option>option 3</option>}
                                </select>

                            </section>
                            {selectedValues.includes('Shop') &&
                                <section className={classes.column}>
                                    <label>Ceiling Height (in Ft) :</label>
                                    <input type="number" name="ceiling" onChange={setceiling} />
                                </section>
                            }


                            <section className={classes.column}>
                                <p>Video :</p>
                                <input type="file" accept="video/*" name="video" onChange={setvideo} />
                                {video && (
                                    <p className={classes.retrimg}>{video.name}</p>
                                )}
                            </section>


                        </div>



                    </div> : ''}  {/*step 2 end */}

                    {step == 3 ? <div className={classes.stepDiv}>


                        <div>
                            <div className={classes.hold}>
                                {formFields.map((field, index) => (
                                    <div className={classes.unt} key={index}>
                                        <label>
                                            Unit Type:
                                            <input
                                                placeholder="Eg. 1 BHK or Shop"
                                                type="text"
                                                value={field.units}
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
                                                value={field.area}
                                                onChange={(e) => handleChange(index, 'area', e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Price:
                                            <input
                                                placeholder="Enter Price"
                                                type="number"
                                                min='1'
                                                maxLength="9"
                                                onInput={maxLengthCheck}
                                                value={field.price}
                                                onChange={(e) => handleChange(index, 'price', e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Layout Image:
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="image3"
                                                required
                                                onChange={(e) => handleImageChange(index, e.target.files[0])}
                                            />
                                        </label>
                                        {field.image && (
                                            <p className={classes.retrimg}>{field.image.name}</p>
                                        )}
                                        <div className={classes.btndd}> <button type="button" className={classes.btnR} onClick={() => handleRemoveRow(index)}>Remove</button> &emsp;  <button type="button" className={classes.btnA} onClick={handleAddRow} >Add Unit</button><br></br> </div>

                                    </div>
                                ))}
                                <center>
                                    <button type="submit" className={classes.Submitbtn}  >Submit</button>
                                </center>

                            </div>
                            {/*<button onClick={handleSubmit} className={classes.sbt}>Submit</button>*/}
                        </div>


                    </div> : ''} {/*step 3 end */}



                </form>
                {isPopupOpen && <AdminPopup onClose={closePopup} txt1='SuccessFully Posted' txt2='Your property will be live after verification' txt3='.' />}

                {myload && <AdminPopup onClose={closePopup} txt1='posting property' txt2='Please Wait do not press Back or Refresh Button' txt3='pop' />}
                {postingError && <ErrorPopup txt1="Technical Error : Property Not Posted" txt2="Cheak all inputs are filled properly and try again" onClose={errorPopupClose} />}
                <div className={classes.stepHold}>{step > 1 ? <button onClick={backHnd} className={classes.btnStep1}>Back</button> : ''} {step < 3 ? <button onClick={nextHnd} className={classes.btnStep2}>Next</button> : ''}</div>

            </div>


        </>
    );
};
export default Create;