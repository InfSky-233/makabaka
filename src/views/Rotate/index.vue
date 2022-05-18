<template>
  <div class="">
    <div id="mouse-cursor"></div>
    <div class="wrapper">
      <ul>
        <li class="cursor-hover"><a href="#">Hello.</a></li>
        <li class="cursor-hover"><a href="#">About.</a></li>
        <li class="cursor-hover"><a href="#">Why.</a></li>
        <li class="cursor-hover"><a href="#">Contact.</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    (function () {
      const handleMousePos = (e) => {
        const CURSOR = document.querySelector("#mouse-cursor");
        const HOVER = document.querySelectorAll(".cursor-hover");
        const { pageX: posX, pageY: posY } = e;

        const runMouseOver = () => {
          CURSOR.style.transform = "scale(4)";
          CURSOR.style.background = "#FF1744";
        };
        HOVER.forEach((hover) =>
          hover.addEventListener("mouseenter", runMouseOver)
        );

        const runMouseLeave = () => {
          CURSOR.style.transform = "";
          CURSOR.style.background = "";
        };
        HOVER.forEach((hover) =>
          hover.addEventListener("mouseleave", runMouseLeave)
        );

        return (
          (CURSOR.style.left = `${posX - 10}px`),
          (CURSOR.style.top = `${posY - 10}px`)
        );
      };
      document.addEventListener("mousemove", handleMousePos);
    })();
  },
  methods: {},
};
</script>

<style lang="less" scoped>
body {
  background: #000;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
}
body * {
  box-sizing: border-box;
}

#mouse-cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #000;
  border: 4px solid #ff1744;
  border-radius: 999px;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 999;
  transition: top 0.025s ease, left 0.025s ease, transform 0.25s ease;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

ul {
  margin: 0;
  padding: 0;
  width: 65vw;
}
ul li {
  list-style: none;
  font-size: 80px;
  margin-bottom: 25px;
  display: table;
}
ul li a {
  color: #ff1744;
  text-decoration: none;
  letter-spacing: 5px;
  text-transform: lowercase;
  transition: 0.5s ease;
}
ul li a:hover {
  letter-spacing: 15px;
}
</style>
