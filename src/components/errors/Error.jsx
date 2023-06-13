/* eslint-disable react/prop-types */
export const Error = ({ alerta }) => {
  return (
    <div className=''>
      {alerta.map((alert, i) => (
        <p
          className=' text-white text-uppercase text-center fw-bold bg-danger p-2 rounded fs-4'
          key={i}
        >
          {alert}
        </p>
      ))}
    </div>
  )
}
