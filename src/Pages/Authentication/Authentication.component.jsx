import { useEffect, useState } from "react";
import Styles from "./Authentication.module.css";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "../../backend/firebaseHandler";
import { useNavigate } from "react-router";

const Authentication = () => {

    const [credentials, setCredentials] = useState({ emailId: "", password: "", loading: true });
    const navigate = useNavigate();

    useEffect(() => {
        const unsubScribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                navigate("/home")
            }
            setCredentials({ ...credentials, loading: false })
        })

        return () => {
            unsubScribe();
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value })
    }


    const handleSubmit = async () => {
        try {
            setCredentials({ ...credentials, loading: true })
            await signInWithEmailAndPassword(firebaseAuth, credentials.emailId, credentials.password)
            navigate("/home")
        } catch (err) {
            toast.warn(err.message)
        } finally {
            setCredentials({ ...credentials, loading: false })
        }

    }

    return (
        <div className={Styles.authenticationContainer}>
            <div className={Styles.navBar}>
                <img className={Styles.logo} src="/logo.png" alt="Kilkari" />
                <img className={Styles.mpLogo} src="/mp_logo.png" alt="Madhya Pradesh" />
            </div>

            <div className={Styles.heroContainer}>
                <div className={Styles.illustrationContainer}>
                    <img className={Styles.illustration} alt="Kilkari" src="/mother.svg" />
                </div>

                <div className={Styles.formContainer}>
                    <form onSubmit={e => e.preventDefault()} className={Styles.loginForm}>
                        <h2 className={Styles.formTitle}>अपने खाते तक पहुँचने के लिए लॉगिन करें।</h2>
                        <p style={{ marginTop: '-12px', opacity: 0.6 }}>अपने ईमेल आईडी और पासवर्ड से लॉगिन करें।</p>
                        <div style={{ marginTop: '3px' }} className={Styles.inputContainer}>
                            <label className={Styles.labelText}>Email Id</label>
                            <TextField required value={credentials.emailId} name="emailId" onChange={handleChange} size='small' inputMode='email' type='email' />
                        </div>

                        <div className={Styles.inputContainer}>
                            <label className={Styles.labelText}>Password</label>
                            <TextField required value={credentials.password} name="password" onChange={handleChange} size='small' type='password' />
                        </div>

                        <Button disabled={credentials.loading} loading={credentials.loading} onClick={handleSubmit} type='submit' sx={{ width: '200px' }} variant='contained'>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Authentication;