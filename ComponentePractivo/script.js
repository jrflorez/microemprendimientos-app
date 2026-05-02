// 🔐 LOGIN
function login() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "admin" && p === "1234") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").classList.remove("oculto");

        inicializar();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

function logout() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("app").classList.add("oculto");
}

// 📌 MOSTRAR SECCIONES
function mostrar(seccion) {
    document.querySelectorAll(".seccion").forEach(s => s.classList.add("oculto"));
    document.getElementById(seccion).classList.remove("oculto");
}

// 🔄 INICIALIZAR (IMPORTANTE)
function inicializar() {
    if (!localStorage.getItem("productos")) localStorage.setItem("productos", JSON.stringify([]));
    if (!localStorage.getItem("clientes")) localStorage.setItem("clientes", JSON.stringify([]));
    if (!localStorage.getItem("ventas")) localStorage.setItem("ventas", JSON.stringify([]));

    cargarProductos();
    cargarClientes();
    cargarVentas();
    actualizarDashboard();
}

// ================= PRODUCTOS =================
function guardarProducto() {
    let nombre = document.getElementById("pNombre");
    let precio = document.getElementById("pPrecio");

    if (!nombre.value || !precio.value) return;

    let productos = JSON.parse(localStorage.getItem("productos"));
    productos.push({ nombre: nombre.value, precio: Number(precio.value) });

    localStorage.setItem("productos", JSON.stringify(productos));

    nombre.value = "";
    precio.value = "";

    cargarProductos();
    actualizarDashboard();
}

function cargarProductos() {
    let lista = document.getElementById("listaProductos");
    let select = document.getElementById("vProducto");

    lista.innerHTML = "";
    select.innerHTML = "";

    let productos = JSON.parse(localStorage.getItem("productos"));

    productos.forEach((p, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${p.nombre} - $${p.precio}
        <button onclick="eliminarProducto(${i})">❌</button>`;
        lista.appendChild(li);

        let option = document.createElement("option");
        option.value = i;
        option.textContent = p.nombre;
        select.appendChild(option);
    });
}

function eliminarProducto(i) {
    let productos = JSON.parse(localStorage.getItem("productos"));
    productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
    actualizarDashboard();
}

// ================= CLIENTES =================
function guardarCliente() {
    let input = document.getElementById("cNombre");

    if (!input.value) return;

    let clientes = JSON.parse(localStorage.getItem("clientes"));
    clientes.push({ nombre: input.value });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    input.value = "";

    cargarClientes();
}

function cargarClientes() {
    let lista = document.getElementById("listaClientes");
    let select = document.getElementById("vCliente");

    lista.innerHTML = "";
    select.innerHTML = "";

    let clientes = JSON.parse(localStorage.getItem("clientes"));

    clientes.forEach((c, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${c.nombre}
        <button onclick="eliminarCliente(${i})">❌</button>`;
        lista.appendChild(li);

        let option = document.createElement("option");
        option.value = i;
        option.textContent = c.nombre;
        select.appendChild(option);
    });
}

function eliminarCliente(i) {
    let clientes = JSON.parse(localStorage.getItem("clientes"));
    clientes.splice(i, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    cargarClientes();
}

// ================= VENTAS =================
function registrarVenta() {
    let cantidad = document.getElementById("vCantidad");

    if (!cantidad.value) return;

    let productos = JSON.parse(localStorage.getItem("productos"));
    let clientes = JSON.parse(localStorage.getItem("clientes"));
    let ventas = JSON.parse(localStorage.getItem("ventas"));

    let producto = productos[document.getElementById("vProducto").value];
    let cliente = clientes[document.getElementById("vCliente").value];

    ventas.push({
        producto: producto.nombre,
        cliente: cliente.nombre,
        total: producto.precio * cantidad.value
    });

    localStorage.setItem("ventas", JSON.stringify(ventas));

    cantidad.value = "";

    cargarVentas();
    actualizarDashboard();
}

function cargarVentas() {
    let lista = document.getElementById("listaVentas");
    lista.innerHTML = "";

    let ventas = JSON.parse(localStorage.getItem("ventas"));

    ventas.forEach((v, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${v.producto} → ${v.cliente} = $${v.total}
        <button onclick="eliminarVenta(${i})">❌</button>`;
        lista.appendChild(li);
    });
}

function eliminarVenta(i) {
    let ventas = JSON.parse(localStorage.getItem("ventas"));
    ventas.splice(i, 1);
    localStorage.setItem("ventas", JSON.stringify(ventas));
    cargarVentas();
    actualizarDashboard();
}

// ================= DASHBOARD =================
function actualizarDashboard() {
    let productos = JSON.parse(localStorage.getItem("productos"));
    let ventas = JSON.parse(localStorage.getItem("ventas"));

    let total = ventas.reduce((sum, v) => sum + v.total, 0);

    document.getElementById("totalProductos").textContent = productos.length;
    document.getElementById("totalVentas").textContent = ventas.length;
    document.getElementById("ingresos").textContent = total;
}