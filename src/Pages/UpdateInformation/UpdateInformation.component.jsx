import React, { useContext, useEffect, useState } from "react";
import Styles from "./UpdateInformation.module.css"
import UpdateSample from "../../entities/Update.sample";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { onValue, push, ref, set } from "firebase/database";
import { firebaseAuth, firebaseDatabase } from "../../backend/firebaseHandler";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router";
import UserContext from "../../Contexts/UserData.context";
import { signOut } from "firebase/auth";

const UpdateInformation = () => {

    const [entryDetail, setEntryDetail] = useState(UpdateSample)
    const [loading, setLoading] = useState(false)
    const [childList, setChildList] = useState([])
    const [selectedChild, setSelectedChild] = useState({})
    const navigate = useNavigate()
    const [userData] = useContext(UserContext)

    useEffect(()=>{
        if (!firebaseAuth.currentUser) {
            navigate("/")
        }
    }, [])

    const handleLogout = () => {
        signOut(firebaseAuth);
        navigate("/")
    }

    useEffect(() => {
        let temp = []

        onValue(ref(firebaseDatabase, `OPERATOR_WISE_ENROLLMENT/${userData.uid}`), (snap) => {
            if (snap.exists()) {
                for (const key in snap.val()) {
                    let item = snap.child(key).val()
                    temp.push(item)
                }
            }
            setChildList(temp)
            setLoading(false)
        }, { onlyOnce: true })
    }, [])

    const handleSubmit = async () => {
        if (!entryDetail.inClinicServiceDay) {
            toast.warn("कृपया इन क्लिनिक सर्विसेज-दिन दर्ज करें")
            return
        }
        if (!entryDetail.weight) {
            toast.warn("कृपया वजन दर्ज करें")
            return
        }
        if (!entryDetail.wasBabyFed) {
            toast.warn("कृपया चुनें कि बच्चे को खाना खिलाया गया था या नहीं।")
            return
        }
        if (!entryDetail.wasBabyGivenMilkFormula) {
            toast.warn("कृपया चुनें कि बच्चे को दूध पिलाया गया था या नहीं।")
            return
        }
        if (!entryDetail.wasMotherFed) {
            toast.warn("कृपया दर्ज करें कि मां को खाना खिलाया गया था या नहीं।")
            return
        }
        if (!entryDetail.homeMadeProteinFoodGiven) {
            toast.warn("क्या घर का बना प्रोटीन युक्त खाना मिला?")
            return
        }
        if (!entryDetail.roWaterAvailable) {
            toast.warn("कृपया दर्ज करें कि क्या RO का पानी मिला?")
            return
        }
        if (!entryDetail.wasBeddingClothingDone) {
            toast.warn("कृपया बिछावन से जुड़ी जानकारी दर्ज करें।")
            return
        }
        if (!entryDetail.handWashTrainingDone) {
            toast.warn("कृपया दर्ज करें हाथ धुलाई सम्बन्धी प्रशिक्षण दिया गया |")
            return
        }
        if (!entryDetail.teethBrushed) {
            toast.warn("कृपया दर्ज करें टूथ -ब्रशिंग  की गई")
            return
        }
        if (!entryDetail.wasGroomingDone) {
            toast.warn("कृपया दर्ज करें नाख़ून एवं बाल कटाई की गई")
            return
        }
        if (!entryDetail.washroomHygieneFollowed) {
            toast.warn("कृपया दर्ज करें शौचालय के पहले और बाद में शिष्टाचार")
            return
        }
        if (!entryDetail.sanitizationDone) {
            toast.warn("कृपया दर्ज करें सेनिटाइज़ेशन किया गया")
            return
        }
        if (!entryDetail.houseFloorCleaned) {
            toast.warn("कृपया दर्ज करें हाउस फ्लोर क्लीनिंग किया गया")
            return
        }
        if (!entryDetail.anotherFacilityReferred) {
            toast.warn("कृपया दर्ज करें क्या अन्य फेसिलिटी पर रेफर किया")
            return
        }
        if (entryDetail.anotherFacilityReferred === "हाँ" && !entryDetail.anotherFacilityName) {
            toast.warn("कृपया दर्ज करें किस फेसिलिटी पर रेफेर किया")
            return
        }
        if (!entryDetail.threeTimeDoctorVisitDone) {
            toast.warn("कृपया डॉक्टर विजिट दर्ज करें")
            return
        }
        if (!entryDetail.wereSixAnganwadiWorkerPresent) {
            toast.warn("कृपया दर्ज करें क्या 6 आंगनवाड़ी कार्यकर्ता मौजूद रही")
            return
        }
        if (!entryDetail.doctorFromAmaltasAvailable) {
            toast.warn("कृपया दर्ज करें अमलतास अस्पताल से 2 डॉक्टर उपस्थित है")
            return
        }
        if (entryDetail.inClinicServiceDay === "Day 7" && !entryDetail.seventhDayMUAC) {
            toast.warn("कृपया दर्ज करें 07-दिवस पर MUAC")
            return
        }
        if (entryDetail.inClinicServiceDay === "Day 14" && !entryDetail.lastDayHB) {
            toast.warn("कृपया दर्ज करें अंतिम दिवस पर HB")
            return
        }
        if (entryDetail.inClinicServiceDay === "Day 14" && !entryDetail.lastDayHeight) {
            toast.warn("कृपया दर्ज करें अंतिम दिवस पर ऊंचाई")
            return
        }
        if (entryDetail.inClinicServiceDay === "Day 14" && !entryDetail.lastDayWeight) {
            toast.warn("कृपया दर्ज करें अंतिम दिवस पर वजन")
            return
        }
        if (entryDetail.inClinicServiceDay === "Day 14" && !entryDetail.lastDayMUAC) {
            toast.warn("कृपया दर्ज करें अंतिम दिवस पर MUAC")
            return
        }

        setLoading(true)

        entryDetail.entryDate = moment().format("DD-MM-YYYY h:mm a")
        entryDetail.entryByName = userData.name
        entryDetail.entryByUid = userData.uid
        entryDetail.childName = selectedChild.name
        entryDetail.childAdmitDate = selectedChild.admitDate
        entryDetail.childBedNumber = selectedChild.bedNumber
        entryDetail.childUid = selectedChild.uid
        entryDetail.entryKey = push(ref(firebaseDatabase, `CHILD_WISE_ENTRY/${selectedChild.uid}`)).key

        selectedChild.lastEntryDate = entryDetail.entryDate
        selectedChild.numberOfEntries = selectedChild.numberOfEntries + 1

        await set(ref(firebaseDatabase, `CHILD_WISE_ENTRY/${selectedChild.uid}/${entryDetail.entryKey}`), entryDetail)
        await set(ref(firebaseDatabase, `OPERATOR_WISE_ENROLLMENT/${entryDetail.entryByUid}/${entryDetail.childUid}`), selectedChild)
        await set(ref(firebaseDatabase, `ALL_ENROLLMENTS/${entryDetail.childUid}`), selectedChild)
        toast.success("दैनिक अपडेट दर्ज किया गया")

        setTimeout(() => {
            navigate("/home", { replace: true })
        }, 2000)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEntryDetail({ ...entryDetail, [name]: value })
    }

    return (
        <div className={Styles.updateInformationContainer}>
            <div className={Styles.messageImageContainer}>
                <img className={Styles.illustration} alt="Kilkari" src="/mother.svg" />
                <img className={Styles.logo} src="/logo.png" alt="Kilkari" />
                <p className={Styles.focusText}>पोषण अभियान</p>
                <p className={Styles.focusSubText}>जिला प्रशासन देवास की एक पहल।</p>
            </div>

            <div className={Styles.formHeaderContainer}>
                <div className={Styles.navigationContainer}>
                    <img className={Styles.mpLogo} src="/mp_logo.png" alt="Madhya Pradesh" />
                    <div>
                        <p><strong>{userData.name}</strong></p>
                        <p onClick={handleLogout} style={{cursor:"pointer", textDecoration:"underline"}}>Logout</p>
                    </div>
                </div>

                <div className={Styles.formTitleContainer}>
                    <p className={Styles.formTitle}>दैनिक रिकॉर्ड अपडेट करने के लिए नीचे दी गई जानकारी भरें</p>

                    <div className={Styles.formContainer}>
                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>बच्चे का नाम</label>
                            <Select required value={selectedChild.name} onChange={(event) => { setSelectedChild(event.target.value) }} size='small'>
                                {
                                    childList
                                    &&
                                    childList.map((item) => {
                                        return (
                                            <MenuItem value={item}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        {
                            selectedChild.name
                            &&
                            <>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>भर्ती होने की दिनांक</label>
                                    <TextField required value={selectedChild.admitDate} disabled size='small' />
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>बेङ-नंबर</label>
                                    <TextField required value={selectedChild.bedNumber} disabled size='small' />
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>इन क्लिनिक सर्विसेज-दिन</label>
                                    <Select required value={entryDetail.inClinicServiceDay} name="inClinicServiceDay" onChange={handleChange} size='small'>
                                        <MenuItem value="Day 1">Day 1</MenuItem>
                                        <MenuItem value="Day 2">Day 2</MenuItem>
                                        <MenuItem value="Day 3">Day 3</MenuItem>
                                        <MenuItem value="Day 4">Day 4</MenuItem>
                                        <MenuItem value="Day 5">Day 5</MenuItem>
                                        <MenuItem value="Day 6">Day 6</MenuItem>
                                        <MenuItem value="Day 7">Day 7</MenuItem>
                                        <MenuItem value="Day 8">Day 8</MenuItem>
                                        <MenuItem value="Day 9">Day 9</MenuItem>
                                        <MenuItem value="Day 10">Day 10</MenuItem>
                                        <MenuItem value="Day 11">Day 11</MenuItem>
                                        <MenuItem value="Day 12">Day 12</MenuItem>
                                        <MenuItem value="Day 13">Day 13</MenuItem>
                                        <MenuItem value="Day 14">Day 14</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>वजन</label>
                                    <TextField required value={entryDetail.weight} name="weight" onChange={handleChange} size='small' />
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>NRC-की गाइडलाइन के अनुसार बच्चो का भोजन दलिया- खिचड़ी  दिया गया |</label>
                                    <Select required value={entryDetail.wasBabyFed} name="wasBabyFed" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>NRC-की गाइडलाइन के अनुसार दूध एवं फार्मूला पाउडर सुबह शाम दिया गया |</label>
                                    <Select required value={entryDetail.wasBabyGivenMilkFormula} name="wasBabyGivenMilkFormula" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>माताओ को सुबह शाम भोजन मिला है</label>
                                    <Select required value={entryDetail.wasMotherFed} name="wasMotherFed" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>होम मेड प्रोटीन फ़ूड |</label>
                                    <Select required value={entryDetail.homeMadeProteinFoodGiven} name="homeMadeProteinFoodGiven" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>RO-जल उपलब्ध है</label>
                                    <Select required value={entryDetail.roWaterAvailable} name="roWaterAvailable" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>व्यक्तिगत स्वच्छता सम्बन्धी कार्य जैसे कपडे बदलना-नहलाना-एवं बैड शीट बदलना उक्त कार्य किये गए</label>
                                    <Select required value={entryDetail.wasBeddingClothingDone} name="wasBeddingClothingDone" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>हाथ धुलाई सम्बन्धी प्रशिक्षण दिया गया |</label>
                                    <Select required value={entryDetail.handWashTrainingDone} name="handWashTrainingDone" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>टूथ -ब्रशिंग  की गई |</label>
                                    <Select required value={entryDetail.teethBrushed} name="teethBrushed" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>नाख़ून एवं बाल कटाई की गई | </label>
                                    <Select required value={entryDetail.wasGroomingDone} name="wasGroomingDone" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>शौचालय के पहले और बाद में शिष्टाचार |</label>
                                    <Select required value={entryDetail.washroomHygieneFollowed} name="washroomHygieneFollowed" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>सेनिटाइज़ेशन किया गया |</label>
                                    <Select required value={entryDetail.sanitizationDone} name="sanitizationDone" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>हाउस फ्लोर क्लीनिंग किया गया |</label>
                                    <Select required value={entryDetail.houseFloorCleaned} name="houseFloorCleaned" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>क्या किसी अन्य फेसिलिटी पर रेफर किया है</label>
                                    <Select required value={entryDetail.anotherFacilityReferred} name="anotherFacilityReferred" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>

                                {
                                    entryDetail.anotherFacilityReferred === "हाँ"
                                    &&
                                    <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                        <label className={Styles.labelText}>यदि हाँ तो किस फेसिलिटी पर रेफेर किया है उसका नाम</label>
                                        <TextField required value={entryDetail.anotherFacilityName} name="anotherFacilityName" onChange={handleChange} size='small' />
                                    </div>
                                }

                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>अगर कोई बच्चा हॉस्पिटल से घर चला गया है तो कोनसे दिन गया है (Dropout)</label>
                                    <TextField required value={entryDetail.dropoutDay} name="dropoutDay" onChange={handleChange} size='small' />
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>डॉक्टर विजिट (सुबह-दोपहर-शाम) की गई</label>
                                    <Select required value={entryDetail.threeTimeDoctorVisitDone} name="threeTimeDoctorVisitDone" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>क्या 6 आंगनवाड़ी कार्यकर्ता मौजूद रही |</label>
                                    <Select required value={entryDetail.wereSixAnganwadiWorkerPresent} name="wereSixAnganwadiWorkerPresent" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                    <label className={Styles.labelText}>अमलतास अस्पताल से 2 डॉक्टर उपस्थित है</label>
                                    <Select required value={entryDetail.doctorFromAmaltasAvailable} name="doctorFromAmaltasAvailable" onChange={handleChange} size='small'>
                                        <MenuItem value="हाँ">हाँ</MenuItem>
                                        <MenuItem value="नहीं">नहीं</MenuItem>
                                    </Select>
                                </div>

                                {
                                    entryDetail.inClinicServiceDay === "Day 7"
                                    &&
                                    <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                        <label className={Styles.labelText}>07-दिवस पर MUAC</label>
                                        <TextField required value={entryDetail.seventhDayMUAC} name="seventhDayMUAC" onChange={handleChange} size='small' />
                                    </div>
                                }

                                {
                                    entryDetail.inClinicServiceDay === "Day 14"
                                    &&
                                    <>
                                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                            <label className={Styles.labelText}>अंतिम दिवस पर HB</label>
                                            <TextField required value={entryDetail.lastDayHB} name="lastDayHB" onChange={handleChange} size='small' />
                                        </div>
                                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                            <label className={Styles.labelText}>अंतिम दिवस पर ऊंचाई (Height) In Cm</label>
                                            <TextField required value={entryDetail.lastDayHeight} name="lastDayHeight" onChange={handleChange} size='small' />
                                        </div>
                                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                            <label className={Styles.labelText}>अंतिम दिवस पर वजन</label>
                                            <TextField required value={entryDetail.lastDayWeight} name="lastDayWeight" onChange={handleChange} size='small' />
                                        </div>
                                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                                            <label className={Styles.labelText}>अंतिम दिवस पर MUAC</label>
                                            <TextField required value={entryDetail.lastDayMUAC} name="lastDayMUAC" onChange={handleChange} size='small' />
                                        </div>
                                    </>
                                }
                            </>
                        }

                    </div>

                    <Button disabled={loading} loading={loading} onClick={handleSubmit} type='submit' sx={{ width: '200px' }} variant='contained'>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateInformation