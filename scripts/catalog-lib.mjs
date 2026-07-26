import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function parseCsv(text){const lines=text.trim().split(/\r?\n/);const head=lines.shift().split(',');return lines.map(line=>Object.fromEntries(line.split(',').map((v,i)=>[head[i],v])))}
export function buildCatalog(root=ROOT){
 const skills=parseCsv(fs.readFileSync(path.join(root,'registry/skills.csv'),'utf8')).filter(s=>s.status==='active');
 const data=JSON.parse(fs.readFileSync(path.join(root,'registry/agents.json'),'utf8')); const errors=[];
 const names=new Set(skills.map(s=>s.skill_name)); const ids=new Set();
 if(data.agents.length!==11) errors.push(`expected exactly 11 agents; found ${data.agents.length}`);
 for(const a of data.agents){if(ids.has(a.agent_id))errors.push(`duplicate agent_id: ${a.agent_id}`);ids.add(a.agent_id);if(!names.has(a.launcher_skill))errors.push(`${a.agent_id}: unknown launcher_skill ${a.launcher_skill}`);if(a.public_safe!==true)errors.push(`${a.agent_id}: public_safe must be true`);if(a.runtime_adapter!=='prompt_export_only')errors.push(`${a.agent_id}: unsupported runtime adapter`);if(new Set(a.launch_modes).size!==a.launch_modes.length)errors.push(`${a.agent_id}: duplicate launch mode`);for(const s of a.related_skills)if(!names.has(s))errors.push(`${a.agent_id}: unknown related skill ${s}`);const launcher=skills.find(s=>s.skill_name===a.launcher_skill);if(launcher&&launcher.approval_gate!==a.approval_gate)errors.push(`${a.agent_id}: approval gate does not match ${a.launcher_skill}`)}
 for(const r of data.recipes){for(const s of r.steps)if(!names.has(s))errors.push(`${r.recipe_id}: unknown recipe skill ${s}`)}
 if(new Set(skills.map(s=>s.skill_name)).size!==skills.length)errors.push('duplicate active skill names');
 if(errors.length)throw new Error(errors.join('\n'));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'plugins/d2l-sales-workflows/.codex-plugin/plugin.json'),'utf8'));
 return {schema_version:1,generated_from:['registry/agents.json','registry/skills.csv','plugins/d2l-sales-workflows/.codex-plugin/plugin.json'],plugin:{name:manifest.name,display_name:manifest.interface.displayName,description:manifest.description},agents:data.agents,skills,recipes:data.recipes};
}
