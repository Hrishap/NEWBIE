import {proxy} from 'valtio'
const state =proxy({
intro: 0,
color:'#EFBD48',
isLogoTexture:true,
isFullTexture:false,
logoDecal: './eagle.png',
fullDecal: './eagle.png',

noOfSaved:0,

logoDecal1: './eagle.png',
fixed1: false,
x1Cordinate: 0,
y1Cordinate: 0,
size1Cordinate: 0,

logoDecal2: './eagle.png',
fixed2: false,
x2Cordinate: 0,
y2Cordinate: 0,
size2Cordinate: 0,

logoDecal3: './eagle.png',
fixed3: false,
x3Cordinate: 0,
y3Cordinate: 0,
size3Cordinate: 0,

logoDecal4: './eagle.png',
fixed4: false,
x4Cordinate: 0,
y4Cordinate: 0,
size4Cordinate: 0,

sleeve: false,
xCordinate: 0,
yCordinate: 0,
sizeCordinate: 0,
});
export default state;
