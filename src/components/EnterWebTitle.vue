<script setup>

  window.onload = () => {
    const containerH1 = document.querySelector('.container h1');
    const containerP = document.getElementById("pTag");

    containerH1.style.color = 'rgb(176, 255, 91)';
    containerH1.style.transform = 'translateX(-100px)';
    
    containerP.style.color = 'rgb(62, 255, 87)';
    containerP.style.transform = 'translateX(70px)';

  }

</script>

<template>
  <div class="container">
    <h1>Natural</h1>
    <p id="pTag">吃到自然的風味</p>
  </div>
</template>

<style scoped>

  .container {
    background-image: url("../assets/product_display.jpg");
    width: 100vw;
    height: calc(350px + (30vw * 0.5));
    background-size: cover;
    background-position:  50% 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .container h1 {
    position: relative;
    font-family: fantasy;
    margin-top: 9vw;
    margin-left: 100px;
    color: transparent;
    font-size:72px;
    letter-spacing: 2px;
    line-height: 1.2em;
    background-color: transparent;
    transition: 1.2s ease-in-out;
  }

  .container p {
    font-size: 22px;
    font-weight: bold;
    color: transparent;
    margin-right: 30px;
    background-color: transparent;
    transition: 1s ease-in-out;
  }

</style>