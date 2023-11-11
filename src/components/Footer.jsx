import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="blue.400" color="white" py="8" position="relative" bottom="0" left="0" right="0">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Noita - Your Only Wand
            </Text>
            <Text mt="2">© 2023. All rights reserved.</Text>
          </Box>

          <Box>
            <Text mb="2">Follow us on:</Text>
            <Flex>
              <Link mr="4" href="#" target="_blank" rel="noopener noreferrer">
                Twitter
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
