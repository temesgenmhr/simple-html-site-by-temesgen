document
  .getElementById("search-input")
  ?.addEventListener("keyup", async (e) => {
    const input = (e.target as HTMLInputElement).value;

    try {
      const res = await fetch(
        `http://localhost:3001/?keyword=${encodeURIComponent(input)}`
      );
      const json = await res.json();

      const results = json
        .map((comment: any) => `<li>${comment.name}</li>`)
        .join("");
      const $results = document.getElementById("results");
      if ($results) {
        $results.innerHTML = results;
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  });
