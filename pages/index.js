import { Button, Flex, Box, Heading } from 'theme-ui'
import Marquee, { Motion, randomIntFromInterval } from 'react-marquee-slider'
import times from 'lodash/times'

export default function App() {
  return (
    <Box sx={{maxHeight: '100vh', overflow: 'hidden'}}>
      <Box bg="orange" py={2} px={0}>
          <Marquee key={'0000'} velocity={25}>
            {times(7, Number).map(id => (
              <Heading sx={{ fontSize: '8vh', mx: 3 }}>
                <i>STINKZONE</i>
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
          <Heading sx={{ fontSize: '20vh', mb: 3 }}>80m</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>Durio Zibethinus</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>15m Tall</Heading>
          <Heading sx={{ fontSize: '6vh', mb: 3 }}>Small Girth</Heading>
        </Box>
      </Flex>
    </Box>
  )
}
