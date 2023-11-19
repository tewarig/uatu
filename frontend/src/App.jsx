import { useState } from 'react';
import {   Row , Col, Layout, Skeleton , Tag, Button} from 'antd';
import SearchPage from './components/searchPage';
import FilterMenu from './components/filterMenu';
import axiosInstance from '../axios';

import "./app.css";

const {  Sider, Content  } = Layout;
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [time ,setTime] = useState(0);
  const fetchData = (value, filters) => {
    // to check query time
    setTime(Date.now());
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
    setData([]);
    axiosInstance.get(`search?search=${value}&filter=${JSON.stringify(filteredFilters)}`).then((res) => {
      setData(res.data.data);
      setIsFetching(false);
      setTime(prevTime => Date.now() - prevTime);
    });
  };
 console.log(filters);

  const fetchOnButtonClick = (value , filter) => {
    fetchData(value, filter);
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
        <Row gutter={[16, 16]}>
        {
          isFetching ? Array(10).fill(null).map((_, index) => <Skeleton key={index} active />) : null
        }
        </Row>
        <div style={{
            alignSelf: 'flex-start',
            marginTop: '16px',
           }}> {!isFetching} {data.length} result found - in {time/1000} sec</div>
       
        <Row gutter={[16, 16]} className='center' style={{
          overflow: 'scroll',
          height: '80vh',
        }}>

          {
            data.map((item) => (
              <Col  key={item.id}>
                <div className="card">
                  <div>
                  <Tag color={item.level === "error" ? "red": "blue"}>{item.level}</Tag>
                  <Tag color="grey">{item.message}</Tag>
                  <Button onClick={()=>{copyToClipboard(item)}}> Copy log </Button>
                  </div>

                  <p>message:{item.message}</p>
                  <p>resourceId: {item.resourceId} </p>
                  <p>timestamp: {item.timestamp} -  <Tag>{getTimeFormat(item.timestamp)}</Tag>  </p>
                  <p>traceId: {item.traceId} </p>
                  <p>spanId: {item.spanId} </p>
                  <p>commit: {item.commit} </p>
                  <p>metadata.parentResourceId: {item.metadata} </p>
                </div>
              </Col>
            ))
          }
        </Row>
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
