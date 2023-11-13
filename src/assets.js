import {useEffect, useState} from 'react';

const ASSETS = [
    { 
        filename: 'sprites.png',
        sprites: {
            'gun': {
                sx: 1522,
                sy: 2020,
                sw: 159,
                sh: 22,
            }
        }
    }
];


export const useAssets = () => {
    const [assets, setAssets] = useState({});
    const [loading, setLoading] = useState(true);

    const downloadAsset = (asset) => {
        return new Promise(resolve => {
            const assetImage = new Image();
            assetImage.onload = () => {
                setAssets((oldAssets) => {
                    return {...oldAssets, [asset.filename]: {image: assetImage, sprites: asset.sprites}}
                });
                resolve();
            };
            assetImage.src = asset.filename;
        });
    }

    const downloadPromise = () => Promise.all(ASSETS.map(downloadAsset));

    useEffect(() => {
        setLoading(true);
        downloadPromise().then(() => setLoading(false));
    }, [])

    return {assets, loading}
}