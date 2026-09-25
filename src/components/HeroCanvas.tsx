import { useEffect, useRef } from "react";
import { getVelocity } from "../lib/scroll";

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_int;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=.5;}
  return v;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;
  vec2 m=u_mouse*.4;
  float t=u_time*.05;
  vec2 p=uv*1.5+m*u_int;
  float w1=fbm(p+t);
  float w2=fbm(p+w1*1.7+vec2(t*1.4,-t*.8));
  float v=fbm(p+w2*2.1+m*u_int*.6);
  float ridge=1.-abs(sin(v*6.5+t*2.));
  vec3 col=vec3(.02)+vec3(.05,.052,.058)*smoothstep(.25,.95,v);
  vec3 acid=vec3(.714,1.,.18);
  col+=acid*smoothstep(.88,1.,ridge)*pow(v,2.)*u_int*.22;
  col+=acid*exp(-length(uv-m)*3.)*.025*u_int;
  col+=vec3(.006)*fbm(uv*40.+u_time*2.);
  col*=smoothstep(1.5,.3,length(uv));
  col*=1.-sin(gl_FragCoord.y*1.25)*.01;
  gl_FragColor=vec4(col,1.);
}`;

export default function HeroCanvas({
  boost,
}: {
  boost?: { current: { p: number } };
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uInt = gl.getUniformLocation(prog, "u_int");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, (canvas.clientWidth * dpr) | 0);
      canvas.height = Math.max(1, (canvas.clientHeight * dpr) | 0);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let intCur = 0.25;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!visible) return;
      time += dt;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const intTarget = Math.min(
        1,
        0.25 +
          Math.abs(getVelocity()) / 90 +
          (Math.abs(mouse.tx) + Math.abs(mouse.ty)) * 0.25 +
          (boost?.current?.p ?? 0) * 0.6
      );
      intCur += (intTarget - intCur) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uInt, intCur);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-80"
    />
  );
}
