import { useEffect, useState } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Do Not Disclose', value: 'other' }
]


const FormUser = ({buttonColor, handleUserAdded, handleUserUpdated, buttonSubmitTitle, userID, server, socket }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        formClassName:'',
        title: '',
        files: []
    });

    //const [multiplefiles, setMultipleFiles] = useState('');

    const {name, email, age, gender, formClassName, title, files} = formData;
    

    const handleInputChange = (e, {name, value}) => {
        setFormData({...formData, [name] : value});
      }
    
    const handleSelectChange = (e, data) =>{
      setFormData({...formData, gender: data.value});
      }
    
      const MultipleFileChange = (e) => {
        console.log(e.target.files)
        setFormData({...formData, files: e.target.files});
        
    }

    
    const handleSubmit = async (e) =>{
        // Prevent browser refresh
        e.preventDefault();

        const bodyForm = new FormData();
        bodyForm.append("title", title);
        bodyForm.append("name", name)
        bodyForm.append("email", email);
        bodyForm.append("age", age);
        bodyForm.append("gender", gender);
        for(let i = 0; i < files.length; i++) {
          bodyForm.append('files', files[i]);
       }
        
        const method = userID ? 'put' : 'post';
        const params = userID ? userID : '';
        
        axios({
          method: method,
          responseType: 'json',
          url: `${server}/api/users/${params}`,
          data: bodyForm
        })
        .then((response) => {
          console.log(response)
          if(userID){
            alert("Successfully updated record")
          }
          else{
            alert("Successfully added record")
          }
          

          if (!userID) {
                setFormData({
              name: '',
              email: '',
              age: '',
              gender: '',
              files: [],
              title: ''
            });
            handleUserAdded(response.data.result);
            socket.emit('add', response.data.result);
          }
          else {
            handleUserUpdated(response.data.result);
            socket.emit('update', response.data.result);
          }
          
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              alert('Warning', err.response.data.msg)
            }
          }
          else {
            alert('Warning', err.response.data.msg)
          }
        });
      }

    useEffect(() => {
      if (userID) {
        axios.get(`/api/users/${userID}`)
        .then((response) => {
          console.log(response)
          setFormData({
            name: response.data.name,
            email: response.data.email,
            age: response.data.age ?? '',
            gender: response.data.gender,
            title: response.data.title
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }, [userID])
  return (
    <Form className={formClassName} onSubmit={handleSubmit} max>
        <Form.Input
          label='Name'
          type='text'
          placeholder='Elon Musk'
          name='name'
          maxLength='40'
          required
          value={name}
          onChange={handleInputChange}
        />
        <Form.Input
          label='Email'
          type='email'
          placeholder='elonmusk@tesla.com'
          name='email'
          maxLength='40'
          required
          value={email}
          onChange={handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Age'
            type='number'
            placeholder='18'
            min={5}
            max={130}
            name='age'
            value={age}
            onChange={handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={genderOptions}
            placeholder='Gender'
            value={gender}
            onChange={handleSelectChange}
          />
           <Form.Input
            label='Title'
            type='text'
            placeholder='Enter Images title'
            min={5}
            max={130}
            name='title'
            value={title}
            onChange={handleInputChange}
          />
          <Form.Field>
          <label>Select Multiple Files</label>
          <Form.Input type="file" name="files" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple min={5}
            max={130} />

          </Form.Field>
          
        </Form.Group>
        <Button color={buttonColor} floated='right'>{buttonSubmitTitle}</Button>
        <br/>
        
      </Form>
  )
}

export default FormUser