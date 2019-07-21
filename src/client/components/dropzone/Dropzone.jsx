import React, {useState, useEffect, useCallback} from 'react';
import Dropzone from 'react-dropzone';

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
    setFieldValue('archivoPonencia', acceptedFiles[0]);
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
          ) : !values || !values.archivoPonencia ? (
            <p>
              Arrastra y suelta tu archivo aquí, o haz clic para seleccionar un
              archivo
            </p>
          ) : (
            <Thumb file={values.archivoPonencia} />
          )}
        </div>
      )}
    </Dropzone>
  );
}

function Thumb({file}) {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState(undefined);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    let reader = new FileReader();

    reader.onloadend = () => {
      setLoading(false);
      setThumb(reader.result);
    };

    reader.readAsDataURL(file);
  });

  if (!file) return null;

  if (loading) return <p>loading...</p>;

  return (
    <img
      src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200}
    />
  );
}
