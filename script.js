// IBAN bilgisi site için ayarlanmıştır. Hesap sahibi adı sayfada gösterilmez.
const IBAN = 'TR68 0013 4000 0231 6608 60000 01';

// Bu sürümde kart ödemesi yalnızca demo/şaka olarak çalışır; gerçek ödeme alınmaz.

const ibanValue = document.getElementById('ibanValue');
const copyIban = document.getElementById('copyIban');
const copyMessage = document.getElementById('copyMessage');
const payButton = document.getElementById('payButton');
const payMessage = document.getElementById('payMessage');
const paymentModal = document.getElementById('paymentModal');
const continuePayment = document.getElementById('continuePayment');
const paymentModalMessage = document.getElementById('paymentModalMessage');
const customAmount = document.getElementById('customAmount');
const amountButtons = [...document.querySelectorAll('.amount-btn')];

ibanValue.textContent = IBAN;

copyIban.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(IBAN);
    copyMessage.textContent = 'IBAN kopyalandı.';
  } catch {
    copyMessage.textContent = 'Kopyalama desteklenmiyor. IBAN alanını elle kopyalayabilirsin.';
  }
  setTimeout(() => (copyMessage.textContent = ''), 2500);
});

payButton.addEventListener('click', () => {
  paymentModalMessage.textContent = '';
  if (typeof paymentModal.showModal === 'function') {
    paymentModal.showModal();
  } else {
    payMessage.textContent = 'Kartla ödeme ekranı bu tarayıcıda açılamadı.';
  }
});

amountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    amountButtons.forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    customAmount.value = button.dataset.amount;
  });
});

customAmount.addEventListener('input', () => {
  amountButtons.forEach((item) => item.classList.remove('selected'));
});

continuePayment.addEventListener('click', () => {
  const amount = Number(customAmount.value || 0);
  if (amount < 1) {
    paymentModalMessage.textContent = 'Lütfen bir bağış tutarı seç veya yaz.';
    return;
  }

  paymentModalMessage.innerHTML = `✓ Ödeme gerçekleşti! <span class=""></span>`;
  continuePayment.disabled = true;
  continuePayment.textContent = 'Ödeme Tamamlandı';
  continuePayment.style.opacity = '0.75';

  setTimeout(() => {
    continuePayment.disabled = false;
    continuePayment.textContent = 'Ödemeyi Yap';
    continuePayment.style.opacity = '';
  }, 3000);
});
