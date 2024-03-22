import classes from "./All.module.css";
import image1 from "../../HOME/Projects/Images/1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../Popup/Popup";

function All() {
    const [info, setInfo] = useState();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [id, setId] = useState();
    const [individualData, setIndividualData] = useState()
    const [tim, setTim] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['edit']);

    const navigate = useNavigate();

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const DeletePopUp = async () => {
        try {

            setIsPopupOpen(false)
            //console.log(id, 'dele')
            const res = await axios.delete(`http://localhost:8800/${id}`);
            console.log(res.data.success)

            if (res.data.success) {
                setIsPopupOpen(false)
                alert('entry deleted successfully')
            } else {
                setIsPopupOpen(false)
                alert('error, In deleting the entry')
            }
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        const fetchAllInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8800/builder_DATA")
                setInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchAdminIndividual = async () => {
            try {
                const response = await axios.get('http://localhost:8800/fetchAdminIndividualProp')
                //console.log(response)
                setIndividualData(response.data)
                console.log(individualData)
            } catch (err) {
                console.log(err)
            }
            setTim(true)

        }
        fetchAllInfo();

        fetchAdminIndividual();
        // fetchAdminIndividual();
    }, [tim]);

    const handleDelete = async (ID) => {
        setIsPopupOpen(true)
        setId(ID)
        //onDelete(ID)

        /*try {
            
            const res = await axios.delete(`http://localhost:8800/${ID}`);
            console.log(res.data.success)

            if (res.data.success) {
                alert('entry deleted successfully')
            } else {
                alert('error, In deleting the entry')
            }
            window.location.reload()
        } catch (err) {
            console.log(err)
        }*/
    };

    const active = async (BID) => {
        //console.log(BID)
        try {
            await axios.put("http://localhost:8800/builder_status", { BID })
        } catch (err) {
            console.log(err)
        }
    };

    const editHnd = (id) => {
        setCookie('edit', id)
        //navigate('/editPage2')
        navigate('/editPage')

    }
    return (
        <>
            <section className={classes.main_container}>
                <h1>All Product Detailes</h1>
                <Link to="/dashboard" className={classes.backBtn}>Back to Dashboard</Link>
                <div className={classes.container}>
                    <table>
                        <tr>
                            <th>id</th>
                            <th>Project Name</th>
                            <th>Project Profile</th>
                            <th>Project Cover</th>
                            <th>Project Address</th>
                            <th>Project Price</th>
                            <th>Project BHK</th>
                            <th>Project SQFT</th>
                            <th>Action</th>
                        </tr>
                        {info && info.map((record, index) => (
                            <tr key={index}>
                                <td>{record.ID}</td>
                                <td>{record.PROJECT_NAME}</td>
                                <td><img className={classes.imgsize} src={`http://localhost:8800/BUILDER/` + record.THUMBNAIL} alt="Prime edge" /></td>
                                <td><div>
                                    {record.COVER.split(',').map((cover, index) => (
                                        <img className={classes.image} key={index} src={`http://localhost:8800/BUILDER/${cover}`} alt={`Cover ${index}`} />
                                    ))}
                                </div>
                                </td>
                                <td>{record.D_ADDRESS}</td>
                                <td>₹ {record.MIN_PRICE} - ₹ {record.MIN_PRICE}</td>
                                <td>{record.BHK}</td>
                                <td>{record.MIN_SQFT} - {record.MAX_SQFT}</td>
                                <td>
                                    <button onClick={() => handleDelete(record.ID)}>DELETE</button>
                                    <button onClick={() => { editHnd(record.ID) }}>EDIT</button>
                                    <button onClick={() => { active(record.ID); window.location.reload() }}>{record.B_STATUS ? 'Deactivate' : 'Activate'}</button>
                                </td>


                            </tr>
                        ))}

                    </table>
                </div>
            </section>

            {isPopupOpen && <Popup onClose={closePopup} onDelete={DeletePopUp} txt1='Please Confirm!' txt2='This action will permanently delete this property' AdminDel='.' />}



        </>
    );
};
export default All;