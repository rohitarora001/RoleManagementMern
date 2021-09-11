import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core'
import Link from 'next/link'
import Button from '@material-ui/core/Button';
import { baseUrl } from '../../next.config';
import makeToast from '../../Toaster'
import RegisterUser from './RegisterUser';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    centerPaper: {
        width: '35vw',
        display: "flex",
        flexDirection: "column",
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
    },
    centerForm: {
        height: '80vh',
        display: "flex",
        flexDirection: "column",
        // margin: '5px',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    input: {
        height: "20px",
        marginTop: "20px",
        marginBottom: "35px",
        width: "80%",
    },
    button: {
        height: "20px",
        marginTop: '10px',
        width: "80%"
    },
    heading: {
        marginTop: "0"
    }

}));

const LoginForm = () => {
    const router = useRouter();
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [token, setToken] = useState(token)
    const inputEmail = (e) => {
        setEmail(e.target.value)
    }
    const inputPassword = (e) => {
        setPassword(e.target.value)
    }
    const LoginUser = async () => {
        // console.log(baseUrl)
        try {
            const response = await axios
            .post(`http://${baseUrl}api/auth/signin-user`, {
                email,
                password,
            })
            if (response.data.status == "ok" && response.data.token) {
                const token = response.data.token
                localStorage.setItem("CC_Token", token);
                await router.push('/');
                makeToast("success", 'Logged in successfully');
            }
            else {
                makeToast("error", 'Email or password is invalid');
            }
        }
        
        catch (err) {
            // console.log(err);
            makeToast("error", 'Email or password is invalid');
        };
    }
    useEffect(async () => {
        
        let token = localStorage.getItem("CC_Token", token);
        if (token != null) {
            const LoggedIn = () => {
                router.push('/');
            }
            LoggedIn()
        }

    }, [])


    return (
        <>
            <div style={{
                height: "100%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Paper
                    className={classes.centerPaper}
                >
                    <h2 className={classes.heading}>
                        Login
                    </h2>
                    <TextField id="outlined-basic"
                        label="email"
                        color="primary"
                        className={classes.input}
                        variant="outlined"
                        value={email}
                        onChange={(e) => { inputEmail(e) }} />

                    <TextField id="outlined-basic"
                        label="password"
                        color="primary"
                        className={classes.input}
                        value={password}
                        variant="outlined"
                        onChange={(e) => { inputPassword(e) }} />
                    <div >
                        <RegisterUser />
                    </div>
                    <Button variant="outlined" color="primary" onClick={LoginUser}>
                        Login
                    </Button>
                </Paper>
            </div>

        </>
    )
}

export default LoginForm
