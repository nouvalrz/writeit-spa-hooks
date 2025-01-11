import Swal from 'sweetalert2';

const SwalToast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: 'linear-gradient(to bottom, #b0e1fc 0%, #79a1b7 100%)',
  color: '#141414',
  iconColor: '#141414',
});

export default SwalToast;
