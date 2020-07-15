(this["webpackJsonpfactorio-engineering-train"]=this["webpackJsonpfactorio-engineering-train"]||[]).push([[0],{11:function(e){e.exports=JSON.parse('["water","steam","sulfuric-acid","crude-oil","heavy-oil","light-oil","petroleum-gas","lubricant"]')},24:function(e,t,n){e.exports=n(48)},29:function(e,t,n){},30:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},4:function(e){e.exports=JSON.parse('{"accumulator":50,"advanced-circuit":200,"arithmetic-combinator":50,"artillery-shell":1,"artillery-targeting-remote":1,"artillery-turret":10,"artillery-wagon":5,"assembling-machine-1":50,"assembling-machine-2":50,"assembling-machine-3":50,"atomic-bomb":10,"automation-science-pack":200,"battery":200,"battery-equipment":20,"battery-mk2-equipment":20,"beacon":10,"belt-immunity-equipment":20,"big-electric-pole":50,"boiler":50,"burner-inserter":50,"burner-mining-drill":50,"cannon-shell":200,"car":1,"cargo-wagon":100,"centrifuge":50,"chemical-plant":10,"chemical-science-pack":200,"cliff-explosives":20,"cluster-grenade":100,"combat-shotgun":5,"concrete":100,"constant-combinator":50,"construction-robot":50,"copper-cable":200,"copper-plate":100,"crude-oil-barrel":10,"decider-combinator":50,"defender-capsule":100,"destroyer-capsule":100,"discharge-defense-equipment":20,"discharge-defense-remote":1,"distractor-capsule":100,"effectivity-module":50,"effectivity-module-2":50,"effectivity-module-3":50,"electric-engine-unit":50,"electric-furnace":50,"electric-mining-drill":50,"electronic-circuit":200,"empty-barrel":10,"energy-shield-equipment":20,"energy-shield-mk2-equipment":20,"engine-unit":50,"exoskeleton-equipment":20,"explosive-cannon-shell":200,"explosive-rocket":200,"explosive-uranium-cannon-shell":200,"explosives":50,"express-splitter":50,"express-transport-belt":100,"express-underground-belt":50,"fast-inserter":50,"fast-splitter":50,"fast-transport-belt":100,"fast-underground-belt":50,"filter-inserter":50,"firearm-magazine":200,"flamethrower":5,"flamethrower-ammo":100,"flamethrower-turret":50,"fluid-wagon":5,"flying-robot-frame":50,"fusion-reactor-equipment":20,"gate":50,"green-wire":200,"grenade":100,"gun-turret":50,"hazard-concrete":100,"heat-exchanger":50,"heat-pipe":50,"heavy-armor":1,"heavy-oil-barrel":10,"inserter":50,"iron-chest":50,"iron-gear-wheel":100,"iron-plate":100,"iron-stick":100,"land-mine":100,"landfill":100,"laser-turret":50,"light-armor":1,"light-oil-barrel":10,"locomotive":5,"logistic-chest-active-provider":50,"logistic-chest-buffer":50,"logistic-chest-passive-provider":50,"logistic-chest-requester":50,"logistic-chest-storage":50,"logistic-robot":50,"logistic-science-pack":200,"long-handed-inserter":50,"low-density-structure":10,"lubricant-barrel":10,"medium-electric-pole":50,"military-science-pack":200,"modular-armor":1,"night-vision-equipment":20,"nuclear-fuel":1,"nuclear-reactor":10,"offshore-pump":20,"oil-refinery":10,"personal-laser-defense-equipment":20,"personal-roboport-equipment":20,"personal-roboport-mk2-equipment":20,"petroleum-gas-barrel":10,"piercing-rounds-magazine":200,"piercing-shotgun-shell":200,"pipe":100,"pipe-to-ground":50,"pistol":5,"plastic-bar":100,"poison-capsule":100,"power-armor":1,"power-armor-mk2":1,"power-switch":50,"processing-unit":100,"production-science-pack":200,"productivity-module":50,"productivity-module-2":50,"productivity-module-3":50,"programmable-speaker":50,"pump":1,"pumpjack":20,"radar":50,"rail":100,"rail-chain-signal":50,"rail-signal":50,"red-wire":200,"refined-concrete":100,"refined-hazard-concrete":100,"repair-pack":100,"roboport":10,"rocket":200,"rocket-control-unit":10,"rocket-fuel":10,"rocket-launcher":5,"rocket-silo":1,"shotgun":5,"shotgun-shell":200,"slowdown-capsule":100,"small-electric-pole":50,"small-lamp":50,"solar-panel":50,"solar-panel-equipment":20,"solid-fuel":50,"speed-module":50,"speed-module-2":50,"speed-module-3":50,"splitter":50,"stack-filter-inserter":50,"stack-inserter":50,"steam-engine":10,"steam-turbine":10,"steel-chest":50,"steel-furnace":50,"steel-plate":100,"stone-brick":100,"stone-furnace":50,"stone-wall":100,"storage-tank":50,"submachine-gun":5,"substation":50,"sulfur":50,"sulfuric-acid-barrel":10,"tank":1,"train-stop":10,"transport-belt":100,"underground-belt":50,"uranium-235":100,"uranium-238":100,"uranium-cannon-shell":200,"uranium-fuel-cell":50,"uranium-rounds-magazine":200,"utility-science-pack":200,"water-barrel":10,"wooden-chest":50}')},48:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(9),o=n.n(a),l=(n(29),n(30),n(1)),c=n(5),u=n(11),s=Object(c.b)("init"),m=Object(c.c)({name:"Fluids",initialState:Object.fromEntries(u.map((function(e){return[e,!1]}))),reducers:{toggle:function(e,t){var n=t.payload;e[n]=!e[n]}},extraReducers:function(e){return e.addCase(s,(function(e){u.forEach((function(t){return e[t]=e[t]||!1})),Object.keys(e).forEach((function(t){u.includes(t)||delete e[t]}))}))}}),d=n(3);n(37);function p(){var e=Object(d.c)((function(e){return e.fluids})),t=Object(d.b)();return i.a.createElement("div",{className:"Fluids"},i.a.createElement("h2",null,"Fluids"),Object.entries(e).map((function(e){var n=Object(l.a)(e,2),r=n[0],a=n[1];return i.a.createElement(i.a.Fragment,{key:r},i.a.createElement("label",{htmlFor:r},r),i.a.createElement("input",{id:r,type:"checkbox",checked:a,onChange:function(){return t(m.actions.toggle(r))}}))})))}var g,h=n(4),f=Object(c.c)({name:"Stacks",initialState:Object.fromEntries(Object.keys(h).map((function(e){return[e,0]}))),reducers:{setValue:function(e,t){var n=t.payload,r=n.name,i=n.value;e[r]=i}},extraReducers:function(e){return e.addCase(s,(function(e){Object.keys(h).forEach((function(t){return e[t]=e[t]||0})),Object.keys(e).forEach((function(t){h[t]||delete e[t]}))}))}});n(38);function b(e,t){var n=Object(l.a)(e,2),r=n[0],i=(n[1],Object(l.a)(t,2)),a=i[0];i[1];return r.localeCompare(a)}function y(){var e=Object(d.c)((function(e){return e.stacks})),t=Object(d.b)();return i.a.createElement("div",{className:"Stacks"},i.a.createElement("h2",{style:{gridColumn:"span 3",gridRow:"span 3"}},"Item Stacks"),Object.entries(e).sort(b).map((function(e){var n=Object(l.a)(e,2),r=n[0],a=n[1];return i.a.createElement(i.a.Fragment,{key:r},i.a.createElement("label",{htmlFor:r},r),i.a.createElement("input",{id:r,type:"number",value:a,onChange:function(e){return t(f.actions.setValue({name:r,value:+e.target.value}))}}),i.a.createElement("div",null,"(",a*h[r],")"))})))}!function(e){e.wood="wood",e.coal="coal",e.solidFuel="solid-fuel",e.rocketFuel="rocket-fuel",e.nuclearFuel="nuclear-fuel"}(g||(g={}));var v=Object(c.c)({name:"Other",initialState:{dual:!0,filler:"artillery-shell",fuel:"--"},reducers:{toggleDual:function(e){e.dual=!e.dual},setFiller:function(e,t){var n=t.payload;e.filler=n},setFuel:function(e,t){var n=t.payload;e.fuel=n}},extraReducers:function(e){return e.addCase(s,(function(e){e.dual=null==e.dual||e.dual,e.filler=e.filler||"artillery-shell",e.fuel=e.fuel||"--"}))}});n(39);function _(){var e=Object(d.c)((function(e){return e.other})),t=Object(d.b)();return i.a.createElement("div",{className:"Other"},i.a.createElement("h2",null,"Other"),i.a.createElement("label",{htmlFor:"dual"},"Use Dual-Headed"),i.a.createElement("input",{id:"dual",type:"checkbox",checked:e.dual,onChange:function(){return t(v.actions.toggleDual())}}),i.a.createElement("label",{htmlFor:"filler"},"Filler"),i.a.createElement("select",{id:"filler",value:e.filler,onChange:function(e){return t(v.actions.setFiller(e.target.value))}},i.a.createElement("option",null,"--"),Object.keys(h).map((function(e){return i.a.createElement("option",{key:e},e)}))),i.a.createElement("label",{htmlFor:"fuel"},"Fuel"),i.a.createElement("select",{id:"fuel",value:e.fuel,onChange:function(e){return t(v.actions.setFuel(e.target.value))}},i.a.createElement("option",null,"--"),Object.entries(g).map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return i.a.createElement("option",{key:n,value:n},r)}))))}var k=n(16),x=n(8),E=n.n(x);function O(e){e.slice(1).forEach((function(t,n){var r,i,a;null===(r=t.connections)||void 0===r||null===(i=r[1])||void 0===i||null===(a=i.red)||void 0===a||a.push({entity_id:e[n].entity_number})})),e.slice(0,-1).forEach((function(t,n){var r,i,a;null===(r=t.connections)||void 0===r||null===(i=r[1])||void 0===i||null===(a=i.red)||void 0===a||a.push({entity_id:e[n+1].entity_number})}))}function j(e,t){var n,r,i,a,o,l,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},u=c.side1,s=void 0===u?"1":u,m=c.side2,d=void 0===m?"1":m,p=c.color,g=void 0===p?"red":p;null===(n=e.connections)||void 0===n||null===(r=n[s])||void 0===r||null===(i=r[g])||void 0===i||i.push({entity_id:t.entity_number}),null===(a=t.connections)||void 0===a||null===(o=a[d])||void 0===o||null===(l=o[g])||void 0===l||l.push({entity_id:e.entity_number})}function w(e,t,n){var r=Math.ceil(3.5*(t+(n?2:1)))+(n?1:2);return e=e.concat(Array.from(Array(r).keys()).map((function(t,i){return{entity_number:e.length+1+i,name:"straight-rail",position:{x:-2*(r-i-(n?1:2)),y:-2},direction:2}}))),n?e.push({entity_number:e.length+1,name:"rail-signal",position:{x:.5-2*r+1,y:-3.5},direction:2}):e.push({entity_number:e.length+1,name:"rail-signal",position:{x:1.5,y:-.5},direction:6}),e.push({entity_number:e.length+1,name:"rail-signal",position:{x:.5-2*r+(n?1:3),y:-.5},direction:6}),e}var q=[-4.5,-3.5,-.5,.5],M=[-6.5,-5.5,1.5,2.5],S=[-3.5,-.5],A=[-4.5,.5];function F(){var e=Object(r.useState)(!1),t=Object(l.a)(e,2),n=t[0],a=t[1],o=Object(d.c)((function(e){return e})),c=o.fluids,u=o.stacks,s=o.other,m=Object(r.useMemo)((function(){return Object.entries(u).filter((function(e){var t=Object(l.a)(e,2);t[0];return t[1]}))}),[u]),p=Object(r.useMemo)((function(){return Object.entries(c).filter((function(e){var t=Object(l.a)(e,2);t[0];return t[1]}))}),[c]),f=Object(r.useMemo)((function(){var e=[];return m.forEach((function(t){var n=e.findIndex((function(e){var n=e.reduce((function(e,t){return e+t[1]}),0);return e.length<23&&n+t[1]<=40||23===e.length&&n+t[1]===40}));-1===n&&(n=e.length,e.push([])),e[n].push(t)})),e}),[m]);f.forEach((function(e){var t=40-e.reduce((function(e,t){return e+t[1]}),0);t>0&&e.length<24&&e.push([s.filler,t])}));var b=Object(r.useMemo)((function(){var e=[],t={entity_number:e.length+1,name:"train-stop",position:{x:0,y:0},direction:2,control_behavior:{circuit_condition:{first_signal:{type:"virtual",name:"signal-anything"},constant:0,comparator:">"},circuit_enable_disable:!0,send_to_train:!1},station:"Engineering Dropoff"};e.push(t);var n=f.flatMap((function(t,n){return Array.from(Array(6).keys()).map((function(t){return{entity_number:e.length+1+t+6*n,name:"logistic-chest-storage",position:{x:-5.5+t-7*(f.length-n+p.length),y:.5},connections:{1:{red:[]}}}}))}));e=e.concat(n);var r=f.flatMap((function(t,n){return Array.from(Array(6).keys()).map((function(t){return{entity_number:e.length+1+t+6*n,name:"stack-filter-inserter",position:{x:-5.5+t-7*(f.length-n+p.length),y:-.5},control_behavior:{circuit_mode_of_operation:1},connections:{1:{red:[]}}}}))}));e=e.concat(r);var i=p.flatMap((function(t,n){return[{entity_number:e.length+1+2*n,name:"storage-tank",direction:2,position:{x:-4.5-7*(p.length-n),y:-6.5},connections:{1:{red:[]}}},{entity_number:e.length+2+2*n,name:"storage-tank",position:{x:-1.5-7*(p.length-n),y:-6.5},connections:{1:{red:[]}}}]}));e=e.concat(i);var a=p.map((function(t,n){var r=Object(l.a)(t,1)[0];return{entity_number:e.length+1+n,name:"pump",position:{x:-.5-7*(p.length-n),y:-4},control_behavior:{circuit_condition:{first_signal:{type:"fluid",name:r},constant:-15e3,comparator:">"}},connections:{1:{red:[]}}}})),o={entity_number:(e=e.concat(a)).length+1,name:"arithmetic-combinator",position:{x:-6,y:1.5},direction:2,control_behavior:{arithmetic_conditions:{first_signal:{type:"virtual",name:"signal-each"},second_constant:-1,operation:"*",output_signal:{type:"virtual",name:"signal-each"}}},connections:{1:{red:[]},2:{red:[]}}};e.push(o);var c={entity_number:e.length+1,name:"constant-combinator",direction:6,position:{x:-5.5,y:-.5}};e.push(c);var u={entity_number:e.length+1,name:"roboport",position:{x:-21,y:3},control_behavior:{read_logistics:!1,read_robot_stats:!0},connections:{1:{red:[]}}};e.push(u);var m={entity_number:e.length+1,name:"fast-inserter",position:{x:-22.5,y:5.5},direction:4,control_behavior:{circuit_condition:{first_signal:{type:"virtual",name:"signal-X"},constant:50,comparator:"<"}},connections:{1:{red:[]}}};e.push(m);var d={entity_number:e.length+1,name:"fast-inserter",position:{x:-21.5,y:5.5},direction:4,control_behavior:{circuit_condition:{first_signal:{type:"virtual",name:"signal-Z"},constant:50,comparator:"<"}},connections:{1:{red:[]}}};e.push(d),e.push({entity_number:e.length+1,name:"logistic-chest-requester",position:{x:-22.5,y:6.5},request_filters:[{index:1,name:"logistic-robot",count:50}]}),e.push({entity_number:e.length+1,name:"logistic-chest-requester",position:{x:-21.5,y:6.5},request_filters:[{index:1,name:"construction-robot",count:50}]}),e=w(e,f.length+p.length,s.dual),j(u,d),j(d,m),j(o,c,{side1:"2"}),j(o,t,{side1:"2"}),O(r),O(n),O(a),O(i);var g=a.slice(-1)[0],h=i.slice(-1)[0],b=r.slice(-1)[0],y=n.slice(-1)[0];return g?(j(h,o,{side2:"1"}),j(g,o,{side2:"2"}),b&&(j(a[0],b),j(i[0],y))):b&&(j(y,o,{side2:"1"}),j(b,o,{side2:"2"})),{item:"blueprint",label:"Engineering Receiver",entities:e,tiles:[],icons:[],schedules:[],version:77311705089}}),[p,f,s.dual]),y=Object(r.useMemo)((function(){var e=[],t={entity_number:e.length+1,name:"train-stop",position:{x:0,y:0},direction:2,station:"Engineering Pickup"};e.push(t);var n=f.flatMap((function(t,n){var r=Math.max(0,Math.ceil((t.length-12)/2)),i=0!==r?Array.from(Array(r).keys()).flatMap((function(i){return Array.from(Array(i===r-1&&t.length%4!==0&&4*r>t.length?t.length%4:4).keys()).flatMap((function(r){var a=t[4*i+r],o=2*(f.slice(0,n).reduce((function(e,t){return e+t.length}),0)+4*i+r);return[{entity_number:e.length+o+1,name:"long-handed-inserter",position:{x:-5.5+i-7*(f.length-n+(s.dual?0:p.length)),y:q[r]},direction:r>=2?4:0},{entity_number:e.length+o+2,name:"logistic-chest-requester",position:{x:-5.5+i-7*(f.length-n+(s.dual?0:p.length)),y:M[r]},request_filters:[{index:1,name:a[0],count:a[1]*h[a[0]]}]}]}))})):[],a=Math.ceil((t.length-4*r)/2),o=0!==a?Array.from(Array(a).keys()).flatMap((function(i){return Array.from(Array(i===a-1&&t.length%2!==0?t.length%2:2).keys()).flatMap((function(a){var o=t[2*i+4*r+a],l=2*(f.slice(0,n).reduce((function(e,t){return e+t.length}),0)+4*r+2*i+a);return[{entity_number:e.length+l+1,name:"fast-inserter",position:{x:-5.5+i+r-7*(f.length-n+(s.dual?0:p.length)),y:S[a]},direction:a>=1?4:0},{entity_number:e.length+l+2,name:"logistic-chest-requester",position:{x:-5.5+i+r-7*(f.length-n+(s.dual?0:p.length)),y:A[a]},request_filters:[{index:1,name:o[0],count:o[1]*h[o[0]]}]}]}))})):[];return[].concat(Object(k.a)(i),Object(k.a)(o))}));e=e.concat(n);var r=p.flatMap((function(t,n){return[{entity_number:e.length+1+2*n,name:"storage-tank",direction:2,position:{x:-4.5-7*(p.length-n+(s.dual?f.length:0)),y:-6.5}},{entity_number:e.length+2+2*n,name:"storage-tank",position:{x:-1.5-7*(p.length-n+(s.dual?f.length:0)),y:-6.5}}]}));e=e.concat(r);var i,a=p.map((function(t,n){return{entity_number:e.length+1+n,name:"pump",position:{x:-.5-7*(p.length-n+(s.dual?f.length:0)),y:-4},direction:4}})),o={entity_number:(e=w(e=e.concat(a),f.length+p.length,s.dual)).length+1,name:"locomotive",position:{x:-3,y:-2},orientation:.25};if(e.push(o),s.dual&&(i={entity_number:e.length+1,name:"locomotive",position:{x:-10-7*(f.length+p.length),y:-2},orientation:.75},e.push(i)),e=(e=e.concat(p.map((function(t,n){return{entity_number:e.length+1+n,name:"fluid-wagon",position:{x:-3-7*(p.length-n+(s.dual?f.length:0)),y:-2},orientation:.75}})))).concat(f.map((function(t,n){return{entity_number:e.length+1+n,name:"cargo-wagon",position:{x:-3-7*(f.length-n+(s.dual?0:p.length)),y:-2},inventory:{filters:t.flatMap((function(e,n){var r=Object(l.a)(e,2),i=r[0],a=r[1];return Array.from(Array(a).keys()).map((function(e){return{name:i,index:1+e+t.slice(0,n).reduce((function(e,t){var n=Object(l.a)(t,2);n[0];return e+n[1]}),0)}}))}))},orientation:.75}}))),"--"!==s.fuel){var c,u=null===(c=Object.entries(g).find((function(e){var t=Object(l.a)(e,2),n=t[0];t[1];return n===s.fuel})))||void 0===c?void 0:c[1];e.push({entity_number:e.length+1,name:"logistic-chest-requester",position:{x:-3.5,y:-4.5},request_filters:[{index:1,name:u,count:3*h[u]}]}),e.push({entity_number:e.length+1,name:"fast-inserter",position:{x:-3.5,y:-3.5}}),s.dual&&(e.push({entity_number:e.length+1,name:"logistic-chest-requester",position:{x:-9.5-7*(f.length+p.length),y:-4.5},request_filters:[{index:1,name:u,count:3*h[u]}]}),e.push({entity_number:e.length+1,name:"fast-inserter",position:{x:-9.5-7*(f.length+p.length),y:-3.5}}))}var m=[{locomotives:[],schedule:[{station:"Engineering Pickup",wait_conditions:[{compare_type:"or",type:"full"}]},{station:"Engineering Dropoff",wait_conditions:[{compare_type:"or",type:"inactivity",ticks:1800}]}]}];return m[0].locomotives.push(o.entity_number),i&&m[0].locomotives.push(i.entity_number),{item:"blueprint",label:"Engineering Provider",entities:e,tiles:[],icons:[],schedules:m,version:77311705089}}),[p,f,s.dual,s.fuel]),v=Object(r.useMemo)((function(){return{item:"blueprint-book",label:"Engineering Stations",blueprints:[{blueprint:b,index:0},{blueprint:y,index:1}],active_index:0,version:77311705089}}),[y,b]),_=Object(r.useMemo)((function(){return"0".concat(btoa(E.a.deflate(JSON.stringify({blueprint_book:v}),{to:"string"})))}),[v]);return i.a.createElement("div",null,i.a.createElement("h2",null,"Blueprint String"),i.a.createElement("div",{style:{border:"1px solid black",wordBreak:"break-all",textAlign:"left",margin:"0 100px 20px"}},i.a.createElement("code",null,_)),i.a.createElement("button",{onClick:function(){return a((function(e){return!e}))}},n?"Hide":"Show"," Unpacked"),n&&i.a.createElement("div",{style:{border:"1px solid black",wordBreak:"break-all",textAlign:"left",margin:"0 100px 20px"}},i.a.createElement("pre",null,JSON.stringify({blueprint_book:v},null,2))))}var C=function(){return i.a.createElement("div",{className:"App"},i.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}},i.a.createElement(y,null),i.a.createElement(p,null),i.a.createElement(_,null)),i.a.createElement(F,null))},N=n(2),J=Object(N.c)({fluids:m.reducer,stacks:f.reducer,other:v.reducer}),z=Object(c.a)({reducer:J,devTools:!1,preloadedState:function(){var e=window.location.hash.trim().slice(1);try{var t=""!==e?E.a.inflate(atob(e),{to:"string"}):localStorage.getItem("state")||"";if(""===t)return;return JSON.parse(t)}catch(n){return}}()});z.dispatch(s()),z.subscribe((function(){!function(e){try{var t=JSON.stringify(e);window.location.hash=btoa(E.a.deflate(t,{to:"string"})),localStorage.setItem("state",t)}catch(n){}}(z.getState())})),o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(d.a,{store:z},i.a.createElement(C,null))),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.d11b651d.chunk.js.map