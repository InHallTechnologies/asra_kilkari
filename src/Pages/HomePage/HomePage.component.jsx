import Styles from "./HomePage.module.css";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../backend/firebaseHandler";
import { FaCalendar, FaBaby, FaListAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserData.context";
import { IoPeople } from "react-icons/io5";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import CheckAuthBox from "../../workload/CheckAuthBox.component";


const HomePage = () => {

    const [userData] = useContext(UserContext)
    const navigate = useNavigate()




    const handleLogout = () => {
        signOut(firebaseAuth);
        navigate("/")
    }



    return (
        <CheckAuthBox>
            <div className={Styles.navigationContainer}>
                <img className={Styles.logo} src="/logo.png" alt="Kilkari" />
                <div>
                    <p><strong>{userData.name}</strong></p>
                    <p onClick={handleLogout} style={{ cursor: "pointer", textDecoration: "underline" }}>Logout</p>
                </div>
            </div>

            <div className={Styles.heroContainer}>
                <div className={Styles.detailsContainer}>
                    <h1 className={Styles.heroTitle}>भूख और कुपोषण से मुक्त भारत — हर बच्चे के चेहरे पर मुस्कान</h1>
                    <p className={Styles.heroSubTitle}>आइए मिलकर ऐसा भारत बनाएं जहाँ कोई बच्चा भूखा न सोए और हर चेहरे पर सेहतमंद मुस्कान हो। कुपोषण सपनों को अधूरा छोड़ देता है। सही पोषण और सामूहिक प्रयास से हम बच्चों को स्वस्थ और खुशहाल भविष्य दे सकते हैं।</p>
                </div>

                <div className={Styles.illustrationContainer}>
                    <img className={Styles.illustration} src="/public/home_illus.png" />
                    <svg className={Styles.illustrationBackground} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#F2F4F8" d="M52.1,-45.4C67.2,-37,78.9,-18.5,77.9,-0.9C77,16.7,63.6,33.4,48.5,43.5C33.4,53.5,16.7,56.9,0.1,56.9C-16.5,56.8,-33.1,53.2,-42.6,43.1C-52.2,33.1,-54.8,16.5,-52.6,2.2C-50.5,-12.2,-43.5,-24.4,-34,-32.8C-24.4,-41.1,-12.2,-45.6,3.2,-48.8C18.5,-51.9,37,-53.7,52.1,-45.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            <div className={Styles.featureContainer}>
                <div className={Styles.optionsContainer}>
                    {
                        userData.access === "Operator"
                            ?
                            <>
                                <Link role='button' to="/enroll-child" style={{ backgroundColor: '#FFF8E6' }} className={Styles.optionsContentContainer}>
                                    <div style={{ width: '100%', }} >
                                        <FaBaby size={40} color="#A26D4F" />
                                        <p className={Styles.optionTitle}>नए बच्चे का नामांकन करें</p>
                                        <p className={Styles.optionSubtitle}>नए बच्चे का पूरा विवरण दर्ज करें और नामांकन प्रक्रिया पूरी करें।</p>
                                    </div>
                                </Link>

                                <Link role='button' to="/update-information" style={{ backgroundColor: '#FFEBD8' }} className={Styles.optionsContentContainer}>
                                    <div style={{ width: '100%', }} >
                                        <FaCalendar size={38} color="#E09B74" />
                                        <p className={Styles.optionTitle}>बच्चे का दैनिक अपडेट दें</p>
                                        <p className={Styles.optionSubtitle}>बच्चे की वर्तमान स्वास्थ्य स्थिति और पोषण संबंधी जानकारी अपडेट करें।</p>
                                    </div>
                                </Link>

                                <Link role='button' to="/view-entries" style={{ backgroundColor: '#DFFFF9' }} className={Styles.optionsContentContainer}>
                                    <div style={{ width: '100%', }} >
                                        <FaListAlt size={40} color="#5CAAA0" />
                                        <p className={Styles.optionTitle}>रिकॉर्ड देखें</p>
                                        <p className={Styles.optionSubtitle}>सभी पंजीकृत बच्चों का रिकॉर्ड और अद्यतन जानकारी देखें।</p>
                                    </div>
                                </Link>
                            </>
                            :
                            <>
                                <Link role='button' to="/view-entries" style={{ backgroundColor: '#DFFFF9' }} className={Styles.optionsContentContainer}>
                                    <div>
                                        <FaListAlt size={40} color="#5CAAA0" />
                                        <p className={Styles.optionTitle}>रिकॉर्ड देखें</p>
                                        <p className={Styles.optionSubtitle}>सभी पंजीकृत बच्चों का रिकॉर्ड और अद्यतन जानकारी देखें।</p>
                                    </div>
                                </Link>

                                <Link role='button' to="" style={{ backgroundColor: '#FFF8E6' }} className={Styles.optionsContentContainer}>
                                    <div>
                                        <IoPeople size={40} color="#A26D4F" />
                                        <p className={Styles.optionTitle}>सभी ऑपरेटर देखें</p>
                                        <p className={Styles.optionSubtitle}>वे सभी ऑपरेटर जो प्रविष्टियाँ कर रहे हैं</p>
                                    </div>
                                </Link>

                                <Link role='button' to="" style={{ backgroundColor: '#FFEBD8' }} className={Styles.optionsContentContainer}>
                                    <div>
                                        <BsFillFileBarGraphFill size={38} color="#E09B74" />
                                        <p className={Styles.optionTitle}>सारांश देखें</p>
                                        <p className={Styles.optionSubtitle}>मुख्य बिंदुओं और गतिविधियों का संक्षिप्त विवरण देखें</p>
                                    </div>
                                </Link>

                            </>
                    }

                </div>
            </div>

            <div>
                <p className={Styles.sectionHeading}>बच्चों में कुपोषण के ख़िलाफ़ एक <span style={{ textDecoration: "underline", textDecorationColor: "#FDB10D", textDecorationThickness: 3 }}>सशक्त पहल</span> की शुरुआत</p>

                <div className={Styles.imageContainer}>
                    <img src="/home1.jpeg" className={Styles.homeDisplayImage} />
                    <img src="/home2.jpeg" className={Styles.homeDisplayImage} />
                    <img src="/home3.jpeg" className={Styles.homeDisplayImage} />
                </div>
            </div>
            <div className={Styles.bottomStrip}>
                <p className={Styles.bottomText}>&#169; Kilkari</p>
            </div>
        </CheckAuthBox>
    )
}

export default HomePage;