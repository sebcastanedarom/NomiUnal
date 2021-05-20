create database nomina;
use nomina;

create table tiposcontratos(
	id_tipo INT NOT NULL,
	descripcion VARCHAR(50),
	PRIMARY KEY(id_tipo)
);

create table contratos(
	id_contrato INT NOT NULL,
	id_tipocontrato INT NOT NULL,
	salario INT NOT NULL,
	fecha_ini DATE,
	fecha_fin DATE,
    contrato VARCHAR(50),
	PRIMARY KEY(id_contrato),
	FOREIGN KEY(id_tipocontrato) REFERENCES tiposcontratos(id_tipo)	
);
create table cargos(
	id_cargo INT NOT NULL,
	nombre_cargo VARCHAR(50),
	descripcion_cargo VARCHAR(50),
	PRIMARY KEY(id_cargo)
);
create table areas(
	id_area INT NOT NULL,
	nombre_area VARCHAR(50),
	descripcion_area VARCHAR(50),
	responsable_area VARCHAR(50),
	PRIMARY KEY(id_area)
);

create table horarios(
	id_horario INT NOT NULL,
	tipo_horario VARCHAR(50), 
	hora_llegada TIME,
	hora_salida TIME,
	PRIMARY KEY(id_horario)
);

create table bancos(
	id_banco  INT NOT NULL,
	nombre_banco VARCHAR(50), 
	nit_banco VARCHAR(50), 
	PRIMARY KEY(id_banco)
);


create table cuentas(
	id_cuenta INT NOT NULL,
	id_banco INT NOT NULL,
	numero_cuenta VARCHAR(50), 
	tipo_cuenta VARCHAR(50), 
	PRIMARY KEY (id_cuenta),
	FOREIGN KEY(id_banco) REFERENCES bancos(id_banco)
);

create table roles(
	id_rol INT NOT NULL,
	tipo_rol VARCHAR(50),
	PRIMARY KEY (id_rol)
);
create table empleados(
	id_empleado INT NOT NULL,
	id_rol INT NOT NULL, 
	id_cuenta INT NOT NULL,
	id_contrato INT NOT NULL,
	id_area INT NOT NULL,
	id_cargo INT NOT NULL,
	id_horario INT NOT NULL,
	nombre VARCHAR(50),
	apellido VARCHAR(50),
	identificacion INT NOT NULL,
	tipo_identificacion VARCHAR(50),
    contraseña VARCHAR(50) NOT NULL,
	edad INT NOT NULL,
	direccion VARCHAR(50),
	telefono VARCHAR(50),
	foto VARCHAR(50),
	fecha_ingreso DATE,
	activo BOOLEAN,
	fecha_salida DATE,
    arl VARCHAR(50),
    eps VARCHAR(50),
    afp VARCHAR(50),
    certificadoArl VARCHAR(50),
    certificadoEps VARCHAR(50),
    certificadoAfp VARCHAR(50),
	PRIMARY KEY (id_empleado),
	FOREIGN KEY(id_rol) REFERENCES roles(id_rol),
	FOREIGN KEY(id_cuenta) REFERENCES cuentas(id_cuenta),
	FOREIGN KEY(id_contrato) REFERENCES contratos(id_contrato),
	FOREIGN KEY(id_area) REFERENCES areas(id_area),
	FOREIGN KEY(id_cargo) REFERENCES cargos(id_cargo),
	FOREIGN KEY(id_horario) REFERENCES horarios(id_horario)
);

create table deducciones(
	id_deducccion INT NOT NULL,
	descripcion VARCHAR(50),
	valor FLOAT,
	PRIMARY KEY(id_deducccion)	
);

create table percepciones(
	id_percepcion INT NOT NULL,
	descripcion VARCHAR(50),	
	valor FLOAT,
	PRIMARY KEY(id_percepcion)
);

create table recibos(
	id_recibo INT NOT NULL,
	id_empleado INT NOT NULL,
	id_deduccion INT NOT NULL,
	id_precepcion INT NOT NULL,
	fecha DATE,
	periodo_pago  VARCHAR(50),
	valor_total VARCHAR(50),
	PRIMARY KEY(id_recibo),
	FOREIGN KEY(id_empleado) REFERENCES empleados(id_empleado),
	FOREIGN KEY(id_deduccion) REFERENCES deducciones(id_deducccion),
	FOREIGN KEY(id_precepcion) REFERENCES percepciones(id_percepcion)
);







