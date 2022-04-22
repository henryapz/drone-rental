import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Input,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDrone,
  uploadDroneImage,
  resetNewDrone,
} from '../../../app/slices/dronesSlice';
import UploadImage from '../../../assets/images/img_ph.svg';

const initialState = {
  model: '',
  brand: '',
  description: '',
  quantity: '',
  pricePerDay: '',
  pricePerWeek: '',
  pricePerMonth: '',
  productImage: '',
  category_id: '',
};

function CreateDron() {
  const fileInput = useRef(null);
  const [inputError, setInputError] = useState({});
  const [numericError, setNumericError] = useState({
    quantity: false,
    pricePerDay: false,
    pricePerWeek: false,
    pricePerMonth: false,
  });
  const [successOnCreate, setSuccessOnCreate] = useState(false);
  const [errorMsg] = useState('Ingrese un valor numerico');
  const [category, setCategory] = useState('');
  const [displayImg, setDisplayImg] = useState(UploadImage);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const categories = useSelector(state => state.categories.data);
  const newDrone = useSelector(state => state.drones.newDrone);
  const dispatch = useDispatch();

  const handleChange = (e, field) => {
    const numericFields = ['quantity', 'pricePerDay', 'pricePerWeek', 'pricePerMonth'];
    let value;
    if (numericFields.includes(field)) {
      const numericVal = Number(e.target.value);
      if (Number.isNaN(numericVal)) {
        setNumericError({ ...numericError, [field]: true });
        return;
      }
      setNumericError({ ...numericError, [field]: false });

      value = numericVal;
    } else {
      value = e.target.value;
    }
    setPayload({ ...payload, [field]: value });
  };

  const handleSelect = e => {
    const { value } = e.target;
    setCategory(value);
    setPayload({ ...payload, category_id: value });
  };

  const handleSubmit = () => {
    const keys = Object.keys(payload);
    const errObj = {};
    keys.forEach(key => {
      if (!payload[key]) {
        errObj[key] = true;
      }
    });
    setInputError(errObj);

    const errors = Object.values(errObj);
    if (!errors.length) {
      dispatch(createDrone(payload));
      setSuccessOnCreate(true);
    }
  };

  const handleImageLoad = e => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(
        uploadDroneImage({ model: payload.model, base64EncodedImage: reader.result }),
      );
    };
    reader.onerror = () => {
      // eslint-disable-next-line no-console
      console.error('AHHHHHHHH!!');
    };
  };

  useEffect(() => {
    if (newDrone.status === 'loading') {
      setIsLoading(true);
    } else if (newDrone.status === 'fulfilled') {
      dispatch(resetNewDrone());
      setPayload(initialState);
      setDisplayImg(UploadImage);
    } else {
      setIsLoading(false);
    }
  }, [newDrone.status, dispatch]);

  useEffect(() => {
    if (newDrone.imageUrl) {
      setDisplayImg(newDrone.imageUrl);
    }
  }, [newDrone.imageUrl]);

  useEffect(() => {
    setPayload({ ...payload, productImage: newDrone.imageId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDrone.imageId]);

  const styles = {
    mainContainer: {
      margin: '2rem 0',
    },
    mainImage: {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    img: {
      width: 'auto',
      height: 'auto',
      cursor: 'pointer',
    },
  };
  return (
    <Container fixed>
      <Grid container spacing={2} style={styles.mainContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={12} margin="3rem 0">
              {isLoading ? (
                <div>...loading</div>
              ) : (
                <img src={displayImg} alt="upload" style={styles.mainImage} />
              )}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item xs={12} style={{ display: 'flex' }} justifyContent="center">
              <FormControl error={!!inputError.productImage}>
                <Input ref={fileInput} type="file" onChange={handleImageLoad} />
                {inputError.productImage && (
                  <FormHelperText>campo requerido</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="h4">Crear Drone</Typography>
            <TextField
              required
              error={!!inputError.model}
              helperText={!!inputError.model && 'campo requerido'}
              id="outlined-basic"
              label="Modelo"
              variant="outlined"
              margin="dense"
              value={payload.model}
              onChange={e => handleChange(e, 'model')}
            />
            <TextField
              required
              error={!!inputError.brand}
              helperText={!!inputError.brand && 'campo requerido'}
              id="outlined-basic"
              label="Marca"
              variant="outlined"
              margin="dense"
              value={payload.brand}
              onChange={e => handleChange(e, 'brand')}
            />
            <TextField
              required
              error={!!inputError.quantity || numericError.quantity}
              helperText={
                (!!inputError.quantity && 'campo requerido') ||
                (numericError.quantity && errorMsg) ||
                '* numerico'
              }
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              margin="dense"
              value={payload.quantity}
              onChange={e => handleChange(e, 'quantity')}
            />
            <FormControl sx={{ marginTop: '0.5rem' }} error={!!inputError.category_id}>
              <InputLabel id="categoria">Categoria</InputLabel>
              <Select labelId="categoría" value={category} onChange={handleSelect}>
                {categories.map(elem => (
                  <MenuItem value={elem.name} key={elem.name}>
                    {elem.name}
                  </MenuItem>
                ))}
              </Select>
              {inputError.category_id && <FormHelperText>campo requerido</FormHelperText>}
            </FormControl>
            <TextField
              required
              error={!!inputError.description}
              helperText={!!inputError.description && 'campo requerido'}
              id="outlined-basic"
              label="Descripción"
              multiline
              rows={4}
              margin="dense"
              value={payload.description}
              onChange={e => handleChange(e, 'description')}
            />
            <Typography variant="h5">Costo</Typography>
            <TextField
              required
              error={!!inputError.pricePerDay || numericError.pricePerDay}
              helperText={
                (!!inputError.pricePerDay && 'campo requerido') ||
                (numericError.pricePerDay && errorMsg) ||
                '* numerico'
              }
              id="outlined-basic"
              label="Diario"
              variant="outlined"
              margin="dense"
              value={payload.pricePerDay}
              onChange={e => handleChange(e, 'pricePerDay')}
            />
            <TextField
              required
              error={!!inputError.pricePerWeek || numericError.pricePerWeek}
              helperText={
                (!!inputError.pricePerWeek && 'campo requerido') ||
                (numericError.pricePerWeek && errorMsg) ||
                '* numerico'
              }
              id="outlined-basic"
              label="Semanal"
              variant="outlined"
              margin="dense"
              fullWidth={false}
              value={payload.pricePerWeek}
              onChange={e => handleChange(e, 'pricePerWeek')}
            />
            <TextField
              required
              error={!!inputError.pricePerMonth || numericError.pricePerMonth}
              helperText={
                (!!inputError.pricePerMonth && 'campo requerido') ||
                (numericError.pricePerMonth && errorMsg) ||
                '* numerico'
              }
              id="outlined-basic"
              label="Mensual"
              variant="outlined"
              margin="dense"
              fullWidth={false}
              value={payload.pricePerMonth}
              onChange={e => handleChange(e, 'pricePerMonth')}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Crear
            </Button>
          </FormControl>
          {successOnCreate && (
            <Snackbar
              open={successOnCreate}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={1000}
              onClose={() => setSuccessOnCreate(false)}
            >
              <Alert severity="success">
                <strong>Drone creado</strong>
              </Alert>
            </Snackbar>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateDron;
