import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios';

export default {
  // the any has been put only because the .txt file
  fetchListOfWords(): Promise<AxiosResponse | AxiosError | any> {
    // return axios.get<AxiosResponse>(`https://pastes.io/raw/iys4katchh`)
    
    // I used a file in txt to mock the API because I have lots of problems to get the data from the url
    // most of the time there is an error and sometimes it's working
    return axios.get<AxiosResponse>(`../../API/listWords.txt`)
  },
}
