import { useState } from 'react'
import Login from '../../components/Auth/Login/Login'
import Register from '../../components/Auth/Register/Register'
import styles from './AuthPage.module.css'
import Toastr from '../../components/Toastr/Toastr';




function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
            {/* <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin}/>}
                    </div>
                </div>
            </div> */}
            <Toastr  message={'Hola como va'} type='success'></Toastr>
        </>
    )

};

export default AuthPage


