import React, { memo } from "react";
import { Box } from '@chakra-ui/react';
import SpellIcon from './SpellIcon';

const SpellAddButton = memo(({ spell, onAddToBoard }) => {
  return (
    <Box
      bg="#4f4f4f"
      _hover={{ bg: "gray.900" }}
      style={{ borderRadius: '2px' }}
      onClick={() => { if (onAddToBoard) onAddToBoard(spell) }}
    >
      <SpellIcon
        spell={spell}
        size="35px"
      />
    </Box>
  );
});

export default SpellAddButton;
