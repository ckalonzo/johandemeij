const APIurl = "http://localhost:3001/api"

export function loadPosts() {
  fetch (APIurl + 'loadPosts')
  .then((data)=> data.json())
  .then((res) => console.log(res.data))
}
