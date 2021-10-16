import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { AiOutlineUser } from "react-icons/ai";

export default function Owner(token) {
  const user = `${token.token}`;
  const url = `http://localhost:8080/hls/${user}.m3u8`.replace(/\s/g, "");

  const [dimensions, setDimensions] = React.useState({
    width: 1366,
    height: 784,
  });

  const handleResize = () => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: 1366,
        height: 784,
      });
    }
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <Flex w={dimensions.width / 1.25} flexDirection="column">
      <Box
        h={dimensions.height}
        flexDirection="column"
        overflow="scroll"
        mr={2}
        ml={2}
      >
        <VideoPlayer videoLink={url} />
        <Box
          h="250px"
          bg="black"
          mt={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="row" p={10}>
            <Avatar w={20} h={20} />
            <Box ml={5}>
              <Text color="white" fontSize="25" fontWeight="bold">
                {user.toUpperCase()}
              </Text>
              <Text color="white" fontSize="15" width={150}>
                Live Stream
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            p={20}
            justifyContent="center"
          >
            <AiOutlineUser size={20} color="red" />
            <Text mt={-0.5} ml={2} color="red">0</Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
