import * as Yup from 'yup';
const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const initialValues = {
  numeroDocumento: '',
  tipoDocumento: '',
  nombre: '',
  apellidos: '',
  universidad: '',
  email: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  celular: '',
  archivoPonencia: undefined,
  tematicaPonencia: '',
  descripcionPonencia: '',
  importanciaTema: '',
  motivosInteres: '',
};

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Campo Obligatorio'),
  apellidos: Yup.string().required('Campo Obligatorio'),
  universidad: Yup.string().required('Campo Obligatorio'),
  email: Yup.string()
    .required('Campo Obligatorio')
    .email('Ingrese un correo válido'),
  tematicaPonencia: Yup.string().required('Campo Obligatorio'),
  descripcionPonencia: Yup.string()
    .required('Campo Obligatorio')
    .max(300, 'Limite de 300 caracteres'),
  importanciaTema: Yup.string()
    .required('Campo Obligatorio')
    .max(500, 'Limite de 500 caracteres'),
  motivosInteres: Yup.string()
    .required('Campo Obligatorio')
    .max(300, 'Limite de 300 caracteres'),
  archivoPonencia: Yup.mixed()
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
