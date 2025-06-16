import React, { useEffect, useState } from "react";
import Styles from "./ViewEntries.module.css"
import { onValue, ref } from "firebase/database";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import { Box, CircularProgress, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ViewEntries = () => {

    const [allChildren, setAllChildren] = useState([])
    const [allEntries, setAllEntries] = useState([])
    const [loading, setLoading] = useState([])
    const [currentTab, setCurrentTab] = useState("CHILDREN")

    useEffect(() => {
        let temp = []

        onValue(ref(firebaseDatabase, `ALL_ENROLLMENTS`), (snap) => {
            if (snap.exists()) {
                for (const key in snap.val()) {
                    temp.push(snap.child(key).val())
                }
            }
            setAllChildren(temp.reverse())
            setLoading(false)
        }, { onlyOnce: true })
    }, [])

    const handleCurrentTab = (value) => {
        setCurrentTab(value)


        let temp = []

        if (value === "CHILDREN") {

        }
    }

    return (
        <div className={Styles.viewEntriesContainer}>
            <div className={Styles.messageImageContainer}>
                <img className={Styles.illustration} alt="Kilkari" src="/mother.svg" />
                <img className={Styles.logo} src="/logo.png" alt="Kilkari" />
                <p className={Styles.focusText}>पोषण अभियान</p>
                <p className={Styles.focusSubText}>जिला प्रशासन देवास की एक पहल।</p>
            </div>

            <div className={Styles.navigationTableContainer}>
                <div className={Styles.navigationContainer}>
                    <img className={Styles.mpLogo} src="/mp_logo.png" alt="Kilkari" />
                    <div>
                        <p><strong>Krati</strong></p>
                        <p>Sonkatch</p>
                    </div>
                </div>

                {
                    !(allChildren.length === 0)
                    &&
                    <div className={Styles.tabsContainer}>
                        <p onClick={() => { setCurrentTab("CHILDREN") }} className={currentTab === "CHILDREN" ? Styles.selectedTab : Styles.unSelectedTab}>All Enrollments</p>
                        <p onClick={() => { handleCurrentTab("ENTRIES") }} className={currentTab === "ENTRIES" ? Styles.selectedTab : Styles.unSelectedTab}>Daily Updates</p>
                    </div>
                }

                <div className={Styles.tableContainer}>
                    {
                        loading
                            ?
                            <CircularProgress style={{ margin: "50px auto" }} />
                            :
                            currentTab === "CHILDREN"
                                ?
                                <Box>
                                    <TableContainer>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>#</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>नाम</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>बेङ-नंबर</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>भर्ती होने की दिनांक</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>SAM-नंबर</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>पिता का नाम</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>माता का नाम</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>मोबाइल नंबर</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>कुल प्रविष्टियाँ</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>पिछली प्रविष्टि की तारीख</TableCell>
                                                    <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody style={{ backgroundColor: "white" }}>
                                                {
                                                    allChildren.map((item, index) => {
                                                        return (
                                                            <TableRow key={index.toString()} >
                                                                <TableCell>{(index + 1).toString()}</TableCell>
                                                                <TableCell>{item.name}</TableCell>
                                                                <TableCell>{item.bedNumber}</TableCell>
                                                                <TableCell>{item.admitDate}</TableCell>
                                                                <TableCell>{item.samNumber}</TableCell>
                                                                <TableCell>{item.fatherName}</TableCell>
                                                                <TableCell>{item.motherName}</TableCell>
                                                                <TableCell>{item.phoneNumber}</TableCell>
                                                                <TableCell>{item.numberOfEntries}</TableCell>
                                                                <TableCell>{item.lastEntryDate ? item.lastEntryDate.split(" ")[0] : ""}</TableCell>
                                                                <TableCell><p style={{ fontWeight: 600, fontSize: 16, backgroundColor: "#FDB10D", padding: "3px 15px", borderRadius: "5px", cursor: "pointer", color: "white" }}>Detail</p></TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                                :
                                <Box>
                                    <DailyUpdate allChildren={allChildren} />
                                </Box>
                    }
                </div>
            </div>
        </div>
    )
}


const DailyUpdate = ({ allChildren }) => {
    const [selectedChild, setSelectedChild] = useState("");
    const [allEtries, setAllEntries] = useState([])

    useEffect(() => {
        const dailyEntryRef = ref(firebaseDatabase, `CHILD_WISE_ENTRY/${selectedChild}`);
        const data = [];
        onValue(dailyEntryRef, (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(item => {
                    data.push(item.val());
                })
                setAllEntries([...data.reverse()]);
            }
        }, { onlyOnce: true })
    }, [selectedChild])


    return (
        <div>
            <div className={Styles.inputContainer}>
                <label className={Styles.inputLabel}>बच्चे का नाम</label>
                <Select size='small' sx={{ width: '100%' }} value={selectedChild} onChange={event => setSelectedChild(event.target.value)}>
                    {
                        allChildren.map(item => <MenuItem key={item.uid} value={item.uid}>{item['name']}</MenuItem>)
                    }
                </Select>
            </div>

            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>#</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>प्रविष्टि की तिथि</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>इन क्लिनिक दिन</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>वजन</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>भोजन दिया</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>दूध एवं पाउडर दिया</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>सेनिटाइज़ेशन किया</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>डॉक्टर विजिट की गई</TableCell>
                            <TableCell style={{ fontWeight: 700, color: "#352F6C", backgroundColor: "rgba(1, 1, 1, 0)" }}>07-दिवस पर MUAC</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                        {
                            allEtries.map((item, index) => {
                                console.log(item)
                                return (
                                    <TableRow key={index.toString()} >
                                        <TableCell>{(index + 1).toString()}</TableCell>
                                        <TableCell>{item.entryDate}</TableCell>
                                        <TableCell>{item.inClinicServiceDay}</TableCell>
                                        <TableCell>{item.weight}</TableCell>
                                        <TableCell>{item.wasBabyFed}</TableCell>
                                        <TableCell>{item.wasBabyGivenMilkFormula}</TableCell>
                                        <TableCell>{item.sanitizationDone}</TableCell>
                                        <TableCell>{item.threeTimeDoctorVisitDone}</TableCell>
                                        <TableCell>{item.seventhDayMUAC}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ViewEntries