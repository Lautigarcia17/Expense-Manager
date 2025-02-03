import { useState } from 'react'
import Login from '../../components/Auth/Login/Login'
import Register from '../../components/Auth/Register/Register'
import styles from './AuthPage.module.css'




function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);

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




/*
import { useState } from 'react'
import Login from '../../components/Auth/Login/Login'
import Register from '../../components/Auth/Register/Register'
import styles from './AuthPage.module.css'
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



function AuthPage() {
    const [showLogin, setShowLogin] = useState(true);
    const [open, setOpen] = useState(false);

    const handleClick = (message: string) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
                <button onClick={() => handleClick('This is a success message')}>Show Alert</button>

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    TransitionProps={{
                        onEnter: () => console.log('Transition started'),
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"  
                        variant="outlined" 
                        sx={{
                            width: '100%',
                            backgroundColor: '#231f20', 
                            borderColor: '#4caf50',  
                            color: '#4caf50',  
                            transition: 'all 0.3s ease',
                            '& .MuiAlert-icon': {
                                color: '#4caf50',  
                            },
                            '& .MuiAlert-action': {
                                marginRight: '8px',  
                            },
                        }}
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        REVIENTA LA BAILANTA
                    </Alert>
                </Snackbar>


            </div>
        </>
    )

};
export default AuthPage
*/