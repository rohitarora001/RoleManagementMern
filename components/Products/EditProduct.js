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

const EditProduct = ({ id, name, description,price,getProducts }) => {
    const [open, setOpen] = useState(false);
    const [Name, setName] = useState(name);
    const [Price, setPrice] = useState(price);
    const [Description, setDescription] = useState(description);
    const handleClose = () => {
        setOpen(false);
        // console.log(id)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const DescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const NameChange = (e) => {
        setName(e.target.value)
    }
    const PriceChange = (e) => {
        setPrice(e.target.value)
    }
    const updateProduct = async () => {
        const token = localStorage.getItem("CC_Token")
        const data = {
            name: Name,
            description: Description,
            price: Price
        }
        try{
            const res = await axios
                .post(`https://${baseUrl}api/products/update/${id}`, data,
                    { headers: { "Authorization": `Bearer ${token}` } })
            // console.log(res.data.status)
            handleClose()
            if (res.data.status == "ok") {
                getProducts()
                makeToast("success", "Product successfully updated")
            }
        }
        catch(err)
        {
            makeToast("error", "Something went wrong")
        }
    }
    return (
        <>
            <Button size="small"
                variant="outlined"
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Product </DialogTitle>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={Price}
                        onChange={(e) => PriceChange(e)}
                        label="Price"
                        type="number"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateProduct} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditProduct
