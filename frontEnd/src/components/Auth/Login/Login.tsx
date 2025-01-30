import { useRef, useState } from 'react';
import styles from './Login.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
              borderBottom: '2px solid #60495A',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '2px solid #60495A',
            },
            '&:after': {
              borderBottom: '2px solid #60495A',
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
            fontSize: '22px',
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
            color: '#FAEDCD',
            fontSize: '28px',
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
                    autoComplete='off'
                    {...register('user_email', {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                </Box>
              </div>

              {/* Password Input */}
              <div className={styles.inputs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <LockOutlinedIcon fontSize='small'/>
                  
                  <TextField
                    id="filled-multiline-flexible"
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"} 
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff sx={{ fontSize: "20px" }} /> : <Visibility sx={{ fontSize: "20px" }}/>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register('password', {
                      required: true,
                    })}
                  />
                </Box>
              </div>
            </div>

          </ThemeProvider>
          <Button type='submit' size='large' variant="contained" startIcon={<DoubleArrowIcon />} sx={{
            backgroundColor: '#60495A',
            color: '#F0EBD8',
            fontWeight: 700,
            gap: '10px',
            fontSize: '16px',
            fontFamily: 'Ubuntu',
            '&:hover': {
              backgroundColor: '#755B71',
            },
          }}>
            Log in
          </Button>
          
          <h1 className={styles.textRegister}>Don't have an account? <button>Sign Up</button></h1>
        </form>
      </div>
    </>

  );
};

export default Login