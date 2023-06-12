import { memo } from "react";
import { Image, Box } from "@chakra-ui/react";

const SpellIcon = memo(({ spellpath, bg="#4f4f4f", size="35px"}) => {
  return (
    <Box bg={bg} borderRadius="2px">
      <Image 
        src={spellpath}
        alt='spell'
        border="2px solid #931527"
        boxSize={size}
      />
    </Box>
  );
});

export default SpellIcon