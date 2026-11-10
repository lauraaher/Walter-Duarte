import test from 'node:test';
import assert from 'node:assert/strict';
const luminance=hex=>{const rgb=hex.match(/[a-f0-9]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
const pairs=[['Texto principal','#302629','#F8EAEC'],['Texto secundario','#70555D','#FFF9F5'],['Texto secundario pastel','#70555D','#F8EAEC'],['Botón principal','#FFF9F5','#612630'],['Kicker','#8D4654','#F8EAEC'],['Enlace','#612630','#FFF9F5']];
test('contraste de seis combinaciones planas de texto >=4.5:1',()=>{for(const [name,a,b]of pairs){const values=[luminance(a),luminance(b)].sort((a,b)=>b-a);const contrast=(values[0]+.05)/(values[1]+.05);console.log(`${name}: ${contrast.toFixed(2)}:1`);assert.ok(contrast>=4.5,name);}});
