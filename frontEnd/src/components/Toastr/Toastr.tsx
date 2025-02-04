
import { Snackbar, Alert, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Fade from '@mui/material/Fade';
function Toastr( {message, type} : {message : string, type:string}) {
    const [state, setState] = useState<any>({
        open: false,
        Transition: Fade,
    });

    const handleClick = (Transition: any) => {
        setState({
            open: true,
            Transition
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    const slideTransition = (props: any) => {
        return <Slide {...props} direction="up" />;
    }

    return (
        <>
            <button onClick={() => handleClick(slideTransition)}>Show Alert</button>

            <Snackbar
                open={state.open}
                autoHideDuration={300000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                TransitionComponent={state.Transition}
               
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        backgroundColor: '#191d20',
                        borderColor: '#cce8cd',
                        color: '#cce8cd',
                        fontFamily: 'Ubuntu',
                        fontSize: '18px',
                        padding: "10px ",
                        display: 'flex', alignItems: 'center'
                    }}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon sx={{color: 'white', fontWeight: 700, marginRight: '6px'}}  fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Toastr