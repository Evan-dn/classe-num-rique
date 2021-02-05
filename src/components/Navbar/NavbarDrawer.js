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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Navbar from './Navbar';


const useStyles = makeStyles({
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
      <List >
          <ListItem>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
      </List>
      <Divider />
      <List >
        {['Classe', 'Ajouter un élève'].map((text, index) => (
          <ListItem onClick={() => goToPage(text)}button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <Navbar toggleDrawer={toggleDrawer('left', true)}/>
        <Drawer anchor={'left'} open={state['left']}  onClose={toggleDrawer('left', false)}>
            {list('left')}
        </Drawer>
    </div>
  );
}