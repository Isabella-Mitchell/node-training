{
  const ac = new AbortController();

  // addEventListener
  ac.signal.addEventListener("abort", () => console.log("aborted"));

  console.log(ac.signal.aborted);

  // .emit()
  ac.abort();

  console.log(ac.signal.aborted);
}
{
  const ac = new AbortController();

  class AbortError extends Error {}

  new Promise((resolve, reject) => {
    ac.signal.addEventListener("abort", () => reject(new AbortError()));
    setTimeout(() => {
      resolve("All done!");
    }, 3000);
  })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  setTimeout(() => {
    ac.abort();
  }, 1000);
}

{
  const ac = new AbortController();

  async function printGithubData(url) {
    try {
      const response = await fetch(url, { signal: ac.signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("🤫");
        return;
      }
      console.log(error);
    }
  }

  printGithubData("https://api.github.com/users");

  setTimeout(() => {
    ac.abort();
  }, 50);
}
