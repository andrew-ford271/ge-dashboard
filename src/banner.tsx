import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Banner(props) {
  const { setValue } = props;
  const [state, setState] = React.useState({
    loading: true,
    data: [] as any[],
  }); // state initialized to loading
  React.useEffect(() => {
    const getData = async () => {
      const d = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/mapping'
      );
      let items = new Array();
      for (let i = 0; i < d.data.length; i++) {
        items[i] = { id: d.data[i].id, name: d.data[i].name };
      }
      setState({ loading: false, data: items });
    };
    getData();
  }, []);

  const onClick = (_, value, __) => {
    if (value) {
      setValue(value.id);
    } else {
      setValue(null);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Price Checker
          </Typography>
          <div style={{ backgroundColor: 'white' }}>
            <Autocomplete
              id="search-bar"
              options={state.data}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
              onChange={onClick}
            />
          </div>
          {/* <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/chart">
            Chart
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
