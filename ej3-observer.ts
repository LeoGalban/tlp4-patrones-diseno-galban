// Ejercicio 3 - Patrón Observer
// Cuando un equipo cambia de estado, avisa automáticamente a todos sus observadores.

// Contrato que debe cumplir cualquier observador
interface Observador {
  actualizar(nombreEquipo: string, nuevoEstado: string): void;
}

// Observador concreto 1: el área de soporte
class Soporte implements Observador {
  actualizar(nombreEquipo: string, nuevoEstado: string): void {
    console.log(`Soporte notificado: ${nombreEquipo} ha cambiado su estado a ${nuevoEstado}.`);
  }
}

// Observador concreto 2: un registro (log) de cambios
class LogObservador implements Observador {
  actualizar(nombreEquipo: string, nuevoEstado: string): void {
    console.log(`[LOG] ${nombreEquipo} -> ${nuevoEstado}`);
  }
}

// El sujeto observado. Solo conoce la INTERFAZ Observador, no a Soporte ni a LogObservador.
class Equipo {
  nombre: string;
  estado: string;
  private observadores: Observador[] = [];

  constructor(nombre: string, estado: string) {
    this.nombre = nombre;
    this.estado = estado;
  }

  agregarObservador(observador: Observador): void {
    this.observadores.push(observador);
  }

  cambiarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
    this.notificar();
  }

  // Recorre la lista y avisa a cada observador
  private notificar(): void {
    for (const observador of this.observadores) {
      observador.actualizar(this.nombre, this.estado);
    }
  }
}

// ----- Prueba -----
const notebook = new Equipo("Notebook HP", "disponible");

notebook.agregarObservador(new Soporte());
// Agregamos un segundo observador sin tocar la clase Equipo
notebook.agregarObservador(new LogObservador());

notebook.cambiarEstado("en reparación");
