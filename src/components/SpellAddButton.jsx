import React, { memo } from "react";
import { Box } from '@chakra-ui/react';
import SpellIcon from './SpellIcon';

const SpellAddButton = memo(({ spell, onAddToBoard }) => {
  return (
    <div
      onClick={() => { if (onAddToBoard) onAddToBoard(spell) }}
    >
      <SpellIcon
        spell={spell}
        size="35px"
      />
    </div>
  );
});

export default SpellAddButton;
