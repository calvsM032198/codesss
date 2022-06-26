import axios from "axios";
import { useEffect , useState} from "react";

const useFetchData  = (url) => {
    const [data,setData] = useState([])
    console.log(data)
    useEffect(() => {
       axios.get(url)
       .then(res => {
         setData( res.data)
       }).catch( err => {
           console.log(err)
       })
    },[url])
    return [data]
}

export default useFetchData