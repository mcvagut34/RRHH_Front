export default [
  {
    name: 'Auth',
    icon: 'fa fa-key',
    collapsed: true,
    children: [{
      name: 'Usuarios',
      path: '/users/'
    },
    {
      name: 'Roles',
      path: '/roles/'
    },
    {
      name: 'Accesos',
      path: '/access/'
    }]
  },
  {
    name: 'Organización',
    icon: 'fa fa-briefcase',
    collapsed: true,
    children: [{
      name: 'Regionales',
      path: '/branches/'
    },
    {
      name: 'Niveles',
      path: '/levels/'
    },
    {
      name: 'Cargos',
      path: '/positions/'
    },
    {
      name: 'Area Desempeño',
      path: '/performancearea/'
    },
    {
      name: 'Unidad Organizacional',
      path: '/organizationalunit/'
    },
    {
      name: 'Dependencia Organigrama',
      path: '/dependency/'
    }]
  },
  {
    name: 'SALOMON',
    icon: 'fa fa-coins',
    collapsed: true,
    children: [{
      name: 'Proceso',
      path: '/distribution/'
    },
    {
      name: 'Grupo Contable',
      path: '/grupocontable/'
    },
    {
      name: 'Tipo Empleado Distribucion',
      path: '/tipoempleadodist/'
    },
    {
      name: 'Cuentas Contables',
      path: '/cuentascontables/'
    }]
  },
  {
    name: 'Empleados',
    icon: 'fa fa-user-tie',
    path: '/employee/'
  }
]
