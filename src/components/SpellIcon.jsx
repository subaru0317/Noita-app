import { memo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SpellIcon = memo(({ spell, bg="#595959", size="35px" }) => {
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
      <LazyLoadImage 
        src={spell.path}
        alt={spell.name}
        effect="blur"
        width={size}
        height={size}
        style={{
          border: `3px solid ${borderColor}`,
          borderRadius: "2px",
          backgroundColor: bg,
        }}
      />
  );
});

export default SpellIcon;
