import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import fs from 'node:fs';
import ts from 'typescript';
import * as inquiryValidation from '../app/lib/inquiry-validation.ts';
function moduleFor(file, context, modules) {
 const source=fs.readFileSync(new URL(file,import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 const exports={};vm.runInNewContext(code,{exports,require:n=>modules[n],...context});return exports;
}
const source={source:'chatgpt',medium:'paid',campaign:'qa',content:'qa',landingPath:'/products/'};
test('analytics uses Arguments commands and respects consent even with blocked storage',()=>{
 const effects=[];let state;const window={localStorage:{getItem(){throw Error()},setItem(){throw Error()}},location:{pathname:'/contact/',href:'https://deesheng.food/contact/'},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};
 const api=moduleFor('../app/components/GoogleAnalytics.tsx',{window,document:{title:'Contact',createElement:()=>({}),head:{appendChild(){}}}},{'react':{useEffect:f=>effects.push(f),useState:()=>[state,v=>state=v]},'next/navigation':{usePathname:()=>'/contact/'},'../lib/inquiry-source':{getInquirySource:()=>source},'react/jsx-runtime':{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})}});
 api.trackAnalyticsEvent('blocked');assert.equal(window.dataLayer,undefined);
 state='pending';const tree=api.GoogleAnalytics();const buttons=tree.props.children[1].props.children;buttons[0].props.onClick();api.trackAnalyticsEvent('allowed');assert.equal(Object.prototype.toString.call(window.dataLayer[0]),'[object Arguments]');assert.ok(window.dataLayer.some(x=>x[1]==='allowed'));
 buttons[1].props.onClick();let n=window.dataLayer.length;api.trackAnalyticsEvent('blocked');assert.equal(window.dataLayer.length,n);
});
for(const popup of [true,false]) test(`WhatsApp opens immediately, independent of failed save (popup=${popup})`,async()=>{
 const calls=[],events=[];let reject;const pending=new Promise((_,r)=>reject=r);const window={location:{search:'',assign:url=>calls.push(['assign',url])},open:url=>{calls.push(['open',url]);return popup?{}:null}};
 const fields={company:'QA company',country:'Australia',businessType:'Importer / Distributor',product:'Kimchi',quantity:'Container'};
 const api=moduleFor('../app/contact/QuoteForm.tsx',{window,location:{pathname:'/contact/'},FormData:class{get(k){return fields[k]||''}},URLSearchParams,AbortSignal,fetch:(url,opts)=>{calls.push(['fetch',opts]);return pending}},{'react':{useEffect(){},useRef:()=>({}),useState:v=>[v,()=>{}]},'../components/GoogleAnalytics':{trackAnalyticsEvent:(...x)=>events.push(x)},'../lib/inquiry-validation':inquiryValidation,'../lib/inquiry-source':{getInquirySource:()=>source,inquirySourceLines:()=>['Website source: chatgpt / paid']},'react/jsx-runtime':{jsx:(type,props)=>({type,props}),jsxs:(type,props)=>({type,props})}});
 const work=api.QuoteForm({}).props.onSubmit({preventDefault(){},currentTarget:{}});
 assert.equal(calls[0][0],'open');assert.match(calls[0][1],/^https:\/\/wa.me\//);assert.equal(calls[1][1].keepalive,true);assert.equal(calls.some(x=>x[0]==='assign'),false);reject(Error('offline'));await work;assert.ok(events.some(x=>x[0]==='inquiry_record_failed'));assert.ok(!JSON.stringify(events).includes('QA company'));
});
