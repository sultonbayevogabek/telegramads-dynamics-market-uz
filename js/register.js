'use strict';

(async _ => {
  const statistics = new Statistics();
  let user = JSON.parse(localStorage.getItem('user'));

  const joinButton = document.querySelector('#joinToChannel')
  joinButton?.addEventListener('click', async (e) => {
    joinButton.disabled = true;
    await statistics.onClickTgBtn();
    joinButton.disabled = false;
    window.location.href = 'https://t.me/dildoratursunovaseminar';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append('Faoliyati', user?.specialty);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    formData.append(`Foydalanuvchi ID`, statistics.userId);
    formData.append(`Timestamp`, statistics.time?.toString());

    let excel = 'https://script.google.com/macros/s/AKfycbyBwv0ciJpp75xribjTiEpuGULQ3IEaz0tLXJDQZ1oTc8-Adm_kUEzbkMAkutwGwYRo3g/exec'

    if (window.location.href.includes('tgads')) {
      excel = 'https://script.google.com/macros/s/AKfycbzGYIKvcQB7I3sjHyq75JQFStTgOGmpJvztzqg_mn7Cl3wHugfICWOsfux1aqpon2Ug/exec'
    }

    let response = await fetch(excel, {
      method: 'POST',
      body: formData
    })
    await response.json();
    await statistics.onRegister(user);
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

