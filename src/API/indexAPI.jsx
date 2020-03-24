import axios from 'axios';
const APIurl = "http://localhost:3001/api"

export function getDataFromDb(){
  console.log(APIurl + '/getData')
    fetch(APIurl + '/getData')
      .then((data) => data.json())
      .then((res) => console.log(res.data));
};

export const  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
    }

    axios.post(APIurl + '/putData', {
        id: idToBeAdded,
        message: message,
    });
};

export const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete(APIurl + '/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
};

export const updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post(APIurl + '/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

export const  registerUser = (user) => {
    return axios.post(APIurl + '/registerUser', user);
};

export const  loginUser = (user) => {
  console.log(user)
  return axios.post(APIurl + '/loginUser', user);
};

export const  uploadImage = (image) => {
  const data = new FormData()
  data.append('file', image)
  return axios.post(APIurl + '/upload',data,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
  })
  .then((res) =>{return res})
  .catch((err) =>{return err})
}
export const  updateUser = (user) => {
  return axios.post(APIurl + '/updateUser', user);
};

export const  addProduct = (product) => {
  return axios.post(APIurl + '/addProduct', product);
};