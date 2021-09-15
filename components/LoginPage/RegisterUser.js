import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
import { baseUrl } from '../../next.config'
import makeToast from '../../Toaster'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const RegisterUser = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState('');
    const [Phone, setPhone] = useState(null);
    const [Role, setRole] = useState(0);

    const register = async () => {
        //Only for indian numbers only
        if (!/^\S+@\S+\.\S+$/.test(Email) || Email == null) {
            return makeToast('warning', 'Invalid email address')
        }
        else if (!/^[6-9]\d{9}$/.test(Phone) || Phone == null) {
            return makeToast('warning', 'Invalid Phone Number')
        }
        else {
            const Data = {
                firstname: FirstName,
                lastname: LastName,
                phone: Phone,
                email: Email,
                password: Password,
                role: Role,
            }
            try {
                await axios.post(`https://${baseUrl}api/auth/register-user`, Data,)
                    .then((res) => {
                        if (res.status == 200) {
                            makeToast('success', 'Successfully Registered')
                        }
                    })
            }
            catch (error) {
                makeToast('error', 'A user is already registered with same email or phone')
            }
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <a onClick={handleClickOpen}
                style={{
                    cursor: "pointer",
                    color: "blue"
                }}>Register user
            </a>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        label="First Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        label="Last Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        label="Phone Number"
                        type="phone"
                        fullWidth
                    />
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Role
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={Role}
                        displayEmpty
                        className={classes.selectEmpty}
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Owner</MenuItem>
                        <MenuItem value={2}>Admin</MenuItem>
                        <MenuItem value={3}>User</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        id="name"
                        label="Password"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        register()
                        handleClose()
                    }} color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegisterUser
