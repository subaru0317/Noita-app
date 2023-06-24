import { Button, useDisclosure, IconButton, Icon } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useState, useCallback, memo, useEffect } from 'react';
import { darken } from "polished";
import SpellIcon from "./SpellIcon";
import SpellList from "./SpellList";
import { GiBoltSpellCast } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";

const Overlay = () => (
  <ModalOverlay
    bg='rgba(0, 0, 0, 0.5)'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

const SpellIconButton = memo(({spell, setSpells}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleSpellButtonClick = useCallback(() => {
    setIsClicked(prev => !prev);
  }, []);

  useEffect(() => {
    if (isClicked) {
      setSpells((prev) => [...prev, spell.id]);
    } else {
      setSpells((prev) => prev.filter((spellId) => spellId !== spell.id));
    }
  }, [isClicked, setSpells, spell.id]);

  const bgColor = isClicked ? "red" : "#595959";
  const hoverColor = darken(0.2, bgColor);

  return (
    <IconButton
      _hover={{ bg: hoverColor }}
      icon={<SpellIcon spell={spell} bg={bgColor}/>}
      onClick={handleSpellButtonClick}
    />
  );
});

const SpellButtonBoard = ({setSpells}) => {
  return (
    SpellList.map((spell) => (
      <SpellIconButton spell={spell} key={spell.id} setSpells={setSpells}/>
    ))
  )
};

const FilterModal = ({ setSelectedSpells }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spells, setSpells] = useState([]);

  const handleApply = () => {
    const selectedSpells = spells.map(spellId => {
      const foundSpell = SpellList.find(spell => spell.id === spellId);
      return foundSpell;
    }).filter(spell => spell !== null);

    setSelectedSpells(selectedSpells);
    onClose();
  };

  return (
    <>
      <Button 
        onClick={onOpen} 
        colorScheme='blue' 
        size='md' 
        // leftIcon={<Icon as={GiBoltSpellCast} boxSize={6} />}
        leftIcon={<Icon as={GiSpellBook} boxSize={6} />}
      >
        Select Spell
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
            <Button colorScheme='blue' mr={3} onClick={handleApply}>Apply</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterModal;