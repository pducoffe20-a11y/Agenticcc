import {buildCatalog} from './catalog-lib.mjs';
try{const c=buildCatalog();console.log(`Validated ${c.agents.length} agents and ${c.skills.length} active skills.`)}catch(e){console.error(e.message);process.exitCode=1}
