import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function App() {
  const classes = useStyles()
  const [titlefield, settitlefield] = useState([
    { id: uuidv4(), title: ''},
  ])
  const [ingredFields, setingredFields] = useState([
    { id: uuidv4(), ingredient: '', amount: '', unit: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ingredFields", ingredFields);
    console.log("titlefield", titlefield);
  };

  const handleChangeInput = (id, event) => {
    const newingredFields = ingredFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    const newtitlefield = titlefield.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    settitlefield(newtitlefield);
    setingredFields(newingredFields);
  }

  const handleAddFields = () => {
    setingredFields([...ingredFields, { id: uuidv4(),  ingredient: '', amount: '', unit: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...ingredFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setingredFields(values);
  }

  return (
    <Container>
      <h1>Add New Recipe</h1>
      <h3>Title</h3>
      <form className={classes.root} onSubmit={handleSubmit}>
        { titlefield.map(titlefield => (
          <div key={titlefield.id}>
          <TextField
            name="title"
            label="Title"
            variant="filled"
            value={titlefield.title}
            onChange={event => handleChangeInput(titlefield.id, event)}
          />
          </div>
        )) }
        <h3>ingredients</h3>
        { ingredFields.map(ingredField => (
          <div key={ingredField.id}>
            <TextField
              name="ingredient"
              label="ingredient"
              variant="filled"
              value={ingredField.ingredient}
              onChange={event => handleChangeInput(ingredField.id, event)}
            />
            <TextField
              name="amount"
              label="amount"
              variant="filled"
              value={ingredField.amonut}
              onChange={event => handleChangeInput(ingredField.id, event)}
            />
            <TextField
              name="unit"
              label="unit"
              variant="filled"
              value={ingredField.unit}
              onChange={event => handleChangeInput(ingredField.id, event)}
            />
            <IconButton disabled={ingredFields.length === 1} onClick={() => handleRemoveFields(ingredField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>
  );
}

export default App;
