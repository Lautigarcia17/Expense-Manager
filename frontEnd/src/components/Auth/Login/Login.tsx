import { useRef } from 'react';
import styles from './Login.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import SendIcon from '@mui/icons-material/Send';

function Login() {
  const form: any = useRef(null);
  const { register, formState: { errors }, reset, handleSubmit } = useForm({
    mode: 'onChange'
  });


  const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            color: 'white',
            backgroundColor: 'transparent',
            width: '300px',
            '&:before': {
              borderBottom: '2px solid #0a9eb1',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #0a9eb1',
            },
            '&:after': {
              borderBottom: '2px solid #0a9eb1',
            },
            ['@media (max-width:450px)']: {
              width: '200px'
            }
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'white',
            fontSize: '25px',
            transform: 'translate(0, 13px) scale(1)',
            '&.Mui-focused': {
              color: 'white',
            },
            '&.MuiInputLabel-shrink': {
              transform: 'translate(0, -10px) scale(0.85)',
            },
            ['@media (max-width:450px)']: {
              fontSize: '20px'
            }
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#F0EBD8',
            fontSize: '30px',
            marginRight: '20px'
          }
        }
      }
    },
  });



  return (
    <>
      <h1 className={styles.titleAuth}>LOGIN</h1>
      <div className={styles.contentCard}>
        <form ref={form} className={styles.form}>
          <ThemeProvider theme={theme}>
            <div className={styles.divInputs}>
              {/* Email Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AlternateEmailIcon />
                  <TextField
                    id="input-with-sx"
                    label="Email"
                    variant="standard"
                    {...register('user_email', {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.user_email ? styles.visible : ''}`}>
                  {errors.user_email?.type === 'required' && 'El mail es requerido'}
                  {errors.user_email?.type === 'pattern' && 'Formato de mail invalido'}
                </p>
              </div>

              {/* Message Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <MarkunreadIcon />
                  <TextField
                    id="filled-multiline-flexible"
                    label="Password"
                    multiline
                    variant="standard"
                    {...register('message', {
                      required: true,
                    })}
                  />
                </Box>
                <p className={`${styles.messageError} ${errors.message?.type === 'required' ? 'visible' : ''}`}>
                  El mensaje es requerido
                </p>
              </div>
            </div>

          </ThemeProvider>
          <Button type='submit' size='large' variant="contained" endIcon={<SendIcon />} sx={{
            backgroundColor: '#0a9eb1',
            color: '#F0EBD8',
  
            '&:hover': {
              backgroundColor: '#268693',
            },
          }}>
            Login
          </Button>
        </form>

      </div>


    </>

  );
};

export default Login