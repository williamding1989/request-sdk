!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("axios")):"function"==typeof define&&define.amd?define(["exports","axios"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).$req={},e.axios)}(this,(function(e,t){"use strict";const n="api/home";function s(e){return function(e){return t.create(e)}(e)}function o(e){const t=function(){const e=new r,t=s(),n=n=>async(s,o,r)=>{r={method:n,url:s,data:o,...r},await e.emit("beforeRequest",r);try{const n=await t.request(r);return await e.emit("afterRequest",r,n),n}catch(t){return await e.emit("requestError",t),t}};return{on:e.on.bind(e),get:n("GET"),post:n("POST")}}();return e.persist,t.on("beforeRequest",(e=>{})),t.on("afterRequest",((e,t)=>{})),t}class r{constructor(){this.event=new Map}on(e,t){this.event.has(e)||this.event.set(e,[]),this.event.get(e).push(t)}async emit(e,...t){const n=this.event.get(e)||[];for(let e of n)await e(...t)}}const i=o({key:e=>{console.log("key",e)},persist:!0,duration:6e5}),a={hs:{home:async()=>{const e=`http://124.223.0.156:8082/${n}`;try{const{data:t}=await i.post(e);return t}catch(e){return e}}}};e.CreateCacheRequest=o,e.business=a}));
