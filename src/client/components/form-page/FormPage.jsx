import React, {useEffect} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import server from '../../server';

export default function FormPage() {
  const {searchPerson} = server;

  useEffect(() => {
    searchPerson('123').then((data) => console.log('data', data));
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Formulario de inscripción de ponentes
      </Typography>
      <Typography variant="h6" gutterBottom>
        Los campos marcados con asteriscos (*) son obligatorios.{' '}
      </Typography>
      <Formik
        initialValues={{
          numeroDocumento: '',
          nombre: '',
          apellidos: '',
          universidad: '',
          email: '',
          direcccion: '',
          telefono: '',
          ciudad: '',
          celular: '',
          tematicaPonencia: '',
          descripcionPonencia: '',
          importanciaTema: '',
          motivosInteres: '',
        }}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);
          console.log('values', values);
          setTimeout(() => setSubmitting(false), 2000);
        }}
        validationSchema={Yup.object().shape({
          nombre: Yup.string().required('Required'),
          apellidos: Yup.string().required('Required'),
          universidad: Yup.string().required('Required'),
        })}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="nombre"
                    label="First name"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.nombre && errors.nombre}
                    error={!!(touched.nombre && errors.nombre)}
                    required
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.apellidos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.apellidos && errors.apellidos}
                    error={!!(touched.apellidos && errors.apellidos)}
                    required
                    id="apellidos"
                    name="apellidos"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={values.numeroDocumento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      touched.numeroDocumento && errors.numeroDocumento
                    }
                    error={
                      !!(touched.numeroDocumento && errors.numeroDocumento)
                    }
                    required
                    id="numeroDocumento"
                    name="numeroDocumento"
                    label="numeroDocumento line "
                    fullWidth
                    autoComplete="billing numeroDocumento-line"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.universidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.universidad && errors.universidad}
                    error={!!(touched.universidad && errors.universidad)}
                    required
                    id="universidad"
                    name="universidad"
                    label="universidad"
                    fullWidth
                    autoComplete="billing numeroDocumento-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={!!(touched.email && errors.email)}
                    id="email"
                    name="email"
                    label="email/Province/Region"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.direcccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.direcccion && errors.direcccion}
                    error={!!(touched.direcccion && errors.direcccion)}
                    required
                    id="direcccion"
                    name="direcccion"
                    label="direcccion / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.telefono && errors.telefono}
                    error={!!(touched.telefono && errors.telefono)}
                    required
                    id="telefono"
                    name="telefono"
                    label="telefono"
                    fullWidth
                    autoComplete="billing telefono"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="savenumeroDocumento"
                        value="yes"
                      />
                    }
                    label="Use this numeroDocumento for payment details"
                  />
                </Grid>
                <Button variant="contained" type="submit" color="primary">
                  Enviar
                </Button>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
