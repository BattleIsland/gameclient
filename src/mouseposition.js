import {useEffect, useState} from 'react';

const getAngle = (x, y) => {
    return Math.atan2(window.innerHeight/2 - y, window.innerWidth/2 - x) / Math.PI * 180 + 180
}

export const useMousePosition = () => {
    const [
      mousePosition,
      setMousePosition
    ] = useState({ x: null, y: null });
    useEffect(() => {
      const updateMousePosition = ev => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      };
      window.addEventListener('mousemove', updateMousePosition);
      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
      };
    }, []);
    return {angle: getAngle(mousePosition.x, mousePosition.y)};
};