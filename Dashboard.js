import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

function Dashboard() {


    return (
        <>

            <div className={classes.container}>
                <h1>Welcome ! Prime Edge Properties</h1>
                <div className={classes.leftmenu}>
                    <Link className={classes.btn} to="/all_project_details">VIEW ALL PROJECTS</Link>
                    <Link className={classes.btn} to="/create">CREATE</Link>
                    <Link className={classes.btn} to="/viewAllEnquiry">ENQUIRY</Link>
                    <Link className={classes.btn} to="/client_side_request">CLIENT SIDE PROJECT</Link>
                    <Link className={classes.btn} to="/postUserProp">Post User Property</Link>
                </div>
            </div>

        </>
    );
};
export default Dashboard;