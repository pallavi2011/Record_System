import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Container } from 'semantic-ui-react';
import TableUser from './components/TableUser';
import ModalUser from './components/ModalUser';
const server = "http://localhost:3000"
var socket;


function App() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (data) => {
    let users = users.slice();
    users.push(data);
    setUsers(users);
  }

  const handleUserUpdated = (data) =>{
    let users = users.slice();
    
    let i = users.findIndex(u => u._id === data._id)

    if (users.length > i) { users[i] = data }

    setUsers(users);
  }

  const handleUserDeleted = (data) =>{
    let users = users.slice();
    users = users.filter(u => { return u._id !== data._id; });
    setUsers(users);
  }

  useEffect(() => {
      async function fetchUsers(){
        const options = {method: 'GET', 
        headers: { 'Accept': 'application/json'}}
  
         await axios('/api/users', options)
         .then((response) => {
          console.log(response.data)
          setUsers(response.data)
         })
         
      }
      fetchUsers();
      socket = io.connect('http://localhost:3000');
      socket.on('add', data => handleUserAdded(data));
      socket.on('update', data => handleUserUpdated(data));
      socket.on('delete', data => handleUserDeleted(data));
    }     
    , [socket]);
  return (
    <div className='App'>
    <Container>
      <br/>
      <ModalUser
        headerTitle='Add User'
        buttonTriggerTitle='Add New'
        buttonSubmitTitle='Add'
        buttonColor='green'
        handleUserAdded={handleUserAdded}
        handleUserUpdated = {handleUserUpdated}
        server={server}
        socket={socket}
      />
      <TableUser
        handleUserUpdated={handleUserUpdated}
        handleUserDeleted={handleUserDeleted}
        users = {users}
        server={server}
        socket={socket}
      />
    </Container>
    <br />
  </div>
  );
}

export default App;
