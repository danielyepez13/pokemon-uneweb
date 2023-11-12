import { useDispatch} from 'react-redux'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import ButtonLink from "../buttonLink/ButtonLink"
import { getName } from '../../redux/actions'
import title from "../../img/pokemon-title.png"
import "./Nav.css"
const Nav = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  
  const sendName = (e) => {
    e.preventDefault();
    dispatch(getName(search))
    setSearch("")
    navigate("/home")
  }

  return (
    <div className='nav'>
      <div className="img-nav">
        <NavLink to="/">
          <img src={title} alt="" width={650} height={215} />
        </NavLink>
      </div>
      <nav>
        <ul className="buttons">
          <li className="btn">
            <ButtonLink dir="/home" name="Home" />
          </li>
          <li className="btn">
            <ButtonLink dir="/form" name="Register" />
          </li>
          <li className="btn">
            <ButtonLink dir="/generator" name="Teams generator" />
          </li>
        </ul>
        <form className="input" onSubmit={sendName}>
          <input type="text" placeholder="Search Pokemon..." value={search} onChange={handleChange} /> 
          <button>Search</button>
        </form>
      </nav>
    </div>
  )
}

export default Nav