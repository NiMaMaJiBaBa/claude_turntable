import {makeOptions,templates,validateOptions} from './lib/core.js';
const defaults={title:'今天吃什麼？',removeWinner:false,spinDurationMs:5000,sound:true,confetti:true,theme:'system'};
export const state={options:makeOptions(templates.food),settings:{...defaults},history:[],spinning:false,rotation:0};
let warning='';
try{const raw=localStorage.getItem('fortune-wheel-v1');if(raw){const data=JSON.parse(raw);state.options=validateOptions(data.options);const s=data.settings||{};state.settings={...defaults,title:typeof s.title==='string'?s.title.slice(0,60):defaults.title,removeWinner:s.removeWinner===true,spinDurationMs:Math.min(8000,Math.max(3000,Number(s.spinDurationMs)||5000)),sound:s.sound!==false,confetti:s.confetti!==false,theme:['system','light','dark'].includes(s.theme)?s.theme:'system'};state.history=Array.isArray(data.history)?data.history.filter(h=>h&&typeof h.label==='string'&&h.label.length<=40&&Number.isFinite(Date.parse(h.at))).slice(0,100).map(h=>({id:String(h.id),label:h.label,at:h.at})):[];}}catch{warning='無法讀取先前資料，目前使用預設轉盤。';}
export function save(){try{localStorage.setItem('fortune-wheel-v1',JSON.stringify({options:state.options,settings:state.settings,history:state.history}));return true;}catch{return false;}}
export function getWarning(){return warning;}
