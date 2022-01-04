import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import React from 'react';
import LandingCardLayout from '../../Shared/Layout/LandingCardLayout';
import comments from '../../../services/mock/comments';
import styles from './CommentCard.module.scss';

function CommentCard() {
  return (
    <LandingCardLayout
      backgroundColor="primary.light"
      title="Nuestros clientes confían en nosotros"
    >
      <Grid container spacing={2} justifyContent="space-between" alignItems="stretch">
        {comments.map(elem => (
          <Grid key={elem.user} item xs={12} sm={6} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent className={styles.comment__text}>
                <Box textAlign="center">
                  <FormatQuoteIcon fontSize="large" color="primary" />
                </Box>
                <Typography variant="subtitle1" fontWeight="light">
                  {elem.content}
                </Typography>
                <Typography textAlign="right" color="text.secondary">
                  -{elem.user}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </LandingCardLayout>
  );
}

export default CommentCard;
