import React, {useState} from 'react';
import { Table, TableHeaderCell} from 'semantic-ui-react';
import ModalUser from './ModalUser'
import ModalConfirmDelete from './ModalConfirmDelete';
import ModalUploadImages from './ModalUploadImages';



const TableUser = ({users, handleUserUpdated, handleUserDeleted, server, socket}) => {
  return (
    <Table singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Age</Table.HeaderCell>
        <Table.HeaderCell>Gender</Table.HeaderCell>
        <TableHeaderCell>
          Uploaded Images
        </TableHeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
   {
        users = users.map((user) =>(
          <Table.Row key={user._id}>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.age}</Table.Cell>
          <Table.Cell>{user.gender}</Table.Cell>
          <Table.Cell>
          <ModalUploadImages
              headerTitle='Images'
              users ={users}
              userID = {user._id}
              user ={user}
              server={server}
              socket={socket}
            />
          </Table.Cell>
          <Table.Cell>
            <ModalUser
              headerTitle='Edit User'
              buttonTriggerTitle='Edit'
              buttonSubmitTitle='Save'
              buttonColor='blue'
              userID={user._id}
              handleUserUpdated={handleUserUpdated}
              server={server}
              socket={socket}
            />
            <ModalConfirmDelete
              headerTitle='Delete User'
              buttonTriggerTitle='Delete'
              buttonColor='black'
              user={user}
              handleUserDeleted={handleUserDeleted}
              server={server}
              socket={socket}
            />    
          </Table.Cell>
        </Table.Row>
        ))}
    </Table.Body>
  </Table>
  )
}

export default TableUser