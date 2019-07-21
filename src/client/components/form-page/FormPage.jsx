import React, {useEffect, useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Dropzone from '../dropzone/Dropzone';
import {Formik} from 'formik';
import server from '../../server';
import useStyles from './styles';
import {
  SUPPORTED_FORMATS,
  validationSchema,
  initialValues,
} from './form-settings';
export default function FormPage() {
  const classes = useStyles();
  const {searchPerson} = server;

  const onSubmit = useCallback((values, {setSubmitting}) => {
    setSubmitting(true);
    console.log('SUBMIT VALUES', values);
    setTimeout(() => setSubmitting(false), 2000);
  }, []);

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
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          } = formikProps;
          return (
            <Paper className={classes.paper}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <InputLabel htmlFor="tipoDocumento">
                        Tipo de documento
                      </InputLabel>
                      <Select
                        value={values.tipoDocumento}
                        required
                        fullWidth
                        className={{
                          root: classes.root,
                          select: classes.select,
                        }}
                        onChange={handleChange}
                        inputProps={{
                          name: 'tipoDocumento',
                          id: 'tipoDocumento',
                        }}
                      >
                        <MenuItem fullWidth value={'cc'}>
                          C.C
                        </MenuItem>
                        <MenuItem fullWidth value={'ti'}>
                          T.I
                        </MenuItem>
                        <MenuItem fullWidth value={'ext'}>
                          Extranjero
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      label="Número de Identificación"
                      fullWidth
                      autoComplete="billing numeroDocumento-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="nombre"
                      label="Nombre"
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
                      label="Apellidos"
                      fullWidth
                      autoComplete="lname"
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
                      label="Universidad"
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
                      label="Email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.direccion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.direccion && errors.direccion}
                      error={!!(touched.direccion && errors.direccion)}
                      required
                      id="direccion"
                      name="direccion"
                      label="Dirección"
                      fullWidth
                      autoComplete="billing address"
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
                      type="number"
                      id="telefono"
                      name="telefono"
                      label="Teléfono"
                      fullWidth
                      autoComplete="billing telefono"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.ciudad}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.ciudad && errors.ciudad}
                      error={!!(touched.ciudad && errors.ciudad)}
                      required
                      id="ciudad"
                      name="ciudad"
                      label="Ciudad"
                      fullWidth
                      autoComplete="billing ciudad"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.celular}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.celular && errors.celular}
                      error={!!(touched.celular && errors.celular)}
                      type="number"
                      id="celular"
                      name="celular"
                      label="Celular"
                      fullWidth
                      autoComplete="billing celular"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <InputLabel htmlFor="tematicaPonencia">
                        Línea temática de ponencia
                      </InputLabel>
                      <Select
                        required
                        fullWidth
                        className={{
                          root: classes.root,
                          select: classes.select,
                        }}
                        value={values.tematicaPonencia}
                        onChange={handleChange}
                        inputProps={{
                          name: 'tematicaPonencia',
                          id: 'tematicaPonencia',
                        }}
                      >
                        <MenuItem value={10}>Gestión Cultural</MenuItem>
                        <MenuItem value={20}>Ingeniería</MenuItem>
                        <MenuItem value={30}>Otros</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.descripcionPonencia}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.descripcionPonencia &&
                        errors.descripcionPonencia
                      }
                      error={
                        !!(
                          touched.descripcionPonencia &&
                          errors.descripcionPonencia
                        )
                      }
                      multiline
                      rows="4"
                      required
                      id="descripcionPonencia"
                      name="descripcionPonencia"
                      label="Descripción general de la ponencia: Redactar en máximo 300 palabras"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.importanciaTema}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.importanciaTema && errors.importanciaTema
                      }
                      error={
                        !!(touched.importanciaTema && errors.importanciaTema)
                      }
                      multiline
                      required
                      rows="4"
                      id="importanciaTema"
                      name="importanciaTema"
                      label="Importancia del tema para la institución: Redactar en máximo 500 caracteres"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.motivosInteres}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        touched.motivosInteres && errors.motivosInteres
                      }
                      error={
                        !!(touched.motivosInteres && errors.motivosInteres)
                      }
                      required
                      multiline
                      rows="4"
                      id="motivosInteres"
                      name="motivosInteres"
                      label="Motivos de interés para otras instituciones de educación superior: Redactar en máximo 300 caracteres"
                      fullWidth
                    />
                  </Grid>
                  <Divider variant="middle" />
                  <Grid container item xs={12}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="archivoPonencia">
                        Archivo Word a subir debe cargarse como Documentos WORD
                        2007 y seguir las especificaciones técnicas que se
                        indican en la pestaña de descargas
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Dropzone
                        values={values}
                        accept={SUPPORTED_FORMATS}
                        setFieldValue={setFieldValue}
                        error={
                          !!(touched.archivoPonencia && errors.archivoPonencia)
                        }
                        helperText={
                          touched.archivoPonencia && errors.archivoPonencia
                        }
                      />
                    </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      El Comité organizador seleccionará las ponencias que se
                      presentarán en el IV Encuentro Colombiano de Gestíon
                      Universitaria. Dentri de los criterios de la aprobación
                      están: La pertinencia del tema, la relación con las líneas
                      temáticas, la importancia e interés para las Instituciones
                      de Educación Superior; también se valorarán las buenas
                      prácticas y casos de éxito para el mejoramiento de la
                      gestión universitaria.
                    </Typography>
                    <Button
                      className={classes.button}
                      variant="contained"
                      type="submit"
                      color="primary"
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          );
        }}
      </Formik>
    </div>
  );
}
