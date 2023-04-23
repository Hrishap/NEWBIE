import {proxy} from 'valtio'
const state =proxy({
intro: true,
color:'#EFBD48',
isLogoTexture:true,
isFullTexture:false,
logoDecal: './eagle.png',
fullDecal: './eagle.png',
sleeve: false,
xCordinate: 0,
yCordinate: 0,
sizeCordinate: 0,
});
export default state;
