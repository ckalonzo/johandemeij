//import axios from 'axios'
const APIurl = "http://localhost:3001/api"

export function loadPosts() {
  fetch (APIurl + '/loadPosts')
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}
export function loadPostImages() {
  fetch (APIurl + '/loadPostImages')
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}

export function getPost(_id){
  console.log(APIurl + '/getPost',_id)
  fetch (APIurl + '/getPost',_id)
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}
 