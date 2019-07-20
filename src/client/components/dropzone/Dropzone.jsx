import React, {useCallback} from 'react';
import Dropzone from 'react-dropzone';

export default function CustomDropzone({
  disabled,
  error,
  accept,
  helperText,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const style = {
    borderStyle: 'dashed',
    borderColor: error ? 'red' : 'black',
  };
  return (
    <Dropzone onDrop={onDrop} accept={accept} disabled={disabled}>
      {({getRootProps, getInputProps, isDragActive}) => (
        <div style={style} {...getRootProps()}>
          <input
            id="archivoPonencia"
            name="archivoPonencia"
            {...getInputProps()}
          />

          {error ? (
            <p>{helperText}</p>
          ) : isDragActive ? (
            <p>Arrastra los archivos acá ...</p>
          ) : (
            <p>
              Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un
              archivo
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
}
