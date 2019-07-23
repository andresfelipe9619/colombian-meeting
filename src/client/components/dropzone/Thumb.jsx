import React, {useState, useEffect} from 'react';
import Icon from '@material-ui/core/Icon';

export default function Thumb({file}) {
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
  }, [file]);

  console.log('THUMB', {loading, thumb, file});

  if (!file) return null;

  if (loading) return <p>loading...</p>;

  return (
    <>
      <Icon>description</Icon>
      <p>Nombre: {file.name}</p>
      <p>Tamaño: {file.size}</p>
    </>
  );
}
