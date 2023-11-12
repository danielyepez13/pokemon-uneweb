import backBug from "../assets/wave-bug.svg"
import backDark from "../assets/wave-dark.svg"
import backDragon from "../assets/wave-dragon.svg"
import backElectric from "../assets/wave-electric.svg"
import backFairy from "../assets/wave-fairy.svg"
import backFighting from "../assets/wave-fighting.svg"
import backFire from "../assets/wave-fire.svg"
import backFlying from "../assets/wave-flying.svg"
import backGhost from "../assets/wave-ghost.svg"
import backGrass from "../assets/wave-grass.svg"
import backGround from "../assets/wave-ground.svg"
import backIce from "../assets/wave-ice.svg"
import backNormal from "../assets/wave-normal.svg"
import backPoison from "../assets/wave-poison.svg"
import backPsychic from "../assets/wave-psychic.svg"
import backRock from "../assets/wave-rock.svg"
import backSteel from "../assets/wave-steel.svg"
import backUnknown from "../assets/wave-unknown.svg"
import backWater from "../assets/wave-water.svg"


const BackgroundTypes = (type) => {
    if (backBug.includes(type)) {
        return backBug
    }
    if (backDark.includes(type)) {
        return backDark
    }
    if (backDragon.includes(type)) {
        return backDragon
    }
    if (backElectric.includes(type)) {
        return backElectric
    }
    if (backFairy.includes(type)) {
        return backFairy
    }
    if (backFighting.includes(type)) {
        return backFighting
    }
    if (backFire.includes(type)) {
        return backFire
    }
    if(backFlying.includes(type)){
        return backFlying
    }
    if (backGhost.includes(type)) {
        return backGhost
    }
    if (backGrass.includes(type)) {
        return backGrass
    }
    if (backGround.includes(type)) {
        return backGround
    }
    if (backIce.includes(type)) {
        return backIce
    }
    if (backNormal.includes(type)) {
        return backNormal
    }
    if (backPoison.includes(type)) {
        return backPoison
    }
    if (backPsychic.includes(type)) {
        return backPsychic
    }
    if (backRock.includes(type)) {
        return backRock
    }
    if (backSteel.includes(type)) {
        return backSteel
    }
    if (backWater.includes(type)) {
        return backWater
    }
    if (backUnknown.includes(type) || backUnknown.includes("shadow")) {
        return backUnknown
    }
}

export default BackgroundTypes