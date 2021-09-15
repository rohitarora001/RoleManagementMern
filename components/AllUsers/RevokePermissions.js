import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import { baseUrl, JWT_SECRET } from '../../next.config'
import makeToast from '../../Toaster'
import Checkbox from '@material-ui/core/Checkbox';
import jwt from 'jsonwebtoken'


const RevokePermissions = ({ getUsers, id, CatEdit, CatAdd, CatDelete, ProdEdit, ProdAdd, ProdDelete }) => {
    const [open, setOpen] = useState(false);
    const [AddCategory, setAddCategory] = useState(false);
    const [DeleteCategory, setDeleteCategory] = useState(false);
    const [EditCategory, setEditCategory] = useState(false);
    const [AddProduct, setAddProduct] = useState(false);
    const [EditProduct, setEditProduct] = useState(false);
    const [DeleteProduct, setDeleteProduct] = useState(false);
    const handleClickOpen = () => {
        setAddCategory(CatAdd)
        setEditCategory(CatEdit)
        setDeleteCategory(CatDelete)
        setAddProduct(ProdAdd)
        setEditProduct(ProdEdit)
        setDeleteProduct(ProdDelete)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const revoke = async () => {
        const data = {
            canAddCategory: AddCategory,
            canEditCategory: EditCategory,
            canDeleteCategory: DeleteCategory,
            canAddProduct: AddProduct,
            canEditProduct: EditProduct,
            canDeleteProduct: DeleteProduct
        }
        // console.log(data)
        const token = localStorage.getItem("CC_Token")
        try {
            await axios
                .patch(`https://${baseUrl}api/admin/permissions/${id}`, data,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then(res => console.log(res))
            handleClose()
            makeToast("success", "Permissions Revoked")
        }
        catch (error) {
            makeToast("error", "Something wemt wrong")
        }
        finally{
            getUsers()
        }
    }
    return (
        <div>
            <Button
                color="primary"
                autoFocus
                onClick={handleClickOpen}
            >
                Revoke Permissions
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Revoke Permissions</DialogTitle>
                <DialogContent>
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
                        revoke()
                        handleClose()
                    }} color="primary">
                        Revoke
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RevokePermissions
