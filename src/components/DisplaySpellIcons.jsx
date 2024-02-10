import { Flex, Text, VStack } from '@chakra-ui/react';
import SpellIcon from "./SpellIcon";

const DisplaySpellIcons = ({ spells }) => {
  return (
    <VStack alignItems="flex-start">
      <Flex wrap="wrap" gap={1}>
        <Text>Spell: </Text>
        {spells.map((spell, index) => {
          return (
            <SpellIcon spellName={spell.name} key={index}  />
          );
        })}
      </Flex>
    </VStack>
  );
};

export default DisplaySpellIcons;
