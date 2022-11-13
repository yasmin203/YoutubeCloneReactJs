import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Box } from '@mui/material'
import './index.css'
import { Navbar,VideoDetail,ChannelDetail,SearchFeed,Feed} from './components'

const App = () => (
    <BrowserRouter basename=''>
        {/* {console.log(process.env.PUBLIC_URL)} */}
    <Box sx={{backgroundColor:"#000"}}>
        <Navbar />
        <Routes>
            <Route path='/' exact element={<Feed />} />
            <Route path='/video/:id'  element={<VideoDetail />} />
            <Route path='/channel/:id'  element={<ChannelDetail />} />
            <Route path='/search/:searchTerm'  element={<SearchFeed />} />
        </Routes>
    </Box>
    </BrowserRouter>
)

export default App 