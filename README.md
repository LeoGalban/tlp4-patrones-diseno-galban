# Sistema de Inventario de Equipos Informáticos — Patrones de diseño

Práctica de **Taller de Lenguajes de Programación IV** (TypeScript).
Implementación a mano, sin librerías, de cuatro patrones de diseño: Singleton, Factory Method, Observer y Adapter.

## Requisitos

- Node.js **22.18+** o **23.6+** (ejecuta archivos `.ts` directamente con *type stripping*).
- npm.

## Cómo correrlo

```bash
npm install        # instala TypeScript (solo para chequear tipos)
npm run check      # chequea tipos con tsc --noEmit (modo strict)

npm run ej1        # Singleton
npm run ej2        # Factory Method
npm run ej3        # Observer
npm run ej4        # Adapter
```

También se puede ejecutar cada archivo directamente, por ejemplo `node ej1-singleton.ts`.

> Como Node solo "borra" los tipos, el código no usa `enum`, `namespace` ni *parameter properties* (el `tsconfig.json` lo controla con `erasableSyntaxOnly`).

## Patrones

### 1. Singleton — [`ej1-singleton.ts`](ej1-singleton.ts)

- **Problema que resuelve:** el inventario tiene que ser uno solo en todo el sistema.
- **Dónde está:** la clase `Inventario` tiene el constructor `private` y el método `static obtenerInstancia()`, que crea la instancia la primera vez y después devuelve siempre la misma.
- **Sin el patrón:** cualquiera podría hacer `new Inventario()` y cada parte del programa tendría su propia lista de equipos, sin ver lo que agregan las demás.

Salida:
```
[ { nombre: 'Notebook HP', tipo: 'Portátil', estado: 'disponible' } ]
¿Es la misma instancia? true
```

### 2. Factory Method — [`ej2-factory.ts`](ej2-factory.ts)

- **Problema que resuelve:** crear distintos tipos de equipo sin que el código que los usa conozca las clases concretas.
- **Dónde está:** la clase abstracta `EquipoInformatico` define `detalles()`; `Notebook`, `Desktop` y `Servidor` la extienden. `EquipoFactory.crearEquipo()` elige qué clase crear y siempre devuelve el tipo abstracto. Un tipo inválido lanza un `Error`.
- **Sin el patrón:** habría `new Notebook(...)`, `new Servidor(...)` y `if` repetidos por todo el código; agregar un tipo nuevo obligaría a modificar muchos lugares.

Salida:
```
Tipo: Notebook, Nombre: Dell XPS, RAM: 16GB, Procesador: i7
```

### 3. Observer — [`ej3-observer.ts`](ej3-observer.ts)

- **Problema que resuelve:** avisar automáticamente a varios interesados cuando un equipo cambia de estado.
- **Dónde está:** la interfaz `Observador` define `actualizar()`; `Soporte` y `LogObservador` la implementan. `Equipo` guarda una lista de `Observador` y en `cambiarEstado()` notifica a todos. `Equipo` depende de la interfaz, no de las clases concretas.
- **Sin el patrón:** `Equipo` tendría que llamar directamente a `Soporte`, al log, etc.; cada interesado nuevo obligaría a modificar `Equipo`.

Salida:
```
Soporte notificado: Notebook HP ha cambiado su estado a en reparación.
[LOG] Notebook HP -> en reparación
```

### 4. Adapter — [`ej4-adapter.ts`](ej4-adapter.ts)

- **Problema que resuelve:** usar una clase vieja con una firma incompatible desde un sistema nuevo que espera otra interfaz.
- **Dónde está:** `InventarioViejo.agregarItem()` recibe un texto `"nombre|tipo|estado"`. La interfaz `Inventario` define `agregarEquipo()` y `listarEquipos()`. `AdaptadorInventario` implementa esa interfaz y traduce en ambos sentidos (arma el texto con `|` y lo separa con `split`).
- **Sin el patrón:** habría que reescribir el inventario viejo, o llenar el sistema nuevo de conversiones de texto repetidas en cada lugar que lo use.

Salida:
```
[ { nombre: 'Servidor Dell', tipo: 'Servidor', estado: 'disponible' } ]
```

> Nota: la interfaz `Inventario` del ej4 se llama igual que la clase del ej1, pero no chocan porque cada archivo es un módulo independiente.

## Autor

Leonel Galbán — TLP IV
