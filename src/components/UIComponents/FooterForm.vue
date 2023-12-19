<template>
  <div>
    <data-tables v-bind="{url:tableurl, propsToSearch, tableColumns,actions:false}"> </data-tables>
    <data-tables v-bind="{url:tableurl, propsToSearch, tableColumns,actions:false}"> </data-tables>
    <!---------------  /End Data Table --------------------->
    <crud-form v-bind="{addurl,formData}">
      <template v-for="thing in ">
        <div class="form-group">
          <label>Codigo</label>
          <input type="text" placeholder="Codigo" class="form-control" v-model="Cod">
        </div>
        <div class="form-group">
          <label>Categoria</label>
          <input type="text" placeholder="Categoria" class="form-control" v-model="Category">
        </div>
      </template>
    </crud-form>
  </div>
</template>

<script>
    export default {
      props: {
        tableurl: {
          type: String,
          required: true
        },
        addurl: {
          type: String,
          required: true
        },
        formData: {
          type: Object,
          required: true
        },
        tableColumns: {
          type: Array,
          required: true
        }

      },
      data () {
        return {
          propsToSearch: [],
          pagination: {}
        }
      }
    }
</script>

<style scoped>

</style>
