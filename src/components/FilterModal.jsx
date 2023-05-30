import { Button, Box, useDisclosure, IconButton } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from 'react';
import { addDocument } from "../firebase/firestore";
import SpellList from "./SpellList";

function getFileName(path) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export default function SortSelect() {
  console.log("Filter Modal");
  const Overlay = () => (
    <ModalOverlay
      bg='blockAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);
  const [clicked, setClicked] = useState(false);
  
  const SpellIconButton = ({spellpath}) => {
    const spellKey = getFileName(spellpath);

    const handleSpellButtonClick = () => {
      setClicked((prevState) => ({
        ...prevState,
        [spellKey]: !prevState[spellKey]
      }));
    };

    const bgColor = clicked[spellKey] ? "red" : "#4f4f4f";

    return (
      <IconButton
        bg={bgColor}
        _hover={{ bg: "gray.900" }}
        border="2px solid #931527"
        icon={<img 
          src={spellpath}
          alt='spell'
          style={{ borderRadius: '2px' }}
        />}
        onClick={handleSpellButtonClick}
      />
    );
  }

  // まだ作ってないよ
  const handleFilter = () => {
    console.log("handleFilter pushed");
    // addDocument();
  };

  return (
    <Box textAlign='right'>
      <Button 
        onClick={() => {
          setOverlay(<Overlay />)
          onOpen()
        }} colorScheme='blue' size='md'>
        Filter
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent maxW='600px'>
          <ModalHeader>Choose Spell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {SpellList.map((spell) => (
              <SpellIconButton spellpath={spell.path} key={spell.id} />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>Close</Button>
            <Button colorScheme='blue' mr={3} onClick={handleFilter}>Filter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
