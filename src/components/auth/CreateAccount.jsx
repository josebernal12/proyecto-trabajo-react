import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com'
import { Error } from '../errors/Error'
import { AlertaGreat } from '../alertaGreat/AlertaGreat'
import clientAxios from '../../config/clientAxios'
export const CreateAccount = () => {
  const [name, setName] = useState('')
  const [rfc, setRfc] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState([])
  const [alertBgGreen, setAlertBgGreen] = useState('')
  const [typePerson, setTypePerson] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await clientAxios.post('/', {
        contribuyente: name,
        rfc,
        email,
        password,
        repeatPassword,
        persona: typePerson
      })
      if (data.error === true) {
        return setAlert(data.msg)
      }
      setAlert([])

      const templateParams = {
        to_name: name,
        email: email,
        from_name: 'procrecer',
        message: `${name} para confirmar la cuenta haz click en el siguiente enlace `,
        my_html: `<a href=http://localhost:5173/confirmar-cuenta/${data.msg.token}>Confirmar Cuenta</a>`
      }

      emailjs
        .send(
          'service_d1wwsmi',
          'template_sc614hq',
          templateParams,
          'Xz919CCqbZ5omJBF_'
        )
        .then(
          function (response) {
            console.log('SUCCESS', response, response.status, response.text)
          },
          function (error) {
            console.log('Faileed', error)
          }
        )

      setAlertBgGreen('te hemos enviado un email para Confirma tu cuenta')
      setName('')
      setPassword('')
      setEmail('')
      setRfc('')
      setRepeatPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='shadow p-3 mb-5 bg-body-tertiary rounded p-5 '
      >
        {alert && <Error alerta={alert} />}
        {alertBgGreen && <AlertaGreat alertBgGreen={alertBgGreen} />}
        <div className='d-flex justify-content-between my-5'>
          <div className='form-check'>
            <label className='form-check-label fs-4'>
              ¿Eres Persona fisica?
            </label>
            <input
              required
              className='form-check-input fs-4'
              name='persona'
              type='radio'
              value='F'
              onChange={e => setTypePerson(e.target.value)}
            />
          </div>
          <div className='form-check'>
            <label className='form-check-label fs-4'>
              ¿Eres Persona Moral?
            </label>
            <input
              required
              className='form-check-input fs-4'
              name='persona'
              type='radio'
              value='M'
              onChange={e => setTypePerson(e.target.value)}
            />
          </div>
        </div>

        <p className='my-4 text-center fs-3'>Crear Cuenta</p>
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
        <div className='campo mt-3  '>
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
          value='Crear Cuenta'
        />
        <div className='d-flex flex-column gap-4 align-items-center'>
          <Link to={'/'} className='text-decoration-none text-dark fs-4'>
            ¿ya tienes una cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </>
  )
}
