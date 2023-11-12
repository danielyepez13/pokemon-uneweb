/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getDetail, deletePokemon, resetDetail } from '../../redux/actions';
import backgroundTypes from '../../utils/backgroundTypes';
import typeColor from '../../utils/typeColor';
import "./Detail.css"

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const detail = useSelector(state => state.detailPokemon);
  if (detail.stat?.id) delete detail.stat.id

  const deleteSuccess = useSelector(state => state.deleteSuccess);
  const [curiosity, setCuriosity] = useState(false)
  const showCuriosity = () => {
    setCuriosity(!curiosity)
  }

  const typeName = (detail.types) ? detail.types[0].name : "";

  function onDelete() {
    dispatch(deletePokemon(id))
  }

  useEffect(() => {
    dispatch(getDetail(id))
    if (deleteSuccess) navigate("/home")
    return () => {
      dispatch(resetDetail())
    }
  }, [deleteSuccess, dispatch, id])

  return (
    <div className="details">
      <div className='detailCard' style={{ background: `url(${backgroundTypes(typeName)}) no-repeat center bottom` }}>
        <div className="img">
          <img src={detail.image} alt={`Image of ${detail.name}`} style={{ width: 300 }} />
          <img src={detail?.imageShiny} alt={`Image of ${detail.name} shiny version`} style={{ width: 300 }} />
        </div>
        <div className='detailInfo'>
          <div className="caracteristics">
            <h2>{detail.name}</h2>
            <div className="typesDetail">
              {
                detail?.types &&
                detail.types.map((type, index) => (
                  <span key={index} className='type' style={{ background: `${typeColor[(type.name)]}` }}>
                    {type.name}
                  </span>
                ))
              }
            </div>
            <h4 className='idDetail'>id: {id}</h4>
          </div>
          <div className='stats-detail'>
            {
              detail?.stat &&
              Object.keys(detail.stat).map((item, i) => {
                return (
                  <div key={i} className='stat-info'>
                    <b>{item}</b>
                    <span>{detail.stat[item]}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="extra-details">
        <div className="curiosity">
          <span onClick={showCuriosity}>¿What is a <b>Shiny</b> Pokemon?</span>
          {
            curiosity && (
              <p className='text-shiny'>
                A <b>Shiny</b> it is a Pokemon with a different color than the ones its <b>species</b> usually has.</p>
            )
          }
        </div>
        {
          isNaN(Number(detail.id)) && (
            <div className="options">
              <button className='btnDelete' onClick={onDelete}>Delete</button>
              <NavLink to={`/form/${detail.id}`} className='btnUpdate'>
                Update
              </NavLink>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Detail