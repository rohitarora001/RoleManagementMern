import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { baseUrl } from '../../../next.config'
import makeToast from '../../../Toaster'
import Checkbox from '@material-ui/core/Checkbox';


const CreateUser = () => {
    const [open, setOpen] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Phone, setPhone] = useState(0);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RoleName, setRoleName] = useState('');
    const [AddCategory, setAddCategory] = useState(false);
    const [DeleteCategory, setDeleteCategory] = useState(false);
    const [EditCategory, setEditCategory] = useState(false);
    const [AddProduct, setAddProduct] = useState(false);
    const [EditProduct, setEditProduct] = useState(false);
    const [DeleteProduct, setDeleteProduct] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const createUser = async () => {
        const data = {
            firstname: FirstName,
            lastname: LastName,
            phone: Phone,
            email: Email,
            password: Password,
            userRole: RoleName,
            canAddCategory: AddCategory,
            canEditCategory: EditCategory,
            canDeleteCategory: DeleteCategory,
            canAddProduct: AddProduct,
            canEditProduct: EditProduct,
            canDeleteProduct: DeleteProduct
        }
        try {
            const token = localStorage.getItem("CC_Token")
            await axios.post(`https://${baseUrl}api/admin/create-user`, data,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res.status == 200) {
                        makeToast('success', 'Successfully Created')
                    }
                })
        }
        catch (error) {
            console.log(error)
            makeToast('error', 'A user is already registered with same email or phone')
        }
    }
    return (
        <div>
            <Button size="small"
                color="primary"
                onClick={handleClickOpen}>
                Create User
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        label="First Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        id="name"
                        label="Last Name"
                        type="name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => {
                            setRoleName(e.target.value)
                        }}
                        id="name"
                        label="Role"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        label="Phone Number"
                        type="phone"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        label="Password"
                        type="text"
                        fullWidth
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div>
                            Permissions :
                        </div>
                        <div>
                            Category :
                            <div style={{
                                display: "flex"
                            }}>
                                <div>
                                    Add :
                                    <Checkbox
                                        checked={AddCategory}
                                        onChange={(e) => {
                                            setAddCategory(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />

                                </div>
                                <div>
                                    Edit :
                                    <Checkbox
                                        checked={EditCategory}
                                        onChange={(e) => {
                                            setEditCategory(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />

                                </div>
                                <div>
                                    Delete :
                                    <Checkbox
                                        checked={DeleteCategory}
                                        onChange={(e) => {
                                            setDeleteCategory(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            Product :
                            <div style={{
                                display: "flex"
                            }}>
                                <div>
                                    Add :
                                    <Checkbox
                                        checked={AddProduct}
                                        onChange={(e) => {
                                            setAddProduct(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />

                                </div>
                                <div>
                                    Edit :
                                    <Checkbox
                                        checked={EditProduct}
                                        onChange={(e) => {
                                            setEditProduct(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />

                                </div>
                                <div>
                                    Delete :
                                    <Checkbox
                                        checked={DeleteProduct}
                                        onChange={(e) => {
                                            setDeleteProduct(e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        createUser()
                        handleClose()
                    }} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateUser
