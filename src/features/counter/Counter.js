import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectData,
  selectDataLoading,
  selectAuthor,
  selectAuthorLoading,
  getBooksAsync,
  getAuthorAsync
} from './counterSlice';
import styles from './Counter.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress';

export function Counter() {
  const data = useSelector(selectData);
  const dataLoading = useSelector(selectDataLoading);
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const author = useSelector(selectAuthor);
  const authorLoading = useSelector(selectAuthorLoading);

  useEffect(() => {
    dispatch(getBooksAsync(['test', 1]));
  }, []);

  const toggleDrawer = (open, key) => (event) => {
    if (open) {
      dispatch(getAuthorAsync(key));
    }
    setDrawer(open);
  };

  console.log(author);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Books
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ py: 4 }}>
          {dataLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
            {
              data.map(it => (
                <Grid item xs={3} key={it.key}>
                  <Card sx={{ minWidth: 275, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{flex: 1}}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {it.type}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {it.title.slice(0, 20)}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Author: <Button onClick={toggleDrawer(true, it.author_key[0])}>{it.author_name[0]}</Button>
                      </Typography>
                      <Typography variant="body2">
                        {it.isbn && it.isbn[0]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
            </Grid>
          )}
        </Box>
      </Container>
      <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer(false)}
      >
        {(authorLoading || Object.keys(author).length == 0) ? (
          <Box sx={{ width: 360, p: 3, display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{width: 360, p: 3}}>
            <Typography sx={{pb: 2}} variant="h5">Name: {author.name}</Typography>
            <Typography sx={{pb: 2}}>Key: {author.key}</Typography>
            <Typography sx={{pb: 2}}>Last Modified: {new Date(author.last_modified.value).toUTCString()}</Typography>
            <Typography>Revision: {author.revision}</Typography>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
