import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const QueryWrapper = () => {
  const queryClient = new QueryClient();
  return(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <QueryWrapper/>
  </React.StrictMode>,
)