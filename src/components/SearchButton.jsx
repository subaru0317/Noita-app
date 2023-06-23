import { Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchButton = ({ setSearch }) => {
  return (
    <Button
      onClick={() => setSearch(true)}
      colorScheme='green'
      size='md'
      leftIcon={<SearchIcon />}
    >
      Search
    </Button>
  );
}

export default SearchButton;
