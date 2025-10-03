class SolitarioKlondike {
    constructor() {
        this.columnas = 7;
        this.movimientos = 0;
        this.tiempo = 0;
        this.temporizador = null;
        this.cartas = [];
        this.mazo = [];
        this.descarte = [];
        this.pilasFinalizacion = [[], [], [], []];
        this.tablero = Array.from({ length: this.columnas }, () => []);
        this.cartaSeleccionada = null;
        this.historial = [];
        this.juegoIniciado = false;

        // Defensa: ocultar pantallas por si el HTML las dejó visibles
        const victoryEl = document.getElementById('victory-screen');
        if (victoryEl) victoryEl.classList.add('message-hidden');
        const messageEl = document.getElementById('message-container');
        if (messageEl) messageEl.classList.add('message-hidden');

        this.inicializarJuego();
        this.iniciarTemporizador();
        this.juegoIniciado = true;
    }

    /* ----------------- creación de mazo / datos ----------------- */
    getDatosCartasPersonalizadas() {
        return {
            // REYES
            'K-corazones': { 
                tipo: 'foto', 
                imagen: 'images/reyes/corazones.png',
            },
            'K-diamantes': { 
                tipo: 'foto', 
                imagen: 'images/reyes/diamantes.png',
            },
            'K-treboles': { 
                tipo: 'foto', 
                imagen: 'images/reyes/treboles.png',
            },
            'K-picas': { 
                tipo: 'foto', 
                imagen: 'images/reyes/picas.png',
            },

            // REINAS
            'Q-corazones': { 
                tipo: 'foto', 
                imagen: 'images/reinas/corazones.png',
            },
            'Q-diamantes': { 
                tipo: 'foto', 
                imagen: 'images/reinas/diamantes.png',
            },
            'Q-treboles': { 
                tipo: 'foto', 
                imagen: 'images/reinas/treboles.png',
            },
            'Q-picas': { 
                tipo: 'foto', 
                imagen: 'images/reinas/picas.png',
            },

            // JACKS
            'J-corazones': { 
                tipo: 'foto', 
                imagen: 'images/jacks/corazones.png',
            },
            'J-diamantes': { 
                tipo: 'foto', 
                imagen: 'images/jacks/diamantes.png',
            },
            'J-treboles': { 
                tipo: 'foto', 
                imagen: 'images/jacks/treboles.png',
            },
            'J-picas': { 
                tipo: 'foto', 
                imagen: 'images/jacks/picas.png',
            },

            // ASES
            'A-corazones': { 
                tipo: 'mensaje', 
                imagen: 'images/ases/corazones.png',
            },
            'A-diamantes': { 
                tipo: 'mensaje', 
                imagen: 'images/ases/diamantes.png',
            },
            'A-treboles': { 
                tipo: 'mensaje', 
                imagen: 'images/ases/treboles.png',
            },
            'A-picas': { 
                tipo: 'mensaje', 
                imagen: 'images/ases/picas.png',
            },

            // NÚMEROS
            '2-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/2s/corazones.png',
                año: 1,
            },
            '2-diamantes': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/2s/diamantes.png',
                año: 1,
            },
            '2-treboles': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/2s/treboles.png',
                año: 1,
            },
            '2-picas': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/2s/picas.png',
                año: 1,
            },

            '3-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/3s/corazones.png',
                año: 2,
            },
            '3-diamantes': { 
                tipo: 'aniversario', 
                imagen: 'images/numeros/3s/diamantes.png',
                año: 2,
            },
            '3-treboles': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/3s/treboles.png',
                año: 2,
            },
            '3-picas': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/3s/picas.png',
                año: 2,
            },

            '4-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/4s/corazones.png',
                año: 3,
            },
            '4-diamantes': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/4s/diamantes.png',
                año: 3,
            },

            '5-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/5s/corazones.png',
                año: 4,
            },

            '6-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/6s/corazones.png',
                año: 5,
            },

            '7-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/7s/corazones.png',
                año: 6,
            },

            '8-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/8s/corazones.png',
                año: 7,
            },

            '9-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/9s/corazones.png',
                año: 8,
            },

            '10-corazones': { 
                tipo: 'aniversario',
                imagen: 'images/numeros/10s/corazones.png',
                año: 9,
            },

            // Agrega aquí el resto de cartas numéricas que necesites...
            '4-treboles': { tipo: 'numero', imagen: 'images/numeros/4s/treboles.png', mensaje: 'Estabilidad' },
            '4-picas': { tipo: 'numero', imagen: 'images/numeros/4s/picas.png', mensaje: 'Fortaleza' },
            '5-diamantes': { tipo: 'numero', imagen: 'images/numeros/5s/diamantes.png', mensaje: 'Brillo' },
            '5-treboles': { tipo: 'numero', imagen: 'images/numeros/5s/treboles.png', mensaje: 'Suerte' },
            '5-picas': { tipo: 'numero', imagen: 'images/numeros/5s/picas.png', mensaje: 'Fuerza' },
            '6-diamantes': { tipo: 'numero', imagen: 'images/numeros/6s/diamantes.png', mensaje: 'Perfección' },
            '6-treboles': { tipo: 'numero', imagen: 'images/numeros/6s/treboles.png', mensaje: 'Armonía' },
            '6-picas': { tipo: 'numero', imagen: 'images/numeros/6s/picas.png', mensaje: 'Equilibrio' },
            '7-diamantes': { tipo: 'numero', imagen: 'images/numeros/7s/diamantes.png', mensaje: 'Fortuna' },
            '7-treboles': { tipo: 'numero', imagen: 'images/numeros/7s/treboles.png', mensaje: 'Bendición' },
            '7-picas': { tipo: 'numero', imagen: 'images/numeros/7s/picas.png', mensaje: 'Misterio' },
            '8-diamantes': { tipo: 'numero', imagen: 'images/numeros/8s/diamantes.png', mensaje: 'Abundancia' },
            '8-treboles': { tipo: 'numero', imagen: 'images/numeros/8s/treboles.png', mensaje: 'Crecimiento' },
            '8-picas': { tipo: 'numero', imagen: 'images/numeros/8s/picas.png', mensaje: 'Poder' },
            '9-diamantes': { tipo: 'numero', imagen: 'images/numeros/9s/diamantes.png', mensaje: 'Sabiduría' },
            '9-treboles': { tipo: 'numero', imagen: 'images/numeros/9s/treboles.png', mensaje: 'Experiencia' },
            '9-picas': { tipo: 'numero', imagen: 'images/numeros/9s/picas.png', mensaje: 'Madurez' },
            '10-diamantes': { tipo: 'numero', imagen: 'images/numeros/10s/diamantes.png', mensaje: 'Éxito' },
            '10-treboles': { tipo: 'numero', imagen: 'images/numeros/10s/treboles.png', mensaje: 'Completitud' },
            '10-picas': { tipo: 'numero', imagen: 'images/numeros/10s/picas.png', mensaje: 'Logro' }
        };
    }

    crearMazoPersonalizado() {
        const datosCartas = this.getDatosCartasPersonalizadas();
        const mazo = [];
        const palos = ['corazones', 'diamantes', 'treboles', 'picas'];
        const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (let palo of palos) {
            for (let valor of valores) {
                const clave = `${valor}-${palo}`;
                const datos = datosCartas[clave] || {
                    tipo: 'numero',
                    contenido: `Cada momento contigo es único y especial`,
                    imagen: `images/numeros/${valor}s/${palo}.png`
                };

                mazo.push({
                    id: clave,
                    valor: valor,
                    palo: palo,
                    caraArriba: false,
                    datosPersonalizados: datos
                });
            }
        }

        return this.mezclarMazo(mazo);
    }

    mezclarMazo(mazo) {
        for (let i = mazo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
        }
        return mazo;
    }

    /* ----------------- inicialización y UI ----------------- */
    inicializarJuego() {
        this.cartas = this.crearMazoPersonalizado();
        this.repartirCartasIniciales();
        this.crearInterfaz();
    }

    repartirCartasIniciales() {
        let cartaIndex = 0;

        for (let col = 0; col < this.columnas; col++) {
            for (let fila = 0; fila <= col; fila++) {
                if (cartaIndex < this.cartas.length) {
                    const carta = this.cartas[cartaIndex];
                    carta.caraArriba = (fila === col);
                    this.tablero[col].push(carta);
                    cartaIndex++;
                }
            }
        }

        this.mazo = this.cartas.slice(cartaIndex);
    }

    crearInterfaz() {
        this.crearTablero();
        this.actualizarMazoYDescarte();
        this.actualizarPilasFinalizacion();
        this.agregarEventListeners();
        this.actualizarUI();
    }

    crearTablero() {
        const tableau = document.getElementById('tableau');
        if (!tableau) return;
        tableau.innerHTML = '';

        for (let i = 0; i < this.columnas; i++) {
            const columna = document.createElement('div');
            columna.className = 'column';
            columna.dataset.columna = i;
            columna.addEventListener('dragover', this.permitirSoltar.bind(this));
            columna.addEventListener('drop', this.soltarCarta.bind(this));

            this.tablero[i].forEach((carta, index) => {
                columna.appendChild(this.crearElementoCarta(carta, 'tablero', i, index));
            });

            tableau.appendChild(columna);
        }
    }

    crearElementoCarta(carta, ubicacion, columnaIdx, cartaIdx) {
    const elementoCarta = document.createElement('div');
    elementoCarta.className = `card ${carta.caraArriba ? 'card-face-up' : 'card-face-down'}`;
    elementoCarta.dataset.id = carta.id;
    elementoCarta.dataset.ubicacion = ubicacion;
    elementoCarta.dataset.columna = columnaIdx;
    elementoCarta.dataset.indice = cartaIdx;
    elementoCarta.style.top = `${cartaIdx * 25}px`;

    if (carta.caraArriba) {
        if (carta.datosPersonalizados && carta.datosPersonalizados.imagen) {
            elementoCarta.style.backgroundImage = `url('${carta.datosPersonalizados.imagen}')`;
        }
        elementoCarta.style.backgroundSize = 'cover';
        elementoCarta.style.backgroundPosition = 'center';

        elementoCarta.draggable = true;
        elementoCarta.addEventListener('dragstart', this.iniciarArrastre.bind(this));
        elementoCarta.addEventListener('dblclick', this.intentarMoverAFinalizacion.bind(this));

        // 👇 NUEVO: efecto hover "levantar carta"
        elementoCarta.addEventListener("mouseenter", (e) => {
            e.currentTarget.style.transform = "translateY(-15px)";
            e.currentTarget.style.zIndex = "1000";
        });

        elementoCarta.addEventListener("mouseleave", (e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.zIndex = "";
        });
    } else {
        elementoCarta.style.backgroundImage = 'url("images/reverso-carta.png")';
        elementoCarta.style.backgroundSize = 'cover';
        elementoCarta.style.backgroundPosition = 'center';
    }

    elementoCarta.addEventListener('click', this.manejarClicCarta.bind(this));
    return elementoCarta;
}


    /* ----------------- drag & drop / movimientos ----------------- */
    iniciarArrastre(evento) {
        const cartaId = evento.target.dataset.id;
        const ubicacion = evento.target.dataset.ubicacion;
        const columnaIdx = parseInt(evento.target.dataset.columna);
        const cartaIdx = parseInt(evento.target.dataset.indice);

        this.cartaSeleccionada = {
            id: cartaId,
            ubicacion: ubicacion,
            columna: columnaIdx,
            indice: cartaIdx
        };

        evento.dataTransfer.setData('text/plain', JSON.stringify(this.cartaSeleccionada));
    }

    permitirSoltar(evento) {
        evento.preventDefault();
        evento.currentTarget.classList.add('drop-zone');
    }

    soltarCarta(evento) {
        evento.preventDefault();
        evento.currentTarget.classList.remove('drop-zone');

        try {
            const datos = JSON.parse(evento.dataTransfer.getData('text/plain'));
            const columnaDestino = parseInt(evento.currentTarget.dataset.columna);
            this.moverCarta(datos, columnaDestino);
        } catch (err) {
            console.error('Error al leer datos del drag:', err);
        }
    }

    moverCarta(datosOrigen, columnaDestino) {
        const columnaOrigen = this.obtenerColumna(datosOrigen);
        if (!columnaOrigen) return;

        const cartasAMover = this.obtenerCartasMovibles(columnaOrigen, datosOrigen.indice);
        if (cartasAMover.length === 0) return;

        if (this.esMovimientoValidoTablero(cartasAMover[0], columnaDestino)) {
            this.realizarMovimiento(columnaOrigen, columnaDestino, datosOrigen.indice);
            this.movimientos++;
            this.voltearUltimaCarta(columnaOrigen);
            this.actualizarUI();
            this.verificarVictoria();
        }
    }

    robarCarta() {
        if (this.mazo.length > 0) {
            const carta = this.mazo.pop();
            carta.caraArriba = true;
            this.descarte.push(carta);
            this.mostrarMensajeEspecial(carta);
            this.actualizarUI();
        } else {
            this.mazo = [...this.descarte].reverse();
            this.mazo.forEach(carta => carta.caraArriba = false);
            this.descarte = [];
            this.actualizarUI();
        }
    }

    robarCartas(cantidad = 1) {
        if (this.mazo.length === 0) {
            // Reiniciar mazo desde descarte
            this.mazo = [...this.descarte].reverse();
            this.mazo.forEach(carta => carta.caraArriba = false);
            this.descarte = [];
            this.actualizarUI();
            return;
        }
    
        for (let i = 0; i < cantidad && this.mazo.length > 0; i++) {
            const carta = this.mazo.pop();
            carta.caraArriba = true;
            this.descarte.push(carta);
            this.mostrarMensajeEspecial(carta);
        }
    
        this.actualizarUI();
    }
    

    mostrarMensajeEspecial(carta) {
        const datos = carta.datosPersonalizados || {};
        const titleEl = document.getElementById('message-title');
        const contentEl = document.getElementById('message-content');
        const photoEl = document.getElementById('message-photo');

        if (titleEl) titleEl.textContent = datos.titulo || '';
        if (contentEl) contentEl.textContent = datos.contenido || datos.mensaje || '';
        if (photoEl) {
            if (datos.imagen) {
                photoEl.src = datos.imagen;
                photoEl.style.display = 'block';
            } else {
                photoEl.style.display = 'none';
            }
        }

        const container = document.getElementById('message-container');
        if (container) container.classList.remove('message-hidden');
    }

    // CORRECCIÓN: nombre correcto
    intentarMoverAFinalizacion(evento) {
        const cartaId = evento.currentTarget.dataset.id;
        const ubicacion = evento.currentTarget.dataset.ubicacion;
        const columnaIdx = parseInt(evento.currentTarget.dataset.columna);
        const cartaIdx = parseInt(evento.currentTarget.dataset.indice);

        const datos = {
            id: cartaId,
            ubicacion: ubicacion,
            columna: columnaIdx,
            indice: cartaIdx
        };

        for (let i = 0; i < 4; i++) {
            if (this.moverAFinalizacion(datos, i)) {
                break;
            }
        }
    }

    manejarClicCarta(evento) {
        if (evento.currentTarget.dataset.ubicacion === 'stock') {
            const selector = document.getElementById('cantidad-robar');
            const cantidad = selector ? parseInt(selector.value) : 1;
            this.robarCartas(cantidad);
        }
    }
    

    /* ----------------- victoria ----------------- */
    verificarVictoria() {
        // No comprobar hasta que realmente se haya jugado
        if (!this.juegoIniciado) return;
    
        // Solo hay victoria si TODAS las pilas tienen 13 cartas
        const todasCompletas = this.pilasFinalizacion.every(pila => pila.length === 13);
    
        if (todasCompletas) {
            console.log("🎉 ¡VICTORIA!");
            clearInterval(this.temporizador);
            setTimeout(() => this.mostrarVictoria(), 300);
        }
    }
    

    mostrarVictoria() {
        clearInterval(this.temporizador);
        const vm = document.getElementById('victory-moves');
        const vt = document.getElementById('victory-time');
        const vs = document.getElementById('victory-score');

        if (vm) vm.textContent = this.movimientos;
        if (vt) vt.textContent = `${this.tiempo}s`;
        if (vs) vs.textContent = this.calcularPuntuacion();

        victory.classList.remove("message-hidden");
        victory.style.display = "block";

    }

    calcularPuntuacion() {
        const base = 1000;
        const bonusTiempo = Math.max(0, 1000 - this.tiempo * 2);
        const bonusMovimientos = Math.max(0, 500 - this.movimientos);
        return base + bonusTiempo + bonusMovimientos;
    }

    actualizarUI() {
        this.crearTablero();
        this.actualizarMazoYDescarte();
        this.actualizarPilasFinalizacion();
        const mov = document.getElementById('movimientos');
        const tiem = document.getElementById('tiempo');
        const stockCount = document.getElementById('stock-count');
        if (mov) mov.textContent = `Movimientos: ${this.movimientos}`;
        if (tiem) tiem.textContent = `Tiempo: ${this.tiempo}s`;
        if (stockCount) stockCount.textContent = this.mazo.length;
    }

    actualizarMazoYDescarte() {
        const stock = document.getElementById('stock');
        const waste = document.getElementById('waste');
        if (stock) stock.onclick = this.robarCarta.bind(this);
    
        if (waste) {
            waste.innerHTML = '';
            waste.style.position = 'relative'; // Asegura que las cartas absolutas se apilen dentro
    
            const maxMostrar = 3; // Solo mostrar las últimas 3 cartas
            const inicio = Math.max(this.descarte.length - maxMostrar, 0);
    
            for (let i = inicio; i < this.descarte.length; i++) {
                const carta = this.descarte[i];
                const elementoCarta = this.crearElementoCarta(carta, 'descarte', 0, i);
                elementoCarta.style.position = 'absolute';
                elementoCarta.style.top = `${(i - inicio) * 20}px`; // pequeño desplazamiento
                waste.appendChild(elementoCarta);
            }
        }
    }
    
    

    actualizarPilasFinalizacion() {
        for (let i = 0; i < 4; i++) {
            const foundation = document.getElementById(`foundation-${i}`);
            if (!foundation) continue;
            foundation.innerHTML = '';
            foundation.style.position = 'relative';
    
            if (this.pilasFinalizacion[i].length > 0) {
                const ultimaCarta = this.pilasFinalizacion[i][this.pilasFinalizacion[i].length - 1];
                const elementoCarta = this.crearElementoCarta(
                    ultimaCarta,
                    'foundation',
                    i,
                    this.pilasFinalizacion[i].length - 1
                );
                elementoCarta.style.position = 'absolute';
                elementoCarta.style.top = '0px';
                foundation.appendChild(elementoCarta);
            }
    
            if (!foundation.dataset.finalDropListener) {
                foundation.addEventListener('dragover', this.permitirSoltar.bind(this));
                foundation.addEventListener('drop', (e) => this.soltarEnFinalizacion(e, i));
                foundation.dataset.finalDropListener = '1';
            }
        }
    }
    

    soltarEnFinalizacion(evento, foundationIdx) {
        evento.preventDefault();
        evento.currentTarget.classList.remove('drop-zone');

        try {
            const datos = JSON.parse(evento.dataTransfer.getData('text/plain'));
            this.moverAFinalizacion(datos, foundationIdx);
        } catch (err) {
            console.error('Error al soltar en finalización:', err);
        }
    }

    moverAFinalizacion(datosOrigen, foundationIdx) {
        const columnaOrigen = this.obtenerColumna(datosOrigen);
        if (!columnaOrigen || columnaOrigen.length === 0) return false;

        // Solo permitir mover la última carta de una columna a la pila de finalización
        if (datosOrigen.ubicacion === 'tablero' && datosOrigen.indice !== columnaOrigen.length - 1) {
            return false;
        }

        const carta = columnaOrigen[columnaOrigen.length - 1];

        if (this.esMovimientoValidoFinalizacion(carta, foundationIdx)) {
            const cartaMovida = columnaOrigen.pop();
            this.pilasFinalizacion[foundationIdx].push(cartaMovida);
            this.movimientos++;
            this.voltearUltimaCarta(columnaOrigen);
            this.actualizarUI();
            this.verificarVictoria();
            return true;
        }
        return false;
    }

    esMovimientoValidoFinalizacion(carta, foundationIdx) {
        const pila = this.pilasFinalizacion[foundationIdx];

        if (pila.length === 0) {
            return carta.valor === 'A';
        }

        const cartaSuperior = pila[pila.length - 1];
        return carta.palo === cartaSuperior.palo && this.esValorAscendente(carta, cartaSuperior);
    }

    esValorAscendente(cartaMovida, cartaSuperior) {
        const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const idxMovida = valores.indexOf(cartaMovida.valor);
        const idxSuperior = valores.indexOf(cartaSuperior.valor);
        return idxMovida === idxSuperior + 1;
    }

    iniciarTemporizador() {
        this.temporizador = setInterval(() => {
            this.tiempo++;
            this.actualizarUI();
        }, 1000);
    }

    obtenerColumna(datosOrigen) {
        if (!datosOrigen) return null;
        if (datosOrigen.ubicacion === 'tablero') return this.tablero[datosOrigen.columna];
        if (datosOrigen.ubicacion === 'descarte') return this.descarte;
        if (datosOrigen.ubicacion === 'foundation') return this.pilasFinalizacion[datosOrigen.columna];
        return null;
    }

    obtenerCartasMovibles(columna, indiceInicio) {
        return columna.slice(indiceInicio);
    }

    esMovimientoValidoTablero(carta, columnaDestinoIdx) {
        const columnaDestino = this.tablero[columnaDestinoIdx];

        if (columnaDestino.length === 0) return carta.valor === 'K';

        const cartaSuperior = columnaDestino[columnaDestino.length - 1];
        return this.sonColoresAlternados(carta, cartaSuperior) && this.esValorDescendente(carta, cartaSuperior);
    }

    deshacerMovimiento() {
    if (this.historial.length === 0) return;

    const ultimoMovimiento = this.historial.pop();
    const { origen, destino, cartas, cartaVolteada } = ultimoMovimiento;

    // Quitar del destino y devolver al origen
    destino.splice(-cartas.length, cartas.length);
    origen.push(...cartas);

    // ⚡ Revertir la carta que se volteó (si existía)
    if (cartaVolteada) {
        cartaVolteada.caraArriba = false;
    }

    this.actualizarUI();
}

    

    sonColoresAlternados(carta1, carta2) {
        const palosRojos = ['corazones', 'diamantes'];
        const carta1EsRoja = palosRojos.includes(carta1.palo);
        const carta2EsRoja = palosRojos.includes(carta2.palo);
        return carta1EsRoja !== carta2EsRoja;
    }

    esValorDescendente(cartaInferior, cartaSuperior) {
        const valores = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'];
        const idxInferior = valores.indexOf(cartaInferior.valor);
        const idxSuperior = valores.indexOf(cartaSuperior.valor);
        return idxInferior === idxSuperior + 1;
    }

    realizarMovimiento(columnaOrigen, columnaDestinoIdx, indiceInicio) {
    const cartasAMover = columnaOrigen.splice(indiceInicio);

    // ⚡ Guardar si la carta debajo se volteó
    let cartaVolteada = null;
    if (columnaOrigen.length > 0) {
        const ultima = columnaOrigen[columnaOrigen.length - 1];
        if (!ultima.caraArriba) {
            ultima.caraArriba = true;
            cartaVolteada = ultima; // Guardamos referencia
        }
    }

    this.historial.push({
        origen: columnaOrigen,
        destino: this.tablero[columnaDestinoIdx],
        cartas: [...cartasAMover],
        cartaVolteada // 👈 guardamos la carta volteada (si la hubo)
    });

    this.tablero[columnaDestinoIdx].push(...cartasAMover);
}


    voltearUltimaCarta(columna) {
        if (columna.length > 0) {
            const ultimaCarta = columna[columna.length - 1];
            if (!ultimaCarta.caraArriba) ultimaCarta.caraArriba = true;
        }
    }

    /* ----------------- listeners y util ----------------- */
    agregarEventListeners() {
        if (this._listenersAdded) return;
        this._listenersAdded = true;

        const closeBtn = document.getElementById('message-close');
        if (closeBtn) closeBtn.addEventListener('click', closeMessage);

        const restartBtn = document.getElementById('btn-reiniciar');
        if (restartBtn) restartBtn.addEventListener('click', reiniciarJuego);

        // asegurar que victory-screen está oculto al inicio
        const victory = document.getElementById('victory-screen');
        if (victory) victory.classList.add('message-hidden');

        const undoBtn = document.getElementById('btn-deshacer');
        if (undoBtn) undoBtn.addEventListener('click', () => this.deshacerMovimiento());

    }
}

let juego;

function reiniciarJuego() {
    // Limpiar temporizador del juego anterior si existe
    if (juego && juego.temporizador) {
        clearInterval(juego.temporizador);
    }
    // Crear una nueva instancia
    juego = new SolitarioKlondike();
}

// Inicializar juego al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    juego = new SolitarioKlondike();

    // 👇 fuerza a ocultar el mensaje de victoria al cargar
    document.getElementById("victory-screen").classList.add("message-hidden");
});


