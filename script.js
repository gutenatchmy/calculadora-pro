const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");
const lista = document.getElementById("lista");

let resultadoMostrado = false;

// BOTONES
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.dataset.valor;

        if (valor === "C") {
            pantalla.value = "";
        } 
        else if (valor === "←") {
            pantalla.value = pantalla.value.slice(0, -1);
        } 
        else if (valor === "=") {
            calcular();
        } 
        else {
            if (resultadoMostrado) {
                pantalla.value = "";
                resultadoMostrado = false;
            }
            pantalla.value += valor;
        }
    });
});

// FUNCIÓN CALCULAR (mejorada)
function calcular() {
    try {
        // evitar operadores repetidos (ej: ++, --, etc.)
        if (/[\+\-\*\/]{2,}/.test(pantalla.value)) {
            pantalla.value = "Error";
            return;
        }

        let resultado = eval(pantalla.value);

        // evitar infinito o NaN
        if (!isFinite(resultado)) {
            pantalla.value = "Error";
            return;
        }

        // HISTORIAL (máx 10)
        let item = document.createElement("li");
        item.textContent = pantalla.value + " = " + resultado;

        if (lista.children.length >= 10) {
            lista.removeChild(lista.firstChild);
        }

        lista.appendChild(item);

        pantalla.value = resultado;
        resultadoMostrado = true;

    } catch {
        pantalla.value = "Error";
    }
}

// TECLADO + EFECTO VISUAL
document.addEventListener("keydown", (e) => {
    const tecla = e.key;

    // animación botón
    const boton = document.querySelector(`[data-valor="${tecla}"]`);
    if (boton) {
        boton.style.transform = "scale(0.9)";
        setTimeout(() => {
            boton.style.transform = "scale(1)";
        }, 100);
    }

    if (!isNaN(tecla) || "+-*/.".includes(tecla)) {
        if (resultadoMostrado) {
            pantalla.value = "";
            resultadoMostrado = false;
        }
        pantalla.value += tecla;
    } 
    else if (tecla === "Enter") {
        calcular();
    } 
    else if (tecla === "Backspace") {
        pantalla.value = pantalla.value.slice(0, -1);
    } 
    else if (tecla === "Escape") {
        pantalla.value = "";
    }
});
