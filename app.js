/**
 * George Ongoro - Portfolio Interactive Scripts
 * Controls the custom interactive terminal shell and other UI behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  setupTerminal();
  setupSmoothScrolling();
});

function setupTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');
  const terminalBody = document.getElementById('terminal-body');
  const actionChips = document.querySelectorAll('.action-chip');

  if (!terminalInput || !terminalHistory || !terminalBody) return;

  // Initial welcome message
  const welcomeText = `George Ongoro [Version 2.0]
Nairobi Silicon Savannah Node.
Type 'help' to see list of commands.

`;
  
  writeOutput(welcomeText, 'accent');

  // Command map
  const commands = {
    help: () => {
      return `Available Commands:
  about    - Display George's background & bio
  skills   - List technical stack & specialties
  writings - Show latest articles from code.geohack.top
  discord  - Get Discord community server link
  socials  - Print social media profiles
  clear    - Clear terminal screen
  motd     - Display message of the day`;
    },
    about: () => {
      return `I'm George, a full-stack developer based in Nairobi.
My days are spent navigating the complexities of React, C#, Java, JavaScript, and Go.
Beyond the code, I'm an open-source contributor and a tech volunteer, helping selected institutions and organizations in Nairobi leverage technology for good.
Curiosity driven, constantly tinkering, gaming, writing, or debating tech trends.`;
    },
    skills: () => {
      return `Technical Stack:
  Languages : React, C#, Java, JavaScript, Go
  Themes    : Minimal aesthetics, Web optimization, Simplicity
  Philosophy: "Simplicity compounds. Boring tech outlasts shiny trends."`;
    },
    writings: () => {
      return `Latest Posts from code.geohack.top:
  [2026-07-03] building a glitch text effect with nothing but css
  [2026-06-22] the semicolon was there. the compiler was also right.
  [2026-06-13] maybe we don't need more frameworks
  [2026-05-25] the architecture of a file tree that never freezes
  [2026-05-23] 7 reasons why react hooks are failing developers
  [2026-05-18] free open source tools cost me 10 hours a week
  [2026-05-17] side project autopsy
  [2026-05-13] ai turned me into a 0.1x developer
  
  Run 'blog' or visit https://code.geohack.top for full articles.`;
    },
    blog: () => {
      setTimeout(() => {
        window.open('https://code.geohack.top', '_blank');
      }, 500);
      return `Opening George's blog at https://code.geohack.top...`;
    },
    discord: () => {
      setTimeout(() => {
        window.open('https://discord.gg/ekqkBkc7Z', '_blank');
      }, 500);
      return `Discord Server: https://discord.gg/ekqkBkc7Z\nRedirecting to Discord...`;
    },
    socials: () => {
      return `Connect with George:
  GitHub   : https://github.com/004Ongoro
  Twitter/X: https://x.com/ongorogeorg_e
  Bluesky  : https://bsky.app/profile/deepread.website
  LinkedIn : https://linkedin.com/in/georgeongoro2
  Mastodon : https://mastodon.social/@ongoro_ge
  RSS      : https://code.geohack.top/rss.xml`;
    },
    motd: () => {
      return `Message of the day:
  "No rights reserved — Steal everything. Build things that (mostly) work."`;
    },
    clear: () => {
      terminalHistory.innerHTML = '';
      return '';
    }
  };

  // Alias lists
  const aliases = {
    help: ['help', '?', 'menu', 'commands'],
    about: ['about', 'bio', 'whoami', 'george', 'ongoro'],
    skills: ['skills', 'stack', 'languages', 'tech'],
    writings: ['writings', 'posts', 'articles', 'ls', 'dir'],
    discord: ['discord', 'chat', 'server', 'community'],
    socials: ['socials', 'links', 'contact', 'twitter', 'github', 'linkedin', 'mastodon', 'bluesky'],
    motd: ['motd', 'quote', 'philosophy'],
    clear: ['clear', 'cls'],
    blog: ['blog', 'website']
  };

  // Parse custom command inputs
  function executeCommand(cmdStr) {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Log the prompt first
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">george@nairobi</span>:<span class="terminal-prompt-path">~</span>$ ${cmdStr}`;
    terminalHistory.appendChild(promptLine);

    // Resolve command name from aliases
    let resolvedCmd = null;
    for (const [key, aliasList] of Object.entries(aliases)) {
      if (aliasList.includes(trimmed)) {
        resolvedCmd = key;
        break;
      }
    }

    if (resolvedCmd && commands[resolvedCmd]) {
      const output = commands[resolvedCmd]();
      if (output) {
        writeOutput(output);
      }
    } else {
      writeOutput(`Command not found: '${cmdStr}'. Type 'help' for options.`, 'error');
    }

    // Scroll to bottom
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 10);
  }

  function writeOutput(text, className = '') {
    if (!text) return;
    const outputLine = document.createElement('div');
    outputLine.className = `terminal-output ${className}`;
    outputLine.textContent = text;
    terminalHistory.appendChild(outputLine);
  }

  // Handle enter key on input
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      executeCommand(val);
      terminalInput.value = '';
    }
  });

  // Handle terminal clicking to focus input
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Action chips helper
  actionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-command');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
}

function setupSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = 80; // nav bar height offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
