document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const regionPage = document.querySelector('.page-region');
  if (!regionPage) return;

  const checkRegionBtn = document.getElementById('checkRegionBtn');
  const statusBadge = document.getElementById('statusBadge');
  const currentCountryEl = document.getElementById('currentCountry');
  const currentRegionEl = document.getElementById('currentRegion');
  const currentFeeEl = document.getElementById('currentFee');

  const modal = document.getElementById('confirmModal');
  const modalContent = modal?.querySelector('.modal-content');
  const modalFrom = document.getElementById('modalFrom');
  const modalTo = document.getElementById('modalTo');
  const modalFee = document.getElementById('modalFee');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');

  const iranDetected = {
    country: '🇮🇷 Iran',
    region: 'Iran (IR)'
  };

  const randomIranFee = () => {
    const fee = 0.33 + Math.random() * 0.04;
    return `${fee.toFixed(2)}%`;
  };

  let currentData = {
    country: '🇮🇷 Iran',
    region: '—',
    fee: '—',
    checked: false
  };

  let selectedData = null;

  const renderCurrent = () => {
    currentCountryEl.textContent = currentData.country;
    currentRegionEl.textContent = currentData.region;
    currentFeeEl.textContent = currentData.fee;

    if (currentData.checked) {
      statusBadge.textContent = 'Checked';
      statusBadge.classList.add('is-checked');
    } else {
      statusBadge.textContent = 'Not checked';
      statusBadge.classList.remove('is-checked');
    }
  };

  const openModal = () => {
    if (!selectedData || !modal) return;

    modalFrom.textContent = currentData.checked ? `${currentData.country} • ${currentData.region}` : 'Unknown';
    modalTo.textContent = selectedData.country;
    modalFee.textContent = selectedData.fee;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalContent?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  checkRegionBtn?.addEventListener('click', () => {
    checkRegionBtn.disabled = true;
    checkRegionBtn.textContent = 'Checking...';

    window.setTimeout(() => {
      currentData = {
        ...currentData,
        country: iranDetected.country,
        region: iranDetected.region,
        fee: randomIranFee(),
        checked: true
      };
      renderCurrent();
      checkRegionBtn.disabled = false;
      checkRegionBtn.textContent = 'Check My Region';
    }, 700);
  });

  document.querySelectorAll('.select-region').forEach((button) => {
    button.addEventListener('click', () => {
      selectedData = {
        country: button.dataset.country || 'Unknown',
        region: button.dataset.region || 'Unknown',
        fee: button.dataset.fee || '—'
      };
      openModal();
    });
  });

  confirmBtn?.addEventListener('click', () => {
    if (!selectedData) return;

    currentData = {
      ...currentData,
      country: selectedData.country,
      region: selectedData.region,
      fee: selectedData.fee,
      checked: true
    };

    renderCurrent();
    closeModal();
  });

  cancelBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
  });

  renderCurrent();
});
