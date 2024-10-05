import React from 'react';
import OwnerList from './OwnerList'; 
import OwnerDemands from './OwnerDemands';
export default function OwnerDashboard({loginName}) {
  return (
    <div>
      
      <OwnerList loginName={loginName}/>
      <OwnerDemands loginName={loginName}/>
    </div>
  );
}
