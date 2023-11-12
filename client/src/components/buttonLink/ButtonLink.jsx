import { NavLink } from "react-router-dom"
const ButtonLink = ({ name, dir }) => {
  return (
    <>
      <NavLink to={dir}>
        { name }
      </NavLink>
    </>
  )
}

export default ButtonLink