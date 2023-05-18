import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import AuthButton from "./AuthButton";

export default function Header() {

  return (
    <Flex
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='gray.100'
      width='100%'
    >
      <Heading as='h1' size='md' cursor="none">
        <Link to='/'>Noita - Your Only Wand</Link>
      </Heading>
      <AuthButton />
    </Flex>
  );
}
