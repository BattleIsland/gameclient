import {useEffect, useRef} from 'react';
import { useAssets } from './assets';

export const GameView = () => {
    const canvasRef = useRef(null);

    const {assets, loading} = useAssets();

    useEffect(() => {
        if (loading === false) {
            console.log(assets)
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            context.save();
            context.translate(window.innerWidth/2, window.innerHeight/2);
            context.rotate(0*Math.PI/180);
            drawSprite(context, 'gun', 0, 0)
            context.restore()
        }
    }, [assets, loading])

    const drawSprite = (ctx, spriteName, x, y) => {
        const asset = assets['sprites.png'];
        const sprite = asset.sprites[spriteName];
        ctx.drawImage(asset.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.sw, sprite.sh)
    }

    return <canvas ref={canvasRef} />
}