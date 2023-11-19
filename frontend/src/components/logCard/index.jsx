import {   Row , Col, Layout, Skeleton , Tag, Button} from 'antd';
import { useState , useCallback , useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


const LogCard = ({ data ,  isLoading = false , hasMore = true,copyToClipboard , getTimeFormat ,fetchData ,searchValue, filters}) =>{
  const [page , setPage] = useState(1);

  const observerTarget = useRef(null);
  const observer = useRef(); // (*)
  
  const lastBookElementRef = useCallback(  // (*)
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible');
          setPage((prev) => prev + 1);
          fetchData(searchValue, filters, page + 1, false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchData, searchValue, filters, page]
  );


    return(
    
    <Row gutter={[16, 16]} className='center' style={{
        overflow: 'scroll',
        height: '80vh',
      }}>
        
        {
          data?.map((item , index) => {
            const isLastElement = data.length === index + 1;
            return(  isLastElement ? (<Col  key={item.id} ref={lastBookElementRef}>
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
              </Col>):
              (<Col  key={item.id}>
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
              </Col>));
            
})
        }
        {(data?.length > 0 && hasMore) ?( <div 
        className='card'
        > 
        <Skeleton active />
        </div>): null}
      </Row>);
}
export default LogCard;