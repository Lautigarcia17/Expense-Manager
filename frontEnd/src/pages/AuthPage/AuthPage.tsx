import Login from '../../components/Auth/Login/Login'
import styles from './AuthPage.module.css'

function AuthPage() {


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                         <Login /> 
                    </div>
                </div>
            </div>
        </>
    )

};

export default AuthPage