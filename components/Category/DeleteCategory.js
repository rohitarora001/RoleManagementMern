import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { baseUrl } from '../../next.config';
import makeToast from '../../Toaster'
import axios from 'axios'
const DeleteCategory = ({ id }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteCategory = async () => {
        try {
            const token = localStorage.getItem("CC_Token")
            await axios
                .delete(`http://${baseUrl}api/category/delete-category/${id}`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if(res.data.status == "error")
                    {
                        makeToast("warning","You are not authorized because this category is not created by you")
                    }
                    else {
                        handleClose()
                        makeToast("success", "Category successfully deleted")
                    }
                })
        }
        catch (error) {
            makeToast("error", error)
        }
    }
    return (
        <>
            <div style={{
                marginLeft: '2px',
                marginRight: '2px',
                cursor: "pointer"
            }}>

                <a onClick={handleClickOpen}>
                    delete
                </a>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this category?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    <Button color="primary" autoFocus
                        onClick={deleteCategory}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteCategory
