import React from 'react';
import { useHistory } from 'react-router-dom';

// Mui stuff
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Navbar from './Navbar';

// Mui icon
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const useStyles = makeStyles({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: '#404040',
    },
    "& .MuiListItemText-primary":{
      fontFamily: " 'Righteous', cursive",
      color: '#fff'
    },
  },
  list: {
    width: 250,
    
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {

  // Use history to go to a Page
  const history = useHistory();

  const classes = useStyles();

  // State for the drawer that to open up by the left
  const [state, setState] = React.useState({
    left: false,
  });

  // Open or not the drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // Go to the correct Page
  const goToPage = (text) => {
    if(text === 'Classe'){
      history.push('/')
    }else if(text === 'Ajouter un élève'){
      history.push('/addStudent')
    }
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.list} >
          <ListItem >
            <ListItemText primary={'Dashboard'} />
          </ListItem>
      </List>
      <Divider/>
      <List className={classes.list} >
        {['Classe', 'Ajouter un élève'].map((text, index) => (
          <ListItem onClick={() => goToPage(text)}button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <GroupIcon style={{color: '#fff'}}/> : <GroupAddIcon style={{color: '#fff'}}/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <Navbar toggleDrawer={toggleDrawer('left', true)}/>
        <Drawer className={classes.root}  open={state['left']}  onClose={toggleDrawer('left', false)}>
            {list('left')}
        </Drawer>
    </div>
  );
}