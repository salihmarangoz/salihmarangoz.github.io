(()=>{let ze=window.D=window.D||{},v=(ze.clamp=(e,t,a)=>Math.min(a,Math.max(t,e)),ze.mix=(e,t,a)=>e+(t-e)*a,ze.fract=e=>e-Math.floor(e),ze.smooth=(e,t,a)=>{a=ze.clamp((a-e)/(t-e),0,1);return a*a*(3-2*a)},ze.easeInOut=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,ze.easeOut=e=>1-Math.pow(1-ze.clamp(e,0,1),3),ze.easeIn=e=>Math.pow(ze.clamp(e,0,1),3),ze.rng=t=>()=>{t=t+1831565813|0;var e=Math.imul(t^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/4294967296},ze.v3={add:(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],sub:(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],mul:(e,t)=>[e[0]*t,e[1]*t,e[2]*t],mix:(e,t,a)=>[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a],dot:(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],cross:(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],len:e=>Math.hypot(e[0],e[1],e[2]),norm:e=>{var t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}});ze.spline=(e,t)=>{let a=e.length-1,o=ze.clamp(t,0,1)*a,r=Math.min(Math.floor(o),a-1),l=o-r,c=e[Math.max(r-1,0)],n=e[r],i=e[r+1],s=e[Math.min(r+2,a)],f=l*l,d=f*l;return n.map((e,t)=>.5*(2*n[t]+(-c[t]+i[t])*l+(2*c[t]-5*n[t]+4*i[t]-s[t])*f+(-c[t]+3*n[t]-3*i[t]+s[t])*d))},ze.camera=(e,t,a,o,r,l,c=.05,n=500)=>{let i=v.norm(v.sub(t,e)),s=[Math.sin(a),Math.cos(a),0],f=(.999<Math.abs(v.dot(i,v.norm(s)))&&(s=[0,0,1]),v.norm(v.cross(i,s))),d=v.cross(f,i);l&&(i=v.norm(v.add(i,v.add(v.mul(f,Math.tan(.14*l[0])),v.mul(d,Math.tan(.09*l[1]))))),f=v.norm(v.cross(i,d)),d=v.cross(f,i));var t=Math.tan(o*Math.PI/360),u=new Float32Array([f[0],d[0],-i[0],0,f[1],d[1],-i[1],0,f[2],d[2],-i[2],0,-v.dot(f,e),-v.dot(d,e),v.dot(i,e),1]),a=1/t,l=1/(c-n),h=new Float32Array([a/r,0,0,0,0,a,0,0,0,0,(n+c)*l,-1,0,0,2*n*c*l,0]),p=new Float32Array(16);for(let o=0;o<4;o++)for(let a=0;a<4;a++){let t=0;for(let e=0;e<4;e++)t+=h[4*e+a]*u[4*o+e];p[4*o+a]=t}return{pos:e,rot:new Float32Array([...f,...d,...i]),tanHalf:t,vp:p,fwd:i,right:f,up:d}},ze.project=(e,t,a)=>{var t=v.sub(t,e.pos),o=v.dot(t,e.fwd);return[v.dot(t,e.right)/(o*e.tanHalf*a)*.5+.5,v.dot(t,e.up)/(o*e.tanHalf)*.5+.5,0<o?1:0]},ze.lastBefore=(e,t)=>{let a=0,o=e.length-1,r=-1;for(;a<=o;){var l=a+o>>1;e[l]<=t?(r=l,a=1+l):o=l-1}return r},ze.envelope=(e,t,a)=>{var o=ze.lastBefore(e,t);return o<0?0:Math.exp(-(t-e[o])*a)};{let k=ze.gl={init:e=>{e=e.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(e)return k.gl=e,k.floatRT=!!e.getExtension("EXT_color_buffer_float"),e.getExtension("EXT_float_blend"),e.getExtension("OES_texture_float_linear"),k.parallel=e.getExtension("KHR_parallel_shader_compile"),k.vao=e.createVertexArray(),e.bindVertexArray(k.vao),e;throw new Error("WebGL2 is required")}};k.FULLSCREEN_VS=`#version 300 es
void main(){ vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2); gl_Position = vec4(p * 2. - 1., 0., 1.); }`,k.program=(e,t,a)=>{let o=k.gl,r=(e,t)=>{e=o.createShader(e);return o.shaderSource(e,t),o.compileShader(e),e},l=o.createProgram(),c=r(o.VERTEX_SHADER,t),n=r(o.FRAGMENT_SHADER,a);return o.attachShader(l,c),o.attachShader(l,n),o.linkProgram(l),{name:e,p:l,v:c,f:n,vs:t,fs:a,uniforms:null}},k.isReady=e=>!k.parallel||k.gl.getProgramParameter(e.p,k.parallel.COMPLETION_STATUS_KHR),k.finish=t=>{var e,a,o,r=k.gl;if(!t.uniforms){if(!r.getProgramParameter(t.p,r.LINK_STATUS))throw o=r.getShaderInfoLog(t.v),a=r.getShaderInfoLog(t.f),e=r.getProgramInfoLog(t.p),console.error(`[${t.name}] link failed
VS: ${o}
FS: ${a}
PROG: `+e),e=a?t.fs:t.vs,(a=/ERROR: \d+:(\d+)/.exec(a||o))&&(o=+a[1],console.error(e.split("\n").map((e,t)=>String(t+1).padStart(4)+": "+e).join("\n").split("\n").slice(Math.max(0,o-6),3+o).join("\n"))),new Error("shader "+t.name);t.uniforms={};var l=r.getProgramParameter(t.p,r.ACTIVE_UNIFORMS);for(let e=0;e<l;e++){var c=r.getActiveUniform(t.p,e),n=c.name.replace(/\[0\]$/,"");t.uniforms[n]={loc:r.getUniformLocation(t.p,c.name),type:c.type,size:c.size}}}return t},k.use=(e,t)=>{var a,o=k.gl;o.useProgram(e.p);let r=0;for(a in t){var l=e.uniforms[a];if(l){var c=t[a];switch(l.type){case o.FLOAT:1<l.size?o.uniform1fv(l.loc,c):o.uniform1f(l.loc,c);break;case o.FLOAT_VEC2:o.uniform2fv(l.loc,c);break;case o.FLOAT_VEC3:o.uniform3fv(l.loc,c);break;case o.FLOAT_VEC4:o.uniform4fv(l.loc,c);break;case o.FLOAT_MAT3:o.uniformMatrix3fv(l.loc,!1,c);break;case o.FLOAT_MAT4:o.uniformMatrix4fv(l.loc,!1,c);break;case o.INT:case o.BOOL:o.uniform1i(l.loc,c);break;case o.SAMPLER_2D:case o.SAMPLER_3D:o.activeTexture(o.TEXTURE0+r),o.bindTexture(l.type===o.SAMPLER_3D?o.TEXTURE_3D:o.TEXTURE_2D,c.tex||c),o.uniform1i(l.loc,r++)}}}},k.target=(e,t,a="hdr")=>{var o=k.gl,r=o.createTexture(),l=(o.bindTexture(o.TEXTURE_2D,r),"10"!==a&&k.floatRT),a=!l&&"hdr"!==a,a=(o.texImage2D(o.TEXTURE_2D,0,l?o.RGBA16F:a?o.RGB10_A2:o.RGBA8,e,t,0,o.RGBA,l?o.HALF_FLOAT:a?o.UNSIGNED_INT_2_10_10_10_REV:o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.createFramebuffer());return o.bindFramebuffer(o.FRAMEBUFFER,a),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,r,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:r,fb:a,w:e,h:t,hdr:l}},k.free=e=>{e&&(k.gl.deleteTexture(e.tex),k.gl.deleteFramebuffer(e.fb))},k.bind=(e,t)=>{var a=k.gl;a.bindFramebuffer(a.FRAMEBUFFER,e?e.fb:null),a.viewport(0,0,e?e.w:a.drawingBufferWidth,e?e.h:a.drawingBufferHeight),t&&(a.clearColor(0,0,0,1),a.clear(a.COLOR_BUFFER_BIT))},k.quad=()=>k.gl.drawArrays(k.gl.TRIANGLES,0,3),k.noise3D=()=>{let e=k.gl,t=ze.rng(1337),r=[0,1,2,3].map(()=>Float32Array.from({length:4096},t)),l=new Uint8Array(1048576),o=e=>e*e*e*(e*(6*e-15)+10),c=0;for(let a=0;a<64;a++)for(let t=0;t<64;t++)for(let e=0;e<64;e++){var n=e/4,i=t/4,s=a/4,f=Math.floor(n),d=Math.floor(i),u=Math.floor(s),h=o(n-f),p=o(i-d),v=o(s-u),m=f%16,x=(f+1)%16,g=d%16,b=(d+1)%16,y=u%16,w=(u+1)%16;for(let a=0;a<4;a++){let o=r[a],e=(e,t,a)=>o[e+16*(t+16*a)],t=ze.mix(ze.mix(ze.mix(e(m,g,y),e(x,g,y),h),ze.mix(e(m,b,y),e(x,b,y),h),p),ze.mix(ze.mix(e(m,g,w),e(x,g,w),h),ze.mix(e(m,b,w),e(x,b,w),h),p),v);l[c++]=Math.round(255*t)}}var a,M=e.createTexture();e.bindTexture(e.TEXTURE_3D,M),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,64,64,64,0,e.RGBA,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(a of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,a,e.REPEAT);return M},k.dataTexture=(e,t,a)=>{var o,r,l=k.gl,c=l.createTexture();l.bindTexture(l.TEXTURE_2D,c),l.pixelStorei(l.UNPACK_ALIGNMENT,1),l.texImage2D(l.TEXTURE_2D,0,l.R8,e,t,0,l.RED,l.UNSIGNED_BYTE,a),l.pixelStorei(l.UNPACK_ALIGNMENT,4);for([o,r]of[[l.TEXTURE_MIN_FILTER,l.NEAREST],[l.TEXTURE_MAG_FILTER,l.NEAREST],[l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE],[l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE]])l.texParameteri(l.TEXTURE_2D,o,r);return c},k.floatTexture=(e,t)=>{var a,o,r=k.gl,l=r.createTexture();r.bindTexture(r.TEXTURE_2D,l),r.texImage2D(r.TEXTURE_2D,0,r.RGBA32F,e,t,0,r.RGBA,r.FLOAT,null);for([a,o]of[[r.TEXTURE_MIN_FILTER,r.NEAREST],[r.TEXTURE_MAG_FILTER,r.NEAREST],[r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE],[r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE]])r.texParameteri(r.TEXTURE_2D,a,o);return l},k.setFloat=(e,t,a,o)=>{var r=k.gl;r.bindTexture(r.TEXTURE_2D,e),r.texSubImage2D(r.TEXTURE_2D,0,0,0,t,a,r.RGBA,r.FLOAT,o)},k.canvasTexture=()=>{var e=k.gl,t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t},k.upload=(e,t)=>{var a=k.gl;a.bindTexture(a.TEXTURE_2D,e),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1)}}var ie,se,fe;(se=ze.shaders=ze.shaders||{}).lib=`
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
`,se.relLib=`
vec3 bbody(float T){
vec3 l = vec3(.61, .55, .465), b = 1. / (l * l * l * l * l * (exp(min(14388. / (l * max(T, 300.)), 80.)) - 1.));
return b / max(max(b.r, b.g), b.b);
}
float camShift(float rs, vec3 cam){ return inversesqrt(max(1. - rs / length(cam), .05)); }
float gasShift(vec3 p, vec3 k, float rs, float gc){
float b = sqrt(rs / (2. * max(length(p.xz) - rs, .01))), cs = dot(normalize(vec3(p.z, 0., -p.x)), k);
return sqrt(1. - b * b) / (1. - b * cs) * sqrt(max(1. - rs / length(p), 0.)) * gc;
}
float beam(float g){ float b = g * g * g; return b * 1.06 / (1. + .06 * b); }
vec3 skyShift(float g){ return bbody(5500. * g) / bbody(5500.) * beam(g); }
`,se.noiseLib=`
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
`,se.sceneHead=`#version 300 es
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
`+se.lib+se.noiseLib+`
vec3 rayDir(){ vec2 uv = (2. * gl_FragCoord.xy - uRes) / uRes.y; return normalize(uCamRot * vec3(uv * uTanHalf, 1.)); }
#define ZERO (uTime < -1e9 ? 1 : 0)
float dither(){ return hash21(gl_FragCoord.xy + fract(uTime * 7.13) * 91.); }
`,se.partHead=`#version 300 es
precision highp float;
uniform mat4 uVP;
uniform vec3 uCamPos;
uniform float uPx, uTime, uLocal, uKick, uSnare, uMirror, uCount;
uniform vec4 uP0, uP1, uP2, uP3;
out vec3 vCol;
`+se.lib+se.noiseLib+`
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
`,se.partFS=`#version 300 es
precision highp float;
in vec3 vCol; out vec4 o;
void main(){ vec2 c = gl_PointCoord * 2. - 1.; float d = dot(c, c); if (d > 1.) discard; float f = 1. - d; o = vec4(vCol * f * f * 1.6, 1.); }
`,(se=ze.shaders).trail=(ie=`#version 300 es
precision highp float;
out vec4 o;
`)+`
uniform sampler2D uCur, uPrev; uniform vec2 uRes; uniform float uDecay;
void main(){ vec2 uv = gl_FragCoord.xy / uRes; vec3 c = texture(uCur, uv).rgb, p = texture(uPrev, uv).rgb * uDecay; o = vec4(max(c, p), 1.); }`,se.god=ie+`
uniform sampler2D uSrc; uniform vec2 uRes, uLight; uniform float uThresh, uLen;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
vec2 uv = gl_FragCoord.xy / uRes;
vec2 d = (uLight - uv) * uLen / 48.;
vec2 p = uv + d * h(gl_FragCoord.xy);
vec3 acc = vec3(0); float w = 1.;
for (int i = 0; i < 48; i++){ vec3 c = texture(uSrc, p).rgb; acc += max(c - uThresh, 0.) * w; w *= .955; p += d; }
o = vec4(acc / 16., 1.);
}`,se.bloomPre=ie+`
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
}`,se.down=ie+`
uniform sampler2D uSrc; uniform vec2 uRes, uTexel;
vec3 q(vec2 uv){ return texture(uSrc, uv).rgb; }
void main(){
vec2 uv = gl_FragCoord.xy / uRes, t = uTexel;
vec3 a = q(uv + t * vec2(-2, 2)), b = q(uv + t * vec2(0, 2)), c = q(uv + t * vec2(2, 2));
vec3 d = q(uv + t * vec2(-2, 0)), e = q(uv), f = q(uv + t * vec2(2, 0));
vec3 g = q(uv + t * vec2(-2, -2)), h = q(uv + t * vec2(0, -2)), i = q(uv + t * vec2(2, -2));
vec3 j = q(uv + t * vec2(-1, 1)), k = q(uv + t * vec2(1, 1)), l = q(uv + t * vec2(-1, -1)), m = q(uv + t * vec2(1, -1));
o = vec4(e * .125 + (a + c + g + i) * .03125 + (b + d + f + h) * .0625 + (j + k + l + m) * .125, 1.);
}`,se.up=ie+`
uniform sampler2D uSrc; uniform vec2 uRes, uTexel; uniform float uRadius;
vec3 q(vec2 uv){ return texture(uSrc, uv).rgb; }
void main(){
vec2 uv = gl_FragCoord.xy / uRes, t = uTexel * uRadius;
vec3 s = q(uv) * 4. + (q(uv + vec2(t.x, 0)) + q(uv - vec2(t.x, 0)) + q(uv + vec2(0, t.y)) + q(uv - vec2(0, t.y))) * 2.
+ q(uv + t) + q(uv - t) + q(uv + vec2(t.x, -t.y)) + q(uv + vec2(-t.x, t.y));
o = vec4(s / 16., 1.);
}`,se.mixer=ie+`
uniform sampler2D uA, uB; uniform vec2 uRes; uniform float uT;
void main(){ vec2 uv = gl_FragCoord.xy / uRes; o = vec4(mix(texture(uA, uv).rgb, texture(uB, uv).rgb, uT), 1.); }`,se.fsrIn=ie+(fe=`
#define sat(x) clamp(x, 0., 1.)
float luma(vec3 c){ return dot(c, vec3(.25, .5, .25)); }
vec3 enc(vec3 c){ c = clamp(c, 0., 64.); return sqrt(c / (1. + c)); }
vec3 dec(vec3 p){ vec3 x = min(p * p, 64. / 65.); return x / (1. - x); }
`)+`
uniform sampler2D uSrc;
void main(){ vec3 p = enc(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).rgb); o = vec4(p, luma(p)); }`,se.easu=ie+fe+`
uniform sampler2D uSrc; uniform vec2 uIn, uOut;
void edge(inout vec2 dir, inout float len, float w, float lA, float lB, float lC, float lD, float lE){
float dx = lD - lB, dy = lE - lA;
float lx = sat(abs(dx) / max(max(abs(lD - lC), abs(lC - lB)), 1e-5)), ly = sat(abs(dy) / max(max(abs(lE - lC), abs(lC - lA)), 1e-5));
dir += vec2(dx, dy) * w;
len += (lx * lx + ly * ly) * w;
}
void tap(inout vec3 aC, inout float aW, vec2 off, vec2 dir, vec2 len2, float lob, float clp, vec3 c){
vec2 v = vec2(dot(off, dir), dot(off, vec2(-dir.y, dir.x))) * len2;
float d2 = min(dot(v, v), clp);
float wB = .4 * d2 - 1., wA = lob * d2 - 1.;
float w = (1.5625 * wB * wB - .5625) * (wA * wA);
aC += c * w; aW += w;
}
void main(){
vec2 pp = gl_FragCoord.xy * (uIn / uOut) - .5, fp = floor(pp);
pp -= fp;
ivec2 p = ivec2(fp), hi = ivec2(uIn) - 1;
#define T(x, y) texelFetch(uSrc, clamp(p + ivec2(x, y), ivec2(0), hi), 0)
vec4 b = T(0, -1), c = T(1, -1), e = T(-1, 0), f = T(0, 0), g = T(1, 0), h = T(2, 0);
vec4 i = T(-1, 1), j = T(0, 1), k = T(1, 1), l = T(2, 1), n = T(0, 2), m = T(1, 2);
vec2 dir = vec2(0); float len = 0.;
edge(dir, len, (1. - pp.x) * (1. - pp.y), b.a, e.a, f.a, g.a, j.a);
edge(dir, len, pp.x * (1. - pp.y), c.a, f.a, g.a, h.a, k.a);
edge(dir, len, (1. - pp.x) * pp.y, f.a, i.a, j.a, k.a, n.a);
edge(dir, len, pp.x * pp.y, g.a, j.a, k.a, l.a, m.a);
float r2 = dot(dir, dir);
dir = r2 < 1. / 131072. ? vec2(1, 0) : dir * inversesqrt(r2);
len *= .5; len *= len;
float stretch = 1. / max(abs(dir.x), abs(dir.y));
vec2 len2 = vec2(1. + (stretch - 1.) * len, 1. - .5 * len);
float lob = .5 - .29 * len, clp = 1. / lob;
vec3 aC = vec3(0); float aW = 0.;
tap(aC, aW, vec2(0, -1) - pp, dir, len2, lob, clp, b.rgb);
tap(aC, aW, vec2(1, -1) - pp, dir, len2, lob, clp, c.rgb);
tap(aC, aW, vec2(-1, 1) - pp, dir, len2, lob, clp, i.rgb);
tap(aC, aW, vec2(0, 1) - pp, dir, len2, lob, clp, j.rgb);
tap(aC, aW, -pp, dir, len2, lob, clp, f.rgb);
tap(aC, aW, vec2(-1, 0) - pp, dir, len2, lob, clp, e.rgb);
tap(aC, aW, vec2(1, 1) - pp, dir, len2, lob, clp, k.rgb);
tap(aC, aW, vec2(2, 1) - pp, dir, len2, lob, clp, l.rgb);
tap(aC, aW, vec2(2, 0) - pp, dir, len2, lob, clp, h.rgb);
tap(aC, aW, vec2(1, 0) - pp, dir, len2, lob, clp, g.rgb);
tap(aC, aW, vec2(1, 2) - pp, dir, len2, lob, clp, m.rgb);
tap(aC, aW, vec2(0, 2) - pp, dir, len2, lob, clp, n.rgb);
o = vec4(clamp(aC / aW, min(min(f.rgb, g.rgb), min(j.rgb, k.rgb)), max(max(f.rgb, g.rgb), max(j.rgb, k.rgb))), 1.);
}`,se.rcas=ie+fe+`
uniform sampler2D uSrc; uniform float uSharp;
void main(){
ivec2 p = ivec2(gl_FragCoord.xy), hi = textureSize(uSrc, 0) - 1;
#define T(x, y) texelFetch(uSrc, clamp(p + ivec2(x, y), ivec2(0), hi), 0).rgb
vec3 b = T(0, -1), d = T(-1, 0), e = T(0, 0), f = T(1, 0), h = T(0, 1);
float bL = luma(b), dL = luma(d), eL = luma(e), fL = luma(f), hL = luma(h);
float rng = max(max(max(bL, dL), max(eL, fL)), hL) - min(min(min(bL, dL), min(eL, fL)), hL);
float nz = 1. - .5 * sat(abs(.25 * (bL + dL + fL + hL) - eL) / max(rng, 1e-5));
vec3 mn4 = min(min(b, d), min(f, h)), mx4 = max(max(b, d), max(f, h));
vec3 hitMin = min(mn4, e) / max(4. * mx4, 1e-5), hitMax = (1. - max(mx4, e)) / min(4. * mn4 - 4., -1e-5);
vec3 lobe3 = max(-hitMin, hitMax);
float lobe = max(-.1875, min(max(lobe3.r, max(lobe3.g, lobe3.b)), 0.)) * uSharp * nz;
o = vec4(dec((lobe * (b + d + f + h) + e) / (4. * lobe + 1.)), 1.);
}`,se.final=ie+`
uniform sampler2D uScene, uBloom, uText, uGod;
uniform vec2 uRes;
uniform float uTime, uExposure, uBloomAmt, uFlash, uFade, uGlitch, uCA, uGrain, uScan, uVig, uPixel, uBits, uSat, uCRT, uGodAmt, uTextAmt, uContrast;
uniform vec3 uTint, uFlashCol, uLift;
`+se.lib+`
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
vec2 td = cc * (2.4 / uRes + uGlitch * .02);
vec4 tx = texture(uText, uv), tr = texture(uText, uv + td), tb = texture(uText, uv - td);
col = vec3(mix(col.r, tr.r, tr.a * uTextAmt), mix(col.g, tx.g, tx.a * uTextAmt), mix(col.b, tb.b, tb.a * uTextAmt));
col = mix(col, uFlashCol, sat(uFlash));
col *= 1. - uFade;
col *= 1. - uScan * (.5 + .5 * sin(frag.y * PI * .5));
col *= mix(1., smoothstep(1.25, .35, length(cc * vec2(1., .85)) * 1.5), uVig);
float g = hash21(frag + fract(uTime * 13.7) * 311.) - .5;
col += g * uGrain;
if (uBits > 0.){ float lv = exp2(uBits) - 1.; col = floor(col * lv + hash21(frag * 1.37) ) / lv; }
o = vec4(col * edge, 1.);
}`,(fe=ze.shaders).scenes={},fe.scenes.bang=`
vec3 nebCol(float n, vec3 p){ return mix(vec3(.85, .12, .55), vec3(.08, .45, 1.), smoothstep(.35, .7, n + p.y * .02)); }
float uQ1x(){ return uP2.x; }
float fbm4(vec3 p){ float a = .5, s = 0.; for (int i = 0; i < 4; i++){ s += a * noise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; } return s + .015625; }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = starfield(rd, .1, uP1.z) + nebula(rd, vec3(.25, .04, .35), vec3(.04, .18, .4), uTime * .01) * uP1.z * .4;
float R = uP0.x;
vec3 nrm = normalize(vec3(.25, 1., .1));
float tp = -dot(ro, nrm) / dot(rd, nrm), Tp = 1.;
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
float shell = smoothstep(1.2, .8, r) * mix(1., smoothstep(.2, .75, r), uP0.w);
if (shell * uP0.z <= 0.){ t += dt; continue; }
vec3 q = p / R * 2.2;
q += (tnoise(q * .8 + vec3(0., uLocal * .12, 0.)).xyz - .5) * 1.5;
float n = fbm4(q * 1.3 + vec3(0., 0., uLocal * .08));
float dens = max(n * 1.8 - .55 + (1. - r) * .3 * (1. - uP0.w), 0.) * shell * uP0.z;
if (dens > .001){
float temp = uP0.y * (1.25 - r * .8) + (n - .5) * .4;
vec3 e = mix(nebCol(n, p) * .5, heat(temp), smoothstep(.02, .25, uP0.y));
acc += T * e * dens * dt * (4. / R);
T *= exp(-dens * dt * (2.2 / R));
if (t < tp) Tp = T;
if (T < .01) break;
}
t += dt;
}
col = col * T + acc;
if (T < .01 && tp > t) Tp = 0.;
}
float hd = length(ro - rd * dot(ro, rd));
col += vec3(1., .92, .85) * inscatter(ro, rd, vec3(0), 100.) * uP1.w * mix(1., exp(-hd * .35), uQ1x());
if (tp > 0.){
vec3 P = ro + rd * tp;
float rr = length(P);
float ring = exp(-abs(rr - uP1.x) * 5. / (1. + uP1.x * .15)) * uP1.y * (.5 + .7 * noise(P * 1.5));
col += vec3(.65, .85, 1.2) * ring * Tp;
}
outColor = vec4(col, 1.);
}`,fe.scenes.space=`
void main(){
vec3 rd = rayDir();
vec3 col = starfield(rd, uP0.x, uP0.y) + nebula(rd, uP1.rgb, uP2.rgb, uTime * .01) * uP0.z;
col += uP3.rgb * pow(max(dot(rd, normalize(-uCamPos)), 0.), 6.) * uP3.w;
outColor = vec4(col, 1.);
}`,fe.scenes.mind=`
float lvl, grw;
vec3 jackq;
float mapM(vec3 p){
vec3 q = p; float s = 1., d = 1e9, it = uP2.x;
lvl = 0.; grw = 1.;
float tw = .18 * sin(uP0.x) + uP0.y * .5 * sin(uTime * 3.);
for (int i = 0; i < 7; i++){
float fi = float(i), g = sat(it - fi + 1.);
if (g <= 0.) break;
g = g * g * (3. - 2. * g);
vec3 a = abs(q), a2 = a * a, m = max(a - 1.02 * g, 0.);
float r = .055 + .03 * (1. - g);
m *= m;
float st = sqrt(min(min(m.x + a2.y + a2.z, m.y + a2.x + a2.z), m.z + a2.x + a2.y)) - r * g;
float nd = length(q) - .2 * (.4 + .6 * g);
float e = min(st, nd) / s;
if (e < d){ d = e; lvl = fi; grw = g; jackq = q; }
q = a;
if (q.x < q.y) q.xy = q.yx;
if (q.x < q.z) q.xz = q.zx;
q.x -= 1.02;
q.yz = rot(tw + fi * .3) * q.yz;
q *= 2.; s *= 2.;
}
return d;
}
vec3 nrmM(vec3 p){ vec2 e = vec2(.0007, -.0007); return normalize(e.xyy * mapM(p + e.xyy) + e.yyx * mapM(p + e.yyx) + e.yxy * mapM(p + e.yxy) + e.xxx * mapM(p + e.xxx)); }
vec3 envM(vec3 r){ return mix(vec3(.004, .005, .012), vec3(.03, .05, .11), sat(r.y * .5 + .5)) + vec3(.5, .7, 1.) * pow(max(dot(r, normalize(vec3(.4, .8, .3))), 0.), 30.) * 2. + vec3(1., .5, .8) * pow(max(dot(r, normalize(vec3(-.6, -.2, -.7))), 0.), 12.) * .3; }
vec3 neuron(float l){ return mix(mix(vec3(.15, .55, 1.6), vec3(.9, .35, 1.5), sat(l / 5.)), vec3(1.6, 1.4, 1.2), uP0.z); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = vec3(.002, .003, .008) + starfield(rd, .05, .25);
float t = 0.; bool hit = false; vec3 glow = vec3(0);
vec2 bs = sphIntersect(ro, rd, 2.4);
if (bs.y > 0.){
t = max(bs.x, 0.);
for (int i = 0; i < 150; i++){
vec3 p = ro + rd * t;
float d = mapM(p);
glow += neuron(lvl) * exp(-d * 90.) * .0028 * (1. - lvl * .15);
if (d < .0004 * t){ hit = true; break; }
t += d * .9; if (t > bs.y) break;
}
}
if (hit){
vec3 p = ro + rd * t;
float l = lvl, g = grw; vec3 jq = jackq;
vec3 n = nrmM(p), rr = reflect(rd, n);
float fr = .05 + .95 * pow(1. - max(dot(-rd, n), 0.), 5.);
vec3 L1 = normalize(vec3(.5, .8, .3));
col = vec3(.015, .016, .02) * (.3 + max(dot(n, L1), 0.)) + envM(rr) * mix(vec3(.5, .55, .6), vec3(1.), fr) * .5;
float r = length(jq), along = max(max(abs(jq.x), abs(jq.y)), abs(jq.z));
float node = smoothstep(.24, .1, r);
float run = exp(-pow((along - fract(uLocal * (1.2 + 2.5 * uP0.y) - l * .22) * 1.1) * 7., 2.));
float dim = 1. - l * .14;
col += neuron(l) * (node * (1.2 + 2.5 * uP2.y) + run * (.35 + 1.4 * uP2.y + uP0.y * .6) * (1. - node)) * dim;
col += vec3(1.5, 1.4, 1.3) * node * (1. - g) * 1.5;
col += vec3(1.6, 1.3, 1.) * uP0.z * uP0.z * 2. * exp(-length(p) * 2.5);
col = mix(col, vec3(.002, .003, .008), 1. - exp(-t * .06));
}
col += glow;
col += vec3(1., .9, .8) * inscatter(ro, rd, vec3(0), hit ? t : 30.) * (.004 + uP0.z * uP0.z * .2);
outColor = vec4(col, 1.);
}`,fe.shellLib=`
vec3 shellC;
vec3 ringLocal(vec3 p, float i, float spin){
p.xy = rot(hash11(i * 3.7) * 1.3 - .65) * p.xy;
p.xz = rot(hash11(i * 7.1) * PI) * p.xz;
p.yz = rot(hash11(i * 5.3) * .8 - .4) * p.yz;
float sp = (.12 + .07 * i) * (mod(i, 2.) < .5 ? 1. : -1.);
p.xz = rot(spin * sp) * p.xz;
return p;
}
uniform vec4 uGap;
bool inGap(){ return dot(shellC, uGap.xyz) > uGap.w; }
vec4 shellUV;
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
shellUV = vec4(du, dv, cellA * R * cos(lat) * .5, PI / NL * R * .5);
float lonc = (ci + .5) * cellA - PI;
shellC = vec3(cos(latc) * cos(lonc), sin(latc), cos(latc) * sin(lonc));
cid = vec2(band, ci);
return abs(r - R) - .05;
}
`,fe.scenes.dyson=fe.shellLib+`
float ringSeg(vec3 q, float R, float nseg){
float a = atan(q.z, q.x), seg = TAU / nseg;
float la = mod(a + seg * .5, seg) - seg * .5;
return abs(la) * R - (seg * .5 * R - .05);
}
float mat;
bool placed(vec2 cid){ return hash21(cid) <= uP0.x && !inGap(); }
float starR(){ return mix(1.7 * (1. + .25 * uP0.w), .02, pow(uP1.y, .6)); }
float mapS(vec3 p, float cut){
float r = length(p), dsh = 1e5;
if (abs(r - 6.5) - .05 < cut){
vec2 cid; float edge;
float ds = shellCell(p, cid, edge);
dsh = placed(cid) ? max(ds, .07 - edge) : max(ds, edge);
}
float d = 1e5, m = 0., lim = min(dsh, cut);
for (int i = 0; i < 4; i++){
float fi = float(i), R = 2.3 + fi * .85;
float b = abs(r - R) - .15;
if (b > lim || b >= d) continue;
vec3 q = ringLocal(p, fi, uP0.y);
float db = sdBox2(vec2(length(q.xz) - R, q.y), vec2(.14, .035));
if (db > lim || db >= d) continue;
float dr = max(db, ringSeg(q, R, 18. + fi * 6.));
if (dr < d){ d = dr; m = 1. + fi * .01; }
}
if (dsh < d){ d = dsh; m = 2.; }
mat = m;
return d;
}
float collapseScale(){ return 1. - .9 * pow(uP1.y, 2.5); }
float mapD(vec3 p){
float sc = collapseScale();
vec3 q = p;
if (uP1.y > 0.) q.xz = rot(uP1.y * uP1.y * 4. / (.3 + length(p) * .2)) * q.xz;
float ds = length(p) - starR();
float d = mapS(q / sc, ds / sc + 1e-4) * sc;
float m = mat;
if (ds < d){ d = ds; m = 0.; }
mat = m;
return d;
}
vec3 normD(vec3 p){ vec3 n = vec3(0); for (int i = ZERO; i < 3; i++){ vec3 e = vec3(0); e[i] = .002; n[i] = mapD(p + e) - mapD(p - e); } return normalize(n); }
vec3 starCol(){ return mix(vec3(1., .72, .4), vec3(1., .18, .05), uP0.w); }
float prom(vec3 p){
float R = starR(), g = 0.;
for (int i = 0; i < 3; i++){
float fi = float(i);
vec3 dir = normalize(vec3(sin(fi * 2.4 + .7), .55 - fi * .5, cos(fi * 2.4 + .7)));
vec3 ax = normalize(cross(dir, vec3(.3, 1., .2))), bx = cross(dir, ax);
vec3 q = p - dir * R * .97;
float r = R * (.32 + .06 * sin(uTime * .7 + fi * 2.)), h = dot(q, dir);
vec2 lp = vec2(dot(q, ax), h);
float d = length(vec2(length(lp) - r, dot(q, bx)));
float wisp = .5 + noise(p * 6. + vec3(0, uTime * .4, fi * 7.));
g += exp(-d * (14. / R)) * step(0., h) * wisp;
}
return g;
}
vec3 worley(vec3 p){
vec3 i = floor(p), f = fract(p);
float d1 = 8., d2 = 8., h1 = 0.;
for (int z = -1; z <= 1; z++) for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++){
vec3 g = vec3(x, y, z), h = hash33(i + g), r = g + .5 + .4 * sin(uTime * (.5 + h * .9) + h.yzx * TAU) - f;
float d = dot(r, r);
if (d < d1){ d2 = d1; d1 = d; h1 = h.x; } else if (d < d2) d2 = d;
}
return vec3(sqrt(vec2(d1, d2)), h1);
}
vec3 photosphere(vec3 p, vec3 rd){
vec3 s = normalize(p);
float mu = max(dot(s, -rd), 0.), a = uLocal * (.06 + .025 * (1. - s.y * s.y));
s.xz = vec2(s.x * cos(a) - s.z * sin(a), s.x * sin(a) + s.z * cos(a));
vec3 q = s * 17. + (tnoise(s * 4. + uTime * .09).xyz - .5) * 2.4;
vec3 w = worley(q);
float gran = smoothstep(.02, .3, w.y - w.x) * (1.1 - .5 * w.x) * (.6 + .4 * sin(uTime * (1.1 + w.z) + w.z * TAU));
float sup = fbm3(s * 3.5 + uTime * .05), sn = fbm3(s * 2.1 + vec3(3.7, 3.7, 3.7 + uTime * .04));
float spots = smoothstep(.62, .7, sn), pen = smoothstep(.54, .62, sn);
float flare = smoothstep(.48, .54, sn) * (1. - pen) * pow(max(sin(uTime * 1.3 + fbm3(s * 6.) * 9.), 0.), 12.) * 2.5;
float I = (.35 + 1.5 * gran) * (.7 + .6 * sup) * (1. - .6 * pen) * (1. - .92 * spots) * (1. + .12 * uKick) + flare;
vec3 hot = mix(starCol() * vec3(1., .42, .12), starCol() * vec3(1., .82, .55), sat(I * .55));
return hot * I * (.25 + .75 * pow(mu, .4)) * mix(vec3(1., .55, .35), vec3(1.), pow(mu, .3)) * 3.;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = starfield(rd, .12, .9) + nebula(rd, vec3(.18, .03, .25), vec3(.03, .15, .3), uTime * .01) * .3;
float t = 0., pg = 0.; bool hit = false;
vec2 bs = sphIntersect(ro, rd, 6.7);
if (bs.y > 0.){
t = max(bs.x, 0.);
for (int i = 0; i < 160; i++){
vec3 q = ro + rd * t;
float d = mapD(q);
if (dot(q, q) < starR() * starR() * 2.6) pg += prom(q) * min(d, .08);
if (d < .0008 * t){ hit = true; break; }
t += d; if (t > bs.y) break;
}
}
float sp = uP0.z, lights = uP1.z;
col += vec3(1.5, .38, .2) * pg * 3. * sp;
float tc = max(-dot(ro, rd), 0.), dc = length(ro), R = starR();
if (!hit || tc < t){
vec3 cp = ro + rd * tc;
float b = length(cp);
if (b > R * .98){
float str = .55 + .9 * fbm3(normalize(cp) * 3. + vec3(0, 0, uTime * .08));
col += starCol() * (exp(-(b - R) / (R * (.04 + .1 * str))) * .9 + exp(-(b - R) / (R * .5)) * .05) * str * sp * smoothstep(R * 3., R * 5.5, dc);
}
}
if (hit){
vec3 p = ro + rd * t;
float m = mat;
float px = t * uTanHalf * 2. / uRes.y;
if (m < .5) col = photosphere(p, rd) * sp * (1. + uP1.x * .4);
else {
vec3 n = normD(p), L = normalize(-p);
float dif = max(dot(n, L), 0.), fall = 1. / (1. + dot(p, p) * .06);
float sc = collapseScale();
vec3 pp = p; pp.xz = rot(uP1.y * uP1.y * 4. / (.3 + length(p) * .2)) * pp.xz; pp /= sc;
if (m < 1.5){
float ri = floor((m - 1.) * 100. + .5);
vec3 q = ringLocal(pp, ri, uP0.y);
float a = atan(q.z, q.x);
float outer = smoothstep(px * 1.5 + .015, .0, abs(q.y) - .02) * step(0., length(q.xz) - (2.3 + ri * .85) + .1);
col = vec3(.05, .045, .04) * starCol() * dif * fall * sp * 6. + vec3(.004, .005, .008);
col += starCol() * pow(max(dot(reflect(rd, n), L), 0.), 30.) * fall * sp * 2.;
col += vec3(.2, .8, 1.5) * outer * (.25 + 1.5 * pow(.5 + .5 * sin(a * 20. - uTime * 6.), 8.)) * lights;
} else {
vec2 cid; float edge;
shellCell(pp, cid, edge);
vec4 uv = shellUV;
bool outside = dot(n, p) > 0.;
if (!placed(cid)){
col = vec3(.05, .045, .04) * starCol() * (dif * fall * sp * 5. + .05) + vec3(.003, .004, .007);
col += vec3(.2, .8, 1.5) * .06 * lights * (outside ? 1. : 0.);
} else if (outside){
vec2 g = abs(fract(uv.xy / (uv.zw * 2.) * 5. + .5) - .5);
float cells = smoothstep(px * 1.2 + .01, .01, min(g.x, g.y) * (uv.z * 2. / 5.));
col = vec3(.01, .014, .028) + vec3(.03, .05, .09) * cells * .5;
float frame = smoothstep(.1 + px, .1, edge);
col = mix(col, vec3(.07, .05, .025) * (.4 + .6 * starCol() * sp), frame);
float lat = asin(clamp(p.y / length(p), -1., 1.)), lon = atan(p.z, p.x);
float flow = pow(.5 + .5 * sin(lon * 6. + lat * 3. - uTime * 2.5), 16.);
float seam = smoothstep(px + .012, .0, edge - .075) * min(1., .025 / (px + .012));
col += vec3(.2, .8, 1.5) * seam * (.18 + 1.3 * flow + uP1.x * .9) * lights;
float hc = hash21(cid);
col += vec3(.7, 1.1, 1.6) * step(uP3.x, hc) * sat((hc - uP3.x) / max(uP0.x - uP3.x, 1e-4)) * 1.2 * lights;
vec2 cn = abs(uv.xy) - uv.zw + .22;
float lit = step(.55, hash21(cid * 1.7 + floor(uTime * 2. + hash21(cid) * 3.)));
col += vec3(.5, 1.2, 1.6) * smoothstep(.05 + px, .02, length(cn)) * lit * lights * step(0., cn.x * cn.y);
vec3 rr = reflect(rd, n);
float fr = .04 + .5 * pow(1. - max(dot(-rd, n), 0.), 5.);
col += (starfield(rr, .12, .6) * .4 + nebula(rr, vec3(.18, .03, .25), vec3(.03, .15, .3), uTime * .01) * .15) * fr * (1. - frame);
} else {
col = starCol() * (vec3(.5, .42, .34) * dif * 2.6 + .06) * sp * (1. + uP1.w * .5);
col *= .7 + .3 * smoothstep(.0, .1, edge - .07);
}
}
}
col = mix(col, vec3(0), 1. - exp(-t * .01));
}
col += starCol() * inscatter(ro, rd, vec3(0), hit ? t : 100.) * sp * (.18 + .22 * uP1.w) * sat((dc - R) / (4. * R));
outColor = vec4(col, 1.);
}`,fe.scenes.hole=fe.relLib+`
vec4 neb(vec3 p, float r){
if (r > 21. || r < 1.2) return vec4(0);
float H = mix(5.5, .25 + r * .05, uP2.y);
float shape = exp(-p.y * p.y / (H * H)) * smoothstep(21., 11., r) * smoothstep(1.6, 3.5, r);
if (shape * uP2.x < 1e-6) return vec4(0);
vec3 q = p;
q.xz = rot(uP2.z * 1.8 / (.4 + r * .22)) * q.xz;
float n = fbm3(q * .28 + vec3(1.7, 0., uP2.z * .04));
float dens = max(n * 1.7 - .62, 0.) * shape * uP2.x;
float hot = smoothstep(11., 2.5, r) * uP2.y;
vec3 c = mix(mix(vec3(.55, .15, .7), vec3(.1, .45, .9), n), vec3(1.4, .55, .18), hot);
return vec4(c * (1. + 2. * hot + 3. * uP1.y), dens);
}
float fbmL(vec3 p, float fp){
float a = .5, s = 0., f = 1.;
for (int i = 0; i < 5; i++){ s += a * mix(.5, noise(p), smoothstep(1., 2.5, 1. / (f * fp))); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; f *= 2.03; }
return s;
}
vec4 disk(vec3 p, vec3 v, float fp, float gc){
float r = length(p.xz);
float rin = 2.6 * uP0.w, rout = 12.;
if (r < rin || r > rout) return vec4(0);
float ang = atan(p.z, p.x) + uTime * 1.4 * pow(r, -1.5) * 3.;
vec3 q = vec3(cos(ang) * r, sin(ang) * r, r * .3);
float n = fbmL(q * 1.1, fp * 1.1) * .6 + fbmL(vec3(r * 2.5, ang * 2., 1.), fp * max(2.5, 2. / r)) * .6;
float temp = pow(rin / r, .9), g = gasShift(p, -v, uP0.w, gc);
vec3 hot = bbody(5500. * pow(rin / r, .75) * g);
float edge = smoothstep(rin, rin + .4, r) * smoothstep(rout, rout - 5., r);
float dens = sat(n * 1.4 - .25) * edge;
return vec4(hot * beam(g) * (1.5 + 5. * temp) * dens * uP0.x, dens * .9);
}
void main(){
vec3 ro = uCamPos, v = rayDir();
vec3 p = ro;
float rs = uP0.w, gc = camShift(rs, ro);
vec3 hcr = cross(p, v);
float h2 = dot(hcr, hcr);
vec3 col = vec3(0); float alpha = 0., trav = 0.;
float lens = 1. + .6 * rs / max(sqrt(h2) - 2.598 * rs, .02 * rs), pxa = uTanHalf * 2. / uRes.y;
bool fell = false;
for (int i = 0; i < 260; i++){
float r2 = dot(p, p), r = sqrt(r2);
if (r < rs){ fell = true; break; }
float dt = clamp(.09 * (r - rs * .9), .015, r < 21. && uP2.x > .01 ? .45 : 1.2);
if (uP2.x > .01 && r < 21.){
vec4 nb = neb(p, r);
if (nb.a > 0.){ float a = 1. - exp(-nb.a * dt * .22); col += (1. - alpha) * nb.rgb * nb.a * dt * .075; alpha += (1. - alpha) * a; }
}
vec3 acc = -1.5 * rs * h2 * p / (r2 * r2 * r);
vec3 pn = p + v * dt;
v = normalize(v + acc * dt);
if (p.y * pn.y < 0.){
vec3 hp = mix(p, pn, p.y / (p.y - pn.y));
vec4 dk = disk(hp, v, (trav + dt * p.y / (p.y - pn.y)) * pxa * lens / pow(max(abs(v.y), .02), .7), gc);
col += (1. - alpha) * dk.rgb;
alpha += (1. - alpha) * dk.a;
}
p = pn; trav += dt;
if (r > 45. && dot(p, v) > 0.) break;
}
if (!fell){
vec3 bg = starfield(v, .14, 1.) + nebula(v, vec3(.15, .04, .1), vec3(.05, .05, .15), 0.) * .3;
col += (1. - alpha) * bg * skyShift(gc);
}
col += vec3(1., .95, .9) * inscatter(ro, rayDir(), vec3(0), 100.) * uP1.x;
outColor = vec4(col, 1.);
}`,fe.galaxyHD=[.31,.66,.42,.73],fe.galaxyLib=`
const vec4 HD = vec4(${fe.galaxyHD.join(", ")});
vec3 hue(float x){ return .55 + .45 * cos(TAU * (x + vec3(0., .33, .67))); }
void galaxyAxes(vec3 nz, out vec3 ex, out vec3 ey){ ex = normalize(cross(nz, abs(nz.z) < .9 ? vec3(0, 0, 1) : vec3(1, 0, 0))); ey = cross(nz, ex); }
float galaxyArms(vec4 h){ return 2. + floor(h.z * 3.); }
float galaxyWind(vec4 h){ return (h.w > .5 ? 1. : -1.) * (2. + h.y * 2.); }
vec3 galaxyCol(vec2 uv, vec4 h, float duv){
float r = length(uv), a = atan(uv.y, uv.x + 1e-6);
if (r > 1.) return vec3(0);
float arms = galaxyArms(h), wind = galaxyWind(h);
float sp = pow(.5 + .5 * cos(arms * (a + log(r + .04) * wind) - uTime * .15), 3.);
float dust = .55 + .45 * noise(vec3(uv * 9., h.x * 30.));
float spiral = h.x < .62 ? 1. : 0.;
float dens = exp(-r * 11.) * 1.6 + (spiral * sp * exp(-r * 2.4) * dust * 1.5 + (1. - spiral) * exp(-r * 4.) * .7) * smoothstep(1., .7, r);
vec3 c = mix(vec3(1., .85, .7), hue(h.z), smoothstep(.05, .4, r));
float stars = 0.;
for (int l = 0; l < 2; l++){
float sc = l == 0 ? 70. : 190., cpx = 1. / (sc * duv);
float vis = smoothstep(1.5, 4., cpx);
vec2 ci = floor(uv * sc), sf = fract(uv * sc) - .5 - (hash22(ci + h.y * 50.) - .5) * .6;
stars += (step(.95, hash21(ci + h.y * 50. + float(l) * 7.)) * exp(-dot(sf, sf) * 60.) * vis + .0013 * (1. - vis)) * (l == 0 ? 1.6 : 1.);
}
return c * dens + vec3(.9, .95, 1.) * stars * smoothstep(1., .4, r);
}
`,fe.scenes.galaxy=fe.galaxyLib+`
uniform vec3 uGN, uGX, uGY;
float cellPulse(vec4 h){ return uSnare; }
void main(){
vec3 ro = uCamPos, rd = rayDir(), rw = vec3(-rd.x, rd.y, -rd.z);
vec3 col = (starfield(rw, .1, .7) + nebula(rw, vec3(.12, .03, .16), vec3(.02, .07, .16), uTime * .01) * .25) * uP0.z;
float dn = dot(rd, uGN);
if (abs(dn) > 1e-4 && uP0.x > 0.){
float tg = -dot(ro, uGN) / dn;
if (tg > 0.){
vec3 q = ro + rd * tg;
vec2 uv = vec2(dot(q, uGX), dot(q, uGY)) / 3.4;
col += galaxyCol(uv, HD, tg * uTanHalf * 2. / uRes.y / 3.4 / max(abs(dn), .2)) * min(1. / abs(dn), 5.) * .35 * (.6 + 1.8 * cellPulse(HD)) * uP0.y * uP0.x;
}
}
outColor = vec4(col, 1.);
}`,fe.scenes.multi=fe.galaxyLib+`
uniform vec4 uDest, uDestN;
const float CELL = 6.;
float PXA;
vec4 cellH(vec3 id){ return hash4u(uint(int(id.x) * 73856093 ^ int(id.y) * 19349663 ^ int(id.z) * 83492791)); }
float cellPulse(vec4 h){ float g = floor(h.z * 4.); return g < 1. ? uKick : g < 2. ? uSnare : g < 3. ? uHat * .8 : uP2.x; }
vec4 bubble(vec3 id, vec4 h){
if (h.x < .74) return vec4(0);
float r = mix(1., 2.75, h.y * h.y);
vec3 o = (vec3(h.w, fract(h.w * 7.3 + h.z), fract(h.z * 5.1 + h.y)) - .5) * (CELL - 2. * r - .05);
return vec4((id + .5) * CELL + o, r);
}
vec3 film(vec3 n, vec3 rd, vec4 h, float r){
float c = min(abs(dot(n, rd)), 1.), fr = .02 + .98 * pow(1. - c, 4.);
float th = .45 + .3 * n.y + .55 * fbm3(n * 2.2 + vec3(h.y * 9., uTime * .15, h.w * 9.));
vec3 irid = .5 + .5 * cos(TAU * (th * 2.2 / (.55 + .45 * c)) + vec3(0., 2.1, 4.2));
vec3 L = normalize(vec3(.4, .7, -.5));
float glint = pow(max(dot(reflect(rd, n), L), 0.), 60.);
return irid * fr * 1.1 + vec3(1., .95, .9) * glint * .7;
}
vec3 galaxyN(vec4 h){
float u1 = fract(h.w * 13.7 + h.z) * 2. - 1., u2 = fract(h.y * 7.3 + h.w * 3.1) * TAU, sr = sqrt(1. - u1 * u1);
vec3 nz = vec3(sr * cos(u2), sr * sin(u2), u1);
return normalize(nz + vec3(0, 0, (nz.z < 0. ? -1. : 1.) * .9));
}
vec3 inside(vec3 ro, vec3 rd, vec4 b, vec4 h, float t0, float t1, vec3 nz){
float dn = dot(rd, nz);
if (abs(dn) < 1e-4) return vec3(0);
float tg = dot(b.xyz - ro, nz) / dn;
if (tg < t0 || tg > t1) return vec3(0);
vec3 q = ro + rd * tg - b.xyz, ex, ey;
galaxyAxes(nz, ex, ey);
vec2 uv = vec2(dot(q, ex), dot(q, ey)) / b.w;
if (dot(uv, uv) > 1.) return vec3(0);
return galaxyCol(uv, h, tg * PXA / b.w / max(abs(dn), .2)) * min(1. / abs(dn), 5.) * .35 * (.6 + 1.8 * cellPulse(h));
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
PXA = uTanHalf * 2. / uRes.y;
vec3 col = vec3(0), T = vec3(1);
vec3 id = floor(ro / CELL), sg = vec3(rd.x < 0. ? -1. : 1., rd.y < 0. ? -1. : 1., rd.z < 0. ? -1. : 1.);
vec3 dt = CELL / max(abs(rd), 1e-5), tM = ((id + max(sg, 0.)) * CELL - ro) * sg / max(abs(rd), 1e-5);
float tc = 0.;
vec3 od = ro - uDest.xyz;
float Bd = dot(od, rd), Dd = Bd * Bd - dot(od, od) + uDest.w * uDest.w;
bool dest = uDest.w > 0. && Dd > 0. && -Bd + sqrt(max(Dd, 0.)) > 0.;
float d0 = dest ? -Bd - sqrt(Dd) : 1e9, d1 = dest ? -Bd + sqrt(Dd) : 0.;
for (int i = 0; i < 64; i++){
if (dest && tc >= d0){
dest = false;
float fog = exp(-max(d0, 0.) * .028);
float pw = max(d0, .05) * PXA, cov = d0 > 0. ? smoothstep(0., 1.5 * pw, uDest.w - sqrt(max(dot(od, od) - Bd * Bd, 0.))) : 1.;
if (d0 > 0.){ col += T * film((ro + rd * d0 - uDest.xyz) / uDest.w, rd, HD, uDest.w) * fog * 1.3 * cov; T *= mix(vec3(1), vec3(.86, .88, .92), cov); }
col += T * inside(ro, rd, uDest, HD, max(d0, 0.), d1, uDestN.xyz) * fog * uDestN.w;
col += T * film(-(ro + rd * d1 - uDest.xyz) / uDest.w, rd, HD, uDest.w) * .6 * fog; T *= vec3(.9, .91, .94);
}
vec4 h = cellH(id), b = bubble(id, h);
if (b.w > 0. && uDest.w > 0. && length(b.xyz - uDest.xyz) < b.w + uDest.w + .3) b.w = 0.;
if (b.w > 0.){
vec3 oc = ro - b.xyz;
float B = dot(oc, rd), D = B * B - dot(oc, oc) + b.w * b.w;
if (D > 0.){
D = sqrt(D);
float t0 = -B - D, t1 = -B + D;
float fog = exp(-max(t0, 0.) * .028);
float pw = max(t0, .05) * PXA, e = b.w - sqrt(max(dot(oc, oc) - B * B, 0.));
float cov = t0 > 0. ? smoothstep(0., 1.5 * pw, e) : 1., lod = smoothstep(1.5, 6., b.w / pw) * cov;
if (t0 > 0.){ col += T * film((ro + rd * t0 - b.xyz) / b.w, rd, h, b.w) * fog * lod; T *= mix(vec3(1), vec3(.86, .88, .92), cov); }
if (t1 > 0.) col += T * inside(ro, rd, b, h, max(t0, 0.), t1, galaxyN(h)) * fog;
if (t1 > 0.){ col += T * film(-(ro + rd * t1 - b.xyz) / b.w, rd, h, b.w) * .6 * fog * lod; T *= mix(vec3(1), vec3(.9, .91, .94), cov); }
}
}
if (tM.x < tM.y && tM.x < tM.z){ tc = tM.x; id.x += sg.x; tM.x += dt.x; }
else if (tM.y < tM.z){ tc = tM.y; id.y += sg.y; tM.y += dt.y; }
else { tc = tM.z; id.z += sg.z; tM.z += dt.z; }
if (tc > 150. || T.g < .04) break;
}
vec3 sky = starfield(rd, .1, .7) + nebula(rd, vec3(.12, .03, .16), vec3(.02, .07, .16), uTime * .01) * .25;
col += T * sky;
col += vec3(.9, .85, 1.) * uP0.x * .5;
outColor = vec4(col, 1.);
}`,fe.scenes.earth=`
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
cl *= smoothstep(uP0.x * 2.4 - 1.05, uP0.x * 2.4 - .85, -dot(q, normalize(vec3(.3, .5, .8))));
float spec = pow(max(dot(reflect(rd, n), SUN), 0.), 80.) * (1. - isLand) * (1. - cl);
surf = mix(surf, vec3(.85), cl * .85);
col = surf * (dif * 1.5 + .004) + vec3(1., .85, .6) * spec * 1.5;
float spread = dot(q, normalize(vec3(.3, .5, .8))), wob = (fbm3(q * 4.) - .5) * .3;
float edgeAt = uP0.x * 2.4 - 1.2;
float cov = smoothstep(edgeAt, edgeAt - .15, -spread + wob);
float front = smoothstep(.1, .0, abs(-spread + wob - (edgeAt - .07)));
const float NB = 34.;
float lat = asin(clamp(q.y, -1., 1.)), lon = atan(q.z, q.x);
float yb = (lat + PI * .5) / PI * NB, band = floor(yb);
float nc = max(floor(cos((band + .5) / NB * PI - PI * .5) * NB * 2.), 3.);
float xb = (lon + PI) / TAU * nc;
vec2 c = vec2(floor(xb), band), f = vec2(fract(xb), fract(yb)) - .5;
float fw = hs.x * uTanHalf * 2. / uRes.y / (PI / NB) / max(dot(n, -rd), .25);
float ch = hash21(c + 37.);
vec2 half_ = vec2(.18 + .2 * hash21(c + 42.), .18 + .2 * hash21(c + 46.));
float box = sdBox2(f, half_), chip = step(.38, ch);
float rimL = smoothstep(fw * 1.5, 0., abs(box)) * chip * min(1., .06 / fw);
float lanes = (smoothstep(fw * 1.2, 0., abs(abs(f.x) - .5) - .015) + smoothstep(fw * 1.2, 0., abs(abs(f.y) - .5) - .015)) * min(1., .05 / fw);
float data = pow(fract(lon * 2.4 * (mod(band, 2.) < .5 ? 1. : -1.) - uTime * .9 + hash11(band * 1.7)), 24.) * 4. * smoothstep(.1, .5, abs(f.y));
vec3 acc = mix(vec3(.25, .85, 1.45), vec3(1.3, .35, 1.1), step(.86, ch));
acc = mix(acc, vec3(1.4, .85, .3), step(.94, ch));
float lit = step(.35, hash21(c + 37. + floor(uTime * 2. + ch * 8.) * .13));
vec3 city = vec3(.004, .005, .008) + acc * rimL * (.08 + lit * (.3 + 1.4 * pow(.5 + .5 * sin(uTime * 3. + ch * 40.), 6.)))
+ vec3(.2, .6, 1.1) * lanes * (.08 + data)
+ acc * step(box, 0.) * chip * .04 * (.5 + .5 * dif);
col = mix(col, city + surf * .02 * dif, cov);
col += vec3(.7, .95, 1.5) * front * (2. + 2. * pow(noise(q * 40. + uTime * 3.), 3.)) * (1. - cov * .3);
float fres = pow(1. - max(dot(n, -rd), 0.), 3.);
col += vec3(.25, .5, 1.) * fres * (dif * .9 + .02) * (1. - .7 * uP0.x);
float ra = acos(clamp(dot(q, normalize(vec3(.3, .5, .8))), -1., 1.));
col += vec3(1., .35, .85) * (exp(-ra * 120.) * 8. + exp(-ra * 28.) * .8) * uP0.w;
}
vec3 Rw = spin(-(uTime * .015 + 2.)) * normalize(vec3(.3, .5, .8)) * 1.012;
col += vec3(1., .35, .85) * inscatter(ro, rd, Rw, hs.x > 0. ? hs.x : 100.) * .0015 * uP0.w;
float tc = max(-dot(ro, rd), 0.);
vec3 pc = ro + rd * tc;
float hh = length(pc);
if (hh > 1. && (hs.x < 0. || true)){
float a = exp(-(hh - 1.) * 30.);
float l = dot(normalize(pc), SUN);
col += mix(vec3(1., .35, .1), vec3(.3, .55, 1.2), sat(l + .25)) * a * sat(l * .9 + .35) * 1.3 * (1. - .6 * uP0.x);
}
outColor = vec4(col, 1.);
}`,(ie=ze.shaders).particles={},ie.particles.bang=`
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
}`,ie.particles.vortex=`
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
float m = sat(uP0.w * 1.5 - hash11(float(ln) * .37) * .5);
m = m * m * (3. - 2. * m);
float taper = smoothstep(0., .12, u) * smoothstep(1., .75, u);
if (m > 0.){
float k = floor(hash11(float(ln) * .71 + 3.) * 6.), sgn = mod(k, 2.) < .5 ? 1. : -1.;
vec3 ax = k < 2. ? vec3(sgn, 0, 0) : k < 4. ? vec3(0, sgn, 0) : vec3(0, 0, sgn);
vec3 e1 = abs(ax.x) > .5 ? vec3(0, 1, 0) : vec3(1, 0, 0), e2 = cross(ax, e1);
float aa = hash11(float(id) * .113) * TAU, rr = .05 * sqrt(hash11(float(id) * .217));
vec3 J = ax * (.12 + u * .9) + (e1 * cos(aa) + e2 * sin(aa)) * rr;
pos = mix(pos, J, m);
col = mix(col, vec3(.3, .7, 1.6) * (.7 + .5 * h2.y), m);
fade = mix(fade, 1., m); taper = mix(taper, smoothstep(0., .05, u) * smoothstep(1., .9, u), m);
}
float flowHi = pow(fract(u * 2.5 - uTime * uP0.y * .6 + h2.y), 8.);
float vis = step(h2.z, uP0.x) * step(u, uP0.x * 1.6);
emit(pos, col * (.12 + flowHi * .9) * taper * fade * vis * mix(1., .3, m), .011);
}`,ie.particles.swarm=ie.shellLib+`
uniform vec4 uOcc, uRing;
bool hidden(vec3 p){
vec3 d = p - uCamPos;
float a = dot(d, d), b = dot(uCamPos, d), c = dot(uCamPos, uCamPos);
float h = b * b - a * (c - uOcc.x * uOcc.x);
if (h > 0.){ float s = (-b - sqrt(h)) / a; if (s > 0. && s < 1.) return true; }
if (uOcc.y <= 0.) return false;
if (uRing.w > 0.){
vec3 A = uCamPos, B = p;
A.xz = rot(uOcc.w / (.3 + length(A) * .2)) * A.xz; B.xz = rot(uOcc.w / (.3 + length(B) * .2)) * B.xz;
A /= uOcc.y; B /= uOcc.y;
for (int i = 0; i < 4; i++){
float fi = float(i);
vec3 ra = ringLocal(A, fi, uRing.x), rb = ringLocal(B, fi, uRing.x);
if (ra.y * rb.y >= 0.) continue;
vec3 x = mix(ra, rb, ra.y / (ra.y - rb.y));
if (abs(length(x.xz) - (2.3 + fi * .85)) < .14) return true;
}
}
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
if (hash21(cid) <= uOcc.z && edge > .07 && !inGap()) return true;
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
}`,ie.particles.dust=ie.relLib+`
void main(){
uint id = uint(gl_VertexID);
vec4 h = hash4u(id), h2 = hash4u(id ^ 0x5bd1e995u);
float r = mix(3., 13., sqrt(h.x)), a = h.y * TAU - uTime * 1.4 * pow(r, -1.5) * 3.;
vec3 p = vec3(cos(a) * r, (abs(gauss(h.zw)) * .012 + .004) * r, sin(a) * r);
vec3 d = p - uCamPos;
float s = clamp(-dot(uCamPos, d) / dot(d, d), 0., 1.), seen = step(2.8, length(uCamPos + d * s)) * smoothstep(5., 2., length(d));
vec3 dn = normalize(d);
float g = gasShift(p, -dn, uP0.w, camShift(uP0.w, uCamPos));
vec3 col = bbody(mix(2600., 4200., h2.x) * g) * beam(g);
emit(p, col * uP0.x * (.15 + .6 * pow(h2.y, 4.)) * seen, .006 + .012 * h2.z);
}`,ie.particles.embed=`
uniform vec4 uW[64], uK[8], uY[8], uMo;
uniform mat3 uM;
const vec3 TC[7] = vec3[7](vec3(1.6, .62, .95), vec3(1.6, .55, .1), vec3(1.3, 1.25, 1.15), vec3(1.7, .12, .1), vec3(1.7, .8, .08), vec3(1.15, 1.15, 1.2), vec3(.25, 1.2, .45));
vec3 grp(float g){
return g < .5 ? vec3(1.5, 1.05, .55) : g < 1.5 ? vec3(.3, .9, 1.5) : g < 2.5 ? vec3(1.4, .7, .35) : g < 3.5 ? vec3(.4, 1.4, .55)
: g < 4.5 ? vec3(1.1, .45, 1.5) : g < 5.5 ? vec3(.55, .65, .85) : g < 6.5 ? vec3(.3, 1.3, 1.1) : g < 7.5 ? vec3(1.5) : vec3(.45, .5, .8);
}
vec3 thing(int k, vec4 h, out vec3 p, out vec3 n, out float A){
float a = h.x * TAU, b = h.y * TAU, u = h.z;
vec2 e = vec2(cos(a), sin(a));
vec3 c;
if (k == 0){
n = vec3(cos(b) * e.x, sin(b), cos(b) * e.y); p = vec3(e.x, 0., e.y) * .3 + n * .13; A = 1.54 * (1. + .43 * cos(b));
c = mix(vec3(.75, .45, .2), vec3(1., .45, .65), smoothstep(.02, .05, p.y + .03 * noise(p * 20.)));
if (p.y > .05 && h.w > .93) c = pal(h.w * 14.3, vec3(.6), vec3(.4), vec3(1.), vec3(0., .33, .67));
} else if (k == 2){
if (u < .64){ n = vec3(e.x, 0., e.y); p = vec3(e.x * .25, h.y * .58 - .29, e.y * .25); A = .911 / .64; }
else if (u < .72){ n = vec3(0., 1., 0.); p = vec3(e.x, 0., e.y) * mix(.205, .25, h.y) + vec3(0., .29, 0.); A = .064 / .08; }
else if (u < .9){ n = -vec3(e.x, 0., e.y); p = vec3(e.x * .205, h.y * .24 + .05, e.y * .205); A = .309 / .18; }
else { n = vec3(cos(b) * e, sin(b)); p = vec3(.27 + .11 * e.x, .02 + .11 * e.y, 0.) + n * .028; A = .1216 / .1; }
c = vec3(.88, .87, .84);
} else if (k == 5){
if (u < .55){ n = vec3(0., 0., 1.); p = vec3(e * .34 * sqrt(h.y), .065); A = .363 / .55; }
else if (u < .85){ n = vec3(e, 0.); p = vec3(e * .34, h.y * .13 - .065); A = .278 / .3; }
else { n = vec3(0., 0., 1.); p = vec3((h.y - .5) * .36, h.w * .08 - .44, .1); A = .029 / .15; }
c = vec3(.03);
float r = length(p.xy), mm = 608. * TAU / 60.;
if (p.z > .03 && r < .3){
float ticks = step(.24, r) * step(r, .28) * step(.9, cos(atan(p.x, p.y) * 12.));
float hands = min(sdSeg(p.xy, vec2(0), vec2(sin(mm), cos(mm)) * .24) - .008, sdSeg(p.xy, vec2(0), vec2(sin(mm / 12.), cos(mm / 12.)) * .16) - .014);
c = mix(vec3(.9, .88, .82), vec3(.02), max(ticks, smoothstep(.01, 0., hands)));
}
} else if (k == 6){
if (u < .8){ n = vec3(e.x, 0., e.y); p = vec3(e.x * .15, h.y * .58 - .44, e.y * .15); A = .547 / .8; }
else if (u < .92){ float r = mix(.15, .05, h.y); n = normalize(vec3(e.x, .6, e.y)); p = vec3(e.x * r, .14 + h.y * .16, e.y * r); A = .12 / .12; }
else { n = vec3(e.x, 0., e.y); p = vec3(e.x * .047, .3 + h.y * .16, e.y * .047); A = .047 / .08; }
c = abs(p.y + .12) < .12 ? vec3(.85, .8, .65) : vec3(.04, .22, .1);
} else {
n = sphereDir(h.xy);
if (k == 1){
p = n * .3; A = 1.13;
vec3 q = n; q.xy = rot(.35) * q.xy; q.xz = rot(-.5) * q.xz;
float s = min(min(abs(q.x), abs(q.y)), abs(abs(q.x) - (.66 - .36 * q.y * q.y)));
c = mix(vec3(.025, .015, .01), vec3(.85, .3, .06), smoothstep(.03, .055, s));
} else if (k == 3){ p = n * .26 * vec3(1., .926, 1.); A = .8; c = mix(vec3(.7, .03, .03), vec3(.9, .6, .1), smoothstep(.55, .8, noise(vec3(atan(p.z, p.x) * 3., p.y * 4., 0.)))); }
else { p = n * .23; A = .665; c = vec3(1., .42, .04) * (.85 + .15 * noise(p * 70.)); }
}
return c;
}
bool hid(vec3 p, int k){
vec3 d = uY[7].xyz - p;
for (int j = 1; j < 5; j++){
vec3 o = p - uY[j].xyz;
if (j == 2){
float a = dot(d.xz, d.xz), b = dot(o.xz, d.xz), c = dot(o.xz, o.xz) - .0625, h = b * b - a * c;
if (h <= 0.) continue;
float s = (-b + (c < 0. ? 1. : -1.) * sqrt(h)) / a;
if (s > .002 && s < 1. && abs(o.y + d.y * s) < .29) return true;
} else if (j != k){
float b = dot(o, d), c = dot(o, o) - uY[j].w * uY[j].w, h = b * b - dot(d, d) * c;
if (h > 0. && -b > sqrt(h)) return true;
}
}
return false;
}
void main(){
int id = gl_VertexID;
if (id >= 65536){
int j = id - 65536, k = j >> 12;
vec4 h2 = hash4u(uint(j) ^ 0x6a09e667u);
float e = sat((uP1.x - h2.x * .3) / .7), f = 0.;
float jf = float(j & 4095);
vec4 r = hash4u(uint(j) + 7919u), h = vec4(fract(.5 + jf * vec2(.75487767, .56984029) + (r.xy - .5) * .02), (jf + .5) / 4096., r.z);
vec3 p, n, c, Py = vec3(0); float A;
if (e > 0.){ c = thing(k, h, p, n, A); Py = uY[k].xyz + p; f = dot(n, normalize(uY[7].xyz - Py)); }
if (f <= 0. || hid(Py, k)){ gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; vCol = vec3(0); return; }
c *= max(dot(n, normalize(vec3(-.5, .85, .45))), 0.) * vec3(1.3, 1.15, .95) + vec3(.12, .14, .2) * (.6 + .4 * n.y) + max(dot(n, normalize(vec3(.8, .3, -.6))), 0.) * vec3(.15, .2, .35);
c += TC[k] * .03;
e = e * e * (3. - 2. * e);
float s = 1. + 1.2 * (1. - uP1.y);
vec3 soft = vec3(gauss(h2.yz), gauss(h2.zw), gauss(h2.wy)) * .07 * (1. - uP1.y);
emit(uM * (uY[k].xyz + (p + soft) * e) + uMo.xyz, c * A * f * e * e * .41 / (s * s), .035 * s * uMo.w);
return;
}
if (id < 64){
vec4 w = uW[id];
float g = floor(w.w), v = fract(w.w) / .99;
vec3 c = grp(g) * v;
bool th = g > 7.5;
if (th) c = mix(grp(2.), TC[int(g) - 8], v) * (1. + 2.5 * v * (1. - v)) * (1. - smoothstep(0., .5, uP1.x));
emit(w.xyz, c * 1.6, th ? .085 + .025 * v : .085);
return;
}
vec4 h = hash4u(uint(id)), h2 = hash4u(uint(id) ^ 0x51ed27u);
int k = h.x < .34 ? 7 : int(floor((h.x - .34) / .66 * 7.));
vec4 K = uK[k];
vec3 p = K.xyz + vec3(gauss(h.yz), gauss(h.zw), gauss(h2.xy)) * K.w * (k == 7 ? 1. : .55 + .45 * h2.w);
float on = sat(uP0.x * 1.4 - h2.z * .4) * (k == 2 ? 1. - uP0.y : 1.);
vec3 col = grp(float(k)) * (k == 7 ? .1 : .22) * (.5 + .9 * pow(h.w, 3.)) * (.8 + .2 * sin(uTime * 3. + h2.y * 40.));
emit(p, col * on, .022);
}`,ie.particles.c64=ie.galaxyLib+`
uniform vec4 uMz[21];
uniform vec3 uGN, uGX, uGY;
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
vec4 g = hash4u(id * 7u + 5u);
float arms = galaxyArms(HD), wind = galaxyWind(HD), gr, ga;
if (g.x < .2){ gr = -log(max(g.y * g.z, 1e-7)) / 11.; ga = g.w * TAU; }
else {
gr = sqrt(g.y) * (.08 + .92 * -log(1. - g.z * .9) / 2.3);
ga = (TAU * floor(g.w * arms) + uTime * .15) / arms - log(gr + .04) * wind + gauss(vec2(fract(g.w * 7.13), h.w)) * .7 / arms;
}
gr = min(gr, .99);
vec3 G = (uGX * cos(ga) + uGY * sin(ga)) * gr * 3.4 + uGN * gauss(h.zw) * .015;
float k = float(r * 40 + c), arrive = 2.2 + k / 1000. * 3. + h.x * .25;
float u = sat((L - arrive + 1.5) / 1.5), e = u * u * u * (u * (u * 6. - 15.) + 10.);
vec3 swirl = vec3(sin(h.y * 6.28 + L * 2.1), cos(h.z * 6.28 + L * 1.7), sin(h.w * 6.28 + L * 1.3)) * .7 * sin(3.14159 * e);
vec3 pos = mix(G, T, e) + swirl;
vec3 gc = mix(vec3(1., .85, .7), hue(HD.z), smoothstep(.05, .4, gr)) * (g.x < .2 ? .05 : .3 + .25 * smoothstep(.1, .5, gr)) * uP0.w;
vec3 col = mix(gc, cT * 1.7, e);
float size = Hh / 100. * mix(2.4, 1.6, e);
if (uP0.z > 0.){
float x = uP0.z;
vec3 dir = normalize(vec3(T.xy * (.6 + h.xy), 1. + 3. * h.z));
pos = T + dir * (x * x * 7. + x * .3) * (.4 + h.w);
col = cT * 1.7 * (1. + x * 3.) + vec3(.4, .35, 1.) * x * x * 2.;
size *= 1. + x * 2.;
}
emit(pos, col * .55, size);
}`;{let t=ze.shaders,m=(t.segLib=`
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
`,t.scenes.crt=`
void main(){
vec2 px = 2. / uRes, q = (gl_FragCoord.xy - uRes * .5) * px;
float k = uRes.y / 1080.;
q -= uP1.xy * k * px;
vec2 h = max(uP0.xy, px * .7), a = abs(q);
vec2 cov = clamp((h - a) / px + .5, 0., 1.);
vec3 c = mix(vec3(.5, .45, 1.), vec3(.82, .86, 1.), sat(uP0.w + .6)) * uP0.z * cov.x * cov.y;
vec2 d = a / px / k;
float r = length(d), R = max(uP1.z, .5);
c += vec3(.75, .8, 1.) * uP0.z * uP0.w * (exp(-r * r / (R * R)) * .25 + exp(-r / (R * 2.)) * .03);
c += vec3(.6, .7, 1.) * uP0.z * uP0.w * uP1.w * (exp(-d.y * .9) * exp(-d.x / 260.) * .05 + exp(-d.x * .9) * exp(-d.y / 120.) * .02);
outColor = vec4(c, 1.);
}`,t.scenes.neuron=t.segLib+`
float lsize(int l){ return l == 0 ? 5. : l == 1 ? 7. : l == 2 ? 7. : 3.; }
vec3 npos(int l, float j){ float n = lsize(l); return vec3((float(l) - 1.5) * 1.75, (j - (n - 1.) * .5) * .52, 0.); }
float nodeVis(int l, float j){ return l == 0 || (l == 1 && j == 3.) ? 1. : uP0.x; }
const float NR = .1;
vec3 netGlow(vec3 ro, vec3 rd, float tmax){
vec3 col = vec3(0);
float fwd = uP0.y;
bool cr = abs(rd.z) > 1e-4 && ro.z * rd.z < 0.;
vec2 P = cr ? ro.xy - rd.xy * (ro.z / rd.z) : ro.xy;
float kz = cr ? abs(rd.z) : 0., dz = cr ? 0. : abs(ro.z);
float cut = .014 + 16. * ((length(ro) + 3.1) * uTanHalf * 2. / uRes.y * 1.2 + .004);
if (max(kz * length(max(abs(P) - vec2(2.625, 1.56), 0.)), dz) > max(cut, 1.1)) return col;
float tl = tmax;
for (int l = 0; l < 4; l++) for (float j = 0.; j < 7.; j++){
if (j >= lsize(l)) break;
vec3 p = npos(l, j);
if (nodeVis(l, j) < .5 || max(kz * length(P - p.xy), dz) > NR) continue;
vec2 hs = sphIntersect(ro - p, rd, NR * .9);
if (hs.x > 0.) tl = min(tl, hs.x);
}
for (int l = 0; l < 3; l++){
float na = lsize(l), nb = lsize(l + 1);
float xa = (float(l) - 1.5) * 1.75;
if (max(kz * length(max(abs(P - vec2(xa + .875, 0.)) - vec2(.875, (max(na, nb) - 1.) * .26), 0.)), dz) > cut) continue;
for (float i = 0.; i < 7.; i++){
if (i >= na) break;
for (float j = 0.; j < 7.; j++){
if (j >= nb) break;
float vis = min(nodeVis(l, i), nodeVis(l + 1, j));
if (vis < .01) continue;
vec3 a = npos(l, i), b = npos(l + 1, j), e = normalize(b - a) * NR;
a += e; b -= e;
if (max(kz * sdSeg(P, a.xy, b.xy), dz) > cut) continue;
float h, t;
float d = raySeg(ro, rd, a, b, h, t);
if (t > tl) continue;
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
if (max(kz * length(P - p.xy), dz) > 1.1) continue;
float d = rayPoint(ro, rd, p, t);
if (t > tmax) continue;
float act = .4 + .6 * step(.4, hash21(vec2(j + float(l) * 9., floor(fwd * 2.))));
float fire = l == 1 && j == 3. ? uP0.w : 0.;
col += mix(vec3(.6, .9, 1.3), vec3(1.4, 1.2, 1.), fire) * (smoothstep(.1, .075, d) * (1. + fire * 3.) * act + exp(-d * 14.) * .25 * (1. + fire * 4.)) * vis;
}
}
if (uP0.x < 1. && max(kz * sdSeg(P, npos(1, 3.).xy, npos(1, 3.).xy + vec2(1.2, 0.)), dz) < .3){
float h, t;
float d = raySeg(ro, rd, npos(1, 3.) + vec3(NR, 0., 0.), npos(1, 3.) + vec3(1.2, 0., 0.), h, t);
if (t < tl) col += vec3(1., .95, .8) * exp(-d * 60.) * (.3 + uP0.w * 2.5 * exp(-pow((h - fract(uLocal * 1.) ) * 6., 2.))) * (1. - uP0.x);
}
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
}`,[[0,.95,-.3,.85,-.5,.5,-.55,0,-.48,-.5,-.28,-.85,0,-.95,.28,-.85,.48,-.5,.55,0,.48,.5,.12,.97],[-.3,.6,.08,.95,.08,-.95],[-.48,.55,-.3,.85,.05,.96,.38,.82,.47,.48,.3,.1,-.1,-.35,-.5,-.92,-.05,-.9,.55,-.93],[-.45,.78,-.1,.96,.3,.9,.45,.62,.3,.3,-.12,.1,.3,-.08,.47,-.45,.35,-.82,0,-.96,-.3,-.9,-.5,-.7],[.28,-.95,.28,.95,-.55,-.35,.6,-.35],[.5,.92,-.3,.92,-.42,.12,-.05,.25,.3,.18,.5,-.15,.47,-.6,.2,-.92,-.2,-.95,-.5,-.75],[.38,.95,.05,.7,-.28,.3,-.47,-.2,-.45,-.62,-.2,-.92,.15,-.93,.43,-.65,.42,-.28,.12,-.08,-.25,-.15,-.45,-.4],[-.5,.88,.1,.92,.55,.92,.2,.2,-.12,-.95],[0,0,-.35,.35,-.3,.78,.05,.96,.38,.75,.35,.35,0,0,-.45,-.4,-.3,-.85,.1,-.95,.45,-.6,0,0],[.42,.5,.2,.9,-.15,.93,-.43,.65,-.38,.25,-.05,.12,.3,.25,.42,.5,.38,-.1,.25,-.95]]),e=(t.digitSeq=[7,2,1,0,4,1,4,9,5,9,0,6,9,0,1,5],m.map(e=>{for(var t=e.slice();t.length<24;)t.push(t[t.length-2],t[t.length-1]);return t})),o=e=>Number.isInteger(e)?e+".":String(e),c=(t.digitLib=`
const vec2 DG[120] = vec2[120](${e.map(a=>a.map((e,t)=>t%2?"":"vec2("+o(e)+","+o(a[t+1])+")").filter(Boolean).join(",")).join(",\n")});
const int SEQ[16] = int[16](${t.digitSeq.join(", ")});
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
`,[[0,1.6,24,1],[1.9,1.6,22,6],[3.05,1,11,6],[4.05,.85,9,12],[4.95,.55,5,12],[5.8,.4,3,16],[6.6,.9,12,1],[7.4,1.6,10,1]]),x=(e,t,a)=>{var o,r,l;return e?([o,r]=e<=2?[2,3]:5===e?[4,4]:[3,4],l=2*c[e][1]/r,[-(t%o-(o-1)/2+.5*a[0]/1.15)*l,((r-1)/2-Math.floor(t/o)+.5*a[1]/1.15)*l+.1,c[e][0]]):[1.6*-a[0],1.6*a[1]+.1,0]},g=e=>(e=.1031*e%1,(e*=e+33.33)*(e+e)%1),a=[],r=(t.convNodes=v=>a[v]||(a[v]=(()=>{let o=new Float32Array(100),r=m[t.digitSeq[v]],l=r.length/2,c=.74+.1*g(7.31*v+1),n=.4*(g(3.17*v+4)-.45),i=(e,t,a=0)=>o.set([...t,a],4*e),s=(e,t,a,o)=>x(e,t,a.map(e=>(e+.5)/o*2-1)),f=[0],d=[],a=[];for(let e=1;e<l;e++)f.push(f[e-1]+Math.hypot(r[2*e]-r[2*e-2],r[2*e+1]-r[2*e-1]));for(let a=0;a<6;a++){let e=(a+.5)/6*f[l-1],t=1;for(;t<l-1&&f[t]<e;)t++;var u=(e-f[t-1])/(f[t]-f[t-1]||1),h=r[2*t-2]+(r[2*t]-r[2*t-2])*u,u=r[2*t-1]+(r[2*t+1]-r[2*t-1])*u,h=[(h+u*n)*c,u*c].map(e=>Math.max(0,Math.min(21,Math.round(12*(e+1)-1.5)))),u=(i(a,x(0,0,h.map(e=>(e+1.5)/12-1)),h[0]+32*h[1]),h.map(e=>Math.floor(e/2)));i(6+a,s(1,a,u.map(e=>2*e+.5),22)),i(12+a,s(2,a,u,11)),d.push(u.map(e=>(e+.5)/11))}for(let t=0;t<3;t++){var e=[0,1].map(e=>(d[2*t][e]+d[2*t+1][e])/2),p=(5*v+4*t)%12;i(18+t,s(3,p,e.map(e=>Math.floor(9*e)),9)),i(21+t,s(4,p,e.map(e=>Math.floor(5*e)),5)),a.push(e)}return i(24,s(5,(7*v+3)%16,[0,1].map(e=>Math.floor(a[0][e]+a[1][e]+a[2][e])),3)),o})()),t.scenes.conv=t.segLib+t.digitLib+`
uniform vec4 uNode[25];
const int NL = 8;
vec4 slab(int k){ return ${c.map((e,t)=>(t<7?`k == ${t} ? `:"")+`vec4(${e.map(o).join(", ")})`).join(" : ")}; }
vec2 mapGrid(int k){ return k <= 2 ? vec2(2., 3.) : k == 5 ? vec2(4.) : vec2(3., 4.); }
float mapPitch(int k){ return 2. * slab(k).y / mapGrid(k).y; }
const float MAPGAP = 1.15;
const vec3 OC = vec3(-1.9, .15, 7.7), ON = vec3(-.37, 0, -.93), OR = vec3(-.93, 0, .37);
const vec3 O0 = OC + (OR * -.98 + vec3(0, .81, 0)) * 1.6, OD = vec3(0, -.288, 0), F60 = vec3(0, -.725, 6.6), F6D = vec3(0, .15, 0);
vec3 mapW(int k, float ch, vec2 lp){
vec2 g = mapGrid(k), mi = vec2(mod(ch, g.x), floor(ch / g.x));
vec2 q = (vec2(mi.x - (g.x - 1.) * .5, (g.y - 1.) * .5 - mi.y) + lp * .5 / MAPGAP) * mapPitch(k);
return vec3(-q.x, q.y + .1, slab(k).x);
}
vec3 slabW(int k, vec2 lp){ return k >= 1 && k <= 5 ? mapW(k, 0., lp) : vec3(-lp.x * slab(k).y, lp.y * slab(k).y + .1, slab(k).x); }
float smp(int k){ return float(k) <= uP1.y ? uP1.x : uP1.x - 1.; }
float inkC(float s, vec2 x){ return ink(s, x / 12. - 1.); }
vec2 kdir(float m){ return m == 0. ? vec2(0, 1) : m == 1. ? vec2(1, 0) : m == 2. ? vec2(1, -1) : m == 3. ? vec2(0, -1) : vec2(-1, -1); }
float kw(float m, vec2 o){ return m == 5. ? exp(-dot(o, o) * .7) : dot(o, normalize(kdir(m))); }
vec3 wcol(float w){ return (w > 0. ? vec3(.25, .85, 1.45) : vec3(1.35, .3, .9)) * abs(w); }
float f6(float c, float s){ return step(.45, hash21(vec2(c * 3.1, s * 17.3))) * (.4 + .6 * hash21(vec2(c) + s)); }
float feat(int k, float ch, vec2 c, float n, float s){
if (s < 0.) return 0.;
vec2 x; float e;
if (k == 1){ x = c + 1.5; e = 1.; } else { x = (c + .5) / n * 24.; e = 12. / n; }
if (k <= 2){
float m = mod(ch, 6.);
if (m == 5.) return inkC(s, x) * .8;
return sat((inkC(s, x + kdir(m) * e) - inkC(s, x - kdir(m) * e)) * 1.5);
}
if (k == 6) return f6(c.y, s);
return sat(inkC(s, x) * 1.5 + .15) * step(.5, hash31(vec3(c * 1.7, ch * 9.1 + float(k) * 3. + s * 13.7)));
}
float glowL(float d, float t, float w){ return exp(-max(d - w, 0.) / (t * uTanHalf * 2.4 / uRes.y + .003)); }
float pass(float l){ float D = uP2.x - l; return D < 0. ? 0. : exp(-max(uP2.x - 7., 0.) * uP2.y * 4. - D * .12) * .45 + exp(-D * D * 40.) * 3.; }
float fanD(vec3 ro, vec3 rd, vec3 a, vec3 b0, vec3 db, float n, out float h, out float t, out float j){
vec3 m = cross(rd, a - ro);
float u = dot(m, db);
j = clamp(floor(dot(m, ro - b0) / (abs(u) < 1e-7 ? 1e-7 : u) + .5), 0., n - 1.);
return raySeg(ro, rd, a, b0 + db * j, h, t);
}
bool box(vec3 ro, vec3 rd, vec3 lo, vec3 hi){
vec3 i = (step(0., rd) * 2. - 1.) / max(abs(rd), vec3(1e-6)), a = (lo - ro) * i, b = (hi - ro) * i, n = min(a, b), f = max(a, b);
return min(min(f.x, f.y), f.z) > max(max(max(n.x, n.y), n.z), 0.);
}
vec4 slabXY(vec3 ro, vec3 rd, float za, float zb){
if (abs(rd.z) < 1e-3) return vec4(-1e9, -1e9, 1e9, 1e9);
vec2 A = ro.xy + rd.xy * (za - .15 - ro.z) / rd.z, B = ro.xy + rd.xy * (zb + .15 - ro.z) / rd.z;
return vec4(min(A, B) - .15, max(A, B) + .15);
}
bool near(vec4 bb, vec3 a, vec3 b, float m){ return all(lessThan(bb.xy - m, max(a.xy, b.xy))) && all(lessThan(min(a.xy, b.xy), bb.zw + m)); }
float inBeam(vec3 ro, vec3 rd, vec3 a, float ra, vec3 b, float rb){
float dz = b.z - a.z, g = rb - ra, u0 = 0., u1 = 1.;
vec2 P = ro.xy + rd.xy * (a.z - ro.z) / rd.z - a.xy, Q = rd.xy * dz / rd.z - (b.xy - a.xy);
for (int i = 0; i < 4; i++){
float sg = i < 2 ? 1. : -1., q = (i == 0 || i == 2 ? Q.x : Q.y) * sg - g, r = ra - (i == 0 || i == 2 ? P.x : P.y) * sg;
if (abs(q) < 1e-6){ if (r < 0.) return 0.; }
else if (q > 0.) u1 = min(u1, r / q); else u0 = max(u0, r / q);
}
return max(u1 - u0, 0.) * abs(dz / rd.z);
}
vec3 scanLight(vec3 ro, vec3 rd, vec2 kc, float km){
vec3 col = vec3(0), wc = slabW(0, (kc + 1.5) / 12. - 1.), wb = vec3(1., .8, .45);
float hc = mapPitch(1) * .5 / MAPGAP / 22.;
vec4 bb = slabXY(ro, rd, 0., slab(1).x);
for (int m = 0; m < 6; m++){
vec3 tc = mapW(1, float(m), (kc + .5) / 11. - 1.);
if (!near(bb, wc, tc, .2)) continue;
float on = float(m) == km ? 1. : .35;
for (int i = 0; i < 4; i++){
vec3 sg = vec3(i == 1 || i == 2 ? 1. : -1., i < 2 ? -1. : 1., 0.);
float h, t, d = raySeg(ro, rd, wc + sg * .2, tc + sg * hc, h, t);
col += wb * glowL(d, t, .0015) * .45 * on;
}
if (on == 1.) col += wb * inBeam(ro, rd, wc, .2, tc, hc) * .28;
}
return col;
}
float twig(vec3 ro, vec3 rd, vec4 bb, vec3 a, vec3 b, float l){
if (uP2.x < l || !near(bb, a, b, 0.)) return 0.;
float h, t, d = raySeg(ro, rd, a, b, h, t);
if (d > .002 + (t * uTanHalf * 2.4 / uRes.y + .003) * 9.) return 0.;
return glowL(d, t, .002) * pass(l + h) * smoothstep(.3, 2., t);
}
vec3 tree(vec3 ro, vec3 rd){
float c = 0., c0 = 0., h, t, j;
vec4 b0 = slabXY(ro, rd, 0., 1.9), b1 = slabXY(ro, rd, 1.9, 3.05), b2 = slabXY(ro, rd, 3.05, 4.05), b3 = slabXY(ro, rd, 4.05, 4.95), b4 = slabXY(ro, rd, 4.95, 5.8);
for (int p = 0; p < 6; p++){
vec3 b = uNode[6 + p].xyz, e = uNode[12 + p].xyz;
c0 += twig(ro, rd, b0, uNode[p].xyz, b, 0.);
c += twig(ro, rd, b1, b, e, 1.) + twig(ro, rd, b2, e, uNode[18 + p / 2].xyz, 2.);
}
for (int q = 0; q < 3; q++) c += twig(ro, rd, b3, uNode[18 + q].xyz, uNode[21 + q].xyz, 3.) + twig(ro, rd, b4, uNode[21 + q].xyz, uNode[24].xyz, 4.);
if (uP2.x > 5. && near(slabXY(ro, rd, 5.8, 6.6), min(uNode[24].xyz, F60), max(uNode[24].xyz, F60 + F6D * 11.), .15)){
float d = fanD(ro, rd, uNode[24].xyz, F60, F6D, 12., h, t, j);
c += glowL(d, t, .0015) * pass(5. + h);
}
return vec3(1., .82, .5) * (c + c0 * smoothstep(1., -.2, ro.z));
}
vec3 chart(vec2 lp, float px, float s){
float j = floor((.9 - lp.y) / .18);
if (j < 0. || j > 9.) return vec3(0);
vec2 q = lp - vec2(0., .81 - j * .18);
float age = uP1.z, win = s >= 0. && float(SEQ[int(s)]) == j ? 1. : 0.;
float p = s >= 0. ? prob(s, j) * (age < 0. ? sat(-age * 5.) : sat(age * 6.)) : 0., hit = age < 0. ? 0. : win * exp(-age * 6.);
vec3 col = vec3(0);
float nd = length(q - vec2(-.98, 0.));
col += mix(vec3(.3, .55, 1.1), vec3(1.6, 1.4, 1.1), win) * (smoothstep(.024 + px, .024, nd) * (.4 + 2. * p + 8. * hit) + exp(-nd * 25.) * (.05 + .3 * p + 1.5 * hit));
float gd = digitD(int(j), (q - vec2(-.82, 0.)) / .075) * .075;
col += mix(vec3(.35, .5, .9), vec3(2.2, 2.1, 1.9) * (1. + 2. * hit), win) * smoothstep(.012 + px, .012, gd);
float track = sdBox2(q - vec2(.19, 0.), vec2(.8, .042));
col += vec3(.008, .016, .04) * smoothstep(px, 0., track) + vec3(.03, .06, .14) * smoothstep(px, 0., abs(track) - .002);
float L = 1.6 * p, bar = sdBox2(q - vec2(-.61 + L * .5, 0.), vec2(L * .5 + .002, .042));
vec3 bc = mix(vec3(.2, .45, 1.1), vec3(1.4, 1.25, 1.) * (1.8 + 2. * hit), win);
col += bc * smoothstep(px, 0., bar) + bc * exp(-max(bar, 0.) * 45.) * .12 * p;
return col;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = vec3(.003, .004, .01) + starfield(rd, .05, .2);
float pxa = uTanHalf * 2. / uRes.y, idx = uP0.y;
bool scan = idx < 484.;
vec2 kc = vec2(mod(idx, 22.), 21. - floor(idx / 22.));
float km = mod(floor(idx / 22.), 6.);
for (int k = 0; k < NL; k++){
float g = sat(uP0.x - float(k) + 1.);
if (g <= 0.) break;
vec4 S0 = slab(k);
float s = smp(k), lit = s >= 0. ? pass(float(k)) : 0.;
if (k == 7){
float dn = dot(rd, ON);
if (dn > -1e-4) continue;
float t = dot(OC - ro, ON) / dn;
vec3 q = ro + rd * t - OC;
vec2 lp = vec2(dot(q, OR), q.y) / S0.y;
if (t > 0. && abs(lp.x) < 1.1 && abs(lp.y) < 1.) col += chart(lp, t * pxa / S0.y, s) * g * exp(-t * .03);
continue;
}
if (abs(rd.z) < 1e-4) continue;
float t = (S0.x - ro.z) / rd.z;
if (t < 0.) continue;
vec3 p = ro + rd * t;
vec2 w = vec2(-p.x, p.y - .1), hs = vec2(S0.y);
float ch = 0.;
if (k >= 1 && k <= 5){
vec2 gr = mapGrid(k), cell = w / mapPitch(k) + gr * .5, mi = floor(cell);
if (mi.x < 0. || mi.y < 0. || mi.x >= gr.x || mi.y >= gr.y) continue;
ch = (gr.y - 1. - mi.y) * gr.x + mi.x;
w = (fract(cell) - .5) * mapPitch(k);
hs = vec2(mapPitch(k) * .5 / MAPGAP);
}
if (k == 6) hs.x *= .125;
float pw = t * pxa, sd = sdBox2(w, hs);
if (sd > .1) continue;
vec3 cc = vec3(.3, .5, 1.) * exp(-abs(sdBox2(w, hs * 1.03 + .004)) / (pw * 1.2 + .002)) * (.12 + .25 * lit + .1 * uP0.z);
if (sd < 0.){
vec2 n = k == 6 ? vec2(1., S0.z) : vec2(S0.z), uv = w / hs * .5 + .5, c = floor(uv * n), f = fract(uv * n);
float fill = smoothstep(.05, .05 + pw * n.y / hs.y * .5, min(min(f.x, f.y), min(1. - f.x, 1. - f.y)));
if (k == 0){
vec2 dk = c - kc;
float v = inkC(s, c + .5), inw = scan && min(dk.x, dk.y) >= 0. && max(dk.x, dk.y) <= 2. ? uP0.w : 0.;
cc += vec3(.85, .87, 1.) * (v * 1.3 * (1. - .85 * inw) * fill + .045 * (1. - fill));
if (inw > 0.){ float kv = kw(km, dk - 1.); cc += ((wcol(kv * v) * 2.2 + wcol(kv) * .3) * fill + vec3(1., .8, .4) * .5 * (1. - fill)) * inw; }
if (scan){ vec2 fr = abs(uv * n - kc - 1.5); cc += vec3(1.2, .9, .5) * smoothstep(pw * n.y / hs.y, 0., abs(max(fr.x, fr.y) - 1.5)) * uP0.w; }
for (int i = 0; i < 6; i++){
vec2 dw = c - vec2(mod(uNode[i].w, 32.), floor(uNode[i].w / 32.));
if (min(dw.x, dw.y) >= 0. && max(dw.x, dw.y) <= 2.) cc += vec3(1., .8, .45) * (.15 * fill + .6 * (1. - fill)) * lit;
}
} else {
float a = feat(k, ch, c, n.y, s), done = k == 1 && scan ? step((21. - c.y) * 22. + c.x, idx) : 1.;
vec3 mc = k == 6 ? vec3(.4, .75, 1.3) : mix(vec3(.15, .5, 1.2), vec3(1.2, .45, 1.), ch / 16.);
vec2 kb = floor((c - vec2(0., 16.)) * .5);
if (k == 1 && min(kb.x, kb.y) >= 0. && max(kb.x, kb.y) <= 2.){ a = 0.; cc += wcol(kw(ch, kb - 1.)) * fill * (.5 + (scan && ch == km ? .9 * uP0.w : 0.)); }
cc += mc * (a * .75 * done * fill + .03 * (1. - fill)) * (1. + uP0.z * .5);
if (k == 1 && scan && c == kc) cc += vec3(1.5, 1.3, .9) * (ch == km ? 2.5 : 1.) * fill * uP0.w;
float on = k == 6 ? a : 0.;
int i0 = k == 1 ? 6 : k == 2 ? 12 : k == 3 ? 18 : k == 4 ? 21 : 24, nn = k <= 2 ? 6 : k <= 4 ? 3 : k == 5 ? 1 : 0;
for (int i = 0; i < 6; i++){
if (i >= nn) break;
vec2 dn = abs(p.xy - uNode[i0 + i].xy);
on = max(on, step(max(dn.x, dn.y), (k == 1 ? 2. : 1.) * hs.x / n.x));
}
cc += vec3(1.4, 1.15, .8) * on * lit * fill;
}
}
col += cc * g * exp(-t * .03);
}
if (scan && uP0.w > 0.) col += scanLight(ro, rd, kc, km) * uP0.w;
if (uP2.x > 0. && (uP2.x - 7.) * uP2.y < 1.) col += tree(ro, rd);
if (uP0.x > 6. && box(ro, rd, vec3(-.6, -1.3, 6.5), vec3(.15, 1.6, 7.25))){
float s6 = smp(6), wn = float(SEQ[int(uP1.x)]), hit = uP1.z < 0. ? 0. : exp(-uP1.z * 6.);
for (int j = 0; j < 10; j++){
float h, t, i, fj = float(j), d = fanD(ro, rd, O0 + OD * fj, F60, F6D, 12., h, t, i), a = f6(i, s6);
vec3 c = wcol(hash21(vec2(i * 1.37, fj * 2.11)) * 2. - 1.) * a * .2;
if (fj == wn) c += vec3(1., .82, .5) * (pass(7. - h) + hit * 2.) * (.3 + .7 * a);
col += c * glowL(d, t, .0015) * sat(uP0.x - 6.);
}
}
outColor = vec4(col, 1.);
}`,t.scenes.lstm=t.segLib+`
uniform vec4 uCell[11], uLane[4];
const float S = 2., Y0 = .48, YH = -.42, YF = -1.6, YW = -1.02, HX = .7, HY = .78, HZ = .42, CY = .05;
const float XF = -.44, XO = .44, RT = .12, RN = .15, LP = .052, YB = 1.5;
float cx(int i){ return (float(i) - 5.) * S; }
float laneY(int k){ return Y0 + (1.5 - float(k)) * LP; }
vec3 laneCol(float k){ return k < 1.5 ? vec3(1.5, .95, .25) : k < 2.5 ? vec3(.2, .85, 1.5) : k < 3.5 ? vec3(1.1, .35, 1.5) : vec3(.35, 1.4, .5); }
const vec3 CYAN = vec3(.3, .75, 1.4), RED = vec3(1.8, .25, .12), GOLD = vec3(1.6, 1.12, .42);
float glow(float d, float px, float w){ return smoothstep(px * 1.5 + w, w * .5, d) + exp(-max(d - w, 0.) * 45.) * .14; }
float dash(float u, float n){ u = fract(u); return pow(u, n) * smoothstep(1., .9, u); }
float lineX(vec3 ro, vec3 rd, vec2 c, out float t, out float x){
vec2 o = ro.yz - c, v = rd.yz;
t = max(-dot(o, v) / max(dot(v, v), 1e-8), 0.);
x = ro.x + rd.x * t;
return length(o + v * t);
}
float lineY(vec3 ro, vec3 rd, vec2 c, out float t, out float y){
vec2 o = ro.xz - c, v = rd.xz;
t = max(-dot(o, v) / max(dot(v, v), 1e-8), 0.);
y = ro.y + rd.y * t;
return length(o + v * t);
}
float lineZ(vec3 ro, vec3 rd, vec2 c, out float t, out float z){
vec2 o = ro.xy - c, v = rd.xy;
t = max(-dot(o, v) / max(dot(v, v), 1e-8), 0.);
z = ro.z + rd.z * t;
return length(o + v * t);
}
vec2 valveQ(vec3 ro, vec3 rd, vec3 c, out float z, out float t){
vec3 v = c - ro, R = uCamRot[0], U = uCamRot[1], F = uCamRot[2];
float f = dot(rd, F);
z = dot(v, F); t = z > .05 ? z / f : 1e9;
return vec2(dot(rd, R), dot(rd, U)) / f * z - vec2(dot(v, R), dot(v, U));
}
vec3 valve(vec2 q, float px, float r, int g, float k, vec3 rc, vec3 fc){
float l = length(q), a = r * .42, s;
if (g == 0) s = min(sdSeg(q, vec2(-a), vec2(a)), sdSeg(q, vec2(-a, a), vec2(a, -a)));
else if (g == 1) s = min(sdSeg(q, vec2(-a * 1.15, 0.), vec2(a * 1.15, 0.)), sdSeg(q, vec2(0., -a * 1.15), vec2(0., a * 1.15)));
else s = min(sdSeg(q, vec2(-a, a * .5 * k), vec2(0., -a * .5 * k)), sdSeg(q, vec2(0., -a * .5 * k), vec2(a, a * .5 * k)));
return rc * (glow(abs(l - r), px, .007) + .85 * glow(s, px, .005) * sat(r / px / 6. - 1.)) + fc * smoothstep(r, r * .15, l);
}
vec3 lights(vec3 ro, vec3 rd, float tmax, int i0, int i1){
vec3 col = vec3(0);
float pxa = uTanHalf * 2. / uRes.y, beat = 1. + .3 * uKick, t, x, y, d;
float veil = 0.;
for (int i = i0; i <= i1; i++){
float sn = smoothstep(-1.2, -.2, uCell[i].x);
for (int g = 0; g < 3; g++){ float zv, tv; vec2 q = valveQ(ro, rd, vec3(cx(i) + float(g - 1) * XO, Y0, 0.), zv, tv); veil = max(veil, smoothstep(RN, RN - zv * pxa * 1.5, length(q)) * sn * step(tv, tmax)); }
}
float clear = 1. - .7 * veil;
float ta, xa, da = lineX(ro, rd, vec2(Y0, 0.), ta, xa);
if (ta < tmax){
float along = smoothstep(cx(0) - 1.6, cx(0) - .8, xa) * smoothstep(cx(10) + 1.6, cx(10) + .8, xa);
col += CYAN * (glow(abs(da - RT), ta * pxa, .003) * .1 + sat(1. - da / RT) * .02) * along * beat * clear;
}
for (int k = 0; k < 4; k++){
vec4 L = uLane[k];
if (L.y <= L.x) continue;
d = lineX(ro, rd, vec2(laneY(k), 0.), t, x);
if (t > tmax) continue;
float on = smoothstep(L.x - .03, L.x + .03, x) * smoothstep(L.y + .03, L.y - .03, x), gold = L.z < 1.5 ? 1. : 0.;
float live = L.w < 0. ? 1. : .16 + .84 * exp(-L.w * 2.5);
float flow = mix(.75, .65 + .6 * dash((x - uTime * 1.6) * .7 + float(k) * .3, 8.), live);
float rc = gold * (2.5 * exp(-pow((x - mix(L.x, L.y, sat(uP0.z / .6 + 1.))) * 1.2, 2.)) * step(-.6, uP0.z) * step(uP0.z, .15)
+ sat(uP0.z * 3.) * (.8 + .8 * exp(-max(uP0.z, 0.) * .6)));
col += laneCol(L.z) * glow(d, t * pxa, .007 + .004 * gold) * on * flow * live * beat * (1. + .25 * gold + rc) * clear;
if (L.w < 0.) col += laneCol(L.z) * exp(-length(vec2(x - L.y, d)) * 30.) * .5 * clear;
else col += RED * (exp(-L.w * 3.) * 1.3 + .12) * exp(-length(vec2(x - L.y, d)) * 12.);
}
d = lineX(ro, rd, vec2(YH, 0.), t, x);
if (t < tmax){
float on = smoothstep(cx(0) - HX - 1.2, cx(0) - HX - .4, x) * smoothstep(uP0.y + .2, uP0.y, x);
col += CYAN * (glow(d, t * pxa, .006) * .45 * on * (.75 + .5 * dash((x - uTime * 1.1) * .5, 6.)) + exp(-length(vec2(x - uP0.y, d)) * 25.) * .3) * beat;
}
for (int i = i0; i <= i1; i++){
vec4 C = uCell[i];
float xi = cx(i), tr = C.x, seen = smoothstep(-1.2, -.2, tr), act = tr >= 0. ? exp(-tr * 1.6) : 0.;
if (seen <= 0.) continue;
float up = step(.2, tr) * step(tr, .36), gy = mix(YH, Y0 - RN, sat((tr - .2) / .1));
float dn = step(.45, tr) * step(tr, .7), oy = mix(Y0 - RN, YH, sat((tr - .45) / .2));
vec3 held = CYAN * .4, base = CYAN * (.12 + .3 * act);
for (int k = 0; k < 4; k++){ vec4 L = uLane[k]; if (L.y > L.x && L.x < xi + XO && L.y > xi + XO - .05) held += laneCol(L.z) * .6; }
d = lineY(ro, rd, vec2(xi, 0.), t, y);
if (t < tmax){
float px = t * pxa, pul = exp(-pow((y - mix(YW, YH, sat(tr / .2))) * 6., 2.)) * step(0., tr) * step(tr, .25);
col += CYAN * glow(d, px, .007) * smoothstep(YW - .06, YW + .06, y) * step(y, YH) * (.25 + .5 * act + 2.5 * pul) * seen;
col += glow(d, px, .005) * step(YH, y) * step(y, Y0 - RN) * (base + (C.y > .5 ? laneCol(C.y) * 2.2 : CYAN * .6) * exp(-pow((y - gy) * 9., 2.)) * up) * seen;
}
d = lineY(ro, rd, vec2(xi + XO, 0.), t, y);
if (t < tmax){
float px = t * pxa;
col += glow(d, px, .005) * step(YH, y) * step(y, Y0 - RN) * (base + held * 2.4 * exp(-pow((y - oy) * 9., 2.)) * dn) * seen;
col += GOLD * glow(d, px, .012) * step(Y0 + RN, y) * step(y, mix(Y0 + RN, YB, sat(C.w * 1.6))) * C.w * 1.8;
}
float tm, dm = rayPoint(ro, rd, vec3(xi, YH, 0.), tm);
if (tm < tmax) col += CYAN * exp(-dm * 70.) * (.25 + 2.5 * exp(-max(tr - .2, 0.) * 5.) * step(.2, tr)) * seen;
float fl = exp(-max(tr - .3, 0.) * 3.) * step(.3, tr);
for (int g = 0; g < 3; g++){
vec3 rc = CYAN * (.4 + .5 * act), fc = vec3(0);
float open = 0.;
if (g == 0){
if (C.z > .5){ open = exp(-max(tr - .3, 0.) * 1.5) * step(.3, tr); rc = mix(rc, RED * 1.8, open); fc = RED * .22 * open; }
else { open = fl; rc += CYAN * fl; fc = CYAN * .15 * fl; }
} else if (g == 1){
if (C.y > .5){ open = exp(-max(tr - .3, 0.) * .8) * smoothstep(.22, .3, tr); rc = mix(rc, laneCol(C.y) * 1.8, open); fc = laneCol(C.y) * .35 * open; }
} else {
float e = exp(-pow((tr - .5) * 6., 2.));
open = max(e, C.w); rc = mix(rc + held * 1.2 * e, GOLD * 2.2, C.w); fc = mix(held * .3 * e, GOLD * .5, C.w);
}
float zv, tv; vec2 q = valveQ(ro, rd, vec3(xi + float(g - 1) * XO, Y0, 0.), zv, tv);
rc *= mix(.6, 1., max(sat(RN / (zv * pxa) / 6. - 1.), open));
if (tv < tmax) col += valve(q, zv * pxa, RN * (1. + .12 * open), g, 1. - 2. * C.w, rc, fc) * seen;
}
}
if (uCell[10].w > 0.){
vec3 lp = vec3(cx(10) + XO, YB, 0.);
float tp; rayPoint(ro, rd, lp, tp);
col += GOLD * min(inscatter(ro, rd, lp, tmax), 6.2832 / max(tp * pxa, 1e-4)) * .01 * uCell[10].w;
}
return col;
}
vec3 skyG(vec3 rd){ return mix(vec3(.004, .005, .012), vec3(.01, .014, .03), sat(rd.y * .5 + .5)); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
float pxa = uTanHalf * 2. / uRes.y;
float tf = rd.y < 0. ? (YF - ro.y) / rd.y : 1e9;
vec3 col = skyG(rd) + starfield(rd, .05, .25);
vec3 ird = 1. / vec3(abs(rd.x) < 1e-6 ? 1e-6 : rd.x, abs(rd.y) < 1e-6 ? 1e-6 : rd.y, abs(rd.z) < 1e-6 ? 1e-6 : rd.z);
int i0 = 0, i1 = 10;
if (abs(rd.z) > 1e-4){
float ta = (.5 - ro.z) * ird.z, tb = (-.5 - ro.z) * ird.z, tn = max(min(ta, tb), 0.), tx = min(max(ta, tb), tf);
float xa = ro.x + rd.x * tn, xb = ro.x + rd.x * tx;
i0 = max(0, int(ceil((min(xa, xb) - HX - .25) / S + 5.)));
i1 = tx < tn ? -1 : min(10, int(floor((max(xa, xb) + HX + .25) / S + 5.)));
}
if (tf < 1e8){
vec3 p = ro + rd * tf;
float px = tf * pxa;
vec2 g = abs(fract(p.xz) - .5);
int ic = int(floor(p.x / S + 5.5));
float pad = smoothstep(.8, .45, abs(p.x - cx(clamp(ic, 0, 10)))) * smoothstep(1.4, .7, abs(p.z + .3));
col = vec3(.003, .004, .009) + vec3(.06, .12, .25) * smoothstep(px * 1.5 + .012, 0., .5 - max(g.x, g.y)) * .22 * exp(-abs(p.z) * .2) * (1. - .85 * pad);
for (int i = max(ic - 1, 0); i <= min(ic + 1, 10); i++){
float tr = uCell[i].x; vec2 q = p.xz - vec2(cx(i), 0.);
if (tr >= -.2) col += CYAN * exp(-sqrt(dot(q, q) + .04) * 3.) * (.06 + .36 * exp(-max(tr, 0.) * 2.));
}
col = mix(col, skyG(rd), 1. - exp(-tf * .03));
}
col += lights(ro, rd, tf, i0, i1);
for (int k = 0; k < 4; k++){
float t, x, d = lineX(ro, rd, vec2(CY + (k < 2 ? HY : -HY), k % 2 == 0 ? HZ : -HZ), t, x);
int i = int(floor(x / S + 5.5));
if (t > tf || i < 0 || i > 10) continue;
float tr = uCell[i].x;
col += mix(CYAN, vec3(1.), .3) * (.18 + .9 * (tr >= 0. ? exp(-tr * 1.6) : 0.)) * smoothstep(-1.2, -.2, tr) * (k % 2 == 0 ? 1. : .45)
* glow(d, t * pxa, .003) * smoothstep(HX + .01, HX - .01, abs(x - cx(i)));
}
for (int i = i0; i <= i1; i++){
float tr = uCell[i].x, seen = smoothstep(-1.2, -.2, tr), act = tr >= 0. ? exp(-tr * 1.6) : 0.;
if (seen <= 0.) continue;
vec3 c = vec3(cx(i), CY, 0.), hs = vec3(HX, HY, HZ), ec = mix(CYAN, vec3(1.), .3) * (.18 + .9 * act) * seen;
for (int k = 0; k < 4; k++){
vec2 sg = vec2(k < 2 ? 1. : -1., k % 2 == 0 ? 1. : -1.);
float t, y, d = lineY(ro, rd, vec2(c.x + sg.x * HX, sg.y * HZ), t, y);
if (t < tf) col += ec * glow(d, t * pxa, .003) * smoothstep(HY + .01, HY - .01, abs(y - CY)) * (sg.y > 0. ? 1. : .45);
float z; d = lineZ(ro, rd, vec2(c.x + sg.x * HX, CY + sg.y * HY), t, z);
if (t < tf) col += ec * glow(d, t * pxa, .003) * smoothstep(HZ + .01, HZ - .01, abs(z)) * (.45 + .55 * smoothstep(-HZ, HZ, z));
}
vec3 a = (c - hs - ro) * ird, b = (c + hs - ro) * ird, lo = min(a, b), hi = max(a, b);
float te = max(max(lo.x, lo.y), lo.z), tx = min(min(hi.x, hi.y), hi.z);
if (te > tx || tx < 0. || te > tf) continue;
for (int f = 0; f < 2; f++){
float th = f == 0 ? te : tx;
if (th < 0.) continue;
vec3 q = ro + rd * th - c, aq = abs(q) / hs;
vec3 n = aq.x > aq.y && aq.x > aq.z ? vec3(sign(q.x), 0, 0) : aq.y > aq.z ? vec3(0, sign(q.y), 0) : vec3(0, 0, sign(q.z));
float fr = .04 + .5 * pow(1. - abs(dot(n, rd)), 5.);
vec3 rf = reflect(rd, n);
col += (skyG(rf) * fr * 2. + vec3(.5, .7, 1.) * pow(max(dot(rf, normalize(vec3(.3, .8, .4))), 0.), 40.) * fr * 3.) * seen;
}
col += CYAN * (tx - max(te, 0.)) * .012 * seen;
}
outColor = vec4(col, 1.);
}`,t.scenes.embed=t.segLib+`
uniform vec4 uA0[10], uA1[10];
vec3 acol(float c){ return c < .5 ? vec3(1.6, 1.15, .45) : c < 1.5 ? vec3(.8, .6, .3) : vec3(.35, .95, 1.6); }
float lineG(vec3 ro, vec3 rd, vec3 a, vec3 b, float w){
float h, t, d = raySeg(ro, rd, a, b, h, t);
float px = max(t, .01) * uTanHalf * 2. / uRes.y;
return smoothstep(px * 1.5 + w, w * .4, d) + exp(-max(d - w, 0.) * 30.) * .15;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = mix(vec3(.004, .003, .01), vec3(.012, .01, .028), sat(rd.y * .5 + .5)) * uP0.x + starfield(rd, .04, .2) * uP0.x;
vec3 fwd = uCamRot[2];
for (int i = 0; i < 10; i++){
vec4 A = uA0[i], B = uA1[i];
if (A.w <= 0.) continue;
vec3 a = A.xyz, tip = mix(A.xyz, B.xyz, A.w), dir = normalize(B.xyz - A.xyz), side = normalize(cross(dir, fwd));
float g = lineG(ro, rd, a, tip, .012);
float hd = smoothstep(.5, .8, A.w);
g += (lineG(ro, rd, tip, tip - dir * .32 + side * .15, .012) + lineG(ro, rd, tip, tip - dir * .32 - side * .15, .012)) * hd;
col += acol(B.w) * g * (B.w > .5 && B.w < 1.5 ? .5 : 1.);
}
outColor = vec4(col, 1.);
}`,t.scenes.attn=t.segLib+`
uniform vec4 uTX[3], uTW[3], uW[11];
const float Y0 = .36;
float tokX(int i){ vec4 v = uTX[i / 4]; int k = i - (i / 4) * 4; return k == 0 ? v.x : k == 1 ? v.y : k == 2 ? v.z : v.w; }
float tokW(int i){ vec4 v = uTW[i / 4]; int k = i - (i / 4) * 4; return k == 0 ? v.x : k == 1 ? v.y : k == 2 ? v.z : v.w; }
vec3 headCol(int h){ return h == 0 ? vec3(.25, .88, 1.1) : h == 1 ? vec3(1.1, .31, .8) : h == 2 ? vec3(1.1, .82, .25) : vec3(.5, 1.1, .42); }
vec3 arcs(vec3 ro, vec3 rd){
vec3 col = vec3(0);
int q = int(uP0.x + .5);
float xq = tokX(q), px0 = uTanHalf * 2. / uRes.y;
if (abs(rd.z) < 1e-4 || uP0.z < .01) return col;
for (int h = 0; h < 4; h++){
float zh = (float(h) - 1.5) * .12, tp = (zh - ro.z) / rd.z;
if (tp <= 0.) continue;
vec2 P = (ro + rd * tp).xy;
float px = tp * px0;
for (int k = 0; k < 11; k++){
if (k >= q) break;
float w = uW[k][h];
if (w < .015) continue;
float xk = tokX(k);
vec2 c = vec2((xk + xq) * .5, Y0), r = vec2(abs(xq - xk) * .5, .14 + .085 * abs(xq - xk) * (.8 + float(h) * .14));
vec2 v = P - c;
if (v.y < -.02) continue;
vec2 e = v / r;
float le = length(e), d = abs(le - 1.) / max(length(e / r) / max(le, 1e-4), 1e-4);
float th = .0015 + .012 * w, fw = px * 1.2 + .0012 + .005 * w;
if (d - th > 18. * fw) continue;
float s = 3.2 * pow(w, 2.2);
float line = exp(-max(d - th, 0.) / fw);
float u = 1. - atan(max(e.y, 0.), e.x) / PI;
float pulse = exp(-pow((u - uP0.w) * r.x * 9., 2.)) * step(.01, uP0.w) * 3. * sat(w * 2.5);
col += headCol(h) * line * s * (1. + pulse);
}
}
return col * uP0.z;
}
vec3 plates(vec2 p, float px){
vec3 col = vec3(0);
int q = int(uP0.x + .5);
for (int i = 0; i < 11; i++){
if (float(i) >= uP0.y) break;
float d = sdBox2(p - vec2(tokX(i), .03), vec2(tokW(i) + .04, .07));
float isQ = i == q ? 1. : 0.;
col += mix(vec3(.12, .35, .75), vec3(.8, .95, 1.3), isQ) * (smoothstep(px * 1.5 + .004, 0., abs(d)) * .7 + exp(-max(d, 0.) * 16.) * .1) * (1. + isQ * (.6 + uP1.x * 3.));
}
return col;
}
vec3 skyA(vec3 rd){ return mix(vec3(.006, .006, .016), vec3(.002, .003, .01), sat(rd.y * 2.)) + starfield(rd, .05, .3) * sat(rd.y * 4.); }
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = skyA(rd);
int q = int(uP0.x + .5);
float tf = rd.y < 0. ? -ro.y / rd.y : 1e9;
if (tf < 1e8){
vec3 p = ro + rd * tf;
float px = tf * uTanHalf * 2. / uRes.y;
vec2 g = abs(fract(p.xz + .5) - .5);
vec3 fl = vec3(.003, .004, .01) + vec3(.06, .12, .25) * smoothstep(px * 1.5 + .012, 0., min(g.x, g.y)) * .3 * exp(-abs(p.z) * .2);
fl += plates(p.xz, px);
float fr = .1 + .6 * pow(max(1. - abs(rd.y), 0.), 5.);
fl += arcs(p, reflect(rd, vec3(0, 1, 0))) * fr * .55;
col = mix(fl, skyA(rd), 1. - exp(-tf * .05));
}
col += arcs(ro, rd);
float h_, t_; vec3 a0 = vec3(tokX(q), 0., 0.);
float dq = raySeg(ro, rd, a0, a0 + vec3(0., Y0, 0.), h_, t_);
col += vec3(.7, .9, 1.4) * exp(-dq / (t_ * uTanHalf * 2. / uRes.y * 1.5 + .004)) * .5 * uP0.z;
outColor = vec4(col, 1.);
}`,t.yoloObjs=[{cls:"donut",c:[-1.3,.13,.4],e:[.43,.13,.43],col:"#ff4fa0"},{cls:"sports ball",c:[-.45,.3,-.35],e:[.3,.3,.3],col:"#ffb03f"},{cls:"cup",c:[.45,.28,.45],e:[.4,.28,.25],col:"#3fe0ff"},{cls:"apple",c:[1.25,.26,.05],e:[.26,.33,.26],col:"#ff5a5a"},{cls:"orange",c:[-.1,.23,.95],e:[.23,.23,.23],col:"#ffd23f"},{cls:"clock",c:[.85,.44,-1],e:[.36,.44,.12],col:"#9aff6a"},{cls:"bottle",c:[-1.25,.46,-.95],e:[.14,.46,.14],col:"#7d9dff"}],e=>`vec3(${e.map(e=>Number.isInteger(e)?e+".":e).join(", ")})`),l=t.yoloObjs.map(e=>r(e.c)),n=t.yoloObjs.map(t=>r([1,3,5].map(e=>+(parseInt(t.col.substr(e,2),16)/255).toFixed(3)))),i=e=>`((p - ${l[e]}) / max(uYo[${e}].x, .005))`,s=(t.scenes.yolo=`
uniform vec4 uYo[7];
uniform vec4 uYf[7];
const vec3 YO[7] = vec3[7](${l.join(", ")});
const vec3 YC[7] = vec3[7](${n.join(", ")});
float sdTor(vec3 p, vec2 t){ return length(vec2(length(p.xz) - t.x, p.y)) - t.y; }
float sdCy(vec3 p, float r, float h){ vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h); return min(max(d.x, d.y), 0.) + length(max(d, 0.)); }
float smin(float a, float b, float k){ float h = sat(.5 + .5 * (b - a) / k); return mix(b, a, h) - k * h * (1. - h); }
float mapY(vec3 p, out float m){
float d = p.y, o, s; m = 0.;
s = uYo[0].x; vec3 q = p - ${l[0]}; if (s > .005 && length(q) - .44 * s < d){ q /= s; o = sdTor(q, vec2(.3, .13)) * s; if (o < d){ d = o; m = 1.; } }
s = uYo[1].x; q = p - ${l[1]}; o = length(q) - .3 * s; if (s > .005 && o < d){ d = o; m = 2.; }
s = uYo[2].x; q = p - ${l[2]}; if (s > .005 && length(q) - .42 * s < d){ q /= s; o = max(sdCy(q, .24, .28) - .01, -sdCy(q - vec3(0, .08, 0), .205, .28));
o = min(o, length(vec2(length(q.xy - vec2(.27, .02)) - .11, q.z)) - .028) * s; if (o < d){ d = o; m = 3.; } }
s = uYo[3].x; q = p - ${l[3]}; if (s > .005 && length(q) - .34 * s < d){ q /= s; o = length(q * vec3(1., 1.08, 1.)) - .26 + .06 * exp(-dot(q.xz, q.xz) * 60.) * smoothstep(0., .12, q.y);
o = min(o, length(q - vec3(.015, clamp(q.y, .2, .31), 0.)) - .012) * s; if (o < d){ d = o; m = 4.; } }
s = uYo[4].x; q = p - ${l[4]}; o = length(q) - .23 * s; if (s > .005 && o < d){ d = o; m = 5.; }
s = uYo[5].x; q = p - ${l[5]}; if (s > .005 && length(q) - .5 * s < d){ q /= s; o = sdCy(q.xzy, .32, .045) - .02; o = min(o, sdBox(q + vec3(0, .4, 0), vec3(.18, .04, .1))) * s; if (o < d){ d = o; m = 6.; } }
s = uYo[6].x; q = p - ${l[6]}; if (s > .005 && length(q) - .52 * s < d){ q /= s; o = smin(sdCy(q + vec3(0, .12, 0), .13, .32) - .02, sdCy(q - vec3(0, .3, 0), .045, .16), .08) * s; if (o < d){ d = o; m = 7.; } }
return d;
}
float mapY(vec3 p){ float m; return mapY(p, m); }
vec3 nrmY(vec3 p){ vec3 n = vec3(0); for (int i = ZERO; i < 3; i++){ vec3 e = vec3(0); e[i] = .0007; n[i] = mapY(p + e) - mapY(p - e); } return normalize(n); }
float marchY(vec3 ro, vec3 rd, float tmax){ float t = .01; for (int i = 0; i < 110; i++){ float d = mapY(ro + rd * t); if (d < .0004 * t) return t; t += d; if (t > tmax || (rd.y >= 0. && ro.y + rd.y * t > 1.)) break; } return -1.; }
float shadowY(vec3 ro, vec3 rd){ float s = 1., t = .02; for (int i = 0; i < 40; i++){ float h = mapY(ro + rd * t); s = min(s, 10. * h / t); t += clamp(h, .01, .2); if (s < .005 || t > 6.) break; float y = ro.y + rd.y * t - 1.; if (rd.y > .1 && y > 0. && 10. * y >= s * t) break; } return sat(s); }
float aoY(vec3 p, vec3 n){ float o = 0., w = 1.; for (int i = 1; i < 5; i++){ float h = .04 * float(i); o += (h - mapY(p + n * h)) * w; w *= .6; } return sat(1. - o * 5.); }
vec3 bgY(vec3 rd){
vec3 a = mix(vec3(.012, .01, .016), vec3(.05, .04, .05), sat(rd.y * 2. + .3)) + vec3(.06, .045, .03) * pow(max(dot(rd, normalize(vec3(-.4, .5, -1.))), 0.), 8.);
vec3 b = mix(vec3(.004, .004, .01), vec3(.03, .025, .05), sat(rd.y * .6 + .3)) + vec3(1., .85, .7) * pow(max(dot(rd, normalize(vec3(.4, .6, -.5))), 0.), 20.) * .4;
return mix(a, b, uP0.y);
}
float boardLines(vec2 xz, out float lit, out vec3 head){
vec2 g = abs(fract(xz + .5) - .5);
float line = smoothstep(.03, .015, min(g.x, g.y)) * step(max(abs(xz.x), abs(xz.y)), 9.02);
lit = 0.; head = vec3(0);
if (uP1.x > 0.) for (int i = ZERO; i < 7; i++){
vec4 F = uYf[i];
if (F.x <= 0.) continue;
float r = length(xz - YO[i].xz);
lit = max(lit, smoothstep(F.x + .05, F.x - .5, r));
head += YC[i] * F.y * (exp(-abs(r - F.x) * 6.) * 2.5 + .25 * exp(-(F.x - r) * 1.5) * step(r, F.x));
}
head *= line;
return line;
}
vec3 matY(float m, vec3 p, vec3 n, out float gloss){
gloss = .1;
if (m == 0.){
gloss = .45; float g = noise(vec3(p.x * 1.5, p.z * 22., 0.)), lit; vec3 head;
float line = boardLines(p.xz, lit, head), on = smoothstep(9.84, 9.76, max(abs(p.x), abs(p.z)));
return mix(vec3(.06, .035, .02) * (.75 + .35 * g) * (.25 + .75 * exp(-dot(p.xz, p.xz) * .12)), vec3(.02, .018, .016) * on, uP0.y) + vec3(.35, .3, .22) * line * lit * .3; }
if (m == 1.){ vec3 q = ${i(0)};
float ice = smoothstep(.02, .05, q.y + .03 * noise(q * 20.));
vec3 c = mix(vec3(.75, .45, .2), vec3(1., .45, .65), ice);
vec3 sp = hash33(floor(q * 40.)); if (ice > .5 && sp.x > .93) c = pal(sp.y, vec3(.6), vec3(.4), vec3(1.), vec3(0., .33, .67));
gloss = .15 + .3 * ice; return c; }
if (m == 2.){
vec3 q = normalize(p - ${l[1]});
q.xy = rot(.35) * q.xy; q.xz = rot(-.5) * q.xz;
float s = min(min(abs(q.x), abs(q.y)), abs(abs(q.x) - (.66 - .36 * q.y * q.y)));
gloss = .15; return mix(vec3(.025, .015, .01), vec3(.85, .3, .06) * (.85 + .15 * noise(q * 60.)), smoothstep(.008, .016, s)); }
if (m == 3.){ gloss = .6; return vec3(.88, .87, .84); }
if (m == 4.){ vec3 q = ${i(3)}; gloss = .55; if (q.y > .2 && length(q.xz) < .03) return vec3(.2, .12, .05);
return mix(vec3(.7, .03, .03), vec3(.9, .6, .1), smoothstep(.55, .8, noise(vec3(atan(q.z, q.x) * 3., q.y * 4., 0.)))); }
if (m == 5.){ gloss = .3; return vec3(1., .42, .04) * (.85 + .15 * noise(${i(4)} * 70.)); }
if (m == 6.){ vec3 q = ${i(5)};
if (q.z < .03 || length(q.xy) > .3) { gloss = .5; return vec3(.03); }
vec2 f = q.xy; float r = length(f), a = atan(f.x, f.y);
float ticks = step(.24, r) * step(r, .28) * step(.9, cos(a * 12.));
float mm = uP0.x * 6.2831853 / 60., hh = mm / 12.;
vec2 dm = vec2(sin(mm), cos(mm)), dh2 = vec2(sin(hh), cos(hh));
float hands = min(sdSeg(f, vec2(0), dm * .24) - .008, sdSeg(f, vec2(0), dh2 * .16) - .014);
gloss = .4; return mix(vec3(.9, .88, .82), vec3(.02), max(ticks, smoothstep(.003, 0., hands))); }
vec3 q = ${i(6)}; gloss = .8;
return abs(q.y + .12) < .12 ? vec3(.85, .8, .65) : vec3(.04, .22, .1);
}
vec3 shadeY(vec3 p, vec3 rd, vec3 n, float m, bool full, out float gloss){
vec3 alb = matY(m, p, n, gloss);
float k = uP0.y;
vec3 L = normalize(mix(vec3(-.5, .85, .45), vec3(.4, .8, -.45), k));
float sh = full ? shadowY(p + n * .003, L) : 1., ao = full ? aoY(p, n) : 1.;
float dif = max(dot(n, L), 0.) * sh;
vec3 amb = ao * vec3(.12, .14, .2) * (.6 + .4 * n.y) + max(dot(n, normalize(vec3(.8, .3, -.6))), 0.) * vec3(.15, .2, .35) * ao;
vec3 col = alb * (dif * mix(vec3(1.3, 1.15, .95), vec3(1.2), k) + mix(amb, vec3(.05), k));
col += pow(max(dot(reflect(rd, n), L), 0.), 16. + gloss * 100.) * gloss * sh * mix(1.3, .55, k);
if (m > .5){ int i = int(m) - 1; col += YC[i] * uYo[i].y * (.4 + 1.6 * pow(1. - max(dot(-rd, n), 0.), 2.)) * 1.3; }
else {
float lit; vec3 head;
boardLines(p.xz, lit, head);
col += head;
if (uP1.x > 0.) for (int i = ZERO; i < 7; i++){
vec4 Y = uYo[i];
float w = Y.w + .4 * Y.y * Y.x;
if (w <= 0.) continue;
vec2 d = p.xz - YO[i].xz;
col += YC[i] * w * .3 * exp(-dot(d, d) * 5. / (.08 + Y.z));
}
}
return col;
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 col = bgY(rd);
float t = marchY(ro, rd, uP0.w);
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
col = mix(col, bgY(rd), 1. - exp(-t * uP0.z));
}
float tt = t > 0. ? t : 1e9;
if (uP1.x > 0.) for (int i = ZERO; i < 7; i++){
vec4 Y = uYo[i];
if (Y.w <= 0.) continue;
vec3 s = vec3(YO[i].x, Y.z, YO[i].z) - ro;
float tc = dot(s, rd), dh = length(s - rd * max(tc, 0.)), px = max(tc, .01) * uTanHalf * 2. / uRes.y;
col += YC[i] * Y.w * (4. * px * px * 9. / (dh * dh + px * px * 9.) + .05 / (1. + dh * dh * 50.)) * smoothstep(tt + .06, tt - .06, tc);
}
outColor = vec4(col, 1.);
}`,(()=>{let h=ze.rng(37),p=[.06,-.04],a=e=>e.toFixed(5),o,t=[...Array(7)].map((e,t)=>2*(t+.6*(h()-.5))*Math.PI/7+.4),r=(e,t,a)=>[e[0],e[1],e[2],-(e[0]*t+e[2]*a)],l=e=>[Math.sin(e),0,-Math.cos(e)],c=[];for(let e=0;e<7;e++){var n,i,s=t[e],f=e+1<7?t[e+1]:t[0]+2*Math.PI,d=(s+f)/2,u=r(l(s),...p),v=r(l(f).map(e=>-e),...p);.95<f-s?(f=[Math.cos(d),Math.sin(d)],s=.2+.08*h(),d=.7*(h()-.5),n=Math.hypot(1,d),i=p[0]+f[0]*s,s=p[1]+f[1]*s,c.push({cuts:[u,v,r(d=[f[0]/n,d/n,f[1]/n],i,s)]},{cuts:[u,v,r(d.map(e=>-e),i,s)],out:1})):c.push({cuts:[u,v,[0,0,0,-1]],out:1})}let m=c.map(()=>[]);for(let e=0;e<3e4;e++){let t=[.47*(2*h()-1),.2*(2*h()-1),.47*(2*h()-1)];1<(t[0]/.47)**2+(t[1]/.2)**2+(t[2]/.47)**2||0<=(o=c.findIndex(e=>e.cuts.every(e=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]<=0)))&&m[o].push(t)}c.forEach((e,t)=>{let o=m[t],a=[0,1,2].map(a=>o.reduce((e,t)=>e+t[a],0)/o.length),r=Math.max(...o.map(e=>Math.hypot(e[0]-a[0],e[1]-a[1],e[2]-a[2])))+.01,l=Math.atan2(a[2]-p[1],a[0]-p[0])+.5*(h()-.5),c=e.out?2.6+1.3*h():1.5+.8*h(),n=3+2.5*h(),i=.07+.03*h()-(.205+a[1]),s=(n+Math.sqrt(n*n-60*i))/30,f=-.3*(n-30*s),d=[Math.sin(l)+.8*(h()-.5),.8*(h()-.5),-Math.cos(l)+.8*(h()-.5)],u=Math.hypot(...d);Object.assign(e,{c:a,reach:r,v:[Math.cos(l)*c,Math.sin(l)*c,n,i],b:[s,f,s+2*f/30,0],spin:[...d.map(e=>e/u),9+10*h()]})});var e=(e,t)=>`const vec4 ${e}[${t.length}] = vec4[${t.length}](${t.map(e=>`vec4(${e.map(a).join(", ")})`).join(", ")});`;return{pieces:c,at:(e,t)=>{var t=Math.max(t-.07,0),a=(1-Math.exp(-3.2*t))/3.2,[o,r,l,c]=e.v,[n,i,s]=e.b,l=t<n?(l-15*t)*t:t<s?c+(i-15*(t-n))*(t-n):c,s=-e.spin[3]*a/2,i=Math.sin(s);return{pos:[e.c[0]+o*a,e.c[1]+l,e.c[2]+r*a],q:[e.spin[0]*i,e.spin[1]*i,e.spin[2]*i,Math.cos(s)]}},size:e=>1-ze.smooth(.45,.95,e),glsl:`const int NP = ${c.length};
#define SH_CRACK ${a(.07)}
${e("SHC",c.flatMap(e=>e.cuts))}
${e("SHM",c.map(e=>[...e.c,e.reach]))}
uniform vec4 uPc[${4*c.length}], uPq[${4*c.length}]; `}})());t.goShards=s,t.scenes.go=`
uniform highp sampler2D uGo;
uniform vec4 uSh[4], uShE[4];
#define M37 uP1.xy
const float FALLT = .3, DROP = 1.6;
${s.glsl}
vec4 st(vec2 c){ return max(abs(c.x), abs(c.y)) > 9. ? vec4(0) : texelFetch(uGo, ivec2(c + 9.), 0); }
float isBlack(vec2 c){ return st(c).r < 1.5 ? 1. : 0.; }
bool landed(vec2 c){ vec4 s = st(c); return s.r > .5 && (s.a == 37. ? uP0.y >= .25 : s.g >= 0.); }
float dropH();
float dropOf(vec4 s){ if (s.a == 37.) return dropH(); float f = sat(1. + s.g / FALLT); return s.g < 0. ? (1. - f * f) * DROP : 0.; }
float stoneSize(vec4 s){ return s.a == 37. ? smoothstep(0., .04, uP0.y) : smoothstep(0., .2, 1. + s.g / FALLT); }
vec3 qrot(vec4 q, vec3 v){ vec3 t = 2. * cross(q.xyz, v); return v + q.w * t + cross(q.xyz, t); }
float pieceD(int j, vec3 q, out float cut, out float ell){
vec4 A = SHC[j * 3], B = SHC[j * 3 + 1], C = SHC[j * 3 + 2];
ell = (length(q / vec3(.47, .2, .47)) - 1.) * .2;
cut = max(max(dot(A.xyz, q) + A.w, dot(B.xyz, q) + B.w), dot(C.xyz, q) + C.w);
return max(ell, cut);
}
float gmat, gpiece; vec2 gcell;
float glow37(){ return uP0.y < .25 ? 0. : 1.5 * exp(-(uP0.y - .25) * 3.) + .55; }
float dropH(){ float f = sat(uP0.y * 4.); return uP0.y > 0. ? (1. - f * f) * 3. : 0.; }
float mapG(vec3 p){
float d = sdBox(p - vec3(0, -.3, 0), vec3(9.8, .3, 9.8)); gmat = 0.; gpiece = 0.;
vec2 c = floor(p.xz + .5);
gcell = c;
vec4 s = st(c);
if (s.r > .5){
float drop = dropOf(s), sz = max(stoneSize(s), .02);
vec3 q = p - vec3(c.x, .205 + drop, c.y);
float ds = (length(q / (vec3(.47, .2, .47) * sz)) - 1.) * .2 * sz;
if (ds < d){ d = ds; gmat = 1. + (s.r < 1.5 ? 1. : 0.); }
}
if (s.b > 0.){
int mask = int(s.b + .5);
for (int k = ZERO; k < 4; k++){
if ((mask & (1 << k)) == 0) continue;
vec4 S = uSh[k], Q = uShE[k];
vec3 pp = p - vec3(S.x, .205, S.y);
float b = max(length(pp) - abs(S.w), p.y - Q.x);
if (b > .05){ d = min(d, b); continue; }
pp.xz = mat2(Q.z, -Q.w, Q.w, Q.z) * pp.xz;
for (int j = ZERO; j < NP; j++){
int i = k * NP + j;
vec3 v = pp - uPc[i].xyz;
b = length(v) - SHM[j].w * Q.y;
if (b > .05){ d = min(d, b); continue; }
float cu, el, dj = pieceD(j, SHM[j].xyz + qrot(uPq[i], v) / max(Q.y, .02), cu, el) * Q.y;
if (dj < d){ d = dj; gmat = S.w > 0. ? 2. : 1.; gpiece = float(i + 1); }
}
}
}
vec2 cf = abs(p.xz - c);
d = min(d, max(p.y - .41 - max(max(dropH(), uP1.z), uP1.w), .53 - max(cf.x, cf.y)));
return d;
}
vec3 normG(vec3 p){ vec2 e = vec2(.0008, 0); return normalize(vec3(mapG(p + e.xyy) - mapG(p - e.xyy), mapG(p + e.yxy) - mapG(p - e.yxy), mapG(p + e.yyx) - mapG(p - e.yyx))); }
float marchG(vec3 ro, vec3 rd, int n){
float top = max(max(dropH(), uP1.z), uP1.w);
vec3 ird = 1. / vec3(abs(rd.x) < 1e-6 ? 1e-6 : rd.x, abs(rd.y) < 1e-6 ? 1e-6 : rd.y, abs(rd.z) < 1e-6 ? 1e-6 : rd.z);
vec3 b0 = (vec3(-9.81, -.61, -9.81) - ro) * ird, b1 = (vec3(9.81, .42 + top, 9.81) - ro) * ird;
vec3 lo = min(b0, b1), hi = max(b0, b1);
float te = max(max(lo.x, lo.y), lo.z), tx = min(min(min(hi.x, hi.y), hi.z), 60.);
if (te > tx || tx < .01) return 1e9;
float T = rd.y < 0. ? (ro.y - .94 - top) / -rd.y : -1.;
int k = T < .01 ? 0 : min(int(floor((min(T, 61.) - .01) / .4)) + 1, n);
float t = .01 + .4 * float(k);
if (t > 60.) return 1e9;
for (int i = k; i < n; i++){ float d = mapG(ro + rd * t); if (d < .0004 * t + .0002) return t; t += min(d * .9, .4); if (t > tx) break; }
return 1e9;
}
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
if (uP0.z > 0.) for (int j = -3; j <= 3; j++) for (int i = -3; i <= 3; i++){
vec2 cc = floor(p.xz + .5) + vec2(i, j);
if (landed(cc)){ vec2 dd = p.xz - cc; inf += (isBlack(cc) > .5 ? 1. : -1.) * exp(-dot(dd, dd) * .35); }
}
alb += (inf > 0. ? vec3(1.2, .3, .9) : vec3(.25, .85, 1.4)) * min(abs(inf), 1.2) * .08 * uP0.z;
float sh = 1.;
vec2 so = L.xz / L.y * .2;
for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++){
vec2 cc = floor(p.xz + .5) + vec2(i, j);
vec4 sc = st(cc);
if (sc.r < .5) continue;
float hh = dropOf(sc), k = (1. - sat(hh / 1.2)) * stoneSize(sc);
if (k <= 0.) continue;
sh *= mix(1., .35, smoothstep(.62 + hh * .3, .3, length(p.xz - cc + so * (1. + hh * 4.))) * k);
sh *= mix(1., .45, smoothstep(.56, .38, length(p.xz - cc)) * k * k);
}
float mask = st(floor(p.xz + .5)).b;
if (mask > 0.) for (int k = ZERO; k < 4; k++){
if ((int(mask + .5) & (1 << k)) == 0) continue;
vec4 S = uSh[k], Q = uShE[k];
vec2 dd = p.xz - S.xy;
glow += exp(-dot(dd, dd) * 5.) * (1. - sat(S.z / .8)) * 1.2;
mat2 Y = mat2(Q.z, Q.w, -Q.w, Q.z);
for (int j = ZERO; j < NP; j++){
vec3 q = uPc[k * NP + j].xyz;
float hh = max(q.y + .12, 0.), R = SHM[j].w * Q.y;
sh *= mix(1., .45, smoothstep(R * 1.2 + hh * .3, R * .3, length(dd - Y * q.xz + so * (1. + hh * 4.))) * (1. - sat(hh / 1.2)));
}
}
alb *= sh; refl *= .4 + .6 * sh;
float rip = length(p.xz - M37);
float lk = sat((uP0.y - .25) / .75);
glow += exp(-abs(rip - lk * 14.) * 3.) * (1. - sat(lk * 1.2)) * step(.001, lk) * 2.;
glow += exp(-rip * rip * 3.) * glow37() * .45;
} else {
bool white = m < 1.5;
alb = white ? vec3(.8, .8, .78) : vec3(.01); refl = white ? .15 : .45;
if (gpiece > .5){
int i = int(gpiece - .5), k = i / NP, j = i - k * NP;
vec4 S = uSh[k], Q = uShE[k];
float cu, el;
vec3 pp = p - vec3(S.x, .205, S.y);
pp.xz = mat2(Q.z, -Q.w, Q.w, Q.z) * pp.xz;
vec3 q = SHM[j].xyz + qrot(uPq[i], pp - uPc[i].xyz) / max(Q.y, .02);
pieceD(j, q, cu, el);
float face = smoothstep(-.004, .004, cu - el);
vec4 A = SHC[j * 3], B = SHC[j * 3 + 1], C = SHC[j * 3 + 2];
float crack = min(min(abs(dot(A.xyz, q) + A.w), abs(dot(B.xyz, q) + B.w)), abs(dot(C.xyz, q) + C.w));
alb = mix(alb, white ? vec3(.6, .58, .53) : vec3(.05, .05, .055), face); refl = mix(refl, .04, face);
glow += face * 2. * exp(-S.z * 4.5) + (1. - face) * (exp(-crack / .012) * 3. * (1. - smoothstep(SH_CRACK - .02, SH_CRACK + .06, S.z))
+ (.3 + 1.6 * pow(1. - max(dot(-rd, n), 0.), 2.)) * exp(-S.z * 7.));
}
}
if (m > .5 && gpiece < .5 && st(c).a == 37.) glow += pow(1. - max(dot(-rd, n), 0.), 2.5) * glow37() * 2.2 * stoneSize(st(c));
float dif = max(dot(n, L), 0.), sp = pow(max(dot(reflect(rd, n), L), 0.), 60.);
if (m > .5) dif *= .55 + .45 * smoothstep(-.05, .12, p.y);
return alb * (dif * 1.2 + .05) + vec3(1., .95, .9) * sp * (m > .5 ? .9 : .25) + vec3(1.4, .95, .5) * glow;
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
if (uP0.y >= .25){
vec3 s = vec3(M37.x, .2, M37.y) - ro;
float tc = dot(s, rd), dh = length(s - rd * max(tc, 0.)), px = tc * uTanHalf * 2. / uRes.y;
col += vec3(1.4, .95, .5) * glow37() * .05 / (1. + dh * dh * 40.) * smoothstep(t + .3, t - .3, tc) * step(px, .2);
}
outColor = vec4(col, 1.);
}`}(se=ze.shaders).scenes.fold=`
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
vec3 c1 = uB[min(i + 1, NB - 1)].xyz, m = (c + c1) * .5 - ro;
float mb = dot(m, rd), mh = dot(m, m) - mb * mb, hl = length(c1 - c) * .5 + .001;
if (mh >= (hl + RB) * (hl + RB)) continue;
float t = sphI(ro, rd, c, RB);
if (t > 0. && t < tm){ tm = t; hi = i; kind = 0; }
if (i < NB - 1 && mh < (hl + RC) * (hl + RC)){ t = capI(ro, rd, c, c1, RC); if (t > 0. && t < tm){ tm = t; hi = i; kind = 1; } }
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
vec3 oc = uP1.xyz - ro; float T = dot(oc, rd), D = sqrt(max(0., dot(oc, oc) - T * T));
if (D - uP1.w - RB >= .2 * (T + uP1.w)) return 1.;
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
float fr = .12 + .5 * pow(max(1. - abs(rd.y), 0.), 5.);
col += (rt > 0. ? shade(p, rr, rt, rn, ra, true) : bg(rr) * .5) * fr;
col = mix(col, bg(rd), 1. - exp(-tf * .02));
} else col = bg(rd);
outColor = vec4(col, 1.);
}`,se.scenes.fusion=`
const float R0 = 3., SEC = 6.2831853 / 16., FLOOR = -3.3;
float sdTor(vec3 p, float R, float r){ return length(vec2(length(p.xz) - R, p.y)) - r; }
float mapF(vec3 p, out float id){
float a = atan(p.z, p.x), ai = (floor(a / SEC) + .5) * SEC;
vec3 q = vec3(cos(ai) * p.x + sin(ai) * p.z, p.y, -sin(ai) * p.x + cos(ai) * p.z);
float o = sdBox2(vec2(q.x - R0 - .05, q.y), vec2(1.25, 1.65)) - .25;
float coil = max(abs(o) - .11, abs(q.z) - .085) - .015;
vec2 cs = abs(vec2(length(p.xz), p.y)) - vec2(.9, 2.4);
float sol = min(max(cs.x, cs.y), 0.) + length(max(cs, 0.)) + sin(p.y * 28.) * .004;
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
for (int i = 0; i < 130; i++){ float d = mapF(ro + rd * t); if (d < .0008 * t) return t; t += d * .9; if (t > tmax) return -1.; }
return t;
}
float pow40(float x){ x *= x * x * x * x; x *= x; x *= x; return x * x; }
vec3 plasmaAt(vec3 p, float dx, float rho){
if (rho > .85) return vec3(0);
float th = atan(p.y / 1.5, dx), ph = atan(p.z, p.x);
vec3 c = vec3(0);
for (int i = 0; i < 3; i++){
float fi = float(i), rs = .2 + fi * .19, m = 5. + fi * 2.;
float e = (rho - rs) / .028;
if (abs(e) > 4.) continue;
float lines = pow40(.5 + .5 * cos(m * th - m * (1.6 + fi * .9) * ph + uP0.y * (3. + fi)));
float shell = exp(-e * e);
c += mix(vec3(.5, .55, 1.6), vec3(1.4, .45, 1.1), fi * .5) * lines * shell * 2.2;
}
float core = exp(-rho * rho / .012), halo = exp(-rho * rho / .3);
float fn = noise(vec3(th * 2., ph * 9., uTime * .7)); fn *= fn;
float fil = fn * fn * exp(-rho * rho / .1);
c += vec3(1.3, 1.05, 1.5) * core * .9 + vec3(1., .3, .8) * (halo * .035 + fil * .5);
return c * (.85 + .15 * noise(p * 3. + vec3(0, uTime * 2., 0))) * uP0.x * (1. + uP0.z * .4);
}
vec3 plasma(vec3 ro, vec3 rd, float tmax){
vec3 acc = vec3(0);
if (uP0.x <= 0.) return acc;
float t = .02 + .03 * hash21(gl_FragCoord.xy + fract(uTime) * 17.);
for (int i = 0; i < 110; i++){
vec3 p = ro + rd * t;
float dx = length(p.xz) - R0, rho = length(vec2(dx, p.y / 1.5)), db = rho - .9;
if (db > 0.){ t += max(db, .04); }
else { float dt = .035; acc += plasmaAt(p, dx, rho) * dt; t += dt; }
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
thr *= alb * (.06 + .6 * fre) * .9;
ro = p + n * .004; rd = reflect(rd, n);
} else if (tf < 45.){
vec3 p = ro + rd * tf;
vec2 g = abs(fract(p.xz * .5) - .5);
float grid = smoothstep(.02 + tf * .002, .0, .5 - max(g.x, g.y));
col += thr * (vec3(.004, .004, .008) + vec3(.2, .05, .15) * grid * .12 * uP0.x / (1. + dot(p.xz, p.xz) * .02) + ringLight(p, vec3(0, 1, 0)) * .05);
thr *= .5 * (.25 + .75 * pow(max(1. - abs(rd.y), 0.), 3.));
ro = p + vec3(0, .002, 0); rd = reflect(rd, vec3(0, 1, 0));
} else { col += thr * bgF(rd); break; }
}
outColor = vec4(col, 1.);
}`,(fe=ze.shaders).cityLib=`
float cityX(float z){ return sin(z * .021) * 7. + sin(z * .0083 + 1.3) * 11.; }
const float HMAX = 5.2;
float chipIn(vec2 c, float ax, out vec4 fp){
float street = step(mod(c.x, 6.), .5) + step(mod(c.y, 9.), .5);
float avenue = step(abs(c.x + .5 - ax), 2.6);
if (street + avenue > 0.) return 0.;
vec4 h = vec4(hash21(c), hash21(c + 17.31), hash21(c + 41.7), hash21(c + 93.1));
fp = vec4(.08 + .25 * h.y, .08 + .25 * h.z, .92 - .25 * h.w, .92 - .25 * h.x);
if (h.x < .22) return 0.;
float tall = pow(hash21(floor(c / 3.) + 5.1), 4.);
return .12 + h.z * h.z * .9 + tall * (1.2 + 3. * h.w);
}
float traceCity(vec3 ro, vec3 rd, int steps, float tmax, out vec3 nrm, out vec2 cell, out vec4 fp, out float hgt){
nrm = vec3(0, 1, 0); cell = vec2(0); fp = vec4(0); hgt = 0.;
float tg = rd.y < 0. ? -ro.y / rd.y : 1e9;
float t0 = 0.;
if (ro.y > HMAX){ if (rd.y >= 0.) return 1e9; t0 = (ro.y - HMAX) / -rd.y; }
vec2 c = floor(ro.xz + rd.xz * (t0 + 1e-4)), sg = vec2(rd.x < 0. ? -1. : 1., rd.z < 0. ? -1. : 1.);
vec2 dt = 1. / max(abs(rd.xz), 1e-6), tM = (c + max(sg, 0.) - ro.xz) * sg * dt;
vec3 ird = 1. / vec3(abs(rd.x) < 1e-6 ? 1e-6 : rd.x, abs(rd.y) < 1e-6 ? 1e-6 : rd.y, abs(rd.z) < 1e-6 ? 1e-6 : rd.z);
float tc = t0, ax = cityX(c.y + .5);
for (int i = 0; i < 96; i++){
if (i >= steps) break;
vec4 f; float h = chipIn(c, ax, f);
float tn = min(tM.x, tM.y);
if (h > 0.){
vec3 lo = vec3(c.x + f.x, 0., c.y + f.y), hi = vec3(c.x + f.z, h, c.y + f.w);
vec3 i0 = (lo - ro) * ird, i1 = (hi - ro) * ird, a = min(i0, i1), b = max(i0, i1);
float te = max(max(a.x, a.y), a.z), tx = min(min(b.x, b.y), b.z);
if (te <= tx && tx > 0. && te < tg){
nrm = te == a.x ? vec3(-sign(rd.x), 0, 0) : te == a.y ? vec3(0, -sign(rd.y), 0) : vec3(0, 0, -sign(rd.z));
cell = c; fp = f; hgt = h;
return te;
}
}
if (tg < tn) break;
tc = tn;
if (tc > tmax) return 1e9;
if (rd.y > 0. && ro.y + rd.y * tc > HMAX) return 1e9;
if (tM.x < tM.y){ c.x += sg.x; tM.x += dt.x; } else { c.y += sg.y; tM.y += dt.y; ax = cityX(c.y + .5); }
}
if (tg < tmax){ cell = floor(ro.xz + rd.xz * tg); return tg; }
return 1e9;
}
`,fe.scenes.drop=fe.cityLib+`
vec3 SUN(){ return normalize(uP1.xyz); }
vec3 accent(float k){ k = mod(k, 4.); return k < 1. ? vec3(.25, .85, 1.45) : k < 2. ? vec3(1.3, .35, 1.1) : k < 3. ? vec3(1.4, .85, .3) : vec3(.6, 1.2, 1.4); }
vec3 sky(vec3 rd){
vec3 s = SUN();
float sd = max(dot(rd, s), 0.), up = rd.y;
vec3 col = mix(vec3(.03, .012, .016), vec3(.002, .003, .012), smoothstep(-.02, .3, up));
col += vec3(1., .42, .16) * (exp(-abs(up) * 30.) * .1 + pow(sd, 14.) * .1) * (1. + uP0.z * 2.);
col += vec3(1., .65, .35) * pow(sd, 300.) * 1.2;
col += vec3(1.6, 1.3, 1.) * smoothstep(.99955, .9998, sd) * 5.;
col += starfield(rd, .07, .5) * smoothstep(.04, .3, up);
return col;
}
vec3 circuit(vec2 p, float px, float t){
vec2 c = floor(p * 2.), f = fract(p * 2.) - .5;
float h = hash21(c), hz = hash21(vec2(c.x, 0.)), hx = hash21(vec2(0., c.y) + 7.);
float w = px * 2.5;
float lz = step(.4, hz) * smoothstep(w + .025, .025, abs(f.x));
float lx = step(.8, hx) * step(.5, h) * smoothstep(w + .02, .02, abs(f.y));
float via = smoothstep(w + .03, .0, abs(length(f) - .08)) * step(.86, h);
float data = pow(fract((p.y - t * (40. + 34. * hz)) * .025 + hz * 7.), 30.) * 7.;
float k = .55 + uP0.x * 1.6;
vec3 a = accent(uP0.w + step(.7, hz) * 2.);
return a * (lz * (.1 * k + data) + lx * .12 * k + via * .35 * k) * smoothstep(.06, .01, px) * min(1., .05 / (w + .025));
}
vec3 shadeCity(vec3 ro, vec3 rd, float t, vec3 n, vec2 c, vec4 f, float h, bool refl){
vec3 p = ro + rd * t, s = SUN();
float px = t * uTanHalf * 2. / uRes.y;
vec3 col;
vec3 a = accent(uP0.w + step(.82, hash21(c + 3.3)) * 2.);
if (h <= 0.) col = vec3(.003, .004, .006) + circuit(p.xz, px, uTime);
else {
vec2 lo = c + f.xy, hi = c + f.zw;
float ed = min(min(p.x - lo.x, hi.x - p.x), min(p.z - lo.y, hi.y - p.z));
float top = h - p.y, w = px * 1.6;
if (n.y > .5){
vec2 g = abs(fract(p.xz * 4.) - .5);
col = vec3(.004, .005, .008) + a * smoothstep(w + .008, .008, min(g.x, g.y)) * .025 * smoothstep(.03, .01, px);
col += a * smoothstep(w + .015, .0, ed) * (1. + uP0.x * 1.5) * min(1., .03 / (w + .015));
} else {
float u = dot(p.xz, vec2(-n.z, n.x));
vec2 q = vec2(u * 6., p.y * 4.), qi = floor(q), qf = fract(q) - .5;
float on = step(.86, hash21(qi + c * 13.1 + floor(uTime * 4. + hash21(qi) * 4.) * .37));
float led = smoothstep(.16, .06, length(qf)) * on * step(.3, p.y) * step(.25, top) * smoothstep(.06, .03, px);
col = vec3(.002, .0025, .004) + mix(a, vec3(1.4, .8, .4), step(.85, hash21(qi + 9.))) * led * (.6 + uP0.y * 1.4);
float ev = abs(n.x) > .5 ? min(p.z - lo.y, hi.y - p.z) : min(p.x - lo.x, hi.x - p.x);
float thin = min(1., .03 / (w + .015));
col += a * smoothstep(w + .018, .0, top) * (1.2 + uP0.x * 1.8) * thin;
col += a * smoothstep(w + .01, .0, ev) * .35 * thin;
col += vec3(.8, .6, .3) * step(p.y, .05) * step(.55, fract(u * 16.)) * .12;
}
}
col += vec3(1., .45, .2) * pow(max(dot(n, s), 0.), 2.) * .03;
float fog = 1. - exp(-t * (refl ? .03 : .02));
vec3 hz = vec3(.05, .022, .02) + vec3(1., .42, .16) * pow(max(dot(rd, s), 0.), 14.) * .12;
return mix(col, hz, fog);
}
void main(){
vec3 ro = uCamPos, rd = rayDir();
vec3 n; vec2 c; vec4 f; float h;
float t = traceCity(ro, rd, 96, 140., n, c, f, h);
vec3 col = sky(rd);
if (t < 1e8){
col = shadeCity(ro, rd, t, n, c, f, h, false);
if (n.y > .5){
vec3 p = ro + rd * t, rr = reflect(rd, n);
float fr = .04 + .5 * pow(1. - max(dot(-rd, n), 0.), 5.);
vec3 n2; vec2 c2; vec4 f2; float h2;
float t2 = traceCity(p + n * .002, rr, 40, 60., n2, c2, f2, h2);
vec3 rc = t2 < 1e8 ? shadeCity(p, rr, t2, n2, c2, f2, h2, true) : sky(rr);
col += rc * fr * (h > 0. ? .6 : 1.) * exp(-t * .01);
}
}
col += vec3(1., .85, .7) * uP0.z * uP0.z * 3.;
outColor = vec4(col, 1.);
}`,ze.script={END:272,c64:{on:.5,banner:1.5,boot:["","    **** COMMODORE 64 BASIC V2 ****",""," 64K RAM SYSTEM  38911 BASIC BYTES FREE","","READY."],typing:[[2.7,"10 PRINT CHR$(205.5+RND(1));:GOTO 10",8.5,.35],[8.1,"RUN",7,.1]],runAt:8.9,off:14,pulses:[15,15.5,15.75,15.875],coda:{at:256,creditsAt:257.4,creditsTo:265.4,burstAt:266},credits:["BIRTH & DEATH OF THE DIGITAL UNIVERSE","","100% PROCEDURAL. NO SAMPLES.","RENDERED LIVE ON YOUR GPU.","","MADE WITH OPUS 5.5."]},convAnswers:[52,52.75,53.5,54,54.75,55.5,56,56.75,57.5,58,58.75,59.5,60,60.75,61.5,62],go:{moves:`
      pd dp cd qp op oq nq pq cn fq mp qn ic dj po qo cp cq bq co bp bo do bn
      dq ep dr cm jp cg ed qf qe pf nd pi oj oi nj mh gp gq dn dm fo hp ho eo
      en fn em el fm gn fl go ek dk dl cl eh di pj qi rf rg kd hn om re rd sf
      fi gk hm in hl ko kp gc df id jc ge dg cf ch bh dh bi hd he gd fd hc fe
      ec gh fc gi ii hk ik il im ij jl jj if km kl lj lk lo li kj ci cj mj nr
      mr lq lp mq np lr lm kh hg qc qd rc pc sd gg ce bd qb hi jg hj ob pb pa
      nb de ee gj hh ej nf mf me rk fh el nh ng lg lh mg og kg ni jh na ki mi
      ji nc mb od mc oc kr ms io ip jo jn ir hr ql rl qm rm ao bm ln kn mo be
      ae af ad ma la oa dd bg lb pn on er cr fp iq hq qj rj ks`.trim().split(/\s+/),move0:104,dt:.125,land:110,rest0:111.6,rest1:117.2,win:117.5,result:"211 moves. white resigned.",at(e){return e<=36?this.move0+(e-1)*this.dt:37===e?this.land:this.rest0+(this.rest1-this.rest0)*Math.pow((e-38)/173,.6)}},lstm:{tokens:["the","queen","who","ruled","the","land","for","fifty","years","said","that"],read0:65,dt:1,out:76,outWord:"she",lanes:[[1,-1,1],[2,9,2],[5,9,3],[7,8,4]]},embed:{fly:[80,81.6],analogies:[["man","woman","king","queen",82.5],["france","paris","italy","rome",88.5]],more:[["germany","berlin",89.5],["japan","tokyo",90],["turkey","ankara",90.5]],things:["donut","sports ball","cup","apple","orange","clock","bottle"]},eras:[[32.6,39.6,"1958","PERCEPTRON","one neuron that learned. it could tell left from right.",6],[40.6,47.4,"1986","BACKPROPAGATION","the blame flows backwards, through every weight.",120],[48.6,57.4,"1989","CONVOLUTION","it learned to read handwriting, one small filter at a time.",6e4],[64.6,79.4,"1997","LSTM","it learned what to remember, and what to forget.",1e6],[80.6,93.4,"2013","WORD EMBEDDINGS","every word, a place. meaning, a direction.",1e7],[96.6,102.5,"2015","YOLO","you only look once. it looked at everything.",65e6],[104.6,119.4,"2016","ALPHAGO","move 37: one in ten thousand. no human would have played it.",1e8],[120.6,127.6,"2017","TRANSFORMER","attention: each new word looks back at every word before it.",65e6],[128.6,135.4,"2020","ALPHAFOLD","a fifty-year-old problem. folded.",1e8],[136.6,143.4,"2026","NAVIER–STOKES","a million-dollar problem. 88 hours of machine thought.",1e24],[144.6,152.4,"2018","LANGUAGE MODELS","it read everything we ever wrote. then it wrote back.",1e12],[160.6,167.4,"2030","FUSION","always thirty years away. it took thirty minutes.",1e24],[168.6,175.4,"2031","PLANETARY COMPUTE","it needed more. so it took the planet.",1e24]],log:[[144,"2018","GPT-1","117M parameters"],[144.5,"2018","BERT","it reads both ways"],[145,"2019","GPT-2",'"too dangerous to release"'],[145.5,"2019","T5","every task is text to text"],[146,"2020","GPT-3","175B · few-shot learning"],[146.5,"2021","CLIP · DALL·E","words meet pictures"],[147,"2021","CODEX","it learned to code"],[147.5,"2022","CHINCHILLA","more data, fewer parameters"],[148,"2022","PALM","540B parameters"],[148.5,"2022","CHATGPT","100M users in two months"],[149,"2023","LLAMA","open weights"],[149.5,"2023","GPT-4 · CLAUDE","multimodal"],[150,"2023","TOOL USE",'{"type": "tool_use"}'],[150.5,"2023","GEMINI","natively multimodal"],[151,"2024","CLAUDE 3 OPUS","200K context"],[151.5,"2024","GPT-4O","it sees, hears and speaks"],[152,"2024","O1 · THINKING...","reasoning models"],[152.5,"2025","DEEPSEEK-R1","open reasoning"],[153,"2025","AGENTS","computer use · MCP · code"],[153.5,"2025","CLAUDE 4 · GPT-5","hours of work, alone"],[154,"2026","DYNAMIC HARNESS","agents orchestrating agents"],[154.5,"2027","RECURSIVE TRAINING","the model trains the model"],[155,"2027","SELF-IMPROVEMENT","×2 per week"],[155.5,"2027","SELF-IMPROVEMENT","×2 per day"],[156,"2027","SELF-IMPROVEMENT","×2 per hour"]],selfLog:{from:156.5,to:157.5},logTo:158.4,attention:{from:120.2,to:128,prompt:3,step0:120.5,dt:.75,land:.667,tokens:["the","universe","is","a","network","learning","to","attend","to","itself","."],cands:[[["a",.41],["expanding",.22],["not",.12],["infinite",.08],["made",.05]],[["network",.37],["simulation",.24],["story",.11],["machine",.09],["mystery",.06]],[["learning",.46],["of",.21],["that",.13],["trying",.07],["waiting",.04]],[["to",.71],["from",.12],["itself",.06],["how",.04],["about",.03]],[["attend",.33],["see",.19],["think",.17],["know",.12],["wake",.06]],[["to",.88],["inward",.04],["again",.03],[".",.02],["forever",.01]],[["itself",.52],["everything",.18],["you",.11],["us",.07],["nothing",.04]],[[".",.81],["again",.07],["forever",.05],["now",.03],["first",.02]]]},quotes:[],words:[],wordsFrom:184,title:[19,27.5]},ze.synthCore=function(){let V=44100,a=new Float32Array(8193);for(let e=0;e<=8192;e++)a[e]=Math.sin(2*Math.PI*e/8192);function C(e){var e=8192*(e-=Math.floor(e)),t=0|e;return a[t]+(a[1+t]-a[t])*(e-t)}function M(e,t){return e<t?(e/=t)+e-e*e-1:1-t<e?(e=(e-1)/t)*e+e+e+1:0}function A(e,t){return 2*e-1-M(e,t)}function k(e,t){let a=e+.5;return 1<=a&&--a,(e<.5?1:-1)+M(e,t)-M(a,t)}function P(e){return 1-4*Math.abs(e-.5)}let S=e=>440*Math.pow(2,(e-69)/12),L=-9.21;function j(e){let t=0|Math.imul(2654435769+(0|e),2654435761)||1;return()=>(t=(t=(t^=t<<13)^t>>>17)^t<<5)/2147483648}class G{constructor(){this.ic1=0,this.ic2=0,this.a1=1,this.a2=0,this.a3=0,this.k=1,this.bp=0,this.hp=0}set(e,t){e=Math.tan(Math.PI*Math.min(Math.max(e,10),.45*V)/V);this.k=1/t,this.a1=1/(1+e*(e+this.k)),this.a2=e*this.a1,this.a3=e*this.a2}run(e){var t=e-this.ic2,a=this.a1*this.ic1+this.a2*t,t=this.ic2+this.a2*this.ic1+this.a3*t;return this.ic1=2*a-this.ic1,this.ic2=2*t-this.ic2,this.bp=a*this.k,this.hp=e-this.k*a-t,t}}let h=null,F=(e,t)=>!!h&&t>h.e0&&e<h.t1+.5,D=e=>Math.pow(2,(e=>{var t=h;if(!t||e<t.e0)return 0;let a=4*-(Math.min(e,t.t1)-t.e0)+14*Math.sin(1.9*(e-t.e0));return e>t.t0&&(e=Math.min((e-t.t0)/(t.t1-t.t0),1),a-=3600*e*e),a})(e)/1200);function r(e,t){e=new Float32Array(Math.round(e*V));return t(e),e}let u=r(.46,c=>{let n=0,i=0,s=j(99);for(let l=0;l<c.length;l++){let e,t=l/V,a=t<.07?200*Math.pow(.26,t/.07):52*Math.pow(40/52,Math.min((t-.07)/.31,1)),o=(n+=a/V,t<.004?t/.004:t<.04?1:Math.exp(L*(t-.04)/.41)),r=C(n)*o;t<.02&&(e=s(),r+=.15*(e-i)*Math.exp(250*-t),i=e),c[l]=1.1*r/(1+.3*Math.abs(r))}}),e=(e,a)=>Array.from({length:e},(e,t)=>a(7919*t+13)),p=e(4,e=>r(.3,t=>{var a=j(e),o=new G;o.set(1900,.8);let r=0;for(let e=0;e<t.length;e++){var l=e/V;o.run(a()),r+=210*Math.pow(150/210,Math.min(l/.1,1))/V,t[e]=.9*o.bp*Math.exp(L*l/.24)+(l<.14?.45*P(r-Math.floor(r))*Math.exp(L*l/.12):0)}})),v=e(4,e=>r(.35,t=>{var a=j(e),o=new G;o.set(1150,1.3);for(let e=0;e<t.length;e++){var r=e/V,r=(o.run(a()),r<.009?.7-.6*r/.009:r<.011?.1:r<.02?.7-.6*(r-.011)/.009:r<.022?.1:.75*Math.exp(L*(r-.022)/.278));t[e]=o.bp*r*1.6}})),t=(e,l)=>r(l?.35:.08,t=>{var a=j(e),o=new G;o.set(7200,.9);for(let e=0;e<t.length;e++){var r=e/V;o.run(a()),t[e]=.45*o.hp*Math.exp(L*r/(l?.3:.05))}}),x=e(4,e=>t(e,!1)),b=e(4,e=>t(e+1,!0)),y=r(.6,a=>{for(var[o,r]of[[0,1],[.27,.7]]){let t=0;for(let e=Math.round(o*V);e<a.length;e++){var l=e/V-o;if(.3<l)break;t+=70*Math.pow(.6,Math.min(l/.13,1))/V,a[e]+=C(t)*r*(l<.006?l/.006:Math.exp(L*(l-.006)/.254))}}}),w=e(4,e=>r(.02,t=>{var a=j(e),o=new G;o.set(3500+37*e%2e3,2);for(let e=0;e<t.length;e++)o.run(a()),t[e]=o.bp*Math.exp(-(e/V)/.004)*2})),o=e=>{let t=null;return()=>t=t||e()},l=(t,e=.005,a=0)=>{var o=Math.round(a*V),r=Math.round(e*V);for(let e=0;e<o;e++)t[e]*=e/o;for(let e=0;e<r;e++)t[t.length-1-e]*=e/r;return t},c=(e,t,a,o)=>l(r(e,t),a,o),Y=e=>Math.exp(-6.91/(e*V)),U=e=>1-Math.exp(-1/(e*V)),H=o(()=>{var t=j(4242),a=new Float32Array(5*V);for(let e=0;e<a.length;e++)a[e]=t();return a}),X=e=>0|Math.round(e/V*4294967296),$=e=>2147483648*e()|0,g=o(()=>e(2,e=>{let t=j(e),i=Math.round(2.6*V),s=new Float32Array(i),f=new Float32Array(i),d=H(),u=Math.round(.5*(1&e)*V),h=u+Math.round(1.2*V),p=new G,v=new G,m=new G,x=new G,a=1+.05*t(),[g,b,y,w,M,k]=[540,1410,820,2050,1110,2700].map(e=>X(e*a)),P=Y(.9),z=Y(2.6),T=Y(1.9),A=Y(3.2),E=Math.exp(-1/(.005*V)),q=Math.exp(-1/(.08*V)),R=U(.012),C=$(t),S=$(t),L=$(t),F=$(t),D=$(t),I=$(t);p.set(700,.7),v.set(4e3,.6),m.set(4e3,.5),x.set(4e3,.5);for(let e=0,t=.08*.55,a=.066,o=.4*.55,r=.14*.55,l=.385,c=.55,n=0;e<i;e++,t*=P,a*=z,o*=T,r*=A,l*=E,c*=q,n+=(1-n)*R){C=C+g|0,S=S+b|0,L=L+y|0,F=F+w|0,D=D+M|0,I=I+k|0,p.run(((C^S)>>31|1)+((L^F)>>31|1)+((D^I)>>31|1));var N=d[u+e],O=d[h+e],B=m.run(N),O=(x.run(O),o+.45*c),_=r*n+.12*c,N=v.run(p.hp)*t+v.hp*(a+.07*c)+(N-B)*l;s[e]=N+m.bp*O+m.hp*_,f[e]=N+x.bp*O+x.hp*_}return[l(s,.04,44/V),l(f,.04,44/V)]})),n=(e,k)=>c(k?1.8:1.4,i=>{let s=j(e),r=new G,l=H(),c=Math.round((s()+1)*V),[n,f,d,u]=[1730,4110,2390,5260].map(X),h=Y(k?.9:1.5),p=Math.exp(-1/((k?.003:.0025)*V)),v=U(.012),m=k?0:.12,x=$(s),g=$(s),b=$(s),y=$(s);r.set(7e3,.8);for(let e=0,t=k?.05:.09,a=k?.6:.45,o=0;e<i.length;e++,t*=h,a*=p,o+=(1-o)*v)x=x+n|0,g=g+f|0,b=b+d|0,y=y+u|0,r.run(l[c+e]+(((x^g)>>31|1)+((b^y)>>31|1))*m),i[e]=r.bp*t*o+r.hp*a;{let a=i,e=(k?[[881,.14,1.8],[884,.05,1.6],[1326,.05,.9],[2101,.09,1.3],[2107,.03,1.1],[2627,.05,.8],[3489,.03,.6]]:[[2110,.02,.5],[3150,.06,.9],[3155,.025,.85],[3690,.045,.7],[4420,.035,.6],[5210,.03,.5]]).map(([e,t,a])=>[e,t*(1+.25*s()),a]),o=e.length,r=new Float64Array(o),l=new Float64Array(o),c=new Float64Array(o),n=new Float64Array(o);e.forEach(([e,t,a],o)=>{e=2*Math.PI*e/V,a=Math.exp(-6.91/(a*V));r[o]=2*a*Math.cos(e),l[o]=a*a,n[o]=t*a*Math.sin(e)});var t=Math.min(a.length,Math.round(1.1*Math.max(...e.map(e=>e[2]))*V));for(let e=0;e<t;e++){let t=0;for(let e=0;e<o;e++){var w=c[e],M=n[e];t+=w,c[e]=M,n[e]=r[e]*M-l[e]*w}a[e]+=t}}},.03),T=o(()=>e(3,e=>n(e,!1))),E=o(()=>e(2,e=>n(e+1,!0))),i=(e,y)=>c(y?.4:.07,a=>{let t=j(e),o=new G,r=new G,[l,c,n,i,s,f]=[205.3,304.4,369.6,522.7,540,800].map(e=>X(1.45*e*(1+.01*t()))),d=Math.exp(L/((y?.38:.055)*V)),u=H(),h=Math.round(2*(t()+1)*V),p=$(t),v=$(t),m=$(t),x=$(t),g=$(t),b=$(t);o.set(9e3,1.2),r.set(6500,.7);for(let e=0,t=2.4;e<a.length;e++,t*=d)p=p+l|0,v=v+c|0,m=m+n|0,x=x+i|0,g=g+s|0,b=b+f|0,o.run(.4*((p>>31)+(v>>31)+(m>>31)+(x>>31)+(g>>31)+(b>>31)+3)+.15*u[h+e]),r.run(o.bp),a[e]=r.hp*t}),q=o(()=>e(4,e=>i(e+2,!1))),R=o(()=>e(4,e=>i(e+3,!0))),O=o(()=>{let d=r(.32,c=>{var n=Math.exp(-1/(.012*V)),i=Math.exp(-1/(.032*V)),s=Math.exp(-1/(.022*V));for(let e=0,t=0,a=0,o=.75,r=.4,l=1;e<c.length;e++,o*=i,r*=s,l*=n)t+=180*(1+.14*l)/V,a+=330*(1+.1*l)/V,c[e]=C(t)*o+C(a)*r});return e(4,e=>c(.32,o=>{var r=new G,l=new G,c=H(),n=Math.round(.618*e%1*4*V),i=Math.exp(-1/(.007*V)),s=Math.exp(-1/(.045*V));r.set(1500,.7),l.set(4e3,.7);for(let e=0,t=1.1,a=.45;e<o.length;e++,t*=i,a*=s){var f=c[n+e],f=(r.run(f),l.run(f),d[e]+r.hp*t+l.bp*a);o[e]=.63*f/(1+.4*Math.abs(f))}},.005,8e-4))}),B=o(()=>e(4,e=>c(.13,a=>{var o=new G,r=H(),l=Math.round(.382*e%1*4*V),c=Math.exp(L/(.11*V));o.set(7e3,1.4);for(let e=0,t=1.1;e<a.length;e++,t*=c)o.run(r[l+e]),a[e]=o.bp*t},.005,.015))),I=(e,t)=>Math.round(e.t*V)-t.s0;function N(e,t){return[e[t+"L"],e[t+"R"]]}function s(a,o,r,e,t,l,c){var n=I(o,r),[i,s]=N(r,e),f=o.v,d=Math.min(1,1-t),u=Math.min(1,1+t);if(F(o.t,o.t+a.length/V)){let e=0,t=0;for(;e<a.length-1&&n+t<r.N;){var h=0|e,h=(a[h]+(a[1+h]-a[h])*(e-h))*f;i[n+t]+=h*d,s[n+t]+=h*u,l&&(r.rev[n+t]+=h*l),e+=D(o.t+t/V),t++}}else{var p=Math.min(a.length,r.N-n);for(let e=0;e<p;e++){var v=a[e]*f;i[n+e]+=v*d,s[n+e]+=v*u,l&&(r.rev[n+e]+=v*l),c&&(r.dly[n+e]+=v*c)}}}let m={};function z(e,t,a,o){return e<t?e/t:e<a?1:Math.max(0,1-(e-a)/o)}function f(e,t,a,o,r="pre",l=0){var c=I(e,t),n=Math.min(Math.round(a*V),t.N-c),[i,s]=N(t,r),f=j(e.seed),d=new G;for(let e=0;e<n;e++){var u=o(e/V,f(),d,e);i[c+e]+=u,s[c+e]+=u,l&&(t.rev[c+e]+=u*l)}}m.kick=(e,t)=>s(u,e,t,"drum",0,0,0),m.snare=(e,t)=>s(p[3&e.seed],e,t,"drum",0,e.rv??.25,0),m.clap=(e,t)=>s(v[3&e.seed],e,t,"drum",0,.35,0),m.hat=(e,t)=>s((e.open?b:x)[3&e.seed],e,t,"drum",e.pan||0,0,0),m.heart=(e,t)=>s(y,e,t,"drum",0,0,0),m.click=(e,t)=>s(w[3&e.seed],e,t,"lead",.08*(e.seed%7-3),0,0),m.crash=(e,t)=>{var a,o,r,l;[[t,e],a,o,r]=[g()[1&e.seed],e,t,e.rv??.15],l=a.pan||0,s(t,{t:a.t,v:a.v*Math.min(1,1-l)},o,"drum",-1,r/2,0),s(e,{t:a.t,v:a.v*Math.min(1,1+l)},o,"drum",1,r/2,0)},m.rcrash=(e,a)=>{var[o,r]=g()[1&e.seed],l=I(e,a),c=Math.round(e.d*V),n=Math.round(.005*V),i=Math.min(c+n,a.N-l),[s,f]=N(a,"drum"),t=e.pan||0,d=e.v*Math.min(1,1-t),u=e.v*Math.min(1,1+t),h=(e.rv||0)/2,p=1/Math.max(e.d,.25);for(let e=0,t=0;e<i;e++){0==(31&e)&&(t=e<c?Math.pow(e/c,p):1);var v=Math.min(44+Math.abs(c-e),o.length-1),m=e<c?t:1-(e-c)/n,x=o[v]*m*d,v=r[v]*m*u;s[l+e]+=x,f[l+e]+=v,h&&(a.rev[l+e]+=(x+v)*h)}},m.ride=(e,t)=>{var a=e.bell||0,o=e.pan||0,r=e.rv||0;a<1&&s(T()[e.seed%3],{t:e.t,v:e.v*(1-a)},t,"drum",o,r,0),0<a&&s(E()[1&e.seed],{t:e.t,v:e.v*a},t,"drum",o,r,0)},m.mhat=(e,t)=>s((e.open?R:q)()[3&e.seed],e,t,"drum",e.pan||0,0,0),m.snare2=(e,t)=>s(O()[3&e.seed],e,t,"drum",0,e.rv??.25,0),m.shaker=(e,t)=>s(B()[3&e.seed],e,t,"drum",e.pan||0,0,0),m.tom=(t,a)=>{let e=t.m??{lo:45,mid:48,hi:52}[t.k]??48,o=S(e),r=I(t,a),l=Math.round(.45*V),c=Math.min(l,a.N-r),n=F(t.t,t.t+.45),[i,s]=N(a,"drum"),f=j(t.seed),d=new G,u=t.pan??Math.max(-.4,Math.min(.4,.05*(e-48))),h=Math.min(1,1-u),p=Math.min(1,1+u),v=t.rv??.15,m=(d.set(1800,.9),Math.exp(L/(.42*V))),x=Math.exp(L/(.16*V)),g=Math.exp(-1/(.006*V)),b=Math.exp(-1/(.012*V)),y=Math.exp(-1/(.15*V)),w=Math.round(.005*V),M=0,k=0,P=1,z=.22,T=.35,A=1,E=.05,q=1;for(let e=0;e<c;e++){var R=o*(q=n&&0==(63&e)?D(t.t+e/V):q)*(1+A+E)/V,R=(M+=R,k+=1.59*R,d.run(f()),.8*(R=(C(M)*P+C(k)*z+d.bp*T)*(e<40?e/40:1))/(1+.35*Math.abs(R))*t.v*(e>=l-w?(l-1-e)/w:1));P*=m,z*=x,T*=g,A*=b,E*=y,i[r+e]+=R*h,s[r+e]+=R*p,v&&(a.rev[r+e]+=R*v)}},m.sub=(t,e)=>{let a=S(t.m),o=I(t,e),r=Math.min(Math.round((t.d+.07)*V),e.N-o),l=F(t.t,t.t+t.d),[c,n]=N(e,"pump"),i=.006*V,s=t.d*V,f=.06*V,d=0,u=1;for(let e=0;e<r;e++){l&&0==(63&e)&&(u=D(t.t+e/V));var h=C(d+=a*u/V)*z(e,i,s,f)*t.v;c[o+e]+=h,n[o+e]+=h}},m.bass=(t,e)=>{let a=S(t.m),o=I(t,e),r=Math.min(Math.round((t.d+.07)*V),e.N-o),l=F(t.t,t.t+t.d),[c,n]=N(e,"pump"),i=.005*V,s=t.d*V,f=.06*V,d=Math.pow(2,-.0075),u=Math.pow(2,.0075),h=new G,p=j(t.seed),v=(p()+1)/2,m=(p()+1)/2,x=0,g=1;for(let e=0;e<r;e++){0==(15&e)&&(b=e/V,l&&(g=D(t.t+b)),h.set(t.cut*(b<.16?Math.pow(4.5,1-b/.16):1),t.q));var b=a*g,y=b*d/V,w=b*u/V,y=(1<=(v+=y)&&--v,1<=(m+=w)&&--m,x+=.5*b/V,t.tri?.5*(P(v)+P(m)):.5*(A(v,y)+A(m,w))),w=h.run(y+.6*C(x))*z(e,i,s,f)*t.v;c[o+e]+=w,n[o+e]+=w}},m.pad=(t,a)=>{var o,l=I(t,a),c=t.d+t.rel,r=Math.min(Math.round((c+.05)*V),a.N-l),n=F(t.t,t.t+c),[i,s]=N(a,t.bus||"pump"),f=j(t.seed),d=[-11,0,9],u=[-.7,0,.7],h=[],p=[],v=[];for(o of t.n)for(let e=0;e<3;e++)h.push(S(o)*Math.pow(2,(d[e]+2.5*f())/1200)),p.push((f()+1)/2),v.push(u[e]);let m=h.length,x=1/m,g=t.b,b=Math.min(.5*t.d,5),y=new G,w=new G,M=1;for(let e=0;e<r;e++){var k=e/V;0==(31&e)&&(n&&(M=D(t.t+k)),z=k<b?320*g+1380*g*k/b:1700*g+-1050*g*Math.min((k-b)/Math.max(c-b,.01),1),y.set(z,.6),w.set(z,.6));let o=0,r=0;for(let a=0;a<m;a++){let e=h[a]*M/V,t=p[a]+e;1<=t&&--t;var P=A(p[a]=t,e);v[a]<0?o+=P:0<v[a]?r+=P:(o+=.7*P,r+=.7*P)}var z=(k<t.att?k/t.att:k<t.d?1:Math.max(0,1-(k-t.d)/t.rel))*t.v*x*1.5,k=y.run(o)*z,T=w.run(r)*z;i[l+e]+=k,s[l+e]+=T,a.rev[l+e]+=.25*(k+T)}},m.pluck=(t,a)=>{let o=S(t.m),r=I(t,a),l=Math.min(Math.round((t.d+.02)*V),a.N-r),c=F(t.t,t.t+t.d),[n,i]=N(a,"pump"),s=300+5200*t.b,f=new G,d=Math.exp(L/((t.d-.003)*V)),u=Math.pow(2,8/1200),e=t.pan??.9*(.618034*t.seed%1-.5),h=Math.min(1,1-e),p=Math.min(1,1+e),v=0,m=0,x=t.v,g=1;for(let e=0;e<l;e++){var b=e/V,y=(0==(15&e)&&(c&&(g=D(t.t+b)),f.set(s*Math.pow(260/s,Math.min(b/(.8*t.d),1)),4)),o*g/V),w=y*u,b=(1<=(v+=y)&&--v,1<=(m+=w)&&--m,b<.003?t.v*b/.003:x*=d),y=f.run(.5*A(v,y)+.35*k(m,w))*b;n[r+e]+=y*h,i[r+e]+=y*p,t.dl&&(a.dly[r+e]+=y*t.dl)}},m.bell=(t,a)=>{let o=S(t.m),r=I(t,a),l=Math.min(Math.round((t.d+.05)*V),a.N-r),c=F(t.t,t.t+t.d),[n,i]=N(a,t.bus||"lead"),s=t.x/t.r/(2*Math.PI),f=Math.exp(-3.91/(.7*t.d*V)),d=Math.exp(L/((t.d-.003)*V)),e=t.pan??.8*(.381966*t.seed%1-.5),u=Math.min(1,1-e),h=Math.min(1,1+e),p=0,v=0,m=s,x=t.v,g=1;for(let e=0;e<l;e++){c&&0==(63&e)&&(g=D(t.t+e/V)),p+=o*g/V,v+=o*t.r*g/V,m>.02*s&&(m*=f);var b=e<.003*V?t.v*e/(.003*V):x*=d,b=C(p+m*C(v))*b;n[r+e]+=b*u,i[r+e]+=b*h,t.rv&&(a.rev[r+e]+=b*t.rv),t.dl&&(a.dly[r+e]+=b*t.dl)}},m.hlead=(t,a)=>{var o=S(t.m),r=t.p?S(t.p):o,l=I(t,a),c=Math.min(Math.round((t.d+.35)*V),a.N-l),n=F(t.t,t.t+t.d),[i,s]=N(a,"lead"),f=5.1+(j(t.seed)()+1)/2*.5,d=new G,u=Math.pow(2,5/1200);d.set(2300-1200*(t.s||0),.9);let h=0,p=0,v=1,m=1;for(let e=0;e<c;e++){var x=e/V;0==(31&e)&&(n&&(v=D(t.t+x)),g=x<.18?0:20*Math.min((x-.18)/Math.min(t.d,.7),1),m=Math.pow(2,g*Math.sin(2*Math.PI*f*x)/1200));var g=(x<.07&&t.p?r*Math.pow(o/r,x/.07):o)*v*m/V,x=(1<=(h+=g)&&--h,1<=(p+=g*u)&&--p,x<.035?x/.035:x<.3?1-.2*(x-.035)/.265:x<t.d?.8:Math.max(0,.8*(1-(x-t.d)/.3))),x=d.run(.45*A(h,g)+.65*P(p))*x*t.v;i[l+e]+=x,s[l+e]+=x,a.rev[l+e]+=.4*x,a.dly[l+e]+=.22*x}},m.sslead=(t,a)=>{let l=S(t.m),c=I(t,a),o=Math.min(Math.round((t.d+.4)*V),a.N-c),n=F(t.t,t.t+t.d),[i,s]=N(a,"lead"),r=j(t.seed),e=[-29,-17,-7,0,7,17,29],f=e.map(e=>Math.pow(2,(e+2*r())/1200)),d=e.map(()=>(r()+1)/2),u=new G,h=new G,p=1;for(let e=0;e<o;e++){var v=e/V;0==(31&e)&&(n&&(p=D(t.t+v)),x=7500*Math.pow(.48,Math.min(v/.4,1)),u.set(x,.5),h.set(x,.5));let o=0,r=0;for(let a=0;a<7;a++){let e=l*f[a]*p/V,t=d[a]+e;1<=t&&--t;var m=A(d[a]=t,e);1&a?o+=m:r+=m}var x=(v<.012?v/.012:v<.2?1-.15*(v-.012)/.188:v<t.d?.85:Math.max(0,.85*(1-(v-t.d)/.35)))*t.v/3.5,v=u.run(o)*x,g=h.run(r)*x;i[c+e]+=v,s[c+e]+=g,a.rev[c+e]+=.15*(v+g),a.dly[c+e]+=.12*(v+g)}},m.choir=(o,r)=>{var e,l=I(o,r),a=Math.min(Math.round((o.d+1.6)*V),r.N-l),[c,n]=N(r,"pump"),t=j(o.seed),i=[],s=[],f=[];for(e of o.n)for(var d of[-7,7])i.push(S(e)*Math.pow(2,d/1200)),s.push((t()+1)/2),f.push(4.6+(t()+1)/2);var u=[[650,8,3],[1080,10,1.5],[2650,12,.66]].map(([e,t,a])=>{var o=new G;return o.set(e,t),[o,a]}),h=1/i.length,p=i.length,v=new Float64Array(p);for(let t=0;t<a;t++){var m,x,g=t/V;let a=0;if(0==(31&t))for(let e=0;e<p;e++)v[e]=i[e]*Math.pow(2,10*Math.sin(2*Math.PI*f[e]*g)/1200)/V;for(let t=0;t<p;t++){let e=s[t]+v[t];1<=e&&--e,s[t]=e,a+=A(e,v[t])}a*=h;let e=0;for([m,x]of u)m.run(a),e+=m.bp*x;var b=e*(g<1.2?g/1.2:g<o.d?1:Math.max(0,1-(g-o.d)/1.5))*o.v;c[l+t]+=b,n[l+t]+=b,r.rev[l+t]+=.6*b}},m.riser=(r,e)=>{let l=0;f(r,e,r.d,(e,t,a,o)=>(0==(31&o)&&a.set(250*Math.pow(36,e/r.d),1.6),a.run(t),l+=110*Math.pow(16,e/r.d)/V,(1.6*a.bp+.18*C(l))*r.v*(e/r.d)),"pre",.4)},m.reverse=(r,e)=>f(r,e,r.d,(e,t,a,o)=>(0===o&&a.set(2500,.7),a.run(t),a.hp*r.v*Math.exp(L*(1-e/r.d))),"pre",.3),m.down=(r,e)=>f(r,e,r.d,(e,t,a,o)=>(0==(31&o)&&a.set(7e3*Math.pow(180/7e3,e/r.d),1.2),a.run(t),1.6*a.bp*r.v*(1-e/r.d)),"pre",.5),m.impact=(r,e)=>{let l=0,c=new G;c.set(5500,.7),f(r,e,3,(e,t,a,o)=>{0==(31&o)&&a.set(5e3*Math.pow(.028,Math.min(e/2.2,1)),.7),l+=85*Math.pow(26/85,Math.min(e/1.8,1))/V;o=a.run(t);return c.run(t),(.95*C(l)*Math.exp(L*e/2.5)+.55*o*Math.exp(L*e/2.8)+.22*c.hp*Math.exp(L*e/2.3))*r.v},"pre",.6)},m.crackle=(r,e)=>{let l=0;f(r,e,r.d,(e,t,a,o)=>{0===o&&a.set(2400,.5),l+=.08*(t-l);o=.9992<Math.abs(t)?2.7*t:0;return a.run(.25*l+o),a.bp*r.v*Math.min(1,e/1.5,(r.d-e)/1.5)},"pre")},m.tone=(t,a)=>{let o=I(t,a),e=t.d+t.rel,r=Math.min(Math.round(e*V),a.N-o),[l,c]=N(a,t.bus||"lead"),n=0;for(let e=0;e<r;e++){var i=e/V,i=C(n+=(t.f1?t.f*Math.pow(t.f1/t.f,Math.min(i/t.d,1)):t.f)/V)*t.v*(i<t.att?i/t.att:i<t.d?1:Math.max(0,1-(i-t.d)/t.rel));l[o+e]+=i,c[o+e]+=i,t.rv&&(a.rev[o+e]+=i*t.rv)}},m.blip=(t,a)=>{let o=I(t,a),r=Math.min(Math.round(.03*V),a.N-o),[l,c]=N(a,"lead"),n=Math.min(1,1-t.pan),i=Math.min(1,1+t.pan),s=0,f=t.f/V;for(let e=0;e<r;e++){1<=(s+=f)&&--s;var d=(t.sq?.6*k(s,f):C(s))*t.v;l[o+e]+=d*n,c[o+e]+=d*i,a.dly[o+e]+=.3*d}},m.drone=(e,a)=>{var o=I(e,a),t=Math.min(Math.round(15.6*V),a.N-o),[r,l]=N(a,"pre"),c=new G,n=[[S(33),1,0],[S(40)*Math.pow(2,4/1200),1,0],[S(45)*Math.pow(2,-.005),.25,1]],i=[0,0,0];for(let e=0;e<t;e++){var s=e/V;0==(31&e)&&c.set(120+780*Math.min(s,15)/15,1);let t=0;for(let e=0;e<3;e++){var f=n[e][0]/V;i[e]+=f,1<=i[e]&&--i[e],t+=(n[e][2]?A(i[e],f):C(i[e]))*n[e][1]}s=s<9?.14*s/9:s<15.3?.14+.06*(s-9)/6.3:Math.max(0,.2*(1-(s-15.3)/.25)),s=c.run(t)*s;r[o+e]+=s,l[o+e]+=s,a.rev[o+e]+=.3*s}},m.chip=(o,r)=>{let l,c,n,i=I(o,r),e=o.d+.06,t=Math.min(Math.round(e*V),r.N-i),[s,f]=N(r,o.bus||"lead"),d=o.arp||[0],u=o.w||"pulse",h=1-Math.exp(-2*Math.PI*8e3/V),p=void 0===o.stop?1e9:o.stop-o.t,v=0,m=0,x=0,g=.5,b=1,y=0;for(let a=0;a<t;a++){let e=a/V;e>p&&(y+=b/V,e=p+y),0==(15&a)&&(a/V>p&&(l=Math.min(1,(a/V-p)/.45),b=(1-l)*(1-l)),c=d[Math.floor(50*e)%d.length],n=o.vib?Math.sin(2*Math.PI*6*e)*o.vib*Math.min(1,Math.max(0,4*(e-.15))):0,x=S(o.m+c+n)*b/V,g=.5+.38*Math.sin(2*Math.PI*(o.pwm||.7)*(o.t+e))),1<=(v+=x)&&--v;let t;if("tri"===u)t=P(v);else if("saw"===u)t=A(v,x);else{let e=v-g+1;1<=e&&--e,t=(v<g?1:-1)+M(v,x)-M(e,x)}var w=(e<.004?e/.004:e<.08?1-(e-.004)/.076*.35:e<o.d?.65:Math.max(0,.65*(1-(e-o.d)/.06)))*Math.min(1,4*b),w=m+=(Math.round(t*w*15)/15*o.v-m)*h;s[i+a]+=w,f[i+a]+=w,o.rv&&(r.rev[i+a]+=w*o.rv),o.dl&&(r.dly[i+a]+=w*o.dl)}},m.chipdrum=(t,e)=>{let a=I(t,e),o="h"===t.k?.05:"s"===t.k?.16:.14,r=Math.min(Math.round(o*V),e.N-a),[l,c]=N(e,"drum"),n=j(t.seed),i=1-Math.exp(-2*Math.PI*9e3/V),s=0,f=0,d=0;for(let e=0;e<r;e++){var u=e/V;0==(7&e)&&(f=n()),u="k"===t.k?P((s+=160*Math.pow(.25,u/.08)/V)-Math.floor(s))*(1-u/o):"s"===t.k?(s+=220*Math.pow(.6,u/.1)/V,(.8*f+(s%1<.5?.3:-.3))*Math.pow(1-u/o,2)):f*Math.pow(1-u/o,3)*.6,d+=(Math.round(12*u)/12*t.v-d)*i,l[a+e]+=d,c[a+e]+=d}},m.power=(t,e)=>{let a=I(t,e),o=Math.min(Math.round(.9*V),e.N-a),[r,l]=N(e,"pre"),c=j(t.seed),n=0,i=0;for(let e=0;e<o;e++){var s=e/V,f=C(n+=58*Math.pow(.6,s/.2)/V)*Math.exp(-s/.12)*Math.min(1,s/.003),d=(Math.sin(2*Math.PI*100*s)+.35*Math.sin(2*Math.PI*300*s))*Math.exp(-s/.3)*Math.min(1,s/.03),f=(i+=.3*(c()-i),(.9*f+.25*d+(s<.012?i*(1-s/.012)*.8:0))*t.v);r[a+e]+=f,l[a+e]+=f}},m.poff=(t,a)=>{var o=I(t,a),r=Math.min(Math.round(.9*V),a.N-o),[l,c]=N(a,"pre"),n=j(t.seed),i=new G;i.set(3e3,.8);let s=0,f=0,d=0;for(let e=0;e<r;e++){var u=e/V,h=n(),h=(s+=60*Math.pow(.5,u/.15)/V,f+=2600*Math.pow(.07,Math.min(u/.3,1))/V,d+=.3*(h-d),i.run(Math.abs(h)>.9996-.003*Math.exp(-u/.2)?3*h:0),(C(s)*Math.exp(-u/.09)*Math.min(1,u/.002)*.9+C(f)*Math.exp(-u/.12)*.35+(u<.008?d*(1-u/.008)*.8:0)+.5*i.bp)*t.v*Math.min(1,(.9-u)/.05));l[o+e]+=h,c[o+e]+=h,a.rev[o+e]+=.2*h}},m.hum=(t,e)=>{var a=I(t,e),o=Math.min(Math.round(t.d*V),e.N-a),[r,l]=N(e,"pre");for(let e=0;e<o;e++){var c=t.t+e/V,c=(.6*C(50*c)+.3*C(100*c)+.15*C(150*c)+.02*C(15734*c))*t.v*Math.min(1,(c-t.t0)/.3,(t.t1-c)/(t.fo||.3));r[a+e]+=c,l[a+e]+=c}};let d={},K=(e,t)=>{let a=d[e],o=(a=!a||a.length<t?d[e]=new Float32Array(Math.ceil(1.3*t)):a).subarray(0,t);return o.fill(0),o};function _(a){h=a.warp;var e,t=Math.round(a.start*V);let o=a.start;for(e of a.events)o=Math.max(o,e.t+(e=>{switch(e.i){case"kick":return F(e.t,e.t+.5)?4:.46;case"snare":case"clap":case"hat":case"heart":case"snare2":case"mhat":case"shaker":return F(e.t,e.t+.6)?5:.6;case"crash":return F(e.t,e.t+2.6)?10:2.6;case"rcrash":return e.d+.006;case"ride":return F(e.t,e.t+1.8)?8:1.8;case"tom":return.45;case"click":case"blip":return.05;case"sub":case"bass":return e.d+.07;case"pad":return e.d+e.rel+.05;case"pluck":case"bell":return e.d+.05;case"hlead":return e.d+.35;case"sslead":return e.d+.4;case"choir":return e.d+1.6;case"impact":return 3;case"tone":return e.d+e.rel;case"drone":return 15.6;case"chip":return e.d+.06;case"chipdrum":return.16;case"hum":return e.d;case"power":case"poff":return.9;default:return e.d||1}})(e));var r,l,c=Math.round((o-a.start+a.tail)*V)+1,p={s0:t,N:c,rev:K("rev",c),dly:K("dly",c)};for(r of["drum","pump","lead","pre"])p[r+"L"]="drum"===r?new Float32Array(c):K(r+"L",c),p[r+"R"]="drum"===r?new Float32Array(c):K(r+"R",c);for(l of a.events)m[l.i](l,p);{let e=p,o=a.ducks,{pumpL:r,pumpR:l,N:t,s0:c}=e,n=Math.exp(-1/(.003*V)),i=Math.exp(-1/(.09*V)),s=0,f=-1e9,d=0,u=0,h=-1;for(let a=0;a<t;a++){let e=(c+a)/V,t=!1;for(;s<o.length&&o[s]<=e;)f=o[s++],t=!0;var v=e-f,v=v<.035?(t||0!==h?(d=Math.exp(-v/.003),h=0):d*=n,.28+.72*d):(t||1!==h?(u=Math.exp(-(v-.035)/.09),h=1):u*=i,1-.72*u);r[a]*=v,l[a]*=v}}var[n,i]=((t,a)=>{let o=Math.round(.375*V),r=Math.round(.75*V),l=new Float32Array(o),c=new Float32Array(r),n=K("ppL",a),i=K("ppR",a),s=1-Math.exp(-2*Math.PI*3200/V),f=0,d=0,u=0,h=0;for(let e=0;e<a;e++)u+=(l[f]-u)*s,h+=(c[d]-h)*s,l[f]=t[e]+.36*u,c[d]=t[e]+.36*h,n[e]=.85*u+.15*h,i[e]=.15*u+.85*h,++f===o&&(f=0),++d===r&&(d=0);return[n,i]})(p.dly,c);for(let e=0;e<c;e++)p.rev[e]+=.075*(n[e]+i[e]);var[s,f]=((I,t)=>{var e=[1433,1601,1867,2053,2251,2399,2617,2797].map(e=>Math.round(1.35*e)),N=e.map(e=>Math.pow(10,-3*e/(3.2*V))),[a,o,r,l,c,n,i,s]=e,[O,B,_,j,G,Y,U,H]=N,f=new Float32Array(a+o+r+l+c+n+i+s),d=a,u=d+o,h=u+r,p=h+l,v=p+c,m=v+n,X=m+i,$=Math.round(.012*V),x=.42,W=K("fdL",t),Q=K("fdR",t);let g=0,b=0,y=0,w=0,M=0,k=0,P=0,z=0,T=0,A=0,E=0,q=0,R=0,C=0,S=0,L=0;for(let e=0;e<t;e++){var F=e>=$?.3*I[e-$]:0,D=(T+=(f[g]-T)*x,A+=(f[d+b]-A)*x,E+=(f[u+y]-E)*x,q+=(f[h+w]-q)*x,R+=(f[p+M]-R)*x,C+=(f[v+k]-C)*x,S+=(f[m+P]-S)*x,L+=(f[X+z]-L)*x,.25*(0+T+A+E+q+R+C+S+L));f[g]=(T-D)*O+F,f[d+b]=(A-D)*B-F,f[u+y]=(E-D)*_+F,f[h+w]=(q-D)*j-F,f[p+M]=(R-D)*G+F,f[v+k]=(C-D)*Y-F,f[m+P]=(S-D)*U+F,f[X+z]=(L-D)*H-F,++g===a&&(g=0),++b===o&&(b=0),++y===r&&(y=0),++w===l&&(w=0),++M===c&&(M=0),++k===n&&(k=0),++P===i&&(P=0),++z===s&&(z=0),W[e]=.5*(T-E+R-S),Q[e]=.5*(A-q+C-L)}return[W,Q]})(p.rev,c),d=p.drumL,u=p.drumR;for(let e=0;e<c;e++)d[e]+=p.pumpL[e]+p.leadL[e]+p.preL[e]+.5*n[e]+.55*s[e],u[e]+=p.pumpR[e]+p.leadR[e]+p.preR[e]+.5*i[e]+.55*f[e];return{id:a.id,start:t,L:d,R:u}}return"undefined"==typeof window&&"undefined"!=typeof self&&(self.onmessage=e=>{if(e.data.ping)return self.postMessage({pong:1});e=_(e.data);self.postMessage(e,[e.L.buffer,e.R.buffer])}),{renderSegment:_,SVF:G,SR:V}};{let be=ze.audio={},q=44100,ye=(be.BPM=120,be.BEAT=.5,be.BAR=2,(e,t=0)=>2*e+.5*t),we=e=>440*Math.pow(2,(e-69)/12),Me=(be.sync={kick:[],snare:[],hat:[],heart:[],ping:[],hit:[],lead:[],agi:[],type:[],bass:[]},{Am:[57,60,64,71],F:[53,57,60,67],C:[55,60,64,67],G:[55,59,62,69],E:[56,59,64,68],Dm:[57,62,65,69]}),ke={Am:33,F:29,C:36,G:31,E:28,Dm:38},Pe=[[0,76,1.5],[1.5,74,.5],[2,72,1],[3,71,1],[4,72,1],[5,69,3],[8,69,.5],[8.5,72,.5],[9,77,1.5],[10.5,76,.5],[11,74,1],[12,72,2],[14,69,1],[15,72,1],[16,79,1.5],[17.5,76,.5],[18,74,1],[19,72,1],[20,74,1],[21,76,1],[22,67,2],[24,71,1.5],[25.5,72,.5],[26,74,1],[27,79,1],[28,76,4]];function x(){let h=ze.rng(2026),n=be.sync;for(var I in n)n[I].length=0;n.fire=[];let o=[],r=[],N=1,l=0,s=(e,t,a={})=>{t+=l;return o.push({i:e,t:t,seed:N++,...a}),t},p=(e,t=1,a=!0)=>{e=s("kick",e,{v:t});n.kick.push(e),a&&r.push(e)},c=(e,t=1,a=.25)=>{n.snare.push(s("snare",e,{v:t,rv:a}))},O=(e,t=1,a=.2)=>{n.snare.push(s("snare2",e,{v:t,rv:a}))},i=(e,t=1)=>{n.snare.push(s("clap",e,{v:t}))},v=(e,t=.5,a=!1,o=0)=>{n.hat.push(s("hat",e,{v:t,open:a,pan:o}))},f=(e,t,a,o=.45)=>s("sub",e,{m:t,d:a,v:o}),m=(e,t,a,o=.3,r=700,l=3,c=!1)=>{e=s("bass",e,{m:t,d:a,v:o,cut:r,q:l,tri:c});.2<=o&&n.bass.push(e)},d=(e,t,a,o=.1,r=1,l=.9,c=1.8)=>s("pad",e,{n:t,d:a,v:o,b:r,att:l,rel:c}),u=(e,t,a=.1,o=.22,r=1,l=.25)=>s("pluck",e,{m:t,v:a,d:o,b:r,dl:l}),x=(e,t,a=1.5,o=.1,r=3.5,l=3,c=.3,n=.4,i="lead")=>s("bell",e,{m:t,d:a,v:o,r:r,x:l,dl:c,rv:n,bus:i}),g=(e,t,a,o=.12,r=null,l=0)=>{n.lead.push(s("hlead",e,{m:t,d:a,v:o,p:r,s:l}))},b=(e,t,a,o=.09)=>{var r=s("sslead",e,{m:t,d:a,v:o});x(e,t+12,a+.6,.35*o,2,1.6,.25,.3),n.agi.push(r)},y=(e,t,a,o=.05)=>s("choir",e,{n:t,d:a,v:o}),e=(e,t,a=.25)=>s("riser",e,{d:t,v:a}),B=(e,t,a=.3)=>s("reverse",e,{d:t,v:a}),t=(e,t=1)=>{n.hit.push(s("impact",e,{v:t}))},w=(e,t,a,o,r,l,c=.3)=>s("tone",e,{f:t,d:a,v:o,att:r,rel:l,rv:c}),M=(e,t,a,o=.05,r={})=>s("chip",e,{m:t,d:a,v:o,...r}),k=(e,t,a=.25)=>{e=s("chipdrum",e,{k:t,v:a});"k"===t&&n.kick.push(e),"s"===t&&n.snare.push(e)},_=(t,a,o=16,r=.025,e=1)=>{var l=ze.rng(e),c=[1760,2093,2349,2637,3136,3520,4186];for(let e=0;e<a*o;e++).55<l()||s("blip",t+e/o,{f:c[Math.floor(l()*c.length)],v:r,sq:l()<.5,pan:1.6*l()-.8})},a=(e,t,a,o,r=1)=>{let l=null;for(var[c,n,i]of Pe)t<=c&&c<a&&(o(e+.5*(c-t)*r,n,.5*i*r,l),l=n)},P=(t,a,o)=>{for(let e=t;e<a;e++)o(e,e-t)},z=["Am","F","C","G"],T=[0,1,2,3,2,1,2,3,0,2,1,3,2,1,3,2],A=(t,a=1,o=!0,e=!1)=>{for(let e=0;e<4;e++)p(ye(t,e),a),o&&e%2==1&&i(ye(t,e),.85*a),v(ye(t,e+.5),.5*a,!1,.2);if(e)for(let e=0;e<16;e+=2)v(ye(t,e/4+.25),.22*a,!1,-.3)},j=(t,e,a)=>{var o,r,l,c,n=ke[e];for(o of[0,6,10]){var i=ye(t,o/4)+a();p(i,.85),m(i,n+12,.35,.2,380,1,!0)}for(r of[4,12])O(ye(t,r/4)+a(),.75,.22);for(let e=0;e<8;e++)v(ye(t,e/2)+(e%2?.07:0)+a(),e%2?.3:.45,7===e,.25);for([l,c]of[[0,1.3],[7,.6],[10,1.4]]){u=void 0;var s=ye(t,l/4)+a();var f=Me[e];var d=c;for(var u of f)x(s+.012*h(),u,d,.05,1,1.4,.05,.2,"pump")}},E=()=>.02*(h()-.5),q=(e,t=.45,a=0)=>s("crash",e,{v:t,pan:a}),G=(e,t,a=.65)=>s("tom",e,{k:t,v:a});var R,C,Y,U,S=(o,r=.65)=>{[["hi",0],["hi",.125],["mid",.25],["mid",.375],["lo",.5],["lo",.625],["lo",.75]].forEach(([e,t],a)=>G(o+.5*t*2,e,r*(.8+.04*a)))},H=(t,a,o,r=.3)=>{for(let e=t;e<t+a-1e-6;e+=4)s("hum",e,{d:Math.min(4,t+a-e),v:o,t0:t+l,t1:t+a+l,fo:r})};for(R of ze.c64Keys())s("click",R.t,{v:R.enter?.09:.06}),n.type.push(R.t);let L=ze.script.c64;s("power",L.on,{v:.075}),H(L.on,L.off+.06-L.on,.018,.06);{let t=[["Am",33,[0,3,7]],["F",29,[0,4,7]],["C",36,[0,4,7]],["G",31,[0,4,7]]],o=(e,t,a,o,r)=>{e>L.off+.01||(e+a>L.off&&(a=L.off+.45-e,r={...r,stop:L.off}),M(e,t,a,o,r))};for(let e=0;e<10;e++){var[,X,$]=t[Math.floor(e/2)%4],W=9+2*e/2,Q=e<7?1:1-.28*(e-6);if(o(W,X+36,.98,.05*Q,{arp:$,pwm:.5,rv:.1+(7<=e?.3:0)}),e<7)for(let e=0;e<4;e++)o(W+.5*e/2*2,X+12+e%2*12,.225,.09,{w:"pulse",pwm:1.3})}for(let e=0;e<12;e++){var V=9+.5*e;if(V>=L.off)break;k(V,e%2?"s":"k",.42),k(.25+V,"h",.2)}a(9,0,16,(e,t,a)=>o(e,t,.95*a,.11,{vib:.25,pwm:.9,dl:.2,rv:15.5<e?.4:0})),s("poff",L.off,{v:.35}),s("tone",L.off+.35,{f:1568,f1:2637,d:16-L.off-.35,v:.008,att:.9,rel:.02,rv:.3}),L.pulses.forEach((e,t)=>{f(e,33,.22,.19+.03*t),p(e,.22+.05*t,!1)}),e(L.off+.6,16-L.off-.6,.11),B(14.8,1.2,.21)}t(16,1.1),P(8,16,(t,a)=>{var o=z[Math.floor(a/2)%4],r=ke[o];a%2==0&&(d(ye(t),Me[o].map(e=>e-12).concat(Me[o]),4,.08,.7,a?.4:2,1.5),y(ye(t),Me[o].map(e=>e+12),3.8,.035));for(let e=0;e<16;e++)u(ye(t,e/4),Me[o][T[e]]+12,.045+.005*a,.2,.25+.08*a,.35);for(let e=0;e<8;e++)m(ye(t,e/2),r+12,.2,.13+.01*a,280+70*a,2);if(4<=a)for(var e of a<6?[0,2]:[0,1,2,3])p(ye(t,e),.5+.12*(a-4),!1);if(5<=a)for(let e=0;e<8;e++)v(ye(t,e/2+.25),.18+.05*(a-5),e%2==1,.25)}),a(16,0,32,(e,t,a)=>b(e,t,a,.045)),q(16,.5),S(31,.5),q(32,.3),d(32,Me.Am,8,.06,.5,1,2),d(40,Me.F,8,.06,.6,1,2),a(32,0,8,(e,t,a)=>x(e,t,a+.6,.055,2,1.3,.4,.45),2),P(16,20,(t,a)=>{for(let e=0;e<8;e++)(e%2||2<=a)&&u(ye(t,e/2+.25),[64,67,69,72][(e+a)%4],.03+.006*a,.18,.3,.3);if(2<=a)for(let e=0;e<16;e++)v(ye(t,e/4),e%4==2?.22:.08,!1,.2)});for(let e=0;e<32;e++){var K=32+.5*e;n.fire.push(K),x(K,e%4==3?81:76,.4,.05,1,3,.25,.2),f(K,33,.12,.3)}P(20,24,(t,a)=>{for(let e=0;e<4;e++)p(ye(t,e),.6+.08*a),v(ye(t,e+.5),.35),m(ye(t,e+.5),45,.2,.18,500,2);if(2<=a)for(let e=0;e<8;e++)x(ye(t,e/2),88-e,.25,.025,3.5,2,.3,.1)});for(let e=Math.round(8),t=0;t<e;t++)c(47+.5*t/4,.15+(.6-.15)*t/e,.2);q(48,.45),P(24,32,(t,a)=>{var o=z[a%4],r=ke[o];A(t,.95,!1,28<=t);for(let e=0;e<4;e++)m(ye(t,e+.5),r+12,.21,.24,500+60*a,2.5);for(let e=0;e<16;e++)u(ye(t,e/4),Me[o][T[e]]+12,.07,.2,.2+.09*a,28<=t?.45:.2);d(ye(t),Me[o],2,.05,.8,.3,1)});for(C of ze.script.convAnswers){var Z=Math.floor(C/2),J=Math.round((C-2*Z)/.25);x(C,Me[z[(Z-24)%4]][J%4]+24,.5,.04,2,1.4,.6,.3),i(C,.85)}S(63,.6),q(64,.45),P(32,40,(t,e)=>{var a=["Am","Am","F","E"][e%4],o=4<=e;p(ye(t,0),1),p(ye(t,2.5),.8),O(ye(t,2),.9,.25);for(let e=0;e<8;e++)v(ye(t,e/2),e%2?.25:.4);if(o)for(let e=0;e<16;e+=2)v(ye(t,e/4+.25),.16,!1,-.3);f(ye(t),ke[a],1.9,.22),d(ye(t),Me[a],2,.06,.5,.2,1);for(let e=0;e<8;e++)m(ye(t,e/2),ke[a]+12+[0,0,12,0,7,0,12,10][e],.175,.16+(o?.02:0),500+40*e+(o?200:0),5)}),[[32,[[0,76,1],[1,72,.5],[1.5,74,.5],[2,76,1.5],[3.5,79,.5]]],[33,[[0,77,1],[1,76,1],[2,74,1],[3,72,1]]],[34,[[0,72,1.5],[1.5,74,.5],[2,76,1],[3,77,1]]],[35,[[0,76,1],[1,71,1],[2,68,2]]],[36,[[0,72,1],[1,76,1],[2,79,1.5],[3.5,81,.5]]],[37,[[0,79,1],[1,77,1],[2,76,1],[3,74,1]]],[38,[[0,72,1],[1,74,1],[2,76,2]]],[39,[[0,74,1],[1,71,1],[2,68,1],[3,71,1]]]].forEach(([e,t])=>{let a=null;for(var[o,r,l]of t)g(ye(e,o),r,.5*l,.085,a),a=r}),q(80,.35);{let t=ze.script.lstm,a=e=>t.read0+e*t.dt;t.tokens.forEach((e,t)=>u(a(t),[69,72,76,72][t%4]+12,.035,.18,.5,.3));var ee,F,te,ae,oe,re={1:[81,.1],2:[86,.05],3:[83,.05],4:[88,.045]};for([ee,F,te]of t.lanes){var[le,ce]=re[te];x(a(ee)+.3,le,1===te?2.4:1.2,ce,2,2,.4,.45),0<=F&&(G(a(F)+.3,"lo",.45),w(a(F)+.3,we(40),.12,.05,.005,.15,.2))}for([ae,oe]of[[77,.09],[81,.07],[84,.06],[89,.04]])x(t.out,ae,3,oe,2,2,.5,.6);y(t.out,[65,69,72],3.2,.045)}P(40,48,(e,t)=>{var a=z[Math.floor(t/2)%4];j(e,a,E),t%2==0&&d(ye(e),Me[a],4,.05,.6,1,1.5)}),a(80,0,32,(e,t,a,o)=>g(e+E(),t,a,.12,o));for(let e=0;e<16;e++)x(80.5+.25*e,[81,84,88,91][e%4]+e%3*2,.8,.03,3.5,3,.6,.4);for(let e=0;e<6;e++)p(ye(47,2+e/6),.5,!1);{let a=ze.script.embed;ze.script.lstm.tokens.forEach((e,t)=>x(a.fly[0]+.06*t+1.3,[76,79,81,84][t%4]+12,.6,.025,3.5,2,.4,.3)),a.analogies.forEach(([,,,,e],t)=>{for(var[a,o]of[[.5,81],[1.5,84]])x(e+a,o+(t?2:0),1.2,.06,2,1.6,.4,.4);for(var[r,l]of[[72,.06],[76,.05],[79,.045],[84,.035]])x(e+1.5,r+(t?2:0),2.4,l,2,2,.5,.5);y(e+1.5,[60,64,67].map(e=>e+(t?2:0)),2.5,.035)}),a.more.forEach(([,,e],t)=>x(e+.5,86+2*t,.8,.04,2,1.6,.4,.4)),_(93.6,.9,32,.014,913)}P(48,52,(e,t)=>{t=z[t];j(e,t,E),d(ye(e),Me[t],2,.05,.6,.5,1)}),_(97.3,1.5,24,.012,77);for([Y,U]of[[84,.06],[88,.045],[91,.04]])x(100,Y,1.8,U,2,2,.4,.4);P(52,56,(e,t)=>{t=z[t];j(e,t,E),d(ye(e),Me[t],2,.05,.6,.5,1)});var ne,ie,se,fe,de,ue,D=ze.script.go;for(let e=1;e<=36;e++)s("click",D.at(e),{v:.05});x(D.land,74,3,.1,2,2,.5,.6),y(D.land+.2,[55,62,67,71],3.5,.04);for(let e=38;e<=211;e++)s("click",D.at(e),{v:.03+7*e%3*.02/2});for([ne,ie]of ze.timeline&&ze.timeline.goCaptures||[]){var he=D.at(ne)+.03;for(let e=0;e<1+ie;e++)s("click",he+.06*e,{v:.12-.025*e});x(he,91,.6,.03,2,1.6,.4,.3)}P(56,59,(t,a)=>{var e=["Am","F","G"][a],o=ke[e];A(t,.8+.1*a,1<=a,2<=a);for(let e=0;e<16;e++)e%4!=0&&m(ye(t,e/4),o+12+(e%3==0?12:0),.1,.18,400+250*a+15*e,8);d(ye(t),Me[e],2,.06,.8,.3,1)}),a(112,16,28,(e,t,a)=>x(e,t+12,a+.6,.05,2,1.4,.4,.5)),e(115,D.win-115,.22),t(D.win,.8),q(D.win,.5),d(D.win,[45,52,57,60,64,71],2.6,.09,.9,.05,1.8),y(D.win,[57,64,69,76],2.4,.05),f(D.win,33,1.2,.3);for([se,fe]of[[81,.08],[84,.06],[88,.05]])x(D.win,se,2.4,fe,2,2,.5,.6);l=24,d(96,Me.Am,4,.16,.6,1.5,2),d(100,Me.F,4,.16,.6,1,2),f(96,33,4,.12),f(100,29,4,.12),P(48,52,(t,a)=>{var o=a<2?"Am":"F";for(let e=0;e<8;e++)m(ye(t,e/2),ke[o]+12,.15,.1+.02*a,350+100*a,2);for(let e=0;e<16;e++)u(ye(t,e/4),Me[o][T[e]]+24,.02+.006*a,.15,.4,.35);p(ye(t),.45+.1*a,!1),2<=a&&p(ye(t,2),.5,!1)});{let o=ze.script.attention;o.cands.forEach((e,t)=>{var a=o.step0+(t+o.land)*o.dt-l;x(a,[69,72,74,76,79,81,84,88][t],.9,.11,2,1.5,.5,.4),v(a,.2,!1,h()-.5)})}S(103,.5),q(104,.4),P(52,56,(t,a)=>{var o=z[a],e=ke[o];d(ye(t),Me[o],2,.07,.7,.6,1.5),p(ye(t,0),.7),p(ye(t,2.5),.5),c(ye(t,2),.5,.4);for(let e=0;e<8;e++)v(ye(t,e/2),e%2?.2:.3,!1,.3);for(let e=0;e<16;e++)u(ye(t,e/4),Me[o][Math.round(1.5+1.5*Math.sin(.8*e+a))]+12+(e%8<4?0:12),.05,.22,.25+.15*a,.3);f(ye(t),e,1.9,.2)});for(de of[69,76,81,84])x(110.5,de,2.5,.05,2,1.4,.4,.5);{let c=["Am","Am","F","F","C","C","G","E"];q(120,.45),P(60,68,(t,e)=>{var a=c[e],o=ke[a];A(t,1,62<=t,!0);for(let e=0;e<16;e++){var r=ye(t,e/4),l=[0,12,0,0,12,0,0,12][e%8];e%4!=0&&m(r,o+12+l,.1,.2,380+900*Math.pow(.5+.5*Math.sin(.22*(16*t+e)),2),9),x(r,Me[a][T[3*e%16]]+24,.35,.035,3.5,1.8+e%4*.4,.2,.15)}e%2==0&&d(ye(t),Me[a],4,.05,1,.3,1)}),ze.script.log.forEach(([e])=>{var e=e-l,t=Math.floor(e/2),a=Math.round((e-2*t)/.5);x(e,Me[c[t-60]][a]+(t<62?12:24),.4,.05,2,1.2,.3,.2)});var pe=ze.script.selfLog;for(let e=0,t=pe.from;t<=pe.to;e++,t=pe.from+.5*e)_(t-l,.3,40,.02,100+e)}w(136.6,we(33),7.4,.1,1.2,1,.3),w(136.6,1.004*we(45),7.4,.05,2,1,.3),P(68,72,(t,a)=>{var e=["Am","Am","F","G"][a],o=ke[e];69<=t&&A(t,.9+.04*a,!0,70<=t);for(let e=0;e<16;e++)e%4!=0&&m(ye(t,e/4),o+12+(e%3==0?12:0),.1,.2,400+350*a+20*e,11);d(ye(t),Me[e],2,.05,.9,.3,1)}),S(143,.55),q(144,.45),d(112,Me.Am,4,.08,.7,1,2),d(116,Me.F,4,.08,.7,1,2),q(112,.35),P(56,60,(t,a)=>{p(ye(t,0),.8),p(ye(t,2.5),.6),c(ye(t,2),.6,.4);for(let e=0;e<24;e++)u(ye(t,e/6),Me[a<2?"Am":"F"][e%4]+12+(e%8<4?0:12),.06,.25,.3+.2*Math.sin(.5*e),.35);for(let e=0;e<16;e++)v(ye(t,e/4),e%2?.1:.2,14===e,.3);for(let e=0;e<8;e++)m(ye(t,e/2),ke[a<2?"Am":"F"]+12+(e%4==3?12:0),.175,.17,600,3)}),a(112,0,16,(e,t,a,o)=>g(e,t,a,.09,o)),P(72,80,(t,a)=>{var e=["Am","Am","F","F","C","C","G","G"][a],o=ke[e];A(t,1,!0,!0);for(let e=0;e<16;e++)e%4!=0&&m(ye(t,e/4),o+12+(e%3==0?12:0),.1,.2,300+150*a,10);a%2==0&&d(ye(t),Me[e],4,.05,.9,.3,1),76<=t&&a%2==0&&y(ye(t),Me[e].map(e=>e+12),3.8,.04)}),a(152,16,32,(e,t,a)=>x(e,t+12,a+.8,.06,2,1.4,.4,.5)),e(152,8,.3);for(let e=0;e<16;e++)c(ye(79,e/4),.2+.05*e,.15);t(160,1),q(160,.55);let ve=(t,a)=>{var o,r,l=ke[a];for(let e=0;e<4;e++)p(ye(t,e),1.05),e%2&&i(ye(t,e),.9),v(ye(t,e+.5),.45,!0,.3),m(ye(t,e+.5),l+12,.2,.26,700,3),o=ye(t,e),r=0===e&&t%2==0?.6:0,s("ride",o,{v:.28,bell:r,pan:.3});for(let e=0;e<16;e++)v(ye(t,e/4),.2,!1,-.35),u(ye(t,e/4),Me[a][T[e]]+12,.05,.18,.7,.2)},me=(e,t,a)=>{for(var o of Me[t])s("sslead",e,{m:o+12,d:.16,v:a})};P(80,86,(t,a)=>{var o=["Am","F","C","G","F","G"][a];ve(t,o),d(ye(t),Me[o],2,.07,1.2,.2,.8);for(let e=0;e<4;e++)me(ye(t,e+.5),o,.032+.003*Math.min(a,3))}),l=28,q(168,.45),P(84,92,(e,t)=>{var a=z[Math.floor(t/2)%4];ve(e,a),t%2==0&&d(ye(e),Me[a],4,.07,1.2,.2,.8)}),a(168,0,16,(e,t,a)=>b(e,t,a,.085)),d(184,[45,52,57,60,64],4,.08,.5,.5,2),y(184,[57,64,69],4,.05),s("down",184,{d:4,v:.3}),B(186.4,1.6,.35),t(188,1),w(188,we(33),12,.12,3,.5,.2),d(188,[45,52,60,64],6,.07,.35,2,2),d(194,[44,52,59,64],6,.07,.4,1,1),a(188,0,8,(e,t,a,o)=>g(e,t-12,a,.08,o,.5),1.5);for(let e=0;e<24;e++)u(194+e/4,[56,59,64,68][e%4]+12+12*Math.floor(e/8),.03+.002*e,.2,.3+.03*e,.4);for(let e=0;e<12;e++)f(188+e,33,.25,.18);e(194,6,.35),B(198.6,1.4,.4),t(200,1.1),q(200,.6),P(100,108,(t,e)=>{var a=z[Math.floor(e/2)%4],o=ke[a];for(let e=0;e<4;e++)p(ye(t,e),1.05),e%2&&i(ye(t,e),.9),v(ye(t,e+.5),.45,!0,.3),m(ye(t,e+.5),o+12,.2,.26,800,3);for(let e=0;e<16;e++)v(ye(t,e/4),.2,!1,-.35),e%2==0&&x(ye(t,e/4),Me[a][T[(e+5)%16]]+24,.25,.025,3.5,2,.25,.1);e%2==0&&(d(ye(t),Me[a],4,.07,1.2,.2,.8),y(ye(t),Me[a].map(e=>e+12),3.7,.05))}),a(200,0,32,(e,t,a)=>{b(e,t+12,a,.07),b(e,t,a,.05)}),P(100,108,(t,a)=>{for(let e=0;e<4;e++)me(ye(t,e+.5),z[Math.floor(a/2)%4],.02)}),P(108,111,(t,a)=>{var e=["F","G","Am"][a],o=ke[e],r=2===a;if(d(ye(t),Me[e],r?6:2,.08,1.1,.2,r?3:.8),y(ye(t),Me[e].map(e=>e+12),r?6:1.8,.055),f(ye(t),o,r?5:1.9,.3),r)p(ye(t),.9,!1);else for(let e=0;e<4;e++)p(ye(t,e),1-.2*a),e%2&&i(ye(t,e),.8-.2*a),v(ye(t,e+.5),.35,!0,.3)}),b(216,77,1.8,.07),b(218,79,1.8,.07),b(220,81,5.2,.075),b(220,69,5.2,.05),H(222,20,.012);for(let e=0;e<12;e++){var xe=e<8?"Am":e<10?"F":"G",ge=222+.5*e;M(ge,ke[xe]+36,.48,.02+.006*e,{arp:"Am"==xe?[0,3,7]:[0,4,7],pwm:.2+.06*e,rv:.3})}for(let e=0;e<8;e++)k(224+.5*e,"h",.08+.015*e);for(let e=0;e<8;e++)M(226+.25*e,[45,57,45,57,43,55,43,55][e],.22,.07,{w:"pulse",pwm:1.2});for(let e=0;e<8;e++)k(227+e/8,"s",.16+.03*e);["Am","Am","F","F","G"].forEach((e,t)=>{var a=ke[e],o=228+2*t;M(o,a+36,1.98,.05,{arp:"Am"===e?[0,3,7]:[0,4,7],pwm:.5});for(let e=0;e<8;e++)M(o+.5*e/2,a+12+e%2*12,.225,.1,{w:"pulse",pwm:1.3});for(let e=0;e<4;e++)k(o+.5*e,e%2?"s":"k",.46),k(o+.5*e+.25,"h",.22)}),a(228,0,16,(e,t,a)=>M(e,t,.92*a,.14,{vib:.25,pwm:.9,dl:.2})),M(236,74,.45,.1,{vib:.2,pwm:.9}),M(236.5,76,.45,.1,{vib:.2,pwm:.9}),M(237,79,.95,.11,{vib:.3,pwm:.9,dl:.2});for(let e=0;e<18;e++)M(238+.125*e,57+[0,4,7,12][e%4]+5*Math.floor(e/4),.12,.05+.003*e,{w:"pulse",pwm:.8});for(let e=0;e<16;e++)k(238.25+.125*e,e%4==0?"k":"s",.2+.02*e);for(ue in t(240.25,1),d(240.25,[45,52,57,60,64,71],1.6,.1,.8,.02,1.2),f(240.25,33,1.4,.4),l=0,n)n[ue].sort((e,t)=>e-t);return o.sort((e,t)=>e.t-t.t),r.sort((e,t)=>e-t),{ev:o,ducks:r}}be.render=async(c,e=!1)=>{let t;be.started=new Promise(e=>t=e);var{ev:a,ducks:o}=x();if(e)return t(),null;let r=ze.script.END,l=Math.ceil((r+1)*q),b=new Float32Array(l),y=new Float32Array(l),n=[];for(let t=0,e=0;t<r;t+=4,e++){var i=a.filter(e=>e.t>=t&&e.t<t+4);i.length&&n.push({id:e,start:t,events:i,tail:5,warp:null,ducks:o.filter(e=>e>t-1&&e<t+4+25)})}let s={choir:6,pad:5,sslead:4,bell:1.2,bass:1,hlead:1,pluck:.8,chip:.6},f=e=>e.events.reduce((e,t)=>e+(t.d||.3)*(s[t.i]||.3)*(t.n?t.n.length:1),4),d=(n.sort((e,t)=>f(t)-f(e)),t=>{var a=t.start,o=Math.min(t.L.length,l-a);for(let e=0;e<o;e++)b[a+e]+=t.L[e],y[a+e]+=t.R[e]}),u=(a=>{try{let e="("+ze.synthCore.toString()+")();",t=URL.createObjectURL(new Blob([e],{type:"text/javascript"}));return Array.from({length:a},()=>new Worker(t))}catch(e){return console.warn("workers unavailable, rendering on the main thread",e),[]}})(Math.max(1,Math.min(8,(navigator.hardwareConcurrency||4)-1))),h=0,p=performance.now();if(u.length){await Promise.all(u.map(a=>new Promise((e,t)=>{a.onmessage=e,a.onerror=t,a.postMessage({ping:1})})));e=new Promise((t,a)=>{var e,o,r=u.map(()=>0);for(e of u)e.onmessage=e=>{d(e.data),h++,c&&c(h/(n.length+1)),h===n.length&&t()},e.onerror=e=>a(e);for(o of n){var l=r.indexOf(Math.min(...r));r[l]+=f(o),u[l].postMessage(o)}});t(),await e,u.forEach(e=>e.terminate())}else{t();var v,m=ze.synthCore();for(v of n)d(m.renderSegment(v)),h++,c&&c(h/(n.length+1)),await new Promise(e=>setTimeout(e,0))}{let c=b,n=y,a=c.length,i=e=>Math.min(a,Math.max(0,Math.round(e*q)));var w,M=(t,e,a,o,r)=>{let l=Math.pow(10,r/40),c=2*Math.PI*a/q,n=Math.cos(c),i=Math.sin(c)/(2*o),s=2*Math.sqrt(l)*i,f,d,u,h,p,v,m=(v="hp"===e?(f=(1+n)/2,d=-(1+n),u=f,h=1+i,p=-2*n,1-i):"ls"===e?(f=l*(l+1-(l-1)*n+s),d=2*l*(l-1-(l+1)*n),u=l*(l+1-(l-1)*n-s),h=l+1+(l-1)*n+s,p=-2*(l-1+(l+1)*n),l+1+(l-1)*n-s):(f=l*(l+1+(l-1)*n+s),d=-2*l*(l-1+(l+1)*n),u=l*(l+1+(l-1)*n-s),h=l+1-(l-1)*n+s,p=2*(l-1-(l+1)*n),l+1-(l-1)*n-s),f/=h,d/=h,u/=h,p/=h,v/=h,0),x=0,g=0,b=0;for(let e=0;e<t.length;e++){var y=t[e],w=f*y+d*m+u*x-p*g-v*b;x=m,m=y,b=g,g=w,t[e]=w}};for(w of[c,n])M(w,"hp",28,.7,0),M(w,"ls",110,.7,-2.5),M(w,"hs",3500,.7,4);var k=[[0,0],[32,-1.5],[48,0],[120,-1.5],[128,0],[136,-1],[144,0],[168,-1.5],[183.5,-1.5],[184,1],[212,1],[216,-1.5],[227.5,-1.5],[228,1.5],[250,0]];for(let e=0;e<k.length-1;e++){let[t,a]=k[e],[o,r]=k[e+1],l=1;for(let e=i(t);e<i(o);e++)0==(e-i(t)&63)&&(l=Math.pow(10,(a+(r-a)*(e/q-t)/(o-t))/20)),c[e]*=l,n[e]*=l}let t=0,o=i(196),r=i(212);for(let e=o;e<r;e++)t+=c[e]*c[e]+n[e]*n[e];let l=Math.pow(10,-.75)/Math.sqrt(t/(2*(r-o))+1e-12),s=Math.exp(-1/264.6),f=Math.exp(-1/8820),d=Math.exp(-1/35.28),u=Math.exp(-1/3528),h=Math.pow(10,-.6),p=Math.pow(10,-.06),v=Math.pow(10,.15),m=0,x=0,g=1;for(let e=0;e<a;e++){var P=c[e]*l,z=n[e]*l,T=Math.max(Math.abs(P),Math.abs(z)),T=(m=T>m?s*m+(1-s)*T:f*m+(1-f)*T,P*=(g=0==(3&e)?m>h?Math.pow(m/h,1/3.5-1):1:g)*v,z*=g*v,Math.max(Math.abs(P),Math.abs(z))),T=(x=T>x?d*x+(1-d)*T:u*x+(1-u)*T)>p?p/x:1;P*=T,z*=T,c[e]=.9<P?.9+.045*Math.tanh(22*(P-.9)):P<-.9?-.9-.045*Math.tanh(22*(-P-.9)):P,n[e]=.9<z?.9+.045*Math.tanh(22*(z-.9)):z<-.9?-.9-.045*Math.tanh(22*(-z-.9)):z}var A=(e,t,a)=>{a=Math.min(1,Math.max(0,(a-e)/(t-e)));return a*a*(3-2*a)};for(let a=i(9);a<i(16);a++){let e=a/q,t=e<15?.12+.48*A(9,13,e):.6+.4*A(15,16,e);c[a]*=t,n[a]*=t}var E=ze.script.END;for(let t=i(E-1.2);t<a;t++){let e=1-A(E-1.2,E-.05,t/q);c[t]*=e,n[t]*=e}}e=new AudioBuffer({length:l,numberOfChannels:2,sampleRate:q});return e.copyToChannel(b,0),e.copyToChannel(y,1),be.buffer=e,be.renderMs=performance.now()-p,c&&c(1),e};let a=null,o=null,r=0,e=0,l=!1,c=null;function t(t,a,o){if(!a)return t;if(t<=a[0])return o[0]+(t-a[0])*(o[1]-o[0])/(a[1]-a[0]);for(let e=1;e<a.length;e++)if(t<=a[e])return o[e-1]+(t-a[e-1])*(o[e]-o[e-1])/(a[e]-a[e-1]);var e=a.length-1;return o[e]+(t-a[e])*(o[e]-o[e-1])/(a[e]-a[e-1])}be.ctx=()=>a,be.play=(e=0)=>{if(a||(a=new(window.AudioContext||window.webkitAudioContext),(c=a.createGain()).connect(a.destination)),a.resume(),o){try{o.stop()}catch(e){}o.disconnect()}var t=be.userBuffer||be.buffer;t&&((o=a.createBufferSource()).buffer=t,o.connect(c),t=Math.max(0,be.toAudioTime(e)),o.start(0,t),r=a.currentTime-t,l=!0)},be.pause=()=>{if(l){if(e=be.time(),o)try{o.stop()}catch(e){}l=!1}},be.resume=()=>{l||be.play(e)},be.close=()=>{be.pause(),a&&(a.close(),a=null)},be.playing=()=>l,be.audioTime=()=>{var e,t;return a?(e=a.getOutputTimestamp?a.getOutputTimestamp():null,t=a.currentTime,(t=e&&0<e.contextTime?e.contextTime+(performance.now()-e.performanceTime)/1e3:t)-r):0},be.time=()=>l?be.toDemoTime(be.audioTime()):e,be.toAudioTime=e=>t(e,be.map&&be.map.demo,be.map&&be.map.audio),be.toDemoTime=e=>t(e,be.map&&be.map.audio,be.map&&be.map.demo),be.SECTIONS=[0,16,144,184,228,256,ze.script.END],be.loadUserTrack=async(e,t)=>{let l=await new OfflineAudioContext(2,1,q).decodeAudioData(e),a=(be.userBuffer=l).duration,o=(t&&t.length===be.SECTIONS.length?be.map={demo:be.SECTIONS.slice(),audio:t.slice()}:be.map={demo:[0,ze.script.END],audio:[0,a]},async(e,t)=>{var a=new OfflineAudioContext(1,Math.ceil(11025*l.duration),11025),o=a.createBufferSource(),r=(o.buffer=l,a.createBiquadFilter());return r.type=e,r.frequency.value=t,r.Q.value=.8,o.connect(r).connect(a.destination),o.start(),(await a.startRendering()).getChannelData(0)}),r=(o,r,e)=>{var t=Math.floor(o.length/r),l=new Float32Array(t);for(let a=0;a<t;a++){let t=0;for(let e=0;e<r;e++){var c=o[a*r+e];t+=c*c}l[a]=Math.sqrt(t/r)}let n=[],i=-1;for(let a=8;a<t-1;a++){let t=0;for(let e=a-8;e<a;e++)t+=l[e];t/=8,0<l[a]-l[a-1]&&l[a]>t*e&&l[a]>=l[a+1]&&.02<l[a]&&4<a-i&&(n.push(a*r/11025),i=a)}return n},c=await o("lowpass",140),n=await o("bandpass",2200),i=r(c,110,1.45).map(be.toDemoTime),s=r(n,110,1.6).map(be.toDemoTime);return Object.assign(be.sync,{kick:i,snare:s,hat:[],heart:i,hit:[],bass:i}),{duration:a,kicks:i.length}},be.wav=()=>{let e=be.buffer,a=e.length,o=new DataView(new ArrayBuffer(44+2*a*2)),t=(t,a)=>{for(let e=0;e<a.length;e++)o.setUint8(t+e,a.charCodeAt(e))},r=(t(0,"RIFF"),o.setUint32(4,36+2*a*2,!0),t(8,"WAVE"),t(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,2,!0),o.setUint32(24,e.sampleRate,!0),o.setUint32(28,2*e.sampleRate*2,!0),o.setUint16(32,4,!0),o.setUint16(34,16,!0),t(36,"data"),o.setUint32(40,2*a*2,!0),e.getChannelData(0)),l=e.getChannelData(1);for(let e=0,t=44;e<a;e++,t+=4)o.setInt16(t,32767*Math.max(-1,Math.min(1,r[e])),!0),o.setInt16(t+2,32767*Math.max(-1,Math.min(1,l[e])),!0);return new Uint8Array(o.buffer)}}{let a=ze.text={},R='"JetBrains Mono","IBM Plex Mono","Fira Mono","DejaVu Sans Mono",Menlo,Consolas,monospace',C='"Arial Black","Helvetica Neue",Helvetica,Arial,sans-serif',S={agi:"#86e8ff",dim:"rgba(200,225,255,0.6)"},c="01<>/\\[]{}#$%&*+=?ABCDEFGHJKLMNPQRSTUVWXYZ",L=()=>ze.script,o,F,D=0,I=0,N="",O=(a.canvas=()=>o,a.init=()=>{o=document.createElement("canvas"),F=o.getContext("2d"),(z=document.createElement("canvas")).width=320,z.height=200,T=z.getContext("2d",{willReadFrequently:!0})},a.resize=(e,t)=>{var a=Math.min(1,1080/t);D=o.width=Math.round(e*a),I=o.height=Math.round(t*a),N=""},e=>{e=43758.5453*Math.sin(127.1*e+311.7);return e-Math.floor(e)}),B=(t,a,o)=>{if(1<=a)return t;let r="";for(let e=0;e<t.length;e++){var l=e/t.length;" "===t[e]||.25+l<a?r+=t[e]:r+=l-.2<a?c[Math.floor(O(o+13*e+Math.floor(40*a))*c.length)]:" "}return r},_=(t,a,o)=>{let r="";for(let e=0;e<t.length;e++){var l=.7*O(o+7.31*e);" "===t[e]||.3+l<a?r+=t[e]:r+=l<a?c[Math.floor(O(o+13*e+Math.floor(30*a))*c.length)]:" "}return r},j=(e,t,a,o=.4,r=.6)=>Math.min(ze.smooth(t,t+o,e),1-ze.smooth(a-r,a,e)),G=(e,t)=>(F.letterSpacing=t+"px",e),P={bg:"#352879",fg:"#6c5eb5"},z,T,r=null;ze.c64Keys=()=>(r||(r=[],L().c64.typing.forEach(([e,l,t,c],n)=>{var i=[0];for(let r=1;r<=l.length;r++){let e=l[r]||"\n",t=l[r-1],a=e=>"0"<=e&&e<="9",o=(1+2*(O(97*n+r)-.5)*c)*(1<r&&" "!==t&&" "!==l[r-2]?.7:1);" "!==t&&":"!==t||(o+=1.4+2.4*O(31*n+7*r))," "===e&&(o*=.6),'$()+;:"'.includes(e)&&(o+=.8)," "!==e&&" "!==t&&a(e)!==a(t)&&(o+=.4),"\n"===e&&(o+=1.5),i.push(o)}let a=(l.length+2.5)/t/i.reduce((e,t)=>e+t,0),o=e;for(let e=0;e<l.length;e++)o+=i[e]*a,r.push({t:o,line:n,i:e});r.push({t:o+i[l.length]*a,line:n,i:l.length,enter:!0})})),r);var e,i={A:"0e1111111f1111",B:"1e11111e11111e",C:"0e11101010110e",D:"1c12111111121c",E:"1f10101e10101f",F:"1f10101e101010",G:"0e1110171111 0f",H:"1111111f111111",I:"0e04040404040e",J:"07020202021 20c",K:"11121418141211",L:"1010101010101f",M:"111b1515111111",N:"11111915131111",O:"0e11111111110e",P:"1e11111e101010",Q:"0e111111151 20d",R:"1e11111e141211",S:"0f10100e01011e",T:"1f040404040404",U:"1111111111110e",V:"11111111110a04",W:"1111111515150a",X:"11110a040a1111",Y:"1111110a040404",Z:"1f01020408101f",0:"0e111315191 10e",1:"040c040404040e",2:"0e110102040 81f",3:"1f020402011 10e",4:"02060a121f0202",5:"1f101e0101110e",6:"060810 1e11110e",7:"1f010204080808",8:"0e11110e11110e",9:"0e11110f01020c"," ":"00000000000000","*":"0004150e150400",$:"040f140e051e04","(":"02040808080402",")":"08040202020408","+":"0004041f040400",".":"0000000000 0c0c",";":"000c0c000c0408",":":"000c0c000c0c00",",":"000000000c0408","&":"0c1214081512 0d","-":"0000001f000000","=":"00001f001f0000","'":"0c040800000000",'"':"0a0a0a00000000","?":"0e110102040004","/":"00010204081000","!":"04040404040004","%":"18190204081303",_:"0000000000001f","#":"0a0a1f0a1f0a0a"};let t={};for(e in i){let a=i[e].replace(/ /g,"");t[e]=Array.from({length:7},(e,t)=>parseInt(a.substr(2*t,2),16))}let A=null,E=null,q=null,l=[0,0,0],n=0,Y=e=>{l=e,n=(255<<24|e[2]<<16|e[1]<<8|e[0])>>>0};function ce(t,e,a,o){var r=Math.max(0,t),l=Math.min(320,t+a),t=Math.max(0,e),c=Math.min(200,e+o);for(let e=t;e<c;e++)q.fill(n,320*e+r,320*e+l)}function ne(e,t,a){e<0||320<=e||t<0||200<=t||(t=4*(320*t+e),e=E[3+t]/255,E[t]=l[0],E[1+t]=l[1],E[2+t]=l[2],E[3+t]=Math.round(255*(e+a*(1-e))))}function de(e,a,o){var r=t[e]||t[e.toUpperCase()]||t["?"];for(let t=0;t<7;t++){var l=r[t];for(let e=0;e<5;e++)l&16>>e&&ce(a+1+e,o+t,2,1)}}let U=(e,t)=>{let a=0,o=!1;for(var r of ze.c64Keys())r.line===e&&r.t<=t&&(r.enter?o=!0:a=r.i+1);return{n:a,ent:o}},H=(e,t)=>.5<O(1.37*e+t)?1:0,X=L().c64.coda.at,$=L().c64.coda.burstAt,W=t=>{let a=0;for(let e=X;e<Math.min(t,$);e+=1/60)a+=(o=e,380*ze.smooth(X,X+1,o)*(1-ze.smooth($-.8,$,o))/60);var o;return Math.floor(a)},Q=(ze.c64Screen=e=>{var a=1e3+W(e),o=Math.max(0,Math.ceil(a/40)-25),r=new Array(1e3);for(let t=0;t<25;t++)for(let e=0;e<40;e++){var l=40*(o+t)+e;r[40*t+e]=l<a?H(l,7)+1:0}return r},t=>[1,3,5].map(e=>parseInt(t.substr(e,2),16))),J=(e,t,a)=>{let o=Q(e),r=Q(t);return o.map((e,t)=>Math.round(e+(r[t]-e)*a))},ee=(e,t,a)=>`rgb(${J(e,t,a).join(",")})`,V=["#6c5eb5","#70a4b2","#9ad284","#ffffff","#ffffff","#9ad284","#70a4b2"],te=V.map(Q);function ue(e,t,a={}){var o=a.zoom||1,r=a.glow||0,l=a.power??1,c=a.flare||0,a=a.squash??1;if(l<=0)return"off";let n=(e=>{var t=L().c64;if(e<t.banner)return{lines:[],maze:0,seed:1,cursor:null};let a,o,r=t.boot.map(e=>({text:e})),l=null,c=0,n=1;return e<100?(a=U(0,e),r.push({text:t.typing[0][1].slice(0,a.n)}),l=[r.length-1,a.n],a.ent&&(o=U(1,e),r.push({text:t.typing[1][1].slice(0,o.n)}),l=[r.length-1,o.n],o.ent&&e>=t.runAt?(c=Math.floor(380*(e-t.runAt)),l=null):o.ent&&(r.push({text:""}),l=[r.length-1,0]))):(r.length=0,n=7,c=1e3+W(e)),{lines:r,maze:c,seed:n,cursor:l}})(e),i=[],s=t=>{t.length||i.push({text:""});for(let e=0;e<t.length;e+=40)i.push({text:t.slice(e,e+40)})},f=null;n.lines.forEach((e,t)=>{s(e.text),n.cursor&&n.cursor[0]===t&&(f=[i.length-1,n.cursor[1]%40+(n.cursor[1]&&n.cursor[1]%40==0?40:0)])}),f&&40<=f[1]&&(i.push({text:""}),f=[i.length-1,0]);var d=Math.ceil(n.maze/40);for(let e=0;e<d;e++)i.push({maze:e});if(n.tail){for(var u of n.tail)s(u);var h=i[i.length-1].text||"";f=[i.length-1,h.length]}var p=Math.max(0,i.length-25),h=Math.floor(1.9*e)%2==0;A||(A=T.createImageData(320,200),E=A.data,q=new Uint32Array(E.buffer)),q.fill(0),Y(0<r?J("#6c5eb5","#f4eeff",r):Q("#6c5eb5"));for(let a=0;a<25;a++){var v=i[a+p];if(v)if(void 0!==v.text)for(let e=0;e<v.text.length&&e<40;e++)de(v.text[e],8*e,8*a);else for(let t=0;t<40;t++){var m=40*v.maze+t;if(m>=n.maze)break;var x=H(m,n.seed);for(let e=0;e<8;e++){var g=8*t+(x?e:7-e),b=8*a+e;ne(g-1,b,.5),ne(g,b,1),ne(g+1,b,.5)}}}f&&h&&0<=(y=f[0]-p)&&y<25&&ce(8*Math.min(f[1],39),8*y,8,8);var y=(l=>{let e=L().c64.coda,t=L().c64.credits;if(l<e.creditsAt||l>=e.creditsTo)return 0;var a=t.length+2,o=Math.min(1,(l-e.creditsAt)/.25,(e.creditsTo-l)/.25);let c=Math.round(320*o/2),n=(Y(Q(P.bg)),ce(160-c,48,2*c,8*a),Y(Q("#70a4b2")),ce(160-c+2,50,2*c-4,1),ce(160-c+2,8*(6+a)-3,2*c-4,1),ce(160-c+2,50,1,8*a-4),ce(160+c-3,50,1,8*a-4),0);return t.forEach((t,a)=>{var o=Math.max(0,Math.min(t.length,Math.floor(70*(l-e.creditsAt-.3-.2*a)))),r=1+Math.floor((38-t.length)/2);for(let e=0;e<o;e++)Math.abs(8*(r+e)+4-160)>c-6||(Y(te[((e+3*a-Math.floor(14*l))%V.length+V.length)%V.length]),de(t[e],8*(r+e),8*(7+a)));n+=o}),100*n+Math.floor(14*l)%V.length})(e),e=(T.putImageData(A,0,0),F.save(),F.translate(D/2,I/2),F.scale(1,Math.max(Math.max(.006,ze.easeOut(l))*a,1.2/I)),F.translate(-D/2,-I/2),F.globalAlpha=t,F.fillStyle=0<r?ee(P.fg,"#07050f",r):P.fg,F.fillRect(0,0,D,I),F.save(),F.translate(D/2,I/2),F.scale(o,o),F.translate(-D/2,-I/2),.78*I),w=1.6*e,M=(D-w)/2,k=(I-e)/2;return F.fillStyle=0<r?ee(P.bg,"#07050f",r):P.bg,F.fillRect(M,k,w,e),F.imageSmoothingEnabled=!1,F.drawImage(z,M,k,w,e),F.imageSmoothingEnabled=!0,F.restore(),0<c&&(F.globalCompositeOperation="lighter",F.fillStyle=`rgba(215,222,255,${c.toFixed(3)})`,F.fillRect(0,0,D,I),F.globalCompositeOperation="source-over"),F.restore(),F.globalAlpha=1,l.toFixed(3)+":"+c.toFixed(3)+":"+a.toFixed(4)+":"+n.maze+":"+p+":"+(h?1:0)+":"+i.length+":"+(f?f.join(","):"")+":"+i.slice(-3).map(e=>e.text||"").join("|")+t.toFixed(2)+":"+o.toFixed(3)+":"+r.toFixed(2)+":"+y}let K=Object.fromEntries(ze.shaders.yoloObjs.map(e=>[e.cls,e.col])),ae={donut:"frisbee","sports ball":"orange",cup:"vase",apple:"orange",orange:"sports ball",clock:"frisbee",bottle:"vase"},oe=[.97,.99,.93,.96,.91,.98,.88],re=[,[255,214,120,.9],[130,215,255,.85],[225,150,255,.85],[140,240,160,.85]];let Z=()=>ze.timeline,le=["#ffd890","#7fe0ff","#ffb060","#8cf0a0","#e09cff","#a8b8d8","#70f0d8"];ze.attnState=e=>{var t=L().attention,a=Math.floor((e-t.step0)/t.dt),o=(e-t.step0)/t.dt-a,a=e<t.step0?-1:Math.min(a,t.cands.length),r=t.land,l=t.prompt+Math.max(0,a)+(0<=a&&a<t.cands.length&&r<o?1:0),a=0<=a&&a<t.cands.length?a:-1,c=0<=a&&r<o?t.prompt+a:-1,n=0<=c?ze.smooth(r,r+.22,o):1,t=t.step0+(t.cands.length-1+r)*t.dt;return{n:l,q:l-1,now:a,p:o,LP:r,land:c,le:n,think:0<=a?Math.max(ze.smooth(0,.2,o),0===a?.35:0)*(1-ze.smooth(r-.1,r+.08,o)):t<e?ze.smooth(t+.3,t+.9,e):.35}},ze.attnWeights=(t,a)=>{var o=[];for(let e=0;e<=t;e++)o.push(4*O(31*t+7*e+101*a)-(0===a?.6*(t-e):0)+(1===a&&e===t?2:0)+(2===a&&1===e?1.5:0));let r=Math.max(...o),e=o.map(e=>Math.exp(e-r)),l=e.reduce((e,t)=>e+t,0);return e.map(e=>e/l)},ze.attnLayout=(()=>{let a=[],o=[],r=0;return L().attention.tokens.forEach((e,t)=>{t&&"."!==e&&(r+=.18),a.push(r+.18*e.length/2),o.push(.18*e.length/2),r+=.18*e.length}),{EM:.3,CH:.18,x:a,w:o,len:r}})(),a.draw=(d,e)=>{let t={dirty:!1},u=[],h=L(),b=I/100,a=h.c64.on,o=ze.clamp((d-a)/.22,0,1),r=d<a?0:1-ze.smooth(a,a+.7,d),l=ze.timeline.crtOff(d);l.picture&&u.push("c64"+ue(d,1,{power:o,flare:Math.max(r,l.white),squash:l.y})),d>=X-.9&&d<$+.4&&u.push("c64"+ue(d,ze.smooth(X-.9,X-.05,d)*(1-ze.smooth($,$+.3,d)))),64<d&&d<80&&u.push("ls"+((s,e)=>{let f=L().lstm,a=e.cam;if(!a)return"";let t=I/100,o=e.aspect,r=1-ze.smooth(79.6,80,s),d=ze.smooth(79.4,79.95,s),u=e=>{var t=ze.v3.sub(e,a.pos),t=ze.v3.dot(t,a.fwd),e=ze.project(a,e,o);return{x:e[0]*D,y:(1-e[1])*I,k:I/(2*t*a.tanHalf),ok:.3<t}},h=(F.textAlign="center",F.shadowColor="rgba(0,0,0,0.85)",F.shadowBlur=.6*t,"");if(f.tokens.forEach((e,t)=>{let a=s-(f.read0+t*f.dt);var o,r,l,c,n,i;a<-.25||(c=a<0?Math.pow(-a/.25,2):0,o=Z().lstmWordAt(t),(o=u([o[0],o[1]+.5*c,o[2]])).ok&&(r=0<=a&&a<f.dt,l=f.lanes.find(e=>e[0]===t&&.3<=a&&(e[1]<0||s<f.read0+e[1]*f.dt+.3)),F.globalAlpha=Math.min(1,1-c),F.font=(.36*o.k).toFixed(1)+"px "+R,F.fillStyle=(c=r?[255,255,255,1]:l?re[l[2]]:[170,205,240,.75],n=l&&l[1]<0?[255,211,110,1]:[232,242,255,1],i=d,`rgba(${c.map((e,t)=>t<3?Math.round(ze.mix(e,n[t],i)):ze.mix(e,n[t],i).toFixed(2)).join(",")})`),F.fillText(e,o.x,o.y),h+=t+","+Math.round(o.x)+","+Math.round(o.y)+","+(r?1:l?2+l[2]:0)+";"))}),h+="h"+d.toFixed(2),0<(e=Math.min(ze.smooth(f.read0-.3,f.read0+.2,s),1-ze.smooth(f.read0+1.4,f.read0+1.8,s)))){F.globalAlpha=e,F.fillStyle="rgba(175,215,250,0.75)",F.shadowBlur=0;for(var[l,c]of Z().lstmParts()){c=u(c);c.ok&&(F.font=(.075*c.k).toFixed(1)+"px "+R,F.fillText(l,c.x,c.y))}h+="p"+e.toFixed(2)}var n,e=s-f.out,i=ze.smooth(.12,.4,e)*r;return 0<i&&(n=Z().lstmOutAt(),(e=u([n[0],n[1]-.3*Math.exp(5*-Math.max(e-.12,0)),n[2]])).ok)&&(F.globalAlpha=i,F.font=`bold ${(.55*e.k).toFixed(1)}px `+R,F.fillStyle="#ffd36e",F.shadowColor="rgba(255,190,80,0.6)",F.shadowBlur=1.5*t,n=F.measureText(f.outWord).width/2+1.5*t,n=Math.min(Math.max(e.x,n),D-n),F.fillText(f.outWord,n,e.y),h+="o"+Math.round(n)+","+Math.round(e.y)+","+i.toFixed(2)),F.shadowBlur=0,F.textAlign="left",F.globalAlpha=1,h})(d,e)),80<=d&&d<96&&u.push("em"+((l,e)=>{let a=e.cam;if(!a)return"";let c=L().embed,t=ze.timeline,o=t.embedState(l),n=I/100,r=e.aspect,i=e=>{var t=ze.v3.sub(e,a.pos),t=ze.v3.dot(t,a.fwd),e=ze.project(a,e,r);return{x:e[0]*D,y:(1-e[1])*I,k:I/(2*t*a.tanHalf),z:t,ok:.4<t}};var s,f,d,u,h,p=1-ze.smooth(92.4,93,l);let v="",m=(F.shadowColor="rgba(0,0,0,0.85)",F.shadowBlur=.5*n,F.textAlign="left",o.tok.forEach((e,t)=>{var a,o,r;e.a<=0||(a=i(e.p)).ok&&(o=ze.smooth(c.fly[0],c.fly[0]+.5,l),F.globalAlpha=e.a,F.textAlign="center",r=Math.max(1.2*n,.36*a.k*(1-o)+Math.min(2.2*n,.3*a.k)*o),F.font=r.toFixed(1)+"px "+R,F.fillStyle=1===t?"#ffd36e":"#e8f2ff",F.fillText(e.w,a.x,a.y-.45*r*o),v+="t"+t+","+Math.round(a.x)+","+Math.round(a.y)+";")}),F.textAlign="left",{});c.analogies.forEach(([,,,e,t])=>{m[e]=Math.exp(1.2*-Math.max(0,l-t-1.5))*(t+1.5<l?1:0)});for(s of t.embedWords){var x,g,b,y=o.group(s),w=o.vis[s]*p;w<=.01||2===y||!(x=i(o.pos[s])).ok||22<x.z||(g=ze.clamp(.26*x.k,n,2.3*n),b=ze.clamp(1.25-x.z/16,.25,1),F.globalAlpha=w*b,F.font=(.05<(m[s]||0)?"bold ":"")+g.toFixed(1)+"px "+R,F.fillStyle=.05<(m[s]||0)?"#ffd36e":le[y],F.fillText(s,x.x+.45*g,x.y-.3*g),v+=s[0]+Math.round(x.x)+","+Math.round(x.y)+","+w.toFixed(2)+";")}for([f,d,u,h]of[["king − man + woman ≈ ","queen",84,87.4],["paris − france + italy ≈ ","rome",90,92.2]]){var M,k,P,z=ze.smooth(u,u+.3,l)*(1-ze.smooth(h-.4,h,l));z<=0||(F.globalAlpha=z,F.font=3*n+"px "+R,F.textAlign="left",M=F.measureText(f).width,k=F.measureText(d).width,k=(D-M-k)/2,P=86*n,F.fillStyle="#e8f2ff",F.fillText(f,k,P),F.fillStyle="#ffd36e",F.fillText(d,k+M,P),v+="q"+u+z.toFixed(2))}return F.shadowBlur=0,F.globalAlpha=1,F.textAlign="left",v})(d,e)),96<d&&d<104&&u.push("y"+((d,e)=>{let u=ze.timeline.yoloExit(d);if(!e.cam||u.size.every(e=>e<=.01))return"";let h=e.cam,p=e.aspect,o=I/100,t,a,r=ze.shaders.yoloObjs.map((e,t)=>{var a,o=e.e.map(e=>e*u.size[t]);let r=9,l=9,c=-9,n=-9;for(a of[-1,1])for(var i of[-1,1])for(var s of[-1,1]){s=ze.project(h,[e.c[0]+a*o[0],e.c[1]+i*o[1],e.c[2]+s*o[2]],p);r=Math.min(r,s[0]),c=Math.max(c,s[0]),l=Math.min(l,s[1]),n=Math.max(n,s[1])}var f=ze.project(h,e.c,p);return{...e,i:t,X:r*D,Y:(1-n)*I,BW:(c-r)*D,BH:(n-l)*I,cx:f[0],cy:1-f[1],s:u.size[t],la:1-ze.smooth(u.at[t]-.06,u.at[t]+.06,d)}}),l=j(d,96.4,99.8,.3,.6),c=j(d,97.3,100.3,.3,.6),n=ze.smooth(99,100,d),i=ze.smooth(99.5,100,d);if(F.save(),0<l){F.strokeStyle=`rgba(63,224,255,${.3*l})`;for(let e=F.lineWidth=1;e<7;e++)F.beginPath(),F.moveTo(D*e/7,0),F.lineTo(D*e/7,I),F.moveTo(0,I*e/7),F.lineTo(D,I*e/7),F.stroke();for(var s of r){var f=Math.floor(7*s.cx),v=Math.floor(7*s.cy);F.fillStyle=K[s.cls]+"26",F.globalAlpha=l,F.fillRect(f*D/7,v*I/7,D/7,I/7)}F.globalAlpha=1}if(F.font=`bold ${1.5*o}px `+R,F.lineWidth=Math.max(1,.12*o),0<c)for(let a of r)for(let t=0;t<6;t++){var m=e=>O(71*a.i+13*t+3.7*e)-.5,x=.45*(1-n),g=a.X+m(1)*a.BW*x,b=a.Y+m(2)*a.BH*x,y=a.BW*(1+m(3)*x),m=a.BH*(1+m(4)*x),x=t%3==2?ae[a.cls]:a.cls;F.globalAlpha=c*(.25+.3*O(a.i+5*t))*(1-i),F.strokeStyle=K[a.cls],F.strokeRect(g,b,y,m),t<3&&(F.fillStyle=K[a.cls],F.fillText(x+" "+(.2+.5*O(3*a.i+t)).toFixed(2),g+.4*o,b-.5*o))}if(0<i)for(var w of r)w.s<=.01||(F.globalAlpha=i*Math.min(1,4*w.s),F.strokeStyle=K[w.cls],F.lineWidth=Math.max(1.5,.22*o),F.strokeRect(w.X,w.Y,w.BW,w.BH),w.la<=0)||(F.globalAlpha=i*w.la,t=w.cls+" "+oe[w.i].toFixed(2),a=F.measureText(t).width+o,F.fillStyle=K[w.cls],F.fillRect(w.X-F.lineWidth/2,w.Y-2.2*o,a,2.2*o),F.fillStyle="#000",F.fillText(t,w.X+.4*o,w.Y-.6*o));return F.restore(),r.map(e=>Math.round(e.X)+","+Math.round(e.Y)+","+Math.round(e.BW)+","+e.la.toFixed(2)).join(";")+":"+l.toFixed(2)+c.toFixed(2)+n.toFixed(2)})(d,e)),120<d&&d<128.5&&u.push("at"+((e,t)=>{var a=L().attention,o=ze.attnLayout,r=j(e,a.from,a.to,.5,.6);if(r<=0||!t.cam)return"";let i=I/100,l=a.tokens,c=l.length,n=t.cam,s=t.aspect,f=ze.attnState(e),{n:d,q:u,now:h,p,LP:v,land:m,le:x}=f;var g=e=>{var t=ze.v3.sub(e,n.pos),t=ze.v3.dot(t,n.fwd),e=ze.project(n,e,s);return{x:e[0]*D,y:(1-e[1])*I,k:I/(2*t*n.tanHalf),ok:.2<t}};F.globalAlpha=r,F.textAlign="center";let b=null;for(let e=0;e<d;e++){var y=e===m?1-x:0,w=g([o.x[e],.06+.35*y,0]);w.ok&&(e===u&&(b=w),F.font=(o.EM*w.k).toFixed(1)+"px "+R,F.fillStyle=e===u?"#ffffff":"rgba(200,230,255,0.82)",F.shadowColor="rgba(0,0,0,0.8)",F.shadowBlur=.6*i,F.globalAlpha=r*(1-.7*y),F.fillText(l[e],w.x,w.y))}if(F.shadowBlur=0,F.globalAlpha=r,d<c&&Math.floor(2.4*e)%2==0&&(t=g([o.x[d]-o.w[d]+.4*o.CH,.06,0])).ok&&(F.fillStyle="#86e8ff",F.fillRect(t.x-.06*t.k,t.y-.24*t.k,.12*t.k,.28*t.k)),F.textAlign="left",0<=h&&b){let e=a.cands[h],t=ze.smooth(.05,.25,p)*(1-ze.smooth(.85,1,p)),l=Math.min(b.x+2*i,D-34*i),c=Math.min(b.y+5*i,I-22*i),n=2.9*i;F.globalAlpha=r*t,F.fillStyle="rgba(2,6,12,0.7)",F.fillRect(l-1.2*i,c-1.2*i,31*i,5*n+3.6*i),F.strokeStyle="rgba(134,232,255,0.35)",F.lineWidth=1,F.strokeRect(l-1.2*i+.5,c-1.2*i+.5,31*i,5*n+3.6*i),F.font=1.3*i+"px "+R,F.fillStyle=S.dim,F.fillText(G("P(next token)",.2*i),l,c+.6*i),F.letterSpacing="0px",e.forEach(([e,t],a)=>{var o=c+2.4*i+a*n,r=ze.smooth(.08+.03*a,.4+.03*a,p),a=0===a&&p>v-.12;F.font=1.9*i+"px "+R,F.fillStyle=a?"#ffffff":"rgba(200,230,255,0.8)",F.fillText(e,l,o+1.6*i),F.fillStyle=a?"rgba(255,255,255,0.95)":"rgba(63,224,255,0.6)",F.fillRect(l+12*i,o,12*i*t*r/.9,1.9*i),F.fillStyle=S.dim,F.fillText((t*r).toFixed(2),l+25*i,o+1.6*i)})}F.globalAlpha=r;var M=6*i,k=I-27*i,P=1.9*i;for(let t=0;t<d;t++){var z=ze.attnWeights(t,Math.floor(.8*e)%4);for(let e=0;e<c;e++)F.fillStyle=e>t?"rgba(255,255,255,0.03)":t===u?`rgba(255,255,255,${.15+.85*z[e]})`:`rgba(63,224,255,${.06+.8*z[e]})`,F.fillRect(M+e*P,k+t*P,P-1,P-1)}return F.font=1.4*i+"px "+R,F.fillStyle=S.dim,F.fillText(G("softmax(QKᵀ/√d + mask)",.2*i),M,k-1.2*i),F.letterSpacing="0px",F.globalAlpha=1,d+":"+Math.floor(30*p)+":"+r.toFixed(2)+":"+Math.round(200*n.pos[0])+","+Math.round(200*n.pos[2])})(d,e)),127.5<d&&d<130.3&&u.push("fs"+(e=>{var t=ze.smooth(127.55,128.1,e)*(1-ze.smooth(129,130.2,e));if(t<=0)return"";var a=ze.timeline.scenes.find(e=>"fold"===e.id),e=a.state(e,e-a.t0),a=e.cam,o=ze.camera(a.pos,a.target,a.roll||0,a.fov||60,D/I),r=e.extra.uB,l=ze.timeline.FOLD_SEQ,a=I/100;F.textAlign="center",F.shadowColor="rgba(0,0,0,0.8)",F.shadowBlur=.5*a;let c="";for(let e=0;e<l.length;e++){var n=[r[4*e],r[4*e+1]+.2,r[4*e+2]],i=ze.v3.sub(n,o.pos),i=ze.v3.dot(i,o.fwd);i<.3||(n=ze.project(o,n,D/I),i=I/(2*i*o.tanHalf),F.globalAlpha=t,F.font=(.17*i).toFixed(1)+"px "+R,F.fillStyle="rgba(210,235,255,0.9)",F.fillText(l[e],n[0]*D,(1-n[1])*I),e%9==0&&(c+=Math.round(n[0]*D)+","+Math.round(n[1]*I)+";"))}return F.shadowBlur=0,F.textAlign="left",F.globalAlpha=1,c+t.toFixed(2)})(d));for(let[t,l,c,n,i]of h.eras)if(!(d<t||d>l)){var s=j(d,t,l,.25,.7),f=(d-t)/.8,p=Math.max(0,Math.floor(28*(d-t-.7)));u.push("e"+t+":"+Math.min(f,1).toFixed(2)+":"+Math.min(i.length,p)+s.toFixed(2)),F.globalAlpha=s,F.textAlign="right";let a=D-4.5*b,o=12.5*b,e=(F.font=`italic ${2.1*b}px `+R,F.letterSpacing=.1*b+"px",[i]);F.measureText(i).width>D-9*b&&(s=[...i].map((e,t)=>" "===e?t:-1).filter(e=>0<e).reduce((e,t)=>Math.abs(t-i.length/2)<Math.abs(e-i.length/2)?t:e),e=[i.slice(0,s),i.slice(s+1)]);var s=Math.min(Math.max(...e.map(e=>F.measureText(e).width),26*b),D-9*b)+10*b,v=a-s/2+5*b,m=o+b,x=F.createRadialGradient(v,m,0,v,m,s/2);x.addColorStop(0,"rgba(0,0,0,0.58)"),x.addColorStop(.55,"rgba(0,0,0,0.42)"),x.addColorStop(1,"rgba(0,0,0,0)"),F.save(),F.translate(v,m),F.scale(1,15*b/(s/2)),F.translate(-v,-m),F.fillStyle=x,F.fillRect(v-s/2,m-s/2,s,s),F.restore(),F.letterSpacing="0px",F.shadowColor="rgba(0,0,0,0.85)",F.shadowBlur=1.5*b,F.font=`900 ${8.5*b}px `+C,F.fillStyle="#ffffff",F.fillText(G(B(c,1.3*f,t),.3*b),a,o),F.font=2.6*b+"px "+R,F.fillStyle=S.agi,F.fillText(G(B(n,f,t+3),.6*b),a,o+4.4*b),F.font=`italic ${2.1*b}px `+R,F.fillStyle="#e6f2ff";let r=p;e.forEach((e,t)=>{F.fillText(G(e.slice(0,Math.max(0,r)),.1*b),a,o+(8.2+3.1*t)*b),r-=e.length+1}),"ALPHAGO"===n&&d>h.go.win&&(x=h.go.result,v=Math.min(x.length,Math.floor(28*(d-h.go.win))),u.push("gr"+v),F.fillStyle=S.agi,F.fillText(G(x.slice(0,v),.1*b),a,o+(8.2+3.1*e.length+.3)*b)),F.shadowBlur=0,F.textAlign="left",F.letterSpacing="0px",F.globalAlpha=1}var c,n,i,g,y,w,M,k,P,z=h.log,T=h.selfLog;if(d>z[0][0]-.2&&d<h.logTo){let n=j(d,z[0][0]-.2,h.logTo,.3,.8),a=z.filter(e=>d>=e[0]);for(let e=0,t=T.from;t<=T.to&&t<=d;e++,t=T.from+.5*e)a.push([t,null,e]);let i=a.slice(-15),e=a.length?d-a[a.length-1][0]:0,x=(u.push("L"+a.length+":"+n.toFixed(2)+":"+Math.min(30,Math.floor(30*e))),2.3*b),s=1.5*x,g=5.5*b*(D/I)*.9,f=19*b,t=F.createLinearGradient(0,0,g+84*b,0);t.addColorStop(0,"rgba(0,0,0,0.6)"),t.addColorStop(.6,"rgba(0,0,0,0.35)"),t.addColorStop(1,"rgba(0,0,0,0)"),F.globalAlpha=n,F.fillStyle=t,F.fillRect(0,0,g+84*b,I),F.font=1.5*b+"px "+R,F.fillStyle=S.dim,F.fillText(G("MODEL LINEAGE",.3*b),g,f-1.3*b),F.letterSpacing="0px",i.forEach(([e,t,o,a],r)=>{let l=d-e,m=f+(r+1)*s,c=Math.exp(3*-l);if(F.globalAlpha=n*(.3+.7*Math.min(1,(r+16-i.length)/10)),null===t){let p=o,e=5+Math.floor(6*O(3.7*p)),t=10+Math.floor(9*O(5.1*p)),v=Math.floor(60*l),a=(e,t,a,o)=>{F.strokeStyle=a;var r=3*p+t,l=Math.min(e,v),c=g+t*b,n=m,a=x,t=o,i=.62*a,s=.72*a;F.beginPath();for(let e=0;e<l;e++){var f=31.7*r+7.13*e,d=c+e*i*1.05;for(let e=0,t=2+Math.floor(3*O(f));e<t;e++){var u=Math.floor(9*O(f+3.1*e)),h=Math.floor(9*O(f+5.3*e+1));F.moveTo(d+u%3*i*.4,n-s+Math.floor(u/3)*s*.5),F.lineTo(d+h%3*i*.4,n-s+Math.floor(h/3)*s*.5)}}F.lineWidth=t,F.lineCap="round",F.stroke(),v-=e};a(4,0,S.dim,.08*x),a(e,8,.3<c?"#ffffff":S.agi,.13*x),a(t,38,S.dim,.08*x)}else F.font=x+"px "+R,F.fillStyle=S.dim,F.fillText(t,g,m),F.font=`bold ${x}px `+R,F.fillStyle=.3<c?"#ffffff":S.agi,F.fillText(B(o,4*l,10*e),g+8*b,m),F.font=x+"px "+R,F.fillStyle=S.dim,F.fillText(B(a,3*l,20*e),g+38*b,m)}),F.globalAlpha=1}for([c,n,i,g]of h.quotes)d<c||n<d||(k=(w="huge"===g)?1-ze.smooth(c+.3,n,d):j(d,c,n,.5,.9),y=w?i.length:Math.min(i.length,Math.floor(16*(d-c))),u.push("q"+c+":"+y+":"+k.toFixed(2)),F.globalAlpha=k,F.textAlign="center",w?(F.font=`900 ${24*b}px `+C,F.fillStyle="#ffffff",F.fillText(G(i,2*b),D/2,58*b)):(w=62*b,M=9*b,k=k,P=void 0,(P=F.createLinearGradient(0,w-M/2,0,w+M/2)).addColorStop(0,"rgba(0,0,0,0)"),P.addColorStop(.5,"rgba(0,0,0,0.55)"),P.addColorStop(1,"rgba(0,0,0,0)"),F.save(),F.globalAlpha=k,F.fillStyle=P,F.fillRect(0,w-M/2,D,M),F.restore(),F.font=4.2*b+"px "+R,F.fillStyle="#eaf7ff",F.shadowColor="rgba(0,0,0,0.9)",F.shadowBlur=1.2*b,F.fillText(G(i.slice(0,y),.25*b),D/2,63.5*b),F.shadowBlur=0),F.textAlign="left",F.letterSpacing="0px",F.globalAlpha=1);var A,[z,E]=h.title,q=(z<d&&d<E&&(A=j(d,z,E,.3,1.5),q=(d-z)/1.1,E=(d-z)/(E-z),u.push("t:"+Math.min(q,1.3).toFixed(2)+":"+A.toFixed(2)+":"+E.toFixed(3)),F.globalAlpha=A,F.textAlign="center",(z=F.createRadialGradient(D/2,52*b,0,D/2,52*b,34*b)).addColorStop(0,"rgba(0,0,0,0.5)"),z.addColorStop(.6,"rgba(0,0,0,0.3)"),z.addColorStop(1,"rgba(0,0,0,0)"),F.save(),F.globalAlpha=A,F.translate(D/2,52*b),F.scale(1.9,.6),F.translate(-D/2,-52*b),F.fillStyle=z,F.fillRect(D/2-34*b,18*b,68*b,68*b),F.restore(),F.globalAlpha=A,F.save(),F.translate(D/2,54*b),F.scale(1+.06*E,1+.06*E),F.shadowColor="rgba(0,0,0,0.8)",F.shadowBlur=2*b,F.font=`900 ${10.5*b}px `+C,F.fillStyle="#ffffff",F.fillText(G(_("BIRTH & DEATH",q,3),b*(.8+.5*E)),0,-4*b),F.font=2.9*b+"px "+R,F.fillStyle="#bfe9ff",F.fillText(G(_("OF THE DIGITAL UNIVERSE",q-.25,9),b*(1.4+.4*E)),0,4*b),F.restore(),F.shadowBlur=0,F.textAlign="left",F.letterSpacing="0px",F.globalAlpha=1),d>=h.wordsFrom&&d<h.wordsFrom+2*h.words.length&&(z=Math.floor((d-h.wordsFrom)/2),(A=(d-h.wordsFrom)%2)<1.1)&&(q=1-ze.smooth(.6,1.1,A),E=1+.25*Math.exp(8*-A),u.push("w"+z+":"+q.toFixed(2)+":"+E.toFixed(3)),F.save(),F.globalAlpha=q,F.textAlign="center",F.translate(D/2,56*b),F.scale(E,E),F.font=`900 ${(9<h.words[z].length?11:16)*b}px `+C,F.fillStyle="#ffffff",F.shadowColor="rgba(0,0,0,0.85)",F.shadowBlur=2.5*b,F.fillText(G(h.words[z],1.2*b),0,0),F.restore(),F.letterSpacing="0px"),e.dev&&(A=`t ${d.toFixed(2)}  bar ${(d/2).toFixed(2)}  ${e.fps.toFixed(0)} fps  scale `+e.scale.toFixed(2),u.push("d"+A),F.font=1.5*b+"px "+R,F.fillStyle="#ff0",F.textAlign="right",F.fillText(A,D-2*b,I-2*b),F.textAlign="left"),u.join("|"));return t.dirty=q!==N,N=q,t},a.render=(e,t)=>(F.clearRect(0,0,D,I),a.draw(e,t))}{let d=ze.timeline={},x=ze.smooth,g=ze.mix,b=ze.v3,h=[0,0,0,0],p=()=>ze.audio.sync,v=(e,t,a)=>ze.envelope(e,t,a),y=(e,t,a,o)=>[e[0]+Math.sin(a)*Math.cos(o)*t,e[1]+Math.sin(o)*t,e[2]+Math.cos(a)*Math.cos(o)*t],w=e=>{e=43758.5453*Math.sin(91.345*e+47.853);return e-Math.floor(e)},O=(e,t)=>[(w(Math.floor(40*e))-.5)*t,(w(Math.floor(40*e)+5.1)-.5)*t,(w(Math.floor(40*e)+9.7)-.5)*t],s=e=>7*Math.sin(.021*e)+11*Math.sin(.0083*e+1.3),m=e=>{e=3.4*e+2;return[3+1.7*Math.sin(.05*e)+.6*Math.sin(.11*e+1),3+1.1*Math.sin(.07*e),e]},M=(d.FOLD_SEQ="MSPEELLKKAIELAKEALRLAGNPGDPELVKKALELLEKAIELLKEGKSDEEALKLAKEAIELLKKALEG",[[2,21],[26,45],[50,69]]),B=(()=>{let i=[],s=[],c=[];for(let e=0;e<70;e++){var t=.19*(e-34.5);i.push([t,.55*Math.sin(.8*t+.4)+.2*Math.sin(2.1*t),.6*Math.cos(.55*t)-.3])}let f=(e,t,a,o,r,l)=>{l=1.745*r+l;return b.add(b.add(e,b.mul(t,.15*(r-9.5))),b.add(b.mul(a,.23*Math.cos(l)),b.mul(o,.23*Math.sin(l))))};for(let e=0;e<70;e++)s.push(i[e].slice());M.forEach(([t,a],o)=>{var r=b.mul(b.add(i[t],i[a]),.5),l=b.norm(b.sub(i[a],i[t])),c=b.norm(b.cross(l,[0,1,.3])),n=b.cross(l,c);for(let e=0;e<=a-t;e++)s[t+e]=f(r,l,c,n,e,o)});for(let e=0;e<70;e++)c.push([0,0,0]);M.forEach(([t,a],o)=>{var e=Math.PI/2+2.094*o,r=[.58*Math.cos(e),0,.58*Math.sin(e)],l=1===o?-1:1;for(let e=0;e<=a-t;e++)c[t+e]=f(r,[0,l,0],[1,0,0],[0,0,l],e,.7*o)});var e=(t,a,o,r)=>{var l=t[a],c=t[o],e=b.mul(b.add(l,c),.5),n=b.norm([e[0],0,e[2]]);for(let e=a+1;e<o;e++){var i=(e-a)/(o-a),s=Math.sin(Math.PI*i);t[e]=b.add(b.add(b.mix(l,c,i),b.mul(n,.3*s)),[0,r*s,0])}};e(s,21,26,.25),e(s,45,50,-.25),e(c,21,26,.3),e(c,45,50,-.3);for(let e=0;e<2;e++)s[e]=b.add(s[2],b.sub(i[e],i[2])),c[e]=b.add(c[2],[.12*(2-e),-.2*(2-e),.08]);return{S0:i,S1:s,S2:c}})(),_=new Float32Array(280),r=(d.fold=t=>{let{S0:a,S1:o,S2:r}=B,l=ze.easeInOut(x(3.6,6.6,t)),c=[x(.9,2.9,t),x(1.5,3.5,t),x(2.1,4.1,t)].map(ze.easeInOut),n=0,i=0,s=0,f=[];for(let e=0;e<70;e++){var d=(a=>M.findIndex(([e,t])=>e<=a&&a<=t))(e),u=0<=d?c[d]:e<2?c[0]:e<26?(c[0]+c[1])/2:(c[1]+c[2])/2,d=0<=d?.3+.32*u+.36*l:e<2?.2+.25*l:.28+.12*u+.4*l,h=.06*(1-(d+=.06*(w(3.1*e)-.5)*l)),p=5*t+1.7*e,u=b.add(b.add(a[e],b.mul(b.sub(o[e],a[e]),u)),b.mul(b.sub(r[e],o[e]),l));u[0]+=Math.sin(p)*h,u[1]+=Math.sin(1.3*p+2)*h,u[2]+=Math.cos(.9*p)*h,f.push([u,d]),_.set([u[0],u[1],u[2],d],4*e),n+=u[0],i+=u[1],s+=u[2]}var e,v=[n/70,i/70,s/70];let m=0;for([e]of f)m=Math.max(m,b.len(b.sub(e,v)));return{buf:_,res:f,fold:l,bound:[...v,m+.2]}},d.convRead=e=>{let t=ze.script.convAnswers,a=0;for(;a+1<t.length&&e>=t[a+1]-.2;)a++;var o=a?.2:7*ze.audio.BEAT/4;return{i:a,front:7*(e-t[a]+o)/o,perLayer:o/7,age:e-t[a]}},d.convScan=e=>{e=.14*Math.max(0,e-48.25)/.4;return e>=1-Math.pow(.86,22)?484:Math.floor(Math.log(1-e)/Math.log(.86)*22)},{}),j=e=>r[e]||(r[e]=(t=>{var a=new Float32Array(84);for(let e=0;e<1e3;e++)a[Math.floor(e/12)]+=t[e]*Math.pow(4,e%12);return{mz:a}})(ze.c64Screen(e))),G=4.68*Math.tan(25*Math.PI/180),k={DC:ie=m(22.15),dn:se=b.norm(b.sub(m(21.2),ie)),ex:fe=b.norm(b.cross(se,Math.abs(se[2])<.9?[0,0,1]:[1,0,0])),ey:b.cross(se,fe),E:b.add(ie,b.mul(se,2.6))},l=e=>[-e[0],e[1],-e[2]],Y=e=>l(b.sub(e,k.DC)),U=b.add(k.DC,l([0,0,6])),H=e=>{let t,a,o,r,l,c,n=e-228,i=18.6,s=e=>{var t=m(e),a=m(e+1.2),o=m(e+.05);return{pos:t,look:[a[0],a[1]+1.6*Math.sin(.19*e+.6),a[2]+3],roll:.18*Math.sin(.11*e)-2*(o[0]-t[0]-(a[0]-o[0])/23)}},f,d;d=n<i?(t=s(n),f=t.pos,t.roll):(r=(o=(a=ze.clamp((n-i)/4,0,1))*a)*a,l=m(i),c=b.mul(b.sub(m(.01+i),m(18.59)),200),f=b.add(b.add(b.mul(l,2*r-3*o+1),b.mul(c,r-2*o+a)),b.mul(k.E,-2*r+3*o)),s(i).roll*(1-ze.easeInOut(a)));var e=ze.easeInOut(x(15.5,20.5,n)),u=ze.easeInOut(x(22.6,26.9,n)),e=b.mix(s(Math.min(n,i)).look,k.DC,e);return{pos:b.mix(f,U,u),target:b.mix(e,k.DC,u),roll:d,fov:g(72,50,u)}},X=(()=>{for(let e=0;e<12;e+=.01){var t=ze.easeInOut(x(1,10,e));if(6.5<=g(g(4.6,19,t),24,ze.easeInOut(x(15.5,20,e))))return b.norm(y([0,0,0],1,.1*e-.6,.16+.1*Math.sin(.2*e)))}return[0,0,1]})(),n=e=>2*(e-5),i=-.44,f=e=>ze.script.lstm.read0+e*ze.script.lstm.dt,u=new Float32Array(44),P=new Float32Array(16),z={pos:[0,2.4,13.4],target:[0,-.1,0]},T=(d.lstmWordAt=e=>[n(e),-1.3,.55],d.lstmOutAt=()=>[n(ze.script.lstm.tokens.length-1)+.44,1.66,0],d.lstmParts=()=>[["forget",[i-10,.95,0]],["input",[-10,.95,0]],["output",[-9.56,.95,0]],["cell state",[-11.25,.7,0]],["hidden state",[-11.25,-.62,0]]],(()=>{let o={},r=(e,t,a)=>{o[e]={p:t,g:a}},l=(e,t)=>b.add(e,t),e=[.2,2,.7],t=[3,.3,-.6],a=[-.8,-.6,1.4],c=[1.7,1.5,.2],n=[-7,2,-6];return r("man",n,0),r("woman",l(n,e),0),r("king",l(n,t),0),r("queen",l(l(n,t),e),0),r("boy",l(n,a),0),r("girl",l(l(n,a),e),0),r("prince",l(l(n,t),a),0),r("princess",l(l(l(n,t),a),e),0),[["france",[4.6,3.6,-10]],["italy",[5.4,1.9,-11.2]],["germany",[3.9,5,-11.4]],["japan",[6.6,.8,-9.2]],["turkey",[3.4,2.1,-9]]].forEach(([e,t],a)=>{r(e,t,1),r(["paris","rome","berlin","tokyo","ankara"][a],l(t,c),1)}),r("land",[8.8,4.5,-7.6],1),r("sea",[9.6,3,-8.4],1),r("river",[9,5.6,-8.8],1),[["fifty",[-9.5,-.8,-11]],["years",[-8.2,.4,-12.4]],["one",[-10.4,-1.6,-10.6]],["two",[-9.8,-2.2,-11.8]],["hundred",[-8.6,-1.6,-10.2]],["days",[-7.6,1.2,-11.6]],["hours",[-7.2,0,-13]]].forEach(([e,t])=>r(e,t,3)),[["ruled",[8,-1.8,-3.4]],["said",[9.2,-1,-4.6]],["walked",[8.4,-.4,-5.4]],["wrote",[9.8,-2.2,-3.8]],["read",[7.4,-2.6,-4.4]]].forEach(([e,t])=>r(e,t,4)),[["the",[-.4,-3,-1.6]],["who",[.9,-2.6,-2.6]],["that",[-1.3,-3.5,-3]],["for",[.3,-3.9,-2]],["and",[1.4,-3.4,-1.2]],["of",[-1,-2.4,-2.2]]].forEach(([e,t])=>r(e,t,5)),[["cat",[-3,6,-12.5]],["dog",[-2.2,6.6,-13.2]],["horse",[-1.6,7.2,-12]],["lion",[-3.4,7.4,-13.6]]].forEach(([e,t])=>r(e,t,6)),ze.script.embed.things.forEach(e=>r(e,[2.5,-1,-16.6],2)),o})()),A=(d.embedWords=Object.keys(T),d.embedClusters=[[-5.5,3,-5.6,1.6],[6.2,3.8,-10.2,1.9],[2.5,-1,-16.6,1.5],[-9,-.5,-11.5,1.6],[8.5,-1.5,-4,1.5],[0,-3.2,-2.2,1.3],[-2.5,6.6,-12.8,1.6],[.5,1.5,-9,8.5]],[[80,z.pos,z.target],[82.4,[-3.2,3.9,2.6],[-5.4,3.1,-5.9]],[86.6,[-2.6,4.1,2.2],[-5.3,3.1,-5.9]],[88.4,[3.1,4.3,-2],[5.9,3.7,-10.2]],[91.6,[3.5,4,-2.4],[6,3.6,-10.3]],[95.6,[2.4,-.2,-10.4],[2.5,-.9,-16.6]],[96.5,[2.4,-.25,-10.6],[2.5,-.9,-16.6]]]),$=e=>{let t=0;for(;t<A.length-2&&e>A[t+1][0];)t++;var[a,o,r]=A[t],[l,c,n]=A[t+1],a=ze.easeInOut(x(a,l,e));return{pos:b.mix(o,c,a),target:b.mix(r,n,a),fov:50}},E=null,W=()=>{if(E)return E;let e=d.scenes.find(e=>"yolo"===e.id).state(96,0).cam,o=ze.camera(e.pos,e.target,e.roll||0,e.fov||60,1),t=$(96),r=ze.camera(t.pos,t.target,0,t.fov,1),a=1.22*r.tanHalf/o.tanHalf,l=new Float32Array(9),c=new Float32Array(32),n={},i={},s={};for(let t=0;t<3;t++)for(let e=0;e<3;e++)l[3*t+e]=(r.right[e]*o.right[t]+r.up[e]*o.up[t])*a+r.fwd[e]*o.fwd[t]*1.22;let f=e=>{let a=b.sub(e,o.pos);return r.pos.map((e,t)=>e+l[t]*a[0]+l[3+t]*a[1]+l[6+t]*a[2])};return ze.shaders.yoloObjs.forEach((e,t)=>{n[e.cls]=f(e.c),i[e.cls]=t,c.set([...e.c,e.e[0]],4*t)}),c.set(o.pos,28),ze.shaders.yoloObjs.map(e=>[ze.project(o,e.c,1)[0],e.cls]).sort((e,t)=>e[0]-t[0]).forEach(([,e],t)=>{s[e]=93.625+.125*t}),E={pos:n,idx:i,litAt:s,M:l,Mo:[...f([0,0,0]),a],Y:c}},Q=o=>{let r=ze.script.embed,e=ze.script.lstm.tokens,t=W(),l={},c={},a={},n=[];for(var i of d.embedWords)l[i]=2===T[i].g?t.pos[i]:T[i].p,c[i]=x(79.8,81.2,o),2===T[i].g&&(a[i]=x(t.litAt[i]-.05,t.litAt[i]+.15,o));let s=e=>r.fly[0]+.06*e+1.3;e.forEach((e,t)=>{var a=ze.easeInOut(x(r.fly[0]+.06*t,s(t),o));n.push({w:e,p:b.mix(d.lstmWordAt(t),l[e],a),a:1-x(s(t),s(t)+.15,o)})});for(let a of new Set(e))c[a]=x(Math.min(...e.map((e,t)=>e===a?s(t):1e9))-.1,Math.min(...e.map((e,t)=>e===a?s(t):1e9))+.1,o);return{pos:l,vis:c,lit:a,litAt:t.litAt,tok:n,group:e=>T[e].g}},V=(d.embedState=Q,e=>{var t=ze.script.attention,a=ze.attnLayout,o=t.tokens.length,r=e-120,e=ze.clamp(t.prompt-1+(e-t.step0-t.land*t.dt)/t.dt,t.prompt-1,o-1),t=Math.floor(e),e=ze.easeInOut(e-t),t=t+1<o?g(a.x[t],a.x[t+1],e):a.x[o-1],e=ze.easeInOut(x(6.4,7.8,r)),o=b.mix([t-1.6,.55,0],[a.len/2,.5,0],e);return{pos:b.add(o,b.mix([.1*r-1.1,1.5,4.9-.06*r],[-.5,1.7,6.6],e)),target:o}}),t=[133,136],a=[142,144],o=(e,t,a,o,r)=>{var l=ze.clamp((r-e)/t,0,1);return a*Math.min(r-e,t)+(o-a)*t*(l*l*l-l*l*l*l/2)+o*Math.max(0,r-e-t)},K=.13*(t[0]-128),Z=K+o(t[0],t[1]-t[0],.13,.22,a[0]),c=e=>e<t[0]?.13*(e-128):e<a[0]?K+o(t[0],t[1]-t[0],.13,.22,e):Z+o(a[0],a[1]-a[0],.22,.13,e),q=[101.6,104.6],R=e=>{var t,a=x(q[0],q[1],e),o=(o=e,o=ze.easeInOut(x(96,104,o)),{c:[0,.25,0],tg:[0,.28,0],d:g(4.9,3.9,o),az:g(-.45,.35,o),el:g(.42,.34,o),fov:45}),e=(e=e,t=ze.easeInOut(x(104,112,e)),{c:[0,0,0],tg:[0,0,0],d:g(21,15,t),az:.55+.07*(e-104),el:g(.9,.62,t),fov:50});return{pos:y(b.mix(o.c,e.c,a),Math.exp(g(Math.log(o.d),Math.log(e.d),a)),g(o.az,e.az,a),g(o.el,e.el,a)),target:b.mix(o.tg,e.tg,a),fov:g(o.fov,e.fov,a),u:a}},J=102.25,ee=null,te=(d.yoloExit=r=>{if(!ee){let e=R(J),a=ze.camera(e.pos,e.target,0,e.fov,1);ee=ze.shaders.yoloObjs.map((e,t)=>[ze.project(a,e.c,1)[0],t]).sort((e,t)=>e[0]-t[0]).map(([,e])=>e)}let l=[],c=[],n=new Float32Array(28),i=new Float32Array(28);return ee.forEach((e,t)=>{l[e]=J+.125*t}),ze.shaders.yoloObjs.forEach((e,t)=>{var a=r-l[t],o=a-.5;c[t]=1-ze.easeIn(a/.32),n.set([c[t],x(-.06,.16,a),e.c[1]*(1-ze.easeIn((a-.3)/.2)),x(.1,.3,a)*(1-x(.44,.52,a))],4*t),0<o&&i.set([15*(1-Math.pow(1-Math.min(o/1.1,1),2)),Math.exp(1.6*-o)],4*t)}),{at:l,size:c,Yo:n,Yf:i}},[-.875,0,0]),C=(()=>{let n=new Int16Array(361).fill(-1),i=ze.script.go.moves.map((e,t)=>({x:e.charCodeAt(0)-97,y:e.charCodeAt(1)-97,black:t%2==0,cap:-1})),s=e=>{var t=e%19,a=[];return 0<t&&a.push(e-1),t<18&&a.push(e+1),19<=e&&a.push(e-19),e<342&&a.push(e+19),a};return i.forEach((e,t)=>{var a,o=19*e.y+e.x;n[o]=t;for(a of s(o))if(0<=n[a]&&i[n[a]].black!==e.black){var r=(e=>{let t=i[n[e]].black,a=new Set([e]),o=[e],r=!1;for(;o.length;){var l,c=o.pop();for(l of s(c))n[l]<0?r=!0:i[n[l]].black!==t||a.has(l)||(a.add(l),o.push(l))}return{stones:[...a],lib:r}})(a);if(!r.lib)for(var l of r.stones)i[n[l]].cap=t,n[l]=-1}}),i})(),S=[C[36].x-9,C[36].y-9],L=(d.goCaptures=Object.entries(C.reduce((e,t)=>(0<=t.cap&&(e[t.cap+1]=(e[t.cap+1]||0)+1),e),{})).map(([e,t])=>[+e,t]),new Float32Array(1444)),ae=new Float32Array(16),oe=new Float32Array(16),F=null,D=null,I=null,re=ze.script.c64,N=re.off,le=(d.crtOff=e=>{var t=ze.clamp((e-N)/.13,0,1),a=ze.clamp((e-N-.17)/.28,0,1);return{y:Math.pow(1-t,2.2),x:Math.pow(1-a,1.6),white:x(N-.03,N+.1,e),picture:e<N+.17}},{pos:[0,0,1],target:[0,0,0]}),e=(d.scenes=[{id:"c64",t0:0,t1:16,fs:"crt",state:e=>({cam:le,...e>N-.1?(e=>{var t,a=d.crtOff(e),o=x(N+.3,N+.45,e);let r=0;for(t of re.pulses)t<=e&&(r+=Math.exp(9*-(e-t)));var l=Math.min(10,.06/Math.max(a.y,.001))*a.white,c=10+15*(1-a.x),n=(1-.6*x(N+.45,N+.95,e))*(1+2.5*Math.pow(x(N+.95,15.9,e),2))*(1+1.2*r),l=e<N+.17?l:g(c,25*n,o);return{P0:[a.x,a.y,l,o],P1:[0,0,3+11*x(N+.9,15.9,e)+4*r,.6*x(15.2,15.9,e)+.3*r]}})(e):{}})},{id:"bang",t0:16,t1:32,fs:"bang",ps:"bang",count:1<<18,state(e,t){var a=x(12.2,15.8,t),o=(.3+11*(1-Math.exp(.55*-t))+.25*t)*(1-.95*a),r=Math.exp(.33*-t),l=g(27,15,ze.easeInOut(x(0,13,t)))-6*a,c=.3+.03*t;return{cam:{pos:b.add(y([0,0,0],l,c,.08+.006*t),O(e,.6*Math.exp(1.5*-t))),target:[0,0,0],fov:55},P0:[o,r,g(1.3,.7,x(0,10,t))*(1-a),x(2,10,t)],P1:[9*t,3*Math.exp(.9*-t),x(3,12,t)*(1-a),.6*Math.exp(2.5*-t)+.08*Math.pow(a,3)],P2:[a,0,0,0],Q0:[1.15*o,r,(1.4-.5*x(0,8,t))*(1-.85*a),.35*x(0,8,t)],Q1:[a,0,0,0],trail:g(.9,.55,x(0,6,t))+.15*a}}},{id:"neuron",t0:32,t1:48,fs:"neuron",state(e,t){var a=ze.easeInOut(x(7.6,9.4,t)),o=g(3.4,8.2,a),r=.09*t-.5,l=b.mix(te,[0,0,0],a);return{cam:{pos:y(l,o,r,.22+.05*Math.sin(.3*t)),target:l,fov:50},P0:[a,2*(e-32),x(11,12,t),v(p().fire,e,6)],P1:[0,0,0,1],trail:.3*(1-.85*Math.sin(Math.PI*x(7.4,9.6,t)))}}},{id:"conv",t0:48,t1:64,fs:"conv",state(t,e){var a=ze.easeInOut(x(2.4,5.4,e)),o=ze.easeInOut(x(5,9,e)),r=ze.easeInOut(x(9.5,14.6,e)),l=b.mix(b.mix(b.mix([-3,.75,-2.5],[-6,1.7,-4.6],a),[-5,1.1,-3],o),[-4.4,.8,1.2],r),a=b.mix(b.mix(b.mix([.25,.15,.8],[-.2,0,3.4],a),[-.3,.05,4.1],o),[-1,.1,6.4],r),l=b.add(l,b.mul(b.norm(b.sub([-1,.1,6.4],[-4.4,.8,1.2])),3.4*ze.easeIn(x(14.2,16,e)))),o=d.convRead(t);let c=1;for(let e=2;e<8;e++)c+=x(49.5+.25*(e-2),49.7+.25*(e-2),t);return{cam:{pos:l,target:a,fov:50},P0:[c,d.convScan(t),v(p().kick,t,7),x(48.05,48.3,t)*(1-x(50.9,51.05,t))],P1:[o.i,o.i?o.front:Math.max(1,o.front),o.age,0],P2:[o.front,o.perLayer,0,0],extra:{uNode:ze.shaders.convNodes(o.i)}}}},{id:"lstm",t0:64,t1:80,fs:"lstm",state(e,t){var a,o,r,l=(l=>{let e=ze.script.lstm,c=(t=>{let e,a=ze.script.lstm.tokens.length,o=-1;for(let e=0;e<a;e++)t>=f(e)&&(o=e);return o<0?i-10:(e=1-Math.pow(1-ze.clamp((t-f(o)-.3)/.65,0,1),2),g(n(o)+i,o===a-1?n(o)+.44:n(o+1)+i,e))})(l);u.fill(0),P.fill(0),e.tokens.forEach((e,t)=>{u[4*t]=l-f(t)}),e.lanes.forEach(([e,t,a],o)=>{var r;u[4*e+1]=a,0<=t&&(u[4*t+2]=1),l<f(e)+.3||(r=0<=t&&l>=f(t)+.3,P.set([n(e),r?n(t)+i:Math.max(n(e),c),a,r?l-f(t)-.3:-1],4*o))});var t=e.tokens.length;return u[4*(t-1)+3]=x(e.out,e.out+.35,l),{front:c,hfront:(t=>{let a=ze.script.lstm.tokens.length,o=g(-10.75,-10,x(f(0),f(0)+.2,t));for(let e=0;e<a;e++){var r=f(e),l=e===a-1;r+.55<t&&(o=g(n(e),l?n(e)+.44:n(e+1),ze.easeInOut(x(r+.55,l?r+.65:f(e+1)+.2,t))))}return o})(l),cell:u,lane:P}})(e),c=(c=e,a=(r=ze.script.lstm).tokens.length-1,a={pos:[(o=2*((o=(c-r.read0)/r.dt)<-1.2?-.6:o<0?(1.2+o)*(1.2+o)/2.4-.6:o<a?o:o<.8+a?o-(o-a)*(o-a)/1.6:.4+a)-10)-2.3,1.05,5.4],target:[.9+o,.05+.4*ze.easeInOut(x(r.out-.7,r.out+.3,c)),0]},o=ze.easeOut(x(63.6,65.4,c)),r=x(r.out+.4,r.out+3.5,c),c={pos:[-14.6,1.5,7.4],target:[-7.6,.1,0]},{pos:b.mix(b.mix(c.pos,a.pos,o),z.pos,r),target:b.mix(b.mix(c.target,a.target,o),z.target,r),fast:Math.sin(Math.PI*r)});return{cam:{pos:c.pos,target:c.target,fov:50},P0:[l.front,l.hfront,e-ze.script.lstm.out,0],extra:{uCell:l.cell,uLane:l.lane},trail:.15*(1-c.fast)}}},{id:"embed",t0:80,t1:96,fs:"embed",ps:"embed",count:94208,state(r,e){let t=$(r),i=Q(r),a=W(),o=new Float32Array(256),l=(i.tok.forEach((e,t)=>o.set([...e.p,7+.99*e.a*x(80.15,80.5,r)],4*t)),d.embedWords.forEach((e,t)=>o.set([...i.pos[e],0<i.lit[e]?8+a.idx[e]+.99*i.lit[e]:T[e].g+.99*i.vis[e]],4*(11+t))),new Float32Array(40)),c=new Float32Array(40),n=ze.script.embed,s=0,f=(e,t,a,o)=>{10<=s||(l.set([...e,ze.easeInOut(x(a,a+.5,r))],4*s),c.set([...t,o],4*s),s++)};return n.analogies.forEach(([e,t,a,o,r],l)=>{var c=i.pos,n=0===l?0:2;f(c[e],c[t],r,n),f(c[a],b.add(c[a],b.sub(c[t],c[e])),r+1,n),0===l&&(f(c[e],c[a],r+2.5,1),f(c[t],c[o],r+2.5,1))}),n.more.forEach(([e,t,a])=>f(i.pos[e],i.pos[t],a,2)),{cam:t,P0:[x(79.7,80.9,r),0,0,0],Q0:[x(79.7,81.1,r),x(94.8,95.7,r),0,0],Q1:[ze.clamp((r-94.75)/.85,0,1),x(95.1,95.65,r),0,0],extra:{uW:o,uK:new Float32Array(d.embedClusters.flat()),uA0:l,uA1:c,uM:a.M,uMo:a.Mo,uY:a.Y},trail:.1}}},{id:"yolo",t0:96,t1:104,fs:"yolo",state(e,t){var a=R(e),o=d.yoloExit(e);return{cam:{pos:a.pos,target:a.target,fov:a.fov},P0:[608+.5*t,x(102.9,103.9,e),g(.09,.025,a.u),g(20,60,a.u)],P1:[e>J-.1?1:0,0,0,0],extra:{uYo:o.Yo,uYf:o.Yf}}}},{id:"go",t0:104,t1:120,fs:"go",state(e,t){let a,o=ze.script.go,r=o.land-104,l=o.win-104,c=ze.easeInOut(x(0,8,t)),n=ze.easeInOut(x(4.2,.4+r,t))*(1-ze.easeInOut(x(7.6,10,t))),i=ze.easeInOut(x(7.6,10.6,t)),s=ze.easeInOut(x(14.6,16,t)),f=V(120),{top:d,pieces:u}=(r=>{let l=ze.script.go,h=ze.shaders.goShards,p=h.pieces.length,c=[],n=(D||(D=new Float32Array(16*p),I=new Float32Array(16*p)),L.fill(0),ae.fill(0),oe.fill(0),D.fill(0),I.fill(0),0),v=0;return C.forEach((e,t)=>{var a,o=r-l.at(t+1);(36===t?r<l.land-.6:o<-.3)||(0<=(a=0<=e.cap?r-l.at(e.cap+1):-1)?a<.95&&c.length<4&&c.push([e,t,a]):(L.set([e.black?1:2,o,0,t+1],4*(19*e.y+e.x)),36!==t&&o<0&&(a=1+o/.3,n=Math.max(n,1.6*(1-a*a)))))}),c.forEach(([a,e,r],l)=>{let t=2*w(7.31*e)*Math.PI,c=h.size(r),n=0,i=0,s=0;h.pieces.forEach((e,t)=>{var{pos:a,q:o}=h.at(e,r),e=e.reach*c;D.set(a,4*(l*p+t)),I.set(o,4*(l*p+t)),n=Math.max(n,.205+a[1]+e),i=Math.max(i,Math.hypot(...a)+e),s=Math.max(s,Math.hypot(a[0],a[2])+e)}),ae.set([a.x-9,a.y-9,r,a.black?i:-i],4*l),oe.set([n,c,Math.cos(t),Math.sin(t)],4*l),v=Math.max(v,n);var o=s+.45,f=Math.ceil(o);for(let t=Math.max(0,a.y-f);t<=Math.min(18,a.y+f);t++)for(let e=Math.max(0,a.x-f);e<=Math.min(18,a.x+f);e++){var d=Math.max(Math.abs(e-a.x)-.5,0),u=Math.max(Math.abs(t-a.y)-.5,0);d*d+u*u<=o*o&&(L[4*(19*t+e)+2]+=1<<l)}}),F&&F.gl===ze.gl.gl||(F={gl:ze.gl.gl,tex:ze.gl.floatTexture(19,19)}),ze.gl.setFloat(F.tex,19,19,L),{top:n,pieces:c.length?v-.41:0}})(e),h=b.mix([0,0,0],[.5*S[0],0,.5*S[1]],n),p=y(h,g(g(21,15,c),19.5,i),.55+.07*t,g(g(.9,.62,c),.98,i)),v=h,m=50;return e<q[1]&&(a=R(e),p=a.pos,v=a.target,m=a.fov),{cam:{pos:b.mix(p,f.pos,s),target:b.mix(v,f.target,s),fov:m},P0:[0,t<r-.6?0:t<r?.25*(t-r+.6)/.6:.25+.75*x(r,2+r,t),x(.5+r,1.8+r,t)*(1+.8*x(l,.6+l,t)),0],P1:[S[0],S[1],d,u],extra:{uGo:F.tex,uSh:ae,uShE:oe,uPc:D,uPq:I}}}},{id:"attention",t0:120,t1:128,fs:"attn",state(e,t){let a=ze.script.attention,o=ze.attnLayout,r=ze.attnState(e),{pos:l,target:c}=(a.tokens.length,V(e)),n=new Float32Array(44),i=r.q;for(let a=0;a<4;a++)ze.attnWeights(i,a).forEach((e,t)=>{n[4*t+a]=e});var e=new Float32Array(12),s=new Float32Array(12),f=(e.set(o.x),s.set(o.w),0<=r.now?x(.12,r.LP-.05,r.p)*(1-x(r.LP-.05,r.LP+.05,r.p)):0);return{cam:{pos:l,target:c,fov:50},P0:[i,r.n,r.think,f],P1:[0<=r.land?1-r.le:0,0,0,0],extra:{uTX:e,uTW:s,uW:n},trail:.1}}},{id:"fold",t0:128,t1:136,fs:"fold",state(e,t){var a=d.fold(t),o=ze.easeInOut(x(6.6,8,t)),r=g(g(10.05,4.9,ze.easeInOut(x(3.2,7.6,t))),7.2,o),e=-.075+c(e),t=g(.25-.09*x(0,3,t)+.12*x(3,8,t),.28,o),o=b.mix([0,-.1,0],[0,.1,0],o);return{cam:{pos:y(o,r,e,t),target:o,fov:50},P0:[a.fold,0,0,0],P1:a.bound,extra:{uB:a.buf},trail:.15}}},{id:"vortex",t0:136,t1:144,fs:"space",ps:"vortex",count:1<<18,state(e,t){var a=ze.easeInOut(x(6,8,t)),o=g(g(7.5,5.2,ze.easeInOut(x(0,8,t))),5.4+.25*(8-t),a),r=g(.28+.1*Math.sin(.3*t),.32+.03*(t-8),a),e=y([0,0,0],o,.5+c(e)-c(144),r),r=b.norm(b.mul(e,-1)),r=b.norm(b.cross(r,[0,1,0]));return{cam:{pos:e,target:b.mix([0,.1,0],b.mul(r,-.4*o),a),fov:g(50,55,a),roll:.15*x(0,1.5,t)*(1-a)},P0:[.05,.25,.08,0],P1:[.1,.05,.25,0],P2:[.02,.1,.3,0],P3:h,Q0:[x(-.6,2.8,t),1,1+.05*t,x(6.1,7.9,t)],trail:.35*(1-.7*a)}}},{id:"mind",t0:144,t1:160,fs:"mind",state(e,t){var a,o=ze.script.log,r=ze.script.selfLog;let l=0,c=-1e9;for(a of o)e>=a[0]&&(l++,c=a[0]);e>=r.from&&(c=r.from+.5*Math.floor(Math.min(e-r.from,r.to-r.from)/.5));var r=x(0,.35,e-c),n=x(154.5,157.5,e),i=x(157.4,159.6,e),r=3.7*Math.pow(Math.max(0,l-1+r)/(o.length-1),.85)+.45*n,o=Math.exp(5*-(e-c)),s=g(g(5.4,4.9,ze.easeOut(x(0,6,t))),4.1,ze.easeInOut(x(6,15,t))),f=.5+.13*t+.6*n,d=.32+.15*Math.sin(.2*t),f=y([0,0,0],s,f,d),d=b.norm(b.mul(f,-1)),d=b.norm(b.cross(d,[0,1,0]));return{cam:{pos:f,target:b.mul(d,-.4*s),fov:55},P0:[.35*t,n,i,0],P2:[r,o,0,0]}}},{id:"fusion",t0:160,t1:168,fs:"fusion",state(e,t){var a=ze.easeInOut(x(2.4,5.6,t)),o=ze.easeInOut(x(5,6.8,t)),r=g(g(12,6.4,a),4,o),a=g(g(4.8,.45,a),.3,o),l=Math.PI/2+.1*(t-6.1)+.9*ze.easeIn(x(6.1,8,t)),a=[r*Math.cos(l),a,r*Math.sin(l)],r=.6+l,l=[3.3*Math.cos(r),0,3.3*Math.sin(r)],r=x(.3,2.2,t);return{cam:{pos:a,target:b.mix([0,-.3,0],l,ze.easeInOut(x(4.2,7,t))),fov:g(48,64,o),roll:-.12*o},P0:[r,1.3*t,v(p().kick,e,8)*r,0],god:{pos:[0,0,0],amt:.25*r*(1-o),thr:1.5}}}},{id:"power",t0:168,t1:184,fs:"earth",ps:"swarm",count:65536,state(e,t){let a=ze.easeInOut(x(0,13.5,t)),o=ze.easeIn(x(13,16,t)),r=ze.easeInOut(x(0,3.2,t)),l=.9+.06*t+.25*o,c=.25-.12*a-.1*o,n=y([0,0,0],g(g(3.7,2.4,a),1.03,o),l,c);var i,s,f,d,e=.015*e+2,u=[(u=b.norm([.3,.5,.8]))[0]*Math.cos(e)-u[2]*Math.sin(e),u[1],u[0]*Math.sin(e)+u[2]*Math.cos(e)],e=(r<1&&(n=b.mul((e=u,i=b.norm(n),s=r,d=ze.clamp(b.dot(e,i),-1,1),(d=Math.acos(d))<1e-4?i:(f=Math.sin(d),b.add(b.mul(e,Math.sin((1-s)*d)/f),b.mul(i,Math.sin(s*d)/f)))),g(1.14,b.len(n),r))),y([0,0,0],1,.6+l,c-.12));return{cam:{pos:n,target:b.mix(b.mix(u,[.15,.08,0],r),e,o),fov:g(g(62,45,r),75,o),roll:.3*o},P0:[x(1,12,t),.02*t,0,1-.7*x(3,9,t)],P1:[.9,.35,-.6,0],Q0:[1.2*t,.8*x(7,12,t),1,.42],extra:{uOcc:[1,0,0,0],uRing:h,uGap:[0,1,0,2]},trail:.2}}},{id:"drop",t0:184,t1:196,fs:"drop",state(e,t){var a=12+24*t+t*t*.9,o=ze.easeInOut(x(7.4,10.4,t)),r=ze.easeIn(x(10,12,t)),l=g(.62,6.5,o)+3*r,c=10+6*o+a,n=s(5+a)-2*s(a)+s(a-5),a=[s(a),l,a],i=[.06,.035+.05*r,1];return{cam:{pos:a,target:[s(c),g(.9*l,.55*l,o)+2.5*r,c],roll:.09*-n+.06*Math.sin(.9*t)*(1-o),fov:g(78,66,o)},P0:[v(p().kick,e,7),v(p().snare,e,6),x(11.4,12,t),Math.floor(t/2)],P1:[...i,0],trail:.3,god:{pos:b.add(a,b.mul(b.norm(i),400)),amt:.25+.25*o,thr:1.4}}}},{id:"dyson",t0:196,t1:216,fs:"dyson",ps:"swarm",count:1<<17,state(e,t){var a=ze.easeInOut(x(1,10,t)),o=g(g(4.6,19,a),24,ze.easeInOut(x(15.5,20,t))),r=.1*t-.6,l=.16+.1*Math.sin(.2*t),c=b.mul([Math.cos(r),.15,-Math.sin(r)],2.1*(1-a)),n=e=>{e/=.5,e=Math.floor(e)+x(0,.3,e-Math.floor(e));return ze.clamp((e-3)/22.6,0,1)},i=n(t),s=t+.35*Math.pow(Math.max(0,t-13),2),f=x(17,19.95,t),d=x(13,17,t),u=(1-.65*d)*(1-.5*f)+6*Math.pow(f,6);return{cam:{pos:b.add(y([0,0,0],o,r,l),O(e,.15*f)),target:c,fov:g(62,50,a)},P0:[i,s,u,d],P1:[.6*v(p().kick,e,6)*(1-x(13,16,t)),f,1-x(14.5,17.5,t),v(p().bass,e,7)*(1-f)],Q0:[1.5*s,(1-.8*d)*(1-f),1-.9*f,0],god:{pos:[0,0,0],amt:Math.min(u,2)*(.4+.6*x(.4,3,t))*(.65+.55*v(p().bass,e,7)),thr:2.4},P3:[n(t-.33),0,0,0],extra:{uOcc:[g(1.7*(1+.25*d),.02,Math.pow(f,.6)),1-.9*Math.pow(f,2.5),i,f*f*4],uRing:[s,0,0,1],uGap:[...X,g(.955,1.001,x(7.5,10.5,o))]}}}},{id:"hole",t0:216,t1:228,fs:"hole",ps:"dust",count:65536,state(e,t){return{cam:(c=t,a=ze.easeInOut(x(2.5,7.5,c)),o=ze.easeIn(x(7.5,12,c)),r=g(g(22,8.5,a),1.9,o)-.12*c*a,l=g(g(4.9,.32,a),.12,o),c=1.28-.06*c-.9*a-1.1*o,n=[Math.sin(c-.6)*r*.35,0,Math.cos(c-.6)*r*.35],{pos:[Math.sin(c)*r,l,Math.cos(c)*r],target:b.mix(b.mix([0,.4,0],n,a),[0,0,0],o),fov:g(g(50,62,a),80,o),roll:.15*a+.6*o}),P0:[x(2.5,6.5,t),0,0,1],P1:[0,Math.exp(1.2*-t),0,0],P2:[1-.6*x(5,9,t),ze.easeInOut(x(.5,6.5,t)),1.4*t,0],Q0:[x(2.5,5,t),0,0,1]};var a,o,r,l,c,n}},{id:"multi",t0:228,t1:250,fs:"multi",state(e,t){var a=H(e);return{cam:{pos:a.pos,target:a.target,roll:a.roll,fov:a.fov},P0:[0,0,0,0],P1:[0,0,0,0],P2:[v(p().agi,e,5),0,0,0],trail:.2,extra:{uDest:[...k.DC,3.4],uDestN:[...k.dn,1.6+2.5*x(19,21.8,t)]}}}},{id:"pix",t0:249.6,t1:256,fs:"galaxy",ps:"c64",count:64e3,state(e,t){var a=H(Math.min(e,254.9)),o=x(250.6,254.9,e),r=x(249.95,250.6,e);return{cam:{pos:Y(a.pos),target:Y(a.target),roll:-a.roll,fov:a.fov},P0:[1-x(250.05,250.7,e),4.1,.6*(1-x(252,255,e)),0],Q0:[t,G,0,r],extra:{uMz:j(256).mz,uGN:l(k.dn),uGX:l(k.ex),uGY:l(k.ey)},trail:.35*o*(1-x(253.3,254.9,e))}}},{id:"c64",t0:256,t1:266,state:()=>({cam:{pos:[0,0,1],target:[0,0,0]}})},{id:"pix",t0:266,t1:ze.script.END,fs:"space",ps:"c64",count:64e3,state(e){return{cam:{pos:[0,0,6],target:[0,0,0],fov:50},P0:h,P1:h,P2:h,P3:h,Q0:[99,G,ze.easeIn(x(266.05,268.25,e)),0],extra:{uMz:j(266).mz},trail:.5}}}],d.trans=[[32,.2,.45],[64,.4,.6],[80,.5,.6],[96,.4,.5],[104,.6,.05],[120,.5,.5],[128,.5,.6],[136,.6,.5],[144,.5,.5],[168,.3,.8]].map(([e,t,a])=>({at:e,pre:t,post:a})),[48]),ce=[[16,.55,2.2],...e.map(e=>[e,.35,4]),[184,1,2.2],[196,.9,1.6],[216,1,1.3],[228,1,1.4]],ne=[...e.map(e=>[e-.12,e+.14,.45]),[183.4,184.2,.5],[227.2,228.3,.9]];d.post=(o,e)=>{let t=0;for(var[a,r,l]of ce)a<=o&&(t=Math.max(t,r*Math.exp(-(o-a)*l)));var c,n,i,s=(e,t,a)=>o<t?Math.pow(x(e,t,o),3)*a:0;t=Math.max(t,s(15.85,16,.35),s(183,184,.6),s(226.8,228,.95),s(267.5,268.25,1));let f=0;for([c,n,i]of ne)c<o&&o<n&&(f=Math.max(f,i*(.6+.4*w(Math.floor(20*o)))));var s=Math.max(1-x(0,.5,o),x(158.6,159.95,o)*(1-x(160,160.8,o)),x(268.25,268.55,o)),d={exposure:1,bloom:.85,flash:t,flashCol:[1,.97,.94],fade:s,glitch:f,ca:.0016,grain:.035,scan:.06,vig:.55,pixel:1,bits:0,sat:1,crt:.12,tint:[1,1,1],lift:[0,.002,.006],contrast:1.04,godAmt:1};switch(e){case"c64":var u=o<100?x(N+.5,N+1.7,o):0;d.crt=g(.5,.12,u),d.scan=g(.2,.06,u),d.grain=g(.05,.035,u),d.vig=g(.8,.55,u),d.ca=.0035,d.bloom=o<100?g(.6,1.4,x(N-.05,N+.2,o)):.6;break;case"pix":u=o<261?x(253.3,255.9,o):1-x(266.4,267.8,o);d.crt=g(.2,.5,u),d.scan=g(.06,.2,u),d.vig=g(.55,.8,u),d.bloom=o<261?g(1.1,.9,x(250,251.5,o)):.9,d.ca=.003;break;case"bang":d.bloom=1,d.tint=[1.02,1,1.02];break;case"neuron":d.bloom=1.25;break;case"conv":d.bloom=1.1,d.ca=.002;break;case"lstm":d.bloom=1.15,d.vig=.6;break;case"embed":u=x(95.5,96.05,o);d.bloom=g(1,.7,u),d.vig=g(.6,.7,u),d.tint=[g(1,1.03,u),1,g(1,.97,u)],d.contrast=g(1.04,1.06,u);break;case"yolo":u=x(102.8,103.7,o);d.bloom=g(.7,.9,u),d.vig=.7,d.tint=[g(1.03,1,u),1,g(.97,1,u)],d.contrast=g(1.06,1.04,u);break;case"go":d.bloom=.9,d.vig=.7;break;case"attention":d.bloom=1.1,d.vig=.65;break;case"mind":d.tint=[.96,1,1.07],d.ca=.0025;break;case"vortex":d.bloom=g(1.3,1,x(142.5,144,o));break;case"power":d.bloom=.95,d.vig=.65;break;case"fold":d.bloom=.8,d.vig=.7,d.contrast=1.06;break;case"fusion":d.bloom=1.15,d.ca=.0022;break;case"drop":d.bloom=.95,d.ca=.0025,d.contrast=1.08;break;case"dyson":u=x(196.8,202,o);d.bloom=g(.6,1.1,u),d.ca=.002;break;case"hole":d.exposure=1-.82*x(219.8,222.8,o),d.ca=.002+.01*x(223.5,228,o);break;case"multi":d.bloom=1.1,d.ca=.003}return d}}ze.main=(j={})=>{let h=new URLSearchParams(location.search),y=h.has("dev"),G=h.has("noaudio"),p={god:!h.has("nogod"),bloom:!h.has("nobloom"),text:!h.has("notext"),ps:!h.has("nops"),fsr:!h.has("nofsr")},w=ze.gl,v=ze.audio,M=ze.timeline,m=ze.text,x=ze.shaders,Y=ze.script.END,s=[0,0,0,0],g=document.getElementById("c"),k=document.getElementById("loader"),P=(e,t)=>{e=document.getElementById(e);e&&(e.innerHTML=t)},U=(e,t=24)=>"█".repeat(Math.round(e*t))+"░".repeat(t-Math.round(e*t)),z,T={},H,A,E={},b=0,q=0,r=null,R=+h.get("q")||0,C={fps:60,scale:1,dev:y,hud:!0,mouse:[0,0]},o=!1,n=!1,X=0,S=null,i=[],$=0,W=0,Q=!0,l=[],e=(e,t,a)=>{e.addEventListener(t,a),l.push(()=>e.removeEventListener(t,a))},c=()=>ze.clamp(Math.sqrt(11e5/(b*q)),.35,1);function V(){let e=Math.min(window.devicePixelRatio||1,2),t=r?r[0]:Math.round(g.clientWidth*e),a=r?r[1]:Math.round(g.clientHeight*e),o;3686400<t*a&&(o=Math.sqrt(3686400/(t*a)),t=Math.round(t*o),a=Math.round(a*o)),t===b&&a===q||(b=g.width=t,q=g.height=a,m.resize(t,a),w.free(E.easu),w.free(E.up),E.easu=E.up=null,_(),Z(E.scale||c()))}function K(e){var o=Math.max(64,Math.round(b*e)),r=Math.max(36,Math.round(q*e)),l=[["a",o,r],["b",o,r],["mix",o,r],["acc0",o,r],["acc1",o,r],["god",o>>1,r>>1]];e<1&&B&&l.push(["fsrIn",o,r]);for(let e=0,t=o>>1,a=r>>1;e<6&&4<t&&4<a;e++,t>>=1,a>>=1)l.push(["bloom"+e,t,a]);return l}let d=null;function Z(e){var t=K(e),[,a,o]=t[0];if(E.scale=C.scale=e,!E.a||E.a.w!==a||E.a.h!==o){var r,l,c,n,i=E,s=d&&d.w===a&&d.h===o?d.made:{};d&&s!==d.made&&Object.values(d.made).forEach(w.free),d=null,E={scale:e,easu:i.easu,up:i.up,bloom:[]};for([r,l,c]of t){var f=s[r]||w.target(l,c);delete s[r],r.startsWith("bloom")?E.bloom.push(f):E[r]=f}Object.values(s).forEach(w.free),i.acc0&&T.trail.uniforms&&(w.bind(E.acc0),w.use(T.trail,{uCur:i.acc0.tex,uPrev:i.acc0.tex,uRes:[a,o],uDecay:0}),w.quad());for(n of["a","b","mix","acc0","acc1","god","fsrIn"])w.free(i[n]);(i.bloom||[]).forEach(w.free)}}function J(t){let a=M.trans.find(e=>t>=e.at-e.pre&&t<e.at+e.post);return{tr:a,active:a?[M.scenes.find(e=>e.t1===a.at),M.scenes.find(e=>e.t0===a.at)]:M.scenes.filter(e=>t>=e.t0&&t<e.t1)}}function ee(e){var t;return R||(e=J(e).active,t=Math.min(1,...e.map(a)),2===e.length&&I.has(e[0])&&I.has(e[1])?Math.min(t,ne(I.get(e[0]),I.get(e[1]))):t)}let te=e=>({uKick:ze.envelope(v.sync.kick,e,7),uSnare:ze.envelope(v.sync.snare,e,8),uHat:ze.envelope(v.sync.hat,e,20)});function L(e,t,a){var o=t-e.t0,r=e.state(t,o,C.mouse),l=r.cam,l=ze.camera(l.pos,l.target,l.roll||0,l.fov||60,a.w/a.h,C.mouse),c=(w.bind(a,!0),te(t)),o={uRes:[a.w,a.h],uTime:t,uLocal:o,uBeat:t/v.BEAT,...c,uCamPos:l.pos,uCamRot:l.rot,uTanHalf:l.tanHalf,uMouse:C.mouse,uNoise:H};if(e.fs&&(w.use(T["s_"+e.fs],{...o,uP0:r.P0||s,uP1:r.P1||s,uP2:r.P2||s,uP3:r.P3||s,...r.extra||{}}),w.quad()),e.ps&&p.ps){z.enable(z.BLEND),z.blendFunc(z.ONE,z.ONE);var n,i={...o,uVP:l.vp,uPx:a.h/(2*l.tanHalf),uCount:e.count,uP0:r.Q0||s,uP1:r.Q1||s,uP2:r.Q2||s,uP3:r.Q3||s,...r.extra||{}};for(n of e.mirror?[1,0]:[0])w.use(T["p_"+e.ps],{...i,uMirror:n}),z.drawArrays(z.POINTS,0,e.count);z.disable(z.BLEND)}return r.camObj=l,r}let ae=-1;function F(e){V();var t,a,o,r=.25<Math.abs(e-ae),l=ze.clamp(60*(e-ae),0,4),{tr:c,active:n}=J(ae=e);Z(ee(e));let i,s,f,d=((O=n).length?1===n.length?(s=L(n[0],e,E.a),i=E.a,f=n[0].id):([n,u]=n,t=c?(e-c.at+c.pre)/(c.pre+c.post):ze.smooth(u.t0,n.t1,e),a=L(n,e,E.a),o=L(u,e,E.b),w.bind(E.mix),w.use(T.mixer,{uA:E.a.tex,uB:E.b.tex,uRes:[E.mix.w,E.mix.h],uT:t}),w.quad(),i=E.mix,s=t<.5?a:o,f=(t<.5?n:u).id,s={...s,trail:ze.mix(a.trail||0,o.trail||0,t)*(c?.35:1),god:(t<.5?a:o).god}):(w.bind(E.a,!0),i=E.a,s={},f="none"),C.cam=s.camObj,C.aspect=E.a.w/E.a.h,w.bind(E.acc1),w.use(T.trail,{uCur:i.tex,uPrev:E.acc0.tex,uRes:[E.acc1.w,E.acc1.h],uDecay:r?0:Math.pow(s.trail||0,l)}),w.quad(),[E.acc0,E.acc1]=[E.acc1,E.acc0],i=E.acc0,0);s.god&&.001<s.god.amt&&s.camObj&&0<(n=ze.project(s.camObj,s.god.pos,E.a.w/E.a.h))[2]&&(d=s.god.amt,w.bind(E.god),w.use(T.god,{uSrc:i.tex,uRes:[E.god.w,E.god.h],uLight:[n[0],n[1]],uThresh:s.god.thr||1,uLen:.9}),w.quad()),m.render(e,C).dirty&&w.upload(A,m.canvas());var u=M.post(e,f),h=E.bloom;w.bind(h[0]),w.use(T.bloomPre,{uSrc:i.tex,uText:A,uRes:[h[0].w,h[0].h],uTexel:[1/i.w,1/i.h],uThresh:.9,uTextGlow:p.text?.6:0}),w.quad();for(let e=1;e<h.length;e++)w.bind(h[e]),w.use(T.down,{uSrc:h[e-1].tex,uRes:[h[e].w,h[e].h],uTexel:[1/h[e-1].w,1/h[e-1].h]}),w.quad();z.enable(z.BLEND),z.blendFunc(z.ONE,z.ONE);for(let e=h.length-1;0<e;e--)w.bind(h[e-1]),w.use(T.up,{uSrc:h[e].tex,uRes:[h[e-1].w,h[e-1].h],uTexel:[1/h[e].w,1/h[e].h],uRadius:1}),w.quad();z.disable(z.BLEND);c=oe(i);w.bind(null),w.use(T.final,{uScene:c.tex,uBloom:h[0].tex,uText:A,uGod:E.god.tex,uRes:[b,q],uTime:e,uExposure:u.exposure,uBloomAmt:p.bloom?.22*u.bloom:0,uFlash:u.flash,uFlashCol:u.flashCol,uFade:u.fade,uGlitch:u.glitch,uCA:u.ca,uGrain:u.grain,uScan:u.scan,uVig:u.vig,uPixel:1<u.pixel?u.pixel*(q/1080):0,uBits:u.bits,uSat:u.sat,uCRT:u.crt,uGodAmt:p.god?d*u.godAmt:0,uTextAmt:p.text?1:0,uContrast:u.contrast,uTint:u.tint,uLift:u.lift}),w.quad()}function oe(e){return!B||!E.fsrIn||e.w>=b||e.h>=q?e:(E.up||(E.easu=w.target(b,q,"10"),E.up=w.target(b,q,"hdr10")),w.bind(E.fsrIn),w.use(T.fsrIn,{uSrc:e.tex}),w.quad(),w.bind(E.easu),w.use(T.easu,{uSrc:E.fsrIn.tex,uIn:[e.w,e.h],uOut:[b,q]}),w.quad(),w.bind(E.up),w.use(T.rcas,{uSrc:E.easu.tex,uSharp:t(E.scale)}),w.quad(),E.up)}let re=+h.get("budget")||10.5,D=.05,le=.35,I=new Map,N={up:0,full:0},f=1,O=[],B=p.fsr,ce=0,a=e=>I.has(e)?I.get(e).s:c(),t=e=>Math.pow(2,-ze.mix(.6,2,ze.smooth(.6,1,e)));function ne(...e){var t=b*q/1e6,a=e.reduce((e,t)=>e+t.f,0),e=e.reduce((e,t)=>e+t.p,0);return f*(a+e*t+N.full)<=re?1:ze.clamp(+(Math.floor(Math.sqrt(Math.max(0,re/f-N.up-a)/Math.max(e*t,1e-6))/D+1e-6)*D).toFixed(2),le,1-D)}function _(){for(var e of I.values())e.s=Math.min(ne(e),e.cap||1)}let ie=()=>M.scenes.filter(e=>I.has(e)).map(e=>e.id+`@${e.t0} `+a(e)).join(", ")+` (k ${f.toFixed(2)}, post ${N.up.toFixed(1)}/${N.full.toFixed(1)} ms, upscaling ${ce.toFixed(2)} ms${B?"":" (off)"})`,u={period:1e3/60,key:"",n:0,win:[],misses:0,gpus:[],skip:0,kFloor:0,check:0,alone:0,log:[]},se=e=>{u.log.push(e),60<u.log.length&&u.log.shift(),y&&console.log("scale:",e)},fe=null;let de=new Uint8Array(4),ue=()=>{z.bindFramebuffer(z.FRAMEBUFFER,null),z.readPixels(0,0,1,1,z.RGBA,z.UNSIGNED_BYTE,de)};function he(e){if(Q){W=requestAnimationFrame(he);var t=X?e-X:16.7;if(X=e,C.fps=.95*C.fps+1e3/Math.max(t,1)*.05,(e=v.time())>=Y&&!n){if(n=!0,v.pause(),j.onEnd)return void j.onEnd();k.classList.remove("gone"),P("l-title","BIRTH &amp; DEATH OF THE DIGITAL UNIVERSE"),P("l-status",""),P("l-go","[ CLICK TO REBOOT ]")}var e=Math.min(e,Y-.001),a=S?(a=z.createQuery(),z.beginQuery(S.TIME_ELAPSED_EXT,a),a):null,o=u.check,r=(o&&ue(),performance.now()),l=(F(e),performance.now()-r),r=(o&&(ue(),o=performance.now()-r,u.first=2===u.check?o:Math.min(u.first,o),0==--u.check)&&(u.alone=u.first),a);if(r)for(z.endQuery(S.TIME_ELAPSED_EXT),i.push(r);i.length;){var c=i[0];if(!z.getQueryParameter(c,z.QUERY_RESULT_AVAILABLE))break;z.getParameter(S.GPU_DISJOINT_EXT)||($=z.getQueryParameter(c,z.QUERY_RESULT)/1e6),z.deleteQuery(c),i.shift()}((l,c)=>{if(!R&&I.size){u.period=Math.min(1.002*u.period,Math.max(l,4));var e,t,a,o,r=O.map(e=>M.scenes.indexOf(e)).join()+"@"+E.scale;if(r!==u.key&&(u.n<90||(t=I.get(fe),a=b*q/1e6,e=u.scale,t=t?t.f+t.p*a*e*e+(e<1?N.up:N.full):0,S&&60<u.gpus.length&&f*t>re/2?(a=u.gpus.sort((e,t)=>e-t)[Math.floor(.9*u.gpus.length)],o=ze.clamp(Math.sqrt(f*a/t),f/1.25,1.25*f),.05<Math.abs(o/f-1)&&(se(`${u.at} gpu ${a.toFixed(1)} ms (90th percentile) vs ${(f*t).toFixed(1)} predicted: k ${f.toFixed(2)} -> `+o.toFixed(2)),f=o,_())):!S&&e<1&&!u.misses&&.92*f>=u.kFloor&&(se(`${u.at} clean at ${e}: k ${f.toFixed(2)} -> `+(.92*f).toFixed(2)),f*=.92,_())),Object.assign(u,{key:r,n:0,win:[],misses:0,gpus:[],skip:30,alone:0,check:0,scale:E.scale,at:O.map(e=>e.id).join("+")+"@"+v.time().toFixed(1)}),fe=1===O.length?O[0]:null),!(!fe||250<l||0<u.skip--)){let e=Math.max(u.period,1e3/60),t=1.45*e<l&&c<.7*e,a=(u.n++,u.misses+=t,u.win.push(t),30<u.win.length&&u.win.shift(),S&&0<$&&u.gpus.push($),u.win.filter(Boolean).length),o=S?u.gpus.slice(-30).sort((e,t)=>e-t)[Math.min(15,u.gpus.length>>1)]||0:u.alone,r=S&&30<=u.gpus.length&&1.05*e<o;if(!r&&5<=a){if(!S&&!u.alone)return u.check||(u.check=2);(r=.8*e<o)||(se(`${u.at} ${a}/30 missed, not for the GPU (${o.toFixed(1)} ms ${S?"on the timer":"alone"})`),u.win=[])}if(u.alone=0,r&&!(E.scale<=le)){var n,i=Math.max(le,+(Math.floor(.85*E.scale/D+1e-6)*D).toFixed(2));for(n of O){var s=I.get(n);s.cap=Math.min(s.cap||1,i)}u.kFloor=Math.max(u.kFloor,f/.92),f=Math.max(1.1*f,u.kFloor),se(`${u.at} slow (${a}/30 missed, ${S?"gpu":"a frame alone"} ${o.toFixed(1)} ms): ${E.scale} -> ${i.toFixed(2)}, k `+f.toFixed(2)),_(),u.key="",u.n=0}}}})(t,l),o=e,R||([,t,l]=(r=K(a=ee(o+1)))[0],a<1&&B&&!E.up?(E.easu=w.target(b,q,"10"),w.bind(E.easu,!0),E.up=w.target(b,q,"hdr10"),w.bind(E.up,!0)):E.a&&E.a.w===t&&E.a.h===l||(!d||d.w===t&&d.h===l||(Object.values(d.made).forEach(w.free),d=null),d=d||{w:t,h:l,made:{}},(e=r.find(([e])=>!d.made[e]))&&w.bind(d.made[e[0]]=w.target(e[1],e[2]),!0)))}}function pe(t=0){k.classList.add("gone"),n=!1,!y&&document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen().then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape")).catch(()=>{}),G?ze.audio.time=(()=>{let e=performance.now()-1e3*t;return()=>(performance.now()-e)/1e3})():v.play(t),o||(o=!0,W=requestAnimationFrame(he))}return y&&e(window,"keydown",e=>{var t;o&&(t=v.time(),"Space"===e.code&&(v.playing()?v.pause():v.resume(),e.preventDefault()),"ArrowRight"===e.code&&(n=!1,v.play(Math.min(Y-1,t+8))),"ArrowLeft"===e.code)&&(n=!1,v.play(Math.max(0,t-8)))}),e(window,"resize",()=>V()),e(window,"dragover",e=>e.preventDefault()),e(window,"drop",async e=>{e.preventDefault();e=e.dataTransfer.files[0];if(e){P("l-status","decoding "+e.name+" ...");try{var t=h.get("cues")?h.get("cues").split(",").map(Number):null,a=await v.loadUserTrack(await e.arrayBuffer(),t);P("l-status",`♪ ${e.name} — ${a.duration.toFixed(1)} s, ${a.kicks} beats detected. the demo is stretched to fit.`),o&&v.playing()&&v.play(v.time())}catch(e){P("l-status","could not decode that file: "+e.message)}}}),k.addEventListener("click",()=>{k.dataset.ready&&pe(!n&&+h.get("t")||0)}),window.__demo={ready:!1,info:()=>{var e=z.getExtension("WEBGL_debug_renderer_info");return(e?z.getParameter(e.UNMASKED_RENDERER_WEBGL):"gl")+(` | ${b}x${q} scene x${(R||E.scale).toFixed(2)}${R?" (fixed)":""} | floatRT ${w.floatRT} | timer `+!!S)},scales:()=>ie(),scaleLog:()=>u.log.join("\n"),renderAt:(t,a=0)=>{k.style.display="none";for(let e=a;.001<e;e-=1/60)F(t-e);a=performance.now();return F(t),z.finish(),+(performance.now()-a).toFixed(1)},setSize:(e,t,a)=>(r=[e,t],a&&(R=a),V(),b+"x"+q),scan:(e,t="a")=>{F(e);var a=E[t]||E.a,o=new Float32Array(a.w*a.h*4);z.bindFramebuffer(z.FRAMEBUFFER,a.fb),z.readPixels(0,0,a.w,a.h,z.RGBA,z.FLOAT,o);let r=0,l=0,c=0,n=null;for(let t=0;t<o.length;t+=4)for(let e=0;e<3;e++){var i=o[t+e];Number.isNaN(i)?(r++,n=n||[t/4%a.w,Math.floor(t/4/a.w)]):Number.isFinite(i)?i>c&&(c=i):l++}return JSON.stringify({nan:r,inf:l,max:c,where:n,w:a.w,h:a.h})},bench:(t,a=20)=>{var o=new Uint8Array(4),e=(F(t),z.readPixels(0,0,1,1,z.RGBA,z.UNSIGNED_BYTE,o),performance.now());for(let e=0;e<a;e++)F(t+e/60),z.readPixels(0,0,1,1,z.RGBA,z.UNSIGNED_BYTE,o);return+((performance.now()-e)/a).toFixed(1)},wavChunks:async e=>(v.buffer||await v.render(null,!1),v._wav=v.wav(),Math.ceil(v._wav.length/e)),wavChunk:(e,t)=>{let a=v._wav.subarray(e*t,(e+1)*t),o="";for(let e=0;e<a.length;e+=32768)o+=String.fromCharCode.apply(null,a.subarray(e,e+32768));return btoa(o)}},(async()=>{let r=0,t=0,l=()=>P("l-status",`shaders ${U(r,12)} ${Math.round(100*r)}%<br>synth&nbsp;&nbsp; ${U(t,12)} ${Math.round(100*t)}%`);l();var e,a,o,c=performance.now(),n=v.render(e=>{t=e,l()},G);for(e in await v.started,z=w.init(g),S=!h.has("notimer")&&z.getExtension("EXT_disjoint_timer_query_webgl2"),x.scenes)T["s_"+e]=w.program("scene:"+e,w.FULLSCREEN_VS,x.sceneHead+x.scenes[e]);for(a in x.particles)T["p_"+a]=w.program("part:"+a,x.partHead+x.particles[a],x.partFS);for(o of["trail","god","bloomPre","down","up","mixer","fsrIn","easu","rcas","final"])T[o]=w.program(o,w.FULLSCREEN_VS,x[o]);m.init(),A=w.canvasTexture(),H=w.noise3D(),V();var i,s=(async()=>{for(var e,t,a=Object.values(T);;){var o=a.filter(w.isReady).length;if(t=o/a.length,r=t,l(),o===a.length)break;await new Promise(e=>setTimeout(e,40))}for(e of a)w.finish(e)})();await Promise.all([s,n]),console.log("boot: ready in",((performance.now()-c)/1e3).toFixed(1),"s; synth",((v.renderMs||0)/1e3).toFixed(2),"s"),G&&(t=1,l());for(i of M.scenes)F(i.t0+.5);if(!R){let p=w.target(192,108),v=w.target(384,216),t=new Float32Array(4),a=new Uint8Array(4),r=e=>{z.bindFramebuffer(z.FRAMEBUFFER,e?e.fb:null),e&&e.hdr?z.readPixels(0,0,1,1,z.RGBA,z.FLOAT,t):z.readPixels(0,0,1,1,z.RGBA,z.UNSIGNED_BYTE,a)},l=0,m=(t,e,a)=>{r(e);var o=performance.now();for(let e=0;e<a;e++)t();return r(e),Math.max(0,performance.now()-o-l)/a},x=(e,t,a)=>Math.min(m(e,t,a),m(e,t,a));var f,d,b=e=>ze.clamp(Math.round(2/Math.max(e,.1)),1,12),u=(z.finish(),r(null),performance.now());for(let t of[p,v])for(let e=0;e<3;e++)m(()=>w.bind(t,!0),t,1);l=Math.min(...[0,0,0,0,0].map(()=>m(()=>{},p,1)));let g={f:0,p:0};for(let h of M.scenes)if(h.fs||h.ps)if(1500<performance.now()-u)I.set(h,{...g});else{let e=[.12,.37,.62,.87].map(e=>ze.mix(h.t0,h.t1,e)),t=e.map(e=>x(()=>L(h,e,v),v,1)),a=t.indexOf(Math.max(...t)),o=e[a],r=b(t[a]),l=()=>m(()=>L(h,o,v),v,r),c=()=>m(()=>L(h,o,p),p,r),n=l(),i=c(),s=Math.min(n,l()),f=Math.min(i,c()),d=Math.max(0,(s-f)/(.0829-.0207)),u={f:Math.max(0,s-.0829*d),p:d};I.set(h,u),g={f:Math.max(g.f,u.f),p:Math.max(g.p,u.p)}}else I.set(h,{f:0,p:0});w.free(p),w.free(v);for([f,d]of[["up",Math.min(E.scale,1-D)],["full",1]])R=d,F(5),N[f]=x(()=>F(5),null,b(m(()=>F(5),null,1))),"up"===f&&E.up&&(ce=x(()=>oe(E.acc0),E.up,b(m(()=>oe(E.acc0),E.up,1))));R=0,ce>re/3&&(B=!1,N.up=Math.max(0,N.up-ce)),_(),y&&console.log("scales: measured in",(performance.now()-u).toFixed(0),"ms:",ie())}k.dataset.ready="1",P("l-status",""),P("l-go","[ CLICK TO BOOT ]"),window.__demo.ready=!0,h.has("autostart")&&pe(+h.get("t")||0)})().catch(e=>{console.error(e),P("l-status",'<span style="color:#f66">'+e.message+"</span>")}),{stop:function(){if(Q=!1,cancelAnimationFrame(W),v.close(),l.forEach(e=>e()),screen.orientation&&screen.orientation.unlock)try{screen.orientation.unlock()}catch(e){}document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen().catch(()=>{});var e=z&&z.getExtension("WEBGL_lose_context");e&&e.loseContext()}}},document.getElementById("c")&&ze.main();{let t=null,a=null,o=null,r="",l=matchMedia("(any-pointer: coarse)").matches&&!matchMedia("(hover: hover)").matches;function s(){var e;t&&(e=l&&innerHeight>innerWidth,t.classList.toggle("bd-rot",e),t.style.width=e?innerHeight+"px":"",t.style.height=e?innerWidth+"px":"",t.style.left=e?innerWidth+"px":"")}let c=e=>{"Escape"===e.key&&d()},n=()=>d(!0);function f(){"/"===location.pathname?d():(d(!0),location.replace("/"))}function d(e){t&&(window.removeEventListener("keydown",c),window.removeEventListener("resize",s),window.removeEventListener("popstate",n),!e&&history.state&&history.state.bdDemo&&history.back(),o&&o.stop(),t.remove(),a.remove(),t=a=o=null,document.documentElement.style.overflow=r)}window.BirthAndDeath={open:function(){t||((a=document.createElement("style")).textContent=`
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
@keyframes bd-blink { 50% { opacity: 0.25; } }`,document.head.appendChild(a),(t=document.createElement("div")).id="bd-demo",t.innerHTML='<canvas id="c"></canvas><div id="loader"><div id="l-status">booting...</div><div id="l-go"></div><div id="l-help">best with headphones &middot; fullscreen</div></div>',document.body.appendChild(t),r=document.documentElement.style.overflow,document.documentElement.style.overflow="hidden",window.addEventListener("keydown",c),window.addEventListener("resize",s),s(),history.pushState({bdDemo:1},""),window.addEventListener("popstate",n),o=ze.main({onEnd:f}))},close:d}}})();