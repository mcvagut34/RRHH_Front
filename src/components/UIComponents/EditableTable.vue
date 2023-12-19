<template>
  <div style="overflow-x:auto; padding-left: 20px; padding-right: 20px">
    <table class="table table-striped table-bordered table-hover" style="table-layout: auto; width: 100%;">
      <thead>
      <tr>
        <th v-for="co in columns"  scope="col"> {{co.label}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ro in rows" >
        <th v-for=" col in columns" >
          <input type="text"
                 :maxlength="col.size"
                 :size="col.size"
                 style="border: 0;box-shadow: none; background: none;"
                 v-model="ro[col.field]"
                 :readonly="!col.editable"
          />
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'EditableTable',
    props: {
      columns: {
        type: Array,
        required: true
      },
      rows: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
      }
    }
  }

</script>

<style scoped>

</style>
