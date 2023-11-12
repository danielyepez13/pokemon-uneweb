/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { getTypes, getPoks, setPokemon, resetAlerts, getDetail, updatePokemon } from "../../redux/actions"
import FormField from "../../components/form/FormField"
import typeColor from "../../utils/typeColor"
import "./Form.css"

const Form = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const pokemonState = useSelector(state => state.pokemonFiltered);
  const typesGlobal = useSelector(state => state.types);
  const success = useSelector(state => state.msg_success);
  const error = useSelector(state => state.error_form)
  const {stat, ...pokemon} = useSelector(state => state.detailPokemon);
  const detalle = {...pokemon, ...stat };

  const typesName = typesGlobal.map(type => {
    return type.name
  })

  const dataPokemon = {
    name: "",
    image: "",
    imageShiny: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  }
  const [disable, setDisable] = useState(false);
  const [formState, setFormState] = useState(dataPokemon);
  const [errors, setErrors] = useState({});
  

  // Escoger Tipos
  const [selectType, setSelectType] = useState("")
  const [types, setTypes] = useState({ type1: "", type2: "" })

  const handleType = (e) => {
    const { value } = e.target;

    if (validateType(value)) {
      setTypes((prevTypes) => {
        if (prevTypes.type1 === "") {
          return { ...prevTypes, type1: value };
        } else if (prevTypes.type2 === "") {
          return { ...prevTypes, type2: value };
        }
        return prevTypes;
      });
      setSelectType(value);
    }
  };

  const validateType = (value) => {
    let error = "";
    if (types.type1 === value || types.type2 === value) {
      error = "You cannot choose a type that has already been previously established";
    }

    if (types.type1 !== "" && types.type2 !== "") {
      error = "You can only choose two types";
    }

    setErrors({ ...errors, "types": error });
    return error === "";
  };

  // borrar seleccion
  const deleteType = (delType) => {
    if (delType === types.type1) setTypes({ ...types, type1: "" })
    else setTypes({ ...types, type2: "" })
    setSelectType(0)
  }

  const detailTypes = () => {
    const updatedTypes = detalle.types?.map((type, index) => {
      const tipoKey = index === 0 ? "type1" : "type2";
      return { [tipoKey]: type.name };
    });

    const combinedTypes = updatedTypes?.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    if (combinedTypes?.type2) {
      setTypes(combinedTypes);
    } else {
      setTypes({ ...combinedTypes, type2: "" });
    }
  }

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (value === "") {
          error = "The name is required";
        } else if (!/^[a-z\s]*$/.test(value)) {
          error = "Only letters (lowercase) are accepted";
        }
        break;
      case "image":
        if (value === "") {
          error = "The image is required";
        }
        break;
      case "hp":
        if (Number(value) === 0) {
          error = "The hp is required";
        } else if (Number(value) < 5 || Number(value) > 256) {
          error = "The hp must be greater than or equal to 5 and less than or equal to 255";
        }
        break;
      case "attack":
        if (Number(value) === 0) {
          error = "The attack is required";
        } else if (Number(value) < 5 || Number(value) > 256) {
          error = "The attack must be greater than or equal to 5 and less than or equal to 255";
        }
        break;
      case "defense":
        if (Number(value) === 0) {
          error = "The defense is required";
        } else if (Number(value) < 5 || Number(value) > 256) {
          error = "The defense must be greater than or equal to 5 and less than or equal to 255";
        }
        break;
      case "speed":
        if (Number(value) < 5 || Number(value) > 256) {
          error = "The speed must be greater than or equal to 5 and less than or equal to 255";
        }
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
    const hasErrors = Object.values({ ...errors, [name]: error }).some(
      (error) => error !== ""
    );
    setDisable(hasErrors);
  };

  const handleChange = (e) => {
    if (error) dispatch(resetAlerts("error_form"));
    if (success) dispatch(resetAlerts("msg_success"));
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
    validateField(name, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      dispatch(updatePokemon({
        ...formState,
        type1: types.type1,
        type2: types.type2
      }))
    } else {
      dispatch(setPokemon({
        ...formState,
        type1: types.type1,
        type2: types.type2
      }))
    }
  }

  useEffect(() => {
    if (!pokemonState.length) dispatch(getPoks())
    if (!typesGlobal.length) dispatch(getTypes());
    if (error) setDisable(true)
    else setDisable(false)

    if (success && !id) {
      setFormState(dataPokemon)
      setTypes({ type1: "", type2: "" })
      setSelectType(0)
    }

    if (id && !success) {
      dispatch(getDetail(id))
      setFormState(detalle)
      detailTypes()
    }

    return () => {
      if (error) dispatch(resetAlerts("error_form"));
      if (success) dispatch(resetAlerts("msg_success"));
    }
  }, [dispatch, error, success, id])

  return (
    <div className="register">
        {
        success ? <div className="alert-form alert-form-success">The process has been carried out successfully</div> :
          error ? <div className="alert-form alert-form-danger"> {error} </div> : ""
        }
      <div className="required">
        <strong>*</strong> indicate that a field is required
      </div>
      <form onSubmit={handleSubmit} className="registerPokemon">
        <div className="characteristics">
          <FormField
            required={true}
            nameLabel="Pokemon Name"
            name="name"
            type="text"
            value={formState.name}
            error={errors.name}
            handleChange={handleChange}
          />

          <FormField
            required={true}
            nameLabel="Pokemon Image"
            name="image"
            type="text"
            value={formState.image}
            error={errors.image}
            handleChange={handleChange}
          />

          <FormField
            nameLabel="Pokemon Shiny Image"
            name="imageShiny"
            type="text"
            value={formState.imageShiny}
            handleChange={handleChange}
          />
        </div>

        <div className="input-stats">

          <FormField
            required={true}
            nameLabel="HP"
            name="hp"
            type="number"
            value={formState.hp}
            error={errors.hp}
            handleChange={handleChange}
          />

            <FormField
            required={true}
            nameLabel="Attack"
            name="attack"
            type="number"
            value={formState.attack}
            error={errors.attack}
            handleChange={handleChange}
          />

          <FormField
            required={true}
            nameLabel="Defense"
            name="defense"
            type="number"
            value={formState.defense}
            error={errors.defense}
            handleChange={handleChange}
          />

          <FormField
            nameLabel="Speed"
            name="speed"
            type="number"
            error={errors.speed}
            value={formState.speed}
            handleChange={handleChange}
          />

          <FormField
            nameLabel="Height"
            name="height"
            type="number"
            value={formState.height}
            handleChange={handleChange}
          />

          <FormField
            nameLabel="Weight"
            name="weight"
            type="number"
            value={formState.weight}
            handleChange={handleChange}
          />
        </div>

        <div className="typesForm">
          <div className="inputGroup">
            <label htmlFor="">Types <strong>*</strong> </label>
            <select name="selectTypes" id="" onChange={handleType} value={selectType}>
              <option value="0" >By deafult</option>
              {
                typesName.map(type => {
                  return (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
        {errors.types && <span className="errorType">{errors.types}</span>}


        <div className="buttonTypes">
          {
            types?.type1 && (
              <p onClick={() => deleteType(types.type1)} style={{
                background: `${typeColor[types.type1]}`,
                boxShadow: `0 2px 6px 1px ${typeColor[types.type1]}`
              }} > {types.type1} </p>
            )
          }

          {
            types?.type2 && (
              <p onClick={() => deleteType(types.type2)} style={{
                background: `${typeColor[types.type2]}`,
                boxShadow: `0 2px 6px 1px ${typeColor[types.type2]}`
              }}> {types.type2} </p>
            )
          }

        </div>

        <input type="submit" value="Register" disabled={disable} className={`submitRegister ${disable ? "disabled-submit" : ""}`} />
      </form>

    </div>
  )
}

export default Form