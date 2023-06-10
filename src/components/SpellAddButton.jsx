import React, { memo } from "react";
import { Image } from '@chakra-ui/react';

const SpellAddButton = memo(({ spell, index, onSortEnd, onAddToBoard }) => {
  return (
    <Image
      boxSize="35px"
      bg="#4f4f4f"
      _hover={{ bg: "gray.900" }}
      border="2px solid #931527"
      src={spell.path}
      alt={spell.name}
      style={{ borderRadius: '2px' }}
      onClick={() => { if (onAddToBoard) onAddToBoard(spell) }}
    />
  );
});

export default SpellAddButton;
