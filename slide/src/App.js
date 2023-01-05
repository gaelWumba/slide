import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Chat from './screens/Chat'
import Slide from './screens/Slide'
import Room from './screens/Room'
import Sld from './screens/Sld'


function App() {

  return (
    <Routes>
      {/* <Route path='/' element={<Room />} /> */}
      <Route path='/' element={<Slide />} />
      <Route path='/Chat' element={<Chat />} />
      <Route path='/Room' element={<Room />} />
      <Route path='/Sld' element={<Sld />} />
      <Route path='*' element={<div>not found</div>} />
    </Routes>
  )
}
export default App











// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Chat from './screens/Chat'
// import Slide from './screens/Slide'
// import Room from './screens/Room'


// function App() {

//   return (
//     <Routes>
//       {/* <Route path='/' element={<Room />} /> */}
//       <Route path='/' element={<Slide />} />
//       <Route path='/Chat' element={<Chat />} />
//       <Route path='*' element={<div>not found</div>} />
//     </Routes>
//   )
// }
// export default App