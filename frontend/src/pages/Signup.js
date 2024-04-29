import React, { useEffect, useState } from 'react';
import {Col, Row, Container, Button, Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Signup.css';
import profilePic from '../assets/pf.jpg';



function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCnf, setpasswordCnf] = useState('');

  const [image, setImage] = useState(null);
  const [uploadingImg, setuploadingImg] = useState(false);
  const [imgPreview, setImagePreview] = useState(null);

  async function uploadImage(image){
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'm2qncth1');  //cloud name fro cloudinary
    try{
      setuploadingImg(true)
      let res = await fetch('https://api.cloudinary.com/v1_1/drcyclhwg/image/upload',{
        method: "post",
        body: data
      }) 
      const urlData = await res.json();
      setuploadingImg(false);
      return urlData.url;
    } catch (err){
      setuploadingImg(false);
      console.log(err)
    }
  }
  async function handleSubmit(e){
    e.preventDefault();
    if(!image) return alert('Please upload a profile pic')
    const url = await uploadImage(image);
  console.log(url)
    
  }
  function validateImg(e){
    const file = e.target.files[0];
    if (file.size >= 1024*1024) {
      return alert('Max file size is 1mb');;
    }
    else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }
  // useEffect(() => {
  //   console.log(image, setImage)
  // },[image])

  return (
    <Container>
      <Row>
        <Col md ={7} className='d-flex align-items-center justify-content-center flex-direction-column' > 
        <Form style={{width: '80%', maxWidth: 500}} onSubmit={handleSubmit}>
          <h1 className='text-center'>Create Account</h1>
          <div className='signup-profile-pic__container'>
            <img scr = {imgPreview || profilePic} className='signup-profile-pic' alt=""/>
            <label htmlFor="image-upload" className='image-upload-label'>
              <i className='fas fa-plus-circle add-picture-icon'></i>
            </label>
            <input type = 'file' id = 'image-upload' hidden accept="image/png, image/jpeg image/jpg" 
              onChange={validateImg}>
            </input>
          </div>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Your Name" onChange={(e) => {setName(e.target.value)}} value={name}/>
        <Form.Text className="text-muted">
          Something that you will like to be called.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}} value = {email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value = {password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordCnf">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange = {(e) => setpasswordCnf(e.target.value) } value = {passwordCnf}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        {uploadingImg? "Uploading..." :"Signup"}
      </Button>
      <div className='py-4'>
        <p className='text-center'>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </Form>
        </Col>
        <Col md = {5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
}

export default Signup;