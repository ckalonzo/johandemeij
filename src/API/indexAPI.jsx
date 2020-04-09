import axios from 'axios'
const APIurl = "http://localhost:3001/api"

export function updatePost(post){
  return axios.post(APIurl + '/updatePost',post)
}
 
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

  fetch (APIurl + '/getPost',_id)
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}

export function uploadImage(image){
  const data = new FormData()
  data.append('file',image)
  return axios.post(APIurl +'/upload',data,{
    headers:{
      'Accept':'application/json',
      'Content-Type':'multipart/form-data'
    }
  })
  .then((res)=>{return res})
  .catch((err) => { return err})
}

 