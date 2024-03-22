import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import classes from "./Signup.module.css";
import './Signup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [userType, setUserType] = useState('');
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        pass: ""
    });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleChange2 = (e) => {
        //e.preventDeafult()
        setUserType('Owner')
    }
    const handleChange3 = (e) => {
        //e.preventDeafult()
        setUserType('Agent')
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/signup", { data, userType })
            console.log(res.data.status)
            if (res.data.status == 'exists') {
                alert('Account already exists! Please Log In')
            } else {
                alert("Account created successfully!")
                navigate("/")
                //console.log('success')

            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>

            <div className={classes.container}>
                <div className={classes.form_container}>
                    <div className={classes.left}></div>
                    <div className={classes.right}>
                        <h2>User Sign Up</h2>
                        <form className={classes.main_form} onSubmit={handleSubmit}>
                            <div className={classes.btnHold}>
                                <label>I am:</label>
                                <p onClick={handleChange2} className={userType === 'Owner' ? 'signBtn' : 'signBtn2'}>Owner</p>
                                <p onClick={handleChange3} className={userType === 'Agent' ? 'signBtn' : 'signBtn2'}>Agent</p>
                            </div>
                            {userType === 'Agent' && <input type="text" pattern="[A-Za-z][0-9]{11}" maxlength="12" maxLength={12} placeholder="Agent Rera Number eg. A29084812344"></input>}

                            <input type="text" placeholder="Enter Name" name="name" onChange={handleChange} required />
                            <input type="email" placeholder="Enter Email" name="email" onChange={handleChange} required />
                            <input type="text" placeholder="Enter Mobile" name="mobile" onChange={handleChange} required />
                            <input type="password" placeholder="Create Password" name="pass" onChange={handleChange} required />
                            <button type="submit" className={classes.sbtBtn}>Register</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Signup;