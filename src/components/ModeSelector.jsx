import { Radio, RadioGroup, Stack, Tooltip, HStack, Text, VStack } from '@chakra-ui/react';
import { InfoIcon } from "@chakra-ui/icons";

const FilterSpellMode = ({ mode, setMode }) => {
  return (
    <HStack mt={4} align="start" spacing={3}>
      <HStack spacing={1}>
        <Text>Mode</Text>
        <Tooltip 
          label="OR mode will match any of the selected spells. AND mode will match all of the selected spells." 
          fontSize="md"
          placement="top"
        >
          <InfoIcon boxSize={4} color="gray.500" transform="translateY(1px)" />
        </Tooltip>
        <Text> : </Text>
      </HStack>
      <RadioGroup onChange={setMode} value={mode}>
        <Stack direction="row">
          <Radio value="OR">OR</Radio>
          <Radio value="AND">AND</Radio>
        </Stack>
      </RadioGroup>
    </HStack>
  );
};

export default FilterSpellMode;
