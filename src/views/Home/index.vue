<template>
  <div class="container">
    <ul class="nav">
      <li class="nav-link">
        <h1 data-name="home">Home</h1>
      </li>
      <li class="nav-link">
        <h1 data-name="About">About</h1>
      </li>
      <li class="nav-link">
        <h1 data-name="services">services</h1>
      </li>
      <li class="nav-link">
        <h1 data-name="contact">contact</h1>
      </li>
    </ul>
    <LaptopIcon class="ico" @click="goTo()" />
    <div class="tips">
      <div class="tword">山黛远 月波长 暮云秋影蘸潇湘</div>
    </div>
    <canvas id="lines"></canvas>
    <!-- <div class="title">INFSKY</div> -->
  </div>
</template>

<script>
import { LaptopIcon } from "tdesign-icons-vue";
export default {
  components: { LaptopIcon },
  data() {
    return {};
  },
  created() {},
  mounted() {
    (function () {
      const canvas = document.getElementById("lines");
      const ctx = canvas.getContext("2d");
      let width;
      let height;
      class Line {
        constructor(origin, size, length, color, style = "pattern") {
          this.size = size;
          this.origin = origin;
          this.length = length;
          this.color = color;
          this.style = style;
          this.origin = `M${origin.x},${origin.y}`;
          this.offSet = 0;
          this.line = null;
          this.offSetSpeed = length / size;
        }
        getColorString() {
          return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
        }
        generators() {
          return [
            {
              line: `h${this.size}`,
              mag: this.size,
            },
            {
              line: `h-${this.size}`,
              mag: this.size,
            },
            {
              line: `v${this.size}`,
              mag: this.size,
            },
            {
              line: `v-${this.size}`,
              mag: this.size,
            },
            {
              line: `l${this.size},${this.size}`,
              mag: Math.hypot(this.size, this.size),
            },
            {
              line: `l${this.size}-${this.size}`,
              mag: Math.hypot(this.size, this.size),
            },
            {
              line: `l-${this.size},${this.size}`,
              mag: Math.hypot(this.size, this.size),
            },
            {
              line: `l-${this.size}-${this.size}`,
              mag: Math.hypot(this.size, this.size),
            },
          ];
        }
        generate() {
          let segments = this.generators(this.size);
          let path = this.origin;
          let mag = 0;
          let fragment;
          let i;
          for (i = 0; i < this.length; i += 1) {
            fragment = segments[(Math.random() * segments.length) | 0];
            path += ` ${fragment.line}`;
            mag += fragment.mag;
          }
          this.line = {
            path,
            mag,
          };
          return this;
        }
        renderStyle(style) {
          if (style === "glitches") {
            ctx.lineDashOffset = this.line.mag + this.offSet;
            ctx.setLineDash([
              this.size ** 1.5,
              (this.line.mag / this.length) * this.size ** 2,
            ]);
            this.offSet += 20;
            // this.size / (this.size ** 2);
            ctx.lineWidth = 2;
            return this;
          }
          if (style === "pattern") {
            ctx.lineDashOffset = this.line.mag - this.offSet;
            ctx.setLineDash([this.line.mag, this.line.mag]);
            this.offSet += 10;
            //this.size / (this.size ** 100);
            ctx.lineWidth = 0.2;
          }
        }
        mutatePath() {
          let lineFragment = this.line.path.split(" ").slice(1);
          let generator = this.generators();
          lineFragment[(Math.random() * lineFragment.length) | 0] =
            generator[(Math.random() * generator.length) | 0].line;
          this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(
            " "
          )}`;
        }
        draw() {
          !this.line && this.generate();

          ctx.strokeStyle = this.getColorString();
          this.renderStyle(this.style);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke(new Path2D(this.line.path));
          return this;
        }
      }
      function clear() {
        ctx.fillStyle = `hsla(200deg, 20%, 10%, 0.3)`;
        ctx.fillRect(0, 0, width, height);
      }
      function generateLines(amount) {
        let lines = [];
        let styles = [
          {
            size: 1.25,
            style: "pattern",
            color: { h: 210, s: 100, l: 70, a: 0.5 },
          },
          {
            size: 2.5,
            style: "pattern",
            color: { h: 190, s: 90, l: 50, a: 0.3 },
          },
          {
            size: 5,
            style: "pattern",
            color: { h: 210, s: 70, l: 60, a: 0.2 },
          },
          {
            size: 10,
            style: "pattern",
            color: { h: 310, s: 80, l: 55, a: 0.15 },
          },
          {
            size: 20,
            style: "pattern",
            color: { h: 200, s: 25, l: 35, a: 0.12 },
          },
          {
            size: 20,
            style: "pattern",
            color: { h: 210, s: 20, l: 40, a: 0.12 },
          },
          {
            size: 40,
            style: "pattern",
            color: { h: 190, s: 40, l: 50, a: 0.12 },
          },
          {
            size: 80,
            style: "pattern",
            color: { h: 220, s: 50, l: 60, a: 0.12 },
          },
          {
            size: 40,
            style: "glitches",
            color: { h: 300, s: 100, l: 50, a: 0.3 },
          },
          {
            size: 20,
            style: "glitches",
            color: { h: 210, s: 100, l: 50, a: 0.3 },
          },
          {
            size: 60,
            style: "glitches",
            color: { h: 30, s: 100, l: 50, a: 0.3 },
          },
        ];
        for (let i = 0; i < amount; i += 1) {
          let style = styles[(Math.random() ** 2 * styles.length) | 0];
          lines.push(
            new Line(
              { x: width * 0.5, y: height * 0.5 },
              style.size,
              500 + Math.random() * 1000,
              style.color,
              style.style
            )
          );
        }
        return lines;
      }
      let id;
      function resize() {
        id = cancelAnimationFrame(id);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        const lines = generateLines(40);
        function update() {
          if (!(id % 3)) {
            clear();
            lines.forEach((line) => {
              line.draw();
              if (!(id % 5) && Math.random() > 0.95) {
                line.mutatePath();
              }
            });
          }
          id = requestAnimationFrame(update);
        }
        id = requestAnimationFrame(update);
      }
      window.addEventListener("resize", resize, {
        passive: true,
      });
      resize();
    })();
  },
  methods: {
    goTo() {
      this.$router.push("/rotate");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  body {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: var(--bgcolor);
    color: white;
  }
  .nav {
    position: absolute;
    left: 5%;
    z-index: 99;
    h1 {
      color: #fff;
      font-size: 5rem;
      position: relative;
      text-transform: uppercase;
      transition: all 300ms ease;
      width: fit-content;
      cursor: pointer;
    }
    h1:hover {
      transform: skew(10deg);
    }
    h1::before {
      content: attr(data-name);
      position: absolute;
      top: 0;
      left: -20px;
      background: var(--bgcolor);
      height: 3rem;
      overflow: hidden;
      transition: all 300ms ease;
      padding-left: 20px;
    }
    h1:hover::before {
      top: -3px;
      left: 0px;
      color: hotpink;
    }

    h1::after {
      content: "";
      height: 4px;
      width: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: hotpink;
      transition: all 300ms ease;
    }
    h1:hover::after {
      width: 120%;
      outline: 5px solid rgb(2, 0, 36);
    }
  }

  .ico {
    color: #fff;
    font-size: 24px;
    position: absolute;
    top: 3%;
    left: 30px;
    z-index: 99;
    cursor: pointer;
    &:hover {
      color: #1488f5;
    }
  }
  .tips {
    height: 480px;
    position: absolute;
    top: 10%;
    left: 25px;
    overflow: hidden;
    z-index: 99;
  }
  .tword {
    writing-mode: vertical-lr;
    color: #fff;
    font-size: 24px;
    letter-spacing: 10px;
    animation: fadenum 15s linear infinite;
  }
  @keyframes fadenum {
    0% {
      transform: translateY(520px);
    }

    100% {
      transform: translateY(-450px);
    }
  }
  .title {
    position: absolute;
    top: 45%;
    left: 30%;
    color: #fff;
    font-family: "Roboto";
    font-weight: 100;
    text-transform: uppercase;
    letter-spacing: 1.5em;
    font-size: clamp(1em, 7vw, 4em);
    animation: breath 10000ms ease-in-out infinite alternate;
  }

  @keyframes breath {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    background-color: hsla(240deg, 20%, 20%, 1);
  }
}
</style>
