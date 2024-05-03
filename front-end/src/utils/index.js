const modalBackdrop = document.getElementById('modalBackdrop');

export const toggleModal = (id, onToggle) => {
  const modal = document.getElementById(id);
  const closeBtn = modal.querySelector('.close');
  const toggleFn = () => {
    modal.classList.toggle('visible');
    modalBackdrop.classList.toggle('visible');
    if (onToggle) onToggle(modal);
  };

  closeBtn.onclick = toggleFn;
  toggleFn();
};
