import { Flex, Text, VStack } from '@chakra-ui/react';
import SpellIcon from "./SpellIcon";

const DisplaySpellIcons = ({ spells }) => {
  return (
    <VStack alignItems="flex-start">
      <Flex wrap="wrap" gap={1}>
        <Text>Spell: </Text>
        {spells.map(spell => {
          return (
            <SpellIcon spell={spell} key={spell.id}  />
          );
        })}
      </Flex>
    </VStack>
  );
};

export default DisplaySpellIcons;
