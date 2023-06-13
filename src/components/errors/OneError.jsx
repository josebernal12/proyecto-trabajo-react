/* eslint-disable react/prop-types */
export const OneError = ({ alert }) => {
  return (
    <div>
      <p className=" text-white text-uppercase text-center fw-bold bg-danger p-2 rounded fs-4">
        {alert}
      </p>
    </div>
  );
};
