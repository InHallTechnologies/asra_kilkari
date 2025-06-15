import React, { useState } from "react";
import Styles from "./EnrollChild.module.css"
import EnrollmentSample from "../../entities/Enrollment.sample";
import { toast } from "react-toastify";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import { push, ref, set } from "firebase/database";
import moment from "moment";

const EnrollChild = () => {

    const [enrollmentDetail, setEnrollmentDetail] = useState(EnrollmentSample)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!enrollmentDetail.bedNumber) {
            toast.warn("कृपया बेङ-नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitDate) {
            toast.warn("कृपया भर्ती होने की दिनांक दर्ज करें")
            return
        }
        if (!enrollmentDetail.samNumber) {
            toast.warn("कृपया SAM-नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.name) {
            toast.warn("कृपया बच्चे का नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.gender) {
            toast.warn("कृपया लिंग दर्ज करें")
            return
        }
        if (!enrollmentDetail.fatherName) {
            toast.warn("कृपया पिता का नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.motherName) {
            toast.warn("कृपया माता का नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.phoneNumber) {
            toast.warn("कृपया मोबाइल नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.familyMemberAadharNumber) {
            toast.warn("कृपया आधार नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.caste) {
            toast.warn("कृपया जाती दर्ज करें")
            return
        }
        if (!enrollmentDetail.jila) {
            toast.warn("कृपया जिला दर्ज करें")
            return
        }
        if (!enrollmentDetail.tahasil) {
            toast.warn("कृपया तहसील दर्ज करें")
            return
        }
        if (!enrollmentDetail.villageName) {
            toast.warn("कृपया गाँव का नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.address) {
            toast.warn("कृपया पता डिटेल में दर्ज करें")
            return
        }
        if (!enrollmentDetail.anganwadiWorkerName) {
            toast.warn("कृपया आंगनवाड़ी कार्यकर्ता नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.anganwadiWorkerNumber) {
            toast.warn("कृपया आंगनवाड़ी कार्यकर्ता मोबाइल नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.anganwadiSupervisorName) {
            toast.warn("कृपया आंगनवाड़ी सुपरवाईजर नाम दर्ज करें")
            return
        }
        if (!enrollmentDetail.anganwadiSupervisorNumber) {
            toast.warn("कृपया आंगनवाड़ी सुपरवाईजर मोबाइल नंबर दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitTimeSD) {
            toast.warn("कृपया भर्ती होने के समय-SD दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitTimeHeight) {
            toast.warn("कृपया भर्ती होने के समय हाइट दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitTimeWeight) {
            toast.warn("कृपया भर्ती होने के समय वजन दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitTimeHB) {
            toast.warn("कृपया भर्ती होने के समय हिमो ग्लोबिन दर्ज करें")
            return
        }
        if (!enrollmentDetail.admitTimeMUAC) {
            toast.warn("कृपया भर्ती होने के समय-MUAC दर्ज करें")
            return
        }

        setLoading(true)
        enrollmentDetail.enrolledByName = "krati"
        enrollmentDetail.enrolledByUid = "ABC123"
        enrollmentDetail.enrollmentDate = moment().format("DD-MM-YYYY h:mm a")
        enrollmentDetail.uid = push(ref(firebaseDatabase, `ALL_CHILDREN_ENROLLED`)).key
        enrollmentDetail.numberOfEntries = 0
        enrollmentDetail.lastEntryDate = ""
        
        await set(ref(firebaseDatabase, `OPERATOR_WISE_ENROLLMENT/${enrollmentDetail.enrolledByUid}/${enrollmentDetail.uid}`), enrollmentDetail)
        await set(ref(firebaseDatabase, `ALL_ENROLLMENTS/${enrollmentDetail.uid}`), enrollmentDetail)
        toast.success("नया बच्चा नामांकित हुआ")
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEnrollmentDetail({ ...enrollmentDetail, [name]: value })
    }

    return (
        <div className={Styles.enrollChildContainer}>
            <div className={Styles.messageImageContainer}>
                <img className={Styles.illustration} alt="Kilkari" src="/mother.svg" />
                <img className={Styles.logo} src="/logo.png" alt="Kilkari" />
                <p className={Styles.focusText}>पोषण अभियान</p>
                <p className={Styles.focusSubText}>जिला प्रशासन देवास की एक पहल।</p>
            </div>
            <div className={Styles.formHeaderContainer}>
                <div className={Styles.navigationContainer}>
                    <img className={Styles.mpLogo} src="/mp_logo.png" alt="Madhya Pradesh" />
                    <div className={Styles.nameLocationContainer}>
                        <p>Krati</p>
                        <p>Sonkatch</p>
                    </div>
                </div>

                <div className={Styles.formTitleContainer}>
                    <p className={Styles.formTitle}>कृपया नए बच्चे का नामांकन करने के लिए नीचे दिए गए विवरण भरें।</p>

                    <div className={Styles.formContainer}>
                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>बेङ-नंबर</label>
                            <TextField required value={enrollmentDetail.bedNumber} name="bedNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने की दिनांक</label>
                            <TextField required value={enrollmentDetail.admitDate} name="admitDate" onChange={handleChange} size='small' type="date" />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>SAM-नंबर</label>
                            <TextField required value={enrollmentDetail.samNumber} name="samNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>बच्चे का नाम</label>
                            <TextField required value={enrollmentDetail.name} name="name" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>लिंग</label>
                            <Select required value={enrollmentDetail.gender} name="gender" onChange={handleChange} size='small'>
                                <MenuItem value="पुरुष">पुरुष</MenuItem>
                                <MenuItem value="महिला">महिला</MenuItem>
                            </Select>
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>पिता का नाम</label>
                            <TextField required value={enrollmentDetail.fatherName} name="fatherName" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>माता का नाम</label>
                            <TextField required value={enrollmentDetail.motherName} name="motherName" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>मोबाइल नंबर</label>
                            <TextField required value={enrollmentDetail.phoneNumber} name="phoneNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>परिवार में से किसी एक व्यक्ति का आधार नंबर</label>
                            <TextField required value={enrollmentDetail.familyMemberAadharNumber} name="familyMemberAadharNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>जाती</label>
                            <Select required value={enrollmentDetail.caste} name="caste" onChange={handleChange} size='small'>
                                <MenuItem value="सामान्य-वर्ग">सामान्य-वर्ग</MenuItem>
                                <MenuItem value="पिछड़ा-वर्ग">पिछड़ा-वर्ग</MenuItem>
                                <MenuItem value="अनुसूचित-जाति">अनुसूचित-जाति</MenuItem>
                                <MenuItem value="अनुसूचित-जनजाति">अनुसूचित-जनजाति</MenuItem>
                            </Select>
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>जिला</label>
                            <Select required value={enrollmentDetail.jila} name="jila" onChange={handleChange} size='small'>
                                <MenuItem value="देवास">देवास</MenuItem>
                            </Select>
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>तहसील</label>
                            <Select required value={enrollmentDetail.tahasil} name="tahasil" onChange={handleChange} size='small'>
                                <MenuItem value="सोनकच्छ">सोनकच्छ</MenuItem>
                            </Select>
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>गाँव का नाम</label>
                            <TextField required value={enrollmentDetail.villageName} name="villageName" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px', gridColumn:"2/4" }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>पता डिटेल में</label>
                            <TextField required value={enrollmentDetail.address} name="address" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>आंगनवाड़ी कार्यकर्ता नाम</label>
                            <TextField required value={enrollmentDetail.anganwadiWorkerName} name="anganwadiWorkerName" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>आंगनवाड़ी कार्यकर्ता मोबाइल नंबर</label>
                            <TextField required value={enrollmentDetail.anganwadiWorkerNumber} name="anganwadiWorkerNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>आंगनवाड़ी सुपरवाईजर नाम</label>
                            <TextField required value={enrollmentDetail.anganwadiSupervisorName} name="anganwadiSupervisorName" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>आंगनवाड़ी सुपरवाईजर मोबाइल नंबर</label>
                            <TextField required value={enrollmentDetail.anganwadiSupervisorNumber} name="anganwadiSupervisorNumber" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने के समय-SD</label>
                            <TextField required value={enrollmentDetail.admitTimeSD} name="admitTimeSD" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने के समय हाइट</label>
                            <TextField required value={enrollmentDetail.admitTimeHeight} name="admitTimeHeight" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने के समय वजन</label>
                            <TextField required value={enrollmentDetail.admitTimeWeight} name="admitTimeWeight" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने के समय हिमो ग्लोबिन</label>
                            <TextField required value={enrollmentDetail.admitTimeHB} name="admitTimeHB" onChange={handleChange} size='small' />
                        </div>

                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>भर्ती होने के समय-MUAC</label>
                            <TextField required value={enrollmentDetail.admitTimeMUAC} name="admitTimeMUAC" onChange={handleChange} size='small' />
                        </div>
                    </div>

                    <Button disabled={loading} onClick={handleSubmit} type='submit' sx={{ width: '200px' }} variant='contained'>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default EnrollChild