document.addEventListener("DOMContentLoaded", () => {
  const mesas = [
    { id: 1, estado: "disponivel", cadeiras: 4, local: "Próximo à janela" },
    { id: 2, estado: "reservada", cadeiras: 2, local: "Perto da entrada" },
    { id: 3, estado: "em-uso", cadeiras: 6, local: "Centro do salão" },
    { id: 4, estado: "disponivel", cadeiras: 4, local: "Perto da cozinha" },
  ];

  const mapa = document.querySelector(".mapa");
  const detalhes = document.getElementById("mesa-detalhes");
  const alterarEstadoBtn = document.getElementById("alterar-estado");
  let mesaSelecionada = null;

  mesas.forEach((mesa) => {
    const mesaDiv = document.createElement("div");
    mesaDiv.className = `mesa ${mesa.estado}`;
    mesaDiv.setAttribute("role", "button");
    mesaDiv.setAttribute("aria-label", `Mesa ${mesa.id}, ${mesa.estado}`);
    mesaDiv.innerHTML = `
      <p><strong>Mesa ${mesa.id}</strong></p>
      <p>${mesa.cadeiras} cadeiras</p>
    `;
    mesaDiv.addEventListener("click", () => exibirDetalhes(mesa));
    mapa.appendChild(mesaDiv);
  });

  function exibirDetalhes(mesa) {
    mesaSelecionada = mesa;
    detalhes.innerHTML = `
      <p><strong>Mesa ${mesa.id}</strong></p>
      <p>Estado: ${mesa.estado}</p>
      <p>Cadeiras: ${mesa.cadeiras}</p>
      <p>Localização: ${mesa.local}</p>
    `;
    alterarEstadoBtn.hidden = false;
  }

  alterarEstadoBtn.addEventListener("click", () => {
    if (!mesaSelecionada) return;
    const estados = ["disponivel", "reservada", "em-uso"];
    const indexAtual = estados.indexOf(mesaSelecionada.estado);
    mesaSelecionada.estado = estados[(indexAtual + 1) % estados.length];

    mapa.innerHTML = "";
    detalhes.innerHTML = "<p>Selecione uma mesa para ver os detalhes.</p>";
    alterarEstadoBtn.hidden = true;
    mesaSelecionada = null;

    mesas.forEach((mesa) => {
      const mesaDiv = document.createElement("div");
      mesaDiv.className = `mesa ${mesa.estado}`;
      mesaDiv.setAttribute("role", "button");
      mesaDiv.setAttribute("aria-label", `Mesa ${mesa.id}, ${mesa.estado}`);
      mesaDiv.innerHTML = `
        <p><strong>Mesa ${mesa.id}</strong></p>
        <p>${mesa.cadeiras} cadeiras</p>
      `;
      mesaDiv.addEventListener("click", () => exibirDetalhes(mesa));
      mapa.appendChild(mesaDiv);
    });
  });
});