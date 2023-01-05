import React from 'react'

function Users() {
  return (
    <div className='d-flex flex-col' style={{overflow: 'auto', height: '80%', margin: '10px'}}>
      <h4 className="p-2 rounded " style={{padding: '10px', marginLeft: '20px', backgroundColor: '#FF6464', color: 'white'}}>@UserName</h4>
    </div>
  )
}

export default Users