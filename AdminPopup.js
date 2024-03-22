import React from 'react';
import classes from './AdminPopup.module.css';

const AdminPopup = ({ onClose, txt1, txt2 }) => {
    return (
        <div className={classes.popupContainer}>
            <div className={classes.popup}>
                <h2 className={classes.hd}>{txt1}</h2>
                <p className={classes.hd2}>{txt2}</p>
                <div className={classes.popBtnHold}>
                    <button className={classes.popBtn} onClick={onClose}>Close</button>
                </div>


            </div>


        </div>
    );
};

export default AdminPopup;