import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import classes from "./Login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useAppContext } from "../AppContext";
import { AppProvider } from "../AppContext";
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;


const Login = () => {
    const [data, setData] = useState({
        username: "",
        pass: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/login', { data });

            if (response.data) {
                //console.log(response)
                //console.log(response.data.data[0].NAME) 
                //console.log(response.data.Admin)
                Cookies.set('loginSuccessful', response.data.data[0].NAME, { expires: (1 / 1440) * 60 }, { secure: true });
                Cookies.set('adminStatus', response.data.Admin, { expires: (1 / 1440) * 60 }, { secure: true });
                Cookies.set('token2', response.data.data[0].SIGNUP_ID, { expires: (1 / 1440) * 60 }, { secure: true });
                navigate('/')
                window.location.reload()

            } else {
                alert("Invalid Username or Password");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/*<Navbar name={name} />*/}
            <div className={classes.container}>
                <div className={classes.form_container}>
                    <div className={classes.left}></div>
                    <div className={classes.right}>
                        <h2>User Sign In</h2>
                        <form className={classes.main_form} onSubmit={handleSubmit}>
                            <input type="text" placeholder="Enter Usename" name="username" onChange={handleChange} />
                            <input type="password" placeholder="Enter Password" name="pass" onChange={handleChange} />
                            <button type="submit">Login</button>
                            <center><p>New to PrimeEdge Properties ? <span className={classes.register}><Link className={classes.register} to="/signup">Register</Link></span></p></center>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;