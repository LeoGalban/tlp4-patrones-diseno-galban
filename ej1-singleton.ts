// Ejercicio 1 - Patrón Singleton
// Garantiza que exista UNA sola instancia de Inventario en todo el programa.

// Forma que tiene cada equipo del inventario
type Equipo = {
  nombre: string;
  tipo: string;
  estado: string;
};

class Inventario {
  // Acá se guarda la única instancia (al principio no existe)
  private static instancia: Inventario | null = null;

  private equipos: Equipo[] = [];

  // Constructor privado: nadie puede hacer "new Inventario()" desde afuera
  private constructor() {}

  // Único punto de acceso: crea la instancia la primera vez y después la reutiliza
  static obtenerInstancia(): Inventario {
    if (Inventario.instancia === null) {
      Inventario.instancia = new Inventario();
    }
    return Inventario.instancia;
  }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.equipos.push({ nombre, tipo, estado });
  }

  // Devuelve una copia para que nadie modifique la lista interna desde afuera
  listarEquipos(): Equipo[] {
    return [...this.equipos];
  }
}

// ----- Prueba -----
const inventario1 = Inventario.obtenerInstancia();
const inventario2 = Inventario.obtenerInstancia();

inventario1.agregarEquipo("Notebook HP", "Portátil", "disponible");

// inventario2 ve el equipo agregado por inventario1 porque son el mismo objeto
console.log(inventario2.listarEquipos());
console.log("¿Es la misma instancia?", inventario1 === inventario2);

// const otro = new Inventario(); // Error de compilación: el constructor es privado
