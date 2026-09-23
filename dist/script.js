const projects = {
  conversa: { kicker: "Automatización · Producto destacado", title: "Conversa", description: "Una plataforma multiempresa que conecta atención, ventas, CRM, catálogo y agenda con canales de mensajería y operación humana.", capabilities: ["Bandeja y transferencia a asesores", "Catálogo, pedidos, agenda y CRM", "Flujos versionados y automatizaciones", "Colas persistentes, OCR y auditoría"], tech: "React, TypeScript, Vinext, PostgreSQL, Drizzle, Baileys y Cloudflare.", link: "https://github.com/RafaelPinto123/WhatsappBot" },
  pricewatch: { kicker: "Finanzas operativas · Producto destacado", title: "PriceWatch", description: "Compara cotizaciones reales, normaliza costos y explica qué proveedor ofrece el mejor margen para cada recarga digital.", capabilities: ["Cálculo de costo y ganancia neta", "Reglas de fiabilidad y vigencia", "Historial persistente y alertas", "Importación de catálogos autorizados"], tech: "React 19, TypeScript, Vinext, Cloudflare D1 y Drizzle.", link: "" },
  store: { kicker: "Comercio · Plataforma", title: "Store Template", description: "Arquitectura reutilizable para tiendas, inventario y punto de venta con una base operativa lista para personalizar.", capabilities: ["Inventario y movimientos", "Punto de venta y administración", "Autenticación segura con cookies", "Métricas, healthchecks y respaldos"], tech: "Laravel, React, Vite, PostgreSQL, Caddy y Docker.", link: "" },
  cuentave: { kicker: "Finanzas · Aplicación empresarial", title: "CuentaVE", description: "Sistema contable diseñado para profesionales y firmas venezolanas, con organizaciones, expedientes, documentos y motor contable.", capabilities: ["Libros, dimensiones y automatizaciones", "Cierres y consolidación asistida", "Importación validada", "Documentos privados y gobierno de datos"], tech: "React 19, TypeScript, Vinext, D1, R2, Drizzle y Zod.", link: "" },
  superpanel: { kicker: "Operaciones · Plataforma", title: "Superpanel", description: "Panel integral para agencias, equipos y operaciones de contenido con una API moderna y servicios en tiempo real.", capabilities: ["Roles, turnos, metas y multas", "Reportes y diarios", "Colas de contenido y entregas", "OpenAPI, GraphQL y WebSocket"], tech: "Node.js, TypeScript, Fastify, PostgreSQL, Mercurius y React.", link: "" },
  doomstore: { kicker: "Comercio · Operación", title: "DoomStore", description: "Sistema de ventas e inventario con panel administrativo, punto de venta y herramientas de producción observables.", capabilities: ["Inventario y ventas", "Colas y tareas programadas", "Métricas Prometheus", "Despliegue y rollback documentados"], tech: "Laravel, React, PostgreSQL, Caddy y Docker.", link: "https://github.com/RafaelPinto123/doom" },
  tradingbot: { kicker: "Finanzas · Automatización", title: "TradingBot", description: "Simulador de futuros BTCUSDT centrado en trazabilidad, control de riesgo y fidelidad de los datos de mercado.", capabilities: ["Posiciones long y short simuladas", "Funding, comisiones y liquidaciones", "Backtesting y selección evolutiva", "Persistencia y auditoría local"], tech: "Python 3.11+, WebSocket, SQLite y Docker.", link: "" },
  bank: { kicker: "Fintech · Microservicio", title: "BankConecter", description: "Servicio de solo lectura para verificar pagos recibidos sin compartir credenciales bancarias con cada aplicación consumidora.", capabilities: ["API con Bearer token", "Credenciales cifradas con AES-256-GCM", "Verificación y deduplicación", "Catálogo de 27 instituciones venezolanas"], tech: "Node.js, Playwright, SQLite y OpenAPI.", link: "" },
  rifas: { kicker: "Comercio · Full-stack", title: "Charlie Sorteos", description: "Plataforma para vender boletos de rifas con pagos, inventario consistente y herramientas privadas de operación.", capabilities: ["10.000 números sin duplicados", "Reservas y liberación automática", "Aprobación, reembolsos y auditoría", "Cupones, ganadores y conciliación CSV"], tech: "React, Node.js, SQLite y Docker.", link: "" },
  chatapp: { kicker: "Comunicación · Plataforma", title: "ChatApp", description: "Aplicación de mensajería con cliente web moderno y servicios aislados para datos, proxy y despliegue.", capabilities: ["Experiencia de chat web", "Estado global y consultas", "Servicios reproducibles", "Respaldo y restauración de datos"], tech: "Next.js, Apollo Client, Redux Toolkit, PostgreSQL y Docker.", link: "" },
  rtg: { kicker: "Comercio digital · Plataforma", title: "RecargaTuGift", description: "Sistema para operar recargas y productos digitales con panel de administración, tiempo real y controles de seguridad.", capabilities: ["Catálogo y operación de recargas", "Panel administrativo", "Eventos en tiempo real", "Autenticación moderna con passkeys"], tech: "Laravel, React, Pusher, Passkeys y Vite.", link: "" },
  fibonacci: { kicker: "Operaciones · Ecosistema", title: "Fibonacci / Ivan", description: "Conjunto de paneles, APIs y automatizaciones que evolucionó desde una aplicación heredada hacia servicios más separados y mantenibles.", capabilities: ["Panel de gestión por roles", "Sincronización en tiempo real", "Medios y Google Drive", "Bots y colas de contenido"], tech: "React, Node.js, PostgreSQL, WebSocket y Google APIs.", link: "" }
};

const cards = [...document.querySelectorAll("[data-category]")];
const filters = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#searchInput");
const visibleCount = document.querySelector("#visibleCount");
const emptyState = document.querySelector("#emptyState");
let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;
  cards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category.includes(activeFilter);
    const matchesSearch = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  visibleCount.textContent = String(count).padStart(2, "0");
  emptyState.hidden = count !== 0;
}

filters.forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle("active", item === button));
  applyFilters();
}));
searchInput.addEventListener("input", applyFilters);

const dialog = document.querySelector("#projectDialog");
const closeDialog = document.querySelector(".dialog-close");
document.querySelectorAll("button[data-project]").forEach((button) => button.addEventListener("click", () => {
  const project = projects[button.dataset.project];
  if (!project) return;
  document.querySelector("#dialogKicker").textContent = project.kicker;
  document.querySelector("#dialogTitle").textContent = project.title;
  document.querySelector("#dialogDescription").textContent = project.description;
  document.querySelector("#dialogCapabilities").innerHTML = project.capabilities.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#dialogTech").textContent = project.tech;
  const link = document.querySelector("#dialogLink");
  link.hidden = !project.link;
  if (project.link) link.href = project.link;
  dialog.showModal();
}));
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});
