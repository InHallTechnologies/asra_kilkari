import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth, firebaseDatabase } from "../backend/firebaseHandler"
import { useContext, useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";
import UserContext from "../Contexts/UserData.context";
import { get, ref } from "firebase/database";



const CheckAuthBox = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState({ status: false, loading: true });
    const [_, setUserData] = useContext(UserContext);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            if (user) {
                const userRef = ref(firebaseDatabase, `/USER_ARCHIVE/${user.uid}`);
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                    setUserData(userSnapshot.val());
                    setIsLoggedIn({ status: true, loading: false })
                }
            } else {
                setIsLoggedIn({ status: false, loading: false })
            }
        })

        return () => {
            unSubscribe();
        }
    }, [])

    if (isLoggedIn.loading) {
        return (
            <div style={{ width: '100dvw', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default CheckAuthBox;