import * as Yup from 'yup';
const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const initialValues = {
  numero_documento: '',
  tipo_documento: '',
  nombre: '',
  apellidos: '',
  universidad: '',
  email: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  celular: '',
  archivo_ponencia: undefined,
  tematica_ponencia: '',
  descripcion_ponencia: '',
  importancia_tema: '',
  motivos_interes: '',
};

const validationSchema = Yup.object().shape({
  numero_documento: Yup.number().required('Campo Obligatorio'),
  telefono: Yup.number().required('Campo Obligatorio'),
  tipo_documento: Yup.string().required('Campo Obligatorio'),
  nombre: Yup.string().required('Campo Obligatorio'),
  apellidos: Yup.string().required('Campo Obligatorio'),
  universidad: Yup.string().required('Campo Obligatorio'),
  direccion: Yup.string().required('Campo Obligatorio'),
  ciudad: Yup.string().required('Campo Obligatorio'),
  celular: Yup.string().required('Campo Obligatorio'),
  email: Yup.string()
    .required('Campo Obligatorio')
    .email('Ingrese un correo válido'),
  tematica_ponencia: Yup.string().required('Campo Obligatorio'),
  descripcion_ponencia: Yup.string()
    .required('Campo Obligatorio')
    .max(300, 'Limite de 300 caracteres'),
  importancia_tema: Yup.string()
    .required('Campo Obligatorio')
    .max(500, 'Limite de 500 caracteres'),
  motivos_interes: Yup.string()
    .required('Campo Obligatorio')
    .max(300, 'Limite de 300 caracteres'),
  archivo_ponencia: Yup.mixed()
    .required('Es requerido el archivo')
    .test(
      'fileSize',
      'Archivo muy grande',
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Formato no soportado',
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export {validationSchema, initialValues, SUPPORTED_FORMATS};