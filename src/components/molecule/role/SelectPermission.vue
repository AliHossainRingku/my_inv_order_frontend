<template >
  <div class="px-3 mt-3">
      <v-row class="mt-n5  mb-5" style="border-bottom: 1px solid #9f9393">
          <span class="text--secondary">Select Following Permissions </span>
          <v-spacer></v-spacer>
              <v-checkbox
              v-model="selectAll"
              label="Select All"
              color="success"
              value=""
              hide-details
              class="mt-n1 mb-2"
              @click="!selectAll"
              @change="changeSelectAll"
            ></v-checkbox>
      </v-row>
      <v-row class="mt-n2 text-center" >
        <v-col cols="4" md="4" sm="6" xs="12" class="mt-n7 sm-6 xsm-12"  v-for="permission in permissions" :key="permission.id">
           <v-checkbox
           v-model="selectedPermissions"
              :label="`${permission.name}`"
              color="success"
              :value="`${permission.id}`"
              hide-details
              @click="changePerm"
            ></v-checkbox>
        </v-col>
      </v-row>
  </div>
</template>

<script>

export default {
  name: "SelectPermission",
  components: {},
  props: {
      permissions:{
          required:true
      },
      itemPermissions:{
          required:true
      }
  },
  data() {
    return {
        edit:true,
        selectedPermissions:[],
        selectAll:false
    };
  },

  computed: {},
  watch: {
    itemPermissions(){
        this.selectedPermissions=this.itemPermissions;
        this.selectAll=this.selectedPermissions.length == this.permissions.length ?? false;
    }
  },
  methods: {
    changeSelectAll(){
        if (this.selectAll) {
            this. selectedPermissions=[];
            this.permissions.forEach(element => {
                let id = element.id.toString();
                this.selectedPermissions.push(id);
            });
        }else{
            this. selectedPermissions=[];
        }
        this.$emit('changeSelect', this.selectedPermissions);
    },
    changePerm(){
        this.selectAll = this.selectedPermissions.length==this.permissions.length ?? false;
        this.$emit('changeSelect', this.selectedPermissions);
    },

    emptyForm(){
        this.selectAll=false;
        this.selectedPermissions=[];
    },

    loadPermission(){
        this.selectedPermissions = this.itemPermissions;
    }


  },
  created(){
    this.selectedPermissions=this.itemPermissions;
    this.selectAll=this.selectedPermissions.length == this.permissions.length ?? false;
  }
};
</script>