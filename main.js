// main.js
document.addEventListener('DOMContentLoaded', () => {
  // contador global para gerar índices únicos
  let metaIndex = 0;

  // seleciona todos os botões que adicionam meta
  const addButtons = document.querySelectorAll('.add-meta');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.dataset.target;
      const container = document.querySelector(targetSelector);
      if (!container) return;

      metaIndex += 1;
      const idx = metaIndex;

      // cria a div .meta .meta-<idx>
      const metaDiv = document.createElement('div');
      metaDiv.classList.add('meta', `meta-${idx}`);
      metaDiv.dataset.index = idx;

      // monta o conteúdo (input do nome, progress, label, botão incrementar)
      metaDiv.innerHTML = `
        <div class="meta-header">
          <input type="text" class="meta-title" placeholder="Nome da meta" />
          <button type="button" class="remove-meta" title="Remover meta">✕</button>
        </div>

        <div class="meta-body">
          <label class="progress-label">Progresso: <span class="progress-percent">0%</span></label>
          <progress class="meta-progress" value="0" max="100">0%</progress>
        </div>

        <div class="meta-actions">
          <button type="button" class="increment-progress" data-step="10">+10%</button>
          <button type="button" class="set-0">Zerar</button>
        </div>
      `;

      container.appendChild(metaDiv);

      // adicionar event listeners locais (ou usar delegação se preferir)
      const incBtn = metaDiv.querySelector('.increment-progress');
      const set0Btn = metaDiv.querySelector('.set-0');
      const progressEl = metaDiv.querySelector('.meta-progress');
      const percentEl = metaDiv.querySelector('.progress-percent');
      const removeBtn = metaDiv.querySelector('.remove-meta');

      const updateUI = () => {
        const val = Number(progressEl.value);
        percentEl.textContent = `${val}%`;
      };

      incBtn.addEventListener('click', () => {
        const step = Number(incBtn.dataset.step) || 10;
        let newVal = Number(progressEl.value) + step;
        if (newVal > Number(progressEl.max)) newVal = Number(progressEl.max);
        progressEl.value = newVal;
        updateUI();
      });

      set0Btn.addEventListener('click', () => {
        progressEl.value = 0;
        updateUI();
      });

      removeBtn.addEventListener('click', () => {
        metaDiv.remove();
      });

      // inicializa UI
      updateUI();
    });
  });
});
