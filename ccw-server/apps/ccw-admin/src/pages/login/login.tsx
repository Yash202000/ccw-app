import React from 'react';
import styles from './login.module.css';
import logo from '../../../assets/login_image.jpg';
import { Grid, TextField, Button } from '@mui/material';

const Logins = () => {
    return(
        <Grid container component="main" className={styles.root}>
      <Grid className={styles.image}>
        {/* Left-side image or background */}
        <img
          src={logo}
          alt="Background"
          style={{ width: '98vh', height: '97vh', objectFit: 'cover' }}
        />
        {/* {/<div style={{backgroundImage: `url(${login_image})`, width:'100%', height: '50px'}}>/} */}
        {/* {/</div>/} */}
      </Grid>
      <Grid className={styles.papers}>
        {/* Right-side login form */}
        <div className={styles.paper}>
          <div className={styles.loginContainer}>
            <div className={styles.signInText}>
              <div className={styles.logo_image}>
                <img
                  src={logo}
                  alt="Background"
                  style={{ width: '150px', height: '190px' }}
                />
              </div>
            </div>
            <form className={styles.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <div className={styles.forgot_pass}>Forgot your password?</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
              >
                Sign In
              </Button>
              <div className={styles.or}>or</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#f5f5f5', color: 'black' }}
                className={styles.submit_google}
              >
              </Button>
            </form>
          </div>
        </div>
      </Grid>
    </Grid>
        
    );
};
export default Logins;