import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"
import { Videos, ChannelCard } from "./"
import { FetchFromAPI } from "../utils/FetchFromAPI"
import zIndex from "@mui/material/styles/zIndex"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  //console.log(channelDetail)
  //console.log(channelVideos)

  const { id } = useParams()

  useEffect(() => {
    FetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=> setChannelDetail(data?.items[0]))
  }, [id])
  
  //fetching videos related to this channel
  useEffect(() => {
    FetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=> setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
      <div style={{
          background: ' linear-gradient(90deg, rgba(58,77,180,1) 0%, rgba(230,51,253,1) 43%, rgba(253,29,214,1) 65%, rgba(248,252,69,1) 100%)',
          zIndex: 9,
        height:"300px"
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />

      </Box> 
    </Box>
  )
}

export default ChannelDetail