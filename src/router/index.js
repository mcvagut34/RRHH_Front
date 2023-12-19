import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'src/components/Layout/Layout.vue'
// GeneralViews
import NotFound from 'src/components/GeneralViews/NotFoundPage.vue'
// Pages
import UserProfile from 'src/components/User/UserProfile.vue'
// Auth Module
import Login from 'src/modules/Auth/Login.vue'
// Employees Module
import Employee from 'src/modules/Employees'
// Branches Module
import Branches from 'src/modules/Branches'
// Roles Module
import Roles from 'src/modules/Roles'
// Access Module
import Access from 'src/modules/Access'
// Users Module
import Users from 'src/modules/Users'
// Distribution Module
import Dist from 'src/modules/Distribution'
// Level Module
import Level from 'src/modules/Level'
// Positions Module
import Positions from 'src/modules/Positions'
// PerformanceArea Module
import PerformanceArea from 'src/modules/PerformanceArea'
// OrganizationalUnit Module
import OrganizationalUnit from 'src/modules/OrganizationalUnit'
// Dependency Module
import Dependency from 'src/modules/Dependency'
// Grupo Contable Module
import GrupoContable from 'src/modules/GrupoContable'
// Cuentas Contable Module
import CuentasContables from 'src/modules/CuentasContables'
// Tipo Empleado dist Module
import TipoEmpleadoDist from 'src/modules/TipoEmpleadoDist'
// Process Module
import Process from 'src/modules/Process'
// Menu Module
import Module from 'src/modules/Menu'
// Centros de Resp Module
import B1UnidadOrganizacional from 'src/modules/B1UnidadOrganizacional'
import B1PEI from 'src/modules/B1PEI'
import B1PlanEstudios from 'src/modules/B1PlanEstudios'
import B1Paralelo from 'src/modules/B1Paralelo'
import B1Periodo from 'src/modules/B1Periodo'
import B1Proyecto from 'src/modules/B1Proyecto'
import B1BP from 'src/modules/B1BP'
import B1employees from 'src/modules/B1Employees'
// ToT
import Linkage from 'src/modules/ToT_Linkage'
import Dedication from 'src/modules/ToT_Dedication'
import CauseDesvinculation from 'src/modules/ToT_CauseDesvinculation'
import AFP from 'src/modules/ToT_AFP'
import FileState from 'src/modules/ToT_FileState'
import ProcessState from 'src/modules/ToT_ProcessState'
// Contract List
import Contractlist from 'src/modules/Contract'
// Contract Nombramiento
import Nombramiento from 'src/modules/Nombramiento'
// Contract NombramientoDetail
import NombramientoDetail from 'src/modules/Nombramiento/detail'
// Contract Civil Alta
import Civil from 'src/modules/Civil'
import HistorialCivil from 'src/modules/Civil/HistorialDocente'
import ContratosCiviles from 'src/modules/ContratosCiviles'
import ContratosCivilesHistory from 'src/modules/ContratosCiviles/ContratosCivilesHistory'
import ContratosCivilesAprobacion from 'src/modules/ContratosCiviles/ContratosCivilesAprobacion'
// Asesorías de Docentes
import Asesoria from 'src/modules/AsesoriaDocente/index'
import RegistroTutoria from 'src/modules/AsesoriaDocente/ABM/RegistroTutorias'
import AprobacionTutoria from 'src/modules/AsesoriaDocente/AprobacionTutorias'
import RevisionTutorias from 'src/modules/AsesoriaDocente/RevisionTutorias'
import BusquedaAvanzada from 'src/modules/AsesoriaDocente/Busqueda/BusquedaReporte'

// Asesorías de Post
import AsesoriaPost from 'src/modules/AsesoriaDocentePost/index'
import RegistroTutoriaPost from 'src/modules/AsesoriaDocentePost/ABM/RegistroTutorias'
import RegistroModulos from 'src/modules/AsesoriaDocentePost/ABM/RegistroModulos'
import AprobacionPost from 'src/modules/AsesoriaDocentePost/AprobacionTutorias'
import HistorialPostgrado from 'src/modules/AsesoriaDocentePost/HistorialPostgrado'
import BusqAvanzadaPost from 'src/modules/AsesoriaDocentePost/Busqueda/BusquedaReporte'
import BusqFechas from 'src/modules/AsesoriaDocentePost/Busqueda/BusquedaXFechas'

