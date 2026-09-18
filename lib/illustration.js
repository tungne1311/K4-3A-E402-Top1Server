'use strict';
const text={type:'string'};
const object=properties=>({type:'object',additionalProperties:false,properties,required:Object.keys(properties)});
const list=(items,min,max)=>({type:'array',items,minItems:min,maxItems:max});
const schema=object({type:{type:'string',enum:['split','categories','sequence','cycle','compare','verify']},example_note:text,nodes:list(object({id:text,label:text,detail:text}),2,6),edges:list(object({from:text,to:text,label:text}),0,8),steps:list(object({caption:text,visible_ids:list(text,1,6)}),2,6)});
function validate(v){
 if(!v||!schema.properties.type.enum.includes(v.type))return ['Loại minh họa không hợp lệ.'];
 const errors=[];if(!Array.isArray(v.nodes)||v.nodes.length<2||v.nodes.length>6)return ['Cần 2–6 phần tử.'];
 const ids=new Set();for(const n of v.nodes){if(!n||typeof n.id!=='string'||!/^n[1-6]$/.test(n.id)||ids.has(n.id))errors.push('ID không hợp lệ.');ids.add(n?.id);if(typeof n?.label!=='string'||!n.label.trim()||[...n.label].length>45||typeof n.detail!=='string'||n.detail.length>160)errors.push('Nhãn thiếu hoặc quá dài.');}
 if(typeof v.example_note!=='string'||v.example_note.length>220)errors.push('Ghi chú không hợp lệ.');
 if(!Array.isArray(v.edges)||v.edges.length>8)errors.push('Quan hệ không hợp lệ.');else for(const e of v.edges)if(!e||!ids.has(e.from)||!ids.has(e.to)||e.from===e.to||typeof e.label!=='string'||e.label.length>45)errors.push('Quan hệ sai.');
 if(!Array.isArray(v.steps)||v.steps.length<2||v.steps.length>6)errors.push('Cần 2–6 bước.');else{for(const s of v.steps)if(!s||typeof s.caption!=='string'||!s.caption.trim()||s.caption.length>240||!Array.isArray(s.visible_ids)||!s.visible_ids.length||new Set(s.visible_ids).size!==s.visible_ids.length||s.visible_ids.some(id=>!ids.has(id)))errors.push('Bước sai.');if(!v.steps.at(-1)?.visible_ids||[...ids].some(id=>!v.steps.at(-1).visible_ids.includes(id)))errors.push('Bước cuối phải hiện toàn bộ.');}return errors;
}
module.exports={schema,validate};
