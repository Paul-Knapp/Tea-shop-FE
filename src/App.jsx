import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './HomePage/Homepage.jsx';
import SubscriptionDetails from './SubscriptionDetails/SubscriptionDetails.jsx';

function App() {
  return (
    <Routes>
      <Route path="/subscription/:subscriptionId" element={<SubscriptionDetails/>}/>
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App
