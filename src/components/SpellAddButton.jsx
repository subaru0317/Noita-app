import React, { memo } from "react";
import { IconButton } from "@chakra-ui/react";
import SpellIcon from './SpellIcon';
import { darken } from "polished";

const SpellAddButton = memo(({ spell, onAddToBoard }) => {
  const bgColor = "#595959";
  const hoverColor = darken(0.2, bgColor);

  return (
    <IconButton
      aria-label="Add to board"
      icon={<SpellIcon spellName={spell.name} bg={bgColor} size="35px"/>}
      onClick={() => { if (onAddToBoard) onAddToBoard(spell) }}
      _hover={{ bg: hoverColor }}
      boxSize="35px"
      borderRadius="2px"
    />
  );
});

export default SpellAddButton;
