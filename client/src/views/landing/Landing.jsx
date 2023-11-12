import ButtonLink from "../../components/buttonLink/ButtonLink"
import "./landing.css"

const Landing = () => {
    return (
        <div className="landing">
            <div className="contenedor">
                <h1>PI Pokemon</h1>
                <div className="contentButton">
                    <ButtonLink dir="/home" name="Welcome" />
                </div>
            </div>
        </div>
    )
}

export default Landing