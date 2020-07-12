<template>
    <div class="admin-main-page">
        <div class="container">

            <!-- title -->
            <div class="row text-center">
                <div class="col-md-12">
                    <div class="title">
                        <h2>Admin Inventaris Barang</h2> 
                    </div>
                    
                </div>     
            </div>
            <!-- akhir title -->

            <!-- menu -->
                <b-button squared variant="primary" size="sm" v-b-modal.modal-input>Input Barang</b-button>
                <b-button squared style="margin-left: 5px;" variant="primary" size="sm" v-b-modal.modal-pinjam>Pinjam Barang</b-button>
                <b-button squared style="margin-left: 5px;" variant="primary" size="sm" v-b-modal.modal-riwayat>Riwayat Peminjaman</b-button>
            <!-- akhir menu -->

            
            <!-- cari barang -->
             <div class="row">
                <div class="col-md-8">
                    <br>
                    <div class="input-group mb-3">
                        <input type="text" v-model="cari" class="form-control input-keyword" placeholder="Cari Barang..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                        <button class="btn btn-outline-primary search-button" @click="cariBarang" type="button">Cari</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- akhri cari barang -->

            <div v-if="loading != null">
                <center>
                    <svg>
                        <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                </center>
            </div>

            <!-- barang -->
            <div class="row barang">
                <div class="col-md-3 my-3" v-for="(row, index) in barang" :key="index">
                    <div class="card">
                        <img :src="'http://127.0.0.1:8000/' + row.gambar">
                                <ul class="list-group">
                                    <li class="list-group-item"><h5>{{ row.nama_barang }}</h5></li>
                                    <li class="list-group-item list">Kode : {{ row.kode }}</li>
                                    <div v-if="row.peminjam != null">
                                        <li class="list-group-item list">Dipinjam oleh : {{ row.peminjam }}</li>
                                        <li class="list-group-item list">Tenggat : {{ row.tenggat }}</li>
                                        <li class="list-group-item list" style="color: red" v-if="row.ket != '-'"> {{ row.ket }}</li>
                                    </div>
                                </ul>
                        <b-button class="modal-detail-button" @click="detailBarang(row.id)" v-b-modal.modal-detail variant="success" size="sm">Detail</b-button>  
                    </div>
                </div>
            </div>
            <!-- akhir barang -->



            <!-- Awal Modal input barang -->
            <b-modal id="modal-input" size="lg" class="modal-content" title="Input Barang" ok-only>
                <div class="form-group">
                    <label for="gambar">Gambar</label>
                    <input type="file" id="gambar" class="form-control" @change="onFileSelected">
                    <label for="nama">Nama Barang</label>
                    <input type="text" id="nama" class="form-control" v-model="namaBarang">
                    <label for="kode">Kode Barang : </label>
                    <input type="text" id="kode" class="form-control" v-model="kodeBarang">
                    <label for="deskripsi">Deskripsi :</label>
                    <input type="text" id="deskripsi" class="form-control" v-model="deskripsi">
                    
                    <br>
                    <b-button @click="saveBarang">Simpan</b-button>
                </div>
                 <template v-slot:modal-footer>
                    <div class="w-100">
                    <div class="float-right">
                        <p v-if="menyimpan != ''">{{ menyimpan }}</p>
                    </div>
                    </div>
                </template>
            </b-modal>
            <!-- Akhir Modal input barang-->


            <!-- Awal modal detail barang -->
            <b-modal id="modal-detail" size="lg" v-if="indexBarang != null" class="modal-content" title="">
                <div class="row">
                    <div class="col-md-4 offset-md-1">
                        <img :src="'http://127.0.0.1:8000/' + barang[indexBarang].gambar" class="img-fluid" alt="Gambar Barang" >
                    </div>
                        <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h5>{{ barang[indexBarang].nama_barang }}</h5></li>
                            <li class="list-group-item"><strong>Kode : </strong>{{ barang[indexBarang].kode }}</li>
                            <div v-if="barang[indexBarang].peminjam != null">
                                <li class="list-group-item"><strong>Peminjam : </strong>{{ barang[indexBarang].peminjam }}</li>
                                <li class="list-group-item"><strong>Keperluan : </strong>{{ barang[indexBarang].keperluan }}</li>
                                <li class="list-group-item"><strong>Kontak Peminjam: </strong>{{ barang[indexBarang].kontak }}</li>
                                <li class="list-group-item"><strong>Tenggat : </strong>{{ barang[indexBarang].tenggat }}</li>
                                <li class="list-group-item" style="color: red" v-if="barang[indexBarang].ket != '-'">{{ barang[indexBarang].ket }}</li>
                            </div>
                           
                        </ul>  
                    </div>
                </div>
                <br>
                 <div class="row" v-if="barang[indexBarang].peminjam != null">
                    <div class="col-md-4 offset-md-1">
                        Klik tombol akhiri jika peminjam sudah mengembalikan barang
                    </div>
                    <div class="col-md-4">
                        <b-button variant="danger" @click="resetPeminjam(barang[indexBarang].kode, barang[indexBarang].tenggat)">Akhiri</b-button>
                    </div>
                </div>
            </b-modal>
            <!-- Akhir modal detail barang -->

            <!-- Awal modal pinjam barang -->
            <b-modal id="modal-pinjam">
                <div class="form-group">
                    <label for="kode">Kode Barang</label>
                    <input type="text" id="kode" class="form-control" v-model="kode">
                    <label for="peminjam">Peminjam : </label>
                    <input type="text" id="peminjam" class="form-control" v-model="peminjam">
                    <label for="kontak">Kontak Peminjam : </label>
                    <input type="text" id="kontak" class="form-control" v-model="kontak">
                    <label for="alamat">Alamat Peminjam : </label>
                    <input type="text" id="alamat" class="form-control" v-model="alamatPeminjam">
                     <label for="keperluan">Keperluan : </label>
                    <input type="text" id="keperluan" class="form-control" v-model="keperluan">
                    <label for="tenggat">Dipinjam Sampai :</label>
                    <input type="datetime-local" id="tenggat" class="form-control" v-model="tenggat">
                    <b-button @click="savePinjamBarang">Simpan</b-button>
                </div>
                <template v-slot:modal-footer>
                    <div class="w-100">
                    <div class="float-right">
                        <p v-if="hasilRequestPinjam != ''">{{ hasilRequestPinjam }}</p>
                    </div>
                    </div>
                </template>
            </b-modal>
            <!-- Akhir modal pinjam barang -->

            <!-- modal riwayat peminjaman -->
            <b-modal id="modal-riwayat" size="xl" scrollable title="Scrollable Content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="date" v-model="riwayatTanggal">
                            <b-button squared style="margin-left: 5px;" @click="showRiwayat('tanggal')" variant="primary" size="sm" >Tampilkan</b-button>
                        </div>
                    </div>
                    <div class="col-md-6">
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
                    <table class="table" v-if="riwayat != null">
                        <thead>
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
                        <tbody>
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
                 <template v-slot:modal-footer>
                    <div class="w-100">
                    </div>
                </template>
            </b-modal>
            <!-- Akhir modal riwayat peminjaman -->
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'AdminMainPage',
    data: function (){
        return{
            cari: '',
            barangDetail:``,
            idBarang: 0,
            indexBarang: null,
            id: 0,
            kode: '',
            peminjam: '',
            kontak: '',
            keperluan: '',
            alamatPeminjam: '',
            tenggat: '',
            inputGambar: '',
            namaBarang: '',
            kodeBarang: '',
            deskripsi: '',
            menyimpan: '',
            barang: null,
            hasilRequestPinjam: '',
            loading: null,
            loadingRiwayat: null,
            riwayatKode: null,
            riwayatTanggal: null,
            riwayat: null

        }
    },
    methods: {
        cariBarang(){
            this.barang = null;
            this.loading = 1;
            axios.get('http://127.0.0.1:8000/api/barang?cari=' + this.cari ).then(response => 
            {
                this.loading = null;
                this.barang = response.data;
            });
        },
        getImage (img) {
            return img ? require(`../assets/img/${img}`) : ''
        },
        detailBarang(id){
            const index = this.barang.findIndex(data => data.id == id);
            this.indexBarang = index;
            this.idBarang = id;
        },
        resetPeminjam(kode, tenggat){
            axios.put('http://127.0.0.1:8000/api/barang', {'kode': kode, 'tenggat': tenggat}).then( () => {
                this.barang[this.indexBarang].peminjam = '';
                this.barang[this.indexBarang].tenggat = '';
            });
        },
        savePinjamBarang(){
            axios.post('http://127.0.0.1:8000/api/barang/pinjam',
            {
                'kode': this.kode,
                'peminjam': this.peminjam,
                'kontak': this.kontak,
                'tenggat': this.tenggat,
                'alamat_peminjam': this.alamatPeminjam,
                'keperluan': this.keperluan
            }).then(response => this.hasilRequestPinjam = response.data);
        },
        onFileSelected(event){
            let fileReader = new FileReader();

            fileReader.readAsDataURL(event.target.files[0]);
            fileReader.onload = (event) => {
                this.inputGambar = event.target.result;
                console.log(this.inputGambar);
            }
        },
        saveBarang(){
            
             axios.post('http://127.0.0.1:8000/api/barang', 
             {'nama_barang' : this.namaBarang,
             'kode': this.kodeBarang,
             'deskripsi' : this.deskripsi,
             'gambar': this.inputGambar}, 
              {onUploadProgress: e =>  this.menyimpan = 'Menyimpan: ' + Math.round(e.loaded / e.total * 100 ) + '%'
              }).then(response => {
                setTimeout(()=>{
                    this.menyimpan = false
                }, 3000);
                console.log(response);
            });
        },
        showRiwayat(cek){
            this.riwayat = null;
            this.loadingRiwayat = 1;
            if(cek == 'tanggal'){
                axios.get('http://127.0.0.1:8000/api/barang/riwayat?data=' + this.riwayatTanggal + '&i=' + cek).then(response => {
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