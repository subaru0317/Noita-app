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
import { useState, useCallback, useReducer, memo, useMemo } from 'react';
import { addDocument } from "../firebase/firestore";
import SpellList from "./SpellList";

const Overlay = () => (
  <ModalOverlay
    bg='blockAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

const FilterModal = () => {
  const Overlay = () => (
    <ModalOverlay
      bg='blockAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const overlay = <Overlay />
  // const [overlay, setOverlay] = useState(<Overlay />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const SpellIcon = memo(({ spellpath }) => {
    return (
      <img 
        src={spellpath}
        alt='spell'
        style={{ borderRadius: '2px' }}
      />
    );
  });

  const SpellIconButton = memo(({spellpath, id}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleSpellButtonClick = useCallback(() => {
      setIsClicked(prev => !prev);
    }, []);

    const bgColor = isClicked ? "red" : "#4f4f4f";

    console.log("IconButton");
    return (
      <IconButton
        bg={bgColor}
        _hover={{ bg: "gray.900" }}
        border="2px solid #931527"
        icon={<SpellIcon spellpath={spellpath} />}
        onClick={handleSpellButtonClick}
      />
    );
  });

  // まだ作ってないよ
  const handleFilter = () => {
    // console.log("handleFilter pushed");
    // addDocument();
  };

  return (
    <Box textAlign='right'>
      <Button onClick={onOpen} colorScheme='blue' size='md'>
        Filter
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent maxW='600px'>
          <ModalHeader>Choose Spell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {SpellList.map((spell) => (
              <SpellIconButton spellpath={spell.path} id={spell.id} key={spell.id} />
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

export default FilterModal;