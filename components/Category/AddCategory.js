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

const AddCategory = () => {
    const [Description, setDescription] = useState(false);
    const [Name, setName] = useState('');
    const [open, setOpen] = useState('');
    const AddCat = async () => {
        const token = localStorage.getItem("CC_Token")
        const data = {
            name: Name,
            description: Description,
        }
        try{
            await axios
                .post(`http://${baseUrl}api/category/create`, data,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) =>{
                    // console.log(res.message)
                    if(res.status == 200 )
                    {
                        makeToast("success","The category added successfully")
                    }
                    
                })
        }
        catch(error){
            if(error.message.includes("409"))
            {
                makeToast("error","The category with same name already exists")
            }
            else {
                makeToast("error","Something went wrong")
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
        <>
            <Button size="small"
                variant="outlined"
                color="secondary"
                style={{
                    marginLeft: "5px",
                    marginRight: "5px"
                }}
                onClick={handleClickOpen}
            >
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => setDescription(e.target.value)}
                        id="name"
                        label="Description"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        AddCat()
                        handleClose()
                    }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCategory
