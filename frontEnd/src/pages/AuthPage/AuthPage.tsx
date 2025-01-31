import { useEffect, useState } from 'react'
import Login from '../../components/Auth/Login/Login'
import Register from '../../components/Auth/Register/Register'
import styles from './AuthPage.module.css'

function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

    useEffect( () =>{
        console.log(showLogin);
        
    },[showLogin])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin}/>}
                    </div>
                </div>
            </div>
        </>
    )

};

export default AuthPage