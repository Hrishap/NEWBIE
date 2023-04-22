import {proxy} from 'valtio'
const state =proxy({
intro: true,
color:'#EFBD48',
isLogoTexture:true,
isFullTexture:false,
logoDecal: './eagle.png',
fullDecal: './eagle.png',
});
export default state;