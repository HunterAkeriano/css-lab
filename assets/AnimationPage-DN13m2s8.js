import{d as L,u as R,c as g,o as b,g as K,a,t as s,e as t,b as _,N as q,w,f as W,_ as X,j,m,k as p,n as Q,i as D,B as J,q as Z,s as aa,x as C,l as ea,I as z,F,r as H,h as ta,y as na,z as ia}from"./index-CaC58y4O.js";import{I as N,S as G}from"./Select-DJhT2NmG.js";import{c as oa}from"./clipboard-Czi8oFf_.js";import{a as sa}from"./examplesData-CRQrlYQv.js";const la={class:"animation-hero"},ra={class:"animation-hero__eyebrow"},da={class:"animation-hero__title"},_a={class:"animation-hero__subtitle"},ca={class:"animation-hero__meta"},ua={class:"animation-hero__chip"},ma={class:"animation-hero__chip"},pa={class:"animation-hero__chip"},va={class:"animation-hero__actions"},ba=["href"],ga=L({__name:"AnimationHero",props:{eyebrow:{},title:{},subtitle:{},backText:{},docsText:{},docsLink:{}},setup(I){const{t:o}=R();return(l,c)=>(b(),g("section",la,[c[0]||(c[0]=K('<div class="animation-hero__orbits" aria-hidden="true" data-v-af11ce27><span class="animation-hero__sun" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_mercury" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_venus" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_earth" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_mars" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_jupiter" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_saturn" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_uranus" data-v-af11ce27></span><span class="animation-hero__ring animation-hero__ring_neptune" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_mercury" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_venus" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_earth" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_mars" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_jupiter" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_saturn" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_uranus" data-v-af11ce27></span><span class="animation-hero__planet animation-hero__planet_neptune" data-v-af11ce27></span></div>',1)),a("p",ra,s(I.eyebrow),1),a("h1",da,s(I.title),1),a("p",_a,s(I.subtitle),1),a("div",ca,[a("span",ua,s(t(o)("ANIMATION.HTML_CSS")),1),a("span",ma,s(t(o)("ANIMATION.LIVE_PREVIEW")),1),a("span",pa,s(t(o)("ANIMATION.KEYFRAMES_READY")),1)]),a("div",va,[_(t(q),{to:"/",className:"button button_primary"},{default:w(()=>[W(s(I.backText),1)]),_:1}),a("a",{class:"animation-hero__link",href:I.docsLink,target:"_blank",rel:"noreferrer"},s(I.docsText),9,ba)])]))}}),Ia=X(ga,[["__scopeId","data-v-af11ce27"]]),Aa={class:"animation-builder"},Na={class:"animation-builder__header"},ha={class:"animation-builder__tag"},Ta={class:"animation-builder__title"},ya={class:"animation-builder__subtitle"},fa={class:"animation-builder__container"},Oa={class:"animation-builder__content"},$a={class:"animation-builder__controls-section"},xa={class:"animation-builder__controls"},Ea={class:"animation-builder__right"},Sa={class:"animation-builder__preview-section"},Ma={class:"animation-builder__section-label"},Va={class:"animation-builder__code-section"},Ca={class:"animation-builder__code"},ka={class:"animation-builder__code-toolbar"},wa={class:"animation-builder__code-mode"},La={class:"animation-builder__toggle",role:"group","aria-label":"Code view mode"},Ra={class:"code-block"},Pa={class:"animation-builder__code-actions"},E="style-engine-motion",Ua=L({__name:"AnimationBuilder",setup(I){const{t:o}=R(),l=j(),c=m(1200),h=m(0),v=m("cubic-bezier(0.3, 0.8, 0.4, 1)"),T=m("infinite"),y=m(24),u=m(-16),d=m(.96),O=m(1.06),x=m(.72),S=m(1),f=m(!0),P=[{label:"Ease",value:"ease"},{label:"Linear",value:"linear"},{label:"Ease-in-out",value:"ease-in-out"},{label:"Custom (soft)",value:"cubic-bezier(0.3, 0.8, 0.4, 1)"}],$=[{label:"Infinite",value:"infinite"},{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"}],A=p(()=>({startX:y.value*-1,endX:y.value,startY:u.value,endY:u.value*-1,startScale:d.value,endScale:O.value,startOpacity:x.value,endOpacity:S.value,duration:c.value,delay:h.value,easing:v.value,iterations:T.value})),U=p(()=>{const e=A.value;return{"--motion-start-x":`${e.startX}px`,"--motion-end-x":`${e.endX}px`,"--motion-start-y":`${e.startY}px`,"--motion-end-y":`${e.endY}px`,"--motion-start-scale":`${e.startScale}`,"--motion-end-scale":`${e.endScale}`,"--motion-start-opacity":`${e.startOpacity}`,"--motion-end-opacity":`${e.endOpacity}`,"--motion-duration":`${e.duration}ms`,"--motion-delay":`${e.delay}ms`,"--motion-easing":e.easing,"--motion-iterations":e.iterations}}),Y=p(()=>{const e=A.value;return`<div class="motion-preview">
  <div class="motion-preview__dot"></div>
  <div class="motion-preview__card">CSS Motion</div>
</div>

.motion-preview {
  --motion-start-x: ${e.startX}px;
  --motion-end-x: ${e.endX}px;
  --motion-start-y: ${e.startY}px;
  --motion-end-y: ${e.endY}px;
  --motion-start-scale: ${e.startScale};
  --motion-end-scale: ${e.endScale};
  --motion-start-opacity: ${e.startOpacity};
  --motion-end-opacity: ${e.endOpacity};
  --motion-duration: ${e.duration}ms;
  --motion-delay: ${e.delay}ms;
  --motion-easing: ${e.easing};
  --motion-iterations: ${e.iterations};
  position: relative;
  display: grid;
  place-items: center;
  width: 220px;
  height: 160px;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 30%, rgba(104, 185, 255, 0.14), #0b1120);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.motion-preview__dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7dd3fc;
  animation: ${E} var(--motion-duration) var(--motion-easing) var(--motion-delay) var(--motion-iterations) alternate;
}

.motion-preview__card {
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #e2e8f0;
  font-weight: 600;
  animation: ${E} var(--motion-duration) var(--motion-easing) var(--motion-delay) var(--motion-iterations) alternate;
}

@keyframes ${E} {
  0% {
    transform: translate(var(--motion-start-x), var(--motion-start-y)) scale(var(--motion-start-scale));
    opacity: var(--motion-start-opacity);
  }
  100% {
    transform: translate(var(--motion-end-x), var(--motion-end-y)) scale(var(--motion-end-scale));
    opacity: var(--motion-end-opacity);
  }
}`}),M=p(()=>{const e=A.value;return`<div class="motion-preview">
  <div class="motion-preview__dot"></div>
  <div class="motion-preview__card">CSS Motion</div>
</div>

.motion-preview {
  position: relative;
  display: grid;
  place-items: center;
  width: 220px;
  height: 160px;
  border-radius: 16px;
  background: radial-gradient(circle at 30% 30%, rgba(104, 185, 255, 0.14), #0b1120);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.motion-preview__dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7dd3fc;
  animation: ${E} ${e.duration}ms ${e.easing} ${e.delay}ms ${e.iterations} alternate;
}

.motion-preview__card {
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #e2e8f0;
  font-weight: 600;
  animation: ${E} ${e.duration}ms ${e.easing} ${e.delay}ms ${e.iterations} alternate;
}

@keyframes ${E} {
  0% {
    transform: translate(${e.startX}px, ${e.startY}px) scale(${e.startScale});
    opacity: ${e.startOpacity};
  }
  100% {
    transform: translate(${e.endX}px, ${e.endY}px) scale(${e.endScale});
    opacity: ${e.endOpacity};
  }
}`}),k=p(()=>f.value?Y.value:M.value);async function i(){await oa(k.value)&&l.success(o("COMMON.COPIED_TO_CLIPBOARD"))}return(e,n)=>(b(),g("div",Aa,[a("div",Na,[a("p",ha,s(t(o)("ANIMATION.BUILDER_TAG")),1),a("h2",Ta,s(t(o)("ANIMATION.BUILDER_TITLE")),1),a("p",ya,s(t(o)("ANIMATION.BUILDER_SUBTITLE")),1)]),a("div",fa,[a("div",Oa,[a("div",$a,[n[12]||(n[12]=a("p",{class:"animation-builder__section-label"},"Controls",-1)),a("div",xa,[_(t(N),{modelValue:c.value,"onUpdate:modelValue":n[0]||(n[0]=r=>c.value=r),type:"number",label:t(o)("ANIMATION.DURATION"),suffix:"ms"},null,8,["modelValue","label"]),_(t(N),{modelValue:h.value,"onUpdate:modelValue":n[1]||(n[1]=r=>h.value=r),type:"number",label:t(o)("ANIMATION.DELAY"),suffix:"ms"},null,8,["modelValue","label"]),_(t(G),{modelValue:v.value,"onUpdate:modelValue":n[2]||(n[2]=r=>v.value=r),options:P,label:t(o)("ANIMATION.EASING")},null,8,["modelValue","label"]),_(t(G),{modelValue:T.value,"onUpdate:modelValue":n[3]||(n[3]=r=>T.value=r),options:$,label:t(o)("ANIMATION.LOOPS")},null,8,["modelValue","label"]),_(t(N),{modelValue:y.value,"onUpdate:modelValue":n[4]||(n[4]=r=>y.value=r),type:"number",label:t(o)("ANIMATION.DISTANCE_X"),suffix:"px"},null,8,["modelValue","label"]),_(t(N),{modelValue:u.value,"onUpdate:modelValue":n[5]||(n[5]=r=>u.value=r),type:"number",label:t(o)("ANIMATION.DISTANCE_Y"),suffix:"px"},null,8,["modelValue","label"]),_(t(N),{modelValue:d.value,"onUpdate:modelValue":n[6]||(n[6]=r=>d.value=r),type:"number",label:t(o)("ANIMATION.SCALE_FROM"),step:"0.01"},null,8,["modelValue","label"]),_(t(N),{modelValue:O.value,"onUpdate:modelValue":n[7]||(n[7]=r=>O.value=r),type:"number",label:t(o)("ANIMATION.SCALE_TO"),step:"0.01"},null,8,["modelValue","label"]),_(t(N),{modelValue:x.value,"onUpdate:modelValue":n[8]||(n[8]=r=>x.value=r),type:"number",label:t(o)("ANIMATION.OPACITY_FROM"),step:"0.05",min:"0",max:"1"},null,8,["modelValue","label"]),_(t(N),{modelValue:S.value,"onUpdate:modelValue":n[9]||(n[9]=r=>S.value=r),type:"number",label:t(o)("ANIMATION.OPACITY_TO"),step:"0.05",min:"0",max:"1"},null,8,["modelValue","label"])])]),a("div",Ea,[a("div",Sa,[a("p",Ma,s(t(o)("ANIMATION.PREVIEW")),1),a("div",{class:"motion-preview",style:Q(U.value)},[...n[13]||(n[13]=[a("div",{class:"motion-preview__dot"},null,-1),a("div",{class:"motion-preview__card"},"CSS Motion",-1)])],4)]),a("div",Va,[n[15]||(n[15]=a("p",{class:"animation-builder__section-label"},"Code",-1)),a("div",Ca,[n[14]||(n[14]=a("div",{class:"animation-builder__code-controls"},[a("span"),a("span"),a("span")],-1)),a("div",ka,[a("span",wa,s(t(o)("ANIMATION.CODE_VIEW")),1),a("div",La,[a("button",{type:"button",class:D(["animation-builder__toggle-button",{"animation-builder__toggle-button_active":f.value}]),onClick:n[10]||(n[10]=r=>f.value=!0)},s(t(o)("ANIMATION.CODE_VIEW_VARIABLES")),3),a("button",{type:"button",class:D(["animation-builder__toggle-button",{"animation-builder__toggle-button_active":!f.value}]),onClick:n[11]||(n[11]=r=>f.value=!1)},s(t(o)("ANIMATION.CODE_VIEW_VALUES")),3)])]),a("pre",Ra,s(k.value),1),a("div",Pa,[_(t(J),{variant:"primary",size:"sm",onClick:i},{default:w(()=>[W(s(t(o)("ANIMATION.COPY_SNIPPET")),1)]),_:1})])])])])])])]))}}),Ya=X(Ua,[["__scopeId","data-v-fb850f45"]]),Ba={class:"animation-examples"},Da={class:"animation-page__gallery-header"},Ga={class:"animation-page__gallery-tag"},Wa={class:"animation-page__gallery-title"},Xa={class:"animation-page__gallery-subtitle"},za={class:"animation-page__legend"},Fa={class:"animation-page__controls"},Ha={class:"animation-page__search"},qa={class:"animation-page__filter"},Ka={class:"animation-page__results"},ja={key:0,class:"animation-page__loading"},Qa={class:"animation-page__loading-text"},Ja={key:1,class:"animation-page__empty"},Za={class:"animation-page__empty-title"},ae={class:"animation-page__empty-text"},ee={key:2,class:"animation-page__cards"},te={class:"animation-card__head"},ne={class:"animation-card__tag"},ie={class:"animation-card__title"},oe={class:"animation-card__description"},se={class:"animation-card__preview"},le={key:3,class:"animation-page__pagination"},re=["disabled"],de={class:"animation-page__pagination-numbers"},_e=["onClick"],ce=["disabled"],B=12,ue=L({__name:"AnimationExamplesGrid",props:{examples:{}},setup(I){const o=I,{t:l}=R(),c=Z(),h=aa(),v=m(c.query.search??""),T=m(v.value),y=m(!1),u=m(c.query.category??"all"),d=m(Number(c.query.page)>0?Number(c.query.page):1);let O=null;const x=p(()=>["all","loaders","marquee","effects","transitions","orbital","interactive"]),S=p(()=>[{label:l("ANIMATION.ALL_TYPES"),value:"all"},{label:l("ANIMATION.CATEGORY.LOADERS"),value:"loaders"},{label:l("ANIMATION.CATEGORY.MARQUEE"),value:"marquee"},{label:l("ANIMATION.CATEGORY.EFFECTS"),value:"effects"},{label:l("ANIMATION.CATEGORY.TRANSITIONS"),value:"transitions"},{label:l("ANIMATION.CATEGORY.ORBITAL"),value:"orbital"},{label:l("ANIMATION.CATEGORY.INTERACTIVE"),value:"interactive"}]),f=p(()=>Array.isArray(o.examples.value)?o.examples.value:o.examples),P=p(()=>f.value.length),$=p(()=>{let i=f.value;if(u.value!=="all"&&(i=i.filter(e=>e.category===u.value)),T.value.trim()){const e=T.value.toLowerCase().trim();i=i.filter(n=>{const r=l(n.titleKey).toLowerCase(),V=l(n.descriptionKey).toLowerCase();return r.includes(e)||V.includes(e)})}return i}),A=p(()=>Math.ceil($.value.length/B)),U=p(()=>{const i=(d.value-1)*B,e=i+B;return $.value.slice(i,e)}),Y=p(()=>{const i=[];let n=Math.max(1,d.value-Math.floor(2.5));const r=Math.min(A.value,n+5-1);r-n+1<5&&(n=Math.max(1,r-5+1));for(let V=n;V<=r;V++)i.push(V);return i});function M(i){i>=1&&i<=A.value&&(d.value=i)}C(v,i=>{O&&clearTimeout(O),i.trim()&&(y.value=!0),O=setTimeout(()=>{T.value=i,y.value=!1,d.value=1},500)}),C(u,()=>{d.value=1});function k(){const i={...c.query};v.value.trim()?i.search=v.value.trim():delete i.search,u.value!=="all"?i.category=u.value:delete i.category,d.value>1?i.page=String(d.value):delete i.page,h.replace({query:i})}return C([v,u,d],k),C(()=>c.query,i=>{const e=i.search??"",n=i.category??"all",r=Number(i.page)>0?Number(i.page):1;e!==v.value&&(v.value=e,T.value=e),x.value.includes(n)&&n!==u.value?u.value=n:!x.value.includes(n)&&u.value!=="all"&&(u.value="all"),r!==d.value&&(d.value=r)}),C($,()=>{d.value>A.value&&(d.value=Math.max(1,A.value))}),(i,e)=>(b(),g("div",Ba,[a("div",Da,[a("div",null,[a("p",Ga,s(t(l)("ANIMATION.SNIPPETS_TAG")),1),a("h2",Wa,s(t(l)("ANIMATION.SNIPPETS_TITLE")),1),a("p",Xa,s(t(l)("ANIMATION.SNIPPETS_SUBTITLE")),1)]),a("div",za,[e[4]||(e[4]=a("span",{class:"animation-page__dot animation-page__dot_primary"},null,-1)),a("span",null,s(t(l)("ANIMATION.HTML_CSS")),1)])]),a("div",Fa,[a("div",Ha,[_(t(N),{modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=n=>v.value=n),type:"text",placeholder:t(l)("ANIMATION.SEARCH_PLACEHOLDER"),label:t(l)("ANIMATION.SEARCH_LABEL")},{prefix:w(()=>[_(t(z),{name:"icon-search",size:16})]),_:1},8,["modelValue","placeholder","label"])]),a("div",qa,[_(t(G),{modelValue:u.value,"onUpdate:modelValue":e[1]||(e[1]=n=>u.value=n),options:S.value,label:t(l)("ANIMATION.FILTER_BY_TYPE")},null,8,["modelValue","options","label"])]),a("div",Ka,s(t(l)("ANIMATION.SHOWING_RESULTS",{count:$.value.length,total:P.value})),1)]),y.value?(b(),g("div",ja,[e[5]||(e[5]=a("div",{class:"animation-page__loader"},[a("span"),a("span"),a("span"),a("span")],-1)),a("p",Qa,s(t(l)("ANIMATION.SEARCHING")),1)])):$.value.length===0?(b(),g("div",Ja,[_(t(z),{name:"icon-search",size:48,class:"animation-page__empty-icon"}),a("h3",Za,s(t(l)("ANIMATION.NO_RESULTS")),1),a("p",ae,s(t(l)("ANIMATION.NO_RESULTS_HINT")),1)])):(b(),g("div",ee,[(b(!0),g(F,null,H(U.value,n=>(b(),g("article",{key:n.id,class:"animation-card"},[a("div",te,[a("div",null,[a("p",ne,s(t(l)("ANIMATION.PREVIEW")),1),a("h3",ie,s(t(l)(n.titleKey)),1),a("p",oe,s(t(l)(n.descriptionKey)),1)])]),a("div",se,[(b(),ta(na(n.component)))]),_(t(q),{className:"animation-card__link",to:`/animation/${n.id}`},{default:w(()=>[W(s(t(l)("ANIMATION.OPEN")),1)]),_:1},8,["to"])]))),128))])),A.value>1?(b(),g("div",le,[a("button",{class:"animation-page__pagination-button",disabled:d.value===1,onClick:e[2]||(e[2]=n=>M(d.value-1))},s(t(l)("ANIMATION.PREVIOUS")),9,re),a("div",de,[(b(!0),g(F,null,H(Y.value,n=>(b(),g("button",{key:n,class:D(["animation-page__pagination-number",{active:d.value===n}]),onClick:r=>M(n)},s(n),11,_e))),128))]),a("button",{class:"animation-page__pagination-button",disabled:d.value===A.value,onClick:e[3]||(e[3]=n=>M(d.value+1))},s(t(l)("ANIMATION.NEXT")),9,ce)])):ea("",!0)]))}}),me=X(ue,[["__scopeId","data-v-8abe0bc4"]]),pe={class:"animation-page"},ve={class:"container"},be={class:"animation-page__builder-section"},ge={class:"animation-page__examples"},Te=L({__name:"AnimationPage",setup(I){const{t:o}=R(),l=p(()=>sa.map(c=>({...c,component:ia(c.component)})));return(c,h)=>(b(),g("div",pe,[h[0]||(h[0]=a("div",{class:"animation-page__background"},[a("span",{class:"animation-page__beam animation-page__beam_left"}),a("span",{class:"animation-page__beam animation-page__beam_right"}),a("span",{class:"animation-page__grid-lines"})],-1)),a("div",ve,[_(t(Ia),{eyebrow:t(o)("ANIMATION.EYEBROW"),title:t(o)("ANIMATION.TITLE"),subtitle:t(o)("ANIMATION.SUBTITLE"),"back-text":t(o)("ANIMATION.BACK"),"docs-text":t(o)("ANIMATION.DOCS"),"docs-link":"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations"},null,8,["eyebrow","title","subtitle","back-text","docs-text"]),a("section",be,[_(t(Ya))]),a("section",ge,[_(t(me),{examples:l.value},null,8,["examples"])])])]))}});export{Te as default};
