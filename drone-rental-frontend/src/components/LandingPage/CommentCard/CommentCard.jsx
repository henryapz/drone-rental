import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import './CommentCard.scss';

function CommentCard() {
  const comments = [
    {
      id: 1,
      content:
        'Ha cumplido con todas mis expectativas. El servicio fue estupendo. El trabajo final ha quedado con buena resolución y con gran calidad de detalles.',
      user: 'Brayan Vargaz',
    },
    {
      id: 2,
      content:
        'Me ha ayudado a tener unas grandes tomas de los departamentos que alquilo. Mucha gente me conocío gracias a estos videos.',
      user: 'Joaquín García',
    },
  ];
  return (
    <div className="comment">
      <Grid
        container
        alignItems="center"
        spacing={1}
        rowSpacing={1}
        direction="row"
        justifyContent="space-evenly"
      >
        {comments.map(elem => (
          <Grid
            item
            component={Card}
            sm={10}
            md={5}
            key={elem.id}
            className="comment__item"
          >
            <CardContent className="comment__item__content">
              <Typography sx={{ fontSize: 24 }}>{elem.content}</Typography>
              <Typography
                sx={{ fontSize: 14, display: 'flex', justifyContent: 'flex-end' }}
                color="text.secondary"
                gutterBottom
              >
                {elem.user}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CommentCard;
