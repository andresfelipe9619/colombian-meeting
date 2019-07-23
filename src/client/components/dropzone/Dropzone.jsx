import React, {useCallback} from 'react';
import Dropzone from 'react-dropzone';
import Thumb from './Thumb';
export default function CustomDropzone({
  error,
  accept,
  values,
  disabled,
  setFieldValue,
  helperText,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setFieldValue('archivo_ponencia', acceptedFiles[0]);
  }, []);

  const style = {
    borderStyle: 'dashed',
    borderColor: error ? 'red' : 'black',
  };
  console.log('props', {
    error,
    accept,
    values,
    disabled,
    setFieldValue,
    helperText,
  });
  return (
    <Dropzone onDrop={onDrop} accept={accept} disabled={disabled}>
      {({getRootProps, getInputProps, isDragActive}) => (
        <div style={style} {...getRootProps()}>
          <input
            id="archivo_ponencia"
            name="archivo_ponencia"
            {...getInputProps()}
          />

          {error ? (
            <p>{helperText}</p>
          ) : isDragActive ? (
            <p>Arrastra los archivos acá ...</p>
          ) : !values || !values.archivo_ponencia ? (
            <p>
              Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un
              archivo
            </p>
          ) : (
            <Thumb file={values.archivo_ponencia} />
          )}
        </div>
      )}
    </Dropzone>
  );
}
