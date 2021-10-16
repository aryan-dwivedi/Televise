import { Input } from "@chakra-ui/input";
import { Flex, Heading, Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function StreamChat() {
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
    <Flex w={dimensions.width / 3.9} flexDirection="column" bg="blackAlpha.800" p="5" position="sticky">
      <Heading as="h4" size="md" marginLeft="5px" zIndex="1" color="white">
        Stream Chat
      </Heading>
      <Box
        h={dimensions.height / 1.4}
        flexDirection="column"
        overflow="scroll"
        margin="5px"
        zIndex="1"
      >
        <Text>Hello</Text>
      </Box>
      <Box>
        <Input
          placeholder="Say Something..."
          size="sm"
          variant="unstyled"
          borderWidth="1px"
          width="300px"
          padding="10px"
          _focus={{ borderWidth: 1 }}
        />
      </Box>
    </Flex>
  );
}
