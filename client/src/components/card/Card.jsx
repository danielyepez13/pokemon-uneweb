import { useDispatch, useSelector } from "react-redux";
import { addTeam, deleteTeam, errorLengthTeam } from "../../redux/actions";
import ButtonLink from "../buttonLink/ButtonLink"
import typeColor from "../../utils/typeColor";
import plus from "../../img/plus.png"
import minus from "../../img/minus.png"
import "./Card.css";


const Card = ({ id, name, image, types, hp, attack, defense, speed, selected }) => {
  const dispatch = useDispatch();
  const enableAdd = useSelector(state => state.enableAdd);
  const members = useSelector(state => state.idMembers)
  const include = members.find(pokemonId => pokemonId === Number(id));
  const nameType = types[0].name;
  const themeColor = typeColor[nameType];

  const onAdd = () => {
    if(members.length === 6){
      dispatch(errorLengthTeam())
      return;
    }
    dispatch(addTeam(id));
  }

  const onDelete = () => {
    dispatch(deleteTeam(id));
  }

  return (
    <>
      <div className="card" style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%`, boxShadow: (selected) ? `0 4px 20px 2px ${themeColor}` : "" }}>
        <p className="hp">
          <span>HP</span>
          {hp}
        </p>
        <img src={image} style={{ width: 200 }} />
        <h2 className="poke-name"> <ButtonLink name={name} dir={`../detail/${id}`} />
          {
            enableAdd ? (!include) ? <div className="addCard" onClick={onAdd} title="Añadir">
              <img src={plus} alt="" width={50} />
            </div> : <div className="deleteCard" onClick={onDelete} title="Quitar">
              <img src={minus} alt="" width={50} />
            </div> : ""
          }
        </h2>
        <div className="types">
          {
            types.map((type, index) => {
              return (
                <span key={index} style={{ background: `${typeColor[(type.name)]}` }}>
                  {type.name}
                </span>
              )
            })
          }
        </div>
        <div className="stats">
          <div>
            <h3>{attack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{defense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{speed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card