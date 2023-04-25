// import logo from './logo.svg';
import './App.css';
import {useEffect, useRef, useState} from 'react'
import axios from 'axios';
import {Button} from 'react-bootstrap'


function App() {
  const searchData = useRef(null)
  const [searchText, setsearchText] = useState("mountains")
  const [ImageData,setImageData]=useState([])
  useEffect(()=>{
const params = {
  method: "flickr.photos.search",
  api_key : "7d75a2506fb26876a44dcaa285c6c8e3",
  text:searchText,
  sort :"",
  per_page:24,
  license:'4',
  format:"json",
  nojsoncallback:1
}
const parameters = new URLSearchParams(params);
const url = `https://api.flickr.com/services/rest/?${parameters}`
axios.get(url).then((resp)=>{
  console.log(resp.data)
  const arr = resp.data.photos.photo.map((imgData)=>{
    return fetchFlickrImageUrl(imgData,'q');
  })
  setImageData(arr)
}).catch(()=>{

}).finally(()=>{

})
  },[searchText])
  const fetchFlickrImageUrl=(photo,size)=>{
   let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
 if(size){
  url += `_${size}`
 }
 url += '.jpg'
 return url
  }
  return (
<>

<h1 className='heading'>SnapShot</h1>
<div className='search-container'>

<input type="text" onChange={(e)=>{searchData.current =e.target.value}} placeholder="search.." classname='input'/>

<Button className='searcher' variant="flat" onClick={()=>{setsearchText(searchData.current)}}>Search</Button>
</div>
<br/>
<section className='section'>
<Button className='menu' variant="flat" onClick={()=>{setsearchText("mountains")}}>Mountains</Button>{' '}
<Button className='menu' variant="flat" onClick={()=>{setsearchText("beaches")}}>Beaches</Button>{' '}
<Button className='menu' variant="flat" onClick={()=>{setsearchText("birds")}}>Birds</Button>{' '}
<Button className='menu' variant="flat" onClick={()=>{setsearchText("food")}}>Food</Button>{' '}
</section>
<section className='picheading'>
  <h1>Mountain Pictures</h1>
</section>
<section className='image-container'>
    {
      ImageData.map((imageurl,key)=>{
return (
  <article className='api-img'>
  <img src={imageurl} key={key} alt ="snapshots"/>
  </article>
)
      })
    }
</section>
</>
  )
}

export default App;