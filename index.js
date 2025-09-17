async function loadHTML(url, containerId) {
  try {
    const res = await fetch(url);
    const html = await res.text();

    const container = document.getElementById(containerId);
    container.innerHTML = html;

    // Find <script> tags inside the fetched HTML
    const scripts = container.querySelectorAll("script");

    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        // External script (e.g., <script src="..."></script>)
        newScript.src = oldScript.src;
      } else {
        // Inline script
        newScript.textContent = oldScript.textContent;
      }
      // Replace old script with the new one so it executes
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

  } catch (err) {
    console.error("Error loading HTML:", err);
  }
}

loadHTML("src/header.html", "header");
loadHTML("src/savedsounds.html", "savedsounds");
loadHTML("src/soundsboard.html", "soundsboard");
loadHTML("src/footer.html", "footer");

