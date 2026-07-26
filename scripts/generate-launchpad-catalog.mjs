import fs from 'node:fs';import path from 'node:path';import {buildCatalog} from './catalog-lib.mjs';
const out=path.resolve('app/src/generated/launchpad-catalog.json');fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(buildCatalog(),null,2)+'\n');console.log(`Generated ${out}`);
