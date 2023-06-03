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
import { useState, useCallback, memo, useEffect } from 'react';
import { addDocument } from "../firebase/firestore";
import SpellList from "./SpellList";
import { darken } from "polished";

const Overlay = () => (
  <ModalOverlay
    bg='blockAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

const SpellIcon = memo(({ spellpath }) => {
  return (
    <img 
      src={spellpath}
      alt='spell'
      style={{ borderRadius: '2px' }}
    />
  );
});

const SpellIconButton = memo(({spellpath, id, setSpells}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSpellButtonClick = useCallback(() => {
    setIsClicked(prev => !prev);
  }, []);

  useEffect(() => {
    if (isClicked) {
      setSpells((prev) => [...prev, id]);
    } else {
      setSpells((prev) => prev.filter((spellId) => spellId !== id));
    }
  }, [isClicked, setSpells, id]);

  const bgColor = isClicked ? "red" : "#4f4f4f";
  const hoverColor = darken(0.2, bgColor);

  return (
    <IconButton
      bg={bgColor}
      _hover={{ bg: hoverColor }}
      border="2px solid #931527"
      icon={<SpellIcon spellpath={spellpath} />}
      onClick={handleSpellButtonClick}
    />
  );
});


const SpellButtonBoard = ({setSpells}) => {
  return (
    SpellList.map((spell) => (
      <SpellIconButton spellpath={spell.path} id={spell.id} key={spell.id} setSpells={setSpells}/>
    ))
  )
};
    

const FilterModal = ({setSelectedSpells}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spells, setSpells] = useState([]);

  const handleFilter = () => {
    const selectedSpellPaths = spells.map(spellId => {
      const foundSpell = SpellList.find(spell => spell.id === spellId);
      return foundSpell ? foundSpell.path : null;
    }).filter(path => path !== null);

    setSelectedSpells(selectedSpellPaths);
    onClose();
  };
  // console.log(spells);
  return (
    <Box textAlign='right'>
      <Button 
        onClick={onOpen} colorScheme='blue' size='md'>
        Filter
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Overlay />
        <ModalContent maxW='600px'>
          <ModalHeader>Choose Spell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SpellButtonBoard setSpells={setSpells}/>
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