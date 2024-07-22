export const clickOfferSent = () => {
    console.log('click Offer Sent');

    const spanAnswer = document.getElementById('spananswer') as HTMLElement;
    spanAnswer.classList.toggle('invisible');

    const buttonOfferSent = document.getElementById('buttonoffersent') as HTMLButtonElement;
    buttonOfferSent.disabled = true;
  }