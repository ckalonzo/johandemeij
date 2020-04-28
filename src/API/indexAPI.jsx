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

export function loadfilteredAgendas(skip){

  fetch (APIurl + '/loadfilteredAgendas',skip)
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}
export function deletePostImage(id){
  return axios.delete(APIurl + '/deletePostImage/' + id ,{data:{id}})
}
export function deletePost(id){
  return axios.delete(APIurl + '/deletePost/' + id ,{data:{id}})
}

export function uploadPostImage(image){
  const data = new FormData()
  data.append('file',image)
  return axios.post(APIurl +'/uploadPostImage',data,{
    headers:{
      'Accept':'application/json',
      'Content-Type':'multipart/form-data'
    }
  })
  .then((res)=>{return res})
  .catch((err) => { return err})
}


export function updatePostImage(data){
  return axios.post(APIurl +'/updatePostImage',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function createPostImage(data){
  return axios.post(APIurl +'/createPostImage',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}

export function createPost(data){
  return axios.post(APIurl +'/createPost',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}

 