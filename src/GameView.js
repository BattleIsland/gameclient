import {useEffect, useRef, useState} from 'react';
import { useAssets } from './assets';
import { useMousePosition } from './mouseposition';

export const GameView = () => {
    const canvasRef = useRef(null);

    const {assets, loading} = useAssets();

    const {angle} = useMousePosition();
    const [hasGun, setHasGun] = useState(false);

    useEffect(() => {
        if (!loading) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
        }
    }, [loading])

    useEffect(() => {
        if (!loading) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, canvas.width, canvas.height)
            drawPlayer(context);
            if (hasGun) {
                drawHandUnderGun(context, angle);
                drawGun(context, angle);
                drawHandOverGun(context, angle);
            } else {
                drawHandsWithoutGun(context, angle);
            }
        }
    }, [loading, angle, hasGun]);

    useEffect(() => {
        document.onkeyup = (e) => {
            console.log(e)
            if (e.key === '1') {
                setHasGun((oldHasGun) => !oldHasGun)
            }
        }
    }, []);

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
        ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['player'].sw/2-2, -assets['sprites.png'].sprites['gun'].sh/2)
        // flip across y axis
        ctx.scale(-1, 1)
        drawSprite(ctx, 'gun', 0, 0)
        ctx.restore()
    }

    const drawPlayer = (ctx) => {
        ctx.save();
        // move to middle
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        ctx.translate(-assets['sprites.png'].sprites['player'].sw/2, -assets['sprites.png'].sprites['player'].sh/2)
        drawSprite(ctx, 'player', 0, 0)
        ctx.restore()
    }

    const drawHandUnderGun = (ctx, rotation) => {
        ctx.save();
        // move to middle
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        // rotate
        ctx.rotate(rotation*Math.PI/180);
        // offset by width
        ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2)
        // flip across y axis
        ctx.scale(-1, 1)
        drawSprite(ctx, 'hand', 0, 0)
        ctx.restore()
    }


    const drawHandOverGun = (ctx, rotation) => {
        ctx.save();
        // move to middle
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        // rotate
        ctx.rotate(rotation*Math.PI/180);
        // offset by width
        ctx.translate(assets['sprites.png'].sprites['player'].sw/2+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2)
        // flip across y axis
        ctx.scale(-1, 1)
        drawSprite(ctx, 'hand', 0, 0)
        ctx.restore()
    }

    const drawHandsWithoutGun = (ctx, rotation) => {
        ctx.save();
        // move to middle
        ctx.translate(window.innerWidth/2, window.innerHeight/2);
        // rotate
        ctx.rotate(rotation*Math.PI/180);
        // offset by width
        ctx.translate(assets['sprites.png'].sprites['player'].sw/2+assets['sprites.png'].sprites['hand'].sw/4, -assets['sprites.png'].sprites['hand'].sh/2)
        // flip across y axis
        ctx.scale(-1, 1)
        drawSprite(ctx, 'hand', 0, 30)
        drawSprite(ctx, 'hand', 0, -30)
        ctx.restore()
    }

    return <canvas ref={canvasRef} />
}