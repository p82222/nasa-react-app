import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import Main from "./components/Main"
import { useEffect, useState } from "react"


function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(()=>{
    async function fetchAPIData() {
      setLoading(true) // Set loading before fetch
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + 
      `?api_key=${NASA_KEY}` 
      
      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if(localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        setLoading(false) // Stop loading
        return
      }
      localStorage.clear()
      
      try{
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
      } catch(err) {
        console.log(err.message)
      } finally {
        setLoading(false) // Ensure loading stops even if there’s an error
      }
    }
    fetchAPIData()
  }, [])


  return (
    <>      
      {data? (<Main data = {data} />): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      { showModal && (
        <SideBar data = {data} handleToggleModal = {handleToggleModal}/>)}
      { data &&(
        <Footer data = {data} handleToggleModal={handleToggleModal} />
        )}
      
    </>
  )
}

export default App
