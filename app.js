const app = new Vue({
  el: "#app",
  data: {
    titulo: "GYM con Vue",
    tareas: [],
    nuevaTarea: "",
    cantidad: 0,
  },
  computed: {
    tareasPendientes() {
      this.cantidad = 0;
      for (const tarea of this.tareas) {
        if (!tarea.estado) {
          this.cantidad++;
        }
      }
      return this.cantidad;
    },
  },

  methods: {
    actualizarBD() {
      localStorage.setItem("gym-vue", JSON.stringify(this.tareas));
    },
    agregarTarea() {
      this.tareas.push({
        nombre: this.nuevaTarea,
        estado: false,
      });
      this.nuevaTarea = "";
      this.actualizarBD();
    },
    editarTarea(index) {
      this.tareas[index].estado = !this.tareas[index].estado;
      this.actualizarBD();
    },
    eliminarTarea(index) {
      this.tareas.splice(index, 1);
      this.actualizarBD();
    },
  },
  created: function () {
    let datosDB = JSON.parse(localStorage.getItem("gym-vue")) || [];
    this.tareas = datosDB;
  },
});
