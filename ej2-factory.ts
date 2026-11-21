// Ejercicio 2 - Patrón Factory Method
// Una fábrica decide qué clase concreta crear según el tipo pedido.

// Clase abstracta: define lo común a todos los equipos.
// No se puede instanciar directamente.
abstract class EquipoInformatico {
  nombre: string;
  ram: number; // en GB
  procesador: string;

  constructor(nombre: string, ram: number, procesador: string) {
    this.nombre = nombre;
    this.ram = ram;
    this.procesador = procesador;
  }

  // Cada subclase está obligada a implementarlo a su manera
  abstract detalles(): string;
}

class Notebook extends EquipoInformatico {
  detalles(): string {
    return `Tipo: Notebook, Nombre: ${this.nombre}, RAM: ${this.ram}GB, Procesador: ${this.procesador}`;
  }
}

class Desktop extends EquipoInformatico {
  detalles(): string {
    return `Tipo: Desktop, Nombre: ${this.nombre}, RAM: ${this.ram}GB, Procesador: ${this.procesador}`;
  }
}

class Servidor extends EquipoInformatico {
  detalles(): string {
    return `Tipo: Servidor, Nombre: ${this.nombre}, RAM: ${this.ram}GB, Procesador: ${this.procesador}`;
  }
}

class EquipoFactory {
  // Devuelve siempre el tipo abstracto: quien llama no conoce la clase concreta
  static crearEquipo(tipo: string, nombre: string, ram: number, procesador: string): EquipoInformatico {
    switch (tipo) {
      case "Notebook":
        return new Notebook(nombre, ram, procesador);
      case "Desktop":
        return new Desktop(nombre, ram, procesador);
      case "Servidor":
        return new Servidor(nombre, ram, procesador);
      default:
        throw new Error(`Tipo de equipo inválido: ${tipo}`);
    }
  }
}

// ----- Prueba -----
const notebook = EquipoFactory.crearEquipo("Notebook", "Dell XPS", 16, "i7");
console.log(notebook.detalles());

const desktop = EquipoFactory.crearEquipo("Desktop", "Lenovo ThinkCentre", 8, "i5");
console.log(desktop.detalles());

const servidor = EquipoFactory.crearEquipo("Servidor", "Dell PowerEdge", 64, "Xeon");
console.log(servidor.detalles());

// Un tipo que no existe lanza un Error
try {
  EquipoFactory.crearEquipo("Tablet", "iPad", 4, "A14");
} catch (error) {
  // En strict, "error" es unknown: verificamos que sea un Error antes de usarlo
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}
