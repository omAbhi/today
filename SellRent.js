
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import classes from "./SellRent.module.css";
import property from "./Images/assets.png";
import clock from "./Images/time-left.png";
import openion from "./Images/opinions.png";
import support from "./Images/support.png";
import image from "./Images/man.svg";
import image1 from "./Images/free-listing.svg";
import image2 from "./Images/property-proposal.svg";
import image3 from "./Images/needful-negotiations.svg";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



function SellRent() {
    const [data, setData] = useState({
        youare: "",
        hereto: "",
        Bemail: "",
        Bmobile: "",
        Bcity: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8800/form', { data });
            console.log(response.data);

            // If the submission is successful, navigate to the register page
            navigate('/signup');
        } catch (error) {
            console.error('Error submitting data:', error);
            // Handle error or show an error message to the user
        }
    };

    return (
        <>

            <div className={classes.container}>
                <div className={classes.top1}>
                    <div className={classes.top1L}>
                        <div className={classes.heading}>
                            <h1 className={classes.head1}>Post Your Property</h1>
                            <h1 className={classes.head2}>Advertisement For Free</h1>
                        </div>
                        <div className={classes.button}>
                            <div className={classes.r1}>
                                <p><img src={property} alt="property dealer" />10K+ Property Options</p>
                                <p><img src={clock} alt="property dealer" />Transaction Every 15 Minutes</p>
                            </div>
                            <div className={classes.r1}>
                                <p><img src={openion} alt="property dealer" />1M+ Property seekers every month</p>
                                <p><img src={support} alt="property dealer" />100% Service Support</p>
                            </div>
                        </div>
                        <img className={classes.banner} src={image} alt="real estate" />
                    </div>
                    <div className={classes.top1R}>
                        <div className={classes.form_container}>
                            <h2>Let’s get you started</h2>

                            <form className={classes.formfill} onSubmit={handleSubmit}>
                                <div className={classes.line1}>
                                    <p>You are :</p>
                                    <div className={classes.row}>
                                        <div><input type="radio" name="youare" value="Agent" onChange={handleChange} required />
                                            <label>Agent</label>
                                        </div>
                                        <div><input type="radio" name="youare" value="Builder" onChange={handleChange} required />
                                            <label>Builder</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="youare" value="Owner" onChange={handleChange} required />
                                            <label>Owner</label>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.line1}>
                                    <p>You are here to :</p>
                                    <div className={classes.row}>
                                        <div><input type="radio" name="hereto" value="Sale" onChange={handleChange} required />
                                            <label>Sale</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="hereto" value="Rent/Lease" onChange={handleChange} required />
                                            <label>Rent/Lease</label>
                                        </div>
                                    </div>
                                </div>
                                <input type="text" placeholder="Enter name" name="Bcity" onChange={handleChange} required />
                                <input type="email" placeholder="Enter Valid Email" name="Bemail" onChange={handleChange} required />
                                <input type="number" placeholder="Enter Mobile" name="Bmobile" onChange={handleChange} required />


                                <button type="submit" className={classes.btn} >Next</button>

                            </form>
                        </div>
                    </div>

                </div>
                <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffff" fillOpacity="1" d="M0,320L1440,64L1440,320L0,320Z"></path></svg>
            </div>
            <div className={classes.top2}>
                <center>
                    <h1>How to post to get the most ?</h1>
                    <p>Selling/renting property is no more a challenge with Prime Edge. Renting / Selling a house has become easy with the internet and easier with us! We will handle the process of selling your property from start to finish. Follow these steps to begin your home selling journey.</p>
                </center>
                <div className={classes.card_row}>

                    <div className={classes.card}>
                        <img src={image1} alt="free_listing" />
                        <p className={classes.head}>Show off your property</p>
                        <p className={classes.info}>
                            Sign up or log in to Prime Edge and create a free property ad post with good pictures, detailed video, and other important information like the type, price, size, location
                        </p>
                    </div>
                    <div className={classes.card}>
                        <img src={image2} alt="property_proposal" />
                        <p className={classes.head}>Property Proposal</p>
                        <p className={classes.info}>
                            To attract buyers or renters, you have to put your best info forward. Jot down all the advantages and benefits of your property that the renter or buyer may want to avail.
                        </p>
                    </div>
                    <div className={classes.card}>
                        <img src={image3} alt="needful_negotiation" />
                        <p className={classes.head}>Needful Negotiations</p>
                        <p className={classes.info}>
                            No one can sell your property better than you. Price is the most important factor. We suggest you inspect, negotiate, and seal the deal. Do Not Under-Price!
                        </p>
                    </div>
                </div>

            </div>


        </>
    );
};
export default SellRent;