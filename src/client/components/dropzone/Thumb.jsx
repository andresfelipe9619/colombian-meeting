import React from 'react';
import Icon from '@material-ui/core/Icon';

export default function Thumb({file, loading}) {
  if (!file) return null;
  if (loading) return <p>Cargando Archivo...</p>;
  return (
    <>
      <Icon>description</Icon>
      <p>
        <strong>Nombre: </strong> {file.name}
      </p>
      <p>
        <strong>Tamaño: </strong> {file.size}
      </p>
    </>
  );
}
