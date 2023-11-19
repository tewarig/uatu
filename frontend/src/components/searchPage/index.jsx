import { Input } from 'antd';

const { Search } = Input;

const SearchPage = ({ 
    setSearchTerm,
    fetchData,
    filters
}) => {
  const onSearch = value => {
    console.log(value);
    setSearchTerm(value);
    fetchData(value,filters);
  }

  return (
    <Search
      placeholder="start search with a keyword  error ,connected to DB ,span-456 , etc" 
      enterButton="Search"
      size="large"
      width={'800px'}
      onChange={(e)=>{
        e.keyCode === 13 && onSearch(e.target.value)
      }}
      onSearch={onSearch}
    />
  );
};

export default SearchPage;
