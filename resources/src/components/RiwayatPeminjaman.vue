<template>
    <div class="riwayat-peminjaman">
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
            
        <div class="container">
            <div class="row">
                    <div class="col-md-4 offset-md-2">
                        <div class="form-group">
                            <input type="date" v-model="riwayatTanggal">
                            <b-button squared style="margin-left: 5px;" @click="showRiwayat('tanggal')" variant="primary" size="sm" >Tampilkan</b-button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input type="text" v-model="riwayatKode" placeholder="Ketik kode barang">
                            <b-button squared style="margin-left: 5px;" @click="showRiwayat('kode')" variant="primary" size="sm" >Tampilkan</b-button>
                        </div>
                    </div>
                </div>
                <div v-if="loadingRiwayat != null">
                    <center>
                        <svg>
                            <circle cx="70" cy="70" r="70"></circle>
                        </svg>
                    </center>
                </div>
                <div class="row">
                    <div class="card">
                        <table class="table" v-if="riwayat != null">
                        <thead style="background-color: skyblue; color: white; font-size: 14px">
                            <tr>
                                <th>Nama Barang</th>
                                <th>Kode</th>
                                <th>Peminjam</th>
                                <th>Alamat Peminjam</th>
                                <th>Keperluan</th>
                                <th>Kontak</th>
                                <th>Waktu Peminjaman</th>
                                <th>Waktu Dikembalikan</th>
                            </tr>
                        </thead>
                        <tbody style="color: grey; font-size: 14px">
                            <tr v-for="(row, index) in riwayat" :key="index">
                                <td>{{ row.nama_barang }}</td>
                                <td>{{ row.kode_barang }}</td>
                                <td>{{ row.peminjam }}</td>
                                <td>{{ row.alamat_peminjam }}</td>
                                <td>{{ row.keperluan }}</td>
                                <td>{{ row.kontak }}</td>
                                <td>{{ row.dipinjam }}</td>
                                <td>{{ row.dikembalikan }}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: 'App',
    data: function(){
        return{
            loadingRiwayat: null,
            riwayatKode: null,
            riwayatTanggal: null,
            riwayat: null
        }
    },
    methods: {
        showRiwayat(cek){
            this.riwayat = null;
            this.loadingRiwayat = 1;
            if(cek == 'tanggal'){
                axios.get('http://inventaris_api.apps/api/barang/riwayat?data=' + this.riwayatTanggal + '&i=' + cek).then(response => {
                    this.riwayat = response.data;
                    this.loadingRiwayat = null;
                });
            }else{
                axios.get('http://127.0.0.1:8000/api/barang/riwayat?data=' + this.riwayatKode + '&i=' + cek).then(response => {
                    this.riwayat = response.data;
                    this.loadingRiwayat = null;
                });
            }
        }
    },
    
}
</script>

<style>


.riwayat-peminjaman{
    margin-left: 200px;
}

.container{
    margin-top: 80px;
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
    .riwayat-peminjaman{
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