import TipoTarea from 'src/modules/AsesoriaDocente/Admin/TipoTarea'
import Modalidades from 'src/modules/AsesoriaDocente/Admin/Modalidades'
import Interregional from 'src/modules/Interregional'
import BajaAdmin from 'src/modules/Contract/Admin/BajaAdmin'
// import store from '../store'
import RRHHSearch from 'src/modules/RRHHSearch'
import BusquedaGrupal from 'src/modules/RRHHSearch/BusquedaGrupal.vue'
import Organigrama from 'src/modules/RRHHSearch/Organigrama.vue'
import NovedadesAltas from 'src/modules/RRHHSearch/NovedadesAltas.vue'
import NovedadesBajas from 'src/modules/RRHHSearch/NovedadesBajas.vue'

import Listado from 'src/modules/RRHHSearch/Listado.vue'
import Dependencia from 'src/modules/RRHHSearch/Dependencia.vue'
import PlanillasInfo from 'src/modules/RRHHSearch/PlanillasInfo.vue'
import Ingreso from 'src/modules/Fechas/Ingreso.vue'
import FechaVacaciones from 'src/modules/Fechas/FechaVacaciones.vue'
Vue.use(VueRouter)

let Menu = {
  path: '/',
  component: Layout,
  redirect: '/',
  children: [
    {
      path: 'module/',
      name: 'Modulos',
      component: Module
    },
    {
      path: 'persona/',
      name: 'Historial Empleados',
      component: Employee
    },
    {
      path: 'regional/',
      name: 'Regionales',
      component: Branches
    },
    {
      path: 'rol/',
      name: 'Roles',
      component: Roles
    },
    {
      path: 'acceso/',
      name: 'Permisos',
      component: Access
    },
    {
      path: 'usuario/',
      name: 'Usuarios',
      component: Users
    },
    {
      path: 'distribution/',
      name: 'Distribución por Centros de Responsabilidad',
      component: Dist
    },
    {
      path: 'nivel/',
      name: 'Nivel Gerarquico',
      component: Level
    },
    {
      path: 'cargo/',
      name: 'Cargos',
      component: Positions
    },
    {
      path: 'dependencias/',
      name: 'Dependencia Organigrama',
      component: Dependency
    },
    {
      path: 'areadesempenio/',
      name: 'Area Desempeño',
      component: PerformanceArea
    },
    {
      path: 'unidadorganizacional/',
      name: 'Unidad Organizacional',
      component: OrganizationalUnit
    },
    {
      path: 'grupocontable/',
      name: 'Grupo Contable',
      component: GrupoContable
    },
    {
      path: 'profile/',
      name: 'User Page',
      component: UserProfile
    },
    {
      path: 'cuentascontables/',
      name: 'Cuentas Contables',
      component: CuentasContables
    },
    {
      path: 'tipoempleadodistribucion/',
      name: 'Tipo Empleado Distribucion',
      component: TipoEmpleadoDist
    },
    {
      path: '/proceso',
      name: 'Historial de Procesos',
      component: Process
    },
    {
      path: '/B1UnidadOrganizacional',
      name: 'Unidades Organizacionales',
      component: B1UnidadOrganizacional
    },
    {
      path: '/B1PEI',
      name: 'PEI',
      component: B1PEI
    },
    {
      path: '/B1PlanEstudios',
      name: 'Programa Academico',
      component: B1PlanEstudios
    },
    {
      path: '/B1Paralelo',
      name: 'Paralelos',
      component: B1Paralelo
    },
    {
      path: '/B1Periodo',
      name: 'Periodos',
      component: B1Periodo
    },
    {
      path: '/B1Proyecto',
      name: 'Proyectos',
      component: B1Proyecto
    },
    {
      path: '/B1BP',
      name: 'Socios de Negocio',
      component: B1BP
    },
    {
      path: '/B1People',
      name: 'Personas SAP',
      component: B1employees
    },
    {
      path: '/instancia',
      name: 'Acciones de Personal',
      component: Contractlist
    },
    {
      path: '/Linkage',
      name: 'Vinculación',
      component: Linkage
    },
    {
      path: '/Dedication',
      name: 'Dedicación',
      component: Dedication
    },
    {
      path: '/CauseDesvinculation',
      name: 'Causa Desvinculación',
      component: CauseDesvinculation
    },
    {
      path: '/AFP',
      name: 'AFPs',
      component: AFP
    },
    {
      path: '/FileState',
      name: 'Estados Archivos',
      component: FileState
    },
    {
      path: '/ProcessState',
      name: 'Estados Procesos',
      component: ProcessState
    },
    {
      path: '/Nombramiento',
      name: 'Nombramientos',
      component: Nombramiento
    },
    {
      path: '/Nombramiento/:id',
      name: 'Nombramiento',
      component: NombramientoDetail
    },
    {
      path: '/Civil',
      name: 'Habilitar personas',
      component: Civil
    },
    {
      path: '/CivilHistorialDocente',
      name: 'Historial Docente',
      component: HistorialCivil
    },
    {
      path: '/ContratosCiviles',
      name: 'Registro Lotes de pago',
      component: ContratosCiviles
    },
    {
      path: '/ContratosCivilesProcesos',
      name: 'Historial de Procesos SARAI',
      component: ContratosCivilesHistory
    },
    {
      path: '/ContratosCivilesAprobacion',
      name: 'Aprobación de Lotes',
      component: ContratosCivilesAprobacion
    },
    {
      path: '/AsesoriaDocente',
      name: 'Historial Pregrado',
      component: Asesoria
    },
    {
      path: '/RegistroTutorias',
      name: 'Registro Pregrado',
      component: RegistroTutoria
    },
    {
      path: '/AprobacionTutorias',
      name: 'Aprobación de lote Pregrado',
      component: AprobacionTutoria
    },
    {
      path: '/RevisionTutorias',
      name: 'Revisión registros Pregrado',
      component: RevisionTutorias
    },
    {
      path: '/BusquedaAvanzada',
      name: 'Búsqueda Avanzada',
      component: BusquedaAvanzada
    },
    {
      path: '/BusquedaIndividual',
      name: 'Búsqueda individual',
      component: RRHHSearch
    },
    {
      path: '/BusquedaGrupal',
      name: 'Búsqueda grupal',
      component: BusquedaGrupal
    },
    {
      path: '/Organigrama',
      name: 'Organigrama',
      component: Organigrama
    },
    {
      path: '/NovedadesAltas',
      name: 'Novedades Altas',
      component: NovedadesAltas
    },
    {
      path: '/NovedadesBajas',
      name: 'Novedades Bajas',
      component: NovedadesBajas
    },
    {
      path: '/TipoTarea',
      name: 'Tipo Tarea',
      component: TipoTarea
    },
    {
      path: '/Modalidades',
      name: 'Modalidades',
      component: Modalidades
    },
    {
      path: '/Interregional',
      name: 'Interregional',
      component: Interregional
    },
    {
      path: '/BajaAdmin',
      name: 'BajaAdmin',
      component: BajaAdmin
    },
    {
      path: '/ListadosPersonal',
      name: 'Listado',
      component: Listado
    },
    {
      path: '/Dependencia',
      name: 'Dependencia',
      component: Dependencia
    },
    {
      path: '/PlanillasInformacion',
      name: 'Información de planillas',
      component: PlanillasInfo
    },
    {
      path: '/Modulos',
      name: 'Consulta de Módulos',
      component: AsesoriaPost
    },
    {
      path: '/RegistroModulos/',
      name: 'Registro Módulos',
      component: RegistroModulos
    },
    {
      path: '/HistorialPostgrado/',
      name: 'Historial Postgrado',
      component: HistorialPostgrado
    },
    {
      path: '/RegistroTutoriasPost',
      name: 'Registro Postgrado',
      component: RegistroTutoriaPost
    },
    {
      path: '/AprobacionTutoriasPost/',
      name: 'Aprobación de lote Postgrado',
      component: AprobacionPost
    },
    {
      path: '/BusquedaAvanzadaPost/',
      name: 'Búsqueda Avanzada',
      component: BusqAvanzadaPost
    },
    {
      path: '/BusquedaFechas/',
      name: 'Búsqueda Fechas',
      component: BusqFechas
    },
    {
      path: '/Ingreso/',
      name: 'Fechas de Ingreso',
      component: Ingreso
    },
    {
      path: '/FechaVacaciones/',
      name: 'Fechas de Vacaciones',
      component: FechaVacaciones
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  Menu,
  {path: '*', component: NotFound}
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  let t = localStorage.getItem('token')
  if (to.name !== 'Login' && (t === null || t === '401')) {
    next({
      path: '/',
      name: 'Login',
      component: Login
    })
  } else {
    next()
  }
})

export default router
