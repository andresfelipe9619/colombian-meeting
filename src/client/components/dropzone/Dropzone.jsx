import React, {useCallback, useState} from 'react';
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
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setLoading(true);
    setFile(acceptedFiles[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setFieldValue('archivo_ponencia', reader.result);
    };
    // TODO: The form needs to receive a file object to validate,
    // and then you can read it as url and send it to the back end as url string
    reader.readAsDataURL(acceptedFiles[0]);
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
            id="archivo_ponencia"
            name="archivo_ponencia"
            {...getInputProps()}
          />

          {error ? (
            <p>{helperText}</p>
          ) : isDragActive ? (
            <p>Arrastra los archivos acá ...</p>
          ) : !file ? (
            <p>
              Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un
              archivo
            </p>
          ) : (
            <Thumb file={file} loading={loading} />
          )}
        </div>
      )}
    </Dropzone>
  );
}
