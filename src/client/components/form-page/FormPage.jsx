import React, {useEffect, useCallback, useState} from 'react';
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
import LinearProgress from '@material-ui/core/LinearProgress';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const {searchPerson, registerPerson, createPonenciaFile} = server;

  const onSubmit = useCallback(async (values, {setSubmitting}) => {
    const {archivo_ponencia, ...formData} = values;
    setSubmitting(true);
    console.log('SUBMIT VALUES', values);
    try {
      // await createPonenciaFile(archivo_ponencia);
      setIsLoading(true);
      await registerPerson(JSON.stringify(formData));
      setIsSuccess(true);
    } catch (error) {
      setError(error);
      console.error('Error trying to sumbit form:', error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
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
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="tipo_documento">
                        Tipo de documento
                      </InputLabel>
                      <Select
                        value={values.tipo_documento}
                        required
                        fullWidth
                        className={{
                          root: classes.root,
                          select: classes.select,
                        }}
                        onChange={handleChange}
                        disabled={isLoading || error}
                        inputProps={{
                          name: 'tipo_documento',
                          id: 'tipo_documento',
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
                      value={values.numero_documento}
                      onChange={handleChange}
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={
                        touched.numero_documento && errors.numero_documento
                      }
                      error={
                        !!(touched.numero_documento && errors.numero_documento)
                      }
                      required
                      type="number"
                      id="numero_documento"
                      name="numero_documento"
                      label="Número de Identificación"
                      fullWidth
                      autoComplete="billing numero_documento-line"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="nombre"
                      label="Nombre"
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      disabled={isLoading || error}
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
                      disabled={isLoading || error}
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
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={touched.universidad && errors.universidad}
                      error={!!(touched.universidad && errors.universidad)}
                      required
                      id="universidad"
                      name="universidad"
                      label="Universidad"
                      fullWidth
                      autoComplete="billing numero_documento-level2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.email}
                      onChange={handleChange}
                      disabled={isLoading || error}
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
                      disabled={isLoading || error}
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
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={touched.telefono && errors.telefono}
                      error={!!(touched.telefono && errors.telefono)}
                      required
                      type="tel"
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
                      disabled={isLoading || error}
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
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={touched.celular && errors.celular}
                      error={!!(touched.celular && errors.celular)}
                      id="celular"
                      name="celular"
                      label="Celular"
                      type="tel"
                      fullWidth
                      autoComplete="billing celular"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="tematica_ponencia">
                        Línea temática de ponencia
                      </InputLabel>
                      <Select
                        required
                        fullWidth
                        className={{
                          root: classes.root,
                          select: classes.select,
                        }}
                        value={values.tematica_ponencia}
                        onChange={handleChange}
                        disabled={isLoading || error}
                        inputProps={{
                          name: 'tematica_ponencia',
                          id: 'tematica_ponencia',
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
                      value={values.descripcion_ponencia}
                      onChange={handleChange}
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={
                        touched.descripcion_ponencia &&
                        errors.descripcion_ponencia
                      }
                      error={
                        !!(
                          touched.descripcion_ponencia &&
                          errors.descripcion_ponencia
                        )
                      }
                      multiline
                      rows="4"
                      required
                      id="descripcion_ponencia"
                      name="descripcion_ponencia"
                      label="Descripción general de la ponencia: Redactar en máximo 300 palabras"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.importancia_tema}
                      onChange={handleChange}
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={
                        touched.importancia_tema && errors.importancia_tema
                      }
                      error={
                        !!(touched.importancia_tema && errors.importancia_tema)
                      }
                      multiline
                      required
                      rows="4"
                      id="importancia_tema"
                      name="importancia_tema"
                      label="Importancia del tema para la institución: Redactar en máximo 500 caracteres"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={values.motivos_interes}
                      onChange={handleChange}
                      disabled={isLoading || error}
                      onBlur={handleBlur}
                      helperText={
                        touched.motivos_interes && errors.motivos_interes
                      }
                      error={
                        !!(touched.motivos_interes && errors.motivos_interes)
                      }
                      required
                      multiline
                      rows="4"
                      id="motivos_interes"
                      name="motivos_interes"
                      label="Motivos de interés para otras instituciones de educación superior: Redactar en máximo 300 caracteres"
                      fullWidth
                    />
                  </Grid>
                  <Divider variant="middle" />
                  <Grid container item xs={12}>
                    <Grid item xs={12}>
                      <InputLabel htmlFor="archivo_ponencia">
                        Archivo Word a subir debe cargarse como Documentos WORD
                        2007 y seguir las especificaciones técnicas que se
                        indican en la pestaña de descargas
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6}>
                      <Dropzone
                        disabled={isLoading || error}
                        setFieldValue={setFieldValue}
                        values={values}
                        accept={SUPPORTED_FORMATS}
                        error={
                          !!(
                            touched.archivo_ponencia && errors.archivo_ponencia
                          )
                        }
                        helperText={
                          touched.archivo_ponencia && errors.archivo_ponencia
                        }
                      />
                    </Grid>
                  </Grid>
                  <Divider variant="middle" />
                  <Grid item xs={12}>
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
                    {isSuccess && (
                      <Typography variant="h4">
                        Formulario Enviado Satisfactoriamente
                      </Typography>
                    )}
                    {isLoading && <LinearProgress />}
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
