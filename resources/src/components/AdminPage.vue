<template>
    <div class="admin-main-page">
            <div class="sidenav">
              <div class="logo">
                <h3>Logo</h3>
              </div>
              <div class="menu">
                
                  <div class="menu-button">
                      <p class="h5 mb-2"> 
                        <b-icon icon="archive" style="width: 20px; height: 20px;"></b-icon><font style="font-size: 14px; font-weight: bold">Semua Barang</font>
                      </p>
                  </div>
                
                <router-link to="/inventaris" style="margin: 0; text-decoration: none">
                  <div class="menu-button" id="cari">
                      <p class="h5 mb-2"> 
                        <b-icon icon="search" style="width: 20px; height: 20px;"></b-icon><font style="font-size: 14px; font-weight: bold">Cari Barang</font>
                      </p>
                  </div>
                </router-link>

                <router-link to="/inventaris/riwayat" style="margin: 0; text-decoration: none">
                  <div class="menu-button riwayat" :id="riwayat">
                      <p class="h5 mb-2"> 
                        <b-icon icon="clock-history" style="width: 20px; height: 20px;"></b-icon><font style="font-size: 14px; font-weight: bold">Riwayat Peminjaman</font>
                      </p>
                  </div>
                </router-link>

              </div>
            </div>
        </div>
</template>


<script>

</script>


<style>


.admin-main-page{
    margin-left: 160px;
}

.title{
    margin-top: 80px;
    color: grey;
}

a{
    margin: 5px;
}

.list{
    font-size: 14px;
}

button{
    border-radius: 50%;
    outline: none;
    border: none;
    background-color: skyblue;
    color: white;
    font-weight: bold;
}


.barang img{
    width: 100%;
    height: 200px;
    border: solid gainsboro 2px;
}

.desc{
    margin:5px;
}

.card button{
    width: 30%;
    background-color: #5cb85c;
    outline: none;
    border: none;
    font-weight: bold;
    color: white;
    margin:0;
}

.btn-hapus{
    background-color: red;
}

svg{
    position: relative;
    width: 150px;
    height: 150px;
    animation: rotate 2s linear infinite;
}

svg circle{
    width: 20%;
    height: 20%;
    fill: none;
    stroke-width: 10;
    stroke: skyblue;
    stroke-linecap: round;
    transform: translate(5px, 5px);
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    animation: animate 2s linear infinite;
}

@media screen and (max-width: 950px){
    .admin-main-page{
        margin-left: 50px;
    }
}

@keyframes animate{
    0%, 100%
    {
        stroke-dashoffset: 440;
    }
    50%
    {
        stroke-dashoffset: 0;
    }
    50.1%
    {
        stroke-dashoffset: 880;
    }
}

</style>