import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openLogInModal } from '../../../app/slices/userSlice';

function LoginModal() {
  const open = useSelector(state => state.user.openLoginModal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(openLogInModal(false));
    navigate('/iniciar-sesion');
  };

  const handleCancel = () => {
    dispatch(openLogInModal(false));
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Para realizar el alquiler debe iniciar sesión.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleLogin} color="primary">
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginModal;
