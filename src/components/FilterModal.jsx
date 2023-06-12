import { Button, Box, useDisclosure, IconButton, Radio, RadioGroup, Stack, Text, Tooltip, VStack, HStack } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useCallback, memo, useEffect } from 'react';
import { darken } from "polished";
import SpellIcon from "./SpellIcon";
import SpellList from "./SpellList";

const Overlay = () => (
  <ModalOverlay
    bg='blockAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
  />
)

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
      _hover={{ bg: hoverColor }}
      icon={<SpellIcon spellpath={spellpath} bg={bgColor}/>}
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

const FilterModal = ({setSelectedSpells, setFilterMode}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spells, setSpells] = useState([]);
  const [value, setValue] = useState("OR");
  const [displaySpells, setDisplaySpells] = useState(spells);
  const [displayMode, setDisplayMode] = useState();

  const handleFilter = () => {
    // TODO: handle the filtering based on the selected value (OR or AND)

    const selectedSpellPaths = spells.map(spellId => {
      const foundSpell = SpellList.find(spell => spell.id === spellId);
      return foundSpell ? foundSpell.path : null;
    }).filter(path => path !== null);

    setSelectedSpells(selectedSpellPaths);
    setFilterMode(value);
    setDisplaySpells(spells);
    setDisplayMode(value);
    onClose();
  };
  return (
    <Box textAlign='left' mt={4} mb={4} px={12}>
    <HStack spacing={4}>
      <Button onClick={onOpen} colorScheme='blue' size='md'>Filter</Button>
      <VStack alignItems="flex-start">
        <HStack>
        <Text>Spell: </Text>
            {displaySpells.map(spellId => {
              const spell = SpellList.find(item => item.id === spellId);
              return (
                <SpellIcon key={spellId} spellpath={spell.path} />
              );
            })}
        </HStack>
        <Text>Mode: {displayMode}</Text>
      </VStack>
    </HStack>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <Overlay />
        <ModalContent maxW='600px'>
          <ModalHeader>Choose Spell</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SpellButtonBoard setSpells={setSpells}/>
            <VStack mt={4} align="start" spacing={3}>
              <HStack spacing={1}>
                <Text>Filtering Mode</Text>
                <Tooltip label="OR mode will match any of the selected spells. AND mode will match all of the selected spells." 
                          fontSize="md"
                          placement="top">
                  <InfoIcon boxSize={4} color="gray.500" transform="translateY(1px)"/>
                </Tooltip>
              </HStack>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row">
                  <Radio value="OR">OR</Radio>
                  <Radio value="AND">AND</Radio>
                </Stack>
              </RadioGroup>
            </VStack>
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