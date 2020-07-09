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


            <!-- barang -->
            <div class="row barang">
                <div class="col-md-3 my-3" v-for="(row, index) in barang" :key="index">
                    <div class="card">
                        <img :src="'http://127.0.0.1:8000/' + row.gambar">
                                <ul class="list-group">
                                    <li class="list-group-item"><h5>{{ row.nama_barang }}</h5></li>
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
                            <li class="list-group-item"><h5>{{ barang[indexBarang].nama }}</h5></li>
                            <li class="list-group-item"><strong>Kode : </strong>{{ barang[indexBarang].kode }}</li>
                            <li class="list-group-item"><strong>Peminjam : </strong>{{ barang[indexBarang].peminjam }}</li>
                            <li class="list-group-item"><strong>Tenggat : </strong>{{ barang[indexBarang].tenggat }}</li>
                        </ul>  
                    </div>
                </div>
                <br>
                 <div class="row">
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
            cari: '',
            barangDetail:``,
            idBarang: 0,
            indexBarang: null,
            id: 0,
            kode: '',
            peminjam: '',
            tenggat: '',
            inputGambar: '',
            namaBarang: '',
            kodeBarang: '',
            deskripsi: '',
            menyimpan: '',
            barang: null,

        }
    },
    methods: {
        cariBarang(){
            axios.get('http://127.0.0.1:8000/api/barang?cari=' + this.cari ).then(response => this.barang = response.data)
        },
        getImage (img) {
            return img ? require(`../assets/img/${img}`) : ''
        },
        // getBarang(){
        //     axios.get('http://127.0.0.1:8000/api/barang', {'cari': this.cari}).then(response => this.barang = response.data);
        // },
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
            // const indexBarang = this.datas.findIndex(data => data.kode == this.kode);
            // this.datas[indexBarang].peminjam = this.peminjam;
            // this.datas[indexBarang].tenggat = this.tenggat;
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

        }
        
    },
    mounted(){
        // this.getBarang();
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