import { useEffect, useRef } from "react";
import { useAssets } from "./assets";
import { calculateNetXAndY, useKeyboardClicks } from "./keyclicks";

export const Playground = () => {
    const canvasRef = useRef(null);

    const {assets, loading} = useAssets();
    const {setKeysSelected} = useKeyboardClicks();
    const x = useRef(0);
    const y = useRef(0);
    const sprites = useRef(null);

    useEffect(() => {
        if (!loading) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            sprites.current = assets['sprites.png'].image;

            setInterval(() => {
                let ks = [];
                setKeysSelected(keyselected => {ks = keyselected; return keyselected;})
                const {netX, netY} = calculateNetXAndY(ks);
                const context = canvasRef.current.getContext('2d');
                x.current += netX;
                y.current += netY;
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.drawImage(sprites.current, x.current, y.current, 2000, 2000, 0, 0, 2000, 2000)
                context.font = "20pt Calibri";
                context.fillText(`(${x.current},${y.current})`, 100, 100);
            }, 8)
        }
    }, [assets, loading])

    return <canvas ref={canvasRef} />;
}