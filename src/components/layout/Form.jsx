import { Outlet } from 'react-router-dom'
export const Form = () => {
  return (
    <>
      <header className='py-5'>
        <h1 className='text-center'>Procrecer</h1>
      </header>

      <div className='container-xl formulario'>
      
          <Outlet />
       
      </div>
    </>
  )
}
