import React, { useState } from 'react'
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


const ChangePassword = () => {
    const [open, setOpen] = useState(false);
    const [CurrentPassword, setCurrentPassword] = useState(false);
    const [NewPassword, setNewPassword] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const CPassword = (e) => {
        setCurrentPassword(e.target.value)
    }
    const NPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const changePassword = async () => {
        const data = {
            current_password: CurrentPassword,
            new_password: NewPassword,
        }
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET);
        const id = user.id;
        try {
            await axios
                .post(`https://${baseUrl}api/users/change-password/${id}`, data,
                    { headers: { "Authorization": `Bearer ${token}` } })
            makeToast("success", "Password Successfully Changed")
        }
        catch(error)
        {
                makeToast("error","Current password is not correct")
        }
           
    }

return (
    <div>
        <Button size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClickOpen}>
            Change Password
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    onChange={(e) => CPassword(e)}
                    label="Current Password"
                    type="email"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    onChange={(e) => NPassword(e)}
                    id="name"
                    label="New Password"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={()=>{
                    changePassword()
                    handleClose()
                }} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    </div>
)
}

export default ChangePassword
