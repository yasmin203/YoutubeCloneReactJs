import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactPlayer from "react-player"
import { Typography, Stack, Box } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import { Videos,Loader } from "./"
import { FetchFromAPI } from "../utils/FetchFromAPI"

const VideoDetail = () => {
  const { id } = useParams()
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  
  useEffect(() => {
    FetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(data=>setVideoDetail(data.items[0]))
  }, [id])
  useEffect(() => {
    FetchFromAPI(`search?part=snippet&relatedToVideoId=${id}`).then(data=>setVideos(data.items))
  }, [id])

  
  if (!videos?.length) return 'Loading ...'

  const {snippet : {title,channelId,channelTitle},statistics: {viewCount,likeCount}}=videoDetail
  return (
    <Box minHeight="95vh">
      <Stack direction={{xs:'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:"100%", position:"sticky", top:"70px"}}>
            <ReactPlayer url={`http://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={1}>{title}</Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography color="#fff" variant={{sm:'subtitle1', md: "h6"}}>
                  {channelTitle}
                  <CheckCircle  sx={{ fontSize: "14px", color: "gray", ml: "5px" }} />
              </Typography>
              </Link>
              <Stack direction="row" gap="20px">
                <Typography variant="body1" sx={{opacity:0.7}}>
{ parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant="body1" sx={{opacity:0.7}}>
{ parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        {/* //side videos */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
        <Videos videos={videos}  direction="column"/>
        </Box>
        
      </Stack>
    </Box>
  )
}

export default VideoDetail