import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { baseUrl } from '../../next.config';
import makeToast from '../../Toaster'
import axios from 'axios'
const DeleteUser = ({ id, getUsers }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteUser = async () => {
        try {
            const token = localStorage.getItem("CC_Token")
            await axios
                .delete(`https://${baseUrl}api/users/delete/${id}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res.status == 200) {
                        makeToast("success", "User updated successfully")
                    }
                    getUsers()
                })
        }
        catch (error) {
            makeToast("error", "Something went wrong")
            return null
        }
    }
    return (
        <>
            <Button
                size="small"
                variant="outlined"
                onClick={handleClickOpen}
            >
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this user?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        console.log(id)
                        handleClose()
                    }
                    } color="primary">
                        Back
                    </Button>
                    <Button color="primary" autoFocus
                        onClick={() => {
                            deleteUser()
                            handleClose()
                        }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteUser
