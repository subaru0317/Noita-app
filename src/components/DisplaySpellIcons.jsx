import { HStack, Text, VStack } from '@chakra-ui/react';
import SpellIcon from "./SpellIcon";

const DisplaySpellIcons = ({ spells }) => {
  return (
    <VStack alignItems="flex-start">
      <HStack>
        <Text>Spell: </Text>
        {spells.map(spell => {
          return (
            <SpellIcon spell={spell} key={spell.id}  />
          );
        })}
      </HStack>
    </VStack>
  );
};

export default DisplaySpellIcons;
