import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {

  const [gifs, setGifs] = useState({ searchTerm: '' })
  // const [gifList, setGifList] = useState({})

  const handleInput = (field, value) => {
      setGifs({ ...gifs, [field]: value })
  }

  function renderGifs(data) {
    console.log('render data:', data.data[1])
  }

  const fetchGifs = async (searchTerm) => {
      const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=baIM7M4AoEmFD2lEMbZHVA1cd7gD42eq&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log('results: ', data)
        renderGifs(data)
      } catch (err) {
        console.log(err)
      }
  }

  const handleForm = (e) => {
    e.preventDefault()
    setGifs({ searchTerm: '' })
    fetchGifs(gifs.searchTerm)
  }

  return (
    <>
      <Header />
      <div>
        <form onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Search"
            value={gifs.searchTerm}
            onChange={(event) => handleInput('searchTerm', event.target.value)}
          />
          <input
            type='submit'
            value='Search'
          />
        </form>
      </div>
    </>
  )
}

export default App
