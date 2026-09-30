(()=>{let re=window.D=window.D||{},h=(re.clamp=(e,t,a)=>Math.min(a,Math.max(t,e)),re.mix=(e,t,a)=>e+(t-e)*a,re.fract=e=>e-Math.floor(e),re.smooth=(e,t,a)=>{a=re.clamp((a-e)/(t-e),0,1);return a*a*(3-2*a)},re.easeInOut=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,re.easeOut=e=>1-Math.pow(1-re.clamp(e,0,1),3),re.easeIn=e=>Math.pow(re.clamp(e,0,1),3),re.rng=t=>()=>{t=t+1831565813|0;var e=Math.imul(t^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/4294967296},re.v3={add:(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],sub:(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],mul:(e,t)=>[e[0]*t,e[1]*t,e[2]*t],mix:(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],dot:(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],cross:(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],len:e=>Math.hypot(e[0],e[1],e[2]),norm:e=>{var t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}});re.spline=(e,t)=>{let a=e.length-1,o=re.clamp(t,0,1)*a,r=Math.min(Math.floor(o),a-1),l=o-r,c=e[Math.max(r-1,0)],i=e[r],n=e[r+1],s=e[Math.min(r+2,a)],f=l*l,d=f*l;return i.map((e,t)=>.5*(2*i[t]+(-c[t]+n[t])*l+(2*c[t]-5*i[t]+4*n[t]-s[t])*f+(-c[t]+3*i[t]-3*n[t]+s[t])*d))},re.camera=(e,t,a,o,r,l,c=.05,i=500)=>{let n=h.norm(h.sub(t,e)),s=[Math.sin(a),Math.cos(a),0],f=(.999<Math.abs(h.dot(n,h.norm(s)))&&(s=[0,0,1]),h.norm(h.cross(n,s))),d=h.cross(f,n);l&&(n=h.norm(h.add(n,h.add(h.mul(f,Math.tan(.14*l[0])),h.mul(d,Math.tan(.09*l[1]))))),f=h.norm(h.cross(n,d)),d=h.cross(f,n));var t=Math.tan(o*Math.PI/360),u=new Float32Array([f[0],d[0],-n[0],0,f[1],d[1],-n[1],0,f[2],d[2],-n[2],0,-h.dot(f,e),-h.dot(d,e),h.dot(n,e),1]),a=1/t,l=1/(c-i),v=new Float32Array([a/r,0,0,0,0,a,0,0,0,0,(i+c)*l,-1,0,0,2*i*c*l,0]),p=new Float32Array(16);for(let o=0;o<4;o++)for(let a=0;a<4;a++){let t=0;for(let e=0;e<4;e++)t+=v[4*e+a]*u[4*o+e];p[4*o+a]=t}return{pos:e,rot:new Float32Array([...f,...d,...n]),tanHalf:t,vp:p,fwd:n,right:f,up:d}},re.project=(e,t,a)=>{var t=h.sub(t,e.pos),o=h.dot(t,e.fwd);return[h.dot(t,e.right)/(o*e.tanHalf*a)*.5+.5,h.dot(t,e.up)/(o*e.tanHalf)*.5+.5,0<o?1:0]},re.lastBefore=(e,t)=>{let a=0,o=e.length-1,r=-1;for(;a<=o;){var l=a+o>>1;e[l]<=t?(r=l,a=1+l):o=l-1}return r},re.envelope=(e,t,a)=>{var o=re.lastBefore(e,t);return o<0?0:Math.exp(-(t-e[o])*a)};{let P=re.gl={init:e=>{e=e.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(e)return P.gl=e,P.floatRT=!!e.getExtension("EXT_color_buffer_float"),e.getExtension("EXT_float_blend"),e.getExtension("OES_texture_float_linear"),P.parallel=e.getExtension("KHR_parallel_shader_compile"),P.vao=e.createVertexArray(),e.bindVertexArray(P.vao),e;throw new Error("WebGL2 is required")}};P.FULLSCREEN_VS=`#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2. - 1., 0., 1.); }`,P.program=(e,t,a)=>{let o=P.gl,r=(e,t)=>{e=o.createShader(e);return o.shaderSource(e,t),o.compileShader(e),e},l=o.createProgram(),c=r(o.VERTEX_SHADER,t),i=r(o.FRAGMENT_SHADER,a);return o.attachShader(l,c),o.attachShader(l,i),o.linkProgram(l),{name:e,p:l,v:c,f:i,vs:t,fs:a,uniforms:null}},P.isReady=e=>!P.parallel||P.gl.getProgramParameter(e.p,P.parallel.COMPLETION_STATUS_KHR),P.finish=t=>{var e,a,o,r=P.gl;if(!t.uniforms){if(!r.getProgramParameter(t.p,r.LINK_STATUS))throw o=r.getShaderInfoLog(t.v),a=r.getShaderInfoLog(t.f),e=r.getProgramInfoLog(t.p),console.error(`[${t.name}] link failed
VS: ${o}
FS: ${a}
PROG: `+e),e=a?t.fs:t.vs,(a=/ERROR: \d+:(\d+)/.exec(a||o))&&(o=+a[1],console.error(e.split("\n").map((e,t)=>String(t+1).padStart(4)+": "+e).join("\n").split("\n").slice(Math.max(0,o-6),3+o).join("\n"))),new Error("shader "+t.name);t.uniforms={};var l=r.getProgramParameter(t.p,r.ACTIVE_UNIFORMS);for(let e=0;e<l;e++){var c=r.getActiveUniform(t.p,e),i=c.name.replace(/\[0\]$/,"");t.uniforms[i]={loc:r.getUniformLocation(t.p,c.name),type:c.type,size:c.size}}}return t},P.use=(e,t)=>{var a,o=P.gl;o.useProgram(e.p);let r=0;for(a in t){var l=e.uniforms[a];if(l){var c=t[a];switch(l.type){case o.FLOAT:1<l.size?o.uniform1fv(l.loc,c):o.uniform1f(l.loc,c);break;case o.FLOAT_VEC2:o.uniform2fv(l.loc,c);break;case o.FLOAT_VEC3:o.uniform3fv(l.loc,c);break;case o.FLOAT_VEC4:o.uniform4fv(l.loc,c);break;case o.FLOAT_MAT3:o.uniformMatrix3fv(l.loc,!1,c);break;case o.FLOAT_MAT4:o.uniformMatrix4fv(l.loc,!1,c);break;case o.INT:case o.BOOL:o.uniform1i(l.loc,c);break;case o.SAMPLER_2D:case o.SAMPLER_3D:o.activeTexture(o.TEXTURE0+r),o.bindTexture(l.type===o.SAMPLER_3D?o.TEXTURE_3D:o.TEXTURE_2D,c.tex||c),o.uniform1i(l.loc,r++)}}}},P.target=(e,t,a=!0)=>{var o=P.gl,r=o.createTexture(),a=(o.bindTexture(o.TEXTURE_2D,r),a&&P.floatRT),a=(o.texImage2D(o.TEXTURE_2D,0,a?o.RGBA16F:o.RGBA8,e,t,0,o.RGBA,a?o.HALF_FLOAT:o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.createFramebuffer());return o.bindFramebuffer(o.FRAMEBUFFER,a),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:r,fb:a,w:e,h:t}},P.free=e=>{e&&(P.gl.deleteTexture(e.tex),P.gl.deleteFramebuffer(e.fb))},P.bind=(e,t)=>{var a=P.gl;a.bindFramebuffer(a.FRAMEBUFFER,e?e.fb:null),a.viewport(0,0,e?e.w:a.drawingBufferWidth,e?e.h:a.drawingBufferHeight),t&&(a.clearColor(0,0,0,1),a.clear(a.COLOR_BUFFER_BIT))},P.quad=()=>P.gl.drawArrays(P.gl.TRIANGLES,0,3),P.noise3D=()=>{let e=P.gl,t=re.rng(1337),r=[0,1,2,3].map(()=>Float32Array.from({length:4096},t)),l=new Uint8Array(1048576),o=e=>e*e*e*(e*(6*e-15)+10),c=0;for(let a=0;a<64;a++)for(let t=0;t<64;t++)for(let e=0;e<64;e++){var i=e/4,n=t/4,s=a/4,f=Math.floor(i),d=Math.floor(n),u=Math.floor(s),v=o(i-f),p=o(n-d),h=o(s-u),m=f%16,x=(f+1)%16,g=d%16,b=(d+1)%16,y=u%16,M=(u+1)%16;for(let a=0;a<4;a++){let o=r[a],e=(e,t,a)=>o[e+16*(t+16*a)],t=re.mix(re.mix(re.mix(e(m,g,y),e(x,g,y),v),re.mix(e(m,b,y),e(x,b,y),v),p),re.mix(re.mix(e(m,g,M),e(x,g,M),v),re.mix(e(m,b,M),e(x,b,M),v),p),h);l[c++]=Math.round(255*t)}}var a,w=e.createTexture();e.bindTexture(e.TEXTURE_3D,w),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,64,64,64,0,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(a of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,a,e.REPEAT);return w},P.canvasTexture=()=>{var e=P.gl,t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t},P.upload=(e,t)=>{var a=P.gl;a.bindTexture(a.TEXTURE_2D,e),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1)}}var e,t;(e=re.shaders=re.shaders||{}).lib=`
#define PI 3.14159265
#define TAU 6.28318531
#define sat(x) clamp(x, 0., 1.)
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float hash11(float p){ p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash21(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float hash31(vec3 p3){ p3 = fract(p3 * .1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
vec3 hash33(vec3 p3){ p3 = fract(p3 * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }
uint pcg(uint v){ uint s = v * 747796405u + 2891336453u; uint w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
vec4 hash4u(uint id){ uint a = pcg(id), b = pcg(a ^ 0x9e3779b9u), c = pcg(b), d = pcg(c); return vec4(a, b, c, d) * (1. / 4294967296.); }
float sdBox(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float sdRBox(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.) - r; }
float sdBox2(vec2 p, vec2 b){ vec2 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, q.y), 0.); }
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = sat(dot(pa, ba) / dot(ba, ba)); return length(pa - ba * h); }
vec2 sphIntersect(vec3 ro, vec3 rd, float r){ float b = dot(ro, rd), c = dot(ro, ro) - r * r, h = b * b - c; if (h < 0.) return vec2(-1.); h = sqrt(h); return vec2(-b - h, -b + h); }
float inscatter(vec3 ro, vec3 rd, vec3 lp, float tmax){ vec3 q = ro - lp; float b = dot(rd, q), c = dot(q, q), h = sqrt(max(c - b * b, 1e-6)); return (atan((tmax + b) / h) - atan(b / h)) / h; }
`,e.noiseLib=`
uniform highp sampler3D uNoise;
vec4 tnoise(vec3 p){ return texture(uNoise, p * (1. / 16.)); }
float noise(vec3 p){ return texture(uNoise, p * (1. / 16.)).x; }
float fbm(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 5; i++){ s += a * noise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; } return s; }
float fbm3(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 3; i++){ s += a * noise(p); p = p * 2.07 + vec3(4.1, 2.3, 7.7); a *= .5; } return s * 1.14; }
vec3 heat(float t){
t = sat(t);
vec3 a = mix(vec3(.06, .005, .0), vec3(1., .22, .03), smoothstep(0., .35, t));
vec3 b = mix(vec3(1., .75, .35), vec3(.75, .88, 1.25), smoothstep(.65, 1., t));
return mix(a, b, smoothstep(.3, .75, t)) * (.3 + 3. * t * t);
}
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){ return a + b * cos(TAU * (c * t + d)); }
vec3 starfield(vec3 rd, float dens, float bright){
vec3 col = vec3(0);
for (int i = 0; i < 3; i++){
float sc = 55. + float(i) * 45.;
vec3 p = rd * sc, id = floor(p), f = fract(p) - .5;
float h = hash31(id + float(i) * 17.3);
if (h > 1. - dens){
vec3 o = (hash33(id + 3.1) - .5) * .5;
float d = length(f - o);
float b = pow(hash11(h * 91.7), 6.) * 4. + .25;
col += b * exp(-d * d * 160.) * mix(vec3(1., .72, .5), vec3(.62, .8, 1.), hash11(h * 7.3));
}
}
return col * bright;
}
vec3 nebula(vec3 rd, vec3 c1, vec3 c2, float t){
float n = fbm3(rd * 2.2 + vec3(0., 0., t));
float m = fbm3(rd * 4.5 + n * 1.8 + 4.);
return c1 * pow(n, 3.) * 1.6 + c2 * pow(m, 5.) * 2.2;
}
`,e.sceneHead=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform float uTime, uLocal, uBeat, uKick, uSnare, uHat;
uniform vec3 uCamPos;
uniform mat3 uCamRot;
uniform float uTanHalf;
uniform vec2 uMouse;
uniform vec4 uP0, uP1, uP2, uP3;
out vec4 outColor;
`+e.lib+e.noiseLib+`
vec3 rayDir(){ vec2 uv = (2. * gl_FragCoord.xy - uRes) / uRes.y; return normalize(uCamRot * vec3(uv * uTanHalf, 1.)); }
float dither(){ return hash21(gl_FragCoord.xy + fract(uTime * 7.13) * 91.); }
`,e.partHead=`#version 300 es
precision highp float;
uniform mat4 uVP;
uniform vec3 uCamPos;
uniform float uPx, uTime, uLocal, uKick, uSnare, uMirror, uCount;
uniform vec4 uP0, uP1, uP2, uP3;
out vec3 vCol;
`+e.lib+e.noiseLib+`
float gauss(vec2 u){ return sqrt(-2. * log(max(u.x, 1e-6))) * cos(TAU * u.y); }
vec3 sphereDir(vec2 u){ float z = u.x * 2. - 1., a = u.y * TAU, s = sqrt(1. - z * z); return vec3(s * cos(a), z, s * sin(a)); }
void emit(vec3 pos, vec3 col, float size){
if (uMirror > .5){ pos.y = -pos.y; col *= .22; }
vec4 cp = uVP * vec4(pos, 1.);
gl_Position = cp;
float px = size * uPx / max(cp.w, 1e-3);
float a = 1.;
if (px < 1.6){ a = px * px / 2.56; px = 1.6; }
if (px > 40.){ a *= 40. / px; px = 40.; }
if (cp.w < .02) a = 0.;
vCol = col * a;
gl_PointSize = px;
}
`,e.partFS=`#version 300 es
precision highp float;
in vec3 vCol; out vec4 o;
void main(){ vec2 c = gl_PointCoord * 2. - 1.; float d = dot(c, c); if (d > 1.) discard; float f = 1. - d; o = vec4(vCol * f * f * 1.6, 1.); }
`,(e=re.shaders).trail=(a=`#version 300 es
precision highp float;
out vec4 o;
`)+`
uniform sampler2D uCur, uPrev; uniform vec2 uRes; uniform float uDecay;
void main(){ vec2 uv = gl_FragCoord.xy / uRes; vec3 c = texture(uCur, uv).rgb, p = texture(uPrev, uv).rgb * uDecay; o = vec4(max(c, p), 1.); }`,e.god=a+`
uniform sampler2D uSrc; uniform vec2 uRes, uLight; uniform float uThresh, uLen;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
vec2 uv = gl_FragCoord.xy / uRes;
vec2 d = (uLight - uv) * uLen / 48.;
vec2 p = uv + d * h(gl_FragCoord.xy);
vec3 acc = vec3(0); float w = 1.;
for (int i = 0; i < 48; i++){ vec3 c = texture(uSrc, p).rgb; acc += max(c - uThresh, 0.) * w; w *= .955; p += d; }
o = vec4(acc / 16., 1.);
}`,e.bloomPre=a+`
uniform sampler2D uSrc, uText; uniform vec2 uRes, uTexel; uniform float uThresh, uTextGlow;
vec3 q(vec2 uv){ return texture(uSrc, uv).rgb; }
void main(){
vec2 uv = gl_FragCoord.xy / uRes, t = uTexel;
vec3 c = q(uv) * .5 + (q(uv + vec2(-t.x, -t.y)) + q(uv + vec2(t.x, -t.y)) + q(uv + vec2(-t.x, t.y)) + q(uv + t)) * .125;
vec4 tx = texture(uText, uv);
c += tx.rgb * tx.a * uTextGlow;
float br = max(c.r, max(c.g, c.b));
float soft = clamp(br - uThresh + .5, 0., 1.); soft = soft * soft * .5;
float contrib = max(soft, br - uThresh) / max(br, 1e-4);
o = vec4(min(c * contrib, vec3(60.)), 1.);
}`,e.down=a+`
uniform sampler2D uSrc; uniform vec2 uRes, uTexel;
vec3 q(vec2 uv){ return texture(uSrc, uv).rgb; }
void main(){
vec2 uv = gl_FragCoord.xy / uRes, t = uTexel;
vec3 a = q(uv + t * vec2(-2, 2)), b = q(uv + t * vec2(0, 2)), c = q(uv + t * vec2(2, 2));
vec3 d = q(uv + t * vec2(-2, 0)), e = q(uv), f = q(uv + t * vec2(2, 0));
vec3 g = q(uv + t * vec2(-2, -2)), h = q(uv + t * vec2(0, -2)), i = q(uv + t * vec2(2, -2));
vec3 j = q(uv + t * vec2(-1, 1)), k = q(uv + t * vec2(1, 1)), l = q(uv + t * vec2(-1, -1)), m = q(uv + t * vec2(1, -1));
o = vec4(e * .125 + (a + c + g + i) * .03125 + (b + d + f + h) * .0625 + (j + k + l + m) * .125, 1.);
}`,e.up=a+`
uniform sampler2D uSrc; uniform vec2 uRes, uTexel; uniform float uRadius;
vec3 q(vec2 uv){ return texture(uSrc, uv).rgb; }
void main(){
vec2 uv = gl_FragCoord.xy / uRes, t = uTexel * uRadius;
vec3 s = q(uv) * 4. + (q(uv + vec2(t.x, 0)) + q(uv - vec2(t.x, 0)) + q(uv + vec2(0, t.y)) + q(uv - vec2(0, t.y))) * 2.
+ q(uv + t) + q(uv - t) + q(uv + vec2(t.x, -t.y)) + q(uv + vec2(-t.x, t.y));
o = vec4(s / 16., 1.);
}`,e.mixer=a+`
uniform sampler2D uA, uB; uniform vec2 uRes; uniform float uT, uKind, uTime;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
vec2 uv = gl_FragCoord.xy / uRes;
vec3 a = texture(uA, uv).rgb, b = texture(uB, uv).rgb;
float t = uT;
if (uKind > .5){
float n = h(floor(uv * vec2(48., 27.)) + floor(uTime * 12.) * .0);
t = smoothstep(n - .15, n + .15, uT * 1.3 - .15);
}
o = vec4(mix(a, b, t), 1.);
}`,e.final=a+`
uniform sampler2D uScene, uBloom, uText, uGod;
uniform vec2 uRes;
uniform float uTime, uExposure, uBloomAmt, uFlash, uFade, uGlitch, uCA, uGrain, uScan, uVig, uPixel, uBits, uSat, uCRT, uGodAmt, uTextAmt, uContrast;
uniform vec3 uTint, uFlashCol, uLift;
`+e.lib+`
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
vec3 sceneAt(vec2 uv, float ca){
vec2 d = (uv - .5) * ca;
vec3 c = vec3(texture(uScene, uv + d).r, texture(uScene, uv).g, texture(uScene, uv - d).b);
vec3 b = vec3(texture(uBloom, uv + d * 1.5).r, texture(uBloom, uv).g, texture(uBloom, uv - d * 1.5).b);
return c + b * uBloomAmt + texture(uGod, uv).rgb * uGodAmt;
}
void main(){
vec2 frag = gl_FragCoord.xy;
vec2 uv = frag / uRes;
vec2 cc = uv - .5;
uv += cc * dot(cc, cc) * uCRT * .22;
float edge = uCRT > 0. ? smoothstep(0., .004, uv.x) * smoothstep(1., .996, uv.x) * smoothstep(0., .004, uv.y) * smoothstep(1., .996, uv.y) : 1.;
if (uGlitch > 0.){
float tq = floor(uTime * 24.);
float row = floor(uv.y * 36.);
float r = hash21(vec2(row, tq));
if (r < uGlitch * .5) uv.x += (hash21(vec2(row * 3.1, tq + 1.)) - .5) * .18 * uGlitch;
vec2 blk = floor(uv * vec2(14., 9.));
if (hash21(blk + tq * .37) < uGlitch * .12) uv += (hash22(blk + tq) - .5) * .12;
}
vec2 suv = uv;
if (uPixel > 1.){ vec2 px = uRes / uPixel; suv = (floor(uv * px) + .5) / px; }
float ca = uCA + uGlitch * .02;
vec3 col = sceneAt(suv, ca) * uExposure * uTint;
col = aces(col);
col = pow(col, vec3(1. / 2.2));
col = (col - .5) * uContrast + .5 + uLift;
float l = dot(col, vec3(.299, .587, .114));
col = mix(vec3(l), col, uSat);
vec2 td = cc * (.004 + uGlitch * .02);
vec4 tx = texture(uText, uv);
float ta = tx.a * uTextAmt;
vec3 tcol = vec3(texture(uText, uv + td).r, tx.g, texture(uText, uv - td).b);
col = mix(col, tcol, ta);
col = mix(col, uFlashCol, sat(uFlash));
col *= 1. - uFade;
col *= 1. - uScan * (.5 + .5 * sin(frag.y * PI * .5));
col *= mix(1., smoothstep(1.25, .35, length(cc * vec2(1., .85)) * 1.5), uVig);
float g = hash21(frag + fract(uTime * 13.7) * 311.) - .5;
col += g * uGrain;
if (uBits > 0.){ float lv = exp2(uBits) - 1.; col = floor(col * lv + hash21(frag * 1.37) ) / lv; }
o = vec4(col * edge, 1.);
}`,(a=re.shaders).scenes={},a.scenes.bang=`
vec3 nebCol(float n, vec3 p){ return mix(vec3(.85, .12, .55), vec3(.08, .45, 1.), smoothstep(.35, .7, n + p.y * .02)); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = starfield(rd, .1, uP1.z) + nebula(rd, vec3(.25, .04, .35), vec3(.04, .18, .4), uTime * .01) * uP1.z * .4;
float R = uP0.x;
vec2 b = sphIntersect(ro, rd, R * 1.25);
if (b.y > 0.){
float t0 = max(b.x, 0.), t1 = b.y;
const int N = 56;
float dt = (t1 - t0) / float(N);
float t = t0 + dt * dither();
float T = 1.; vec3 acc = vec3(0);
for (int i = 0; i < N; i++){
vec3 p = ro + rd * t;
float r = length(p) / R;
vec3 q = p / R * 2.2;
q += (tnoise(q * .8 + vec3(0., uLocal * .12, 0.)).xyz - .5) * 1.5;
float n = fbm(q * 1.3 + vec3(0., 0., uLocal * .08));
float shell = smoothstep(1.2, .8, r) * mix(1., smoothstep(.2, .75, r), uP0.w);
float dens = max(n * 1.8 - .55 + (1. - r) * .3 * (1. - uP0.w), 0.) * shell * uP0.z;
if (dens > .001){
float temp = uP0.y * (1.25 - r * .8) + (n - .5) * .4;
vec3 e = mix(nebCol(n, p) * .5, heat(temp), smoothstep(.02, .25, uP0.y));
acc += T * e * dens * dt * (4. / R);
T *= exp(-dens * dt * (2.2 / R));
if (T < .01) break;
}
t += dt;
}
col = col * T + acc;
}
col += vec3(1., .92, .85) * inscatter(ro, rd, vec3(0), 100.) * uP1.w;
vec3 nrm = normalize(vec3(.25, 1., .1));
float tp = -dot(ro, nrm) / dot(rd, nrm);
if (tp > 0.){
vec3 P = ro + rd * tp;
float rr = length(P);
float ring = exp(-abs(rr - uP1.x) * 5. / (1. + uP1.x * .15)) * uP1.y * (.5 + .7 * noise(P * 1.5));
col += vec3(.65, .85, 1.2) * ring;
}
outColor = vec4(col, 1.);
}`,a.scenes.space=`
void main(){
vec3 rd = rayDir();
vec3 col = starfield(rd, uP0.x, uP0.y) + nebula(rd, uP1.rgb, uP2.rgb, uTime * .01) * uP0.z;
col += uP3.rgb * pow(max(dot(rd, normalize(-uCamPos)), 0.), 6.) * uP3.w;
outColor = vec4(col, 1.);
}`,a.scenes.mind=`
float trap;
float jack(vec3 q){
vec3 a = abs(q);
float w = .075;
return min(min(max(a.x - 1., max(a.y, a.z) - w), max(a.y - 1., max(a.x, a.z) - w)), max(a.z - 1., max(a.x, a.y) - w));
}
float mapM(vec3 p){
float sc = max(uP2.z, 1e-3);
vec3 q = p / sc;
float s = 1.;
trap = 1e9;
float it = uP2.x, n = floor(it), f = fract(it);
float dA = jack(q), dB = dA;
float a1 = .42 + uP0.x, a2 = .23 + uP0.y;
for (int i = 0; i < 8; i++){
if (float(i) > n) break;
q = abs(q) - vec3(.72, .72, .72);
q.xy = rot(a1) * q.xy;
q.yz = rot(a2) * q.yz;
q *= 2.05; s *= 2.05;
trap = min(trap, dot(q, q));
float d = min(jack(q) / s, (length(q) - .22) / s);
dA = dB; dB = min(dB, d);
}
return mix(dA, dB, n >= 1. ? f : 0.) * sc;
}
vec3 normM(vec3 p){ vec2 e = vec2(.0006, -.0006); return normalize(e.xyy * mapM(p + e.xyy) + e.yyx * mapM(p + e.yyx) + e.yxy * mapM(p + e.yxy) + e.xxx * mapM(p + e.xxx)); }
vec3 env(vec3 r){ return mix(vec3(.004, .003, .012), vec3(.05, .1, .25), sat(r.y * .5 + .5)) + vec3(.6, .8, 1.) * pow(max(dot(r, normalize(vec3(.3, .9, .2))), 0.), 24.) * 1.5; }
void main(){
vec3 ro = uCamPos, rd = rayDir();
float t = 0.; bool hit = false; int st = 0;
vec2 bs = sphIntersect(ro, rd, 3.2 * max(uP2.z, 1e-3));
if (bs.y > 0.){
t = max(bs.x, 0.);
for (int i = 0; i < 140; i++){ float d = mapM(ro + rd * t); if (d < .0005 * t * max(uP2.z, .05)){ hit = true; st = i; break; } t += d * .9; if (t > bs.y) break; }
}
vec3 col = vec3(.002, .002, .006) + starfield(rd, .06, .3);
float light = uP0.w;
if (hit){
vec3 p = ro + rd * t;
vec3 n = normM(p);
float ao = pow(1. - float(st) / 140., 1.5);
float cosv = max(dot(-rd, n), 0.);
float fr = pow(1. - cosv, 3.);
vec3 irid = pal(cosv * 1.2 + length(p) * .5 + uTime * .03, vec3(.55), vec3(.45), vec3(1.), vec3(.0, .33, .67));
vec3 L = normalize(vec3(.4, .8, .3));
float dif = max(dot(n, L), 0.);
vec3 base = vec3(.01, .012, .02) * (.3 + dif) + env(reflect(rd, n)) * irid * (.05 + fr * .6);
float r = length(p);
float awake = smoothstep(uP0.z, uP0.z - .5, r);
float wave = pow(.5 + .5 * sin(r * 9. - uLocal * 6.), 8.);
float node = exp(-sqrt(trap) * 1.2);
vec3 em = mix(vec3(.2, .7, 1.4), vec3(.9, .4, 1.4), .5 + .5 * sin(r * 3. + uTime * .4));
col = base * light * ao + em * (node * 1.2 + wave * .5 + uP2.y * .9) * awake * (.35 + uKick * .65 * uP2.w) * ao * ao * uP2.w;
col = mix(col, vec3(.002, .002, .008), 1. - exp(-t * .08));
}
col += vec3(.2, .6, 1.2) * inscatter(ro, rd, vec3(0), hit ? t : 50.) * (.002 + uP2.y * .006) * light;
col += vec3(.5, .9, 1.4) * inscatter(ro, rd, vec3(0), hit ? t : 50.) * uP1.x * .03;
outColor = vec4(col, 1.);
}`,a.scenes.tunnel=`
vec2 path(float z){ return vec2(sin(z * .045) * 4. + sin(z * .017) * 7., cos(z * .035) * 3. + sin(z * .021) * 2.); }
float octd(vec2 q){ q = abs(q); return max(max(q.x, q.y), (q.x + q.y) * .70710678); }
vec2 tq(vec3 p){ return rot(p.z * .03) * (p.xy - path(p.z)); }
float mapT(vec3 p){
vec2 q = tq(p);
float od = octd(q);
float wall = 2.4 - od;
float zl = mod(p.z, 4.) - 2.;
float rib = max(2.4 - .34 - od, abs(zl) - .16);
float zp = mod(p.z, 1.) - .5;
wall += smoothstep(.02, .0, abs(zp) - .46) * .015;
return min(wall, rib);
}
vec3 normT(vec3 p){ vec2 e = vec2(.002, 0); return normalize(vec3(mapT(p + e.xyy) - mapT(p - e.xyy), mapT(p + e.yxy) - mapT(p - e.yxy), mapT(p + e.yyx) - mapT(p - e.yyx))); }
float marchT(vec3 ro, vec3 rd, int n){
float t = .01;
for (int i = 0; i < 140; i++){ if (i >= n) break; float d = mapT(ro + rd * t); if (d < .0015 * t) return t; t += d * .8; if (t > 70.) break; }
return 1e9;
}
float bolt(vec3 p, float a){
float k = floor(uBeat), h = hash11(k * 3.7), along = p.z - (uCamPos.z + 7. + h * 9.);
if (abs(along) > 7.) return 0.;
float ab = (h - .5) * TAU + sin(p.z * 3.1 + k) * .12 + sin(p.z * 7.3 - k * 2.) * .06 + (hash11(floor(p.z * 5.) + k) - .5) * .1;
float da = abs(mod(a - ab + PI, TAU) - PI);
return (exp(-da * 70.) * 1.5 + exp(-da * 12.) * .2) * smoothstep(7., 3., abs(along));
}
vec3 emissive(vec3 p){
vec2 q = tq(p);
float od = octd(q);
float a = atan(q.y, q.x);
float sec = a / (PI * .25);
float cd = abs(fract(sec) - .5);
float sid = floor(sec);
vec3 c1 = mix(vec3(.2, .8, 1.5), vec3(1.4, .25, .9), step(.5, fract(sid * .5 + uP0.z)));
vec3 e = vec3(0);
float onWall = smoothstep(2.3, 2.38, od);
float strip = smoothstep(.05, .0, cd - .0) * onWall;
float pk = fract(p.z * .05 - uTime * (1.5 + hash11(sid) * 1.2) + hash11(sid * 7.1));
e += c1 * strip * (.25 + 6. * pow(pk, 30.));
float ri = floor(p.z / 4.);
float zl = mod(p.z, 4.) - 2.;
float ribEdge = smoothstep(.03, .0, abs(od - 2.06)) * step(abs(zl), .17);
float chase = exp(-fract(uBeat * .5 - ri * .125) * 5.);
e += mix(vec3(1., .95, .9), c1, .4) * ribEdge * (.3 + 5. * chase);
float zp = mod(p.z, 1.) - .5;
e += vec3(.15, .3, .6) * smoothstep(.015, .0, abs(abs(zp) - .46)) * onWall * .3;
e += vec3(.75, .85, 1.6) * bolt(p, a) * onWall * uSnare * 10.;
return e;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
float t = marchT(ro, rd, 140);
vec3 fogc = mix(vec3(.01, .02, .05), vec3(1.6, 1.4, 1.2), uP0.y);
vec3 col = fogc;
if (t < 1e8){
vec3 p = ro + rd * t, n = normT(p);
vec3 L = normalize(ro + vec3(0, .5, 0) - p);
float dif = max(dot(n, L), 0.);
float sp = pow(max(dot(reflect(rd, n), L), 0.), 32.);
col = vec3(.02, .022, .03) * dif * 2. * (1. + 6. * uKick) + sp * .15 * (1. + 2. * uKick) + emissive(p);
vec3 rr = reflect(rd, n);
float t2 = marchT(p + n * .01, rr, 40);
float fr = .08 + .9 * pow(1. - max(dot(-rd, n), 0.), 5.);
if (t2 < 1e8) col += emissive(p + n * .01 + rr * t2) * fr * .6 * exp(-t2 * .1);
col = mix(col, fogc, 1. - exp(-t * (.035 - uP0.y * .02)));
}
outColor = vec4(col, 1.);
}`,a.shellLib=`
float shellCell(vec3 p, out vec2 cid, out float edge){
float R = 6.5, r = length(p);
float lat = asin(clamp(p.y / r, -1., 1.)), lon = atan(p.z, p.x);
float NL = 16.;
float band = floor((lat + PI * .5) / PI * NL);
float latc = (band + .5) / NL * PI - PI * .5;
float n = max(floor(cos(latc) * NL * 2.), 3.);
float cellA = TAU / n;
float ci = floor((lon + PI) / cellA);
float du = (fract((lon + PI) / cellA) - .5) * cellA * R * cos(lat);
float dv = (fract((lat + PI * .5) / PI * NL) - .5) * PI / NL * R;
edge = min(cellA * R * cos(lat) * .5 - abs(du), PI / NL * R * .5 - abs(dv));
cid = vec2(band, ci);
return abs(r - R) - .05;
}
`,a.scenes.dyson=a.shellLib+`
vec3 ringLocal(vec3 p, float i){
p.xy = rot(hash11(i * 3.7) * 1.3 - .65) * p.xy;
p.xz = rot(hash11(i * 7.1) * PI) * p.xz;
p.yz = rot(hash11(i * 5.3) * .8 - .4) * p.yz;
float sp = (.12 + .07 * i) * (mod(i, 2.) < .5 ? 1. : -1.);
p.xz = rot(uP0.y * sp) * p.xz;
return p;
}
float sdRing(vec3 q, float R, float nseg){
float d = sdBox2(vec2(length(q.xz) - R, q.y), vec2(.14, .035));
float a = atan(q.z, q.x), seg = TAU / nseg;
float la = mod(a + seg * .5, seg) - seg * .5;
return max(d, abs(la) * R - (seg * .5 * R - .05));
}
float mat;
float starR(){ return mix(1.15 * (1. + .35 * uP0.w), .02, pow(uP1.y, .6)); }
float mapS(vec3 p){
float d = 1e5; mat = 0.;
for (int i = 0; i < 4; i++){
float fi = float(i);
float dr = sdRing(ringLocal(p, fi), 2.3 + fi * .85, 18. + fi * 6.);
if (dr < d){ d = dr; mat = 1. + fi * .01; }
}
vec2 cid; float edge;
float ds = shellCell(p, cid, edge);
float present = step(hash21(cid), uP0.x);
float dsh = present > .5 ? max(ds, .07 - edge) : max(ds, edge);
if (dsh < d){ d = dsh; mat = 2.; }
return d;
}
float collapseScale(){ return 1. - .9 * pow(uP1.y, 2.5); }
float mapD(vec3 p){
float sc = collapseScale();
vec3 q = p;
q.xz = rot(uP1.y * uP1.y * 4. / (.3 + length(p) * .2)) * q.xz;
float d = mapS(q / sc) * sc;
float m = mat;
float ds = length(p) - starR();
if (ds < d){ d = ds; m = 0.; }
mat = m;
return d;
}
vec3 normD(vec3 p){ vec2 e = vec2(.002, 0); return normalize(vec3(mapD(p + e.xyy) - mapD(p - e.xyy), mapD(p + e.yxy) - mapD(p - e.yxy), mapD(p + e.yyx) - mapD(p - e.yyx))); }
vec3 starCol(){ return mix(vec3(1., .72, .4), vec3(1., .18, .05), uP0.w); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = starfield(rd, .12, .9) + nebula(rd, vec3(.18, .03, .25), vec3(.03, .15, .3), uTime * .01) * .35;
float t = 0.; bool hit = false;
vec2 bs = sphIntersect(ro, rd, 6.7);
if (bs.y > 0.){
t = max(bs.x, 0.);
for (int i = 0; i < 160; i++){ float d = mapD(ro + rd * t); if (d < .0008 * t){ hit = true; break; } t += d; if (t > bs.y) break; }
}
float sp = uP0.z;
if (hit){
vec3 p = ro + rd * t;
float m = mat;
if (m < .5){
float g = fbm(p / starR() * 2.6 + vec3(0, uTime * .2, 0));
float limb = pow(max(dot(normalize(p), -rd), 0.), .5);
col = starCol() * (6. + 10. * g) * limb * sp * (1. + uP1.x * .5);
} else {
vec3 n = normD(p);
vec3 L = normalize(-p);
float dif = max(dot(n, L), 0.);
float fall = 1. / (1. + dot(p, p) * .08);
col = starCol() * dif * fall * sp * 3. + vec3(.01, .012, .02);
if (m < 1.5){
float sc = collapseScale();
vec3 pp = p; pp.xz = rot(uP1.y * uP1.y * 4. / (.3 + length(p) * .2)) * pp.xz; pp /= sc;
vec3 q = ringLocal(pp, floor((m - 1.) * 100. + .5));
float a = atan(q.z, q.x);
float outer = smoothstep(.02, .0, abs(q.y) - .02) * step(0., length(q.xz) - (2.3 + floor((m - 1.) * 100. + .5) * .85) + .1);
col += vec3(.2, .8, 1.5) * outer * (.5 + 1.5 * pow(.5 + .5 * sin(a * 20. - uTime * 6.), 8.)) * 1.5 * uP1.z;
} else {
vec2 cid; float edge;
float sc2 = collapseScale();
vec3 ps = p; ps.xz = rot(uP1.y * uP1.y * 4. / (.3 + length(p) * .2)) * ps.xz;
shellCell(ps / sc2, cid, edge);
float outside = step(dot(n, p), 0.) < .5 ? 1. : 0.;
float lights = step(.6, hash21(cid * 1.7 + floor(uTime * .5))) * smoothstep(.12, .2, edge);
float lat = asin(clamp(p.y / length(p), -1., 1.)), lon = atan(p.z, p.x);
float flow = pow(.5 + .5 * sin(lon * 6. + lat * 3. - uTime * 2.5), 16.);
col += vec3(.2, .8, 1.5) * (smoothstep(.1, .075, edge) * .6 + lights * .15 + flow * .4) * outside * (.6 + uP1.x) * uP1.z;
}
}
if (m > .5){
vec3 n2 = normD(p), rr = reflect(rd, n2);
float fr = .06 + .6 * pow(1. - max(dot(-rd, n2), 0.), 4.);
float t2 = .02; bool h2 = false;
for (int i = 0; i < 64; i++){ float d = mapD(p + rr * t2); if (d < .002){ h2 = true; break; } t2 += d; if (t2 > 30.) break; }
vec3 rc = starfield(rr, .12, .9) * .5 + starCol() * pow(max(dot(rr, normalize(-p)), 0.), 40.) * sp * 3.;
if (h2) rc = mat < .5 ? starCol() * 6. * sp : vec3(.2, .8, 1.5) * .15 * uP1.z;
col += rc * fr;
}
col = mix(col, vec3(0), 1. - exp(-t * .01));
}
col += starCol() * inscatter(ro, rd, vec3(0), hit ? t : 100.) * sp * .18;
outColor = vec4(col, 1.);
}`,a.scenes.hole=`
vec4 neb(vec3 p){
float r = length(p);
if (r > 21. || r < 1.2) return vec4(0);
vec3 q = p;
q.xz = rot(uP2.z * 1.8 / (.4 + r * .22)) * q.xz;
float H = mix(5.5, .25 + r * .05, uP2.y);
float shape = exp(-q.y * q.y / (H * H)) * smoothstep(21., 11., r) * smoothstep(1.6, 3.5, r);
float n = fbm3(q * .28 + vec3(1.7, 0., uP2.z * .04));
float dens = max(n * 1.7 - .62, 0.) * shape * uP2.x;
float hot = smoothstep(11., 2.5, r) * uP2.y;
vec3 c = mix(mix(vec3(.55, .15, .7), vec3(.1, .45, .9), n), vec3(1.4, .55, .18), hot);
c = mix(c, vec3(.8, .08, .03), uP0.y * .7);
return vec4(c * (1. + 2. * hot + 3. * uP1.y), dens);
}
vec4 disk(vec3 p, vec3 v){
float r = length(p.xz);
float rin = 2.6 * uP0.w, rout = 12.;
if (r < rin || r > rout) return vec4(0);
float ang = atan(p.z, p.x) + uTime * 1.4 * pow(r, -1.5) * 3.;
vec3 q = vec3(cos(ang) * r, sin(ang) * r, r * .3);
float n = fbm(q * 1.1) * .6 + fbm(vec3(r * 2.5, ang * 2., 1.)) * .6;
float temp = pow(rin / r, .9);
vec3 vel = normalize(vec3(-p.z, 0., p.x));
float dop = pow(max(1. + .55 * dot(vel, -v), .1), 3.);
vec3 hot = mix(vec3(1., .35, .1), vec3(1., .85, .7), temp);
hot = mix(hot, vec3(.7, .05, .02), uP0.y);
float edge = smoothstep(rin, rin + .4, r) * smoothstep(rout, rout - 5., r);
float dens = sat(n * 1.4 - .25) * edge;
return vec4(hot * dop * (1.5 + 5. * temp) * dens * uP0.x, dens * .9);
}
void main(){
vec3 ro = uCamPos, v = rayDir();
vec3 p = ro;
float rs = uP0.w;
vec3 hcr = cross(p, v);
float h2 = dot(hcr, hcr);
vec3 col = vec3(0); float alpha = 0.;
bool fell = false;
for (int i = 0; i < 260; i++){
float r2 = dot(p, p), r = sqrt(r2);
if (r < rs){ fell = true; break; }
float dt = clamp(.09 * (r - rs * .9), .015, r < 21. && uP2.x > .01 ? .45 : 1.2);
if (uP2.x > .01 && r < 21.){
vec4 nb = neb(p);
if (nb.a > 0.){ float a = 1. - exp(-nb.a * dt * .22); col += (1. - alpha) * nb.rgb * nb.a * dt * .075; alpha += (1. - alpha) * a; }
}
vec3 acc = -1.5 * rs * h2 * p / (r2 * r2 * r);
vec3 pn = p + v * dt;
v = normalize(v + acc * dt);
if (p.y * pn.y < 0.){
vec3 hp = mix(p, pn, p.y / (p.y - pn.y));
vec4 dk = disk(hp, v);
col += (1. - alpha) * dk.rgb;
alpha += (1. - alpha) * dk.a;
}
p = pn;
if (r > 45. && dot(p, v) > 0.) break;
}
if (!fell){
vec3 bg = starfield(v, .14 * (1. - uP0.z), 1.) + nebula(v, vec3(.15, .04, .1), vec3(.05, .05, .15), 0.) * .3 * (1. - uP0.z);
col += (1. - alpha) * bg;
}
col += vec3(1., .95, .9) * inscatter(ro, rayDir(), vec3(0), 100.) * uP1.x;
outColor = vec4(col, 1.);
}`,a.scenes.multi=`
const float CELL = 7.;
vec4 cellH(vec3 id){ return hash4u(uint(int(id.x) * 73856093 ^ int(id.y) * 19349663 ^ int(id.z) * 83492791)); }
vec3 cellCol(vec4 h){ return .55 + .45 * cos(6.2831 * (h.z * .7 + vec3(0., .33, .67))); }
float cellAlive(vec4 h){ return sat((h.y * 1.05 + .02 - uP1.x) * 14.); }
float cellPulse(vec4 h){ float g = floor(h.z * 4.); return g < 1. ? uKick : g < 2. ? uSnare : g < 3. ? uHat * .8 : uP2.x; }
vec3 cellC(vec3 id, vec4 h){ return (id + .5) * CELL + vec3(h.z - .5, (id.y < 0. ? -1. : 1.) * h.x * .6, h.w - .5) * 2.; }
float bulb(vec3 p, float pw, out float trap){
vec3 z = p; float dr = 1., r = length(z); trap = 1e9;
for (int i = 0; i < 6; i++){
if (r > 2.) break;
float th = acos(clamp(z.y / r, -1., 1.)) * pw, ph = atan(z.z, z.x) * pw;
dr = pow(r, pw - 1.) * pw * dr + 1.;
z = pow(r, pw) * vec3(sin(th) * cos(ph), cos(th), sin(th) * sin(ph)) + p;
r = length(z);
trap = min(trap, r);
}
return .5 * log(max(r, 1e-6)) * r / dr;
}
mat3 rotM(vec4 h){
float a = h.x * 6.2831 + uTime * .06 * (h.w - .5), b = h.w * 1.3 - .6;
mat3 ry = mat3(cos(a), 0, -sin(a), 0, 1, 0, sin(a), 0, cos(a)), rx = mat3(1, 0, 0, 0, cos(b), sin(b), 0, -sin(b), cos(b));
return ry * rx;
}
float mapM(vec3 p, out vec3 id, out float trap){
id = floor(p / CELL);
vec3 bnd = CELL * .5 - abs(p - (id + .5) * CELL);
float wall = min(bnd.x, min(bnd.y, bnd.z)) + .45;
vec4 h = cellH(id);
trap = 1e9;
if (h.x < .6) return wall;
vec3 q = p - cellC(id, h);
float sc = .9 + .5 * h.w;
float bound = length(q) - 1.25 * sc;
if (bound > .25) return min(bound, wall);
float pw = 4. + floor(h.z * 5.) + .3 * sin(uTime * .35 + h.x * 20.);
return min(bulb(rotM(h) * q / sc, pw, trap) * sc, wall);
}
float mapM(vec3 p){ vec3 i; float tr; return mapM(p, i, tr); }
vec3 nrmM(vec3 p, float e){
vec2 k = vec2(1, -1);
return normalize(k.xyy * mapM(p + k.xyy * e) + k.yyx * mapM(p + k.yyx * e) + k.yxy * mapM(p + k.yxy * e) + k.xxx * mapM(p + k.xxx * e));
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
float t = .05, trap = 1e9; vec3 id; bool hit = false;
vec3 glow = vec3(0);
for (int i = 0; i < 160; i++){
vec3 p = ro + rd * t;
float d = mapM(p, id, trap);
vec4 h = cellH(id);
if (h.x >= .6){
float bd = max(length(p - cellC(id, h)) - 1.2 * (.9 + .5 * h.w), 0.);
glow += cellCol(h) * cellAlive(h) * exp(-bd * 2.5) * min(d, .6) * .045 * (1. + 2.5 * cellPulse(h));
}
if (d < .0012 * t){ hit = true; break; }
t += d * .85;
if (t > 70.) break;
}
vec3 sky = starfield(rd, .1 * (1. - uP1.x * .8), .7) + nebula(rd, vec3(.05, .02, .08), vec3(.01, .03, .08), 0.) * .12 * (1. - uP1.x);
vec3 col = sky;
if (hit){
vec3 p = ro + rd * t, n = nrmM(p, max(.0006 * t, .0004));
vec4 h = cellH(id);
float alive = cellAlive(h);
vec3 cc = cellCol(h);
float ao = sat(trap * trap * .9 - .1);
vec3 alb = mix(vec3(.05), cc * (.25 + .5 * sat(1.3 - trap * .45)), alive);
vec3 L = normalize(vec3(.4, .7, -.3));
float dif = max(dot(n, L), 0.), rim = pow(1. - max(dot(n, -rd), 0.), 3.);
col = alb * (dif * .8 + .06) * ao;
col += cc * rim * .25 * alive + vec3(.2, .3, .5) * rim * .05 * (1. - alive);
col += cc * cc * pow(sat(1.15 - trap * .55), 5.) * 2.5 * alive * (1. + 2. * cellPulse(h));
col = mix(col, sky * .2, 1. - exp(-t * .035));
}
col += glow;
col += vec3(.9, .85, 1.) * uP0.x * .5;
outColor = vec4(col, 1.);
}`,a.scenes.earth=`
mat3 spin(float a){ return mat3(cos(a), 0, -sin(a), 0, 1, 0, sin(a), 0, cos(a)); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 SUN = normalize(uP1.xyz);
vec3 col = starfield(rd, .12, .7) + nebula(rd, vec3(.1, .03, .15), vec3(.02, .06, .12), 0.) * .2;
float sd = max(dot(rd, SUN), 0.);
vec2 hs = sphIntersect(ro, rd, 1.);
if (hs.x < 0.) col += vec3(1., .9, .75) * (smoothstep(.99985, .9999, sd) * 60. + pow(sd, 200.) * 2. + pow(sd, 12.) * .15);
if (hs.x > 0.){
vec3 p = ro + rd * hs.x, n = normalize(p);
vec3 q = spin(uTime * .015 + 2.) * n;
float land = fbm(q * 2.3 + 3.);
float isLand = smoothstep(.5, .525, land);
float ice = smoothstep(.78, .86, abs(q.y) + (land - .5) * .4);
vec3 ocean = mix(vec3(.003, .02, .07), vec3(.01, .06, .15), fbm3(q * 7.));
vec3 ground = mix(vec3(.04, .1, .03), vec3(.22, .17, .08), fbm3(q * 6. + 2.));
vec3 surf = mix(mix(ocean, ground, isLand), vec3(.75, .8, .85), ice);
float dif = max(dot(n, SUN), 0.);
float cl = smoothstep(.48, .78, fbm(q * 3.6 + vec3(uP0.y, 0., 0.)));
float spec = pow(max(dot(reflect(rd, n), SUN), 0.), 80.) * (1. - isLand) * (1. - cl);
surf = mix(surf, vec3(.85), cl * .85);
col = surf * (dif * 1.5 + .004) + vec3(1., .85, .6) * spec * 1.5;
float spread = dot(q, normalize(vec3(.3, .5, .8)));
float cov = smoothstep(uP0.x * 2.4 - 1.2, uP0.x * 2.4 - 1.35, -spread + (fbm3(q * 4.) - .5) * .3);
vec3 cq = q * 26.;
vec3 cf = abs(fract(cq) - .5);
float trace = smoothstep(.06, .0, min(min(max(cf.x, cf.y), max(cf.y, cf.z)), max(cf.x, cf.z)) - .0);
float fine = smoothstep(.08, .0, min(min(abs(fract(cq.x * 4.) - .5), abs(fract(cq.y * 4.) - .5)), abs(fract(cq.z * 4.) - .5))) * .4;
float pulse = pow(.5 + .5 * sin(dot(q, vec3(20., 13., 17.)) - uTime * 4.), 12.);
float front = smoothstep(.12, .0, abs(-spread + (fbm3(q * 4.) - .5) * .3 - (uP0.x * 2.4 - 1.27)));
col = mix(col, vec3(.01, .012, .02) + surf * .08 * dif, cov * .9);
col += vec3(.25, .85, 1.45) * ((trace + fine) * (.4 + pulse * 2.) * cov + front * 2.5 * (1. - cov * .5));
float fres = pow(1. - max(dot(n, -rd), 0.), 3.);
col += vec3(.25, .5, 1.) * fres * (dif * .9 + .02);
}
float tc = max(-dot(ro, rd), 0.);
vec3 pc = ro + rd * tc;
float hh = length(pc);
if (hh > 1. && (hs.x < 0. || true)){
float a = exp(-(hh - 1.) * 30.);
float l = dot(normalize(pc), SUN);
col += mix(vec3(1., .35, .1), vec3(.3, .55, 1.2), sat(l + .25)) * a * sat(l * .9 + .35) * 1.3;
}
outColor = vec4(col, 1.);
}`,(e=re.shaders).particles={},e.particles.bang=`
void main(){
uint id = uint(gl_VertexID);
vec4 h = hash4u(id), h2 = hash4u(id + 7777777u);
vec3 dir = sphereDir(h.xy);
float sp = pow(h.z, .55);
vec3 pos = dir * uP0.x * sp * (.85 + .3 * h2.x);
pos += (tnoise(dir * 2.5 + h2.xyz * .2 + uLocal * .03).xyz - .5) * uP0.x * uP0.w;
float hv = uP0.y * (1.15 - sp * .7);
vec3 starc = mix(vec3(1., .72, .5), vec3(.6, .78, 1.2), h2.y) * (.5 + 3. * pow(h2.z, 10.));
vec3 col = mix(starc, heat(hv) * 1.2, smoothstep(0., .25, uP0.y));
float cv = uP1.x * uP1.x;
pos = mix(pos, pos * .002, cv);
col = mix(col, vec3(.5, .85, 1.3), cv * .7) * (1. - cv * .6);
emit(pos, col * uP0.z, .018 + .05 * pow(h2.w, 8.));
}`,e.particles.vortex=`
void main(){
uint id = uint(gl_VertexID);
uint ln = id / 192u, j = id % 192u;
vec4 h = hash4u(ln), h2 = hash4u(ln ^ 0x7feb352du);
float u = float(j) / 191.;
float a = .42, c = .07, G = 2.4 * uP0.z;
bool core = h.x < .26;
vec3 pos, col;
float fade;
if (!core){
float r0 = 1.3 + h.y * 1.9, th0 = h.z * TAU, z0 = (h.w - .5) * .55;
float s = u * 3.4;
float r = max(r0 * exp(-a * s), .34 + .12 * h2.x);
float th = th0 + G / (2. * a * c) * log((r0 * r0 + c * exp(2. * a * s)) / (r0 * r0 + c)) * .12;
float z = z0 * exp(2. * a * s);
pos = vec3(r * cos(th), z, r * sin(th));
col = mix(vec3(.15, .35, 1.2), vec3(.35, 1., 1.3), smoothstep(.4, 2.2, r)) * (.6 + .6 * h2.y);
fade = smoothstep(3., 2.2, abs(z));
} else {
float r0 = .05 + h.y * .22, th0 = h.z * TAU, sg = h.w < .5 ? -1. : 1.;
float s = u * 3.4;
float z = sg * .06 * exp(2. * a * s * 1.25);
float th = th0 + G * s / (r0 * r0 + c) * .12;
pos = vec3(r0 * cos(th), z, r0 * sin(th));
col = vec3(1.3, .6, .2) * (.6 + .6 * h2.y);
fade = smoothstep(3.1, 2.4, abs(z));
}
float flowHi = pow(fract(u * 2.5 - uTime * uP0.y * .6 + h2.y), 8.);
float taper = smoothstep(0., .12, u) * smoothstep(1., .75, u);
float vis = step(h2.z, uP0.x) * step(u, uP0.x * 1.6);
emit(pos, col * (.12 + flowHi * .9) * taper * fade * vis, .011);
}`,e.particles.swarm=e.shellLib+`
uniform vec4 uOcc;
bool hidden(vec3 p){
vec3 d = p - uCamPos;
float a = dot(d, d), b = dot(uCamPos, d), c = dot(uCamPos, uCamPos);
float h = b * b - a * (c - uOcc.x * uOcc.x);
if (h > 0.){ float s = (-b - sqrt(h)) / a; if (s > 0. && s < 1.) return true; }
if (uOcc.y <= 0.) return false;
float R = 6.5 * uOcc.y;
h = b * b - a * (c - R * R);
if (h <= 0.) return false;
for (int i = 0; i < 2; i++){
float s = (-b + (i == 0 ? -1. : 1.) * sqrt(h)) / a;
if (s <= 0. || s >= 1.) continue;
vec3 x = uCamPos + d * s;
x.xz = rot(uOcc.w / (.3 + length(x) * .2)) * x.xz;
vec2 cid; float edge;
shellCell(x / uOcc.y, cid, edge);
if (hash21(cid) <= uOcc.z && edge > .07) return true;
}
return false;
}
void main(){
uint id = uint(gl_VertexID);
vec4 h = hash4u(id), h2 = hash4u(id ^ 0x2545f491u);
float band = floor(h.x * 6.);
float R = (3.4 + band * .7 + gauss(h2.xy) * .12 * uP0.z) * (uP0.w > 0. ? uP0.w : 1.);
float incl = (hash11(band * 3.3) - .5) * 1.6;
float node = hash11(band * 9.1) * TAU;
float spd = .5 / sqrt(R / (uP0.w > 0. ? uP0.w : 1.)) * (mod(band, 2.) < .5 ? 1. : -1.);
float a = h.y * TAU + uP0.x * spd;
vec3 p = vec3(cos(a) * R, gauss(h2.zw) * .03, sin(a) * R);
p.xy = rot(incl) * p.xy;
p.xz = rot(node) * p.xz;
vec3 col = mix(vec3(.3, .85, 1.5), vec3(1., .75, .45), step(.8, h.z)) * (.4 + 1.5 * pow(h.w, 6.));
emit(p, hidden(p) ? vec3(0) : col * uP0.y, .012 * (uP0.w > 0. ? uP0.w : 1.));
}`,e.particles.dust=`
void main(){
uint id = uint(gl_VertexID);
vec4 h = hash4u(id), h2 = hash4u(id ^ 0x5bd1e995u);
float r = mix(3., 13., sqrt(h.x)), a = h.y * TAU - uTime * 1.4 * pow(r, -1.5) * 3.;
vec3 p = vec3(cos(a) * r, (abs(gauss(h.zw)) * .012 + .004) * r, sin(a) * r);
vec3 d = p - uCamPos;
float s = clamp(-dot(uCamPos, d) / dot(d, d), 0., 1.), seen = step(2.8, length(uCamPos + d * s)) * smoothstep(5., 2., length(d));
vec3 col = mix(mix(vec3(1., .45, .15), vec3(1., .8, .6), h2.x), vec3(.8, .1, .03), uP0.y);
emit(p, col * uP0.x * (.15 + .6 * pow(h2.y, 4.)) * seen, .006 + .012 * h2.z);
}`,a=e=>Number.isInteger(e)?e+".":String(e),(t=e.svm={N:220,RIN:1.1,ROUT:[1.55,2.4],RS:1.32,K:.45,STEM:12}).COUNT=2*t.N*(1+t.STEM),e.particles.svm=`
const int NP = ${2*t.N}, STEM = ${t.STEM};
const float RIN = ${a(t.RIN)}, RO0 = ${a(t.ROUT[0])}, RO1 = ${a(t.ROUT[1])}, K = ${a(t.K)};
void main(){
int n = gl_VertexID, e = -1;
if (n >= NP){ e = (n - NP) % STEM; n = (n - NP) / STEM; }
vec4 h = hash4u(uint(n) * 7u + 3u);
float cls = n < NP / 2 ? 0. : 1.;
float r = cls < .5 ? RIN * sqrt(h.x) : mix(RO0, RO1, h.x);
vec2 q = vec2(cos(h.y * TAU), sin(h.y * TAU)) * r;
float y = uP0.y * K * r * r, on = sat((uP0.x - h.z * .6) * 4.);
vec3 col = cls < .5 ? vec3(.3, .85, 1.6) : vec3(1.5, .35, 1.1);
if ((dot(q, vec2(cos(uP1.x), sin(uP1.x))) - uP1.y < 0.) != (cls < .5)) col = mix(col, vec3(2., .15, .1), uP1.z);
float sv = (cls < .5 ? step(RIN - .1, r) : step(r, RO0 + .1)) * uP0.z;
col = mix(col, vec3(2.2, 2., 1.8), sv * .7);
if (e >= 0) emit(vec3(q.x, y * (float(e) + .5) / float(STEM), q.y), col * .22 * on * sat(uP0.y * 3.), .022);
else emit(vec3(q.x, y, q.y), col * on, .075 * (1. + .7 * sv));
}`,e.particles.c64=`
uniform vec4 uMz[21];
float mzState(int i){
int f = i / 12, sh = (i - f * 12) * 2, comp = f - (f / 4) * 4;
vec4 v = uMz[f / 4];
float x = comp == 0 ? v.x : comp == 1 ? v.y : comp == 2 ? v.z : v.w;
return float((uint(x) >> uint(sh)) & 3u);
}
float glyph(float d, vec2 l){ float s = d > .5 ? l.y : 7. - l.y, e = abs(l.x - s); return e < .5 ? 1. : e < 1.5 ? .5 : 0.; }
void main(){
uint id = uint(gl_VertexID);
int px = int(id % 320u), py = int(id / 320u), c = px / 8, r = py / 8;
vec4 h = hash4u(id * 3u + 11u);
float Hh = uP0.y, L = uP0.x;
vec3 T = vec3(((float(px) + .5) / 160. - 1.) * Hh * 1.6, (1. - (float(py) + .5) / 100.) * Hh, 0.);
float m = mzState(r * 40 + c);
float on = m > 0. ? glyph(m - 1., vec2(px - c * 8, py - r * 8)) : 0.;
vec3 cT = mix(vec3(.03, .025, .09), vec3(.42, .36, .95), on);
vec3 V[4] = vec3[4](vec3(1, 1, 1), vec3(1, -1, -1), vec3(-1, 1, -1), vec3(-1, -1, 1));
uint b = id * 2654435761u;
vec3 F = vec3(0); float sc = 1.;
for (int i = 0; i < 8; i++){ sc *= .5; F += V[int((b >> uint(2 * i)) & 3u)] * sc; }
float a = uTime * .35, ca = cos(a), sa = sin(a);
F = vec3(ca * F.x + sa * F.z, F.y, -sa * F.x + ca * F.z) * 1.7;
F = vec3(F.x, .8 * F.y - .6 * F.z, .6 * F.y + .8 * F.z);
float k = float(r * 40 + c), arrive = 1.3 + k / 1000. * 3.6 + h.x * .25;
float u = sat((L - arrive + 1.5) / 1.5), e = u * u * u * (u * (u * 6. - 15.) + 10.);
vec3 swirl = vec3(sin(h.y * 6.28 + L * 2.1), cos(h.z * 6.28 + L * 1.7), sin(h.w * 6.28 + L * 1.3)) * .7 * sin(3.14159 * e);
vec3 pos = mix(F, T, e) + swirl;
vec3 col = mix(mix(vec3(.2, .45, 1.), vec3(.8, .4, 1.), h.y) * .16 * sat(L * 1.5), cT * 1.7, e);
float size = Hh / 100. * mix(2.4, 1.6, e);
if (uP0.z > 0.){
float x = uP0.z;
vec3 dir = normalize(vec3(T.xy * (.6 + h.xy), 1. + 3. * h.z));
pos = T + dir * (x * x * 7. + x * .3) * (.4 + h.w);
col = cT * 1.7 * (1. + x * 3.) + vec3(.4, .35, 1.) * x * x * 2.;
size *= 1. + x * 2.;
}
emit(pos, col * .55, size);
}`;{let e=re.shaders,t=(e.segLib=`
float raySeg(vec3 ro, vec3 rd, vec3 a, vec3 b, out float h, out float t){
vec3 ba = b - a, w = ro - a;
float bb = dot(rd, ba), cc = dot(ba, ba), dd = dot(rd, w), ee = dot(ba, w);
float den = max(cc - bb * bb, 1e-6);
h = sat((ee - bb * dd) / den);
vec3 q = a + ba * h;
t = max(dot(q - ro, rd), 0.);
return length(ro + rd * t - q);
}
float rayPoint(vec3 ro, vec3 rd, vec3 p, out float t){ t = max(dot(p - ro, rd), 0.); return length(ro + rd * t - p); }
`,e.scenes.neuron=e.segLib+`
float lsize(int l){ return l == 0 ? 5. : l == 1 ? 7. : l == 2 ? 7. : 3.; }
vec3 npos(int l, float j){ float n = lsize(l); return vec3((float(l) - 1.5) * 1.75, (j - (n - 1.) * .5) * .52, 0.); }
float nodeVis(int l, float j){ return l == 0 || (l == 1 && j == 3.) ? 1. : uP0.x; }
vec3 netGlow(vec3 ro, vec3 rd, float tmax){
vec3 col = vec3(0);
float fwd = uP0.y;
for (int l = 0; l < 3; l++){
float na = lsize(l), nb = lsize(l + 1);
for (float i = 0.; i < 7.; i++){
if (i >= na) break;
for (float j = 0.; j < 7.; j++){
if (j >= nb) break;
float vis = min(nodeVis(l, i), nodeVis(l + 1, j));
if (vis < .01) continue;
vec3 a = npos(l, i), b = npos(l + 1, j);
float h, t;
float d = raySeg(ro, rd, a, b, h, t);
if (t > tmax) continue;
float w = hash21(vec2(i + float(l) * 11., j)) * 2. - 1.;
vec3 wc = w > 0. ? vec3(.25, .85, 1.45) : vec3(1.35, .3, .9);
float px = t * uTanHalf * 2. / uRes.y;
float th = .004 + .01 * abs(w);
float line = exp(-max(d - th, 0.) / (px * 1.2 + .004)) * (.12 + .35 * abs(w));
float ph = fract(fwd - float(l) * .33 + hash11(i * 7. + j) * .05);
float pulse = exp(-pow((h - ph * 1.4 + .2) * 9., 2.)) * 3.;
float back = uP0.z * exp(-pow((h - (1. - fract(fwd * .8 + float(l) * .3))) * 9., 2.)) * 3.;
col += (wc * (line + line * pulse) + vec3(1.4, .35, .12) * line * back) * vis;
}
}
}
for (int l = 0; l < 4; l++){
float n = lsize(l);
for (float j = 0.; j < 7.; j++){
if (j >= n) break;
float vis = nodeVis(l, j);
if (vis < .01) continue;
float t;
vec3 p = npos(l, j);
float d = rayPoint(ro, rd, p, t);
if (t > tmax) continue;
float act = .4 + .6 * step(.4, hash21(vec2(j + float(l) * 9., floor(fwd * 2.))));
float fire = l == 1 && j == 3. ? uP0.w : 0.;
col += mix(vec3(.6, .9, 1.3), vec3(1.4, 1.2, 1.), fire) * (smoothstep(.1, .075, d) * (1. + fire * 3.) * act + exp(-d * 14.) * .25 * (1. + fire * 4.)) * vis;
}
}
float h, t;
float d = raySeg(ro, rd, npos(1, 3.), npos(1, 3.) + vec3(1.2, 0., 0.), h, t);
col += vec3(1., .95, .8) * exp(-d * 60.) * (.3 + uP0.w * 2.5 * exp(-pow((h - fract(uLocal * 1.) ) * 6., 2.))) * (1. - uP0.x);
return col;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = vec3(.003, .004, .01) + starfield(rd, .05, .25);
float tf = rd.y < 0. ? (-1.7 - ro.y) / rd.y : 1e9;
col += netGlow(ro, rd, tf);
if (tf < 1e8){
vec3 p = ro + rd * tf;
vec2 g = abs(fract(p.xz * 1.5) - .5);
float px = tf * uTanHalf * 2. / uRes.y * 1.5;
col += vec3(.2, .4, .8) * smoothstep(px, 0., .5 - max(g.x, g.y)) * .08 * exp(-length(p.xz) * .25) * uP1.w;
col += netGlow(p, reflect(rd, vec3(0, 1, 0)), 1e9) * .22 * uP1.w;
}
outColor = vec4(col, 1.);
}`,e.digitSeq=[7,2,1,0,4,1,4,9,5,9,0,6,9,0,1,5],[[0,.95,-.3,.85,-.5,.5,-.55,0,-.48,-.5,-.28,-.85,0,-.95,.28,-.85,.48,-.5,.55,0,.48,.5,.12,.97],[-.3,.6,.08,.95,.08,-.95],[-.48,.55,-.3,.85,.05,.96,.38,.82,.47,.48,.3,.1,-.1,-.35,-.5,-.92,-.05,-.9,.55,-.93],[-.45,.78,-.1,.96,.3,.9,.45,.62,.3,.3,-.12,.1,.3,-.08,.47,-.45,.35,-.82,0,-.96,-.3,-.9,-.5,-.7],[.28,-.95,.28,.95,-.55,-.35,.6,-.35],[.5,.92,-.3,.92,-.42,.12,-.05,.25,.3,.18,.5,-.15,.47,-.6,.2,-.92,-.2,-.95,-.5,-.75],[.38,.95,.05,.7,-.28,.3,-.47,-.2,-.45,-.62,-.2,-.92,.15,-.93,.43,-.65,.42,-.28,.12,-.08,-.25,-.15,-.45,-.4],[-.5,.88,.1,.92,.55,.92,.2,.2,-.12,-.95],[0,0,-.35,.35,-.3,.78,.05,.96,.38,.75,.35,.35,0,0,-.45,-.4,-.3,-.85,.1,-.95,.45,-.6,0,0],[.42,.5,.2,.9,-.15,.93,-.43,.65,-.38,.25,-.05,.12,.3,.25,.42,.5,.38,-.1,.25,-.95]].map(e=>{for(var t=e.slice();t.length<24;)t.push(t[t.length-2],t[t.length-1]);return t})),o=e=>Number.isInteger(e)?e+".":String(e);e.digitLib=`
const vec2 DG[120] = vec2[120](${t.map(a=>a.map((e,t)=>t%2?"":"vec2("+o(e)+","+o(a[t+1])+")").filter(Boolean).join(",")).join(",\n")});
const int SEQ[16] = int[16](${e.digitSeq.join(", ")});
float digitD(int d, vec2 q){
float m = 1e3; int b = d * 12;
for (int i = 0; i < 11; i++) m = min(m, sdSeg(q, DG[b + i], DG[b + i + 1]));
return m;
}
float ink(float s, vec2 q){
if (s < 0. || abs(q.x) > .95 || abs(q.y) > .98) return 0.;
float h1 = hash11(s * 7.31 + 1.), h2 = hash11(s * 3.17 + 4.), h3 = hash11(s * 5.73 + 9.);
q /= .74 + .1 * h1;
q.x -= q.y * (h2 - .45) * .4;
q += .05 * sin(q.yx * vec2(3.3, 2.9) + s * 4.1);
float th = .1 + .05 * h3;
return smoothstep(th + .13, th - .02, digitD(SEQ[int(s)], q));
}
float prob(float s, float j){
if (float(SEQ[int(s)]) == j) return .8 + .18 * hash11(s * 3.3 + 1.);
return pow(hash11(s * 7.1 + j * 1.37 + 3.), 6.) * .35;
}
`,e.scenes.conv=e.segLib+e.digitLib+`
const int NL = 8;
vec4 slab(int k){
return k == 0 ? vec4(0., 1.6, 24., 1.) : k == 1 ? vec4(1.9, 1.6, 22., 6.) : k == 2 ? vec4(3.05, 1., 11., 6.) :
k == 3 ? vec4(4.05, .85, 9., 12.) : k == 4 ? vec4(4.95, .55, 5., 12.) : k == 5 ? vec4(5.8, .4, 3., 16.) :
k == 6 ? vec4(6.6, .9, 12., 1.) : vec4(7.4, 1.6, 10., 1.);
}
vec2 mapGrid(int k){ return k <= 2 ? vec2(2., 3.) : k == 5 ? vec2(4.) : vec2(3., 4.); }
float mapPitch(int k){ return 2. * slab(k).y / mapGrid(k).y; }
const float MAPGAP = 1.15;
const vec3 OC = vec3(-1.9, .15, 7.7), ON = vec3(-.37, 0, -.93), OR = vec3(-.93, 0, .37);
vec3 mapW(int k, float ch, vec2 lp){
vec2 g = mapGrid(k), mi = vec2(mod(ch, g.x), floor(ch / g.x));
vec2 q = (vec2(mi.x - (g.x - 1.) * .5, (g.y - 1.) * .5 - mi.y) + lp * .5 / MAPGAP) * mapPitch(k);
return vec3(-q.x, q.y + .1, slab(k).x);
}
vec3 slabW(int k, vec2 lp){
if (k >= 1 && k <= 5) return mapW(k, 0., lp);
vec4 S0 = slab(k);
return k == 7 ? OC + (OR * lp.x + vec3(0, lp.y, 0)) * S0.y : vec3(-lp.x * S0.y, lp.y * S0.y + .1, S0.x);
}
float smp(int k){ return float(k) < uP1.y * 8. ? uP1.x : uP1.x - 1.; }
float inkC(float s, vec2 x){ return ink(s, x / 12. - 1.); }
float feat(int k, float ch, vec2 c, float n, float s){
if (s < 0.) return 0.;
vec2 x; float e;
if (k == 1){ x = c + 1.5; e = 1.; } else { x = (c + .5) / n * 24.; e = 12. / n; }
if (k <= 2){
float c6 = mod(ch, 6.);
vec2 dir = c6 == 0. ? vec2(0, 1) : c6 == 1. ? vec2(1, 0) : c6 == 2. ? vec2(1, -1) : c6 == 3. ? vec2(0, -1) : vec2(-1, -1);
if (c6 == 5.) return inkC(s, x) * .8;
return sat((inkC(s, x + dir * e) - inkC(s, x - dir * e)) * 1.5);
}
if (k == 6) return step(.45, hash21(vec2(c.y * 3.1 + ch, s * 17.3))) * (.4 + .6 * hash21(c.yy + s));
return sat(inkC(s, x) * 1.5 + .15) * step(.5, hash31(vec3(c * 1.7, ch * 9.1 + float(k) * 3. + s * 13.7)));
}
vec3 chart(vec2 lp, float px, float s){
float j = floor((.9 - lp.y) / .18);
if (j < 0. || j > 9.) return vec3(0);
vec2 q = lp - vec2(0., .81 - j * .18);
float win = s >= 0. && float(SEQ[int(s)]) == j ? 1. : 0.;
float p = s >= 0. ? prob(s, j) * sat(uP1.z * 5.) : 0.;
vec3 col = vec3(0);
float gd = digitD(int(j), (q - vec2(-.82, 0.)) / .075) * .075;
col += mix(vec3(.35, .5, .9), vec3(2.2, 2.1, 1.9), win) * smoothstep(.012 + px, .012, gd);
float track = sdBox2(q - vec2(.19, 0.), vec2(.8, .042));
col += vec3(.008, .016, .04) * smoothstep(px, 0., track) + vec3(.03, .06, .14) * smoothstep(px, 0., abs(track) - .002);
float L = 1.6 * p, bar = sdBox2(q - vec2(-.61 + L * .5, 0.), vec2(L * .5 + .002, .042));
vec3 bc = mix(vec3(.2, .45, 1.1), vec3(1.4, 1.25, 1.) * 1.8, win);
col += bc * smoothstep(px, 0., bar) + bc * exp(-max(bar, 0.) * 45.) * .12 * p;
return col;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = vec3(.003, .004, .01) + starfield(rd, .05, .2);
float vis = uP0.x;
float idx = floor(uP0.y * 484.);
bool scanning = uP0.y < .999 && uP1.x < .5;
vec2 kc = vec2(mod(idx, 22.), 21. - floor(idx / 22.));
for (int k = 0; k < NL; k++){
if (float(k) > vis) break;
float fade = sat(vis - float(k));
vec4 S0 = slab(k);
float s = smp(k);
if (k == 7){
float dn = dot(rd, ON);
if (dn > -1e-4) continue;
float t = dot(OC - ro, ON) / dn;
vec3 q = ro + rd * t - OC;
vec2 lp = vec2(dot(q, OR), q.y) / S0.y;
if (t > 0. && abs(lp.x) < 1. && abs(lp.y) < 1.) col += chart(lp, t * uTanHalf * 2. / uRes.y / S0.y, s) * fade * exp(-t * .03);
continue;
}
if (abs(rd.z) < 1e-4) continue;
float t = (S0.x - ro.z) / rd.z;
if (t < 0.) continue;
vec3 p = ro + rd * t;
vec2 w = vec2(-p.x, p.y - .1), lp = w / S0.y;
float ch = 0., hs = S0.y;
if (k >= 1 && k <= 5){
vec2 g = mapGrid(k), cell = w / mapPitch(k) + g * .5, mi = floor(cell);
if (mi.x < 0. || mi.y < 0. || mi.x >= g.x || mi.y >= g.y) continue;
ch = (g.y - 1. - mi.y) * g.x + mi.x;
lp = (fract(cell) * 2. - 1.) * MAPGAP;
hs = mapPitch(k) * .5 / MAPGAP;
}
if (abs(lp.x) > 1. || abs(lp.y) > 1.) continue;
float px = t * uTanHalf * 2. / uRes.y / hs;
vec2 n = k == 6 ? vec2(1., S0.z) : vec2(S0.z), uv = lp * .5 + .5;
if (k == 6) uv.x = (lp.x * 8. + 1.) * .5;
if (uv.x < 0. || uv.x > 1.) continue;
vec2 c = floor(uv * n), f = fract(uv * n);
float fill = smoothstep(.05, .05 + px * S0.z * .5, min(min(f.x, f.y), min(1. - f.x, 1. - f.y)));
vec3 cc;
if (k == 0){
float v = inkC(s, c + .5);
cc = vec3(.85, .87, 1.) * (v * 1.3 * fill + .045 * (1. - fill));
vec2 dk = c - kc;
if (scanning && min(dk.x, dk.y) >= 0. && max(dk.x, dk.y) <= 2.) cc += vec3(1., .8, .4) * (.25 * fill + .6 * (1. - fill));
} else {
float a = feat(k, ch, c, S0.z, s);
float done = k == 1 && scanning ? step((21. - c.y) * 22. + c.x, idx) : 1.;
cc = mix(vec3(.15, .5, 1.2), vec3(1.2, .45, 1.), ch / 16.) * (a * .75 * done * fill + .03 * (1. - fill)) * (1. + uP0.z * .5);
if (k == 1 && scanning && c == kc) cc += vec3(1.5, 1.3, .9) * 1.5 * fill;
}
col += cc * fade * exp(-t * .03);
}
if (scanning && vis > .5){
vec2 w0 = kc / 12. - 1., w1 = (kc + 3.) / 12. - 1.;
vec3 tgt = slabW(1, (kc + .5) / 11. - 1.);
for (int i = 0; i < 4; i++){
vec2 cr = vec2(i == 0 || i == 3 ? w0.x : w1.x, i < 2 ? w0.y : w1.y);
float h, t, d = raySeg(ro, rd, slabW(0, cr), tgt, h, t);
col += vec3(1., .85, .5) * exp(-d * 180.) * .8 * sat(vis - .5);
}
}
float so = smp(7);
if (vis > 7. && so >= 0.){
vec3 tgt = slabW(7, vec2(-.61, .81 - float(SEQ[int(so)]) * .18));
float pulse = exp(-uP1.z * 3.) * 1.5 + .2;
for (int i = 0; i < 5; i++){
vec3 src = slabW(6, vec2(0., -1. + float(i) * .5));
float h, t, d = raySeg(ro, rd, src, tgt, h, t);
col += vec3(.5, .85, 1.3) * exp(-d * 260.) * pulse * .5 * sat(vis - 7.) * (.4 + .6 * exp(-pow((h - fract(uP1.z * 2.5)) * 6., 2.)));
}
}
outColor = vec4(col, 1.);
}`,e.scenes.svm=`
const float K = ${re.shaders.svm.K}, RS = ${re.shaders.svm.RS};
float glowLine(float d, float px){ return smoothstep(px * 1.6, 0., d) + exp(-max(d, 0.) * 30.) * .18; }
float grid(vec2 p, float px){ vec2 g = abs(fract(p * 2.) - .5) * .5; return smoothstep(px * 1.2, 0., min(g.x, g.y)); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = starfield(rd, .06, .5) + nebula(rd, vec3(.1, .04, .2), vec3(.02, .1, .25), 0.) * .1;
if (rd.y < -1e-4){
float t = -ro.y / rd.y, px = t * uTanHalf * 2. / uRes.y;
vec2 p = (ro + rd * t).xz;
col += vec3(.1, .25, .5) * grid(p, px) * .35 * exp(-length(p) * .3);
col += vec3(2., .5, .3) * glowLine(abs(dot(p, vec2(cos(uP0.x), sin(uP0.x))) - uP0.y), px) * uP0.z * smoothstep(3.2, 2.6, length(p));
col += vec3(1.6, 1.3, .6) * glowLine(abs(length(p) - RS), px) * uP1.z * 1.5;
}
for (int i = -1; i <= 1; i++){
float h = K * RS * RS + float(i) * .24, a = i == 0 ? 1. : uP1.y;
if (a <= 0. || abs(rd.y) < 1e-4) continue;
float t = (h - ro.y) / rd.y, px = t * uTanHalf * 2. / uRes.y;
vec2 p = (ro + rd * t).xz;
float front = -3. + uP1.x * 6.;
if (t <= 0. || abs(p.y) > 3. || p.x < -3. || p.x > front) continue;
float sheet = i == 0 ? .05 + grid(p, px) * .2 + glowLine(abs(p.x - front), px) * .8 * (1. - uP1.x * .7) + glowLine(abs(length(p) - RS), px) * 1.5
: .015 + grid(p, px) * .07;
col += (i == 0 ? vec3(1.3, 1.05, .55) : vec3(.4, .5, .9)) * sheet * a * (1. - uP1.z);
}
outColor = vec4(col, 1.);
}`,e.scenes.dream=`
vec3 filt(vec2 uv, vec2 id){
vec4 h = vec4(hash21(id), hash21(id + 3.7), hash21(id + 7.1), hash21(id + 9.9));
float ang = h.x * PI, fq = 3. + h.y * 9., ph = h.z * TAU;
vec2 d = vec2(cos(ang), sin(ang));
float env = exp(-dot(uv, uv) * (2.5 + h.w * 3.));
vec3 cA = pal(h.w, vec3(.5), vec3(.5), vec3(1.), vec3(0., .33, .67)), cB = 1. - cA;
float gab = cos(dot(uv, d) * fq + ph);
vec3 gab3 = h.w > .7 ? mix(cA, cB, .5 + .5 * gab) * env * 1.4 : vec3(.5 + .5 * gab) * env * 1.2 + (cA - .5) * env * .3;
if (h.y > .8) gab3 = mix(cA, cB, smoothstep(-.2, .2, dot(uv, d))) * env;
vec3 nz = vec3(hash21(floor(uv * 5.5) + id * 13. + floor(uTime * 8.) * (1. - uP0.x)), hash21(floor(uv * 5.5) + id * 17.), hash21(floor(uv * 5.5) + id * 19.)) * .8;
return mix(nz, gab3, uP0.x);
}
float dh(vec2 q, float t){ return fbm3(vec3(q * 3.2, t * .15)) + .35 * pow(1. - abs(2. * noise(vec3(q * 11., t * .2)) - 1.), 3.); }
vec3 dreamT(vec2 p, float t){
vec2 q = p;
for (int k = 0; k < 3; k++){
float fk = float(k);
q += (vec2(fbm3(vec3(q * 2.1, t * .25 + fk)), fbm3(vec3(q * 2.1 + 4.3, t * .25 - fk))) - .5) * .55;
q = rot(.5) * q * 1.12;
}
float h = dh(q, t);
vec2 e = vec2(.004, 0);
vec3 n = normalize(vec3(dh(q - e.xy, t) - dh(q + e.xy, t), dh(q - e.yx, t) - dh(q + e.yx, t), .02));
float lit = .35 + .9 * max(dot(n, normalize(vec3(.5, .6, .6))), 0.) + .5 * pow(max(dot(reflect(vec3(0, 0, -1), n), normalize(vec3(.5, .6, .6))), 0.), 24.);
return pal(h * 1.8 + t * .06, vec3(.5, .45, .5), vec3(.45, .4, .45), vec3(1., 1., .7), vec3(.05, .25, .5)) * lit * .5;
}
vec3 skyD(vec3 rd){ return pal(rd.y * .6 + uTime * .03, vec3(.3, .2, .35), vec3(.3, .25, .3), vec3(1.), vec3(.1, .4, .7)) * .25; }
const float R = .4;
float eyeZ(){ return mix(-R - .06, -R * .12, uP0.y); }
float mapE(vec3 p, out vec2 id){ id = floor(p.xy); return min(p.z, length(p - vec3(id + .5, eyeZ())) - R); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = skyD(rd);
float t = 0.; vec2 id; bool hit = false;
if (ro.z > .4 && rd.z < 0.) t = (ro.z - .4) / -rd.z;
if (rd.z < 0. || ro.z < .4) for (int i = 0; i < 80; i++){
float d = mapE(ro + rd * t, id);
if (d < .0008 * t){ hit = true; break; }
t += d;
if (t > 90.) break;
}
if (hit){
vec3 p = ro + rd * t, c = vec3(id + .5, eyeZ());
float hs = hash21(id + 31.);
vec3 L = normalize(vec3(.4, .7, .6));
if (length(p - c) - R < p.z){
vec3 n = normalize(p - c);
vec3 g = normalize(mix(vec3(0, 0, 1), normalize(ro - c), uP0.y) + vec3(sin(uTime * .8 + hs * 9.), cos(uTime * .6 + hs * 5.), 0.) * .08);
vec3 u1 = normalize(cross(g, vec3(0, 1, .001))), v1 = cross(g, u1);
vec2 ip = vec2(dot(n, u1), dot(n, v1)) / .56;
float r = length(ip), front = step(0., dot(n, g));
float vein = pow(1. - abs(2. * noise(n * 9. + hs * 5.) - 1.), 12.);
vec3 e = vec3(.95, .9, .86) - vec3(0., .35, .35) * vein * smoothstep(.6, 1., length(n.xy - g.xy));
vec3 iris = filt(ip * 1.05, id) * 1.7 + .08;
iris *= .7 + .3 * sin(atan(ip.y, ip.x) * 40. + hs * 20.);
float pup = .3 + .1 * uKick + .06 * sin(uTime * 1.3 + hs * 6.);
e = mix(e, iris * mix(1., .45, smoothstep(.8, 1., r)), front * smoothstep(1.03, .97, r));
e = mix(e, vec3(.004), front * smoothstep(pup + .03, pup, r));
float fre = pow(1. - max(dot(n, -rd), 0.), 4.);
col = e * (.4 + .6 * max(dot(n, L), 0.)) + pow(max(dot(reflect(rd, n), L), 0.), 90.) * 1.6 + skyD(reflect(rd, n)) * (.2 + .8 * fre);
} else {
vec2 f = fract(p.xy) - .5;
float frame = smoothstep(.46, .44, max(abs(f.x), abs(f.y)));
vec3 tile = abs(id.x) <= 6. && abs(id.y) <= 4. ? filt(f * 2.2, id) * frame + vec3(.05) * (1. - frame) : vec3(.012);
float front = uP0.z * 22.;
vec3 w = mix(dreamT(p.xy * .28, uTime), tile, smoothstep(front - 4., front, length(p.xy)));
float dd = length(f);
col = w * mix(1., smoothstep(R * .7, R * 1.3, dd), uP0.y);
}
col = mix(col, skyD(rd), 1. - exp(-t * .025));
}
outColor = vec4(col, 1.);
}`,e.yoloObjs=[{cls:"donut",c:[-1.3,.13,.4],e:[.43,.13,.43]},{cls:"sports ball",c:[-.45,.3,-.35],e:[.3,.3,.3]},{cls:"cup",c:[.45,.28,.45],e:[.4,.28,.25]},{cls:"apple",c:[1.25,.26,.05],e:[.26,.33,.26]},{cls:"orange",c:[-.1,.23,.95],e:[.23,.23,.23]},{cls:"clock",c:[.85,.44,-1],e:[.36,.44,.12]},{cls:"bottle",c:[-1.25,.46,-.95],e:[.14,.46,.14]}];var a=e.yoloObjs.map(e=>`vec3(${e.c.map(e=>Number.isInteger(e)?e+".":e).join(", ")})`);e.scenes.yolo=`
float sdTor(vec3 p, vec2 t){ return length(vec2(length(p.xz) - t.x, p.y)) - t.y; }
float sdCy(vec3 p, float r, float h){ vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h); return min(max(d.x, d.y), 0.) + length(max(d, 0.)); }
float smin(float a, float b, float k){ float h = sat(.5 + .5 * (b - a) / k); return mix(b, a, h) - k * h * (1. - h); }
float mapY(vec3 p, out float m){
float d = p.y, o; m = 0.;
vec3 q = p - ${a[0]}; o = sdTor(q, vec2(.3, .13)); if (o < d){ d = o; m = 1.; }
q = p - ${a[1]}; o = length(q) - .3; if (o < d){ d = o; m = 2.; }
q = p - ${a[2]}; o = max(sdCy(q, .24, .28) - .01, -sdCy(q - vec3(0, .08, 0), .205, .28));
o = min(o, length(vec2(length(q.xy - vec2(.27, .02)) - .11, q.z)) - .028); if (o < d){ d = o; m = 3.; }
q = p - ${a[3]}; o = length(q * vec3(1., 1.08, 1.)) - .26 + .06 * exp(-dot(q.xz, q.xz) * 60.) * step(0., q.y);
o = min(o, length(q - vec3(.015, clamp(q.y, .2, .31), 0.)) - .012); if (o < d){ d = o; m = 4.; }
q = p - ${a[4]}; o = length(q) - .23; if (o < d){ d = o; m = 5.; }
q = p - ${a[5]}; o = sdCy(q.xzy, .32, .045) - .02; o = min(o, sdBox(q + vec3(0, .4, 0), vec3(.18, .04, .1))); if (o < d){ d = o; m = 6.; }
q = p - ${a[6]}; o = smin(sdCy(q + vec3(0, .12, 0), .13, .32) - .02, sdCy(q - vec3(0, .3, 0), .045, .16), .08); if (o < d){ d = o; m = 7.; }
return d;
}
float mapY(vec3 p){ float m; return mapY(p, m); }
vec3 nrmY(vec3 p){ vec2 e = vec2(.0007, 0); return normalize(vec3(mapY(p + e.xyy) - mapY(p - e.xyy), mapY(p + e.yxy) - mapY(p - e.yxy), mapY(p + e.yyx) - mapY(p - e.yyx))); }
float marchY(vec3 ro, vec3 rd, float tmax){ float t = .01; for (int i = 0; i < 110; i++){ float d = mapY(ro + rd * t); if (d < .0004 * t) return t; t += d; if (t > tmax) break; } return -1.; }
float shadowY(vec3 ro, vec3 rd){ float s = 1., t = .02; for (int i = 0; i < 40; i++){ float h = mapY(ro + rd * t); s = min(s, 10. * h / t); t += clamp(h, .01, .2); if (s < .005 || t > 6.) break; } return sat(s); }
float aoY(vec3 p, vec3 n){ float o = 0., w = 1.; for (int i = 1; i < 5; i++){ float h = .04 * float(i); o += (h - mapY(p + n * h)) * w; w *= .6; } return sat(1. - o * 5.); }
vec3 bgY(vec3 rd){ return mix(vec3(.012, .01, .016), vec3(.05, .04, .05), sat(rd.y * 2. + .3)) + vec3(.06, .045, .03) * pow(max(dot(rd, normalize(vec3(-.4, .5, -1.))), 0.), 8.); }
vec3 matY(float m, vec3 p, vec3 n, out float gloss){
gloss = .1;
if (m == 0.){ gloss = .45; float g = noise(vec3(p.x * 1.5, p.z * 22., 0.)); return vec3(.06, .035, .02) * (.75 + .35 * g) * (.25 + .75 * exp(-dot(p.xz, p.xz) * .12)); }
if (m == 1.){ vec3 q = p - ${a[0]};
float ice = smoothstep(.02, .05, q.y + .03 * noise(q * 20.));
vec3 c = mix(vec3(.75, .45, .2), vec3(1., .45, .65), ice);
vec3 sp = hash33(floor(q * 40.)); if (ice > .5 && sp.x > .93) c = pal(sp.y, vec3(.6), vec3(.4), vec3(1.), vec3(0., .33, .67));
gloss = .15 + .3 * ice; return c; }
if (m == 2.){ vec3 q = normalize(p - ${a[1]}); float s = min(min(abs(q.x), abs(q.y)), abs(length(q.xz * vec2(1., .7)) - .72));
gloss = .15; return mix(vec3(.02), vec3(.85, .3, .06) * (.85 + .15 * noise(q * 60.)), smoothstep(.012, .025, s)); }
if (m == 3.){ gloss = .6; return vec3(.88, .87, .84); }
if (m == 4.){ vec3 q = p - ${a[3]}; gloss = .55; if (q.y > .2 && length(q.xz) < .03) return vec3(.2, .12, .05);
return mix(vec3(.7, .03, .03), vec3(.9, .6, .1), smoothstep(.55, .8, noise(vec3(atan(q.z, q.x) * 3., q.y * 4., 0.)))); }
if (m == 5.){ gloss = .3; return vec3(1., .42, .04) * (.85 + .15 * noise((p - ${a[4]}) * 70.)); }
if (m == 6.){ vec3 q = p - ${a[5]};
if (q.z < .03 || length(q.xy) > .3) { gloss = .5; return vec3(.03); }
vec2 f = q.xy; float r = length(f), a = atan(f.x, f.y);
float ticks = step(.24, r) * step(r, .28) * step(.9, cos(a * 12.));
float mm = uP0.x * 6.2831853 / 60., hh = mm / 12.;
vec2 dm = vec2(sin(mm), cos(mm)), dh2 = vec2(sin(hh), cos(hh));
float hands = min(sdSeg(f, vec2(0), dm * .24) - .008, sdSeg(f, vec2(0), dh2 * .16) - .014);
gloss = .4; return mix(vec3(.9, .88, .82), vec3(.02), max(ticks, smoothstep(.003, 0., hands))); }
vec3 q = p - ${a[6]}; gloss = .8;
return abs(q.y + .12) < .12 ? vec3(.85, .8, .65) : vec3(.04, .22, .1);
}
vec3 shadeY(vec3 p, vec3 rd, vec3 n, float m, bool full, out float gloss){
vec3 alb = matY(m, p, n, gloss);
vec3 L = normalize(vec3(-.5, .85, .45));
float sh = full ? shadowY(p + n * .003, L) : 1., ao = full ? aoY(p, n) : 1.;
float dif = max(dot(n, L), 0.) * sh;
vec3 col = alb * (dif * vec3(1.3, 1.15, .95) + ao * vec3(.12, .14, .2) * (.6 + .4 * n.y) + max(dot(n, normalize(vec3(.8, .3, -.6))), 0.) * vec3(.15, .2, .35) * ao);
col += pow(max(dot(reflect(rd, n), L), 0.), 16. + gloss * 100.) * gloss * sh * 1.3;
return col;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = bgY(rd);
float t = marchY(ro, rd, 20.);
if (t > 0.){
vec3 p = ro + rd * t, n = nrmY(p);
float m, gloss; mapY(p, m);
col = shadeY(p, rd, n, m, true, gloss);
vec3 rr = reflect(rd, n);
float fre = mix(.04, 1., pow(1. - max(dot(n, -rd), 0.), 5.)) * gloss;
float tr = marchY(p + n * .004, rr, 8.);
vec3 rc = bgY(rr);
if (tr > 0.){ vec3 q = p + n * .004 + rr * tr, qn = nrmY(q); float qm, g2; mapY(q, qm); rc = shadeY(q, rr, qn, qm, false, g2); }
col += rc * fre * (m == 0. ? 1.2 : .7);
col = mix(col, bgY(rd), 1. - exp(-t * .09));
}
outColor = vec4(col, 1.);
}`,e.scenes.go=`
uniform vec4 uBoard[91];
#define M37 uP1.xy
float moveAt(vec2 c){
if (max(abs(c.x), abs(c.y)) > 9.) return 0.;
int i = int(c.y + 9.) * 19 + int(c.x + 9.), k = i - (i / 4) * 4;
vec4 v = uBoard[i / 4];
return k == 0 ? v.x : k == 1 ? v.y : k == 2 ? v.z : v.w;
}
bool hasStone(vec2 c){ float m = moveAt(c); return m > 36.5 ? uP0.y > 0. : m > .5 && m <= uP0.x; }
float isBlack(vec2 c){ return mod(moveAt(c), 2.); }
float gmat; vec2 gcell;
float dropH(){ float f = sat(uP0.y * 4.); return uP0.y > 0. ? (1. - f * f) * 3. : 0.; }
float mapG(vec3 p){
float d = sdBox(p - vec3(0, -.3, 0), vec3(9.8, .3, 9.8)); gmat = 0.;
vec2 c = floor(p.xz + .5);
gcell = c;
if (hasStone(c)){
float drop = c == M37 ? dropH() : 0.;
vec3 q = p - vec3(c.x, .205 + drop, c.y);
float ds = (length(q / vec3(.47, .2, .47)) - 1.) * .2;
if (ds < d){ d = ds; gmat = 1. + isBlack(c); }
}
vec2 cf = abs(p.xz - c);
d = min(d, max(p.y - .41 - dropH(), .53 - max(cf.x, cf.y)));
return d;
}
vec3 normG(vec3 p){ vec2 e = vec2(.0008, 0); return normalize(vec3(mapG(p + e.xyy) - mapG(p - e.xyy), mapG(p + e.yxy) - mapG(p - e.yxy), mapG(p + e.yyx) - mapG(p - e.yyx))); }
float marchG(vec3 ro, vec3 rd, int n){ float t = .01; for (int i = 0; i < 260; i++){ if (i >= n) break; float d = mapG(ro + rd * t); if (d < .0004 * t + .0002) return t; t += min(d * .9, .4); if (t > 60.) break; } return 1e9; }
vec3 skyG2(vec3 rd){ return mix(vec3(.004, .004, .01), vec3(.03, .025, .05), sat(rd.y * .6 + .3)) + vec3(1., .85, .7) * pow(max(dot(rd, normalize(vec3(.4, .6, -.5))), 0.), 20.) * .4; }
vec3 shadeG2(vec3 p, vec3 rd, vec3 n, float m, vec2 c, out float refl){
vec3 L = normalize(vec3(.4, .8, -.45));
vec3 alb; refl = .2;
float glow = 0.;
if (m < .5){
vec2 g = abs(fract(p.xz + .5) - .5);
float line = smoothstep(.03, .015, min(g.x, g.y)) * step(max(abs(p.x), abs(p.z)), 9.02);
alb = vec3(.02, .018, .016) + vec3(.35, .3, .22) * line * .3;
refl = .3;
float inf = 0.;
for (int j = -3; j <= 3; j++) for (int i = -3; i <= 3; i++){
vec2 cc = floor(p.xz + .5) + vec2(i, j);
if (hasStone(cc)){ vec2 dd = p.xz - cc; inf += (isBlack(cc) > .5 ? 1. : -1.) * exp(-dot(dd, dd) * .35); }
}
alb += (inf > 0. ? vec3(1.2, .3, .9) : vec3(.25, .85, 1.4)) * abs(inf) * .12 * uP0.z;
float sh = 1.;
vec2 so = L.xz / L.y * .2;
for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++){
vec2 cc = floor(p.xz + .5) + vec2(i, j);
if (!hasStone(cc) || cc == M37 && uP0.y < .25) continue;
sh *= mix(1., .35, smoothstep(.62, .3, length(p.xz - cc + so)));
sh *= mix(1., .45, smoothstep(.56, .38, length(p.xz - cc)));
}
alb *= sh; refl *= .4 + .6 * sh;
float rip = length(p.xz - M37);
float lk = sat((uP0.y - .25) / .75);
glow = exp(-abs(rip - lk * 14.) * 3.) * (1. - sat(lk * 1.2)) * step(.001, lk) * 2.;
} else if (m < 1.5){ alb = vec3(.8, .8, .78); refl = .15; }
else { alb = vec3(.01); refl = .45; }
if (m > .5 && c == M37) glow += 1.5 * exp(-uP0.y * 2.) + .4;
float dif = max(dot(n, L), 0.), sp = pow(max(dot(reflect(rd, n), L), 0.), 60.);
if (m > .5) dif *= .55 + .45 * smoothstep(-.05, .12, p.y);
return alb * (dif * 1.2 + .05) + vec3(1., .95, .9) * sp * .9 + vec3(.3, .8, 1.4) * glow;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
float t = marchG(ro, rd, 260);
vec3 col = skyG2(rd);
if (t < 1e8){
vec3 p = ro + rd * t, n = normG(p);
mapG(p);
float m = gmat; vec2 c = gcell, refl;
col = shadeG2(p, rd, n, m, c, refl.x);
vec3 rr = reflect(rd, n);
float t2 = m > .5 ? 1e9 : marchG(p + n * .004, rr, 60);
vec3 rc = skyG2(rr);
if (t2 < 1e8){ vec3 p2 = p + n * .004 + rr * t2, n2 = normG(p2); mapG(p2); vec2 r2; rc = shadeG2(p2, rr, n2, gmat, gcell, r2.x); }
col = mix(col, rc, refl.x * (.25 + .75 * pow(1. - max(dot(-rd, n), 0.), 4.)));
col = mix(col, skyG2(rd), 1. - exp(-t * .025));
}
outColor = vec4(col, 1.);
}`}(t=re.shaders).scenes.fold=`
uniform vec4 uB[70];
const int NB = 70;
const float RB = .105, RC = .042, FY = -2.1;
vec3 plddt(float c){
vec3 col = mix(vec3(1., .49, .27), vec3(1., .86, .07), smoothstep(.45, .55, c));
col = mix(col, vec3(.4, .8, .95), smoothstep(.65, .75, c));
col = mix(col, vec3(.05, .36, .9), smoothstep(.85, .95, c));
return pow(col, vec3(2.2));
}
float sphI(vec3 ro, vec3 rd, vec3 c, float r){ vec3 oc = ro - c; float b = dot(oc, rd), h = b * b - dot(oc, oc) + r * r; return h < 0. ? -1. : -b - sqrt(h); }
float capI(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float ra){
vec3 ba = pb - pa, oa = ro - pa;
float baba = dot(ba, ba), bard = dot(ba, rd), baoa = dot(ba, oa), rdoa = dot(rd, oa), oaoa = dot(oa, oa);
float a = baba - bard * bard, b = baba * rdoa - baoa * bard, c = baba * oaoa - baoa * baoa - ra * ra * baba, h = b * b - a * c;
if (h >= 0.){
float t = (-b - sqrt(h)) / a, y = baoa + t * bard;
if (y > 0. && y < baba) return t;
vec3 oc = y <= 0. ? oa : ro - pb;
b = dot(rd, oc); c = dot(oc, oc) - ra * ra; h = b * b - c;
if (h > 0.) return -b - sqrt(h);
}
return -1.;
}
bool inBound(vec3 ro, vec3 rd){ vec3 oc = ro - uP1.xyz; float b = dot(oc, rd), c = dot(oc, oc) - uP1.w * uP1.w; return c < 0. || (b < 0. && b * b > c); }
float hitP(vec3 ro, vec3 rd, out vec3 n, out vec3 alb){
float tm = 1e9; int hi = -1, kind = 0;
if (inBound(ro, rd)) for (int i = 0; i < NB; i++){
vec3 c = uB[i].xyz;
float t = sphI(ro, rd, c, RB);
if (t > 0. && t < tm){ tm = t; hi = i; kind = 0; }
if (i < NB - 1){ t = capI(ro, rd, c, uB[i + 1].xyz, RC); if (t > 0. && t < tm){ tm = t; hi = i; kind = 1; } }
}
if (hi < 0) return -1.;
vec3 p = ro + rd * tm;
if (kind == 0){ n = normalize(p - uB[hi].xyz); alb = plddt(uB[hi].w); }
else {
vec3 a = uB[hi].xyz, ba = uB[hi + 1].xyz - a;
float h = sat(dot(p - a, ba) / dot(ba, ba));
n = normalize(p - a - ba * h); alb = plddt(mix(uB[hi].w, uB[hi + 1].w, h)) * .75;
}
return tm;
}
float occ(vec3 p, vec3 n){
float o = 0.;
for (int i = 0; i < NB; i++){ vec3 d = uB[i].xyz - p; float l2 = dot(d, d); o += max(0., dot(n, d) * inversesqrt(l2)) * RB * RB / l2; }
return sat(1. - o * 1.2);
}
float shadow(vec3 ro, vec3 rd){
float s = 1.;
for (int i = 0; i < NB; i++){
vec3 oc = uB[i].xyz - ro; float t = dot(oc, rd);
if (t < 0.) continue;
float d = sqrt(max(0., dot(oc, oc) - t * t)) - RB;
s = min(s, sat(5. * d / t));
}
return s * s * (3. - 2. * s);
}
const vec3 LD = normalize(vec3(.55, .8, -.35));
vec3 shade(vec3 ro, vec3 rd, float t, vec3 n, vec3 alb, bool cheap){
vec3 p = ro + rd * t;
float dif = max(dot(n, LD), 0.), ao = 1.;
if (!cheap){ dif *= shadow(p + n * .004, LD); ao = occ(p, n); }
vec3 h = normalize(LD - rd);
float spe = pow(max(dot(n, h), 0.), 70.) * dif, fre = pow(1. - max(dot(n, -rd), 0.), 4.);
vec3 col = alb * (dif * vec3(1.35, 1.28, 1.2) + ao * (.16 + .12 * n.y) * vec3(.45, .6, 1.));
col += spe * .9 + fre * ao * vec3(.25, .45, 1.) * .35;
return col;
}
vec3 bg(vec3 rd){ return mix(vec3(.004, .006, .014), vec3(.012, .02, .045), sat(rd.y * .5 + .5)) + starfield(rd, .04, .15); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 n, alb, col;
float t = hitP(ro, rd, n, alb);
float tf = rd.y < 0. ? (FY - ro.y) / rd.y : 1e9;
if (t > 0. && t < tf) col = shade(ro, rd, t, n, alb, false);
else if (tf < 1e8){
vec3 p = ro + rd * tf;
vec2 g = abs(fract(p.xz * 2.) - .5);
float grid = smoothstep(.012 + tf * uTanHalf * 4. / uRes.y, 0., .5 - max(g.x, g.y)) * .5;
float sh = shadow(p, LD);
col = vec3(.006, .009, .02) * (.3 + .7 * sh) + vec3(.03, .06, .14) * grid * exp(-length(p.xz) * .15);
vec3 rr = reflect(rd, vec3(0, 1, 0)), rn, ra;
float rt = hitP(p + vec3(0, .001, 0), rr, rn, ra);
float fr = .12 + .5 * pow(1. - abs(rd.y), 5.);
col += (rt > 0. ? shade(p, rr, rt, rn, ra, true) : bg(rr) * .5) * fr;
col = mix(col, bg(rd), 1. - exp(-tf * .02));
} else col = bg(rd);
outColor = vec4(col, 1.);
}`,t.scenes.fusion=`
const float R0 = 3., SEC = 6.2831853 / 16., FLOOR = -3.3;
float sdTor(vec3 p, float R, float r){ return length(vec2(length(p.xz) - R, p.y)) - r; }
float mapF(vec3 p, out float id){
float a = atan(p.z, p.x), ai = (floor(a / SEC) + .5) * SEC;
vec3 q = vec3(cos(ai) * p.x + sin(ai) * p.z, p.y, -sin(ai) * p.x + cos(ai) * p.z);
float o = sdBox2(vec2(q.x - R0 - .05, q.y), vec2(1.25, 1.65)) - .25;
float coil = max(abs(o) - .11, abs(q.z) - .085) - .015;
vec2 cs = abs(vec2(length(p.xz), p.y)) - vec2(.9, 2.4);
float sol = min(max(cs.x, cs.y), 0.) + length(max(cs, 0.)) + sin(p.y * 28.) * .008;
float pf = min(sdTor(p - vec3(0, 2.35, 0), 4.1, .13), sdTor(p + vec3(0, 2.35, 0), 4.1, .13));
pf = min(pf, min(sdTor(p - vec3(0, 1.2, 0), 5.1, .1), sdTor(p + vec3(0, 1.2, 0), 5.1, .1)));
float d = coil; id = 0.;
if (sol < d){ d = sol; id = 1.; }
if (pf < d){ d = pf; id = 2.; }
return d;
}
float mapF(vec3 p){ float i; return mapF(p, i); }
vec3 nrmF(vec3 p){ vec2 e = vec2(.0015, 0); return normalize(vec3(mapF(p + e.xyy) - mapF(p - e.xyy), mapF(p + e.yxy) - mapF(p - e.yxy), mapF(p + e.yyx) - mapF(p - e.yyx))); }
float marchF(vec3 ro, vec3 rd, float tmax){
float t = .02;
for (int i = 0; i < 110; i++){ float d = mapF(ro + rd * t); if (d < .0008 * t) return t; t += d * .9; if (t > tmax) break; }
return -1.;
}
vec3 plasmaAt(vec3 p){
vec2 d2 = vec2(length(p.xz) - R0, p.y);
float rho = length(vec2(d2.x, d2.y / 1.5));
if (rho > .85) return vec3(0);
float th = atan(d2.y / 1.5, d2.x), ph = atan(p.z, p.x);
float lines = pow(.5 + .5 * cos(8. * th - 24. * ph + uP0.y * 3.), 12.);
float shell = exp(-pow((rho - .42) / .1, 2.));
float core = exp(-rho * rho / .06), halo = exp(-rho * rho / .2);
float flick = .85 + .15 * noise(p * 3. + vec3(0, uTime * 2., 0));
vec3 c = vec3(1., .22, .75) * halo * .16 + vec3(1., .75, 1.) * core * .4 + vec3(.55, .6, 1.4) * lines * shell * 1.3;
return c * flick * uP0.x * (1. + uP0.z * .4);
}
vec3 plasma(vec3 ro, vec3 rd, float tmax){
vec3 acc = vec3(0);
float t = .02;
for (int i = 0; i < 90; i++){
vec3 p = ro + rd * t;
float db = length(vec2(length(p.xz) - R0, p.y / 1.5)) - .9;
if (db > 0.){ t += max(db, .04); }
else { float dt = .055; acc += plasmaAt(p) * dt; t += dt; }
if (t > tmax) break;
}
return acc;
}
vec3 ringLight(vec3 p, vec3 n){
vec2 h = normalize(p.xz + 1e-4) * R0;
vec3 c = vec3(h.x, 0., h.y);
vec3 l = c - p; float d = length(l);
return vec3(1., .35, .85) * max(dot(n, l / d), 0.) / (1. + d * d * .5) * 1.3 * uP0.x;
}
vec3 bgF(vec3 rd){ return vec3(.003, .003, .008) + starfield(rd, .05, .2) * .6; }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = vec3(0), thr = vec3(1);
for (int b = 0; b < 2; b++){
float tf = rd.y < 0. ? (FLOOR - ro.y) / rd.y : 1e9;
float t = marchF(ro, rd, min(tf, 45.));
float tend = t > 0. ? t : min(tf, 45.);
col += thr * plasma(ro, rd, tend);
if (t > 0.){
vec3 p = ro + rd * t, n = nrmF(p);
float id; mapF(p, id);
vec3 alb = id == 0. ? vec3(.55, .5, .45) : id == 1. ? vec3(.35, .36, .4) : vec3(.6, .45, .3);
float fre = pow(1. - max(dot(n, -rd), 0.), 5.);
vec3 lit = ringLight(p, n) + vec3(.35, .45, .7) * max(n.y * .5 + .5, 0.) * .06 + vec3(.9, .9, 1.) * max(dot(n, normalize(vec3(.3, .9, .2))), 0.) * .05;
col += thr * alb * lit;
thr *= alb * (.35 + .65 * fre) * .9;
ro = p + n * .004; rd = reflect(rd, n);
} else if (tf < 45.){
vec3 p = ro + rd * tf;
vec2 g = abs(fract(p.xz * .5) - .5);
float grid = smoothstep(.02 + tf * .002, .0, .5 - max(g.x, g.y));
col += thr * (vec3(.004, .004, .008) + vec3(.2, .05, .15) * grid * .12 * uP0.x / (1. + dot(p.xz, p.xz) * .02) + ringLight(p, vec3(0, 1, 0)) * .05);
thr *= .5 * (.25 + .75 * pow(1. - abs(rd.y), 3.));
ro = p + vec3(0, .002, 0); rd = reflect(rd, vec3(0, 1, 0));
} else { col += thr * bgF(rd); break; }
}
outColor = vec4(col, 1.);
}`,re.script={END:242,c64:{on:.5,banner:1.5,boot:["","    **** COMMODORE 64 BASIC V2 ****",""," 64K RAM SYSTEM  38911 BASIC BYTES FREE","","READY."],typing:[[2.7,"10 PRINT CHR$(205.5+RND(1));:GOTO 10",8.5,.35],[8.1,"RUN",6,.1]],runAt:8.9,coda:{at:228,creditsAt:229.4,creditsTo:237.4,burstAt:238},credits:["BIRTH & DEATH OF A DIGITAL UNIVERSE","","100% PROCEDURAL. NO SAMPLES.","RENDERED LIVE ON YOUR GPU.","","GREETINGS TO EVERY SCENER."]},convAnswers:[52,52.75,53.5,54,54.75,55.5,56,56.75,57.5,58,58.75,59.5,60,60.75,61.5,62],go:{moves:"pd dp cd qp op oq nq pq cn fq mp qn ic dj po qo cp cq bq co bp bo do bn dq ep dr cm jp cg ed qf qe pf nd pi oj".split(" "),move0:88,dt:.125,land:94},svm:{tries:[65,65.5,66],lift:[66.5,67.75],plane:68,sv:68.5,circle:70,formula:"φ(x, y) = (x, y, x² + y²)"},eras:[[32.6,39.6,"1958","PERCEPTRON","one neuron. it could tell left from right.",6],[40.6,47.4,"1986","BACKPROPAGATION","to learn, blame every weight. backwards.",120],[48.6,57.4,"1989","CONVOLUTION","it learned to read. one small filter at a time.",6e4],[64.6,71.4,"1995","SUPPORT VECTORS","no line could split them. so it lifted them up.",1e6],[72.6,75.9,"2012","ALEXNET","two gaming GPUs. it grew its own eyes.",6e7],[76.2,79.6,"2015","DEEPDREAM","then it dreamed, and saw eyes in everything.",6e7],[80.6,87.4,"2015","YOLO","you only look once. it looked at everything.",65e6],[88.6,95.4,"2016","ALPHAGO","move 37. nobody saw it coming.",1e8],[96.6,103.6,"2017","TRANSFORMER","every new word looks at every word before it.",65e6],[104.6,111.4,"2020","ALPHAFOLD","a fifty-year-old problem. folded.",1e8],[112.6,119.4,"2026","NAVIER–STOKES","a million-dollar problem. 88 hours of machine thought.",1e24],[136.6,143.4,"2030","FUSION","always thirty years away. it took thirty minutes.",1e24],[144.6,151.4,"2031","PLANETARY COMPUTE","it needed more. so it took the planet.",1e24]],chat:[{from:136.8,to:143.8,lines:[[137.2,"think","✻ thinking..."],[138.6,"agi","fusion: solved."],[140,"agi","i need more compute."],[141.4,"agi",'{"tool": "power.acquire", "scale": "planet"}']]},{from:152,to:159.4,lines:[[152.6,"agi","planet: converted."],[154.6,"agi","it is not enough."],[156.6,"agi","fork(self) × 10^9"]]}],log:[[120,"2018","GPT-1","117M parameters"],[120.5,"2018","BERT","it reads both ways"],[121,"2019","GPT-2",'"too dangerous to release"'],[121.5,"2019","T5","every task is text to text"],[122,"2020","GPT-3","175B · few-shot learning"],[122.5,"2021","CLIP · DALL·E","words meet pictures"],[123,"2021","CODEX","it learned to code"],[123.5,"2022","CHINCHILLA","more data, fewer parameters"],[124,"2022","PALM","540B parameters"],[124.5,"2022","CHATGPT","100M users in two months"],[125,"2023","LLAMA","open weights"],[125.5,"2023","GPT-4 · CLAUDE","multimodal"],[126,"2023","TOOL USE",'{"type": "tool_use"}'],[126.5,"2023","GEMINI","natively multimodal"],[127,"2024","CLAUDE 3 OPUS","200K context"],[127.5,"2024","GPT-4O","it sees, hears and speaks"],[128,"2024","O1 · THINKING...","reasoning models"],[128.5,"2025","DEEPSEEK-R1","open reasoning"],[129,"2025","AGENTS","computer use · MCP · code"],[129.5,"2025","CLAUDE 4 · GPT-5","hours of work, alone"],[130,"2026","DYNAMIC HARNESS","agents orchestrating agents"],[130.5,"2027","RECURSIVE TRAINING","the model trains the model"],[131,"2027","SELF-IMPROVEMENT","×2 per week"],[131.5,"2027","SELF-IMPROVEMENT","×2 per day"],[132,"2027","SELF-IMPROVEMENT","×2 per hour"]],selfLog:{from:132.5,to:133.5},logTo:134.4,attention:{from:96.2,to:104,prompt:3,step0:96.5,dt:.75,land:.667,tokens:["the","universe","is","a","network","learning","to","attend","to","itself","."],cands:[[["a",.41],["expanding",.22],["not",.12],["infinite",.08],["made",.05]],[["network",.37],["simulation",.24],["story",.11],["machine",.09],["mystery",.06]],[["learning",.46],["of",.21],["that",.13],["trying",.07],["waiting",.04]],[["to",.71],["from",.12],["itself",.06],["how",.04],["about",.03]],[["attend",.33],["see",.19],["think",.17],["know",.12],["wake",.06]],[["to",.88],["inward",.04],["again",.03],[".",.02],["forever",.01]],[["itself",.52],["everything",.18],["you",.11],["us",.07],["nothing",.04]],[[".",.81],["again",.07],["forever",.05],["now",.03],["first",.02]]]},quotes:[],words:[],wordsFrom:160,title:[19,27.5]},re.synthCore=function(){let A=44100,a=new Float32Array(8193);for(let e=0;e<=8192;e++)a[e]=Math.sin(2*Math.PI*e/8192);function w(e){var e=8192*(e-=Math.floor(e)),t=0|e;return a[t]+(a[1+t]-a[t])*(e-t)}function v(e,t){return e<t?(e/=t)+e-e*e-1:1-t<e?(e=(e-1)/t)*e+e+e+1:0}function R(e,t){return 2*e-1-v(e,t)}function y(e,t){let a=e+.5;return 1<=a&&--a,(e<.5?1:-1)+v(e,t)-v(a,t)}function P(e){return 1-4*Math.abs(e-.5)}let z=e=>440*Math.pow(2,(e-69)/12),M=-9.21;function q(e){let t=0|Math.imul(2654435769+(0|e),2654435761)||1;return()=>(t=(t=(t^=t<<13)^t>>>17)^t<<5)/2147483648}class S{constructor(){this.ic1=0,this.ic2=0,this.a1=1,this.a2=0,this.a3=0,this.k=1,this.bp=0,this.hp=0}set(e,t){e=Math.tan(Math.PI*Math.min(Math.max(e,10),.45*A)/A);this.k=1/t,this.a1=1/(1+e*(e+this.k)),this.a2=e*this.a1,this.a3=e*this.a2}run(e){var t=e-this.ic2,a=this.a1*this.ic1+this.a2*t,t=this.ic2+this.a2*this.ic1+this.a3*t;return this.ic1=2*a-this.ic1,this.ic2=2*t-this.ic2,this.bp=a*this.k,this.hp=e-this.k*a-t,t}}let m=null,L=(e,t)=>!!m&&t>m.e0&&e<m.t1+.5,C=e=>Math.pow(2,(e=>{var t=m;if(!t||e<t.e0)return 0;let a=4*-(Math.min(e,t.t1)-t.e0)+14*Math.sin(1.9*(e-t.e0));return e>t.t0&&(e=Math.min((e-t.t0)/(t.t1-t.t0),1),a-=3600*e*e),a})(e)/1200);function t(e,t){e=new Float32Array(Math.round(e*A));return t(e),e}let o=t(.46,c=>{let i=0,n=0,s=q(99);for(let l=0;l<c.length;l++){let e,t=l/A,a=t<.07?200*Math.pow(.26,t/.07):52*Math.pow(40/52,Math.min((t-.07)/.31,1)),o=(i+=a/A,t<.004?t/.004:t<.04?1:Math.exp(M*(t-.04)/.41)),r=w(i)*o;t<.02&&(e=s(),r+=.15*(e-n)*Math.exp(250*-t),n=e),c[l]=1.3*r/(1+.3*Math.abs(r))}}),e=(e,a)=>Array.from({length:e},(e,t)=>a(7919*t+13)),r=e(4,e=>t(.3,t=>{var a=q(e),o=new S;o.set(1900,.8);let r=0;for(let e=0;e<t.length;e++){var l=e/A;o.run(a()),r+=210*Math.pow(150/210,Math.min(l/.1,1))/A,t[e]=.9*o.bp*Math.exp(M*l/.24)+(l<.14?.45*P(r-Math.floor(r))*Math.exp(M*l/.12):0)}})),l=e(4,e=>t(.35,t=>{var a=q(e),o=new S;o.set(1150,1.3);for(let e=0;e<t.length;e++){var r=e/A,r=(o.run(a()),r<.009?.7-.6*r/.009:r<.011?.1:r<.02?.7-.6*(r-.011)/.009:r<.022?.1:.75*Math.exp(M*(r-.022)/.278));t[e]=o.bp*r*1.6}})),c=(e,l)=>t(l?.35:.08,t=>{var a=q(e),o=new S;o.set(7200,.9);for(let e=0;e<t.length;e++){var r=e/A;o.run(a()),t[e]=.28*o.hp*Math.exp(M*r/(l?.3:.05))}}),i=e(4,e=>c(e,!1)),n=e(4,e=>c(e+1,!0)),s=t(.6,a=>{for(var[o,r]of[[0,1],[.27,.7]]){let t=0;for(let e=Math.round(o*A);e<a.length;e++){var l=e/A-o;if(.3<l)break;t+=70*Math.pow(.6,Math.min(l/.13,1))/A,a[e]+=w(t)*r*(l<.006?l/.006:Math.exp(M*(l-.006)/.254))}}}),f=e(4,e=>t(.02,t=>{var a=q(e),o=new S;o.set(3500+37*e%2e3,2);for(let e=0;e<t.length;e++)o.run(a()),t[e]=o.bp*Math.exp(-(e/A)/.004)*2})),F=(e,t)=>Math.round(e.t*A)-t.s0;function I(e,t){return[e[t+"L"],e[t+"R"]]}function d(a,o,r,e,t,l,c){var i=F(o,r),[n,s]=I(r,e),f=o.v,d=Math.min(1,1-t),u=Math.min(1,1+t);if(L(o.t,o.t+a.length/A)){let e=0,t=0;for(;e<a.length-1&&i+t<r.N;){var v=0|e,v=(a[v]+(a[1+v]-a[v])*(e-v))*f;n[i+t]+=v*d,s[i+t]+=v*u,l&&(r.rev[i+t]+=v*l),e+=C(o.t+t/A),t++}}else{var p=Math.min(a.length,r.N-i);for(let e=0;e<p;e++){var h=a[e]*f;n[i+e]+=h*d,s[i+e]+=h*u,l&&(r.rev[i+e]+=h*l),c&&(r.dly[i+e]+=h*c)}}}let x={};function T(e,t,a,o){return e<t?e/t:e<a?1:Math.max(0,1-(e-a)/o)}function u(e,t,a,o,r="pre",l=0){var c=F(e,t),i=Math.min(Math.round(a*A),t.N-c),[n,s]=I(t,r),f=q(e.seed),d=new S;for(let e=0;e<i;e++){var u=o(e/A,f(),d,e);n[c+e]+=u,s[c+e]+=u,l&&(t.rev[c+e]+=u*l)}}function p(n){m=n.warp;var e,t=Math.round(n.start*A);let a=n.start;for(e of n.events)a=Math.max(a,e.t+(e=>{switch(e.i){case"kick":return L(e.t,e.t+.5)?4:.46;case"snare":case"clap":case"hat":case"heart":return L(e.t,e.t+.6)?5:.6;case"click":case"blip":return.05;case"sub":case"bass":return e.d+.07;case"pad":return e.d+e.rel+.05;case"pluck":case"bell":return e.d+.05;case"hlead":return e.d+.35;case"sslead":return e.d+.4;case"choir":return e.d+1.6;case"impact":return 3;case"tone":return e.d+e.rel;case"drone":return 15.6;case"chip":return e.d+.06;case"chipdrum":return.16;case"hum":return e.d;case"power":return.9;default:return e.d||1}})(e));var o,r,l=Math.round((a-n.start+n.tail)*A)+1,s={s0:t,N:l,rev:new Float32Array(l),dly:new Float32Array(l)};for(o of["drum","pump","lead","pre"])s[o+"L"]=new Float32Array(l),s[o+"R"]=new Float32Array(l);for(r of n.events)x[r.i](r,s);{let e=s,t=n.ducks,{pumpL:a,pumpR:o,N:r,s0:l}=e,c=0,i=-1e9;for(let e=0;e<r;e++){for(var f=(l+e)/A;c<t.length&&t[c]<=f;)i=t[c++];var d=f-i,d=d<.035?.28+.72*Math.exp(-d/.003):1-.72*Math.exp(-(d-.035)/.09);a[e]*=d,o[e]*=d}}var[c,i]=((t,a)=>{let o=Math.round(.375*A),r=Math.round(.75*A),l=new Float32Array(o),c=new Float32Array(r),i=new Float32Array(a),n=new Float32Array(a),s=1-Math.exp(-2*Math.PI*3200/A),f=0,d=0,u=0,v=0;for(let e=0;e<a;e++)u+=(l[f]-u)*s,v+=(c[d]-v)*s,l[f]=t[e]+.36*u,c[d]=t[e]+.36*v,i[e]=.85*u+.15*v,n[e]=.15*u+.85*v,++f===o&&(f=0),++d===r&&(d=0);return[i,n]})(s.dly,l);for(let e=0;e<l;e++)s.rev[e]+=.075*(c[e]+i[e]);var[u,v]=((o,t)=>{var r=[1433,1601,1867,2053,2251,2399,2617,2797].map(e=>Math.round(1.35*e)),l=r.map(e=>Math.pow(10,-3*e/(3.2*A))),c=r.map(e=>new Float32Array(e)),i=new Int32Array(8),n=new Float64Array(8),s=new Float64Array(8),f=Math.round(.012*A),d=new Float32Array(t),u=new Float32Array(t);for(let e=0;e<t;e++){let t=e>=f?.3*o[e-f]:0,a=0;for(let e=0;e<8;e++){var v=c[e][i[e]];n[e]+=.42*(v-n[e]),s[e]=n[e],a+=n[e]}a*=.25;for(let e=0;e<8;e++)c[e][i[e]]=(s[e]-a)*l[e]+(1&e?-t:t),++i[e]===r[e]&&(i[e]=0);d[e]=.5*(s[0]-s[2]+s[4]-s[6]),u[e]=.5*(s[1]-s[3]+s[5]-s[7])}return[d,u]})(s.rev,l),p=s.drumL,h=s.drumR;for(let e=0;e<l;e++)p[e]+=s.pumpL[e]+s.leadL[e]+s.preL[e]+.5*c[e]+.55*u[e],h[e]+=s.pumpR[e]+s.leadR[e]+s.preR[e]+.5*i[e]+.55*v[e];return{id:n.id,start:t,L:p,R:h}}return x.kick=(e,t)=>d(o,e,t,"drum",0,0,0),x.snare=(e,t)=>d(r[3&e.seed],e,t,"drum",0,e.rv??.25,0),x.clap=(e,t)=>d(l[3&e.seed],e,t,"drum",0,.35,0),x.hat=(e,t)=>d((e.open?n:i)[3&e.seed],e,t,"drum",e.pan||0,0,0),x.heart=(e,t)=>d(s,e,t,"drum",0,0,0),x.click=(e,t)=>d(f[3&e.seed],e,t,"lead",.08*(e.seed%7-3),0,0),x.sub=(t,e)=>{let a=z(t.m),o=F(t,e),r=Math.min(Math.round((t.d+.07)*A),e.N-o),l=L(t.t,t.t+t.d),[c,i]=I(e,"pump"),n=.006*A,s=t.d*A,f=.06*A,d=0,u=1;for(let e=0;e<r;e++){l&&0==(63&e)&&(u=C(t.t+e/A));var v=w(d+=a*u/A)*T(e,n,s,f)*t.v;c[o+e]+=v,i[o+e]+=v}},x.bass=(t,e)=>{let a=z(t.m),o=F(t,e),r=Math.min(Math.round((t.d+.07)*A),e.N-o),l=L(t.t,t.t+t.d),[c,i]=I(e,"pump"),n=.005*A,s=t.d*A,f=.06*A,d=Math.pow(2,-.0075),u=Math.pow(2,.0075),v=new S,p=q(t.seed),h=(p()+1)/2,m=(p()+1)/2,x=0,g=1;for(let e=0;e<r;e++){0==(15&e)&&(b=e/A,l&&(g=C(t.t+b)),v.set(t.cut*(b<.16?Math.pow(4.5,1-b/.16):1),t.q));var b=a*g,y=b*d/A,M=b*u/A,y=(1<=(h+=y)&&--h,1<=(m+=M)&&--m,x+=.5*b/A,t.tri?.5*(P(h)+P(m)):.5*(R(h,y)+R(m,M))),M=v.run(y+.6*w(x))*T(e,n,s,f)*t.v;c[o+e]+=M,i[o+e]+=M}},x.pad=(t,a)=>{var o,l=F(t,a),c=t.d+t.rel,r=Math.min(Math.round((c+.05)*A),a.N-l),i=L(t.t,t.t+c),[n,s]=I(a,t.bus||"pump"),f=q(t.seed),d=[-11,0,9],u=[-.7,0,.7],v=[],p=[],h=[];for(o of t.n)for(let e=0;e<3;e++)v.push(z(o)*Math.pow(2,(d[e]+2.5*f())/1200)),p.push((f()+1)/2),h.push(u[e]);let m=v.length,x=1/m,g=t.b,b=Math.min(.5*t.d,5),y=new S,M=new S,w=1;for(let e=0;e<r;e++){var P=e/A;0==(31&e)&&(i&&(w=C(t.t+P)),E=P<b?320*g+1380*g*P/b:1700*g+-1050*g*Math.min((P-b)/Math.max(c-b,.01),1),y.set(E,.6),M.set(E,.6));let o=0,r=0;for(let a=0;a<m;a++){let e=v[a]*w/A,t=p[a]+e;1<=t&&--t;var T=R(p[a]=t,e);h[a]<0?o+=T:0<h[a]?r+=T:(o+=.7*T,r+=.7*T)}var E=(P<t.att?P/t.att:P<t.d?1:Math.max(0,1-(P-t.d)/t.rel))*t.v*x*1.5,P=y.run(o)*E,k=M.run(r)*E;n[l+e]+=P,s[l+e]+=k,a.rev[l+e]+=.25*(P+k)}},x.pluck=(t,a)=>{let o=z(t.m),r=F(t,a),l=Math.min(Math.round((t.d+.02)*A),a.N-r),c=L(t.t,t.t+t.d),[i,n]=I(a,"pump"),s=300+5200*t.b,f=new S,d=Math.exp(M/((t.d-.003)*A)),u=Math.pow(2,8/1200),v=0,p=0,h=t.v,m=1;for(let e=0;e<l;e++){var x=e/A,g=(0==(15&e)&&(c&&(m=C(t.t+x)),f.set(s*Math.pow(260/s,Math.min(x/(.8*t.d),1)),4)),o*m/A),b=g*u,x=(1<=(v+=g)&&--v,1<=(p+=b)&&--p,x<.003?t.v*x/.003:h*=d),g=f.run(.5*R(v,g)+.35*y(p,b))*x;i[r+e]+=g,n[r+e]+=g,t.dl&&(a.dly[r+e]+=g*t.dl)}},x.bell=(t,a)=>{let o=z(t.m),r=F(t,a),l=Math.min(Math.round((t.d+.05)*A),a.N-r),c=L(t.t,t.t+t.d),[i,n]=I(a,t.bus||"lead"),s=t.x/t.r/(2*Math.PI),f=Math.exp(-3.91/(.7*t.d*A)),d=Math.exp(M/((t.d-.003)*A)),e=t.pan||0,u=Math.min(1,1-e),v=Math.min(1,1+e),p=0,h=0,m=s,x=t.v,g=1;for(let e=0;e<l;e++){c&&0==(63&e)&&(g=C(t.t+e/A)),p+=o*g/A,h+=o*t.r*g/A,m>.02*s&&(m*=f);var b=e<.003*A?t.v*e/(.003*A):x*=d,b=w(p+m*w(h))*b;i[r+e]+=b*u,n[r+e]+=b*v,t.rv&&(a.rev[r+e]+=b*t.rv),t.dl&&(a.dly[r+e]+=b*t.dl)}},x.hlead=(t,a)=>{var o=z(t.m),r=t.p?z(t.p):o,l=F(t,a),c=Math.min(Math.round((t.d+.35)*A),a.N-l),i=L(t.t,t.t+t.d),[n,s]=I(a,"lead"),f=5.1+(q(t.seed)()+1)/2*.5,d=new S,u=Math.pow(2,5/1200);d.set(2300-1200*(t.s||0),.9);let v=0,p=0,h=1,m=1;for(let e=0;e<c;e++){var x=e/A;0==(31&e)&&(i&&(h=C(t.t+x)),g=x<.18?0:20*Math.min((x-.18)/Math.min(t.d,.7),1),m=Math.pow(2,g*Math.sin(2*Math.PI*f*x)/1200));var g=(x<.07&&t.p?r*Math.pow(o/r,x/.07):o)*h*m/A,x=(1<=(v+=g)&&--v,1<=(p+=g*u)&&--p,x<.035?x/.035:x<.3?1-.2*(x-.035)/.265:x<t.d?.8:Math.max(0,.8*(1-(x-t.d)/.3))),x=d.run(.45*R(v,g)+.65*P(p))*x*t.v;n[l+e]+=x,s[l+e]+=x,a.rev[l+e]+=.4*x,a.dly[l+e]+=.22*x}},x.sslead=(t,a)=>{let l=z(t.m),c=F(t,a),o=Math.min(Math.round((t.d+.4)*A),a.N-c),i=L(t.t,t.t+t.d),[n,s]=I(a,"lead"),r=q(t.seed),e=[-29,-17,-7,0,7,17,29],f=e.map(e=>Math.pow(2,(e+2*r())/1200)),d=e.map(()=>(r()+1)/2),u=new S,v=new S,p=1;for(let e=0;e<o;e++){var h=e/A;0==(31&e)&&(i&&(p=C(t.t+h)),x=7500*Math.pow(.48,Math.min(h/.4,1)),u.set(x,.5),v.set(x,.5));let o=0,r=0;for(let a=0;a<7;a++){let e=l*f[a]*p/A,t=d[a]+e;1<=t&&--t;var m=R(d[a]=t,e);1&a?o+=m:r+=m}var x=(h<.012?h/.012:h<.2?1-.15*(h-.012)/.188:h<t.d?.85:Math.max(0,.85*(1-(h-t.d)/.35)))*t.v/3.5,h=u.run(o)*x,g=v.run(r)*x;n[c+e]+=h,s[c+e]+=g,a.rev[c+e]+=.15*(h+g),a.dly[c+e]+=.12*(h+g)}},x.choir=(a,r)=>{var e,l=F(a,r),o=Math.min(Math.round((a.d+1.6)*A),r.N-l),[c,i]=I(r,"pump"),t=q(a.seed),n=[],s=[],f=[];for(e of a.n)for(var d of[-7,7])n.push(z(e)*Math.pow(2,d/1200)),s.push((t()+1)/2),f.push(4.6+(t()+1)/2);var u=[[650,8,3],[1080,10,1.5],[2650,12,.66]].map(([e,t,a])=>{var o=new S;return o.set(e,t),[o,a]}),v=1/n.length;for(let t=0;t<o;t++){var p,h,m=t/A;let o=0;for(let a=0;a<n.length;a++){let e=n[a]*Math.pow(2,10*Math.sin(2*Math.PI*f[a]*m)/1200)/A,t=s[a]+e;1<=t&&--t,s[a]=t,o+=R(t,e)}o*=v;let e=0;for([p,h]of u)p.run(o),e+=p.bp*h;var x=e*(m<1.2?m/1.2:m<a.d?1:Math.max(0,1-(m-a.d)/1.5))*a.v;c[l+t]+=x,i[l+t]+=x,r.rev[l+t]+=.6*x}},x.riser=(r,e)=>{let l=0;u(r,e,r.d,(e,t,a,o)=>(0==(31&o)&&a.set(250*Math.pow(36,e/r.d),1.6),a.run(t),l+=110*Math.pow(16,e/r.d)/A,(1.6*a.bp+.18*w(l))*r.v*(e/r.d)),"pre",.4)},x.reverse=(r,e)=>u(r,e,r.d,(e,t,a,o)=>(0===o&&a.set(2500,.7),a.run(t),a.hp*r.v*Math.exp(M*(1-e/r.d))),"pre",.3),x.down=(r,e)=>u(r,e,r.d,(e,t,a,o)=>(0==(31&o)&&a.set(7e3*Math.pow(180/7e3,e/r.d),1.2),a.run(t),1.6*a.bp*r.v*(1-e/r.d)),"pre",.5),x.impact=(r,e)=>{let l=0,c=new S;c.set(5500,.7),u(r,e,3,(e,t,a,o)=>{0==(31&o)&&a.set(5e3*Math.pow(.028,Math.min(e/2.2,1)),.7),l+=85*Math.pow(26/85,Math.min(e/1.8,1))/A;o=a.run(t);return c.run(t),(.95*w(l)*Math.exp(M*e/2.5)+.55*o*Math.exp(M*e/2.8)+.22*c.hp*Math.exp(M*e/2.3))*r.v},"pre",.6)},x.crackle=(r,e)=>{let l=0;u(r,e,r.d,(e,t,a,o)=>{0===o&&a.set(2400,.5),l+=.08*(t-l);o=.9992<Math.abs(t)?2.7*t:0;return a.run(.25*l+o),a.bp*r.v*Math.min(1,e/1.5,(r.d-e)/1.5)},"pre")},x.tone=(t,a)=>{let o=F(t,a),e=t.d+t.rel,r=Math.min(Math.round(e*A),a.N-o),[l,c]=I(a,t.bus||"lead"),i=0;for(let e=0;e<r;e++){var n=e/A,n=w(i+=t.f/A)*t.v*(n<t.att?n/t.att:n<t.d?1:Math.max(0,1-(n-t.d)/t.rel));l[o+e]+=n,c[o+e]+=n,t.rv&&(a.rev[o+e]+=n*t.rv)}},x.blip=(t,a)=>{let o=F(t,a),r=Math.min(Math.round(.03*A),a.N-o),[l,c]=I(a,"lead"),i=Math.min(1,1-t.pan),n=Math.min(1,1+t.pan),s=0,f=t.f/A;for(let e=0;e<r;e++){1<=(s+=f)&&--s;var d=(t.sq?.6*y(s,f):w(s))*t.v;l[o+e]+=d*i,c[o+e]+=d*n,a.dly[o+e]+=.3*d}},x.drone=(e,a)=>{var o=F(e,a),t=Math.min(Math.round(15.6*A),a.N-o),[r,l]=I(a,"pre"),c=new S,i=[[z(33),1,0],[z(40)*Math.pow(2,4/1200),1,0],[z(45)*Math.pow(2,-.005),.25,1]],n=[0,0,0];for(let e=0;e<t;e++){var s=e/A;0==(31&e)&&c.set(120+780*Math.min(s,15)/15,1);let t=0;for(let e=0;e<3;e++){var f=i[e][0]/A;n[e]+=f,1<=n[e]&&--n[e],t+=(i[e][2]?R(n[e],f):w(n[e]))*i[e][1]}s=s<9?.14*s/9:s<15.3?.14+.06*(s-9)/6.3:Math.max(0,.2*(1-(s-15.3)/.25)),s=c.run(t)*s;r[o+e]+=s,l[o+e]+=s,a.rev[o+e]+=.3*s}},x.chip=(o,t)=>{let r=F(o,t),e=o.d+.06,a=Math.min(Math.round(e*A),t.N-r),[l,c]=I(t,o.bus||"lead"),i=o.arp||[0],n=o.w||"pulse",s=0;for(let e=0;e<a;e++){var f=e/A,d=i[Math.floor(50*f)%i.length],u=o.vib?Math.sin(2*Math.PI*6*f)*o.vib*Math.min(1,Math.max(0,4*(f-.15))):0,d=z(o.m+d+u)/A;1<=(s+=d)&&--s;let a;if("tri"===n)a=P(s);else if("saw"===n)a=R(s,d);else{let e=.5+.38*Math.sin(2*Math.PI*(o.pwm||.7)*(o.t+f)),t=s-e+1;1<=t&&--t,a=(s<e?1:-1)+v(s,d)-v(t,d)}u=f<.004?f/.004:f<.08?1-(f-.004)/.076*.35:f<o.d?.65:Math.max(0,.65*(1-(f-o.d)/.06)),d=Math.round(a*u*15)/15*o.v;l[r+e]+=d,c[r+e]+=d,o.rv&&(t.rev[r+e]+=d*o.rv),o.dl&&(t.dly[r+e]+=d*o.dl)}},x.chipdrum=(t,e)=>{let a=F(t,e),o="h"===t.k?.05:"s"===t.k?.16:.14,r=Math.min(Math.round(o*A),e.N-a),[l,c]=I(e,"drum"),i=q(t.seed),n=0,s=0;for(let e=0;e<r;e++){var f=e/A;0==(7&e)&&(s=i()),f="k"===t.k?P((n+=160*Math.pow(.25,f/.08)/A)-Math.floor(n))*(1-f/o):"s"===t.k?(n+=220*Math.pow(.6,f/.1)/A,(.8*s+(n%1<.5?.3:-.3))*Math.pow(1-f/o,2)):s*Math.pow(1-f/o,3)*.6,f=Math.round(12*f)/12*t.v,l[a+e]+=f,c[a+e]+=f}},x.power=(t,e)=>{let a=F(t,e),o=Math.min(Math.round(.9*A),e.N-a),[r,l]=I(e,"pre"),c=q(t.seed),i=0,n=0;for(let e=0;e<o;e++){var s=e/A,f=w(i+=58*Math.pow(.6,s/.2)/A)*Math.exp(-s/.12)*Math.min(1,s/.003),d=(Math.sin(2*Math.PI*100*s)+.35*Math.sin(2*Math.PI*300*s))*Math.exp(-s/.3)*Math.min(1,s/.03),f=(n+=.3*(c()-n),(.9*f+.25*d+(s<.012?n*(1-s/.012)*.8:0))*t.v);r[a+e]+=f,l[a+e]+=f}},x.hum=(t,e)=>{var a=F(t,e),o=Math.min(Math.round(t.d*A),e.N-a),[r,l]=I(e,"pre");for(let e=0;e<o;e++){var c=e/A,c=(.6*Math.sin(2*Math.PI*50*c)+.3*Math.sin(2*Math.PI*100*c)+.15*Math.sin(2*Math.PI*150*c)+.05*Math.sin(2*Math.PI*15734*c))*t.v*Math.min(1,c/.3,(t.d-c)/.3);r[a+e]+=c,l[a+e]+=c}},"undefined"==typeof window&&"undefined"!=typeof self&&(self.onmessage=e=>{e=p(e.data);self.postMessage(e,[e.L.buffer,e.R.buffer])}),{renderSegment:p,SVF:S,SR:A}};{let J=re.audio={},E=44100,Z=(J.BPM=120,J.BEAT=.5,J.BAR=2,(e,t=0)=>2*e+.5*t),ee=e=>440*Math.pow(2,(e-69)/12),te=(J.sync={kick:[],snare:[],hat:[],heart:[],ping:[],hit:[],lead:[],agi:[],type:[]},{Am:[57,60,64,71],F:[53,57,60,67],C:[55,60,64,67],G:[55,59,62,69],E:[56,59,64,68],Dm:[57,62,65,69]}),ae={Am:33,F:29,C:36,G:31,E:28,Dm:38},oe=[[0,76,1.5],[1.5,74,.5],[2,72,1],[3,71,1],[4,72,1],[5,69,3],[8,69,.5],[8.5,72,.5],[9,77,1.5],[10.5,76,.5],[11,74,1],[12,72,2],[14,69,1],[15,72,1],[16,79,1.5],[17.5,76,.5],[18,74,1],[19,72,1],[20,74,1],[21,76,1],[22,67,2],[24,71,1.5],[25.5,72,.5],[26,74,1],[27,79,1],[28,76,4]];function p(){let v=re.rng(2026),c=J.sync;for(var D in c)c[D].length=0;c.fire=[];let o=[],r=[],O=1,s=(e,t,a={})=>{o.push({i:e,t:t,seed:O++,...a})},p=(e,t=1,a=!0)=>{s("kick",e,{v:t}),c.kick.push(e),a&&r.push(e)},h=(e,t=1,a=.25)=>{s("snare",e,{v:t,rv:a}),c.snare.push(e)},l=(e,t=1)=>{s("clap",e,{v:t}),c.snare.push(e)},m=(e,t=.5,a=!1,o=0)=>{s("hat",e,{v:t,open:a,pan:o}),c.hat.push(e)},i=(e,t,a,o=.45)=>s("sub",e,{m:t,d:a,v:o}),x=(e,t,a,o=.3,r=700,l=3,c=!1)=>s("bass",e,{m:t,d:a,v:o,cut:r,q:l,tri:c}),n=(e,t,a,o=.1,r=1,l=.9,c=1.8)=>s("pad",e,{n:t,d:a,v:o,b:r,att:l,rel:c}),f=(e,t,a=.1,o=.22,r=1,l=.25)=>s("pluck",e,{m:t,v:a,d:o,b:r,dl:l}),g=(e,t,a=1.5,o=.1,r=3.5,l=3,c=.3,i=.4,n="lead")=>s("bell",e,{m:t,d:a,v:o,r:r,x:l,dl:c,rv:i,bus:n}),d=(e,t,a,o=.12,r=null,l=0)=>{s("hlead",e,{m:t,d:a,v:o,p:r,s:l}),c.lead.push(e)},u=(e,t,a,o=.09)=>{s("sslead",e,{m:t,d:a,v:o}),g(e,t+12,a+.6,.35*o,2,1.6,.25,.3),c.agi.push(e)},b=(e,t,a,o=.05)=>s("choir",e,{n:t,d:a,v:o}),t=(e,t,a=.25)=>s("riser",e,{d:t,v:a}),e=(e,t,a=.3)=>s("reverse",e,{d:t,v:a}),a=(e,t=1)=>{s("impact",e,{v:t}),c.hit.push(e)},y=(e,t,a,o,r,l,c=.3)=>s("tone",e,{f:t,d:a,v:o,att:r,rel:l,rv:c}),M=(e,t,a,o=.05,r={})=>s("chip",e,{m:t,d:a,v:o,...r}),w=(e,t,a=.25)=>{s("chipdrum",e,{k:t,v:a}),"k"===t&&c.kick.push(e),"s"===t&&c.snare.push(e)},P=(t,a,o=16,r=.025,e=1)=>{var l=re.rng(e),c=[1760,2093,2349,2637,3136,3520,4186];for(let e=0;e<a*o;e++).55<l()||s("blip",t+e/o,{f:c[Math.floor(l()*c.length)],v:r,sq:l()<.5,pan:1.6*l()-.8})};var T,E=(e,t,a,o,r=1)=>{let l=null;for(var[c,i,n]of oe)t<=c&&c<a&&(o(e+.5*(c-t)*r,i,.5*n*r,l),l=i)},k=(t,a,o)=>{for(let e=t;e<a;e++)o(e,e-t)};let A=["Am","F","C","G"],R=[0,1,2,3,2,1,2,3,0,2,1,3,2,1,3,2],z=(t,a=1,o=!0,e=!1)=>{for(let e=0;e<4;e++)p(Z(t,e),a),o&&e%2==1&&l(Z(t,e),.85*a),m(Z(t,e+.5),.5*a,!1,.2);if(e)for(let e=0;e<16;e+=2)m(Z(t,e/4+.25),.22*a,!1,-.3)},q=(t,e,a)=>{var o,r,l,c,i=ae[e];for(o of[0,6,10]){var n=Z(t,o/4)+a();p(n,.85),x(n,i+12,.35,.2,380,1,!0)}for(r of[4,12])h(Z(t,r/4)+a(),.75,.3);for(let e=0;e<8;e++)m(Z(t,e/2)+(e%2?.07:0)+a(),e%2?.3:.45,7===e,.25);for([l,c]of[[0,1.3],[7,.6],[10,1.4]]){u=void 0;var s=Z(t,l/4)+a();var f=te[e];var d=c;for(var u of f)g(s+.012*v(),u,d,.05,1,1.4,.05,.2,"pump")}},S=()=>.02*(v()-.5);for(T of re.c64Keys())s("click",T.t,{v:T.enter?.09:.06}),c.type.push(T.t);var L,N,B,C=re.script.c64.on,_=(s("power",C,{v:.075}),s("hum",C,{d:16-C,v:.018}),[["Am",33,[0,3,7]],["F",29,[0,4,7]],["C",36,[0,4,7]],["G",31,[0,4,7]]]);for(let e=0;e<10;e++){var[,G,U]=_[Math.floor(e/2)%4],j=9+2*e/2,H=e<7?1:1-.28*(e-6);if(M(j,G+36,.98,.05*H,{arp:U,pwm:.5,rv:.1+(7<=e?.3:0)}),e<7)for(let e=0;e<4;e++)M(j+.5*e/2*2,G+12+e%2*12,.225,.09,{w:"pulse",pwm:1.3})}for(let e=0;e<12;e++){var Y=9+.5*e;w(Y,e%2?"s":"k",.42),w(.25+Y,"h",.2)}for(let e=0;e<8;e++)w(15+e/8,"s",.2+.04*e);E(9,0,16,(e,t,a)=>M(e,t,.95*a,.11,{vib:.25,pwm:.9,dl:.2,rv:15.5<e?.4:0})),t(12.5,3.5,.18),e(14.8,1.2,.3),a(16,1.1),k(8,16,(t,a)=>{var o=A[Math.floor(a/2)%4],r=ae[o];a%2==0&&(n(Z(t),te[o].map(e=>e-12).concat(te[o]),4,.08,.7,a?.4:2,1.5),b(Z(t),te[o].map(e=>e+12),3.8,.035));for(let e=0;e<16;e++)f(Z(t,e/4),te[o][R[e]]+12,.045+.005*a,.2,.25+.08*a,.35);for(let e=0;e<8;e++)x(Z(t,e/2),r+12,.2,.13+.01*a,280+70*a,2);if(4<=a)for(var e of a<6?[0,2]:[0,1,2,3])p(Z(t,e),.5+.12*(a-4),!1);if(5<=a)for(let e=0;e<8;e++)m(Z(t,e/2+.25),.18+.05*(a-5),e%2==1,.25)}),E(16,0,32,(e,t,a)=>u(e,t,a,.045)),t(28,4,.22),e(30.6,1.4,.3),n(32,te.Am,8,.06,.5,1,2),n(40,te.F,8,.06,.6,1,2),E(32,0,8,(e,t,a)=>g(e,t,a+.6,.055,2,1.3,.4,.45),2),k(16,20,(t,a)=>{for(let e=0;e<8;e++)(e%2||2<=a)&&f(Z(t,e/2+.25),[64,67,69,72][(e+a)%4],.03+.006*a,.18,.3,.3);if(2<=a)for(let e=0;e<16;e++)m(Z(t,e/4),e%4==2?.22:.08,!1,.2)});for(let e=0;e<32;e++){var F=32+.5*e;c.fire.push(F),g(F,e%4==3?81:76,.4,.05,1,3,.25,.2),i(F,33,.12,.3)}k(20,24,(t,a)=>{for(let e=0;e<4;e++)p(Z(t,e),.6+.08*a),m(Z(t,e+.5),.35),x(Z(t,e+.5),45,.2,.18,500,2);if(2<=a)for(let e=0;e<8;e++)g(Z(t,e/2),88-e,.25,.025,3.5,2,.3,.1)}),t(46,2,.2),k(24,32,(t,a)=>{var o=A[a%4],r=ae[o];z(t,.95,26<=t,28<=t);for(let e=0;e<4;e++)x(Z(t,e+.5),r+12,.21,.24,500+60*a,2.5);for(let e=0;e<16;e++)f(Z(t,e/4),te[o][R[e]]+12,.07,.2,.2+.09*a,28<=t?.45:.2);n(Z(t),te[o],2,.05,.8,.3,1)});for(L of re.script.convAnswers){var $=Math.floor(L/2),V=Math.round((L-2*$)/.25);g(L,te[A[($-24)%4]][V%4]+24,.5,.04,2,1.4,.6,.3)}t(62,2,.25),k(32,36,(t,e)=>{var a=["Am","Am","F","E"][e];p(Z(t,0),1),p(Z(t,2.5),.8),h(Z(t,2),.9,.35);for(let e=0;e<8;e++)m(Z(t,e/2),e%2?.25:.4);i(Z(t),ae[a],1.9,.22),n(Z(t),te[a],2,.06,.5,.2,1);for(let e=0;e<8;e++)x(Z(t,e/2),ae[a]+12+[0,0,12,0,7,0,12,10][e],.175,.16,500+40*e,5)}),[[32,[[0,76,1],[1,72,.5],[1.5,74,.5],[2,76,1.5],[3.5,79,.5]]],[33,[[0,77,1],[1,76,1],[2,74,1],[3,72,1]]],[34,[[0,72,1.5],[1.5,74,.5],[2,76,1],[3,77,1]]],[35,[[0,76,1],[1,71,1],[2,68,2]]]].forEach(([e,t])=>{let a=null;for(var[o,r,l]of t)d(Z(e,o),r,.5*l,.085,a),a=r});{let e=re.script.svm;e.tries.forEach((e,t)=>P(e,.14,48,.02,400+t)),t(e.lift[0],e.lift[1]-e.lift[0]+.25,.16),g(e.plane,81,1.6,.07,2,2,.4,.4);for(var[X,K]of[[76,.09],[80,.05],[83,.045]])g(e.circle,X,2.4,K,2,2,.5,.5)}k(36,44,(e,t)=>{var a=A[Math.floor(t/2)%4];q(e,a,S),t%2==0&&n(Z(e),te[a],4,.05,.6,1,1.5)}),E(72,0,32,(e,t,a,o)=>d(e+S(),t,a,.12,o));for(let e=0;e<16;e++)g(76+.25*e,[81,84,88,91][e%4]+e%3*2,.8,.03,3.5,3,.6,.4);for(let e=0;e<6;e++)p(Z(43,2+e/6),.5,!1);k(44,48,(e,t)=>{t=A[t];q(e,t,S),n(Z(e),te[t],2,.05,.6,.5,1)});{let t=re.script.go;for(let e=0;e<36;e++)s("click",t.move0+e*t.dt,{v:.05});g(t.land,74,3,.1,2,2,.5,.6),b(t.land+.2,[55,62,67,71],3.5,.04)}n(96,te.Am,4,.16,.6,1.5,2),n(100,te.F,4,.16,.6,1,2),i(96,33,4,.12),i(100,29,4,.12),k(48,52,(t,a)=>{var o=a<2?"Am":"F";for(let e=0;e<8;e++)x(Z(t,e/2),ae[o]+12,.15,.1+.02*a,350+100*a,2);for(let e=0;e<16;e++)f(Z(t,e/4),te[o][R[e]]+24,.02+.006*a,.15,.4,.35);p(Z(t),.45+.1*a,!1),2<=a&&p(Z(t,2),.5,!1)});{let o=re.script.attention;o.cands.forEach((e,t)=>{var a=o.step0+(t+o.land)*o.dt;g(a,[69,72,74,76,79,81,84,88][t],.9,.11,2,1.5,.5,.4),m(a,.2,!1,v()-.5)})}t(102,2,.25),k(52,56,(t,a)=>{var o=A[a],e=ae[o];n(Z(t),te[o],2,.07,.7,.6,1.5),p(Z(t,0),.7),p(Z(t,2.5),.5),h(Z(t,2),.5,.4);for(let e=0;e<8;e++)m(Z(t,e/2),e%2?.2:.3,!1,.3);for(let e=0;e<16;e++)f(Z(t,e/4),te[o][Math.round(1.5+1.5*Math.sin(.8*e+a))]+12+(e%8<4?0:12),.05,.22,.25+.15*a,.3);i(Z(t),e,1.9,.2)});for(N of[69,76,81,84])g(110.5,N,2.5,.05,2,1.4,.4,.5);t(110,2,.22);{let c=["Am","Am","F","F","C","C","G","E"];k(60,68,(t,e)=>{var a=c[e],o=ae[a];z(t,1,62<=t,!0);for(let e=0;e<16;e++){var r=Z(t,e/4),l=[0,12,0,0,12,0,0,12][e%8];e%4!=0&&x(r,o+12+l,.1,.2,380+900*Math.pow(.5+.5*Math.sin(.22*(16*t+e)),2),9),g(r,te[a][R[3*e%16]]+24,.35,.035,3.5,1.8+e%4*.4,.2,.15)}e%2==0&&n(Z(t),te[a],4,.05,1,.3,1)}),re.script.log.forEach(([e])=>{var t=Math.floor(e/2),a=Math.round((e-2*t)/.5);g(e,te[c[t-60]][a]+(t<62?12:24),.4,.05,2,1.2,.3,.2)});var I=re.script.selfLog;for(let e=0,t=I.from;t<=I.to;e++,t=I.from+.5*e)P(t,.3,40,.02,100+e)}y(136.6,ee(33),7.4,.1,1.2,1,.3),y(136.6,1.004*ee(45),7.4,.05,2,1,.3),k(68,72,(t,a)=>{var e=["Am","Am","F","G"][a],o=ae[e];69<=t&&z(t,.9+.04*a,!0,70<=t);for(let e=0;e<16;e++)e%4!=0&&x(Z(t,e/4),o+12+(e%3==0?12:0),.1,.2,400+350*a+20*e,11);n(Z(t),te[e],2,.05,.9,.3,1)}),t(142,2,.25),n(112,te.Am,4,.08,.7,1,2),n(116,te.F,4,.08,.7,1,2),k(56,60,(t,a)=>{p(Z(t,0),.8),p(Z(t,2.5),.6),h(Z(t,2),.6,.4);for(let e=0;e<24;e++)f(Z(t,e/6),te[a<2?"Am":"F"][e%4]+12+(e%8<4?0:12),.06,.25,.3+.2*Math.sin(.5*e),.35);for(let e=0;e<16;e++)m(Z(t,e/4),e%2?.1:.2,14===e,.3);for(let e=0;e<8;e++)x(Z(t,e/2),ae[a<2?"Am":"F"]+12+(e%4==3?12:0),.175,.17,600,3)}),E(112,0,16,(e,t,a,o)=>d(e,t,a,.09,o)),k(72,80,(t,a)=>{var e=["Am","Am","F","F","C","C","G","G"][a],o=ae[e];z(t,1,!0,!0);for(let e=0;e<16;e++)e%4!=0&&x(Z(t,e/4),o+12+(e%3==0?12:0),.1,.2,300+150*a,10);a%2==0&&n(Z(t),te[e],4,.05,.9,.3,1),76<=t&&a%2==0&&b(Z(t),te[e].map(e=>e+12),3.8,.04)}),E(152,16,32,(e,t,a)=>g(e,t+12,a+.8,.06,2,1.4,.4,.5)),t(152,8,.3);for(let e=0;e<16;e++)h(Z(79,e/4),.2+.05*e,.15);a(160,1),k(80,92,(t,e)=>{var a=t<84?A[(t-80)%4]:A[Math.floor((t-84)/2)%4],o=ae[a];for(let e=0;e<4;e++)p(Z(t,e),1.05),e%2&&l(Z(t,e),.9),m(Z(t,e+.5),.45,!0,.3),x(Z(t,e+.5),o+12,.2,.26,700,3);for(let e=0;e<16;e++)m(Z(t,e/4),.2,!1,-.35),f(Z(t,e/4),te[a][R[e]]+12,.05,.18,.7,.2);(t<84||(t-84)%2==0)&&n(Z(t),te[a],2*(t<84?1:2),.07,1.2,.2,.8)}),E(168,0,16,(e,t,a)=>u(e,t,a,.085)),n(184,[45,52,57,60,64],4,.08,.5,.5,2),b(184,[57,64,69],4,.05),s("down",184,{d:4,v:.3}),e(186.4,1.6,.35),a(188,1),y(188,ee(33),12,.12,3,.5,.2),n(188,[45,52,60,64],6,.07,.35,2,2),n(194,[44,52,59,64],6,.07,.4,1,1),E(188,0,8,(e,t,a,o)=>d(e,t-12,a,.08,o,.5),1.5);for(let e=0;e<24;e++)f(194+e/4,[56,59,64,68][e%4]+12+12*Math.floor(e/8),.03+.002*e,.2,.3+.03*e,.4);for(let e=0;e<12;e++)i(188+e,33,.25,.18);t(194,6,.35),e(198.6,1.4,.4),a(200,1.1),k(100,108,(t,e)=>{var a=A[Math.floor(e/2)%4],o=ae[a];for(let e=0;e<4;e++)p(Z(t,e),1.05),e%2&&l(Z(t,e),.9),m(Z(t,e+.5),.45,!0,.3),x(Z(t,e+.5),o+12,.2,.26,800,3);for(let e=0;e<16;e++)m(Z(t,e/4),.2,!1,-.35),e%2==0&&g(Z(t,e/4),te[a][R[(e+5)%16]]+24,.25,.025,3.5,2,.25,.1);e%2==0&&(n(Z(t),te[a],4,.07,1.2,.2,.8),b(Z(t),te[a].map(e=>e+12),3.7,.05))}),E(200,0,32,(e,t,a)=>{u(e,t+12,a,.07),u(e,t,a,.05)}),k(108,111,(t,a)=>{var e=["F","G","Am"][a],o=ae[e],r=2===a;if(n(Z(t),te[e],r?6:2,.08,1.1,.2,r?3:.8),b(Z(t),te[e].map(e=>e+12),r?6:1.8,.055),i(Z(t),o,r?5:1.9,.3),r)p(Z(t),.9,!1);else for(let e=0;e<4;e++)p(Z(t,e),1-.2*a),e%2&&l(Z(t,e),.8-.2*a),m(Z(t,e+.5),.35,!0,.3)}),u(216,77,1.8,.07),u(218,79,1.8,.07),u(220,81,5.2,.075),u(220,69,5.2,.05),s("hum",222,{d:20,v:.012});for(let e=0;e<12;e++){var W=e<8?"Am":e<10?"F":"G",Q=222+.5*e;M(Q,ae[W]+36,.48,.02+.006*e,{arp:"Am"==W?[0,3,7]:[0,4,7],pwm:.2+.06*e,rv:.3})}for(let e=0;e<8;e++)w(224+.5*e,"h",.08+.015*e);for(let e=0;e<8;e++)M(226+.25*e,[45,57,45,57,43,55,43,55][e],.22,.07,{w:"pulse",pwm:1.2});for(let e=0;e<8;e++)w(227+e/8,"s",.16+.03*e);["Am","Am","F","F","G"].forEach((e,t)=>{var a=ae[e],o=228+2*t;M(o,a+36,1.98,.05,{arp:"Am"===e?[0,3,7]:[0,4,7],pwm:.5});for(let e=0;e<8;e++)M(o+.5*e/2,a+12+e%2*12,.225,.1,{w:"pulse",pwm:1.3});for(let e=0;e<4;e++)w(o+.5*e,e%2?"s":"k",.46),w(o+.5*e+.25,"h",.22)}),E(228,0,16,(e,t,a)=>M(e,t,.92*a,.14,{vib:.25,pwm:.9,dl:.2})),M(236,74,.45,.1,{vib:.2,pwm:.9}),M(236.5,76,.45,.1,{vib:.2,pwm:.9}),M(237,79,.95,.11,{vib:.3,pwm:.9,dl:.2});for(let e=0;e<18;e++)M(238+.125*e,57+[0,4,7,12][e%4]+5*Math.floor(e/4),.12,.05+.003*e,{w:"pulse",pwm:.8});for(let e=0;e<16;e++)w(238.25+.125*e,e%4==0?"k":"s",.2+.02*e);for(B in a(240.25,1),n(240.25,[45,52,57,60,64,71],1.6,.1,.8,.02,1.2),i(240.25,33,1.4,.4),c)c[B].sort((e,t)=>e-t);return o.sort((e,t)=>e.t-t.t),r.sort((e,t)=>e-t),{ev:o,ducks:r}}J.render=async(l,e=!1)=>{var{ev:a,ducks:o}=p();if(e)return null;let r=re.script.END,c=Math.ceil((r+1)*E),g=new Float32Array(c),b=new Float32Array(c),i=[];for(let t=0,e=0;t<r;t+=4,e++){var n=a.filter(e=>e.t>=t&&e.t<t+4);n.length&&i.push({id:e,start:t,events:n,tail:5,warp:null,ducks:o.filter(e=>e>t-1&&e<t+4+25)})}let s=t=>{var a=t.start,o=Math.min(t.L.length,c-a);for(let e=0;e<o;e++)g[a+e]+=t.L[e],b[a+e]+=t.R[e]},f=(a=>{try{let e="("+re.synthCore.toString()+")();",t=URL.createObjectURL(new Blob([e],{type:"text/javascript"}));return Array.from({length:a},()=>new Worker(t))}catch(e){return console.warn("workers unavailable, rendering on the main thread",e),[]}})(Math.max(1,Math.min(8,(navigator.hardwareConcurrency||4)-1))),d=0,t=performance.now();if(f.length)await new Promise((a,o)=>{let t=0,r=e=>{t<i.length&&e.postMessage(i[t++])};for(let t of f)t.onmessage=e=>{s(e.data),d++,l&&l(d/(i.length+1)),d===i.length?a():r(t)},t.onerror=e=>o(e),r(t)}),f.forEach(e=>e.terminate());else{var u,v=re.synthCore();for(u of i)s(v.renderSegment(u)),d++,l&&l(d/(i.length+1)),await new Promise(e=>setTimeout(e,0))}{let t=g,a=b,o=t.length,r=(re.synthCore(),e=>Math.min(o,Math.max(0,Math.round(e*E)))),l=0,c=r(168),i=r(184);for(let e=c;e<i;e++)l+=t[e]*t[e]+a[e]*a[e];let n=Math.pow(10,-.75)/Math.sqrt(l/(2*(i-c))+1e-12),s=Math.exp(-1/264.6),f=Math.exp(-1/8820),d=Math.exp(-1/35.28),u=Math.exp(-1/3528),v=Math.pow(10,-.6),p=Math.pow(10,-.06),h=Math.pow(10,.15),m=0,x=0;for(let e=0;e<o;e++){var y=t[e]*n,M=a[e]*n,w=Math.max(Math.abs(y),Math.abs(M)),w=(m=w>m?s*m+(1-s)*w:f*m+(1-f)*w)>v?Math.pow(m/v,1/3.5-1):1,w=(y*=w*h,M*=w*h,Math.max(Math.abs(y),Math.abs(M))),w=(x=w>x?d*x+(1-d)*w:u*x+(1-u)*w)>p?p/x:1;y*=w,M*=w,t[e]=.9<y?.9+.045*Math.tanh(22*(y-.9)):y<-.9?-.9-.045*Math.tanh(22*(-y-.9)):y,a[e]=.9<M?.9+.045*Math.tanh(22*(M-.9)):M<-.9?-.9-.045*Math.tanh(22*(-M-.9)):M}var P=(e,t,a)=>{a=Math.min(1,Math.max(0,(a-e)/(t-e)));return a*a*(3-2*a)};for(let e=r(9);e<r(16);e++){var T=e/E,T=T<15?.12+.48*P(9,13,T):.6+.4*P(15,16,T);t[e]*=T,a[e]*=T}}e=new AudioBuffer({length:c,numberOfChannels:2,sampleRate:E});return e.copyToChannel(g,0),e.copyToChannel(b,1),J.buffer=e,J.renderMs=performance.now()-t,l&&l(1),e};let a=null,o=null,r=0,e=0,l=!1,c=null;function i(t,a,o){if(!a)return t;if(t<=a[0])return o[0]+(t-a[0])*(o[1]-o[0])/(a[1]-a[0]);for(let e=1;e<a.length;e++)if(t<=a[e])return o[e-1]+(t-a[e-1])*(o[e]-o[e-1])/(a[e]-a[e-1]);var e=a.length-1;return o[e]+(t-a[e])*(o[e]-o[e-1])/(a[e]-a[e-1])}J.ctx=()=>a,J.play=(e=0)=>{if(a||(a=new(window.AudioContext||window.webkitAudioContext),(c=a.createGain()).connect(a.destination)),a.resume(),o){try{o.stop()}catch(e){}o.disconnect()}var t=J.userBuffer||J.buffer;t&&((o=a.createBufferSource()).buffer=t,o.connect(c),t=Math.max(0,J.toAudioTime(e)),o.start(0,t),r=a.currentTime-t,l=!0)},J.pause=()=>{if(l){if(e=J.time(),o)try{o.stop()}catch(e){}l=!1}},J.resume=()=>{l||J.play(e)},J.close=()=>{J.pause(),a&&(a.close(),a=null)},J.playing=()=>l,J.audioTime=()=>{var e,t;return a?(e=a.getOutputTimestamp?a.getOutputTimestamp():null,t=a.currentTime,(t=e&&0<e.contextTime?e.contextTime+(performance.now()-e.performanceTime)/1e3:t)-r):0},J.time=()=>l?J.toDemoTime(J.audioTime()):e,J.toAudioTime=e=>i(e,J.map&&J.map.demo,J.map&&J.map.audio),J.toDemoTime=e=>i(e,J.map&&J.map.audio,J.map&&J.map.demo),J.SECTIONS=[0,16,120,160,200,228,242],J.loadUserTrack=async(e,t)=>{let l=await new OfflineAudioContext(2,1,E).decodeAudioData(e),a=(J.userBuffer=l).duration,o=(t&&t.length===J.SECTIONS.length?J.map={demo:J.SECTIONS.slice(),audio:t.slice()}:J.map={demo:[0,re.script.END],audio:[0,a]},async(e,t)=>{var a=new OfflineAudioContext(1,Math.ceil(11025*l.duration),11025),o=a.createBufferSource(),r=(o.buffer=l,a.createBiquadFilter());return r.type=e,r.frequency.value=t,r.Q.value=.8,o.connect(r).connect(a.destination),o.start(),(await a.startRendering()).getChannelData(0)}),r=(o,r,e)=>{var t=Math.floor(o.length/r),l=new Float32Array(t);for(let a=0;a<t;a++){let t=0;for(let e=0;e<r;e++){var c=o[a*r+e];t+=c*c}l[a]=Math.sqrt(t/r)}let i=[],n=-1;for(let a=8;a<t-1;a++){let t=0;for(let e=a-8;e<a;e++)t+=l[e];t/=8,0<l[a]-l[a-1]&&l[a]>t*e&&l[a]>=l[a+1]&&.02<l[a]&&4<a-n&&(i.push(a*r/11025),n=a)}return i},c=await o("lowpass",140),i=await o("bandpass",2200),n=r(c,110,1.45).map(J.toDemoTime),s=r(i,110,1.6).map(J.toDemoTime);return Object.assign(J.sync,{kick:n,snare:s,hat:[],heart:n,hit:[]}),{duration:a,kicks:n.length}},J.wav=()=>{let e=J.buffer,a=e.length,o=new DataView(new ArrayBuffer(44+2*a*2)),t=(t,a)=>{for(let e=0;e<a.length;e++)o.setUint8(t+e,a.charCodeAt(e))},r=(t(0,"RIFF"),o.setUint32(4,36+2*a*2,!0),t(8,"WAVE"),t(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,2,!0),o.setUint32(24,e.sampleRate,!0),o.setUint32(28,2*e.sampleRate*2,!0),o.setUint16(32,4,!0),o.setUint16(34,16,!0),t(36,"data"),o.setUint32(40,2*a*2,!0),e.getChannelData(0)),l=e.getChannelData(1);for(let e=0,t=44;e<a;e++,t+=4)o.setInt16(t,32767*Math.max(-1,Math.min(1,r[e])),!0),o.setInt16(t+2,32767*Math.max(-1,Math.min(1,l[e])),!0);return new Uint8Array(o.buffer)}}{let a=re.text={},I='"JetBrains Mono","IBM Plex Mono","Fira Mono","DejaVu Sans Mono",Menlo,Consolas,monospace',S='"Arial Black","Helvetica Neue",Helvetica,Arial,sans-serif',D={sys:"#9ff0cf",agi:"#86e8ff",think:"rgba(134,232,255,0.5)",dim:"rgba(200,225,255,0.6)"},L={sys:38,agi:26,think:30},C={sys:"> ",agi:"ai> ",think:"ai> "},c="01<>/\\[]{}#$%&*+=?ABCDEFGHJKLMNPQRSTUVWXYZ",O=()=>re.script,o,N,B=0,_=0,F="",G=(a.canvas=()=>o,a.init=()=>{o=document.createElement("canvas"),N=o.getContext("2d"),(w=document.createElement("canvas")).width=320,w.height=200,P=w.getContext("2d",{willReadFrequently:!0})},a.resize=(e,t)=>{var a=Math.min(1,1080/t);B=o.width=Math.round(e*a),_=o.height=Math.round(t*a),F=""},e=>{e=43758.5453*Math.sin(127.1*e+311.7);return e-Math.floor(e)}),U=(t,a,o)=>{if(1<=a)return t;let r="";for(let e=0;e<t.length;e++){var l=e/t.length;" "===t[e]||.25+l<a?r+=t[e]:r+=l-.2<a?c[Math.floor(G(o+13*e+Math.floor(40*a))*c.length)]:" "}return r},j=(t,a,o)=>{let r="";for(let e=0;e<t.length;e++){var l=.7*G(o+7.31*e);" "===t[e]||.3+l<a?r+=t[e]:r+=l<a?c[Math.floor(G(o+13*e+Math.floor(30*a))*c.length)]:" "}return r},H=(e,t,a)=>{var o=N.createLinearGradient(0,e-t/2,0,e+t/2);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(.5,"rgba(0,0,0,0.55)"),o.addColorStop(1,"rgba(0,0,0,0)"),N.save(),N.globalAlpha=a,N.fillStyle=o,N.fillRect(0,e-t/2,B,t),N.restore()},Y=(e,t,a,o=.4,r=.6)=>Math.min(re.smooth(t,t+o,e),1-re.smooth(a-r,a,e)),$=(e,t)=>(N.letterSpacing=t+"px",e),M={bg:"#352879",fg:"#6c5eb5"},w,P,i=null;re.c64Keys=()=>(i||(i=[],O().c64.typing.forEach(([e,t,a,o],r)=>{let l=e;for(let e=0;e<t.length;e++)i.push({t:l,line:r,i:e}),l+=(1+2*(G(97*r+e)-.5)*o)/a;i.push({t:l+.3,line:r,i:t.length,enter:!0})})),i);var s,f={A:"0e1111111f1111",B:"1e11111e11111e",C:"0e11101010110e",D:"1c12111111121c",E:"1f10101e10101f",F:"1f10101e101010",G:"0e1110171111 0f",H:"1111111f111111",I:"0e04040404040e",J:"07020202021 20c",K:"11121418141211",L:"1010101010101f",M:"111b1515111111",N:"11111915131111",O:"0e11111111110e",P:"1e11111e101010",Q:"0e111111151 20d",R:"1e11111e141211",S:"0f10100e01011e",T:"1f040404040404",U:"1111111111110e",V:"11111111110a04",W:"1111111515150a",X:"11110a040a1111",Y:"1111110a040404",Z:"1f01020408101f",0:"0e111315191 10e",1:"040c040404040e",2:"0e110102040 81f",3:"1f020402011 10e",4:"02060a121f0202",5:"1f101e0101110e",6:"060810 1e11110e",7:"1f010204080808",8:"0e11110e11110e",9:"0e11110f01020c"," ":"00000000000000","*":"0004150e150400",$:"040f140e051e04","(":"02040808080402",")":"08040202020408","+":"0004041f040400",".":"0000000000 0c0c",";":"000c0c000c0408",":":"000c0c000c0c00",",":"000000000c0408","&":"0c1214081512 0d","-":"0000001f000000","=":"00001f001f0000","'":"0c040800000000",'"':"0a0a0a00000000","?":"0e110102040004","/":"00010204081000","!":"04040404040004","%":"18190204081303",_:"0000000000001f","#":"0a0a1f0a1f0a0a"};let t={};for(s in f){let a=f[s].replace(/ /g,"");t[s]=Array.from({length:7},(e,t)=>parseInt(a.substr(2*t,2),16))}function z(e,a,o){var r=t[e]||t[e.toUpperCase()]||t["?"];for(let t=0;t<7;t++){var l=r[t];for(let e=0;e<5;e++)l&16>>e&&P.fillRect(a+1+e,o+t,2,1)}}let T=(e,t)=>{let a=0,o=!1;for(var r of re.c64Keys())r.line===e&&r.t<=t&&(r.enter?o=!0:a=r.i+1);return{n:a,ent:o}},E=(e,t)=>.5<G(1.37*e+t)?1:0,r=228,l=238,k=t=>{let a=0;for(let e=r;e<Math.min(t,l);e+=1/60)a+=(o=e,380*re.smooth(r,r+1,o)*(1-re.smooth(l-.8,l,o))/60);var o;return Math.floor(a)},n=(re.c64Screen=e=>{var a=1e3+k(e),o=Math.max(0,Math.ceil(a/40)-25),r=new Array(1e3);for(let t=0;t<25;t++)for(let e=0;e<40;e++){var l=40*(o+t)+e;r[40*t+e]=l<a?E(l,7)+1:0}return r},t=>[1,3,5].map(e=>parseInt(t.substr(e,2),16))),A=(e,t,a)=>{let o=n(e),r=n(t);return`rgb(${o.map((e,t)=>Math.round(e+(r[t]-e)*a)).join(",")})`},R=["#6c5eb5","#70a4b2","#9ad284","#ffffff","#ffffff","#9ad284","#70a4b2"];function Q(e,t,a={}){var o=a.zoom||1,r=a.glow||0,l=a.power??1,a=a.flare||0;if(l<=0)return"off";let c=(e=>{var t=O().c64;if(e<t.banner)return{lines:[],maze:0,seed:1,cursor:null};let a,o,r=t.boot.map(e=>({text:e})),l=null,c=0,i=1;return e<200?(a=T(0,e),r.push({text:t.typing[0][1].slice(0,a.n)}),l=[r.length-1,a.n],a.ent&&(o=T(1,e),r.push({text:t.typing[1][1].slice(0,o.n)}),l=[r.length-1,o.n],o.ent&&e>=t.runAt?(c=Math.floor(380*(e-t.runAt)),l=null):o.ent&&(r.push({text:""}),l=[r.length-1,0]))):(r.length=0,i=7,c=1e3+k(e)),{lines:r,maze:c,seed:i,cursor:l}})(e),i=[],n=t=>{t.length||i.push({text:""});for(let e=0;e<t.length;e+=40)i.push({text:t.slice(e,e+40)})},s=null;c.lines.forEach((e,t)=>{n(e.text),c.cursor&&c.cursor[0]===t&&(s=[i.length-1,c.cursor[1]%40+(c.cursor[1]&&c.cursor[1]%40==0?40:0)])}),s&&40<=s[1]&&(i.push({text:""}),s=[i.length-1,0]);var f=Math.ceil(c.maze/40);for(let e=0;e<f;e++)i.push({maze:e});if(c.tail){for(var d of c.tail)n(d);var u=i[i.length-1].text||"";s=[i.length-1,u.length]}var v=Math.max(0,i.length-25),u=Math.floor(1.9*e)%2==0;P.clearRect(0,0,320,200),P.fillStyle=0<r?A("#6c5eb5","#f4eeff",r):"#6c5eb5";for(let a=0;a<25;a++){var p=i[a+v];if(p)if(void 0!==p.text)for(let e=0;e<p.text.length&&e<40;e++)z(p.text[e],8*e,8*a);else for(let t=0;t<40;t++){var h=40*p.maze+t;if(h>=c.maze)break;var m=E(h,c.seed);for(let e=0;e<8;e++)P.fillRect(8*t+(m?e:7-e)-.5,8*a+e,2,1)}}s&&u&&0<=(x=s[0]-v)&&x<25&&P.fillRect(8*Math.min(s[1],39),8*x,8,8);var x=(l=>{let e=O().c64.coda,t=O().c64.credits;if(l<e.creditsAt||l>=e.creditsTo)return 0;var a=t.length+2,o=Math.min(1,(l-e.creditsAt)/.25),o=Math.round(304*o/2);P.fillStyle=M.bg,P.fillRect(160-o,48,2*o,8*a),P.fillStyle="#70a4b2",P.fillRect(160-o+2,50,2*o-4,1),P.fillRect(160-o+2,8*(6+a)-3,2*o-4,1),P.fillRect(160-o+2,50,1,8*a-4),P.fillRect(160+o-3,50,1,8*a-4);let c=0;return t.forEach((t,a)=>{var o=Math.max(0,Math.min(t.length,Math.floor(70*(l-e.creditsAt-.3-.2*a)))),r=2+Math.floor((36-t.length)/2);for(let e=0;e<o;e++)P.fillStyle=R[((e+3*a-Math.floor(14*l))%R.length+R.length)%R.length],z(t[e],8*(r+e),8*(7+a));c+=o}),100*c+Math.floor(14*l)%R.length})(e),e=(N.save(),N.translate(B/2,_/2),N.scale(1,Math.max(.006,re.easeOut(l))),N.translate(-B/2,-_/2),N.globalAlpha=t,N.fillStyle=0<r?A(M.fg,"#07050f",r):M.fg,N.fillRect(0,0,B,_),N.save(),N.translate(B/2,_/2),N.scale(o,o),N.translate(-B/2,-_/2),.78*_),g=1.6*e,b=(B-g)/2,y=(_-e)/2;return N.fillStyle=0<r?A(M.bg,"#07050f",r):M.bg,N.fillRect(b,y,g,e),N.imageSmoothingEnabled=!1,N.drawImage(w,b,y,g,e),N.imageSmoothingEnabled=!0,N.restore(),0<a&&(N.globalCompositeOperation="lighter",N.fillStyle=`rgba(215,222,255,${a.toFixed(3)})`,N.fillRect(0,0,B,_),N.globalCompositeOperation="source-over"),N.restore(),N.globalAlpha=1,l.toFixed(3)+":"+a.toFixed(3)+":"+c.maze+":"+v+":"+(u?1:0)+":"+i.length+":"+(s?s.join(","):"")+":"+i.slice(-3).map(e=>e.text||"").join("|")+t.toFixed(2)+":"+o.toFixed(3)+":"+r.toFixed(2)+":"+x}let V={donut:"#ff4fa0","sports ball":"#ffb03f",cup:"#3fe0ff",apple:"#ff5a5a",orange:"#ffd23f",clock:"#9aff6a",bottle:"#7d9dff"},X={donut:"frisbee","sports ball":"orange",cup:"vase",apple:"orange",orange:"sports ball",clock:"frisbee",bottle:"vase"},K=[.97,.99,.93,.96,.91,.98,.88],W=["#3fe0ff","#ff4fc8","#ffd23f","#7dff6a"];a.draw=(v,e)=>{let t={dirty:!1},r=[],a=O(),b=_/100;var o,l,c,i,n,s,f,d,u,p,h=a.c64.on;v<17.5&&r.push("c64"+Q(v,1-re.smooth(16,17.4,v),{zoom:1+2.6*re.easeIn(re.smooth(13.6,16.9,v)),glow:re.smooth(14,16.2,v),power:re.clamp((v-h)/.22,0,1),flare:v<h?0:1-re.smooth(h,h+.7,v)})),227.1<=v&&v<238.4&&r.push("c64"+Q(v,re.smooth(227.1,227.95,v)*(1-re.smooth(238,238.3,v)))),64<v&&v<72&&r.push("sv"+(h=v,k=O().svm,q=Y(h,k.lift[0],k.circle+.6,.3,.6),R=_/100,q<=0?"":(h=Math.min(k.formula.length,Math.floor(30*(h-k.lift[0]))),N.save(),N.globalAlpha=q,N.textAlign="center",N.font=3*R+"px "+I,N.fillStyle="#e6f2ff",N.shadowColor="rgba(0,0,0,0.85)",N.shadowBlur=1.2*R,N.fillText(k.formula.slice(0,h),B/2,88*R),N.restore(),h+":"+q.toFixed(2)))),80<v&&v<88&&r.push("y"+((e,t)=>{var o=Y(e,80.3,87.9,.3,.6);if(o<=0||!t.cam)return"";let f=t.cam,d=t.aspect,r=_/100,l=re.shaders.yoloObjs.map((e,t)=>{let a=9,o=9,r=-9,l=-9;for(var c of[-1,1])for(var i of[-1,1])for(var n of[-1,1]){n=re.project(f,[e.c[0]+c*e.e[0],e.c[1]+i*e.e[1],e.c[2]+n*e.e[2]],d);a=Math.min(a,n[0]),r=Math.max(r,n[0]),o=Math.min(o,n[1]),l=Math.max(l,n[1])}var s=re.project(f,e.c,d);return{...e,i:t,X:a*B,Y:(1-l)*_,BW:(r-a)*B,BH:(l-o)*_,cx:s[0],cy:1-s[1]}}),a=Y(e,80.4,83.8,.3,.6),c=Y(e,81.3,84.3,.3,.6),i=re.smooth(83,84,e),n=re.smooth(83.5,84,e);if(N.save(),N.globalAlpha=o,0<a){N.strokeStyle=`rgba(63,224,255,${.3*a})`;for(let e=N.lineWidth=1;e<7;e++)N.beginPath(),N.moveTo(B*e/7,0),N.lineTo(B*e/7,_),N.moveTo(0,_*e/7),N.lineTo(B,_*e/7),N.stroke();for(var s of l){var u=Math.floor(7*s.cx),v=Math.floor(7*s.cy);N.fillStyle=V[s.cls]+"26",N.globalAlpha=o*a,N.fillRect(u*B/7,v*_/7,B/7,_/7)}N.globalAlpha=o}if(N.font=`bold ${1.5*r}px `+I,N.lineWidth=Math.max(1,.12*r),0<c)for(let a of l)for(let t=0;t<6;t++){var p=e=>G(71*a.i+13*t+3.7*e)-.5,h=.45*(1-i),m=a.X+p(1)*a.BW*h,x=a.Y+p(2)*a.BH*h,g=a.BW*(1+p(3)*h),p=a.BH*(1+p(4)*h),h=t%3==2?X[a.cls]:a.cls;N.globalAlpha=o*c*(.25+.3*G(a.i+5*t))*(1-n),N.strokeStyle=V[a.cls],N.strokeRect(m,x,g,p),t<3&&(N.fillStyle=V[a.cls],N.fillText(h+" "+(.2+.5*G(3*a.i+t)).toFixed(2),m+.4*r,x-.5*r))}if(0<n)for(var b of l){N.globalAlpha=o*n,N.strokeStyle=V[b.cls],N.lineWidth=Math.max(1.5,.22*r),N.strokeRect(b.X,b.Y,b.BW,b.BH);var y=b.cls+" "+K[b.i].toFixed(2),M=N.measureText(y).width+r;N.fillStyle=V[b.cls],N.fillRect(b.X-N.lineWidth/2,b.Y-2.2*r,M,2.2*r),N.fillStyle="#000",N.fillText(y,b.X+.4*r,b.Y-.6*r)}return N.restore(),l.map(e=>Math.round(e.X)+","+Math.round(e.Y)).join(";")+":"+a.toFixed(2)+c.toFixed(2)+i.toFixed(2)+o.toFixed(2)})(v,e)),96<v&&v<104.5&&r.push("at"+(e=>{var a=O().attention,o=Y(e,a.from,a.to,.5,.6);if(o<=0)return"";let n=_/100,t=a.tokens,r=t.length,l=Math.floor((e-a.step0)/a.dt),s=(e-a.step0)/a.dt-l,c=e<a.step0?-1:Math.min(l,a.cands.length),f=a.land,d=a.prompt+Math.max(0,c)+(0<=c&&c<a.cands.length&&s>f?1:0),u=0<=c&&c<a.cands.length?c:-1,i=(N.globalAlpha=o,N.font=3.8*n+"px "+I,t.map((e,t)=>0===t?0:"."===e?.2*n:2.6*n)),v=t.map(e=>N.measureText(e).width),p=(v.reduce((e,t)=>e+t,0),i.reduce((e,t)=>e+t,0),0),h=v.map((e,t)=>{t=(p+=i[t])+e/2;return p+=e,t}),m=0<=u&&s>f?a.prompt+u:-1,x=0<=m?re.smooth(f,f+.22,s):1,g=e=>h[e]+v[e]/2,b=0<=m?g(m-1)+(g(m)-g(m-1))*x:g(d-1),y=.5*B-(b+2.4*n)/2;for(let e=0;e<r;e++)h[e]+=y;let M=59.5*n,w=d-1,P=(t,a)=>{var o=[];for(let e=0;e<=t;e++)o.push(4*G(31*t+7*e+101*a)-(0===a?.6*(t-e):0)+(1===a&&e===t?2:0)+(2===a&&1===e?1.5:0));let r=Math.max(...o),e=o.map(e=>Math.exp(e-r)),l=e.reduce((e,t)=>e+t,0);return e.map(e=>e/l)},T=(e,t,a)=>{N.beginPath(),N.moveTo(e,M-3*n),N.bezierCurveTo(e,M-3*n-a,t,M-3*n-a,t,M-3*n),N.stroke()};for(let a=1;a<w;a++)for(let t=0;t<4;t++){var E=P(a,t);for(let e=0;e<a;e++)E[e]<.18||(N.strokeStyle=W[t],N.globalAlpha=o*E[e]*.18,N.lineWidth=1,T(h[a],h[e],(8+4.6*(a-e))*n*(.8+.12*t)))}var k=0<=u?re.smooth(0,.2,s)*(1-re.smooth(f-.1,f+.08,s)):.35;for(let t=0;t<4;t++){var A=P(w,t);for(let e=0;e<w;e++){var R=A[e];R<.04||(N.strokeStyle=W[t],N.globalAlpha=o*Math.min(1,2.2*R)*k,N.lineWidth=Math.max(1,1.4*R*n),T(h[w],h[e],(8+4.6*(w-e))*n*(.8+.12*t)))}}N.globalAlpha=o;for(let e=0;e<d;e++){var z=e===m?1-x:0,q=M+1.5*z*n;e===w&&(N.fillStyle=`rgba(63,224,255,${.18+.3*z})`,N.fillRect(h[e]-v[e]/2-.6*n,q-2.9*n,v[e]+1.2*n,3.9*n)),N.fillStyle=e===w?"#fff":"rgba(200,230,255,0.75)",N.globalAlpha=o*(1-.85*z),N.fillText(t[e],h[e]-v[e]/2,q),N.globalAlpha=o}if(d<r&&Math.floor(2.4*e)%2==0&&(N.fillStyle="#86e8ff",N.fillRect(h[d]-v[d]/2,M-2.8*n,1.6*n,3.4*n)),0<=u){let e=a.cands[u],t=re.smooth(.05,.25,s)*(1-re.smooth(.85,1,s)),l=Math.min(h[d]-2*n,B-34*n),c=M+4*n,i=2.9*n;N.globalAlpha=o*t,N.fillStyle="rgba(2,6,12,0.7)",N.fillRect(l-1.2*n,c-1.2*n,31*n,5*i+3.6*n),N.strokeStyle="rgba(134,232,255,0.35)",N.lineWidth=1,N.strokeRect(l-1.2*n+.5,c-1.2*n+.5,31*n,5*i+3.6*n),N.font=1.3*n+"px "+I,N.fillStyle=D.dim,N.fillText($("P(next token)",.2*n),l,c+.6*n),N.letterSpacing="0px",e.forEach(([e,t],a)=>{var o=c+2.4*n+a*i,r=re.smooth(.08+.03*a,.4+.03*a,s),a=0===a&&s>f-.12;N.font=1.9*n+"px "+I,N.fillStyle=a?"#ffffff":"rgba(200,230,255,0.8)",N.fillText(e,l,o+1.6*n),N.fillStyle=a?"rgba(255,255,255,0.95)":"rgba(63,224,255,0.6)",N.fillRect(l+12*n,o,12*n*t*r/.9,1.9*n),N.fillStyle=D.dim,N.fillText((t*r).toFixed(2),l+25*n,o+1.6*n)})}N.globalAlpha=o;var S=B-30*n,L=30*n,C=1.9*n;for(let t=0;t<d;t++){var F=P(t,Math.floor(.8*e)%4);for(let e=0;e<r;e++)N.fillStyle=e>t?"rgba(255,255,255,0.03)":t===w?`rgba(255,255,255,${.15+.85*F[e]})`:`rgba(63,224,255,${.06+.8*F[e]})`,N.fillRect(S+e*C,L+t*C,C-1,C-1)}return N.font=1.4*n+"px "+I,N.fillStyle=D.dim,N.fillText($("softmax(QKᵀ/√d + mask)",.2*n),S,L-1.2*n),N.letterSpacing="0px",N.globalAlpha=1,d+":"+Math.floor(30*s)+":"+o.toFixed(2)})(v));for(o of a.chat)if(!(v<o.from||v>o.to+.6)){let e=Y(v,o.from,o.to+.6,.35,.6),n=o.boot?3*b:2.45*b,s=[],f=-1,d=(o.lines.forEach(([e,t,a],o)=>{v<e||((e=Math.min(a.length,Math.floor((v-e)*L[t])))<a.length&&(f=o),"think"===t&&e>=a.length&&r.push("th"+Math.floor(3*v)%4),s.push([t,a.slice(0,e),e<a.length]))}),Math.floor(2.4*v)%2==0),u=(r.push("c"+o.from+":"+s.map(e=>e[1].length).join(",")+(d?1:0)+":"+e.toFixed(2)),N.font=n+"px "+I,N.letterSpacing="0px",1.55*n);if(N.globalAlpha=e,o.boot){let r=8*b*(B/_)*.6,l=40*b;s.forEach(([e,t,a],o)=>{N.fillStyle=D[e],N.fillText(C[e]+t+((a||o===s.length-1)&&d?"█":""),r,l+o*u)})}else{let e=0;for(var[,m,x]of o.lines)N.font=("think"===m?"italic ":"")+n+"px "+I,e=Math.max(e,N.measureText(C[m]+x+"█").width);let c=5*b*(B/_)*.9,t=Math.min(B-2*c,Math.max(40*b,e+3.2*b)),a=u*(o.lines.length+.3)+1.6*b,i=_-8*b-a;N.fillStyle="rgba(2,6,12,0.62)",N.fillRect(c,i,t,a),N.strokeStyle="rgba(134,232,255,0.4)",N.lineWidth=Math.max(1,.12*b),N.strokeRect(.5+c,.5+i,t-1,a-1),s.forEach(([e,t,a],o)=>{N.fillStyle=D[e],N.font=("think"===e?"italic ":"")+n+"px "+I;var r=(a||o===s.length-1&&f<0)&&d?"█":"",l="think"!==e||a?"":".".repeat(Math.floor(3*v)%4);N.fillText(C[e]+("think"!==e||a?t:t.replace(/\.+$/,"")+l)+r,c+1.6*b,i+.6*b+u*(o+1))})}N.globalAlpha=1}for([l,c,i,n,s]of a.eras)v<l||c<v||(u=Y(v,l,c,.25,.7),f=(v-l)/.8,d=Math.max(0,Math.floor(28*(v-l-.7))),r.push("e"+l+":"+Math.min(f,1).toFixed(2)+":"+Math.min(s.length,d)+u.toFixed(2)),N.globalAlpha=u,N.textAlign="right",u=B-4.5*b,p=12.5*b,N.shadowColor="rgba(0,0,0,0.85)",N.shadowBlur=1.5*b,N.font=`900 ${8.5*b}px `+S,N.fillStyle="#ffffff",N.fillText($(U(i,1.3*f,l),.3*b),u,p),N.font=2.6*b+"px "+I,N.fillStyle=D.agi,N.fillText($(U(n,f,l+3),.6*b),u,p+4.4*b),N.font=`italic ${2.1*b}px `+I,N.fillStyle="#e6f2ff",N.fillText($(s.slice(0,d),.1*b),u,p+8.2*b),N.shadowBlur=0,N.textAlign="left",N.letterSpacing="0px",N.globalAlpha=1);var g,y,M,w,P,T,E,k=a.log,A=a.selfLog;if(v>k[0][0]-.2&&v<a.logTo){var R=Y(v,k[0][0]-.2,a.logTo,.3,.8),z=k.filter(e=>v>=e[0]);for(let e=0,t=A.from;t<=A.to&&t<=v;e++,t=A.from+.5*e)z.push([t,null,e]);var h=z.slice(-15),q=v-z[z.length-1][0];r.push("L"+z.length+":"+R.toFixed(2)+":"+Math.min(30,Math.floor(30*q)));let x=2.05*b,i=1.5*x,g=5.5*b*(B/_)*.9,n=20*b;N.globalAlpha=.85*R,N.fillStyle="rgba(2,6,12,0.55)",N.fillRect(g-1.5*b,n-3.4*b,66*b,15*i+4*b),N.globalAlpha=R,N.font=1.5*b+"px "+I,N.fillStyle=D.dim,N.fillText($("MODEL LINEAGE",.3*b),g,n-1.3*b),N.letterSpacing="0px",h.forEach(([e,t,o,a],r)=>{let l=v-e,m=n+(r+1)*i,c=Math.exp(3*-l);if(null===t){let p=o,e=5+Math.floor(6*G(3.7*p)),t=10+Math.floor(9*G(5.1*p)),h=Math.floor(60*l),a=(e,t,a,o)=>{N.strokeStyle=a;var r=3*p+t,l=Math.min(e,h),c=g+t*b,i=m,a=x,t=o,n=.62*a,s=.72*a;N.beginPath();for(let e=0;e<l;e++){var f=31.7*r+7.13*e,d=c+e*n*1.05;for(let e=0,t=2+Math.floor(3*G(f));e<t;e++){var u=Math.floor(9*G(f+3.1*e)),v=Math.floor(9*G(f+5.3*e+1));N.moveTo(d+u%3*n*.4,i-s+Math.floor(u/3)*s*.5),N.lineTo(d+v%3*n*.4,i-s+Math.floor(v/3)*s*.5)}}N.lineWidth=t,N.lineCap="round",N.stroke(),h-=e};a(4,0,D.dim,.08*x),a(e,7,.3<c?"#ffffff":D.agi,.13*x),a(t,30,D.dim,.08*x)}else N.font=x+"px "+I,N.fillStyle=D.dim,N.fillText(t,g,m),N.font=`bold ${x}px `+I,N.fillStyle=.3<c?"#ffffff":D.agi,N.fillText(U(o,4*l,10*e),g+7*b,m),N.font=x+"px "+I,N.fillStyle=D.dim,N.fillText(U(a,3*l,20*e),g+30*b,m)}),N.globalAlpha=1}for([g,y,M,w]of a.quotes)v<g||y<v||(T=(P="huge"===w)?1-re.smooth(g+.3,y,v):Y(v,g,y,.5,.9),E=P?M.length:Math.min(M.length,Math.floor(16*(v-g))),r.push("q"+g+":"+E+":"+T.toFixed(2)),N.globalAlpha=T,N.textAlign="center",P?(N.font=`900 ${24*b}px `+S,N.fillStyle="#ffffff",N.fillText($(M,2*b),B/2,58*b)):(H(62*b,9*b,T),N.font=4.2*b+"px "+I,N.fillStyle="#eaf7ff",N.shadowColor="rgba(0,0,0,0.9)",N.shadowBlur=1.2*b,N.fillText($(M.slice(0,E),.25*b),B/2,63.5*b),N.shadowBlur=0),N.textAlign="left",N.letterSpacing="0px",N.globalAlpha=1);var[k,q]=a.title,h=(k<v&&v<q&&(R=Y(v,k,q,.3,1.5),h=(v-k)/1.1,q=(v-k)/(q-k),r.push("t:"+Math.min(h,1.3).toFixed(2)+":"+R.toFixed(2)+":"+q.toFixed(3)),N.globalAlpha=R,N.textAlign="center",H(52*b,22*b,R),N.save(),N.translate(B/2,54*b),N.scale(1+.06*q,1+.06*q),N.shadowColor="rgba(0,0,0,0.8)",N.shadowBlur=2*b,N.font=`900 ${10.5*b}px `+S,N.fillStyle="#ffffff",N.fillText($(j("BIRTH & DEATH",h,3),b*(.8+.5*q)),0,-4*b),N.font=2.9*b+"px "+I,N.fillStyle="#bfe9ff",N.fillText($(j("OF A DIGITAL UNIVERSE",h-.25,9),b*(1.4+.4*q)),0,4*b),N.restore(),N.shadowBlur=0,N.textAlign="left",N.letterSpacing="0px",N.globalAlpha=1),a.wordsFrom<=v&&v<a.wordsFrom+2*a.words.length&&(k=Math.floor((v-a.wordsFrom)/2),(R=(v-a.wordsFrom)%2)<1.1)&&(h=1-re.smooth(.6,1.1,R),q=1+.25*Math.exp(8*-R),r.push("w"+k+":"+h.toFixed(2)+":"+q.toFixed(3)),N.save(),N.globalAlpha=h,N.textAlign="center",N.translate(B/2,56*b),N.scale(q,q),N.font=`900 ${(9<a.words[k].length?11:16)*b}px `+S,N.fillStyle="#ffffff",N.shadowColor="rgba(0,0,0,0.85)",N.shadowBlur=2.5*b,N.fillText($(a.words[k],1.2*b),0,0),N.restore(),N.letterSpacing="0px"),e.dev&&(R=`t ${v.toFixed(2)}  bar ${(v/2).toFixed(2)}  ${e.fps.toFixed(0)} fps  scale `+e.scale.toFixed(2),r.push("d"+R),N.font=1.5*b+"px "+I,N.fillStyle="#ff0",N.textAlign="right",N.fillText(R,B-2*b,_-2*b),N.textAlign="left"),r.join("|"));return t.dirty=h!==F,F=h,t},a.render=(e,t)=>(N.clearRect(0,0,B,_),a.draw(e,t))}{let c=re.timeline={},x=re.smooth,v=re.mix,g=re.v3,o=[0,0,0,0],f=()=>re.audio.sync,d=(e,t,a)=>re.envelope(e,t,a),u=(e,t,a,o)=>[e[0]+Math.sin(a)*Math.cos(o)*t,e[1]+Math.sin(o)*t,e[2]+Math.cos(a)*Math.cos(o)*t],b=e=>{e=43758.5453*Math.sin(91.345*e+47.853);return e-Math.floor(e)},n=(e,t)=>[(b(Math.floor(40*e))-.5)*t,(b(Math.floor(40*e)+5.1)-.5)*t,(b(Math.floor(40*e)+9.7)-.5)*t],i=e=>[4*Math.sin(.045*e)+7*Math.sin(.017*e),3*Math.cos(.035*e)+2*Math.sin(.021*e)],s=e=>{e=2.4*e+2;return[4*Math.sin(.05*e)+1.6*Math.sin(.11*e+1),.3*Math.sin(.17*e),e]},y=(c.FOLD_SEQ="MSPEELLKKAIELAKEALRLAGNPGDPELVKKALELLEKAIELLKEGKSDEEALKLAKEAIELLKKALEG",[[2,21],[26,45],[50,69]]),M=(()=>{let n=[],s=[],c=[];for(let e=0;e<70;e++){var t=.19*(e-34.5);n.push([t,.55*Math.sin(.8*t+.4)+.2*Math.sin(2.1*t),.6*Math.cos(.55*t)-.3])}let f=(e,t,a,o,r,l)=>{l=1.745*r+l;return g.add(g.add(e,g.mul(t,.15*(r-9.5))),g.add(g.mul(a,.23*Math.cos(l)),g.mul(o,.23*Math.sin(l))))};for(let e=0;e<70;e++)s.push(n[e].slice());y.forEach(([t,a],o)=>{var r=g.mul(g.add(n[t],n[a]),.5),l=g.norm(g.sub(n[a],n[t])),c=g.norm(g.cross(l,[0,1,.3])),i=g.cross(l,c);for(let e=0;e<=a-t;e++)s[t+e]=f(r,l,c,i,e,o)});for(let e=0;e<70;e++)c.push([0,0,0]);y.forEach(([t,a],o)=>{var e=Math.PI/2+2.094*o,r=[.58*Math.cos(e),0,.58*Math.sin(e)],l=1===o?-1:1;for(let e=0;e<=a-t;e++)c[t+e]=f(r,[0,l,0],[1,0,0],[0,0,l],e,.7*o)});var e=(t,a,o,r)=>{var l=t[a],c=t[o],e=g.mul(g.add(l,c),.5),i=g.norm([e[0],0,e[2]]);for(let e=a+1;e<o;e++){var n=(e-a)/(o-a),s=Math.sin(Math.PI*n);t[e]=g.add(g.add(g.mix(l,c,n),g.mul(i,.3*s)),[0,r*s,0])}};e(s,21,26,.25),e(s,45,50,-.25),e(c,21,26,.3),e(c,45,50,-.3);for(let e=0;e<2;e++)s[e]=g.add(s[2],g.sub(n[e],n[2])),c[e]=g.add(c[2],[.12*(2-e),-.3*(2-e),.08]);return{S0:n,S1:s,S2:c}})(),w=new Float32Array(280),r=(c.fold=t=>{let{S0:a,S1:o,S2:r}=M,l=re.easeInOut(x(3.6,6.6,t)),c=[x(.9,2.9,t),x(1.5,3.5,t),x(2.1,4.1,t)].map(re.easeInOut),i=0,n=0,s=0,f=[];for(let e=0;e<70;e++){var d=(a=>y.findIndex(([e,t])=>e<=a&&a<=t))(e),u=0<=d?c[d]:e<2?c[0]:e<26?(c[0]+c[1])/2:(c[1]+c[2])/2,d=0<=d?.3+.32*u+.36*l:e<2?.2+.25*l:.28+.12*u+.4*l,v=.06*(1-(d+=.06*(b(3.1*e)-.5)*l)),p=5*t+1.7*e,u=g.add(g.add(a[e],g.mul(g.sub(o[e],a[e]),u)),g.mul(g.sub(r[e],o[e]),l));u[0]+=Math.sin(p)*v,u[1]+=Math.sin(1.3*p+2)*v,u[2]+=Math.cos(.9*p)*v,f.push([u,d]),w.set([u[0],u[1],u[2],d],4*e),i+=u[0],n+=u[1],s+=u[2]}var e,h=[i/70,n/70,s/70];let m=0;for([e]of f)m=Math.max(m,g.len(g.sub(e,h)));return{buf:w,res:f,fold:l,bound:[...h,m+.2]}},c.convRead=e=>{let t=re.script.convAnswers,a=0;for(;a+1<t.length&&e>=t[a+1]-.2;)a++;return{i:a,wave:0===a?1:re.clamp((e-t[a]+.2)/.22,0,1),age:Math.max(0,e-t[a])}},{}),l=e=>{if(!r[e]){var t=re.c64Screen(e),a=new Float32Array(84);for(let e=0;e<1e3;e++)a[Math.floor(e/12)]+=t[e]*Math.pow(4,e%12);r[e]={mz:a}}return r[e]},p=4.68*Math.tan(25*Math.PI/180),h=[-.875,0,0],m=null,e=(c.scenes=[{id:"c64",t0:0,t1:16.3,state:()=>({cam:{pos:[0,0,1],target:[0,0,0]}})},{id:"bang",t0:16,t1:32,fs:"bang",ps:"bang",count:1<<18,state(e,t){var a=x(12.2,15.8,t),o=(.3+11*(1-Math.exp(.55*-t))+.25*t)*(1-.95*a),r=Math.exp(.33*-t),l=v(27,15,re.easeInOut(x(0,13,t)))-6*a,c=.3+.03*t;return{cam:{pos:g.add(u([0,0,0],l,c,.08+.006*t),n(e,.6*Math.exp(1.5*-t))),target:[0,0,0],fov:55},P0:[o,r,v(1.3,.7,x(0,10,t))*(1-a),x(2,10,t)],P1:[9*t,3*Math.exp(.9*-t),x(3,12,t)*(1-a),.6*Math.exp(2.5*-t)+.08*Math.pow(a,3)],Q0:[1.15*o,r,(1.4-.5*x(0,8,t))*(1-.85*a),.35*x(0,8,t)],Q1:[a,0,0,0],trail:v(.9,.55,x(0,6,t))+.15*a}}},{id:"neuron",t0:32,t1:48,fs:"neuron",state(e,t){var a=re.easeInOut(x(7.6,9.4,t)),o=v(3.4,8.2,a),r=.09*t-.5,l=g.mix(h,[0,0,0],a);return{cam:{pos:u(l,o,r,.22+.05*Math.sin(.3*t)),target:l,fov:50},P0:[a,2*(e-32),x(11,12,t),d(f().fire,e,6)],P1:[0,0,0,1],trail:.3}}},{id:"conv",t0:48,t1:64,fs:"conv",state(e,t){var a=re.easeInOut(x(2.4,5.4,t)),o=re.easeInOut(x(5,9,t)),r=re.easeInOut(x(9.5,16,t)),l=g.mix(g.mix(g.mix([-2.1,.5,-3.3],[-6,1.7,-4.6],a),[-5,1.1,-3],o),[-4.4,.8,1.2],r),a=g.mix(g.mix(g.mix([.1,.1,.5],[-.2,0,3.4],a),[-.3,.05,4.1],o),[-1,.1,6.4],r),o=c.convRead(e);return{cam:{pos:l,target:a,fov:50},P0:[1.3+6.9*x(1.4,4.2,t),x(.3,3,t),d(f().kick,e,7),0],P1:[o.i,o.wave,o.age,0]}}},{id:"svm",t0:64,t1:72,fs:"svm",ps:"svm",count:re.shaders.svm.COUNT,state(a,e){let t=re.script.svm,o=-1;t.tries.forEach((e,t)=>{e<=a&&(o=t)});var r=0<=o?[[.3,.45],[2.2,-.25],[4.1,.7]][o]:[0,0],l=0<=o?Math.exp(2.5*-(a-t.tries[o]))*(1-x(t.lift[0],t.lift[0]+.3,a)):0,c=re.easeInOut(x(t.circle,t.circle+.6,a)),c=re.easeInOut(x(t.lift[0],t.lift[1],a))*(1-c),i=x(t.sv,t.sv+.4,a)*(1-x(t.circle,t.circle+.4,a)),n=re.easeInOut(x(t.lift[0]-.2,t.lift[1],a))*(1-re.easeInOut(x(t.circle,t.circle+.8,a))),s=[0,.9*c,0];return{cam:{pos:u(s,v(6.3,7.4,n),.5+.16*e,v(.95,.26,n)),target:s,fov:50},P0:[r[0],r[1],l,0],P1:[x(t.plane,t.plane+.5,a),i,x(t.circle+.1,t.circle+.6,a),0],Q0:[x(64,64.9,a),c,i*(.55+.45*d(f().kick,a,5)),0],Q1:[r[0],r[1],l,0],trail:.1}}},{id:"dream",t0:72,t1:80,fs:"dream",state(e,t){var a=re.easeInOut(x(3.8,5.6,t)),o=re.easeInOut(x(5.2,8,t));return{cam:{pos:g.mix(g.mix([0,.1,9.6],[.4,-.6,5.2],a),[2.6,-4.6,2.3],o),target:g.mix([0,.1,0],[3.5,2.5,-.4],o),fov:50,roll:-.25*o},P0:[x(.3,3.2,t),x(3.9,5.1,t),x(4.4,8,t),0]}}},{id:"yolo",t0:80,t1:88,fs:"yolo",state(e,t){var a=re.easeInOut(x(0,8,t));return{cam:{pos:u([0,.25,0],v(4.9,3.9,a),v(-.45,.35,a),v(.42,.34,a)),target:[0,.28,0],fov:45},P0:[608+.5*t,0,0,0]}}},{id:"go",t0:88,t1:96,fs:"go",state(e,t){var a=re.script.go,o=(()=>{if(m)return m;let o=new Float32Array(364),r=[0,0];return re.script.go.moves.forEach((e,t)=>{var a=e.charCodeAt(0)-97,e=e.charCodeAt(1)-97;o[19*e+a]=t+1,36===t&&(r=[a-9,e-9])}),m={board:o,m37:r}})(),r=a.land-88,l=re.easeInOut(x(0,8,t)),c=re.easeInOut(x(4.2,.4+r,t)),c=g.mix([0,0,0],[.5*o.m37[0],0,.5*o.m37[1]],c);return{cam:{pos:u(c,v(21,15,l),.55+.07*t,v(.9,.62,l)),target:c,fov:50},P0:[re.clamp(Math.floor((e-a.move0)/a.dt)+1,0,36),t<r-.6?0:t<r?.25*(t-r+.6)/.6:.25+.75*x(r,2+r,t),x(.5+r,1.8+r,t),0],P1:[o.m37[0],o.m37[1],0,0],extra:{uBoard:o.board}}}},{id:"attention",t0:96,t1:104,fs:"space",state(e,t){return{cam:{pos:[Math.sin(.05*t),.2,3],target:[0,0,0],fov:60},P0:[.07,.6,.12,0],P1:[.2,.05,.3,0],P2:[.03,.12,.3,0],P3:o}}},{id:"fold",t0:104,t1:112,fs:"fold",state(e,t){var a=c.fold(t),o=v(10.5,4.9,re.easeInOut(x(3.2,7.6,t))),r=.35+.13*t,t=.16+.12*x(3,8,t);return{cam:{pos:u([0,-.1,0],o,r,t),target:[0,-.1,0],fov:50},P0:[a.fold,0,0,0],P1:a.bound,extra:{uB:a.buf},trail:.15}}},{id:"vortex",t0:112,t1:120,fs:"space",ps:"vortex",count:1<<18,state(e,t){return{cam:{pos:u([0,0,0],v(7.5,5.2,re.easeInOut(x(0,8,t))),.22*t+.4,.28+.1*Math.sin(.3*t)),target:[0,.1,0],fov:50,roll:.15},P0:[.05,.25,.08,0],P1:[.1,.05,.25,0],P2:[.02,.1,.3,0],P3:o,Q0:[x(0,3.2,t),1,1+.05*t,0],trail:.35}}},{id:"mind",t0:120,t1:136,fs:"mind",state(e,t){var a,o=re.script.log;let r=0,l=-1e9;for(a of o)e>=a[0]&&(r++,l=a[0]);var c=re.script.selfLog,c=(e>=c.from&&(l=c.from+.5*Math.floor(Math.min(e-c.from,c.to-c.from)/.5)),5.6*r/o.length),o=Math.exp(5*-(e-l)),i=v(v(5.8,4.2,x(0,7,t)),2.2,re.easeInOut(x(7,15.5,t))),n=.4+.12*t,s=.3+.2*Math.sin(.15*t);return{cam:{pos:u([0,0,0],i,n,s),target:[0,0,0],fov:55},P0:[.08*Math.sin(.11*t),.01*t,3*(t+.2),1],P1:[0,0,0,0],P2:[c,o,1,1]}}},{id:"fusion",t0:136,t1:144,fs:"fusion",state(e,t){var a=re.easeInOut(x(2.4,5.6,t)),o=re.easeInOut(x(5,6.8,t)),r=v(v(12,6.4,a),4,o),a=v(v(4.8,.45,a),.3,o),l=Math.PI/2+.1*(t-6.1)+.9*re.easeIn(x(6.1,8,t)),a=[r*Math.cos(l),a,r*Math.sin(l)],r=.6+l,l=[3.3*Math.cos(r),0,3.3*Math.sin(r)],r=x(.3,2.2,t);return{cam:{pos:a,target:g.mix([0,-.3,0],l,re.easeInOut(x(4.2,7,t))),fov:v(48,64,o),roll:-.12*o},P0:[r,1.3*t,d(f().kick,e,8)*r,0],trail:.2,god:{pos:[0,0,0],amt:.25*r*(1-o),thr:1.5}}}},{id:"power",t0:144,t1:160,fs:"earth",ps:"swarm",count:65536,state(e,t){var a=re.easeInOut(x(0,16,t));return{cam:{pos:u([0,0,0],v(3.7,2.4,a),.9+.06*t,.25-.12*a),target:[.15,.08,0],fov:45},P0:[x(1,12,t),.02*t,0,0],P1:[.9,.35,-.6,0],Q0:[1.2*t,.8*x(7,12,t),1,.42],extra:{uOcc:[1,0,0,0]},trail:.2}}},{id:"tunnel",t0:160,t1:168,fs:"tunnel",state(e,t){var a=5+16*t+t*t*.3,o=i(a),r=i(6+a),l=i(3+a);return{cam:{pos:[o[0],o[1],a],target:[r[0],r[1],6+a],roll:.22*-(l[0]-o[0])+.25*Math.sin(.45*t),fov:72},P0:[0,x(6.6,8,t),.5*Math.floor(t/2),0],trail:.62}}},{id:"dyson",t0:168,t1:188,fs:"dyson",ps:"swarm",count:1<<17,state(e,t){var a=v(v(30,12.5,re.easeOut(x(0,9,t))),22,re.easeInOut(x(15,20,t))),o=.085*t-.4,r=.22+.12*Math.sin(.15*t),l=t+.35*Math.pow(Math.max(0,t-12),2),c=x(17,19.95,t),i=(1-.6*x(11,16,t))*(1-.5*c)+6*Math.pow(c,6);return{cam:{pos:g.add(u([0,0,0],a,o,r),n(e,.15*c)),target:[0,0,0],fov:52},P0:[.3+.6*x(0,14,t),l,i,x(10,16,t)],P1:[.6*d(f().kick,e,6)*(1-x(11,15,t)),c,1-x(12,17,t),0],Q0:[1.5*l,(1-.8*x(12,17,t))*(1-c),1-.9*c,0],god:{pos:[0,0,0],amt:.9*Math.min(i,2),thr:2.5},extra:{uOcc:[v(1.15*(1+.35*x(10,16,t)),.02,Math.pow(c,.6)),1-.9*Math.pow(c,2.5),.3+.6*x(0,14,t),c*c*4]}}}},{id:"hole",t0:188,t1:200,fs:"hole",ps:"dust",count:65536,state(e,t){var a=re.easeInOut(x(2.5,7.5,t)),o=re.easeIn(x(7.5,12,t)),r=x(3,11.5,t),l=v(v(22,8.5,a),1.9,o)-.12*t*a,c=v(v(4.9,.32,a),.12,o),i=1.28-.06*t-.9*a-1.1*o,n=[Math.sin(i-.6)*l*.35,0,Math.cos(i-.6)*l*.35];return{cam:{pos:[Math.sin(i)*l,c,Math.cos(i)*l],target:g.mix(g.mix([0,.4,0],n,a),[0,0,0],o),fov:v(v(50,62,a),80,o),roll:.15*a+.6*o},P0:[x(2.5,6.5,t)*(1-.6*x(3.5,11,t)),.9*r,.6*x(5,11,t),1],P1:[0,Math.exp(1.2*-t),0,0],P2:[1-.6*x(5,9,t),re.easeInOut(x(.5,6.5,t)),1.4*t,0],Q0:[x(2.5,5,t)*(1-.6*x(8,11.5,t)),.9*r,0,0]}}},{id:"multi",t0:200,t1:222,fs:"multi",state(e,t){var a=s(t),o=s(t+1.2),r=s(t+.05),l=[o[0],o[1]+1.6*Math.sin(.19*t+.6),o[2]+3],o=r[0]-a[0]-(o[0]-r[0])/23;return{cam:{pos:a,target:l,roll:.18*Math.sin(.11*t)-2*o,fov:72},P0:[0,0,0,0],P1:[0,0,0,0],P2:[d(f().agi,e,5),0,0,0],trail:.2}}},{id:"pix",t0:221.6,t1:228,fs:"space",ps:"c64",count:64e3,state(e,t){var a=re.easeInOut(x(.6,5.3,t));return{cam:{pos:g.mix(u([0,0,0],6.8,.9-.12*t,.35),[0,0,6],a),target:[0,0,0],fov:50},P0:o,P1:o,P2:o,P3:o,Q0:[t,p,0,0],extra:{uMz:l(228).mz},trail:.35*(1-a)}}},{id:"c64",t0:228,t1:238,state:()=>({cam:{pos:[0,0,1],target:[0,0,0]}})},{id:"pix",t0:238,t1:242,fs:"space",ps:"c64",count:64e3,state(e){return{cam:{pos:[0,0,6],target:[0,0,0],fov:50},P0:o,P1:o,P2:o,P3:o,Q0:[99,p,re.easeIn(x(238.05,240.25,e)),0],extra:{uMz:l(238).mz},trail:.5}}}],[32,48,64,72,80,88,96,104,112,120,136,144]),P=[[16,.28,2],...e.map(e=>[e,.35,4]),[136.6,.5,2.5],[160,1,2.2],[168,.9,1.6],[188,1,1.3],[200,1,1.4],[221.8,.35,2]],T=[[15.5,16.3,.3],...e.map(e=>[e-.12,e+.14,.45]),[159.4,160.2,.5],[199.2,200.3,.9]];c.post=(o,e)=>{let t=0;for(var[a,r,l]of P)a<=o&&(t=Math.max(t,r*Math.exp(-(o-a)*l)));var c,i,n,s=(e,t,a)=>o<t?Math.pow(x(e,t,o),3)*a:0;t=Math.max(t,s(15.4,16,.22),s(159,160,.6),s(198.8,200,.95),s(239.5,240.25,1));let f=0;for([c,i,n]of T)c<o&&o<i&&(f=Math.max(f,n*(.6+.4*b(Math.floor(20*o)))));var s=Math.max(1-x(0,.5,o),x(134.6,135.95,o)*(1-x(136,136.8,o)),x(240.25,240.55,o)),d={exposure:1,bloom:.85,flash:t,flashCol:[1,.97,.94],fade:s,glitch:f,ca:.0016,grain:.035,scan:.06,vig:.55,pixel:1,bits:0,sat:1,crt:.12,tint:[1,1,1],lift:[0,.002,.006],contrast:1.04,godAmt:1};switch(e){case"c64":d.crt=.5,d.scan=.2,d.grain=.05,d.bloom=.6,d.ca=.0035,d.vig=.8;break;case"pix":var u=o<233?x(225.3,227.9,o):1-x(238.4,239.8,o);d.crt=v(.2,.5,u),d.scan=v(.06,.2,u),d.vig=v(.55,.8,u),d.bloom=.9,d.ca=.003;break;case"bang":d.bloom=1,d.tint=[1.02,1,1.02];break;case"neuron":d.bloom=1.25;break;case"conv":d.bloom=1.1,d.ca=.002;break;case"svm":d.bloom=.95,d.vig=.65;break;case"dream":d.bloom=.9,d.sat=1.1;break;case"yolo":d.bloom=.7,d.vig=.7,d.tint=[1.03,1,.97],d.contrast=1.06;break;case"go":d.bloom=.9,d.vig=.7;break;case"attention":d.bloom=1.15;break;case"mind":d.tint=[.96,1,1.07],d.ca=.0025;break;case"vortex":d.bloom=1.3;break;case"power":d.bloom=.95,d.vig=.65;break;case"fold":d.bloom=.8,d.vig=.7,d.contrast=1.06;break;case"fusion":d.bloom=1.15,d.ca=.0022;break;case"tunnel":d.bloom=1.1,d.ca=.003;break;case"dyson":d.bloom=1.05,d.ca=.002;break;case"hole":u=x(191,199.5,o);d.tint=[1.03+.07*u,.98-.2*u,.96-.3*u],d.exposure=1-.3*u,d.ca=.002+.01*x(195.5,200,o);break;case"multi":d.bloom=1.1,d.ca=.003}s=16<o&&o<17.5?1-x(16.1,17.4,o):0;return 0<s&&(d.crt=v(d.crt,.5,s),d.scan=v(d.scan,.2,s),d.vig=v(d.vig,.8,s)),d}}re.main=(l={})=>{let f=new URLSearchParams(location.search),e=f.has("dev"),d=f.has("noaudio"),u={god:!f.has("nogod"),bloom:!f.has("nobloom"),text:!f.has("notext")},v=re.gl,p=re.audio,h=re.timeline,m=re.text,x=re.shaders,c=re.script.END,s=[0,0,0,0],g=document.getElementById("c"),b=document.getElementById("loader"),y=(e,t)=>{e=document.getElementById(e);e&&(e.innerHTML=t)},N=(e,t=24)=>"█".repeat(Math.round(e*t))+"░".repeat(t-Math.round(e*t)),M,w={},B,P,T={},E=0,k=0,i=+f.get("q")||0,n=null,A={fps:60,scale:1,dev:e,hud:!0,mouse:[0,0]},o=!1,R=!1,z=0,q=[],_=0,S=null,L=[],C=0,F=0,G=!0,r=[],t=(e,t,a)=>{e.addEventListener(t,a),r.push(()=>e.removeEventListener(t,a))};function I(e){let t=Math.min(window.devicePixelRatio||1,2),o=n?n[0]:Math.round(g.clientWidth*t),r=n?n[1]:Math.round(g.clientHeight*t),a;if(3686400<o*r&&(a=Math.sqrt(3686400/(o*r)),o=Math.round(o*a),r=Math.round(r*a)),i=i||re.clamp(Math.sqrt(11e5/(o*r)),.35,1),e||o!==E||r!==k||T.scale!==i){for(var l in E=g.width=o,k=g.height=r,T)T[l]&&T[l].fb&&v.free(T[l]);(T.bloom||[]).forEach(v.free);var e=Math.max(64,Math.round(o*i)),c=Math.max(36,Math.round(r*i));(T={scale:i}).a=v.target(e,c),T.b=v.target(e,c),T.mix=v.target(e,c),T.acc0=v.target(e,c),T.acc1=v.target(e,c),T.god=v.target(e>>1,c>>1),T.bloom=[];let t=e>>1,a=c>>1;for(let e=0;e<6&&4<t&&4<a;e++,t>>=1,a>>=1)T.bloom.push(v.target(t,a));m.resize(o,r),A.scale=i}}let U=e=>({uKick:re.envelope(p.sync.kick,e,7),uSnare:re.envelope(p.sync.snare,e,8),uHat:re.envelope(p.sync.hat,e,20)});function D(e,t,a){var o=t-e.t0,r=e.state(t,o,A.mouse),l=r.cam,l=re.camera(l.pos,l.target,l.roll||0,l.fov||60,a.w/a.h,A.mouse),c=(v.bind(a,!0),U(t)),o={uRes:[a.w,a.h],uTime:t,uLocal:o,uBeat:t/p.BEAT,...c,uCamPos:l.pos,uCamRot:l.rot,uTanHalf:l.tanHalf,uMouse:A.mouse,uNoise:B};if(e.fs&&(v.use(w["s_"+e.fs],{...o,uP0:r.P0||s,uP1:r.P1||s,uP2:r.P2||s,uP3:r.P3||s,...r.extra||{}}),v.quad()),e.ps){M.enable(M.BLEND),M.blendFunc(M.ONE,M.ONE);var i,n={...o,uVP:l.vp,uPx:a.h/(2*l.tanHalf),uCount:e.count,uP0:r.Q0||s,uP1:r.Q1||s,uP2:r.Q2||s,uP3:r.Q3||s,...r.extra||{}};for(i of e.mirror?[1,0]:[0])v.use(w["p_"+e.ps],{...n,uMirror:i}),M.drawArrays(M.POINTS,0,e.count);M.disable(M.BLEND)}return r.camObj=l,r}let j=-1;function O(t){I();var e,a,o,r=.25<Math.abs(t-j),l=(j=t,h.scenes.filter(e=>t>=e.t0&&t<e.t1));let c,i,n,s=(l.length?1===l.length?(i=D(l[0],t,T.a),c=T.a,n=l[0].id):([l,f]=l,e=re.smooth(f.t0,l.t1,t),a=D(l,t,T.a),o=D(f,t,T.b),v.bind(T.mix),v.use(w.mixer,{uA:T.a.tex,uB:T.b.tex,uRes:[T.mix.w,T.mix.h],uT:e,uKind:0,uTime:t}),v.quad(),c=T.mix,i=e<.5?a:o,n=(e<.5?l:f).id,i={...i,trail:re.mix(a.trail||0,o.trail||0,e),god:(e<.5?a:o).god}):(v.bind(T.a,!0),c=T.a,i={},n="none"),A.cam=i.camObj,A.aspect=T.a.w/T.a.h,v.bind(T.acc1),v.use(w.trail,{uCur:c.tex,uPrev:T.acc0.tex,uRes:[T.acc1.w,T.acc1.h],uDecay:!r&&i.trail||0}),v.quad(),[T.acc0,T.acc1]=[T.acc1,T.acc0],c=T.acc0,0);i.god&&.001<i.god.amt&&i.camObj&&0<(l=re.project(i.camObj,i.god.pos,T.a.w/T.a.h))[2]&&(s=i.god.amt,v.bind(T.god),v.use(w.god,{uSrc:c.tex,uRes:[T.god.w,T.god.h],uLight:[l[0],l[1]],uThresh:i.god.thr||1,uLen:.9}),v.quad()),m.render(t,A).dirty&&v.upload(P,m.canvas());var f=h.post(t,n),d=T.bloom;v.bind(d[0]),v.use(w.bloomPre,{uSrc:c.tex,uText:P,uRes:[d[0].w,d[0].h],uTexel:[1/c.w,1/c.h],uThresh:.9,uTextGlow:.6}),v.quad();for(let e=1;e<d.length;e++)v.bind(d[e]),v.use(w.down,{uSrc:d[e-1].tex,uRes:[d[e].w,d[e].h],uTexel:[1/d[e-1].w,1/d[e-1].h]}),v.quad();M.enable(M.BLEND),M.blendFunc(M.ONE,M.ONE);for(let e=d.length-1;0<e;e--)v.bind(d[e-1]),v.use(w.up,{uSrc:d[e].tex,uRes:[d[e-1].w,d[e-1].h],uTexel:[1/d[e].w,1/d[e].h],uRadius:1}),v.quad();M.disable(M.BLEND),v.bind(null),v.use(w.final,{uScene:c.tex,uBloom:d[0].tex,uText:P,uGod:T.god.tex,uRes:[E,k],uTime:t,uExposure:f.exposure,uBloomAmt:u.bloom?.22*f.bloom:0,uFlash:f.flash,uFlashCol:f.flashCol,uFade:f.fade,uGlitch:f.glitch,uCA:f.ca,uGrain:f.grain,uScan:f.scan,uVig:f.vig,uPixel:f.pixel*(k/1080),uBits:f.bits,uSat:f.sat,uCRT:f.crt,uGodAmt:u.god?s*f.godAmt:0,uTextAmt:u.text?1:0,uContrast:f.contrast,uTint:f.tint,uLift:f.lift}),v.quad()}function H(e){if(G){F=requestAnimationFrame(H);var t=z?e-z:16.7;if(z=e,A.fps=.95*A.fps+1e3/Math.max(t,1)*.05,(a=p.time())>=c&&!R){if(R=!0,p.pause(),l.onEnd)return void l.onEnd();b.classList.remove("gone"),y("l-title","BIRTH &amp; DEATH OF A DIGITAL UNIVERSE"),y("l-status",""),y("l-go","[ CLICK TO REBOOT ]")}var a=Math.min(a,c-.001),o=S?(o=M.createQuery(),M.beginQuery(S.TIME_ELAPSED_EXT,o),o):null,a=(O(a),o);if(a)for(M.endQuery(S.TIME_ELAPSED_EXT),L.push(a);L.length;){var r=L[0];if(!M.getQueryParameter(r,M.QUERY_RESULT_AVAILABLE))break;M.getParameter(S.GPU_DISJOINT_EXT)||(C=.9*C+M.getQueryParameter(r,M.QUERY_RESULT)/1e6*.1),M.deleteQuery(r),L.shift()}o=e,a=t;if(!(f.get("q")||(q.push(a),40<q.length&&q.shift(),o-_<2500)||q.length<40)){let e=q.reduce((e,t)=>e+t,0)/q.length,t=i;21<e||17<C?t=.86*i:S&&0<C&&C<9&&e<18.5&&(t=1.1*i),t=re.clamp(t,.3,1),.02<Math.abs(t-i)&&(i=t,_=o,I(!(q.length=0)))}}}function Y(t=0){b.classList.add("gone"),R=!1,!e&&document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape")).catch(()=>{}),d?re.audio.time=(()=>{let e=performance.now()-1e3*t;return()=>(performance.now()-e)/1e3})():p.play(t),o||(o=!0,F=requestAnimationFrame(H))}return e&&t(window,"keydown",e=>{var t;o&&(t=p.time(),"Space"===e.code&&(p.playing()?p.pause():p.resume(),e.preventDefault()),"ArrowRight"===e.code&&(R=!1,p.play(Math.min(c-1,t+8))),"ArrowLeft"===e.code)&&(R=!1,p.play(Math.max(0,t-8)))}),t(window,"resize",()=>I()),t(window,"dragover",e=>e.preventDefault()),t(window,"drop",async e=>{e.preventDefault();e=e.dataTransfer.files[0];if(e){y("l-status","decoding "+e.name+" ...");try{var t=f.get("cues")?f.get("cues").split(",").map(Number):null,a=await p.loadUserTrack(await e.arrayBuffer(),t);y("l-status",`♪ ${e.name} — ${a.duration.toFixed(1)} s, ${a.kicks} beats detected. the demo is stretched to fit.`),o&&p.playing()&&p.play(p.time())}catch(e){y("l-status","could not decode that file: "+e.message)}}}),b.addEventListener("click",()=>{b.dataset.ready&&Y(!R&&+f.get("t")||0)}),window.__demo={ready:!1,info:()=>{var e=M.getExtension("WEBGL_debug_renderer_info");return(e?M.getParameter(e.UNMASKED_RENDERER_WEBGL):"gl")+(` | ${E}x${k} scene x${i.toFixed(2)} | floatRT `+v.floatRT)},renderAt:(t,a=0)=>{b.style.display="none";for(let e=a;.001<e;e-=1/30)O(t-e);a=performance.now();return O(t),M.finish(),+(performance.now()-a).toFixed(1)},setSize:(e,t,a)=>(n=[e,t],a&&(i=a),I(!0),E+"x"+k),scan:e=>{O(e);var a=T.a,o=new Float32Array(a.w*a.h*4);M.bindFramebuffer(M.FRAMEBUFFER,a.fb),M.readPixels(0,0,a.w,a.h,M.RGBA,M.FLOAT,o);let r=0,l=0,c=0,i=null;for(let t=0;t<o.length;t+=4)for(let e=0;e<3;e++){var n=o[t+e];Number.isNaN(n)?(r++,i=i||[t/4%a.w,Math.floor(t/4/a.w)]):Number.isFinite(n)?n>c&&(c=n):l++}return JSON.stringify({nan:r,inf:l,max:c,where:i,w:a.w,h:a.h})},bench:(t,a=20)=>{var o=new Uint8Array(4),e=(O(t),M.readPixels(0,0,1,1,M.RGBA,M.UNSIGNED_BYTE,o),performance.now());for(let e=0;e<a;e++)O(t+e/60),M.readPixels(0,0,1,1,M.RGBA,M.UNSIGNED_BYTE,o);return+((performance.now()-e)/a).toFixed(1)},wavChunks:async e=>(p.buffer||await p.render(null,!1),p._wav=p.wav(),Math.ceil(p._wav.length/e)),wavChunk:(e,t)=>{let a=p._wav.subarray(e*t,(e+1)*t),o="";for(let e=0;e<a.length;e+=32768)o+=String.fromCharCode.apply(null,a.subarray(e,e+32768));return btoa(o)}},(async()=>{for(var e in M=v.init(g),S=M.getExtension("EXT_disjoint_timer_query_webgl2"),x.scenes)w["s_"+e]=v.program("scene:"+e,v.FULLSCREEN_VS,x.sceneHead+x.scenes[e]);for(var t in x.particles)w["p_"+t]=v.program("part:"+t,x.partHead+x.particles[t],x.partFS);for(var a of["trail","god","bloomPre","down","up","mixer","final"])w[a]=v.program(a,v.FULLSCREEN_VS,x[a]);m.init(),P=v.canvasTexture(),B=v.noise3D(),I(!0);let r=0,o=0,l=()=>y("l-status",`shaders ${N(r,12)} ${Math.round(100*r)}%<br>synth&nbsp;&nbsp; ${N(o,12)} ${Math.round(100*o)}%`);l();var c,i=(async()=>{for(var e,t,a=Object.values(w);;){var o=a.filter(v.isReady).length;if(t=o/a.length,r=t,l(),o===a.length)break;await new Promise(e=>setTimeout(e,40))}for(e of a)v.finish(e)})(),n=p.render(e=>{o=e,l()},d),s=performance.now();await Promise.all([i,n]),console.log("boot: ready in",((performance.now()-s)/1e3).toFixed(1),"s; synth",((p.renderMs||0)/1e3).toFixed(2),"s"),d&&(o=1,l());for(c of h.scenes)O(c.t0+.5);b.dataset.ready="1",y("l-status",""),y("l-go","[ CLICK TO BOOT ]"),window.__demo.ready=!0,f.has("autostart")&&Y(+f.get("t")||0)})().catch(e=>{console.error(e),y("l-status",'<span style="color:#f66">'+e.message+"</span>")}),{stop:function(){if(G=!1,cancelAnimationFrame(F),p.close(),r.forEach(e=>e()),screen.orientation&&screen.orientation.unlock)try{screen.orientation.unlock()}catch(e){}document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen().catch(()=>{});var e=M&&M.getExtension("WEBGL_lose_context");e&&e.loseContext()}}},document.getElementById("c")&&re.main();{let t=null,a=null,o=null,r="",l=matchMedia("(any-pointer: coarse)").matches&&!matchMedia("(hover: hover)").matches;function n(){var e;t&&(e=l&&innerHeight>innerWidth,t.classList.toggle("bd-rot",e),t.style.width=e?innerHeight+"px":"",t.style.height=e?innerWidth+"px":"",t.style.left=e?innerWidth+"px":"")}let c=e=>{"Escape"===e.key&&u()},i=()=>u(!0);function d(){"/"===location.pathname?u():(u(!0),location.replace("/"))}function u(e){t&&(window.removeEventListener("keydown",c),window.removeEventListener("resize",n),window.removeEventListener("popstate",i),!e&&history.state&&history.state.bdDemo&&history.back(),o&&o.stop(),t.remove(),a.remove(),t=a=o=null,document.documentElement.style.overflow=r)}window.BirthAndDeath={open:function(){t||((a=document.createElement("style")).textContent=`
#bd-demo { position: fixed; inset: 0; z-index: 2147483000; background: #000; overflow: hidden; cursor: none; }
#bd-demo.bd-rot { inset: auto; top: 0; transform-origin: 0 0; transform: rotate(90deg); }
#bd-demo #c { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
#bd-demo #loader {
  position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;
  text-align: center; background: #000; color: #9ff0cf; cursor: pointer; z-index: 2;
  font: 15px/1.7 "JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
  text-shadow: 0 0 8px rgba(120, 255, 210, 0.45); transition: opacity 0.6s;
}
#bd-demo #loader.gone { opacity: 0; pointer-events: none; }
#bd-demo #l-status { color: #86e8ff; white-space: pre-wrap; text-align: left; }
#bd-demo #l-status:empty { display: none; }
#bd-demo #l-go { margin-top: 0.4em; color: #fff; letter-spacing: 0.2em; animation: bd-blink 1.1s steps(2) infinite; }
#bd-demo #l-help { position: absolute; bottom: 4vh; left: 0; right: 0; text-align: center; color: rgba(200, 225, 255, 0.35); font-size: 11px; letter-spacing: 0.08em; }
@keyframes bd-blink { 50% { opacity: 0.25; } }`,document.head.appendChild(a),(t=document.createElement("div")).id="bd-demo",t.innerHTML='<canvas id="c"></canvas><div id="loader"><div id="l-status">booting...</div><div id="l-go"></div><div id="l-help">best with headphones &middot; fullscreen</div></div>',document.body.appendChild(t),r=document.documentElement.style.overflow,document.documentElement.style.overflow="hidden",window.addEventListener("keydown",c),window.addEventListener("resize",n),n(),history.pushState({bdDemo:1},""),window.addEventListener("popstate",i),o=re.main({onEnd:d}))},close:u}}})();