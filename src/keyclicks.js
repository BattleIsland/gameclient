import { useEffect, useRef, useState } from "react";

const UNIT = 1;

const validKeys = {
    'w': {x: 0, y: -UNIT},
    'a': {x: -UNIT, y: 0},
    's': {x: 0, y: UNIT},
    'd': {x: UNIT, y: 0},
    'ArrowUp': {x: 0, y: -UNIT},
    'ArrowLeft': {x: -UNIT, y: 0},
    'ArrowDown': {x: 0, y: UNIT},
    'ArrowRight': {x: UNIT, y: 0},
};

export const calculateNetXAndY = (keysClicked, multiplier = 1) => {
    const xAndYs = keysClicked.map(key => validKeys[key]);
    const netX = xAndYs.map((xy) => xy.x).reduce((prev, curr) => prev + curr, 0);
    const netY = xAndYs.map((xy) => xy.y).reduce((prev, curr) => prev + curr, 0);
    // need to normalize otherwise it's too fast when going diagonally
    let normalizationFactor = Math.sqrt((netX * netX + netY * netY));
    normalizationFactor = normalizationFactor === 0 ? 1 : normalizationFactor;
    return {netX: multiplier * netX / normalizationFactor, netY: multiplier * netY / normalizationFactor};
}

export const useKeyboardClicks = (onKeyUp = () => {}) => {
    const [keysSelected, setKeysSelected] = useState([]);
    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key in validKeys) {
                setKeysSelected((oldKeysSelected) => {
                    if (oldKeysSelected.includes(e.key)) {
                        return oldKeysSelected;
                    } else {
                        return [...oldKeysSelected, e.key];
                    }
                });
            }
        }
        document.onkeyup = (e) => {
            onKeyUp(e);
            setKeysSelected((oldKeysSelected) => oldKeysSelected.filter(k => e.key !== k));
        }
    }, []);
    return {keysSelected, setKeysSelected};
}