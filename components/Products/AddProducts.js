import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
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

const AddProducts = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [Category, setCategory] = useState([])
    const [CategoryId, setCategoryId] = useState('')
    const [Description, setDescription] = useState('')
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const addCategory = async () => {
        Getcategory()
        const Data = {
            description: Description,
            name: Name,
            price: Price,
            category: CategoryId,
        }
        const token = localStorage.getItem("CC_Token")
        try{
            await axios
            .post(`https://${baseUrl}api/products/create`,
            Data,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((res)=>{
                if(res.data.status == "ok")
                {
                    makeToast("success","Product added successfully")
                    // getProducts()
                }
                    })
                }
                catch(error)
        {
            console.log(error)
            if(error.message.includes("400"))
            {
                makeToast("warning","Atleast name should be there")
            }
        }
        finally{
            setCategoryId('')
            setPrice(0)
            setDescription('')
            setName('')
        }
    }
    const Getcategory = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
        .get(`https://${baseUrl}api/category/`,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((res) => setCategory(res.data))
    }
    useEffect(()=>{
        Getcategory()
    },[])
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
                Add Products
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        label="Description"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        // value={}
                        label="Price"
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        type="number"
                        fullWidth
                    />
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Select Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        displayEmpty
                        // value={cat._id}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setCategoryId(e.target.value)
                        }}
                        className={classes.selectEmpty}
                    >
                        {
                            Category.map((cat, index) => {
                                return (
                                    <MenuItem value={cat._id} key={index}>{cat.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        addCategory()
                        handleClose()
                    }} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddProducts
