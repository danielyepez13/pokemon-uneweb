const SelectOptions = ({options, handler, nameSelect, valueSelect}) => {
    handler = handler ? handler : null;
  return (
    <>
          <select onChange={handler} name={nameSelect} value={valueSelect}>
              <option value="0" disabled>By default</option>
            {
                options.map((option, index) => {
                    return (
                        <option value={option} key={index}>
                            {option}
                        </option>
                    )
                })
            }
        </select>
    </>
  )
}

export default SelectOptions