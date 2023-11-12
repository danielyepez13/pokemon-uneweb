/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import SelectOptions from "../selectOptions/SelectOptions"
import resetIcon from "../../img/icon-reset.png"
import { getTypes, filterTypes, orderAtk, filterOrigin, orderAlph, resetFilters } from "../../redux/actions"
import "./Filters.css"

const Filters = () => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types);

    const [filType, setFilType] = useState(0);
    const [filOrigin, setFilOrigin] = useState(0);
    const [ordAtk, setOrdAtk] = useState(0)
    const [ordAlph, setOrdAlph] = useState(0)

    const typesName = types.map(type => {
        return type.name
    })

    function handlerFilterTypes(e) {
        setFilType(e.target.value)
    }

    function handlerFilterOrigin(e) {
        setFilOrigin(e.target.value)
    }

    function handlerOrderAtk(e) {
        setOrdAtk(e.target.value)
    }

    function handlerOrderAlph(e) {
        setOrdAlph(e.target.value)
    }

    const obtenerTipos = () => {
        !types.length && dispatch(getTypes());
    };

    const filtrarPorTipo = () => {
        filType && dispatch(filterTypes(filType));
    };

    const filtrarPorOrigen = () => {
        filOrigin && dispatch(filterOrigin(filOrigin));
    };

    const ordenarAlfabeticamente = () => {
        ordAlph && dispatch(orderAlph(ordAlph));
    };

    const ordenarPorAtaque = () => {
        ordAtk && dispatch(orderAtk(ordAtk));
    };

    const onReset = () => {
        dispatch(resetFilters())
        setFilType(0);
        setFilOrigin(0);
        setOrdAtk(0);
        setOrdAlph(0);
    }

    useEffect(() => {
        obtenerTipos();
        filtrarPorTipo();
        filtrarPorOrigen();
        ordenarAlfabeticamente();
        ordenarPorAtaque();
        
        return () => {
            setFilType(null);
            setFilOrigin(null);
            setOrdAtk(null);
            setOrdAlph(null);
        };
    }, [dispatch, types, filType, filOrigin, ordAlph, ordAtk]);


    return (
        <div className="filterSorting">
            <div className="filter">
                <h3>Filters</h3>
                <div className="content-flex">
                    <div className="filter_type">
                        <p>By type:</p>
                        <SelectOptions options={typesName} handler={handlerFilterTypes} valueSelect={filType} />
                    </div>
                    <div className="filter_origin">
                        <p>By origin:</p>
                        <SelectOptions options={["API", "DataBase"]} handler={handlerFilterOrigin} valueSelect={filOrigin} />
                    </div>
                </div>
            </div>
            <div className="order">
                <h3>Ordering</h3>
                <div className="content-flex">
                    <div className="order_alfabetico">
                        <p>Alphabetical order:</p>
                        <SelectOptions options={["A-Z", "Z-A"]} handler={handlerOrderAlph} valueSelect={ordAlph} />
                    </div>
                    <div className="order_ataque">
                        <p>Attack order:</p>
                        <SelectOptions options={["ASC", "DESC"]} handler={handlerOrderAtk} valueSelect={ordAtk} />
                    </div>
                </div>
            </div>
            <div className="reset">
                <img src={resetIcon} alt="icon reset" title="Reset" onClick={onReset} />
            </div>
        </div>
    )
}

export default Filters