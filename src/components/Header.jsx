import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  useBreakpointValue
} from '@chakra-ui/react';
import AuthButton from "./AuthButton";

const Header = () => {
  const headingSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={{ base: '0.5rem', md: '1rem' }}
      bg='gray.100'
      width='100%'
      minHeight='82px'  // ここで最小高さを設定
    >
      <Box maxW={{ base: "80%", md: "auto" }}>
        <Heading as='h1' size={headingSize} cursor="none">
          <Link to='/list'>Noita - Your Only Wand</Link>
        </Heading>
      </Box>
      <AuthButton />
    </Flex>
  );
}

export default Header;