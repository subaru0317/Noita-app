import { memo } from "react";
import { Image } from "@chakra-ui/react";
import SpellList from "./SpellList";

const SpellIcon = memo(({ spellName, bg="#595959", size="35px" }) => {
  const findSpellbyName = (name) => {
    return SpellList.find(spell => spell.name === name);
  }
  const spell = findSpellbyName(spellName);
  let borderColor;
  switch (spell.type) {
    case 'projectile':
      borderColor = "#5A2323";
      break;
    case 'static_projectile':
      borderColor = "#8D3F18";
      break;
    case 'passive':
      borderColor = "#212F26";
      break;
    case 'utility':
      borderColor = "#7B2A74";
      break;
    case 'projectile_modifier':
      borderColor = "#2D3A72";
      break;
    case 'material':
      borderColor = "#356F44";
      break;
    case 'multicast':
      borderColor = "#1C6D73";
      break;
    case 'other':
      borderColor = "#714B33";
      break;
    default:
      borderColor = "#714B33";
  }

  return (
    <Image
      src={spell.path}
      alt={spell.name}
      boxSize={size}
      loading="lazy"
      borderRadius="2px"
      borderStyle="solid"
      borderColor={borderColor}
      borderWidth="3px"
      bg={bg}
    />
  );
});

export default SpellIcon;
