import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [users, setusers] = useState([])
  const [id, setid] = useState("")
  const [title, settitle] = useState("")
  const [author, setauthor] = useState("")
  const [mobile, setmobile] = useState("")
  useEffect(() => {
    getlist()
  }, [])
  console.warn(users)
  function getlist() {
    fetch("http://localhost:3000/posts").then((result) => {
      result.json().then((resp) => {
        setusers(resp)
        setid(resp[0].id)
        settitle(resp[0].title)
        setauthor(resp[0].author)
        setmobile(resp[0].mobile)

      })
    })
  }
  function selectUser(id) {
    console.warn("function called", users[id - 1])
    let item = users  [id-1];
    setid(item.id);
    settitle(item.title);
    setauthor(item.author);
    setmobile(item.mobile);
  }
  function deleteUser(id) {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getlist()
      })
    })
  }
  function  updateUser()
  {
    let item={id,title,author,mobile}
    console.warn("item",item)
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getlist()
      })
    })
  }




  return (
    <div className="App">
      <h1>Delete data with API call</h1>
      <table className="table table-dark table-hover" border='2' style={{ float: 'left' }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Author</td>
            <td>Mobile</td>
            <td>Delete</td>
            <td>Update</td>
          </tr>
          {
            users.map((item, i) =>
              <tr key={i}>

                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.mobile}</td>
                <td><button type="button" onClick={() => deleteUser(item.id)}>Delete</button></td>
                <td><button type="button" onClick={() => selectUser(item.id)}>Update</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <input type="text" value={id} onChange={(e) => setid(e.target.value)} /> <br /><br />
        <input type="text" value={title} onChange={(e) => settitle(e.target.value)} /> <br /><br />
        <input type="text" value={author} onChange={(e) => setauthor(e.target.value)} /> <br /><br />
        <input type="text" value={mobile} onChange={(e) => setmobile(e.target.value)} /> <br /><br />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );

}
export default App;
