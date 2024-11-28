
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Api } from './services/api'
import { BsSearch } from "react-icons/bs";

function App() {

  const [clima,setClima]=useState('')
  const ref=useRef(null)
  const[message,setMessage]=useState(null)

    async function Climax() {

      if (clima=='') {
        alert('Informe a cidade')
        ref.current.focus()
        return
      }

      try {

        let response=await Api.get(`/weather?q=${clima}&appid=52298c242b729818a200e411446ee5df&units=metric`)

        let{name,main:{temp,humidity},wind:{speed},weather:[{description,icon}]
      }=response.data

      console.log(response)

        setClima({
          nome:name,
          tempo:temp.toFixed(1),
          humidade:humidity,
          vento:speed.toFixed(1),
          descricao:description,
          icone:icon
        }
      )

      setMessage('')

      } catch (error) {
         setMessage("Clima não emcontrado")
      }
      
    }
  

  return (
    
      <div className='containerApp'>
        <div className='container'>
          <div className='divHeader'>
          <input 
            type='text' 
            placeholder='São paulo'
            onChange={(e)=>setClima(e.target.value)}
            autoFocus={true}
            ref={ref}
            className='pesquisa'
          />
            <button onClick={Climax}>
              <BsSearch color='#FFF' size={20} fontWeight='bold'/>
           </button>
          </div>
             <main className='main'>
              {
                clima.nome &&
                (
                  <div>  
                     <h2>{clima.nome}</h2>
                     <p className='tempo'>{clima.tempo} °C</p>
                     <div className='icon'>
                     <img src={` https://openweathermap.org/img/wn/${clima.icone}@2x.png`}/>
                     </div>
                     <p className='chuva'>{clima.descricao}</p> 
                  </div>
                )
              } 
              <p style={{fontSize:23}}>{message}</p>    
             </main> 
             {
                clima.nome &&
                (
               <div className='foter'>
                <div>
                  <h2>Humidade</h2>
                  <h2>Velocidade do vento</h2>
                </div>
                <div className='div2'>
                <p>{clima.humidade} %</p>
                <p>{clima.vento} km/h</p>
                </div>
             </div>
                )
             }
        </div>
      </div>
  )
}

let messages={
   fontSize:20,
   fontFamily:'sans-serif',
   color:'black'
}

export default App
