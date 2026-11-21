// Ejercicio 4 - Patrón Adapter
// Permite usar una clase vieja (con otra "forma") a través de la interfaz que espera el sistema nuevo.

// Aclaración: la interfaz "Inventario" se llama igual que la clase del ej1,
// pero no chocan porque cada archivo es un módulo independiente.

type Equipo = {
  nombre: string;
  tipo: string;
  estado: string;
};

// Lo que espera el sistema NUEVO
interface Inventario {
  agregarEquipo(nombre: string, tipo: string, estado: string): void;
  listarEquipos(): Equipo[];
}

// Sistema VIEJO: guarda cada equipo como un texto "nombre|tipo|estado".
// No lo modificamos: lo usamos tal como está.
class InventarioViejo {
  private items: string[] = [];

  agregarItem(registro: string): void {
    this.items.push(registro);
  }

  obtenerItems(): string[] {
    return [...this.items];
  }
}

// El adaptador cumple la interfaz nueva y por dentro usa el inventario viejo
class AdaptadorInventario implements Inventario {
  private inventarioViejo: InventarioViejo;

  constructor(inventarioViejo: InventarioViejo) {
    this.inventarioViejo = inventarioViejo;
  }

  // Traduce: datos sueltos -> texto "nombre|tipo|estado"
  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.inventarioViejo.agregarItem(`${nombre}|${tipo}|${estado}`);
  }

  // Traduce: texto "nombre|tipo|estado" -> objeto Equipo
  listarEquipos(): Equipo[] {
    return this.inventarioViejo.obtenerItems().map((registro) => {
      const [nombre = "", tipo = "", estado = ""] = registro.split("|");
      return { nombre, tipo, estado };
    });
  }
}

// ----- Prueba -----
// El sistema nuevo solo conoce la interfaz Inventario
const inventario: Inventario = new AdaptadorInventario(new InventarioViejo());

inventario.agregarEquipo("Servidor Dell", "Servidor", "disponible");
console.log(inventario.listarEquipos());
