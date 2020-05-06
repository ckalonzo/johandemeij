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

export function uploadPresentationImage(image){
  const data = new FormData()
  data.append('file',image)
  return axios.post(APIurl +'/uploadPresentationImage',data,{
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
export function updatePresentation(data){
  return axios.post(APIurl +'/updatePresentation',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function updatePresentationImage(data){
  return axios.post(APIurl +'/updatePresentationImage',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function updateEvent(data){
  return axios.post(APIurl +'/updateEvent',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function createPostImage(data){
  return axios.post(APIurl +'/createPostImage',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function createPresentation(data){
  return axios.post(APIurl +'/createPresentation',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}

export function createPost(data){
  return axios.post(APIurl +'/createPost',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function createCd(data){
  return axios.post(APIurl +'/createCd',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function updateCd(data){
  return axios.post(APIurl +'/updateCd',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}
export function updateCdImage(data){
  return axios.post(APIurl +'/updateCdImage',data)
  .then((res)=>{return res})
  .catch((err) => { return err})
}

 