import React, {useState} from 'react';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Modal, FormControl, Input } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import db from './Firebase';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      position: `absolute`,
      width: 300,
      height: 100,
      background: `grey`
    };
}

function getMargin() {
    return {
        marginBottom: `10px`,
        fontSize: `30px`
    };
}

function Todo(props) {

    const [open, setOpen] = useState(false);  
    const [input, setInput] = useState('');
    const [modalStyle] = useState(getModalStyle);
    
    const updateTodo = () => {
        db.collection('todos').doc(props.text.id).set({
            todo: input
        }, {merge: true});
        
        setOpen(false);
    }
    
    return (
        
        <div>
            <Modal open = {open} onClose = {() => setOpen(false)}>
                <form style = {modalStyle}>
                    <FormControl>
                        <Input style = {getMargin()} value = {input} onChange = {event => setInput(event.target.value)} />
                    </FormControl>
                    <Button disabled = {input === ''} type = "submit" onClick = {updateTodo} variant = "contained" color = "primary">
                        Update
                    </Button>
                </form>
            </Modal>

            <List>
                <ListItem>
                    <ListItemAvatar></ListItemAvatar>
                    <ListItemText><b>{props.text.todo}</b></ListItemText>
                    <div>
                        <EditIcon 
                            onClick = {() => {setOpen(true); setInput(props.text.todo)}}
                        />
                        <DeleteForeverIcon
                            onClick = {() => db.collection('todos').doc(props.text.id).delete()}
                        />
                    </div>
                </ListItem>
            </List>
        </div>
    );
}

export default Todo;

//rfce - react functional component with an export