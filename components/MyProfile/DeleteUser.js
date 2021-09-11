import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken'
import { baseUrl, JWT_SECRET } from '../../next.config';
import makeToast from '../../Toaster'
import axios from 'axios'

const DeleteUser = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccount = async () => {
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET);
        const id = user.id;
        try {
            await axios
                .delete(`http://${baseUrl}api/users/delete-user/${id}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
            makeToast("Success", "User Deleted")
            localStorage.removeItem("CC_Token")
            router.push('/login')
            handleClose()
        }
        catch (error) {
            handleClose()
            makeToast("error", "Something went wrong")
            throw error
            // console.log(error)
        }

    }
    return (
        <div>
            <Button size="small"
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}>
                Delete Account
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to delete your account?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    <Button color="primary" autoFocus
                        onClick={deleteAccount}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteUser
