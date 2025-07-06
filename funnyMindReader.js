
    const consoleLog = document.getElementById("consoleLog");
    const progressBar = document.getElementById("progressBar");
    const progressWrapper = document.querySelector(".progress-wrapper");
    const scanBtn = document.getElementById("scanBtn");
    const resetBtn = document.getElementById("resetBtn");
    const modal = document.getElementById("resultModal");
    const sound = document.getElementById("pingSound");
    let scanning = false;

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    async function typeLine(text, speed = 28) {
      for (const char of text) {
        consoleLog.textContent += char;
        await sleep(speed);
      }
      consoleLog.textContent += "\n";
      consoleLog.scrollTop = consoleLog.scrollHeight;
    }

    async function showModalText(text) {
      modal.innerHTML = "<p>✨ We have detected your number: <span id='reveal'></span> 😱</p>";
      modal.style.display = "flex";
      const reveal = document.getElementById("reveal");
      sound.play();
      for (const char of text) {
        reveal.textContent += char;
        await sleep(80);
      }
      await sleep(3500);
      modal.style.display = "none";
    }

    async function startScan() {
      if (scanning) return;
      const numInput = document.getElementById("numberInput");
      const secret = parseInt(numInput.value, 10);
      if (!secret || secret < 1 || secret > 100) {
        alert("Enter a valid number between 1 and 100");
        return;
      }
      scanning = true;
      scanBtn.disabled = true;
      numInput.disabled = true;
      progressWrapper.classList.remove("hidden");
      consoleLog.textContent = "";

      const phases = [
        "🔌 Initializing quantum link...",
        "📡 Calibrating neuro‑transmitter arrays...",
        "🛰️ Syncing cerebral satellites...",
        "🧬 Mapping synaptic topology...",
        "⚡ Analyzing delta‑wave frequencies...",
        "🔓 Decrypting subconscious buffers...",
        "🧠 Finalizing thought extraction..."
      ];

      let progress = 0;
      for (const phase of phases) {
        await typeLine(phase);
        const target = progress + Math.floor(Math.random() * 12) + 10;
        while (progress < target) {
          progress += Math.floor(Math.random() * 5) + 1;
          progressBar.style.width = Math.min(progress, 100) + "%";
          await sleep(120);
        }
      }

      progressBar.style.width = "100%";
      await sleep(600);

      await typeLine("\n✅ Neural scan complete.");
      await showModalText(secret.toString());

      resetBtn.classList.remove("hidden");
    }

    function resetScan() {
      scanning = false;
      document.getElementById("numberInput").value = "";
      document.getElementById("numberInput").disabled = false;
      scanBtn.disabled = false;
      progressBar.style.width = "0%";
      progressWrapper.classList.add("hidden");
      consoleLog.textContent = "";
      resetBtn.classList.add("hidden");
    }
