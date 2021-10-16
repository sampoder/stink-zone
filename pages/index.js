import { Button, Flex, Box, Heading, Spinner } from 'theme-ui'
import Marquee from 'react-marquee-slider'
import times from 'lodash/times'
import { useEffect, useState } from 'react'
import durian from '../durian'
const title = require('title')

function measure(lat1, lon1, lat2, lon2) {
  var R = 6378.137
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d * 1000
}

export default function App() {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [lowestState, setLowest] = useState(0)
  const [lowestObjectState, setLowestObject] = useState({})
  const [currentState, setCurrentObject] = useState({color: 'green', text: 'LOADING'})
  useEffect(() => {
    function showPosition(position) {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
      let lowest = measure(
        position.coords.latitude,
        position.coords.longitude,
        durian[0].geometry.coordinates[1],
        durian[0].geometry.coordinates[0],
      )
      let lowestObject = {}
      for (let x in durian) {
        let distance = measure(
          position.coords.latitude,
          position.coords.longitude,
          durian[x].geometry.coordinates[1],
          durian[x].geometry.coordinates[0],
        )
        if (distance < lowest) {
          console.log(lowest)
          console.log(distance)
          lowest = distance
          lowestObject = durian[x]
        }
      }
      setLowest(lowest)
      setLowestObject(lowestObject)
      if(lowest < 11){
        setCurrentObject({color: 'maroon', text: 'STINKZONE'})
      }
      if(lowest < 501){
        setCurrentObject({color: 'red', text: 'DANGER ZONE'})
      }
      if(lowest < 1500){
        setCurrentObject({color: 'orange', text: 'WARNING ZONE'})
      }
      else{
        setCurrentObject({color: 'green', text: 'SAFE ZONE'})
      }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [])
  if(currentState.text == 'LOADING'){
    return (
      <Flex
        sx={{
          alignItems: 'center',
          minHeight: '100vh',
          justifyContent: 'center',
        }}
      >
        <Spinner></Spinner>
      </Flex>
    )
  }
  return (
    <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <Box bg={currentState.color} py={2} px={0}>
        <Marquee key={'0000'} velocity={25}>
          {times(7, Number).map(id => (
            <Heading sx={{ fontSize: '8vh', mx: 3 }}>
              <i>{currentState.text}</i>
            </Heading>
          ))}
        </Marquee>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          minHeight: '80vh',
          justifyContent: 'center',
        }}
      >
        <Box py={2} px={2} sx={{ textAlign: 'center' }}>
          <Heading sx={{ fontSize: '19vh', mb: 3 }}>{Math.round(lowestState)}m</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>{title(lowestObjectState?.properties?.species_name)}</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>{lowestObjectState?.properties?.height_est}m Tall</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>{lowestObjectState?.properties?.girth_size} Girth</Heading>
        </Box>
      </Flex>
      <style>
        {`
        @font-face {
          font-family: 'IdentityFont';
          src:  url('/LTAIdentity-Medium.woff2') format('woff2'),
                url('/LTAIdentity-Medium.woff') format('woff');
        }
        `}
      </style>
    </Box>
  )
}
