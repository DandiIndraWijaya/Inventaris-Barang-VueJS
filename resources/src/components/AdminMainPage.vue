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
            <!-- akhir menu -->


            <!-- barang -->
            <div class="row barang">
                <div class="col-md-3 my-3" v-for="(row, index) in datas" :key="index">
                    <div class="card">
                        <img :src="getImage(row.gambar)">
                                <ul class="list-group">
                                    <li class="list-group-item"><h5>{{ row.nama }}</h5></li>
                                    <li class="list-group-item list">Kode : {{ row.kode }}</li>
                                    <li class="list-group-item list">Dipinjam oleh : {{ row.peminjam }}</li>
                                    <li class="list-group-item list">Tenggat : {{ row.tenggat }}</li>
                                </ul>
                        <b-button class="modal-detail-button" @click="detailBarang(row.id)" v-b-modal.modal-detail variant="success" size="sm">Detail</b-button>  
                    </div>
                </div>
            </div>
            <!-- akhir barang -->



            <!-- Awal Modal input barang -->
            <b-modal id="modal-input" size="lg" class="modal-content" title="Input Barang" >
                <div class="form-group">
                    <label for="gambar">Gambar</label>
                    <input type="file" id="gambar" class="form-control" @change="onFileSelected">
                    <label for="nama">Nama Barang</label>
                    <input type="text" id="nama" class="form-control" v-model="namaBarang">
                    <label for="kode">Kode Barang : </label>
                    <input type="text" id="kode" class="form-control" v-model="kodeBarang">
                    <label for="deskripsi">Deskripsi :</label>
                    <input type="text" id="deskripsi" class="form-control" v-model="deskripsi">
                    <div>
                        <p v-if="menyimpan != ''">{{ menyimpan }}</p>
                    </div>
                    <b-button @click="saveBarang">Simpan</b-button>
                </div>
            </b-modal>
            <!-- Akhir Modal input barang-->


            <!-- Awal modal detail barang -->
            <b-modal id="modal-detail" size="lg" class="modal-content" title="">
                <div class="row">
                    <div class="col-md-4 offset-md-1">
                        <img :src="getImage(gambar)" class="img-fluid" alt="Gambar Barang" >
                    </div>
                        <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h5>{{ datas[indexBarang].nama }}</h5></li>
                            <li class="list-group-item"><strong>Kode : </strong>{{ datas[indexBarang].kode }}</li>
                            <li class="list-group-item"><strong>Peminjam : </strong>{{ datas[indexBarang].peminjam }}</li>
                            <li class="list-group-item"><strong>Tenggat : </strong>{{ datas[indexBarang].tenggat }}</li>
                        </ul>  
                    </div>
                </div>
                <br>
                 <div class="row">
                    <div class="col-md-4 offset-md-1">
                        Klik tombol akhiri jika peminjam sudah mengembalikan barang
                    </div>
                    <div class="col-md-4">
                        <b-button variant="danger" @click="resetPeminjam(idBarang)">Akhiri</b-button>
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
                    <label for="tenggat">Dipinjam Sampai :</label>
                    <input type="date" id="tenggat" class="form-control" v-model="tenggat">
                    <b-button @click="savePinjamBarang">Simpan</b-button>
                </div>
            </b-modal>
            <!-- Akhir modal pinjam barang -->
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'AdminMainPage',
    data: function (){
        return{
            datas: [{id: 1, gambar: '1.jpg', nama: 'hdmi', kode: 'A1', peminjam: 'Dandi', tenggat: 'Senin, 24 Januari 2020'},
            {id: 2, gambar: '2.jpg', nama: 'Proyektor', kode: 'A2', peminjam: 'Dandi', tenggat: 'Senin, 24 Januari 2020'},
            {id: 3, gambar: '3.jpeg', nama: 'Kamera 1', kode: 'A3', peminjam: 'Indra', tenggat: 'Senin, 24 Januari 2020'},
            {id: 4, gambar: '4.jpeg', nama: 'Kamera 2', kode: 'A4', peminjam: 'Nina', tenggat: 'Senin, 24 Januari 2020'},
            {id: 5, gambar: '5.jpeg', nama: 'Arduino', kode: 'A5', peminjam: 'Wijaya', tenggat: 'Senin, 24 Januari 2020'} ],
            barangDetail:``,
            gambar: '',
            idBarang: 0,
            indexBarang: 0,
            id: 0,
            kode: '',
            peminjam: '',
            tenggat: '',
            inputGambar: '',
            namaBarang: '',
            kodeBarang: '',
            deskripsi: '',
            menyimpan: '',

        }
    },
    methods: {
        getImage (img) {
            return img ? require(`../assets/img/${img}`) : ''
        },
        getBarang(){
            axios.get('http://127.0.0.1:8000/api/barang').then(response => this.notes = response.data.reverse());
        },
        detailBarang(id){
            const index = this.datas.findIndex(data => data.id == id);
            const detailBarang = this.datas[index];
            this.indexBarang = index;
            this.idBarang = id;
            this.gambar = detailBarang.gambar;
        },
        resetPeminjam(id){
            const indexBarang = this.datas.findIndex(data => data.id == id);
            this.datas[indexBarang].peminjam = '-';
            this.datas[indexBarang].tenggat = '-';
        },
        savePinjamBarang(){
            const indexBarang = this.datas.findIndex(data => data.kode == this.kode);
            this.datas[indexBarang].peminjam = this.peminjam;
            this.datas[indexBarang].tenggat = this.tenggat;
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
              {onUploadProgress: uploadEvent => {
                  this.menyimpan = 'Menyimpan: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100 + '%');
              }}).then(response => {
                console.log(response);
            })
        }
        
    },
    mounted(){
        this.getBarang();
    }
   
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
    height: 150px;
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


</style>