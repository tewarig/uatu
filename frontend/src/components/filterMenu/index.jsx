import { Menu , DatePicker, Input , Button} from 'antd';

const { RangePicker } = DatePicker; 

const convertToUnixTimeStamp = (date) => {
  var date = new Date(date);
  var timestamp = date.getTime();
  return timestamp;
}
const FilterMenu = ({ searchValue, filters, setFilters , fetchOnButtonClick}) => (
  <Menu
    style={{ width: 300 , borderRadius: `8px` , padding: '8px' , height: "500px" }}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    mode="inline"
  >
  
    <h1>Filters</h1>
    <div style={{ display: "flex" , gap: "16px" , flexDirection: "column" , paddingTop: "8px"}}>
    <Input 
    placeholder="error or success" 
    addonBefore="level"
    onChange={(e)=>{
      setFilters({...filters , level: e.target.value})
    }} />
    <Input 
    placeholder="Failed to connect to DB " 
    addonBefore="message" 
    onChange={(e)=>{
      setFilters({...filters , message: e.target.value})
    }}
    />
    <Input 
    placeholder="server-1234"
    addonBefore="Resource Id"
    onChange={(e)=>{
      setFilters({...filters , resourceId: e.target.value})
    }}
    />
    <Input 
    placeholder="abc-xyz-123" 
    addonBefore="Trace Id" 
    onChange={(e)=>{
      setFilters({...filters , traceId: e.target.value})
    }}
    />
    <Input
     placeholder="span-456"
     addonBefore="Span Id" 
     onChange={(e)=>{
      setFilters({...filters , spanId: e.target.value})
     }}
     />
    <Input 
    placeholder="5e5342f" 
    addonBefore="Commit" 
    onChange={
      (e)=>{
        setFilters({...filters , commit: e.target.value})
      }
    }
    />
    <Input 
    placeholder='server-122' 
    addonBefore="parent Resource Id" 
    onChange={
      (e)=>{
        setFilters({...filters , metadata: e.target.value})
      }
    }
    />
    < RangePicker 
    onChange={
      ([from , to])=>{
        setFilters({...filters , timestamp: {from: convertToUnixTimeStamp(from.$d) , to: convertToUnixTimeStamp(to.$d)}})
      }
    }
    />
    <Button type="primary" onClick={()=>{
      fetchOnButtonClick(searchValue , filters)
    }}>Apply</Button>
    </div>  
  </Menu>
);
export default FilterMenu;