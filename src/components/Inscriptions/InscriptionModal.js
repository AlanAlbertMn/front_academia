import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InscriptionForm from "./InscriptionForm";

export default function InscriptionModal({next, open, setOpen, form, students, updateForm}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog fullWidth={true} maxWidth='md' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Selecciona el estudiante que deseas inscribir
                </DialogContentText>
                <InscriptionForm form={form} students={students} updateForm={updateForm}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={next} color="primary">
                    Inscribir usuario
                </Button>
            </DialogActions>
        </Dialog>
    );
}