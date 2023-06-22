import { Button } from '@chakra-ui/react';

const SearchButton = ({ setSearch }) => {
  const handleSearch = () => {
    setSearch(true);
  };
  return (
    <Button onClick={handleSearch} colorScheme='green' size='md'>
      Search
    </Button>
  );
}

export default SearchButton;