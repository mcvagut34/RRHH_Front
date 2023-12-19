<template>
  <div class="col-md-12">
    <div  class="uploader">
      <div class="sa" v-if="this.$store.state.dist.uploadedFiles.array.includes(fileType)">
        <div class="sa-success">
          <div class="sa-success-tip"></div>
          <div class="sa-success-long"></div>
          <div class="sa-success-placeholder"></div>
          <div class="sa-success-fix"></div>
        </div>
        <button v-if="this.$store.state.dist.uploadedFiles.state==='STARTED' || this.$store.state.dist.uploadedFiles.state==='ERROR'"  type="button" class="btn btn-wd btn-danger" style="margin-top: 25px; margin-left: 10px" @click="deleteFile">
          <span class="btn-label">
              <i class="fa fa-times"></i>
          </span>
          Eliminar Archivo
        </button>
      </div>
      <div v-else>
        <button type="button" class="btn btn-wd btn-info" style="margin: 20px 35%" @click="loadTemplate">
          <span class="btn-label">
              <i class="fa fa-download"></i>
          </span>
          Descargar Plantilla
        </button>
        <input type="file" :id="fileType" ref="file" v-on:change="submitFile"/>
        <label :for="fileType" id="file-drag">
          <img id="file-image" src="#" alt="Preview" class="hidden">
          <div id="start">
            <i class="fa fa-upload" aria-hidden="true"></i>
            <div>Select a file or drag here</div>
            <div id="notimage" class="hidden">Please select an image</div>
            <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
          </div>
          <div id="response" class="hidden">
            <div id="messages"></div>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  export default {
    data () {
      return {
      }
    },
    props: {
      url: {
        type: String,
        required: true
      },
      fileType: {
        type: String,
        required: true
      }
    },
    computed: {
      valid: {
        get () {
          return this.$store.state.dist.uploadedFiles.array.includes(this.fileType)
        }
      }
    },
    methods: {
      deleteFile () {
        axios.delete(this.url, {
          data: {
            mes: this.$store.state.dist.mes,
            gestion: this.$store.state.dist.gestion,
            segmentoOrigen: this.$store.state.dist.segmentoOrigen
          }
        }).then(response => {
          this.$store.dispatch('dist/uploadedFiles')
        })
      },
      loadTemplate () {
        axios.get(this.url,
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token')
            }
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Plantilla ' + this.fileType + '.xlsx')
            document.body.appendChild(link)
            link.click()
          })
      },
      submitFile () {
        this.$store.commit('crud/loadSetter', true)
        let formData = new FormData()
        formData.append('file', this.$refs.file.files[0])
        formData.append('mes', this.$store.state.dist.mes)
        formData.append('gestion', this.$store.state.dist.gestion)
        formData.append('segmentoOrigen', this.$store.state.dist.segmentoOrigen)
        axios.post(this.url,
          formData,
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token')
            }
          }
        )
        .then(response => {
          this.$store.dispatch('dist/uploadedFiles')
          this.$store.commit('crud/loadSetter', false)
        })
          .catch(error => {
            this.$refs.file.value = ''
            this.$store.commit('crud/loadSetter', false)
            const errors = JSON.parse(error.response.headers.uploaderrors)
            let e = ''
            for (const key in errors) {
              e += errors[key] + '<br>'
            }
            const blob = new Blob([error.response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'file.xlsx')
            document.body.appendChild(link)
            link.click()
            swal({
              title: 'ERROR',
              html: e,
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          })
      }
    }
  }
