import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { JWT_SECRET, baseUrl } from '../../next.config'
import jwt from 'jsonwebtoken'
import makeToast from '../../Toaster'
import { useRouter } from 'next/router'

const UpdateProfile = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([])
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    
    const updateProfile = async () => {
        // e.preventDefault()
        const data = {
            firstname: Firstname,
            lastname: Lastname,
            email: Email,
            phone: Phone
        }
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET);
        const id = user.id;
        try {
            await axios
                .patch(`https://${baseUrl}api/users/update-user/${id}`, data,
                { headers: { "Authorization": `Bearer ${token}` } })
                    .then(res=>console.log(res))
            handleClose()
            makeToast("success", "Profile Updated Successfully")
        }
        catch (error) {
            console.log(error)
            makeToast("error", "Profile Update Failed")
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const FirstNameChange = (e) => {
        setFirstname(e.target.value)
    }
    const LastNameChange = (e) => {
        setLastname(e.target.value)
    }
    const PhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const EmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const GetCurrentUser = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/users/me`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setUser(res.data.data)
                // setPicUrl(res.data.data.avatar[0])
            }
            )
    }
    useEffect(() => {
        GetCurrentUser()
    }, [])
    return (
        <div>
            {/* {console.log(user)} */}
            <Button size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                    setEmail(user.email)
                    setFirstname(user.firstname)
                    setLastname(user.lastname)
                    setPhone(user.phone)
                    handleClickOpen()
                }}
            >
                Update Account
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => FirstNameChange(e)}
                        label="First Name"
                        value={Firstname}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => LastNameChange(e)}
                        id="name"
                        value={Lastname}
                        label="Last Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => EmailChange(e)}
                        id="name"
                        value={Email}
                        label="email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => PhoneChange(e)}
                        id="name"
                        value={Phone}
                        label="Phone"
                        type="phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        updateProfile()
                        // router.reload(window.location.pathname)
                        }} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateProfile
