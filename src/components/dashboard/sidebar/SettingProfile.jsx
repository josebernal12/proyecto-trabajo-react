import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import clientAxios from '../../../config/clientAxios'
import { AlertaGreat } from '../../alertaGreat/AlertaGreat'
import { OneError } from '../../errors/OneError'

export const SettingProfile = () => {
  const { auth, setAuth } = useAuth()
  const [name, setName] = useState(auth.contribuyente)
  const [rfc, setRfc] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [alertBgGreen, setAlertBgGreen] = useState('')
  const [typePerson, setTypePerson] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if ([name, password, repeatPassword].includes('')) {
      setError('todos los campos son obligatorios')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    if (password !== repeatPassword) {
      setError('los password son incorrectos')
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    setError('')
    const token = localStorage.getItem('token')
    if (!token) {
      setChecking(false)
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const { data } = await clientAxios.post(
        '/configurar-perfil',
        { contribuyente: name, password },
        config
      )
      setAuth(data)
      setAlertBgGreen('Perfil Modificado')
      setTimeout(() => {
        setAlertBgGreen('')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='shadow mb-5 bg-body-tertiary rounded p-5 w-50 mx-auto'
    >
      {error && <OneError alert={error} />}
      {alertBgGreen && <AlertaGreat alertBgGreen={alertBgGreen} />}
      <p className='my-4 text-center fs-3'>Configurar Perfil</p>
      <div className='campo'>
        <label htmlFor='nombre' className='form-label fs-3'>
          Contribuyente
        </label>
        <input
          type='text'
          id='nombre'
          className='form-control form-control-lg'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      {/* <div className='campo mt-3  '>
        <label htmlFor='rfc' className='form-label fs-3'>
          RFC
        </label>
        <input
          type='text'
          id='rfc'
          className='form-control form-control-lg'
          value={rfc}
          onChange={e => setRfc(e.target.value)}
        />
      </div>
      <div className='campo mt-3  '>
        <label htmlFor='email' className='form-label fs-3'>
          Email
        </label>
        <input
          type='text'
          id='email'
          className='form-control form-control-lg'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
     */}
      <div className='campo mt-3'>
        <label htmlFor='password' className='form-label fs-3'>
          Password
        </label>
        <input
          type='password'
          id='password'
          className='form-control form-control-lg'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='campo mt-3'>
        <label htmlFor='repetir-password' className='form-label fs-3'>
          Confirmar Password
        </label>
        <input
          type='password'
          id='repetir-password'
          className='form-control form-control-lg'
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
      </div>
      <input
        type='submit'
        className='btn btn-success my-5 fs-3 w-100'
        value='Configurar Perfil'
      />
    </form>
  )
}
