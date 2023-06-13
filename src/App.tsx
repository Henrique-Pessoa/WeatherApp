import { useEffect, useState } from 'react'
import './scss/index.scss'
import axios from "axios"
import { MdDarkMode, MdLightMode } from "react-icons/md";


function App() {
  let [city, setCity] = useState<any>("")
  const [text, setText] = useState<string>("")
  const [handleError, setHandleError] = useState<boolean>(false)
  const [key,setKey] = useState<string>("")
  const [theme, setTheme] = useState<string>("light")
  const [value,setValue] = useState("")  
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=648001582c7db712f7e0d65d1f26ef0d&lang=pt_br&units=metric`
   useEffect(() => {
    if (key == "Enter" || text!="") {
      console.log(text)
      axios.get(url).then(({ data }:any) => {
        setCity(data)
      }).catch((e:any) => setHandleError(true))
    }
  })
  const themeFunction = () => {
    if (theme == "light") {
      return (
        <MdDarkMode className='themeButtonDark' onClick={() => { setTheme(theme === "light" ? "dark" : "light"); }}></MdDarkMode>
      )
    }
    else {
      return (
        <MdLightMode className='lightButton' onClick={() => { setTheme(theme === "light" ? "dark" : "light"); }}></MdLightMode>

      )
    }
  }
  const dataContainer = () => {
    if (city !='') {
      return (
        <div className='dataContainer'>
          <h1 className='name'>{city.name}</h1>
          <h2 className='temp'> Temperatura: {city.main.temp} ºC</h2>
          <h2 className='speed'>Velocidade do vento: {city.wind.speed}</h2>
          <h3 className='tempMax'> Max Temperatura: {city.main?.temp_max}</h3>
          <h3 className='tempMin'>Min Temperatura: {city.main?.temp_min}</h3>
          <h3 className='humidity'>Humidade: {city.main.humidity}</h3>
        </div>
      )
    }
  }

  const error = ()=>{
    if(handleError == true){
      city = ""
      return(
      <div className='handleError'>
        <h1 className='ErrorText'>Verifique a ortografia, e não se esqueça dos acentos</h1>
        <button className='ErrorButton'  onClick={(e)=>{setHandleError(false), setText(""), setKey("")}}>OK</button>
      </div>
      )
    }
  }
  return (
    <div className={theme}>
      <h1 className='title'>Weather app</h1>
      {error()}
      <div className="container">
        {themeFunction()}
        <input  placeholder='Londres' onChange={(e)=>setValue(e.target.value)} onKeyDown={(e)=>setKey(e.key)}/>
        {dataContainer()}
      </div>
    </div>
  )
}

export default App
