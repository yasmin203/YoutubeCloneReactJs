import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { Videos } from "./"
import { FetchFromAPI } from "../utils/FetchFromAPI"
import { useParams } from "react-router-dom"

const SearchFeed = () => {

  const [videos, setVideos] = useState([])
  const {searchTerm} =useParams()

  useEffect(() => {
    FetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    )
  }, [searchTerm])//to gets updated every time we search

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
    <Typography
      style={{ color: "white", variant: "h4", fontWeight: "bold" }}
      mb={2}
    >
    Search Resault For : 
        <span style={{ color: "#f31503 " }}>{searchTerm}
        </span> Videos
    </Typography>

    <Videos videos={videos} />
    {/* console.log(videosProp)  */}
  </Box>
  )
}

export default SearchFeed
