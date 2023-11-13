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
            // move to middle
            context.translate(window.innerWidth/2, window.innerHeight/2);
            // rotate
            context.rotate(50*Math.PI/180);
            // offset by width
            context.translate(assets['sprites.png'].sprites['gun'].sw, 0)
            // flip across y axis
            context.scale(-1, 1)
            drawSprite(context, 'gun', 0, 0)
            context.restore()
        }
    }, [assets, loading])

    const drawSprite = (ctx, spriteName, x, y) => {
        const asset = assets['sprites.png'];
        const sprite = asset.sprites[spriteName];
        ctx.drawImage(asset.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.sw, sprite.sh);
    }

    return <canvas ref={canvasRef} />
}