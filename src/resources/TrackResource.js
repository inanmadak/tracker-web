import axios from 'axios';
const api = 'localhost:4567/track';

class TrackResource {

  list(page = 1, sort = 'asc'){
    return axios.get(`${api}/list?page=${page}&sort=${sort}`);
  }

  start(){
    return axios.post(`${api}/start`);
  }

  stop(trackId){
    return axios.post(`${api}/${trackId}/stop`);
  }

  search(text){
    return axios.get(`${api}/get?text=${text}`);
  }

  remove(id){
    return axios.delete(`${api}/track/${id}`);
  }
}

export default new TrackResource();