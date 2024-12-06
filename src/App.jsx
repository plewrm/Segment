import React, { useState } from 'react'
import SaveSegmentPage from './components/SaveSagementPage'
import DrawerAppBar from './components/NavigationBar'

function App() {

  return (
    <>
      <div>
        <DrawerAppBar/>
        <SaveSegmentPage/>
       </div>
    </>
  )
}


export default App
