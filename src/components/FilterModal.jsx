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
import { useState, useCallback, useReducer, memo } from 'react';
import { addDocument } from "../firebase/firestore";
import SpellList from "./SpellList";

function getFileName(path) {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

const clickedReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SPELL":
      return { ...state, [action.spellKey]: !state[action.spellKey]}
    default:
      return state;
  }
};

const FilterModal = () => {
  const Overlay = () => (
    <ModalOverlay
      bg='blockAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);
  // const [clicked, setClicked] = useState(false);
  const [clicked, dispatch] = useReducer(clickedReducer, {});
  
  const SpellIconButton = memo(({spellpath}) => {
    const spellKey = getFileName(spellpath);

    const handleSpellButtonClick = useCallback(() => {
      dispatch({ type: 'TOGGLE_SPELL', spellKey });
      // setClicked((prevState) => ({
      //   ...prevState,
      //   [spellKey]: !prevState[spellKey]
      // }));
    }, [spellKey]);

    const bgColor = clicked[spellKey] ? "red" : "#4f4f4f";
    console.log("IconButton");
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
  });

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

export default FilterModal;