import classes from "./Client_side_request.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";


const Client_side_request = () => {
    const [info, setInfo] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['edit2']);


    useEffect(() => {
        const fetchAllInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8800/client_requests")
                setInfo(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllInfo();
    }, []);




    const active = async (btnId) => {
        //console.log(btnId)


        try {
            //setCol(!col);
            await axios.put("http://localhost:8800/status", { btnId })


        } catch (err) {
            return console.log(err);
        }
        // Save the current scroll position before the reload
        const scrollPosition = window.scrollY;
        // Reload the page
        window.location.reload();
        // Restore the scroll position after the reload
        window.scrollTo(0, scrollPosition);

    }

    const editHnd = (id) => {
        console.log(id)
        setCookie('edit', id)

        const newTabUrl = 'http://localhost:3000/adUserEdit';

        // Open a new tab with the specified URL
        window.open(newTabUrl, '_blank');
    }



    return (
        <>


            <div className={classes.container}>
                <h1>Client Project Requests</h1>
                <Link to="/dashboard" className={classes.backBtn}>Back to Dashboard</Link>
                <div className={classes.chart}>
                    <table>
                        <tr>
                            <th>No.</th>


                            <th>Cust Purpose</th>
                            <th>Building/property Name</th>
                            <th>property Type</th>

                            <th>Property Owner</th>
                            <th>Owner Name</th>
                            <th>Locality</th>
                            <th>City</th>
                            <th>Bhk</th>
                            <th>Sqft</th>


                            <th>Price</th>
                            <th>Contact Num.</th>


                            <th>Action</th>
                            <th>Account Details</th>

                        </tr>
                        {info && info.data.map((record, index) => (

                            <tr key={index}>
                                <td>{record.ID}</td>


                                <td>{record.CUST_PURP}</td>
                                <td>{record.PROPERTY_NAME}</td>
                                <td>{record.PROPERTY_TYPE}</td>

                                <td>{record.PROPERTY_OWNER}</td>
                                <td>{record.OWNER_NAME}</td>
                                <td>{record.LOCALITY}</td>
                                <td>{record.CITY}</td>
                                <td>{record.BHK}</td>
                                <td>{record.SQFT}</td>


                                <td>{record.PRICE}</td>
                                <td>{record.CONTACT}</td>

                                <td>

                                    <button onClick={() => { active(record.SIGNUP_ID); window.location.reload() }} className={record.STATUS == 0 ? "Abtn" : "Dbtn"} >{record.STATUS ? 'Deactivate' : 'Activate'}</button>
                                    <button onClick={() => { editHnd(record.SIGNUP_ID) }}>Edit</button>
                                </td>

                                <td>

                                </td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>

            {info?.user.map((item, key) => <p>{key}----{item.PASSWORD}---{item.EMAIL}</p>)}



        </>
    );
};
export default Client_side_request;