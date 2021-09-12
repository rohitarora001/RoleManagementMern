import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import makeToast from '../../Toaster'

const LogOut = () => {

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const logOutUser = async () => {
        await localStorage.removeItem("CC_Token")
        await router.push('/login')
        makeToast("success","Logged Out Successfully")
    }
    return (
        <div>
            <Button size="small"
                color="primary"
                onClick={handleClickOpen}>
                Logout
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to logout?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    <Button color="primary" autoFocus
                        onClick={logOutUser}>
                        LogOut
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LogOut
