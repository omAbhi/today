import { useEffect } from 'react';
import classes from './Disclaimer.module.css';
import axios from 'axios';

const Disclaimer = () => {
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:8800/getDisclaimer');
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        //setTimeout(getData, 10000)
        //getData()
    })

    return (
        <div className={classes.hold}>
            <p className={classes.txt}><span className={classes.txt1}>Disclaimer: </span>This website is only for the purpose of providing information regarding real estate projects in different geographies. Any information which is being provided on this website is not an advertisement or a solicitation. The company has not verified the information and the compliances of the projects. Further, the company has not checked the RERA* registration status of the real estate projects listed herein. The company does not make any representation in regards to the compliances done against these projects. Please note that you should make yourself aware about the RERA* registration status of the listed real estate projects.
                *Real Estate (regulation & development) act 2016.
            </p>
        </div>
    )
}

export default Disclaimer;