import { memo } from "react";
import { Box } from "@chakra-ui/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SpellIcon = memo(({ spellpath, bg="#4f4f4f", size="35px" }) => {
  return (
    <Box bg={bg} borderRadius="2px">
      <LazyLoadImage 
        src={spellpath}
        alt='spell'
        effect="blur"
        width={size}
        height="30px" // tmp
        style={{ border: "2px solid #931527", borderRadius: "2px" }}
      />
    </Box>
  );
});

export default SpellIcon;
