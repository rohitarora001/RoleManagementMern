import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { baseUrl } from '../../next.config'
import makeToast from '../../Toaster'

const EditCategory = ({ name, description, id , getCategory }) => {
    const [open, setOpen] = useState(false);
    const [Name, setName] = useState(name);
    const [Description, setDescription] = useState(description);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        // console.log(id)
    };
    const DescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const NameChange = (e) => {
        setName(e.target.value)
    }
    const updateCategory = async () => {
        const token = localStorage.getItem("CC_Token")
        const data = {
            name: Name,
            description: Description
        }
        // console.log(data)
        // console.log(id)
        const api = `https://${baseUrl}api/category/update-category/${id}`
        console.log(api)
        const res = await axios
            .patch(api, data,
                { headers: { "Authorization": `Bearer ${token}` } })
        // console.log(res.status)
        handleClose()
        if (res.status == 200) {
            getCategory()
            makeToast("success", "Category successfully updated")
        }
    }
    return (
        <>
            <div
                style={{
                    marginLeft: '5px',
                    marginRight: '2px',
                    cursor:"pointer"
                }}>
                <a
                    onClick={handleClickOpen}>
                    | edit
                </a>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={Name}
                        label="Name"
                        onChange={(e) => NameChange(e)}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={Description}
                        onChange={(e) => DescriptionChange(e)}
                        label="Description"
                        type="name"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCategory} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCategory
