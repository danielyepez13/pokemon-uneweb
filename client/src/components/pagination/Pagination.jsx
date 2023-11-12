import "./Pagination.css"
const Paginacion = ({ perPage, totalPokes, pagina, previa, siguiente, actual}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokes / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="paginacion-container">
            <div className="total">
                There are a total of <b>{totalPokes}</b> records.
            </div>
            <ul className="paginacion">
                <li onClick={() => previa()} className="page-number">
                    Prev
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => pagina(number)}
                        className="page-number"
                    >
                        {number}
                    </li>
                ))}
                <li onClick={() => siguiente()} className="page-number">
                    Next
                </li>
            </ul>
            <div className="actual">
                Page <b>{actual}</b> of <b>{pageNumbers.length}</b>
            </div>
        </div>
    );
};

export default Paginacion;