import { useState } from 'react';
import {   Row , Col, Layout, Skeleton , Tag, Button} from 'antd';
import SearchPage from './components/searchPage';
import FilterMenu from './components/filterMenu';
import axiosInstance from '../axios';

import "./app.css";
import LogCard from './components/logCard';

const {  Sider, Content  } = Layout;
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [time ,setTime] = useState(0);
  const [hasMore , setHasMore] = useState(true);

  const fetchData = (value, filters, page , replace) => {
    // to check query time
   const startTime = performance.now();
    // to check and remove empty filters
    const filterKeys = Object.keys(filters);
    const filteredFilters = {};
    filterKeys.forEach((key) => {
      if (filters[key]) {
        filteredFilters[key] = filters[key];
      }
    }
    );
    setIsFetching(true);
    axiosInstance.get(`search?search=${value}&filter=${JSON.stringify(filteredFilters)}&page=${page}`).then((res) => {
      if(res.data.error){
        alert('oops! error occured. please try again');
        setIsFetching(false);
        setFilters({});
        setSearchTerm('');
      }
      if(res.data.data.length === 0 || res.data.data.length < 9){
        console.log("no more data");
        setHasMore(false);
        setData(prevData => [...prevData, ...res.data.data]);
      }
      if(replace){
        setData(res.data.data);
      }else {
        console.log("no replace");
        setData(prevData => [...prevData, ...res.data.data]);
      }
      setIsFetching(false);
      const endTime = performance.now();
      const duration = endTime - startTime; // in milliseconds
      setTime(duration);
    });
  };

  const fetchOnButtonClick = (value , filter , page = 1, replace = true) => {
    console.log(replace);
    fetchData(value, filter , page , replace);
  };
  const getTimeFormat = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString(); 
    return formattedDate
  }
  const copyToClipboard = async (text) => {
  const copyObject = {
    ...text,
    metadata: {
      parentResourceId: text.metadata || ''
    }
  }
    try {
      await navigator.clipboard.writeText(JSON.stringify(copyObject));
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const isObject = obj => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && Object.keys(obj).length > 0;
  }


  return (

    <Layout style={{
      height: '100vh',
      width: '100vw',
      overflow: 'none',
      position: "fixed",
      top: 0,
      left: 0,
    }}>
    <Sider width={50}   className="site-layout-background">
    </Sider>
    <Layout style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'row' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          maxWidth:'1000px',
        }}
      >
        <SearchPage  
        setSearchTerm={setSearchTerm}
        fetchData={fetchOnButtonClick}
        filters={filters}
        />
        {}
        <Row gutter={[16, 16]}>
        {
         (isFetching && data.length === 0) ? Array(10).fill(null).map((_, index) => <Skeleton key={index} active />) : null
        }
        </Row>
       {data.length> 0 ? (<div style={{
            alignSelf: 'flex-start',
            marginTop: '16px',
           }}> {!isFetching}showing top {data.length} result - found in {time/1000} sec . scroll down to see more</div>): null}
            {
          data.length === 0 && !isFetching &&(searchTerm || isObject(filters)) ? <div > <h1 className='center' >No data found</h1 > <br/> <span className='center'>did you press the apply button in filters or search?</span></div> : null
        }

           <LogCard
            data={data}
            copyToClipboard={copyToClipboard}
            getTimeFormat={getTimeFormat}
            fetchData={fetchOnButtonClick}
            searchValue={searchTerm}
            filters={filters}
            hasMore={hasMore}
           />
       
      
      </Content>
      <Content  
      className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          maxWidth:'400px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <div className='center'>
        <FilterMenu  
        searchValue={searchTerm}
        filters={filters}
        setFilters={setFilters}
        fetchOnButtonClick={fetchOnButtonClick}/>

        </div>
      </Content>
    </Layout>
  </Layout>
  )
}

export default App;
