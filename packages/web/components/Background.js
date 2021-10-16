import { Box, Text } from "@chakra-ui/layout";
import React from "react";

export default function Background(token) {
  var colorArray = [
    "#FF6633",
    "#FFB399",,
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#E6331A",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#4DB3FF",
    "#1AB399",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#4D8066",
    "#809980",
    "#999933",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  const color = colorArray[Math.floor(Math.random() * colorArray.length)];

  function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  const username = `${token.token}` + " ";
  const string = username.repeat(500);

  return (
    <Box bg={color} position="absolute" height="800" alignItems="center" justifyContent="center" zIndex="-1">
      <Text fontSize="5xl" bgClip="text" fontWeight="extrabold" color={shadeColor(color, 25)} padding="10px" marginTop="-40px">
        {string}
      </Text>
    </Box>
  );
}