</script>
<style>
  .uploader {
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }
  .uploader label {
    float: left;
    clear: both;
    width: 100%;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all .2s ease;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .uploader label:hover {
    border-color: #1c3b6c;
  }
  .uploader label.hover #start i.fa {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.3;
  }
  .uploader #start {
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #start.hidden {
    display: none;
  }
  .uploader #start i.fa {
    font-size: 50px;
    margin-bottom: 1rem;
    transition: all .2s ease-in-out;
  }
  .uploader #response {
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #response.hidden {
    display: none;
  }
  .uploader #response #messages {
    margin-bottom: .5rem;
  }
  .uploader #file-image {
    display: inline;
    margin: 0 auto .5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;
  }
  .uploader #file-image.hidden {
    display: none;
  }
  .uploader #notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #notimage.hidden {
    display: none;
  }
  .uploader input[type="file"] {
    display: none;
  }
  .uploader div {
    margin: 0 0 .5rem 0;
    color: #5f6982;
  }
  .uploader .btn-primary {
    display: inline-block;
    margin: .5rem .5rem 1rem .5rem;
    clear: both;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    text-transform: initial;
    border: none;
    border-radius: .2rem;
    outline: none;
    padding: 0 1rem;
    height: 36px;
    line-height: 36px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    background: #1c3b6c;
    border-color: #1c3b6c;
    cursor: pointer;
  }

  .sa {
    width: 260px;
    height: 260px;
    padding: 26px;
    background-color: #fff;
    margin: 0 auto!important;
  }
  .sa-success {
    border-radius: 50%;
    border: 4px solid #A5DC86;
    box-sizing: content-box;
    height: 200px;
    padding: 0;
    position: relative;
    background-color: #fff;
    width: 200px;
  }
  .sa-success:after, .sa-success:before {
    background: #fff;
    content: '';
    height: 250px;
    position: absolute;
    transform: rotate(45deg);
    width: 140px;
    margin-top: 29px;
    margin-left: -2px;
  }
  .sa-success:before {
    border-radius: 40px 0 0 40px;
    width: 70px;
    height: 205px;
    top: 15px;
    left: -21px;
    transform-origin: 60px 60px;
    transform: rotate(-45deg);
  }
  .sa-success:after {
    border-radius: 0 120px 120px 0;
    left: 30px;
    top: -11px;
    transform-origin: 0 60px;
    transform: rotate(-45deg);
    animation: rotatePlaceholder 4.25s ease-in;
  }
  .sa-success-placeholder {
    border-radius: 50%;
    border: 4px solid rgba(76, 175, 80, 0.25);
    box-sizing: content-box;
    height: 200px;
    left: -4px;
    position: absolute;
    top: -4px;
    width: 200px;
    z-index: 2;
  }
  .sa-success-fix {
    background-color: #fff;
    height: 205px;
    left: 70px;
    position: absolute;
    top: 25px;
    transform: rotate(-45deg);
    width: 6px;
    z-index: 1;
  }
  .sa-success-tip, .sa-success-long {
    background-color: #8BC34A;
    border-radius: 2px;
    height: 5px;
    position: absolute;
    z-index: 2;
  }
  .sa-success-tip {
    left: 24px;
    top: 112px;
    transform: rotate(45deg);
    width: 73px;
    animation: animateSuccessTip .75s;
  }
  .sa-success-long {
    right: 15px;
    top: 96px;
    transform: rotate(-45deg);
    width: 119px;
    animation: animateSuccessLong .75s;
  }

  @keyframes animateSuccessTip {
    0%, 54% {
      width: 0;
      left: -3px;
      top: 83px;
    }
    70% {
      width: 112px;
      left: -11px;
      top: 98px;
    }
    84% {
      width: 49px;
      left: 46px;
      top: 120px;
    }
    100% {
      width: 73px;
      left: 24px;
      top: 112px;
    }
  }
  @keyframes animateSuccessLong {
    0%, 65% {
      width: 0;
      right: 45px;
      top: 50px;
    }
    84% {
      width: 136px;
      right: -1px;
      top: 88px;
    }
    100% {
      width: 119px;
      right: 15px;
      top: 96px;
    }
  }
  @keyframes rotatePlaceholder {
    0%, 5% {
      transform: rotate(-45deg);
    }
    100%, 12% {
      transform: rotate(-405deg);
    }
  }

</style>
