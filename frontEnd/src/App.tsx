import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import ExpenseListPage from './pages/ExpenseListPage/ExpenseListPage'
import AuthPage from './pages/AuthPage/AuthPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* <Route index element={<ExpenseListPage/>}></Route> */}
          <Route index element={<AuthPage/>}></Route>
          <Route path='auth' element={<AuthPage/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
