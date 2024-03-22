import axios from "axios";
import classes from "./Enquiry.module.css";
import { useEffect, useState } from "react";

const Enquiry = () => {
    const [result, setResult] = useState('');

    const getAllEnquiry = async () => {
        try {
            const res = await axios.get('http://localhost:8800/fetchEnquiryData')
            console.log(res.data)
            setResult(res.data)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getAllEnquiry()
    }, []);
    return (
        <div className={classes.container}>
            <table className={classes.outerTable}>
                <tr>
                    <th>Enquiry NO .</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Property Name</th>
                    <th>Interested</th>
                    <th>Date/Time</th>
                </tr>
                {result && result.map((item, index) => (
                    <tr key={index}>
                        <td>{item.ENQUIRY_NO}</td>
                        <td>{item.NAME}</td>
                        <td>{item.EMAIL}</td>
                        <td>{item.MOBILE}</td>
                        <td>{item.PROPERTY_NAME}</td>
                        <td>{item.INTEREST}</td>
                        <td>{item.TIME}</td>
                    </tr>
                ))}

            </table>
        </div>
    );
};
export default Enquiry;