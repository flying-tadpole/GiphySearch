import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [gifs, setGifs] = useState({ searchTerm: '' })
  const [gifList, setGifList] = useState([])

  const handleInput = (field, value) => {
      setGifs({ ...gifs, [field]: value })
  }

  const showingGifs = gifList.map(gif => {
    console.log('gif:', gif)
    return (
      <div key={gif.id}>
        <img src={gif.images.fixed_height.url}></img>
        {/* {gif.title} */}
      </div>
    )
  })

  const fetchGifs = async (searchTerm) => {
      const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=baIM7M4AoEmFD2lEMbZHVA1cd7gD42eq&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        setGifList(data.data)
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
        {showingGifs}
      </div>
    </>
  )
}

export default App
