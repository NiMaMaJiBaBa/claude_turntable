export const TAU = Math.PI * 2;
export const palette = ['#e9b7a4','#e6cb79','#d5e08b','#a9c9ae','#a6c7cf','#c5b6d6','#e7bbca','#d4c5a3'];
export const templates = {food:['牛肉麵','日式咖哩','義大利麵','韓式拌飯','壽司','滷肉飯','火鍋','漢堡'],truth:['分享最近的小確幸','唱一段喜歡的歌','說出一個秘密','模仿一位朋友','分享最糗的事','做十下深蹲'],yesno:['就這麼辦！','再想一下'],numbers:Array.from({length:10},(_,i)=>String(i+1)),teams:['第一組','第二組','第三組','第四組']};
export function secureRandom(){const value=new Uint32Array(1);crypto.getRandomValues(value);return value[0]/4294967296;}
export function normalize(a){return ((a%TAU)+TAU)%TAU;}
export function makeOptions(labels){return labels.map((label,i)=>({id:crypto.randomUUID(),label:label.trim().slice(0,40),weight:1,color:palette[i%palette.length],enabled:true}));}
export function validateOptions(raw){
  if(!Array.isArray(raw)||raw.length>100)throw Error('選項必須是陣列，且不可超過 100 項。');
  return raw.map((o,i)=>{if(!o||typeof o.label!=='string'||!o.label.trim()||o.label.length>40)throw Error('每個選項名稱必須為 1–40 字。');return {id:crypto.randomUUID(),label:o.label.trim(),weight:Math.max(1,Math.min(100,Math.round(Number(o.weight)||1))),color:/^#[0-9a-f]{6}$/i.test(o.color)?o.color:palette[i%palette.length],enabled:o.enabled!==false};});
}
export function buildSlices(options){const active=options.filter(o=>o.enabled);const total=active.reduce((s,o)=>s+o.weight,0);let a=0;return active.map(o=>{const start=a;a+=o.weight/total*TAU;return {...o,start,end:a};});}
export function pickWinner(slices,random=secureRandom){if(!slices.length)throw Error('沒有可抽選項');const r=random()*slices.reduce((s,o)=>s+o.weight,0);let sum=0;return slices.find(o=>(sum+=o.weight)>r)||slices.at(-1);}
export function targetRotation(current,slice,random=secureRandom){const angle=slice.start+(slice.end-slice.start)*(.08+random()*.84);return current+(5+Math.floor(random()*4))*TAU+normalize(-angle-current);}
export function sliceAt(slices,rotation){const angle=normalize(-rotation);return slices.find(o=>angle>=o.start&&angle<o.end)||slices.at(-1);}
export function shuffle(options){const a=[...options];for(let i=a.length-1;i>0;i--){const j=Math.floor(secureRandom()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function encodeShare(options,title){const data=JSON.stringify({v:1,options:options.map(({label,weight,color,enabled})=>({label,weight,color,enabled})),title});const bytes=new TextEncoder().encode(data);return '#d='+btoa(Array.from(bytes,b=>String.fromCharCode(b)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
export function decodeShare(hash){if(!hash.startsWith('#d='))return null;if(hash.length>80000)throw Error('分享連結太長。');const s=hash.slice(3).replace(/-/g,'+').replace(/_/g,'/');const data=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(atob(s),c=>c.charCodeAt(0))));if(data.v!==1||typeof data.title!=='string'||data.title.length>60)throw Error('分享資料格式不正確。');return {options:validateOptions(data.options),title:data.title};}
export function textColor(hex){const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);const l=.2126*c[0]+.7152*c[1]+.0722*c[2];return l>.179?'#111111':'#ffffff';}
