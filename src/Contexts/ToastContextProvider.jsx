import { createContext } from "react";
import { Bounce, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    return (
        <ToastContext.Provider value={""}>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </ToastContext.Provider>
    )
}

export default ToastContext;