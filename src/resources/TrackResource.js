import axios from 'axios';
const api = 'http://localhost:4567/track';

const map = (res) => res.data;

class TrackResource {

  list(page = 1, sort = 'desc', text=''){
    return axios.get(`${api}/list?page=${page}&sort=${sort}&text=${text}`).then(map);
  }

  start(description = '', startNow = true){
    return axios.post(`${api}/start`, { description, startNow}).then(map);
  }

  stop(trackId){
    return axios.post(`${api}/${trackId}/stop`).then(map);
  }

  search(text){
    return axios.get(`${api}/get?text=${text}`).then(map);
  }

  delete(id){
    return axios.delete(`${api}/${id}`).then(map);
  }
}

export default new TrackResource();