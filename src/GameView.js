import {useEffect, useRef} from 'react';
import { useAssets } from './assets';
import { useMousePosition } from './mouseposition';

export const GameView = () => {
    const canvasRef = useRef(null);

    const {assets, loading} = useAssets();

    const {angle} = useMousePosition();

    useEffect(() => {console.log(angle)}, [angle])

    useEffect(() => {
        if (!loading) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
        }
    }, [assets, loading])

    useEffect(() => {
        if (!loading) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height)
            drawGun(context, angle);
        }
    }, [loading, angle])

    const drawSprite = (ctx, spriteName, x, y) => {
        const asset = assets['sprites.png'];
        const sprite = asset.sprites[spriteName];
        ctx.drawImage(asset.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.sw, sprite.sh);
    }

    const drawGun = (ctx, rotation) => {
        ctx.save();
        // move to middle
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        // rotate
        ctx.rotate(rotation*Math.PI/180);
        // offset by width
        ctx.translate(assets['sprites.png'].sprites['gun'].sw, 0)
        // flip across y axis
        ctx.scale(-1, 1)
        drawSprite(ctx, 'gun', 0, 0)
        ctx.restore()
    }

    return <canvas ref={canvasRef} />
}