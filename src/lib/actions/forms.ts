export function enhance(form: HTMLFormElement, {
  result
}) {
  // console.log('Form mounted to DOM.');

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      const body = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method,
        body,
        headers: {
          accept: 'application/json'
        }
      });

      if (res.ok) {
        result(res, form);
      } else {
        console.error("Fetch error: ", await res.text());
      }

    } catch (error) {
      console.error('Could not submit the form: ', error)
    }
  }

  form.addEventListener("submit", handleSubmit);

  return {
    destroy() {
      // console.log('Form removed to DOM.');
      form.addEventListener("submit", handleSubmit);
    }
  }
}