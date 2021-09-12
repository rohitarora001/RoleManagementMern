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
        height: '45vh',
    },
    centerForm: {
        display: "flex",
        flexDirection: "column",
        // margin: '5px',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    input1: {
        height: "20px",
        marginTop: "5px",
        marginBottom: "35px",
        width: "80%",
    },
    input2: {
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
                .post(`https://${baseUrl}api/auth/signin-user`, {
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
    useEffect(() => {

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
                position:"fixed",
                left:"0",
                top:"0",
                bottom:"0",
                backgroundColor: 'rgb(240,242,245)',
                height:"99.9vh",
                width:"100.5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Paper
                    className={classes.centerPaper}
                    style={{
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        background:"rgb(255,255,255)"
                    }}
                >
                    <div>

                        <h2 className={classes.heading}>
                            Login
                        </h2>
                        <TextField id="outlined-basic"
                            label="email"
                            color="primary"
                            className={classes.input1}
                            variant="outlined"
                            value={email}
                            onChange={(e) => { inputEmail(e) }} />

                        <TextField id="outlined-basic"
                            label="password"
                            color="primary"
                            className={classes.input2}
                            value={password}
                            variant="outlined"
                            onChange={(e) => { inputPassword(e) }} />
                        <div style={{
                            marginTop:"5px",
                            marginBottom:"5px",
                        }}>
                            <RegisterUser />
                        </div>
                        <Button variant="outlined" color="primary" onClick={LoginUser}>
                            Login
                        </Button>
                    </div>
                </Paper>
            </div>

        </>
    )
}

export default LoginForm
