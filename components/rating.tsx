import { Rating } from '@mui/material';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

function CustomizedRating({ val, mt, tamanho }) {
  return (
    <Rating
      sx={{ position: 'relative', top: mt }}
      size={tamanho}
      name="text-feedback"
      defaultValue={val}
      readOnly
      precision={0.5}
      emptyIcon={<AiFillStar style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
  )
}

export default React.memo(CustomizedRating);