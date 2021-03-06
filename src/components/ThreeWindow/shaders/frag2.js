const fragShader = `
precision mediump float;
#define M_PI 3.14159265359

// Varying
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vColor;
varying vec2 vR;
varying float vColor0;
varying vec4 vReflection;
varying vec2 vUVsphere;
varying mat4 vModelMatrix;

// Uniforms
uniform mat4 world;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float ramp;
uniform float scroll;
uniform float amplitude;

// Refs
uniform sampler2D textureSampler1;
uniform sampler2D textureSampler2;
uniform sampler2D textureSampler3;

//  Simplex 3D Noise Function
//  by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float noise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 );
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}


#define NUM_OCTAVES 2

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
mat2 rotate2d(in float _angle) {
    return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}
// used a tutorial by Inigo Quilez as a starting point and branched out in a different direction
void main(void)
{
	  vec2 st = 1.0 * gl_FragCoord.xy / (resolution.xy+vec2(resolution.x/2., 0.));

    vec2 st2 = st + 20.5*vec2(fbm(vec3(st*vec2(10., 1.),time/4.)));

    vec2 st3 = st + 10.*vec2(fbm(vec3(amplitude*5., st.x, st.y)));

    st2 = mix(st, st2, (scroll+mouse)/8.);
    st2 = mix(st2, st3, amplitude);

    float grad = st2.y*st2.x;
    // vec3 color1 = vec3(1.,1.,1.);
    // vec3 color2 = vec3(.2,.1,.6);
    vec3 color1 = vec3(0.,0.,0.);
    vec3 color2 = vec3(1.);
    vec3 color = mix(color1,color2,grad);
    color = texture2D(textureSampler1, (st/2. + st2/10.) * vec2(1.3, .8)).xyz;
    vec3 oldImage = texture2D(textureSampler2, (st/2. + st2/10.) * vec2(1.3, .8)).xyz;

    color = mix(oldImage, color, clamp(0.,1.,sin(min(ramp, 1.)*M_PI-M_PI/2.)/2.+.5));

    // float randfbm = fbm(vec3(st*1.2,44.23+time/20.));
    // vec3 color3 = vec3(1.,1.,0.);
    // vec3 color4 = vec3(smoothstep(0.09,.1,randfbm)) - vec3(smoothstep(0.12,.16,randfbm));

    color = smoothstep(0., 1., color);

    float alpha = 1.1 - length(color);
    // float alpha = log(length(color) / (1. - length(color)));
    // alpha = 1. - smoothstep(-4., 4., alpha);

	  gl_FragColor = vec4(color, 1.);
}
`

export default fragShader
