import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import { MovieList } from '..';
import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const page = 1;

  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacong={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box morginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;

